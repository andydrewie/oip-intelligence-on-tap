'use client';
import {useState} from 'react';
import {Arrow,Tag,Detail,Field,ScenarioShare,ShareLink,type ScenarioController} from './ui';
import {scenarioHash} from '../lib/scenarios.mjs';
import {SubtotalEquation,SettlementEquation,FloorNotation,WorkedEquations} from './equations';
import {bill,money,cents,settleSubtotal,exampleTotals,THRESHOLD_TOTALS} from '../lib/model.mjs';

const signed=(n:number)=>`${n<0?'−':n>0?'+':''}${money(Math.abs(n))}`;
export default function Billing({scenario}:{scenario:ScenarioController}){
 const {values,set,reset,warning,ready}=scenario;
 const {use,gift,formula}=values, b=bill(use,gift);
 const [custom,setCustom]=useState(false),[seed,setSeed]=useState(0),[thresholds,setThresholds]=useState(false);
 const isCustom=custom||![0,1,5,10].includes(gift);
 const totals=thresholds?THRESHOLD_TOTALS:exampleTotals(seed);
 const rangeMax=Math.min(999980,Math.max(1000,Math.ceil(use/1000)*1000));
 const setTotal=(s:number)=>set('use')(cents(s-20));
 const resetBill=()=>{reset();setCustom(false);setSeed(0);setThresholds(false)};
 return <>{!ready&&<p className="calculator-loading" role="status">Loading your saved bill. Controls will be available shortly.</p>}<div className="lab-grid billing-lab" data-machine="receipt" data-state={ready?'ready':'loading'} inert={!ready} aria-busy={!ready}>
  <div className="lab-copy">
   <Tag>{ready?'Interactive concept · USD':'Preparing calculator…'}</Tag>
   <h2>A bill you can<br/>understand at a glance.</h2>
   <p className="lead">A $20 membership, plus the AI you use. Your subtotal rounds up or down to a price band. Any donation comes afterward.</p>
   <p className="interaction-intro">Change the usage amount on the receipt to try it. This is a simulation; no payment is collected.</p>
   {warning&&<p className="notice" role="status">{warning}</p>}
  </div>
  <div className="receipt">
   <div className="receipt-head"><div><span className="eyebrow">INDEPENDENT BILLING CONCEPT</span><h3>Intelligence on Tap</h3><p>Your monthly checkout</p></div><span className="receipt-icon" aria-hidden="true">≋</span></div>
   <div className="receipt-lines receipt-usage"><div><span>Monthly membership</span><span>$20.00</span></div>
    <section className="receipt-meter"><Field label="AI usage charge" value={use} onChange={set('use')} max={999980} step={.01} suffix="USD" range rangeMax={rangeMax}/><p className="range-caption">Drag to explore, or type an exact amount. The $20 membership is added separately.</p></section>
   </div>
   <div className="receipt-lines" aria-live="polite" aria-atomic="true"><div className="muted"><span>Subtotal</span><span data-testid="live-subtotal">{money(b.subtotal)}</span></div><div className="discount"><span>{b.adjustment<0?'Round-down adjustment':b.adjustment>0?'Round-up adjustment':'Rounding adjustment'}</span><span data-testid="live-adjustment">{signed(b.adjustment)}</span></div><div className="adjusted"><strong>Settled service bill</strong><strong data-testid="receipt-settled">{money(b.adjusted)}</strong></div><p className="range-caption tier-feedback">Within a price band, usage can change while the rounded bill stays the same.</p></div>
   <div className="contribution"><h4>Help AI benefit humanity.</h4><p>Optional donation to the <strong>OpenAI Foundation</strong>.</p><p className="donation-choice">Entirely your choice, including $0.</p><div className="gift-options" role="group" aria-label="Optional donation amount">{[0,1,5,10].map(n=><button disabled={!ready} key={n} aria-label={`${n===0?'No donation · $0':`$${n} donation`}`} aria-pressed={!isCustom&&gift===n} onClick={()=>{set('gift')(n);setCustom(false)}}>${n}</button>)}<button disabled={!ready} className="custom-gift" aria-pressed={isCustom} aria-expanded={isCustom} aria-controls="donation-custom" onClick={()=>setCustom(true)}>Enter another amount</button></div><div id="donation-custom" hidden={!isCustom}>{isCustom&&<Field label="Donation amount" value={gift} onChange={set('gift')} max={10000} step={.01} suffix="USD"/>}</div><p className="fine">Proposed charitable destination. No donation is collected here.</p></div>
   <div className="total" aria-live="polite"><div><strong>Total payment</strong><small>{money(b.adjusted)} service bill + {money(gift)} Foundation donation</small></div><strong data-testid="final-bill">{money(b.final)}</strong></div><div className="receipt-motto"><strong>Consume freely. Pay transparently.</strong><span>Support voluntarily.</span></div><p className="fine">Simulation only. No payment is collected. This is the adopted formula for this independent concept, not an official OpenAI price or feature. Taxes excluded.</p>
   <div className="receipt-actions"><button disabled={!ready} className="text-button" onClick={resetBill}>Reset example bill</button><ScenarioShare kind="billing" values={values}/></div>
  </div>
  <div className="price-support"><Detail id="price-support" title="What does the price support?"><p>Your service bill supports more than the computation behind an answer. It also supports the capacity, reliability and ongoing development that make the service useful.</p><p>This concept asks how transparent pricing and customer benefits could remain sustainable as that relationship grows. The optional Foundation donation supports a charitable purpose and stays outside the commercial calculation.</p><a className="inline-link" href="#economics">Explore the economics of this bill <Arrow direction="right"/></a></Detail></div>
  <details id="pricing-formula" className="detail pricing-drawer" open={Boolean(formula)}>
   <summary onClick={e=>{e.preventDefault();set('formula')(Number(!formula))}}>Pricing formula &amp; example bills <Arrow direction="down"/></summary>
   <div className="detail-body">
    <div className="drawer-intro"><div><Tag>Adopted concept rule</Tag><h3>See where the numbers land.</h3></div><p>Tap a subtotal to see how it rounds. It includes the $20 membership. The receipt updates with it; your donation stays the same.</p></div>
    <div className="pricing-grid">
     <div className="example-panel">
      <Field label="Subtotal, including $20 membership" value={b.subtotal} onChange={setTotal} min={20} max={1000000} step={.01} suffix="USD"/>
      <div className="example-actions"><button disabled={!ready} onClick={()=>{setSeed(n=>n+1);setThresholds(false)}}>More example bills</button><button disabled={!ready} aria-pressed={thresholds} onClick={()=>setThresholds(v=>!v)}>{thresholds?'Show everyday amounts':'At price changes'}</button></div>
      <div className="example-table-wrap" tabIndex={0} aria-label="Example bills; scroll horizontally if needed"><table className="example-table"><caption>{thresholds?'Where a small usage change moves the bill to a new band':'Tap a subtotal to load that example'}</caption><thead><tr><th scope="col">Subtotal<br/>S</th><th scope="col">Rounding<br/>adjustment</th><th scope="col">Bill before<br/>donation</th></tr></thead><tbody>{totals.map((s:number)=>{const settled=settleSubtotal(s);return <tr key={s} className={s===b.subtotal?'selected':''}><td><button disabled={!ready} aria-label={`Try ${money(s)} total`} aria-pressed={s===b.subtotal} onClick={()=>setTotal(s)}>{money(s)}</button></td><td>{signed(cents(settled-s))}</td><td>{money(settled)}</td></tr>})}</tbody></table></div>
      <p className="fine">A minus sign lowers the subtotal; a plus sign raises it. Donations are added afterward.</p>
     </div>
     <div className="formula-panel">
      <h4>The equation</h4><p><SubtotalEquation/>, where <i>M</i> is the metered charge and <i>S</i> is the subtotal. <i>B</i>(<i>S</i>) is the bill before donation. All amounts are in USD.</p>
      <SettlementEquation/>
      <p className="fine"><FloorNotation/> means round <i>x</i> down to a whole number. The +25 is half of a $50 step.</p>
      <p className="fine">At $60, $150 and $350, the midpoint settles lower. Above $500, halfway settles upward: $524.99 → $500; $525 → $550.</p>
      <WorkedEquations value={b}/>
      <Detail title="How usage scales beyond $500"><p>Using this concept’s anchors of $200 for 20× and $500 for 50×, each additional $50 band corresponds to another 5×. The bands continue: $500, $550, $600, $650… There is no permanent $500 cap.</p><p>This formula settles a calculated dollar charge. It does not define actual compute, tokens, model quality, or personal metering rates. Those need their own specification; API and enterprise prices are not substituted here.</p><p>Tier sweet spots are intentional. The simulator shows both upward and downward settlement. No extra percentage discount is silently added, and this rule alone does not establish that splitting accounts could never save money.</p><p>Actual spending limits would require explicit user controls and pre-use enforcement. This calculator simulates the amount entered; it does not pause it at a default $200 ceiling.</p></Detail>
      <div className="formula-links"><ShareLink hash={scenarioHash('billing',values).replace('#billing','#pricing-formula')} label="Copy link to this calculation" openLabel="Open this calculation"/><a className="inline-link" href="/archive/pricing-formula.html">Formula, table &amp; provenance <Arrow/></a></div>
     </div>
    </div>
   </div>
  </details>
  <div className="billing-notes">
   <Detail title="About the Foundation donation &amp; possible tax eligibility">
    <p>The proposed recipient is the nonprofit OpenAI Foundation. “Help AI benefit humanity” describes the cause in this independent concept; it is not the name of a verified official campaign. OpenAI identifies the Foundation and the commercial OpenAI Group PBC as distinct entities.</p>
    <p>A real checkout would need an accepted donation channel, clear treatment of fees and refunds, and a separate charitable receipt. This prototype collects no money and does not establish that the Foundation offers this channel.</p>
    <p>In the US, deductibility depends on the recipient’s eligibility, the donor’s circumstances, documentation and any benefits received in exchange. Rules differ elsewhere. No tax saving is promised or calculated.</p>
    <p>The service bill is settled first. Giving is optional, does not change the discount or earned loyalty privileges, and is excluded from provider revenue in the economics view.</p>
    <p><a href="https://openai.com/our-structure/">OpenAI’s structure</a> · <a href="https://www.irs.gov/taxtopics/tc506">IRS charitable contribution rules</a> · <a href="/archive/charitable-path.md">Read the donation design note</a></p>
   </Detail>
   <details className="detail origin-story" id="founding-story">
    <summary>The Uber inspiration behind the bill <Arrow direction="down"/></summary>
    <div className="detail-body"><p><strong>Tibo sparked the question. Uber helped shape the checkout.</strong></p><p>Tibo’s question about a $50 Pro plan prompted Andrew’s reply. As a ChatGPT Pro and Uber One subscriber, Andrew saw a familiar pattern: a membership, usage as you need it, and a clear bill at the end.</p><p>His proposal: a $20 ChatGPT base plus metered intelligence. Uber’s end-of-ride bill and optional tip inspired the checkout sequence: settle the usage bill first, then choose whether to donate to the OpenAI Foundation.</p><p>It meets the restaurant intuition: order according to your appetite, settle transparently, support voluntarily.</p><p className="fine">Andrew’s personal inspiration, added after Pasta Board. Uber tips go to drivers; this concept directs the proposed charitable gift to the Foundation. The analogy concerns the checkout experience.</p><a className="inline-link" href="/archive/founding-story.md">Read the inspiration note <Arrow/></a></div>
   </details>
   <p className="source-link"><a href="/archive/source.html#p-138">Read the original billing discussion <Arrow/></a></p>
  </div>
 </div></>
}
