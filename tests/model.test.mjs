import {test} from 'node:test';
import assert from 'node:assert/strict';
import {bill,simulate,defaults,creditLoss} from '../lib/model.mjs';
test('five models reconcile service and contribution economics',()=>{const r=simulate(defaults);assert.equal(r.length,5);assert.ok(Math.abs(r[2].revenue-106.4)<1e-9);assert.equal(r[3].revenue,100);assert.equal(r[4].churn,4);assert.ok(r[1].fulfillment<100);for(const m of r){assert.ok(Math.abs(m.gp-(m.revenue-m.cogs))<1e-8);assert.ok(Math.abs(m.cm-(m.gp-defaults.variableCost-m.revenue*.03))<1e-8);}});
test('zero churn has a finite horizon but no finite perpetual LTV',()=>{for(const r of simulate({...defaults,churn:0})){assert.equal(r.ltv,null);assert.ok(Number.isFinite(r.annual));}});
test('high cost losses are preserved; no negative value clamping',()=>{assert.ok(simulate({...defaults,cost:10})[2].cm<0);assert.equal(creditLoss(5000,5,60),150);});
