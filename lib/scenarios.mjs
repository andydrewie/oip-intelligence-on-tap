import {defaults} from './model.mjs';
import {numberInput} from './inputs.mjs';
import {providerDefaults,costCategories,costBounds,costInputsFromValues,costInput,valuesFromCostInputs} from './provider-economics.mjs';
export const ECONOMICS_TARGETS=['economics','cost-scenario','public-benchmarks','economics-loyalty','economics-method','economics-comparison'];
export const BILLING_TARGETS=['billing','pricing-formula','personal-scaling','founding-story','price-support'];
export function panelForTarget(target){
  if(BILLING_TARGETS.includes(target))return 'billing';
  if(ECONOMICS_TARGETS.includes(target))return 'economics';
  if(target==='relationship')return 'relationship';
  if(['research','sources','chapters'].includes(target)||target.startsWith('chapter-'))return 'research';
  return null;
}

// Only allowlisted simulation inputs enter a link. Cost drafts retain empty/invalid/valid states.
export const scenarios = {
  billing: {
    defaults: {use:86.4,gift:0,formula:0},
    bounds: {use:[0,999980],gift:[0,10000],formula:[0,1]},
  },
  economics: {
    defaults: {...defaults,...providerDefaults,use:86.4,gift:0,exposure:5000,pd:5,lgd:60,investment:100000,success:20,multiple:5},
    bounds: {use:[0,999980],gift:[0,10000],...costBounds,costsReviewed:[0,1],costBasis:[0,999980],monthlyBenefit:[0,1000000],leavingRate:[0,100],retentionGain:[0,100],customerAcquisition:[0,1000000],demand:[0,1000],rate:[0,5],cost:[0,5],baseUnits:[0,2000],fixedPrice:[20,500],fixedUnits:[0,2000],fiftyUnits:[0,2000],serviceCost:[0,1000],variableCost:[0,1000],feePercent:[0,20],churn:[0,30],retention:[0,100],loyalty:[0,100],cac:[0,1000],exposure:[0,100000],pd:[0,100],lgd:[0,100],investment:[0,10000000],success:[0,100],multiple:[0,50]},
  },
};
export function parseScenario(kind,hash) {
  const spec=scenarios[kind], [target,query]=hash.replace(/^#/,'').split('?');
  if(kind==='billing'&&ECONOMICS_TARGETS.includes(target)&&query){
    const parsed=parseScenario('economics',hash);
    return {values:{...spec.defaults,use:parsed.values.use,gift:parsed.values.gift},warning:parsed.receiptWarning??parsed.warning};
  }
  if(!(kind==='economics'?ECONOMICS_TARGETS:BILLING_TARGETS).includes(target)||!query)return null;
  const params=new URLSearchParams(query), values={...spec.defaults};
  const version=params.get('v');
  if(!(kind==='economics'?['1','2','3','4','5']:['1','2']).includes(version))return {values,warning:'This scenario uses an unsupported link version. Default assumptions are shown.'};
  const invalid=[];
  for(const [key,[min,max]] of Object.entries(spec.bounds)) {
    if(!params.has(key))continue;
    const raw=params.get(key), input=numberInput(raw,{min,max}),n=input.value;
    const valid=input.state==='valid'&&(key!=='fixedPrice'||[20,100,200,500].includes(n))&&(!['formula','servingKnown','developmentKnown','operationsKnown','paymentKnown','costsReviewed'].includes(key)||[0,1].includes(n));
    if(valid)values[key]=n;else invalid.push(key);
  }
  if(kind==='billing'&&['pricing-formula','personal-scaling'].includes(target))values.formula=1;
  const notes=[];
  if(kind==='economics'&&['1','2'].includes(version)){
    values.use=Math.max(0,values.demand-values.baseUnits)*values.rate;
    notes.push('Earlier comparison link: your original assumptions are retained in “Compare five pricing approaches”. The receipt now uses that comparison’s metered dollar amount. Provider costs now start unknown.');
  }
  if(kind==='economics'&&!['4','5'].includes(version)){
    Object.assign(values,providerDefaults);
    notes.push('Cost model corrected: earlier links used incomplete cost examples. Your bill is preserved. Enter serving, development, operations and payment assumptions to build a new cost scenario; no earnings estimate is carried forward.');
  }
  if(version==='1'&&kind==='billing')notes.push('This link used the earlier model. Its valid metered amount and contribution are retained; the adopted tier formula now applies. Previous ceilings, discount caps and separate scaling inputs no longer apply.');
  if(version==='1'&&kind==='economics')notes.push('This link used the earlier economics model. The tier-settlement comparison now uses the adopted formula; valid cost and demand assumptions are retained.');
  let costInputs;
  if(kind==='economics'){
    costInputs=costInputsFromValues(values);
    if(['4','5'].includes(version))for(const c of costCategories){
      const draftKey=`input-${c.key}`;
      if(version==='5'&&params.has(draftKey))costInputs[c.key]=params.get(draftKey).slice(0,128);
      else if(values[c.known]===1){
        // Preserve rejected input, never attach a supplied flag to a fallback zero.
        costInputs[c.key]=params.has(c.key)?params.get(c.key).slice(0,128):'';
        if(!params.has(c.key))notes.push(`${c.label} was marked supplied without a value; it remains unknown.`);
      }
    }
    Object.assign(values,valuesFromCostInputs(values,costInputs));
    if(invalid.length||costCategories.some(c=>costInput(c,costInputs[c.key]).state!=='valid'))values.costsReviewed=0;
    const rejected=costCategories.filter(c=>costInput(c,costInputs[c.key]).state==='invalid');
    if(rejected.length)notes.push(`Inputs need correction: ${rejected.map(c=>c.label).join(', ')}. They have not been used to calculate a balance.`);
  }
  const replaced=invalid.filter(key=>!costCategories.some(c=>c.key===key));
  if(replaced.length)notes.push(`Invalid settings were replaced with defaults: ${replaced.join(', ')}.`);
  const receiptWarning=invalid.some(key=>['use','gift'].includes(key))?'Invalid receipt amounts in this link were replaced with defaults.':kind==='economics'&&['1','2'].includes(version)?'Receipt restored from the earlier comparison’s calculated metered amount; the adopted billing formula now applies.':'';
  return {values,warning:notes.join(' '),...(costInputs?{costInputs,receiptWarning}:{})};
}
export function scenarioHash(kind,values,costInputs){
  const params=new URLSearchParams({v:kind==='economics'?'5':'2'});
  for(const key of Object.keys(scenarios[kind].defaults))params.set(key,String(values[key]));
  if(kind==='economics'){
    const inputs=costInputs??costInputsFromValues(values);
    for(const c of costCategories)params.set(`input-${c.key}`,String(inputs[c.key]??'').slice(0,128));
  }
  return `#${kind}?${params}`;
}
export function targetFromHash(hash){return hash.replace(/^#/,'').split('?')[0];}
