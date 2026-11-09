import {test} from 'node:test';
import assert from 'node:assert/strict';
import {
  createExperience, experienceTransition as transition, economicsValues,
  experienceHash, reviewStatus,
} from '../lib/experience-state.mjs';
import {bill} from '../lib/model.mjs';
import {costCategories, providerEconomics} from '../lib/provider-economics.mjs';
import {BILLING_TARGETS, ECONOMICS_TARGETS, scenarios} from '../lib/scenarios.mjs';

// Pure interaction sequences: these assert the visible business outcomes that
// browser controls must produce, not browser readiness or accessibility itself.
const ready = (hash='#billing') => transition(createExperience(), {type:'RESTORE', hash});
const editBill = (s,key,value) => transition(s,{type:'BILL_CHANGED',key,value});
const editCost = (s,key,raw) => transition(s,{type:'COST_EDITED',key,raw});
const editEconomics = (s,key,value) => transition(s,{type:'ECONOMICS_CHANGED',key,value});
const calculate = s => providerEconomics(s.bill.use,economicsValues(s),s.costInputs);
const receipt = s => bill(s.bill.use,s.bill.gift);
const approve = s => transition(s,{type:'COSTS_REVIEWED'});
function costs(s,values={servingCost:'40',developmentCost:'30',operationsCost:'10',paymentFee:'3'}) {
  for(const [key,raw] of Object.entries(values))s=editCost(s,key,raw);
  return s;
}
const reviewed = (usage=86.4,gift=0) => approve(costs(editBill(editBill(ready(),'use',usage),'gift',gift)));
const restore = hash => transition(createExperience(),{type:'RESTORE',hash});

test('A restored default receipt has no invented costs or financial balance',()=>{
  assert.equal(createExperience().phase,'loading');
  const state=ready();
  assert.equal(state.phase,'ready');
  assert.equal(receipt(state).subtotal,106.4);
  assert.equal(receipt(state).final,100);
  assert.equal(reviewStatus(state),'incomplete');
  assert.equal(calculate(state).remaining,null);
});

test('A changed usage value requires renewed review even after returning A → B → A',()=>{
  let state=reviewed();
  assert.equal(calculate(state).remaining,17);
  state=editBill(state,'use',100); // The settled bill is still $100.
  assert.equal(receipt(state).adjusted,100);
  assert.equal(reviewStatus(state),'stale');
  assert.equal(calculate(state).remaining,null);
  state=editBill(state,'use',86.4);
  assert.equal(reviewStatus(state),'stale');
  assert.equal(calculate(state).remaining,null);
  const restored=restore(experienceHash(state,'economics','cost-scenario'));
  assert.notEqual(reviewStatus(restored),'reviewed');
  assert.equal(calculate(restored).remaining,null,'share/reload must not revive revoked approval');
  state=approve(state);
  assert.equal(reviewStatus(state),'reviewed');
  assert.equal(calculate(state).remaining,17);
});

test('Unchanged commits, donation, formula display and separate assumptions preserve cost approval',()=>{
  let state=reviewed();
  state=editBill(state,'use',86.4); // Blur/Enter can emit the existing number.
  state=editCost(state,'servingCost','40');
  state=editBill(state,'gift',5);
  state=editBill(state,'formula',1);
  state=editEconomics(state,'monthlyBenefit',12.5);
  state=editEconomics(state,'retentionGain',25);
  state=editEconomics(state,'demand',150.5);
  assert.equal(reviewStatus(state),'reviewed');
  assert.equal(calculate(state).remaining,17);
  assert.equal(calculate(state).revenue,100);
  assert.equal(receipt(state).final,105);
});

test('Rejected receipt edits cannot alter a reviewed bill or turn into a new financial assumption',()=>{
  const initial=reviewed();
  for(const [key,value] of [['use',-1],['use',Infinity],['use',NaN],['use',999981],['gift',10001],['formula',.5],['unrecognized',5]]){
    const state=editBill(initial,key,value);
    assert.equal(receipt(state).final,100,`${key}=${value}`);
    assert.equal(reviewStatus(state),'reviewed');
    assert.equal(calculate(state).remaining,17);
  }
  const sameNumericText=editBill(initial,'use','86.4');
  assert.equal(typeof sameNumericText.bill.use,'number','accepted domain values must remain canonical numbers');
  assert.equal(reviewStatus(sameNumericText),'reviewed','equivalent text must be rejected or normalize to the unchanged value');
});

test('Empty, invalid and deliberately zero costs remain distinct through review attempts',()=>{
  let state=costs(ready(),{servingCost:'0',developmentCost:'0',operationsCost:'0'});
  state=approve(state);
  assert.equal(reviewStatus(state),'incomplete');
  assert.deepEqual(calculate(state).missing,['Payment processing']);
  assert.equal(calculate(state).remaining,null);
  state=editCost(state,'paymentFee','555');
  state=approve(state);
  assert.equal(reviewStatus(state),'invalid');
  assert.deepEqual(calculate(state).invalid,['Payment processing']);
  assert.ok(!calculate(state).missing.includes('Payment processing'));
  assert.equal(calculate(state).remaining,null);
  state=editCost(state,'paymentFee','0');
  assert.equal(reviewStatus(state),'unreviewed');
  assert.equal(calculate(state).remaining,null);
  state=approve(state);
  assert.equal(reviewStatus(state),'reviewed');
  assert.equal(calculate(state).payment,0);
  assert.equal(calculate(state).remaining,100);
});

test('Fixing invalid input does not silently approve it; explicit review then uses the precise rate',()=>{
  let state=reviewed();
  state=editCost(state,'paymentFee','555');
  assert.equal(reviewStatus(state),'invalid');
  assert.equal(calculate(state).remaining,null);
  state=editCost(state,'paymentFee','2.875');
  assert.equal(reviewStatus(state),'unreviewed');
  assert.equal(calculate(state).remaining,null);
  state=approve(state);
  assert.equal(calculate(state).payment,2.88);
  assert.equal(calculate(state).remaining,17.12);
  state=editCost(state,'developmentCost','');
  assert.equal(reviewStatus(state),'incomplete');
  assert.equal(calculate(state).remaining,null);
});

test('Clear costs retains receipt, donation and all unrelated scenario assumptions',()=>{
  let state=reviewed(1000,7.25);
  for(const [key,value] of Object.entries({monthlyBenefit:12.5,leavingRate:3.75,retentionGain:25,customerAcquisition:9.1,demand:150.5,rate:2,exposure:9000,investment:250000}))state=editEconomics(state,key,value);
  state=editCost(state,'paymentFee','555');
  const before=economicsValues(state),beforeReceipt=receipt(state);
  state=transition(state,{type:'COSTS_CLEARED'});
  assert.deepEqual(receipt(state),beforeReceipt);
  for(const key of ['monthlyBenefit','leavingRate','retentionGain','customerAcquisition','demand','rate','exposure','investment'])assert.equal(economicsValues(state)[key],before[key],key);
  for(const c of costCategories)assert.equal(state.costInputs[c.key],'');
  assert.equal(reviewStatus(state),'incomplete');
  assert.equal(calculate(state).remaining,null);
});

test('Reset bill changes only its domain and requires cost review when usage changes',()=>{
  let state=editEconomics(reviewed(585.25,7.25),'demand',150.5);
  const raw={...state.costInputs};
  state=transition(state,{type:'BILL_RESET'});
  assert.equal(receipt(state).subtotal,106.4);
  assert.equal(receipt(state).final,100);
  assert.deepEqual(state.costInputs,raw);
  assert.equal(economicsValues(state).demand,150.5);
  assert.equal(reviewStatus(state),'stale');
  assert.equal(calculate(state).remaining,null);
  state=approve(state);
  assert.equal(calculate(state).remaining,17);
  const sameUsageReset=transition(editBill(state,'gift',5),{type:'BILL_RESET'});
  assert.equal(reviewStatus(sameUsageReset),'reviewed');
  assert.equal(calculate(sameUsageReset).remaining,17);
});

test('Reset economics cannot reset the customer receipt',()=>{
  let state=editEconomics(reviewed(585.25,7.25),'monthlyBenefit',12.5);
  const before=receipt(state);
  state=transition(state,{type:'ECONOMICS_RESET'});
  assert.deepEqual(receipt(state),before);
  assert.equal(economicsValues(state).monthlyBenefit,5);
  assert.equal(reviewStatus(state),'incomplete');
  assert.equal(calculate(state).remaining,null);
});

test('Every owned nested route saves a reloadable receipt or complete cost scenario',()=>{
  const state=editBill(reviewed(585.25,7.25),'formula',1);
  for(const target of BILLING_TARGETS){
    const next=restore(experienceHash(state,'billing',target));
    assert.equal(next.phase,'ready',target);
    assert.equal(receipt(next).subtotal,605.25,target);
    assert.equal(receipt(next).adjusted,600,target);
    assert.equal(receipt(next).final,607.25,target);
  }
  for(const target of ECONOMICS_TARGETS){
    const next=restore(experienceHash(state,'economics',target));
    assert.equal(receipt(next).final,607.25,target);
    assert.equal(reviewStatus(next),'reviewed',target);
    assert.deepEqual(next.costInputs,state.costInputs,target);
    assert.equal(calculate(next).remaining,502,target);
  }
});

test('Closing the equation produces a snapshot that remains closed after reload',()=>{
  let state=editBill(ready(),'formula',1);
  state=editBill(state,'use',585.25);
  state=editBill(state,'gift',5);
  state=editBill(state,'formula',0);
  for(const target of ['pricing-formula','personal-scaling']){
    const hash=experienceHash(state,'billing',target);
    assert.ok(hash.startsWith('#billing?'));
    const next=restore(hash);
    assert.equal(next.bill.formula,0);
    assert.equal(receipt(next).final,605);
  }
});

test('Invalid and unfinished raw costs survive route snapshot and reload without becoming zero',()=>{
  let state=reviewed(1000,5);
  state=editCost(state,'paymentFee','555');
  state=editCost(state,'developmentCost','');
  for(const target of ECONOMICS_TARGETS){
    const next=restore(experienceHash(state,'economics',target));
    assert.equal(next.costInputs.paymentFee,'555',target);
    assert.equal(next.costInputs.developmentCost,'',target);
    assert.equal(reviewStatus(next),'invalid',target);
    assert.equal(calculate(next).remaining,null,target);
    assert.equal(calculate(next).payment,null,target);
    assert.equal(receipt(next).final,1005,target);
  }
});

test('Legacy billing v1/v2 links preserve customer amounts under the adopted tariff',()=>{
  for(const version of [1,2]){
    const next=restore(`#billing?v=${version}&use=585.25&gift=5&budget=200`);
    assert.equal(receipt(next).subtotal,605.25);
    assert.equal(receipt(next).adjusted,600);
    assert.equal(receipt(next).final,605);
    if(version===1)assert.match(next.warnings.billing,/earlier model/i);
  }
});

test('Economics v1/v2/v3 migration retains useful assumptions but never revives old cost defaults',()=>{
  for(const version of [1,2]){
    const next=restore(`#economics?v=${version}&demand=200&baseUnits=10&rate=2&cost=.7&gift=7&servingCost=50&servingKnown=1&costsReviewed=1`);
    assert.equal(next.bill.use,380);
    assert.equal(receipt(next).adjusted,500);
    assert.equal(receipt(next).final,507);
    assert.equal(economicsValues(next).cost,.7);
    assert.equal(reviewStatus(next),'incomplete');
    assert.equal(calculate(next).remaining,null);
    assert.match(next.warnings.economics,/earlier comparison/i);
  }
  const third=restore('#economics?v=3&use=585.25&gift=5&servingCost=50&otherCosts=5&paymentFee=3&costsReviewed=1');
  assert.equal(receipt(third).final,605);
  assert.equal(reviewStatus(third),'incomplete');
  assert.equal(calculate(third).remaining,null);
  assert.match(third.warnings.economics,/cost model corrected/i);
});

test('Economics v4 reviewed costs migrate to a precise v5 roundtrip',()=>{
  const fourth=restore('#cost-scenario?v=4&use=1000&gift=10&servingCost=50&servingKnown=1&developmentCost=20&developmentKnown=1&operationsCost=10&operationsKnown=1&paymentFee=2.875&paymentKnown=1&costsReviewed=1&costBasis=1000');
  assert.equal(reviewStatus(fourth),'reviewed');
  assert.equal(receipt(fourth).final,1010);
  assert.equal(calculate(fourth).payment,28.75);
  assert.equal(calculate(fourth).remaining,891.25);
  const fifth=restore(experienceHash(fourth,'economics','cost-scenario'));
  assert.equal(reviewStatus(fifth),'reviewed');
  assert.deepEqual(fifth.costInputs,fourth.costInputs);
  assert.equal(calculate(fifth).remaining,891.25);
});

test('Review status and financial availability agree at fractional-cent restoration boundaries',()=>{
  const hash=experienceHash(reviewed(),'economics');
  for(const usage of ['86.4','86.401','86.405','86.41']){
    const next=restore(hash.replace('use=86.4&',`use=${usage}&`));
    const result=calculate(next);
    assert.equal(result.reviewed,reviewStatus(next)==='reviewed',`usage ${usage}`);
    assert.equal(result.remaining!==null,reviewStatus(next)==='reviewed',`balance for usage ${usage}`);
  }
});

test('Generic economics edits cannot approve costs, set flags, or fork the receipt',()=>{
  const initial=ready();
  for(const [key,value] of Object.entries({costsReviewed:1,costBasis:86.4,servingKnown:1,servingCost:0,paymentKnown:1,paymentFee:0,use:1000,gift:10})){
    const next=editEconomics(initial,key,value);
    assert.equal(receipt(next).final,100,key);
    assert.equal(reviewStatus(next),'incomplete',key);
    assert.equal(calculate(next).remaining,null,key);
  }
});

test('Restoring an unsupported snapshot is explicit and cannot retain a previous earnings result',()=>{
  const next=transition(reviewed(1000,5),{type:'RESTORE',hash:'#cost-scenario?v=99&use=1000&costsReviewed=1'});
  assert.equal(next.phase,'ready');
  assert.match(next.warnings.economics,/unsupported/i);
  assert.equal(reviewStatus(next),'incomplete');
  assert.equal(calculate(next).remaining,null);
});

test('Loading rejects every editing, approval and reset command until restoration finishes',()=>{
  const pending=createExperience();
  const commands=[
    {type:'BILL_CHANGED',key:'use',value:585.25},
    {type:'BILL_CHANGED',key:'gift',value:5},
    {type:'COST_EDITED',key:'paymentFee',raw:'2.875'},
    {type:'COSTS_REVIEWED'},
    {type:'ECONOMICS_CHANGED',key:'demand',value:500},
    {type:'COSTS_CLEARED'},
    {type:'BILL_RESET'},
    {type:'ECONOMICS_RESET'},
  ];
  for(const command of commands){
    const next=transition(pending,command);
    assert.equal(next,pending,command.type);
    assert.equal(next.phase,'loading');
  }
  let active=transition(pending,{type:'RESTORE',hash:'#billing?v=2&use=585.25&gift=5'});
  assert.equal(active.phase,'ready');
  assert.equal(receipt(active).final,605);
  active=editBill(active,'gift',10);
  assert.equal(receipt(active).final,610);
});

test('Unregistered, inherited and reserved keys cannot create state or bypass command-specific guards',()=>{
  const initial=reviewed();
  for(const key of ['constructor','toString','__proto__','prototype','unrecognized','budget','scaleUse']){
    for(const command of [
      {type:'BILL_CHANGED',key,value:123},
      {type:'ECONOMICS_CHANGED',key,value:123},
      {type:'COST_EDITED',key,raw:'123'},
    ])assert.equal(transition(initial,command),initial,`${command.type}: ${key}`);
  }
  for(const [key,value] of [['fixedPrice',50],['fixedPrice','100'],['rate',Infinity],['demand',-1],['rate',NaN],['formula',1]]){
    const next=editEconomics(initial,key,value);
    assert.equal(next,initial,`${key}=${value}`);
    assert.equal(calculate(next).remaining,17);
  }
  assert.equal(transition(initial,{type:'UNRECOGNIZED_COMMAND',key:'use',value:1000}),initial);
});

test('Only owned snapshot destinations may restore amounts; copied links exclude foreign and retired keys',()=>{
  const initial=reviewed(585.25,7.25);
  for(const target of ['unowned','relationship','research','sources','constructor']){
    const hash=`#${target}?v=5&use=1000&gift=999&servingCost=0&servingKnown=1&costsReviewed=1&costBasis=1000`;
    const next=transition(initial,{type:'RESTORE',hash});
    assert.deepEqual(next.bill,initial.bill,target);
    assert.deepEqual(next.economics,initial.economics,target);
    assert.deepEqual(next.costInputs,initial.costInputs,target);
    assert.equal(calculate(next).remaining,502,target);
  }
  const migrated=restore('#billing?v=1&use=585.25&gift=5&budget=200&scaleUse=540&discountCap=10&foreign=7&constructor=3&__proto__=x');
  assert.equal(receipt(migrated).final,605);
  for(const kind of ['billing','economics']){
    const copied=experienceHash(migrated,kind,'unowned');
    assert.ok(copied.startsWith(`#${kind}?`));
    const params=new URLSearchParams(copied.split('?')[1]);
    const allowed=new Set(['v',...Object.keys(scenarios[kind].defaults),...(kind==='economics'?costCategories.map(c=>`input-${c.key}`):[])]);
    for(const key of params.keys())assert.ok(allowed.has(key),`foreign serialized key: ${key}`);
    for(const key of ['budget','scaleUse','discountCap','foreign','constructor','__proto__'])assert.equal(params.has(key),false,key);
  }
});

test('Transitions, selectors and serialization never mutate the supplied state or event in place',()=>{
  const freeze=value=>{
    if(value&&typeof value==='object'&&!Object.isFrozen(value)){
      for(const child of Object.values(value))freeze(child);
      Object.freeze(value);
    }
    return value;
  };
  const initial=freeze(reviewed(585.25,7.25));
  const original=structuredClone(initial);
  const commands=[
    {type:'RESTORE',hash:'#billing?v=2&use=86.4&gift=5'},
    {type:'RESTORE',hash:experienceHash(reviewed(1000,10),'economics','cost-scenario')},
    {type:'BILL_CHANGED',key:'use',value:1000},
    {type:'BILL_CHANGED',key:'gift',value:10},
    {type:'COST_EDITED',key:'paymentFee',raw:'555'},
    {type:'COSTS_REVIEWED'},
    {type:'ECONOMICS_CHANGED',key:'demand',value:500},
    {type:'COSTS_CLEARED'},
    {type:'BILL_RESET'},
    {type:'ECONOMICS_RESET'},
    {type:'UNRECOGNIZED_COMMAND'},
  ];
  for(const command of commands){
    const event=freeze(command),before=structuredClone(event);
    assert.doesNotThrow(()=>transition(initial,event),command.type);
    assert.deepEqual(initial,original,command.type);
    assert.deepEqual(event,before,command.type);
  }
  assert.doesNotThrow(()=>{
    economicsValues(initial);reviewStatus(initial);calculate(initial);
    experienceHash(initial,'billing');experienceHash(initial,'economics');
  });
  assert.deepEqual(initial,original);
});
