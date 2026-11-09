import {cents} from './money.mjs';
export {cents} from './money.mjs';
export const TIERS = [20, 100, 200, 500];
export const money = (n) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(n);
const nonnegative = n => Number.isFinite(Number(n))?Math.max(0,Number(n)):0;
// Adopted concept settlement rule, 2026-11-08. All comparisons use integer cents.
// Named-tier midpoint ties settle lower; $50-band midpoint ties settle upward.
export function settleSubtotal(total) {
 const s=Math.max(2000,Math.round(cents(nonnegative(total))*100));
 if(s<=6000)return 20;
 if(s<=15000)return 100;
 if(s<=35000)return 200;
 if(s<=50000)return 500;
 return 50*Math.floor((s+2500)/5000);
}
export function bill(usage=86.4, contribution=0) {
 const metered=cents(nonnegative(usage)),gift=cents(nonnegative(contribution));
 const subtotal=cents(20+metered),adjusted=settleSubtotal(subtotal);
 const adjustment=cents(adjusted-subtotal);
 return {metered,subtotal,adjusted,adjustment,discount:Math.max(0,-adjustment),contribution:gift,final:cents(adjusted+gift)};
}
export const EXAMPLE_TOTALS=[106.4,147.83,153.27,237.68,349.82,350.18,524.83,525.17,567.94];
export const THRESHOLD_TOTALS=[59.99,60,60.01,149.99,150,150.01,349.99,350,350.01,524.99,525,525.01,574.99,575,575.01];
// Reproducible, varied cent-level examples; no random rendering or hidden tariffs.
export function exampleTotals(seed=0) {
 if(!seed)return EXAMPLE_TOTALS;
 let state=seed>>>0;
 return [[2001,5999],[6001,15000],[15001,35000],[35001,50000],[50001,52499],[52500,57499],[57500,62499],[62500,89999],[90001,199999]].map(([min,max])=>{
  state=(Math.imul(1664525,state)+1013904223)>>>0;
  let n=min+state%(max-min+1);if(n%100===0)n+=n<max?1:-1;
  return n/100;
 });
}
export const defaults={demand:96.4,rate:1,cost:0.35,baseUnits:10,fixedPrice:100,fixedUnits:100,fiftyUnits:40,serviceCost:3,variableCost:2,feePercent:3,churn:5,retention:20,loyalty:10,cac:50};
export function simulate(p) {
 const usage=Math.max(0,p.demand-p.baseUnits)*p.rate;
 const hybrid=20+usage;
 const rounded=bill(usage).adjusted;
 const rows=[
  {name:`Fixed $${p.fixedPrice}`,revenue:p.fixedPrice,served:Math.min(p.demand,p.fixedUnits),churn:p.churn},
  {name:'Hypothetical $50',revenue:50,served:Math.min(p.demand,p.fiftyUnits),churn:p.churn},
  {name:'Base + metered',revenue:hybrid,served:p.demand,churn:p.churn},
  {name:'Tier settlement',revenue:rounded,served:p.demand,churn:p.churn},
  {name:'With loyalty',revenue:20+usage*(1-p.loyalty/100),served:p.demand,churn:p.churn*(1-p.retention/100)}
 ];
 return rows.map(r=>{
  const cogs=r.served*p.cost+p.serviceCost, gp=r.revenue-cogs;
  const cm=gp-p.variableCost-r.revenue*p.feePercent/100;
  const q=r.churn/100;
  // The finite sum remains stable at zero and arbitrarily small churn.
  const expectedMonths=Array.from({length:12},(_,t)=>(1-q)**t).reduce((a,b)=>a+b,0);
  return {...r,cogs,gp,cm,margin:100*cm/r.revenue,fulfillment:p.demand?100*r.served/p.demand:100,ltv:q>0&&Number.isFinite(cm/q-p.cac)?cm/q-p.cac:null,annual:cm*expectedMonths-p.cac};
 });
}
export function creditLoss(exposure,pd,lgd){return exposure*(pd/100)*(lgd/100);}
