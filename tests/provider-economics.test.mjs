import {test} from 'node:test';
import assert from 'node:assert/strict';
import {providerEconomics,providerDefaults,costCategories,publicBenchmark} from '../lib/provider-economics.mjs';
import {bill,cents} from '../lib/model.mjs';
import {scenarios,parseScenario,scenarioHash} from '../lib/scenarios.mjs';
const supplied=(overrides={})=>({...providerDefaults,servingCost:40,servingKnown:1,developmentCost:30,developmentKnown:1,operationsCost:10,operationsKnown:1,paymentFee:3,paymentKnown:1,costsReviewed:1,costBasis:86.4,...overrides});

test('Unknown costs never produce a remainder, loyalty return or pretend zero cost',()=>{
 for(const usage of [0,86.4,1000,999980]){
  const r=providerEconomics(usage);
  assert.equal(r.revenue,bill(usage).adjusted);
  for(const key of ['serving','development','operations','payment','remaining','annual','loyaltyAnnual','annualDifference'])assert.equal(r[key],null,key);
  assert.equal(r.missing.length,4);
 }
});
test('Every cost category is required, and zero must be explicitly supplied',()=>{
 for(const c of costCategories){
  const missing=providerEconomics(86.4,supplied({[c.known]:0}));assert.equal(missing.remaining,null);assert.deepEqual(missing.missing,[c.label]);
  for(const bad of [null,undefined,NaN,Infinity,-1])assert.equal(providerEconomics(86.4,supplied({[c.key]:bad})).remaining,null);
 }
 const zeros=supplied({servingCost:0,developmentCost:0,operationsCost:0,paymentFee:0});
 assert.equal(providerEconomics(86.4,zeros).remaining,100);
});
test('Supplied costs require review; a change in usage invalidates review even within a tier',()=>{
 assert.equal(providerEconomics(86.4,supplied({costsReviewed:0})).remaining,null);
 for(const use of [86.41,100,585.25,1000]){const r=providerEconomics(use,supplied());assert.equal(r.remaining,null);assert.equal(r.stale,true);assert.equal(r.annual,null);}
 assert.equal(providerEconomics(1000,supplied({costBasis:1000})).remaining,890);
});
test('Reviewed cost ledger reconciles with all allocations and excludes donation',()=>{
 for(const use of [0,40,40.01,130,130.01,330,330.01,504.99,505,585.25,999980]){
  const r=providerEconomics(use,supplied({costBasis:use,gift:10000}));
  assert.equal(r.revenue,bill(use,10000).adjusted);
  assert.equal(cents(r.serving+r.development+r.operations+r.payment+r.remaining),r.revenue);
 }
 const r=providerEconomics(86.4,supplied());assert.equal(r.remaining,17);assert.equal(r.payment,3);
});
test('Higher cost allocations and losses remain visible; fees round at cent precision',()=>{
 assert.equal(providerEconomics(86.4,supplied({developmentCost:80})).remaining,-33);
 const r=providerEconomics(86.4,supplied({paymentFee:2.875}));assert.equal(r.payment,2.88);assert.equal(r.remaining,17.12);
});
test('Loyalty uses reviewed costs, relative departure reduction and a finite horizon',()=>{
 const p=supplied({leavingRate:0,customerAcquisition:10}),r=providerEconomics(86.4,p);
 assert.equal(r.annual,194);assert.equal(r.loyaltyAnnual,135.8);
 assert.equal(providerEconomics(86.4,supplied({leavingRate:5,retentionGain:20})).loyaltyLeaving,4);
 assert.equal(providerEconomics(86.4,supplied({leavingRate:100})).annual,17);
 const capped=providerEconomics(86.4,supplied({monthlyBenefit:120}));assert.equal(capped.benefit,100);assert.equal(capped.loyaltyRemaining,-80);
});
test('v5 scenarios retain known/unknown flags and review basis; receipt is shared',()=>{
 const values={...scenarios.economics.defaults,...supplied({costBasis:585.25}),use:585.25,gift:7.23};
 const hash=scenarioHash('economics',values);assert.ok(hash.startsWith('#economics?v=5&'));
 assert.deepEqual(parseScenario('economics',hash).values,values);
 assert.deepEqual(parseScenario('billing',hash).values,{use:585.25,gift:7.23,formula:0});
 const worksheetHash=hash.replace('#economics?','#cost-scenario?');
 assert.deepEqual(parseScenario('economics',worksheetHash).values,values);
 assert.deepEqual(parseScenario('billing',worksheetHash).values,{use:585.25,gift:7.23,formula:0});
 const partial={...values,developmentKnown:0};assert.equal(providerEconomics(585.25,parseScenario('economics',scenarioHash('economics',partial)).values).remaining,null);
 const malformed=parseScenario('economics','#economics?v=4&developmentCost=30&developmentKnown=0.5&costsReviewed=1');assert.equal(malformed.values.costsReviewed,0);assert.ok(malformed.warning);
});
test('Legacy cost defaults cannot revive misleading results on reload',()=>{
 const old='#economics?v=3&use=1000&gift=10&servingCost=50&otherCosts=5&paymentFee=3';
 const p=parseScenario('economics',old);assert.equal(p.values.use,1000);assert.equal(p.values.gift,10);assert.equal(p.values.servingKnown,0);assert.equal(providerEconomics(p.values.use,p.values).remaining,null);assert.match(p.warning,/Cost model corrected/);
 const earlier=parseScenario('economics','#economics?v=2&demand=200&baseUnits=10&rate=2&cost=.7');assert.equal(earlier.values.use,380);assert.equal(earlier.values.cost,.7);assert.match(earlier.warning,/Earlier comparison link/);
});
test('Public accounting context reconciles and never fills simulation costs',()=>{
 const expenses=publicBenchmark.expenses.reduce((s,x)=>s+x.amount,0);assert.equal(expenses,34502);assert.equal(publicBenchmark.revenue-expenses,-publicBenchmark.operatingLoss);
 assert.deepEqual(publicBenchmark.expenses.map(x=>cents(x.amount/publicBenchmark.revenue*100)),[14.48,57.88,19.91,11.52]);
 for(const c of costCategories)assert.equal(providerDefaults[c.known],0);
});
