'use client';
import {useLayoutEffect,useState,type ReactNode} from 'react';
import {Arrow,Detail,Field,ScenarioShare,Tag,type ScenarioController} from './ui';
import {money} from '../lib/model.mjs';
import {costCategories,costInput,providerDefaults,providerEconomics,publicBenchmark} from '../lib/provider-economics.mjs';

function CostField({category,scenario}:{category:typeof costCategories[number],scenario:ScenarioController}){
 const id=`cost-${category.key}`,draft=scenario.costInputs[category.key]??'',state=costInput(category,draft);
 return <div className="cost-input field"><label htmlFor={id}>{category.label}{' '}<span className="unit">{category.unit}</span></label>
 <input id={id} type="text" inputMode="decimal" maxLength={128} placeholder="Not entered" value={draft} aria-invalid={state.state==='invalid'||undefined} aria-describedby={`${id}-context${state.error?` ${id}-error`:''}`} onChange={e=>scenario.setCostInput(category.key,e.target.value)}/>
 <p className="field-context" id={`${id}-context`}>{category.description}</p>{state.error&&<p className="input-error" id={`${id}-error`}>{state.error}</p>}</div>
}
function focusCost(key:string){const el=document.getElementById(`cost-${key}`);el?.focus();el?.scrollIntoView({behavior:'instant',block:'center'})}

export default function Economics({scenario,children}:{scenario:ScenarioController,children:ReactNode}){
 const {values:p,set,clearCosts,warning,reviewCosts,costInputs,reviewState}=scenario,r=providerEconomics(p.use,{...providerDefaults,...p},costInputs);
 const invalidCategories=costCategories.filter(c=>r.costStates[c.key].state==='invalid');
 const firstIssue=invalidCategories[0]??costCategories.find(c=>r.costStates[c.key].state==='empty');
 const reviewLabel=r.reviewed?'Costs reviewed for this usage':invalidCategories.length?`Fix ${invalidCategories.length===1?invalidCategories[0].label.toLowerCase():`${invalidCategories.length} inputs`} to calculate`:r.missing.length?`Enter ${r.missing.length} remaining ${r.missing.length===1?'cost':'costs'} to calculate`:'Review costs & calculate';
 const [comparisonOpen,setComparisonOpen]=useState(false);
 useLayoutEffect(()=>{if(comparisonOpen){const el=document.getElementById('fictional-comparison');if(el&&!el.closest('[hidden]'))el.focus()}},[comparisonOpen]);
 const benchmark=publicBenchmark,expenses=benchmark.expenses.reduce((sum,item)=>sum+item.amount,0);
 const per100=(v:number)=>money(v/benchmark.revenue*100);
 return <div className="provider-economics" data-machine="cost-review" data-state={reviewState}>
  <div className="section-intro"><div><Tag>The business question</Tag><h2>What does your subscription support?</h2></div><p>Flexible payment. Earned loyalty. A relationship that can sustain itself.</p></div>
  <p className="provider-orientation">The service bill funds more than an answer. It helps support the systems, people and ongoing development behind it.</p>
  {warning&&<p className="notice" role="status">{warning}</p>}
  <dl className="cost-map">
   <div><dt>Delivering the service</dt><dd>Compute, electricity, data centers, networks, equipment or cloud capacity, and reliable delivery.</dd></div>
   <div><dt>Building better models</dt><dd>Research, training, experiments, data, safety work, and the researchers and engineers behind the intelligence.</dd></div>
   <div><dt>Running the organization</dt><dd>Support, security, sales, administration and payment processing. Financing and taxes also affect the final result.</dd></div>
  </dl>
  <p className="cost-unknown" data-testid="profit-status"><strong>What does OpenAI make from your account?</strong>The bill alone cannot answer that. Its costs for this customer are unknown here.</p>

  <section id="public-benchmarks" className="public-evidence" aria-labelledby="benchmark-title">
   <div className="benchmark-heading"><Tag>Reported finances · another company</Tag><h3 id="benchmark-title">Serving costs are only part of the picture.</h3><p>Anthropic · {benchmark.period}<br/>{benchmark.status} · S-1/A filed November 2, 2026</p></div>
   <p>For every $100 of company revenue, Anthropic reported the following operating expenses. These are company-wide ratios, not a subscriber’s bill.</p>
   <div className="benchmark-table-wrap"><table className="benchmark-table"><caption>Anthropic · per $100 of company revenue</caption><thead><tr><th scope="col">Expense or result</th><th scope="col">USD</th></tr></thead><tbody>
    {benchmark.expenses.map(item=><tr key={item.reportedLabel}><th scope="row">{item.name}</th><td>{per100(item.amount)}</td></tr>)}
    <tr><th scope="row">Total operating expenses</th><td>{per100(expenses)}</td></tr>
    <tr><th scope="row">Operating result · loss</th><td data-testid="benchmark-result">−{per100(benchmark.operatingLoss)}</td></tr>
   </tbody></table></div>
   <p className="benchmark-takeaway">After funding the wider business, operating expenses exceeded revenue. This result is before financing, other non-operating items and income taxes.</p>
   <p className="benchmark-boundary"><strong>This is context, not an OpenAI margin estimate.</strong> These ratios never change your receipt or fill the calculator.</p>
   <p className="fine">Source: <a href={benchmark.source}>Anthropic S-1/A</a>, {benchmark.sourceLocations}. Revenue: $33.242 billion. Each expense ÷ revenue × $100, rounded to cents.</p>
   <Detail title="Inspect the source &amp; cost categories">
    <p>Customer-serving costs are reported as “Cost of revenue.” Research and development includes training infrastructure and people. Sales and marketing includes free-user compute and channel-partner costs. The categories include allocated overhead.</p>
    <p>Compute infrastructure is already distributed across these functions. Adding it again would double-count expenses. The filing also groups the same expenses by their nature; those are alternative views, not additional costs.</p>
    <p>OpenAI’s <a href="https://openai.com/index/openai-submits-confidential-s-1/">confidential S-1 announcement</a> does not supply a public cost breakdown for this customer. A company’s loss also does not establish a loss on each subscription.</p>
    <ul className="benchmark-notes"><li><strong>API prices</strong> tell us what buyers pay, not a provider’s internal cost or a personal ChatGPT metering rate.</li><li><strong>Infrastructure rental prices</strong> need workload, model, throughput and utilization assumptions to inform a serving-cost estimate.</li><li><strong>Company financials</strong> describe a defined accounting period and scope, not profit per token.</li></ul>
    <p className="fine">Reviewed November 8, 2026. <a href="/archive/provider-economics.html">Evidence and calculations</a> · <a href="/archive/provider-economics.json">JSON</a></p>
   </Detail>
  </section>

  <section className="business-question" aria-labelledby="sustainability-question">
   <h3 id="sustainability-question">What would make this option work?</h3>
   <p>Can flexible pricing and stronger retention support the costs of additional usage, loyalty benefits and ongoing development? Evaluate the service on its own economics.</p>
   <p>The optional Foundation donation gives appreciation a charitable destination. It is separate from the service bill and excluded from every commercial calculation below.</p>
  </section>
  <Detail id="cost-scenario" title={r.invalid.length?`Business assumptions · ${r.invalid.length} ${r.invalid.length===1?"input needs":"inputs need"} correction`:"Explore the business assumptions"}>
   <p>For reviewers with cost assumptions: enter monthly allocations for this customer. Blank means unknown; enter 0 only if you deliberately assume zero. These are your inputs, not OpenAI estimates.</p>
   <p>Keep the same month and allocation basis throughout. Count training infrastructure under development; serving infrastructure under serving; put any remaining operating costs under operations. Count each expense once.</p>
  <div className="linked-bill"><div><span className="eyebrow">FROM YOUR CONCEPT RECEIPT</span><strong data-testid="provider-bill">{money(r.revenue)}</strong><span>Settled service bill · Foundation donation excluded</span></div><a className="text-button" href="#billing">Edit the bill <Arrow direction="right"/></a></div>
   <div className="provider-grid">
    <div className="provider-inputs">{costCategories.map(category=><CostField key={category.key} category={category} scenario={scenario}/>)}
     <button className="primary cost-review" disabled={r.reviewed} onClick={()=>firstIssue?focusCost(firstIssue.key):reviewCosts()}>{reviewLabel}</button>
     <p className="field-context">Review allocations for {money(p.use)} in metered use, plus the $20 base. Changing usage requires another review; costs do not scale automatically with the bill.</p>
    </div>
    <div className="provider-result" aria-live="polite" aria-atomic="true" data-testid="provider-result">
     <span className="eyebrow">YOUR COST SCENARIO</span><h3>{r.reviewed?'Balance after entered costs':r.invalid.length?'Check your inputs':r.complete?'Ready to calculate':'Enter costs to calculate'}</h3>
     <dl className="provider-ledger"><div><dt>Settled bill <small>Simulated revenue</small></dt><dd>{money(r.revenue)}</dd></div>
     {costCategories.map((category,i)=>{const v=[r.serving,r.development,r.operations,r.payment][i],state=r.costStates[category.key];return <div key={category.key}><dt>{category.label}<small>{state.state==='invalid'?'Entered value not used':state.state==='empty'?'Not entered':category.key==='paymentFee'?`${r.feeRate}% assumed`:'Your monthly allocation'}</small></dt><dd>{state.state==='invalid'?'Needs correction':v===null?'Unknown':`−${money(v)}`}</dd></div>})}</dl>
     {r.reviewed?<><div className="provider-remainder"><span>Scenario balance · before financing and tax</span><strong className={r.remaining!==null&&r.remaining<0?'negative':''} data-testid="provider-remaining">{money(r.remaining)}</strong></div><p>This is a result of your allocations. It is not OpenAI’s profit, an audited margin, or cash available to spend. Omitted costs would change it. Donations are excluded.</p></>:<div className="cost-status" data-testid="cost-status">{invalidCategories.map(c=><p className="input-error" key={c.key}>{r.costStates[c.key].error}</p>)}{r.missing.length>0&&<p>Not entered: {r.missing.join(', ')}. Enter 0 only if you deliberately assume zero.</p>}{r.complete&&<p>{reviewState==='stale'?'Usage changed. Review whether these allocations still fit, then confirm them again.':'All four costs are entered. Review them, then calculate this scenario.'}</p>}{firstIssue&&<button className="text-button" onClick={()=>focusCost(firstIssue.key)}>{r.invalid.length?'Correct':'Enter'} {firstIssue.label.toLowerCase()} <Arrow direction="right"/></button>}<p>No balance has been calculated.</p></div>}
    </div>
   </div>
   <div className="scenario-toolbar provider-toolbar"><ScenarioShare kind="economics" values={p} costInputs={costInputs} openWorksheet/><button className="text-button" onClick={clearCosts}>Clear cost assumptions</button></div>
   {r.invalid.length>0&&<p className="field-context">A shared link preserves these unfinished inputs and their warnings. It does not turn them into zero or calculate a balance.</p>}
   <Detail title="Where infrastructure and know-how fit">
    <p>Use the same month and allocation basis. A cloud charge may already include hardware, electricity and facilities. For owned equipment, distinguish the purchase from its expense over time; do not count both purchase and depreciation as the same monthly cost.</p>
    <p>Know-how comes from people, research, training and accumulated intellectual property. It contributes to the service’s value, but has no publicly established per-customer price here.</p>
    <p>Revenue, accounting profit and cash available for new infrastructure are different measures. A per-customer scenario cannot establish company-wide profitability.</p>
   </Detail>
  <Detail id="economics-loyalty" title="Could loyalty benefits support the relationship?">
   <p><strong>Loyalty should compound.</strong> A discount lowers revenue; improved retention might offset it over time. Neither the cost base nor that retention effect is known here.</p>
   {!r.reviewed?<p className="notice">Complete and review a cost scenario above to calculate a loyalty comparison. No financial return is assumed by default.</p>:<>
   <div className="fields"><Field label="Monthly loyalty discount" value={p.monthlyBenefit} onChange={set('monthlyBenefit')} max={1000000} step={.01} suffix="assumed USD"/><Field label="Customers leaving each month" value={p.leavingRate} onChange={set('leavingRate')} max={100} step={.1} suffix="out of 100"/><Field label="Reduction in departures with loyalty" value={p.retentionGain} onChange={set('retentionGain')} max={100} step={1} suffix="assumed relative %" range/><Field label="Additional acquisition cost" value={p.customerAcquisition} onChange={set('customerAcquisition')} max={1000000} step={.01} suffix="USD · once"/></div>
   <p>Acquisition cost means an additional amount not already included in your allocations. The default retention improvement is zero. Your monthly allocations remain fixed for retained customers in both scenarios; this is a sensitivity exercise, not a prediction.</p>
   <p>Monthly departures: <strong>{r.leaving.toLocaleString('en-US',{maximumFractionDigits:2})}%</strong> without the benefit; <strong>{r.loyaltyLeaving.toLocaleString('en-US',{maximumFractionDigits:2})}%</strong> with it.</p>
   {p.monthlyBenefit>r.revenue&&<p className="notice">The discount is limited to the settled bill: {money(r.benefit)}.</p>}
   <div className="loyalty-results" aria-live="polite"><div><span>Without loyalty discount</span><strong>{money(r.annual)}</strong><small>12-month scenario balance</small></div><div><span>With {money(r.benefit)} monthly discount</span><strong>{money(r.loyaltyAnnual)}</strong><small>12-month scenario balance</small></div></div>
   <p>The loyalty scenario leaves <strong>{money(Math.abs(r.annualDifference!))} {r.annualDifference!>=0?'more':'less'}</strong> under these assumptions. Both results are before financing and tax; neither measures OpenAI’s earnings. Cost allocation and retention assumptions determine the result.</p></>}
  </Detail>
  <Detail id="economics-method" title="Inspect the calculation & limits">
   <p><strong>Scenario balance</strong> = settled bill − serving allocation − development allocation − operations allocation − payment fee. All four categories need explicit inputs and review for the current usage. Unknown costs never become zero automatically.</p>
   <p>The payment fee is the bill × your fee percentage, rounded to cents. A negative balance is retained. Financing, taxes, unallocated expenses and cash-flow timing are outside the calculation, so this is not net profit or company-wide break-even.</p>
   <p><strong>12-month scenario balance</strong> = monthly balance × [1 + (1 − q) + … + (1 − q)<sup>11</sup>] − additional acquisition cost. Here q is the monthly departure rate as a decimal. With zero departures, all 12 months count.</p>
   <p>The loyalty variant subtracts the capped monthly discount, recalculates payment fees and uses q × (1 − relative reduction). Other allocations stay fixed. This simplified allocation exercise is not contribution-margin accounting: some included costs are shared or fixed and would not disappear when one customer leaves.</p>
   <a className="inline-link" href="/archive/provider-economics.html">Inputs, formulas &amp; evidence <Arrow/></a>
  </Detail>
  <Detail id="economics-comparison" title="Compare five pricing approaches · fictional exercise">
   {comparisonOpen?<div id="fictional-comparison" tabIndex={-1}>{children}</div>:<><p>This older comparison uses invented usage units and cost assumptions to demonstrate pricing mechanics. It excludes research and company overhead. Its partial contribution figures cannot establish a provider’s profitability.</p><button className="text-button" onClick={()=>setComparisonOpen(true)}>Open the fictional comparison</button></>}
  </Detail>
  </Detail>
 </div>;
}
