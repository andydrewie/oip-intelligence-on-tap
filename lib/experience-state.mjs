import {scenarios,parseScenario,scenarioHash,targetFromHash,BILLING_TARGETS,ECONOMICS_TARGETS} from './scenarios.mjs';
import {costCategories,costInput,costInputsFromValues,valuesFromCostInputs} from './provider-economics.mjs';
import {numberInput} from './inputs.mjs';

// One receipt owns usage and donation. Economics consumes it; it cannot fork it.
const ownEconomics=({use,gift,...values})=>values;
export function createExperience(){return {
 phase:'loading',bill:{...scenarios.billing.defaults},
 economics:ownEconomics(scenarios.economics.defaults),costInputs:costInputsFromValues(scenarios.economics.defaults),
 reviewReason:'',warnings:{billing:'',economics:''},revision:{billing:0,economics:0}
};}
export const economicsValues=s=>({...s.economics,use:s.bill.use,gift:s.bill.gift});
function revokeReview(state,reason){return {...state,economics:{...state.economics,costsReviewed:0},reviewReason:reason};}
function accepted(kind,key,value){
 if(!Object.hasOwn(scenarios[kind].bounds,key))return false;
 const bounds=scenarios[kind].bounds[key];
 return typeof value==='number'&&bounds&&numberInput(String(value),{min:bounds[0],max:bounds[1]}).state==='valid'
  &&(key!=='formula'||[0,1].includes(value))&&(key!=='fixedPrice'||[20,100,200,500].includes(value));
}
export function experienceTransition(state,event){
 if(state.phase!=='ready'&&event.type!=='RESTORE')return state;
 switch(event.type){
 case 'RESTORE':{
  const billing=parseScenario('billing',event.hash),economics=parseScenario('economics',event.hash),target=targetFromHash(event.hash);
  let next={...state,phase:'ready'};
  if(billing){
   if(billing.values.use!==state.bill.use)next=revokeReview(next,'usage-changed');
   next={...next,bill:billing.values,warnings:{...next.warnings,billing:billing.warning},revision:{...next.revision,billing:next.revision.billing+1}};
  }else if(['pricing-formula','personal-scaling'].includes(target))next={...next,bill:{...next.bill,formula:1}};
  if(economics)next={...next,economics:ownEconomics(economics.values),costInputs:economics.costInputs??costInputsFromValues(economics.values),reviewReason:'',warnings:{...next.warnings,economics:economics.warning},revision:{...next.revision,economics:next.revision.economics+1}};
  return next;
 }
 case 'BILL_CHANGED':{
  if(!accepted('billing',event.key,event.value)||state.bill[event.key]===event.value)return state;
  let next={...state,bill:{...state.bill,[event.key]:event.value},warnings:{...state.warnings,billing:''}};
  if(event.key==='use')next=revokeReview(next,'usage-changed');
  return next;
 }
 case 'COST_EDITED':{
  if(!costCategories.some(c=>c.key===event.key))return state;
  const raw=String(event.raw).slice(0,128);
  if(state.costInputs[event.key]===raw)return state;
  const costInputs={...state.costInputs,[event.key]:raw};
  return {...revokeReview(state,'inputs-changed'),costInputs,economics:{...valuesFromCostInputs(state.economics,costInputs),costsReviewed:0},warnings:{...state.warnings,economics:''}};
 }
 case 'COSTS_REVIEWED':{
  if(!costCategories.every(c=>costInput(c,state.costInputs[c.key]).state==='valid'))return state;
  return {...state,economics:{...state.economics,costsReviewed:1,costBasis:state.bill.use},reviewReason:''};
 }
 case 'ECONOMICS_CHANGED':{
  // Costs and review have dedicated events; generic comparison edits cannot certify them.
  if(['use','gift','costsReviewed','costBasis',...costCategories.flatMap(c=>[c.key,c.known])].includes(event.key)||!accepted('economics',event.key,event.value))return state;
  return {...state,economics:{...state.economics,[event.key]:event.value},warnings:{...state.warnings,economics:''}};
 }
 case 'COSTS_CLEARED':{
  const costInputs=costInputsFromValues(scenarios.economics.defaults);
  return {...state,costInputs,economics:{...valuesFromCostInputs(state.economics,costInputs),costsReviewed:0,costBasis:0},reviewReason:'',warnings:{...state.warnings,economics:''}};
 }
 case 'BILL_RESET':{
  let next={...state,bill:{...scenarios.billing.defaults},warnings:{...state.warnings,billing:''},revision:{...state.revision,billing:state.revision.billing+1}};
  if(state.bill.use!==next.bill.use)next=revokeReview(next,'usage-changed');
  return next;
 }
 case 'ECONOMICS_RESET':return {...state,economics:ownEconomics(scenarios.economics.defaults),costInputs:costInputsFromValues(scenarios.economics.defaults),reviewReason:'',warnings:{...state.warnings,economics:''},revision:{...state.revision,economics:state.revision.economics+1}};
 default:return state;
 }
}

// Preserve snapshots on all owned destinations. A formula destination always means open.
export function experienceHash(state,kind,target=kind){
 if(kind==='billing'&&!state.bill.formula&&['pricing-formula','personal-scaling'].includes(target))target='billing';
 const allowed=kind==='billing'?BILLING_TARGETS:ECONOMICS_TARGETS;
 if(!allowed.includes(target))target=kind;
 return scenarioHash(kind,kind==='billing'?state.bill:economicsValues(state),state.costInputs).replace(`#${kind}?`,`#${target}?`);
}
export function reviewStatus(state){
 const states=costCategories.map(c=>costInput(c,state.costInputs[c.key]).state);
 if(states.includes('invalid'))return 'invalid';
 if(states.includes('empty'))return 'incomplete';
 if(state.economics.costsReviewed===1&&state.economics.costBasis===state.bill.use)return 'reviewed';
 if(state.reviewReason==='usage-changed'||state.economics.costsReviewed===1)return 'stale';
 return 'unreviewed';
}
