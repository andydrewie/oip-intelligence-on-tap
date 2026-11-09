import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {bill,simulate,defaults} from '../lib/model.mjs';
import {scenarios,parseScenario,scenarioHash} from '../lib/scenarios.mjs';

test('receipt amounts reconcile at cent precision and reject non-finite inputs',()=>{
 for(const usage of [0,0.005,79.99,80,86.4,179.99,180,479.99,480,600]){
  const b=bill(usage,5.005,true,10);
  assert.equal(Math.round(b.metered*100)+2000,Math.round(b.subtotal*100));
  assert.equal(Math.round(b.subtotal*100)+Math.round(b.adjustment*100),Math.round(b.adjusted*100));
  assert.equal(Math.round(b.adjusted*100)+Math.round(b.contribution*100),Math.round(b.final*100));
 }
 assert.equal(bill(Infinity,NaN,true,Infinity).final,20);
 assert.equal(bill(86.4,5).final,105);
});
test('near-zero churn converges to the zero-churn finite horizon',()=>{
 const zero=simulate({...defaults,churn:0}),tiny=simulate({...defaults,churn:1e-15});
 tiny.forEach((r,i)=>assert.ok(Math.abs(r.annual-zero[i].annual)<1e-8));
 const half=simulate({...defaults,churn:100,retention:0});
 half.forEach(r=>assert.equal(r.annual,r.cm-defaults.cac));
});
test('shared scenarios round-trip every allowed input without leaking extra state',()=>{
 for(const kind of Object.keys(scenarios)){
  const values={...scenarios[kind].defaults};
  for(const [key,[min,max]] of Object.entries(scenarios[kind].bounds))if(!['formula','fixedPrice','servingKnown','developmentKnown','operationsKnown','paymentKnown','costsReviewed'].includes(key))values[key]=(min+max)/2;
  if(kind==='economics')for(const flag of ['servingKnown','developmentKnown','operationsKnown','paymentKnown'])values[flag]=1;
  const hash=scenarioHash(kind,{...values,privateData:'never'}),parsed=parseScenario(kind,hash);
  assert.deepEqual(parsed.values,values);assert.equal(parsed.warning,'');assert.ok(!hash.includes('privateData'));
 }
 const bad=parseScenario('billing','#billing?v=2&gift=Infinity&formula=0.5&use=');
 assert.deepEqual(bad.values,scenarios.billing.defaults);assert.ok(bad.warning);
 assert.ok(parseScenario('economics','#economics?v=99').warning);
 assert.equal(parseScenario('billing','#research'),null);
 assert.equal(parseScenario('economics','#economics?v=1&fixedPrice=51').values.fixedPrice,100);
});
test('bounded source passages reconstruct every source paragraph without omissions or edits',()=>{
 const dir=new URL('../public/archive/',import.meta.url),source=JSON.parse(fs.readFileSync(new URL('source.json',dir))),index=JSON.parse(fs.readFileSync(new URL('index.json',dir)));
 assert.equal(createHash('sha256').update(fs.readFileSync(new URL('source.json',dir))).digest('hex'),index.source.sha256);
 const full=index.source_passages.flatMap(p=>JSON.parse(fs.readFileSync(new URL('../public'+p.json,import.meta.url))).paragraphs);
 assert.deepEqual(full.map(p=>[p.id,p.text]),source.paragraphs.map(p=>[`p-${p.startIndex}`,p.text]));
 for(const c of index.chapters){
  for(const key of ['html','markdown','json','source_passage'])assert.ok(fs.existsSync(new URL('../public'+c[key],import.meta.url)));
  const anchor=c.source_anchor.split('#')[1];assert.ok(full.some(p=>p.id===anchor));
 }
 assert.equal(index.chapters.length,10);
 assert.ok(fs.statSync(new URL('../public/llms.txt',import.meta.url)).size<5000);
});
