import {bill, cents} from './model.mjs';
import {percentageCharge} from './money.mjs';
import {numberInput} from './inputs.mjs';

// A zero numeric slot is NOT a known zero cost. Its separate Known flag starts false.
export const providerDefaults = {
 servingCost:0, servingKnown:0, developmentCost:0, developmentKnown:0,
 operationsCost:0, operationsKnown:0, paymentFee:0, paymentKnown:0,
 costsReviewed:0, costBasis:0,
 monthlyBenefit:5, leavingRate:5, retentionGain:0, customerAcquisition:0
};
export const costCategories = [
 {key:'servingCost',known:'servingKnown',label:'Serving & infrastructure',min:0,max:1000000,decimals:2,unit:'USD / month',description:'Compute, electricity, cloud or equipment costs, networking, capacity and delivery support allocated to this usage.'},
 {key:'developmentCost',known:'developmentKnown',label:'Research & model development',min:0,max:1000000,decimals:2,unit:'USD / month',description:'A monthly allocation for research, training, experiments, data, evaluation and the people who build the models.'},
 {key:'operationsCost',known:'operationsKnown',label:'Company operations',min:0,max:1000000,decimals:2,unit:'USD / month',description:'A monthly allocation for remaining support, security, sales, administration and other operating expenses.'},
 {key:'paymentFee',known:'paymentKnown',label:'Payment processing',min:0,max:20,unit:'% of service bill',description:'Enter 0–20%. This calculator uses a percentage, not a dollar amount. Include any fixed fee in company operations; this is not a processor quote.'}
];
export const costBounds=Object.fromEntries(costCategories.flatMap(c=>[[c.key,[c.min,c.max]],[c.known,[0,1]]]));
export const costInputsFromValues=p=>Object.fromEntries(costCategories.map(c=>[c.key,p[c.known]===1?String(p[c.key]):'']));
export function costInput(category,raw){
 const result=numberInput(raw,category),label=category.label.toLowerCase();
 const range=category.key==='paymentFee'?'0–20%':'$0–$1,000,000';
 let error='';
 if(result.state==='invalid'){
  if(result.reason==='range')error=`${result.raw}${category.key==='paymentFee'?'%':''} is outside this calculator’s ${range} range. Correct ${label} to calculate.`;
  else if(result.reason==='precision')error=`Use dollars and cents for ${label}: at most two decimal places.`;
  else error=`Enter a number for ${label} (${range}).`;
 }
 return {...result,error};
}
export function valuesFromCostInputs(p,inputs){
 const next={...p};
 for(const c of costCategories){const s=costInput(c,inputs[c.key]);next[c.key]=s.state==='valid'?s.value:0;next[c.known]=Number(s.state==='valid')}
 return next;
}
const amount=n=>cents(Math.max(0,Number.isFinite(Number(n))?Number(n):0));
// Rates are not money: retain their precision until the resulting charge is rounded.
const percent=n=>Math.min(100,Math.max(0,Number.isFinite(Number(n))?Number(n):0));
const months=churn=>Array.from({length:12},(_,t)=>(1-churn/100)**t).reduce((sum,v)=>sum+v,0);

export function providerEconomics(usage,assumptions=providerDefaults,inputs){
 const p={...providerDefaults,...assumptions},revenue=bill(usage).adjusted;
 const raw=inputs??costInputsFromValues(p);
 const costStates=Object.fromEntries(costCategories.map(c=>[c.key,costInput(c,raw[c.key])]));
 const known=c=>costStates[c.key].state==='valid';
 const missing=costCategories.filter(c=>costStates[c.key].state==='empty').map(c=>c.label);
 const invalid=costCategories.filter(c=>costStates[c.key].state==='invalid').map(c=>c.label);
 const complete=missing.length===0&&invalid.length===0;
 const reviewed=complete&&p.costsReviewed===1&&Number(p.costBasis)===Number(usage);
 const serving=known(costCategories[0])?amount(costStates.servingCost.value):null;
 const development=known(costCategories[1])?amount(costStates.developmentCost.value):null;
 const operations=known(costCategories[2])?amount(costStates.operationsCost.value):null;
 const feeRate=known(costCategories[3])?costStates.paymentFee.value:null;
 const payment=feeRate===null?null:percentageCharge(revenue,feeRate);
 const remaining=reviewed?cents(revenue-serving-development-operations-payment):null;
 const leaving=percent(p.leavingRate),gain=percent(p.retentionGain),acquisition=amount(p.customerAcquisition);
 const benefit=Math.min(revenue,amount(p.monthlyBenefit)),loyaltyRevenue=cents(revenue-benefit);
 const loyaltyPayment=feeRate===null?null:percentageCharge(loyaltyRevenue,feeRate);
 const loyaltyRemaining=reviewed?cents(loyaltyRevenue-serving-development-operations-loyaltyPayment):null;
 const loyaltyLeaving=leaving*(1-gain/100);
 const annual=reviewed?cents(remaining*months(leaving)-acquisition):null;
 const loyaltyAnnual=reviewed?cents(loyaltyRemaining*months(loyaltyLeaving)-acquisition):null;
 return {revenue,serving,development,operations,payment,feeRate,complete,reviewed,missing,invalid,costStates,remaining,
  stale:complete&&p.costsReviewed===1&&!reviewed,leaving,loyaltyLeaving,benefit,loyaltyRevenue,loyaltyRemaining,
  annual,loyaltyAnnual,annualDifference:reviewed?cents(loyaltyAnnual-annual):null};
}

// Public company-wide accounting context. Never used as simulation defaults.
export const publicBenchmark={
 company:'Anthropic, PBC',filing:'S-1/A',filed:'2026-11-02',period:'January–September 2026',status:'Unaudited nine-month figures',
 source:'https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm',
 sourceLocations:'Results of Operations, p. 150; Note 8, Supplemental Operating Expense Information, p. F-40',
 unit:'USD millions',revenue:33242,
 expenses:[{name:'Customer-serving costs and related overhead',reportedLabel:'Cost of revenue',amount:4812},{name:'Research and development',reportedLabel:'Research and development',amount:19240},{name:'Sales and marketing',reportedLabel:'Sales and marketing',amount:6619},{name:'General and administrative',reportedLabel:'General and administrative',amount:3831}],
 operatingLoss:1260,
 limitations:'Company-wide accounting ratios, not a subscriber bill or profit per token. Free-user compute and channel-partner costs are included in sales and marketing. No Anthropic percentage is applied to OpenAI or loaded into the simulator.',
};
