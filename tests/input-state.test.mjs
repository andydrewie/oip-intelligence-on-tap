import {test} from 'node:test';
import assert from 'node:assert/strict';
import {numberInput} from '../lib/inputs.mjs';
import {costCategories,costInput,valuesFromCostInputs,providerDefaults,providerEconomics} from '../lib/provider-economics.mjs';
import {parseScenario,scenarioHash,scenarios} from '../lib/scenarios.mjs';
import {cents,percentageCharge} from '../lib/money.mjs';
const draft={servingCost:'888',developmentCost:'555',operationsCost:'555',paymentFee:'3'};
const reviewed=inputs=>({...valuesFromCostInputs(providerDefaults,inputs),costsReviewed:1,costBasis:1000});

test('IS01 Blank, invalid and explicit zero are separate input states',()=>{
 for(const raw of ['', ' ', '\t'])assert.equal(numberInput(raw).state,'empty');
 for(const raw of ['NaN','Infinity','abc','0x10','0b10','--1','1,000'])assert.equal(numberInput(raw).state,'invalid',raw);
 for(const raw of ['0','0.00','0e2'])assert.equal(numberInput(raw).value,0);
 assert.equal(numberInput('2.875',{min:0,max:20}).value,2.875);
});
test('IS02 All four cost fields enforce their actual units and bounds in form and engine',()=>{
 for(const c of costCategories){
  const samples=[['', 'empty'],['abc','invalid'],['-1','invalid'],[String(c.max+1),'invalid'],['0','valid'],[String(c.max),'valid']];
  for(const [raw,state]of samples){
   const inputs={...draft,[c.key]:raw},r=providerEconomics(1000,reviewed(inputs),inputs);
   assert.equal(costInput(c,raw).state,state,`${c.key}=${raw}`);
   assert.equal(r.costStates[c.key].state,state);
   assert.equal(r.complete,state==='valid');
   if(state!=='valid')assert.equal(r.remaining,null);
  }
 }
 assert.equal(costInput(costCategories[0],'12.345').reason,'precision');
 for(const raw of ['0.000000001','1.0000000001'])assert.equal(costInput(costCategories[0],raw).reason,'precision');
 assert.equal(costInput(costCategories[3],'2.875').state,'valid');
});
test('IS03 The reported 555% error names the value, range, field and recovery',()=>{
 assert.equal(costInput(costCategories[3],'555').error,'555% is outside this calculator’s 0–20% range. Correct payment processing to calculate.');
 const inputs={...draft,paymentFee:'555'},r=providerEconomics(1000,reviewed(inputs),inputs);
 assert.deepEqual(r.invalid,['Payment processing']);assert.deepEqual(r.missing,[]);
 assert.equal(r.payment,null);assert.equal(r.remaining,null);
});
test('IS04 Correcting the screenshot fee to 3% retains other allocations and the loss',()=>{
 const r=providerEconomics(1000,reviewed(draft),draft);
 assert.equal(r.payment,30);assert.equal(r.remaining,-1028);
 assert.deepEqual([r.serving,r.development,r.operations],[888,555,555]);
});
test('IS05 A mixture of missing and invalid costs never gets mislabeled or calculated',()=>{
 const inputs={...draft,servingCost:'',paymentFee:'555'},r=providerEconomics(1000,reviewed(inputs),inputs);
 assert.deepEqual(r.missing,['Serving & infrastructure']);assert.deepEqual(r.invalid,['Payment processing']);assert.equal(r.remaining,null);
});
test('IS06 Share and reload preserves every empty, invalid and valid cost draft',()=>{
 for(const c of costCategories)for(const raw of ['','0','abc','555.555',String(c.max+1)]){
  const inputs={...draft,[c.key]:raw},values={...scenarios.economics.defaults,...reviewed(inputs),use:1000};
  const parsed=parseScenario('economics',scenarioHash('economics',values,inputs));
  assert.equal(parsed.costInputs[c.key],raw);
  assert.equal(providerEconomics(1000,parsed.values,parsed.costInputs).costStates[c.key].state,costInput(c,raw).state);
 }
});
test('IS07 Cost warnings stay with economics; receipt fallback warnings stay visible',()=>{
 const hash=scenarioHash('economics',{...scenarios.economics.defaults,use:1000},{...draft,paymentFee:'555'});
 assert.match(parseScenario('economics',hash).warning,/Payment processing/);
 assert.equal(parseScenario('billing',hash).warning,'');
 assert.match(parseScenario('billing',hash.replace('use=1000','use=NaN')).warning,/Invalid receipt amounts/);
});
test('IS08 A review is revoked on incomplete input and on a changed usage basis',()=>{
 const r=providerEconomics(1001,reviewed(draft),draft);assert.equal(r.stale,true);assert.equal(r.remaining,null);
 const parsed=parseScenario('economics',scenarioHash('economics',{...scenarios.economics.defaults,...reviewed(draft),use:1000},{...draft,paymentFee:''}));
 assert.equal(parsed.values.costsReviewed,0);
});
test('IS09 Decimal half-cent policy is consistent for positive, negative and exponent values',()=>{
 for(const [n,out]of [[1.005,1.01],[2.135,2.14],[-2.135,-2.14],[1e-7,0],[999980.005,999980.01]])assert.equal(cents(n),out);
 assert.equal(percentageCharge(1000,2.875),28.75);
 assert.equal(percentageCharge(1000,.2135),2.14);
 assert.equal(percentageCharge(1000,0),0);
});
test('IS10 Very small departure rates stay precise and finite for the bounded horizon',()=>{
 const r=providerEconomics(1000,{...reviewed(draft),leavingRate:.001,retentionGain:2.875},draft);
 assert.equal(r.leaving,.001);assert.equal(r.loyaltyLeaving,.001*(1-2.875/100));
 assert.ok(Number.isFinite(r.annual));assert.ok(Number.isFinite(r.loyaltyAnnual));
});
