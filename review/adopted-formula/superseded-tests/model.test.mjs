import {test} from 'node:test';
import assert from 'node:assert/strict';
import {bill,simulate,defaults,creditLoss} from '../lib/model.mjs';
test('reference receipt and voluntary contribution reconcile',()=>{assert.equal(bill().final,100);assert.equal(bill().discount,6.4);assert.equal(bill(86.4,25).final,125);assert.equal(bill(86.4,0,false).final,106.4);});
test('discount thresholds, caps and high consumption remain explicit',()=>{assert.equal(bill(0).final,20);assert.equal(bill(79.99).final,20);assert.equal(bill(80).final,100);assert.equal(bill(86.4,0,true,0).final,106.4);assert.equal(bill(980).final,500);assert.equal(bill(-5,-5).final,20);});
test('five models reconcile service and contribution economics',()=>{const r=simulate(defaults);assert.equal(r.length,5);assert.ok(Math.abs(r[2].revenue-106.4)<1e-9);assert.equal(r[3].revenue,100);assert.equal(r[4].churn,4);assert.ok(r[1].fulfillment<100);for(const m of r){assert.ok(Math.abs(m.gp-(m.revenue-m.cogs))<1e-8);assert.ok(Math.abs(m.cm-(m.gp-defaults.variableCost-m.revenue*.03))<1e-8);}});
test('zero churn has a finite horizon but no finite perpetual LTV',()=>{for(const r of simulate({...defaults,churn:0})){assert.equal(r.ltv,null);assert.ok(Number.isFinite(r.annual));}});
test('high cost losses are preserved; no negative value clamping',()=>{assert.ok(simulate({...defaults,cost:10})[2].cm<0);assert.equal(creditLoss(5000,5,60),150);});
