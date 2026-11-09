import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {ECONOMICS_TARGETS,scenarioHash,scenarios,parseScenario} from '../lib/scenarios.mjs';
import {costCategories} from '../lib/provider-economics.mjs';
const read=name=>JSON.parse(fs.readFileSync(new URL(`../public/archive/${name}`,import.meta.url)));
test('AC01 Published machine contracts match the current shared-link state model',()=>{
 const model=read('models.json'),provider=read('provider-economics.json');
 assert.equal(model.scenario_links.economics_version,5);
 assert.deepEqual(model.scenario_links.economics_targets,ECONOMICS_TARGETS);
 assert.equal(model.provider.cost_state,provider.cost_state);
 assert.match(provider.cost_state,/empty\/invalid\/valid/);
 for(const c of costCategories){const published=provider.cost_inputs.find(x=>x.key===c.key);assert.equal(published.min,c.min);assert.equal(published.max,c.max);assert.equal(published.decimals,c.decimals)}
 const hash=scenarioHash('economics',scenarios.economics.defaults,{servingCost:'',developmentCost:'0',operationsCost:'20',paymentFee:'555'});
 const parsed=parseScenario('economics',hash);assert.equal(parsed.costInputs.paymentFee,'555');assert.equal(parsed.values.paymentKnown,0);
});
test('AC02 Human economics archive describes invalid recovery and precision accurately',()=>{
 const md=fs.readFileSync(new URL('../public/archive/provider-economics.md',import.meta.url),'utf8');
 for(const text of ['v5','555% is outside this calculator’s 0–20% range','2.875% of $1,000 is $28.75','−$1,028.00','Clear cost assumptions'])assert.ok(md.includes(text),text);
 assert.ok(!md.includes('Economics scenario links use v4.'));
});
