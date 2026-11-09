# Intelligence on Tap · Interaction review

9 November 2026 · Asia/Taipei

100 documented cases: 97 passed, 0 partly verified, 3 not run. This is a bounded concept-site review, not a cross-browser or accessibility certification.

This record combines 87 retained v17 input-recovery cases with 13 state-machine follow-up cases. Each case identifies its evidence revision. Retained browser observations are not represented as new executions.

The follow-up maps 17 authored interaction families. Shared receipt and economics values now have one transition owner; review, navigation, research loading/search and copy feedback have explicit guards and recovery paths. Simple native disclosures and local selectors remain simple.

The root was divided responsibility: inputs, parsers and calculation flags could disagree; multiple effects or asynchronous callbacks could complete an older action. Earlier arithmetic checks did not establish that the entire human recovery and navigation journey worked.

---

## Method and limits

93 Node tests were run in this follow-up:57 existing checks plus22 shared-state and14 asynchronous-state regressions. Browser cases are observed cloud-Chrome procedures, not an unattended browser suite or recorded replay.

The v17 baseline covered all 32 numeric instances and the inventory of sliders, selectors, donation controls, tabs, search, disclosures, companion and sharing. This follow-up repeated targeted connected sequences and new recovery paths; it does not claim to rerun every baseline browser case.

Current visual checks used390px and1280px responsive frames at normal and 200% root text, plus the native desktop viewport. This verifies reflow, not physical iPhone Safari, native browser zoom, or real screen-reader announcements. The three baseline device/permission limitations remain marked not run.

Research failure/retry used an explicit injectable loader fixture, then the real research component. The preview-only route and mobile harness are excluded from production. Clipboard request timing has pure regression tests; native permission denial was not repeated in this follow-up.

This pass does not re-research financial disclosures or infer provider margins. It preserves the adopted tariff, source corpus and donation separation. Passing interaction tests is not evidence for external financial claims.

Build, packaged-source integrity and publication smoke checks are separate release gates. Case counts summarize bounded observations; they are not a certification that every state or device is defect-free.

## Consequential changes

- One pure experience transition function owns bill and cost assumptions; economics derives the receipt instead of keeping a second copy.
- Changing accepted usage revokes reviewed costs even if usage later returns to the original amount. Donation changes and unchanged commits preserve review.
- Blank, invalid and explicit-zero cost inputs remain distinct across editing, sharing, restoration and clearing. Percentage precision is preserved until money is rounded.
- Navigation coordinates the visible panel, opened disclosure and focus; history traversal gets one guarded, cancellable post-browser scroll reconciliation.
- Nested scenario links preserve their values; closing the formula writes a compatible closed destination.
- Copy feedback has pending/success/failure states, timeout recovery and stale-completion guards. Research has retry and a static archive escape when loading fails.
- Search edits keep keyboard focus and do not become accidental navigation. A deliberate chapter destination clears a conflicting search.
- Static interaction contracts document 17 families for developers and agents; project guidance requires transition, interruption and recovery evidence before release.

## Calculation and source regressions

### A01 · Automated regression suite

Status: **passed**

Action: Run node --test tests/*.test.mjs.

Expected: All existing and new calculation/input/source regressions pass.

Observed: [v17 baseline] 57 tests passed,0 failed. Raw output is included in the source download.

### A02 · Malformed and legacy cost links

Status: **passed**

Action: Test v4 known-flag variants, rejected numbers, omitted supplied values and v5 raw drafts.

Expected: No invalid or missing supplied value becomes a trusted zero.

Observed: [v17 baseline] Independent regression cases pass for 1.0/01/1e0 flags, hex/binary values, missing values and valid/empty/invalid round trips.

### A03 · Decimal money and percentage arithmetic

Status: **passed**

Action: Test half-cent money and 2.875% of 1,000 without pre-rounding the percentage.

Expected: Decimal semantics agree with the displayed cents.

Observed: [v17 baseline] 2.135→2.14;2.875%×1,000→28.75. Tiny and high-precision rates remain finite within supported bounds.

### A04 · Tariff boundaries and monotonicity

Status: **passed**

Action: Check exact named midpoints, adjacent cents and above 500 half-steps; scan subtotal cents through 10,000.

Expected: The adopted equation remains consistent and nondecreasing.

Observed: [v17 baseline] All settlement tests pass;525→550 and 524.99→500. No pricing-policy changes were made.

### A05 · All nested scenario aliases

Status: **passed**

Action: Round-trip nondefault receipt and economics state through all six economics destinations.

Expected: Writer, parser and linked receipt agree for every registered target.

Observed: [v17 baseline] Regression tests pass for economics, cost-scenario, public-benchmarks, economics-loyalty, economics-method and economics-comparison.

### A06 · Archive and source contract

Status: **passed**

Action: Regenerate archive; test v5 metadata, input states, cost bounds and preserved source digest.

Expected: Human and machine exports match current behavior; historical evidence stays unchanged.

Observed: [v17 baseline] Both new archive-contract tests and existing source/model tests pass.

### A07 · Static target and JSON integrity

Status: **passed**

Action: Run final release artifact checker after report and source packaging.

Expected: Static local destinations/fragments resolve; JSON parses; archive members are valid and current.

Observed: [v17 baseline] Recorded in review/input-recovery/artifact-checks.json; no broken static destinations, duplicate IDs, invalid JSON or corrupt ZIP members.

### A08 · TypeScript validation

Status: **passed**

Action: Run ./node_modules/.bin/tsc --noEmit.

Expected: No type errors.

Observed: [v17 baseline] Completed with exit 0 and no diagnostics.

### S01 · Shared experience transition regressions

Status: **passed**

Action: Run tests/state-machines.test.mjs.

Expected: One receipt owner; guarded events; raw cost states; exact review basis; scoped resets and compatible snapshots.

Observed: 22 transition tests passed, including A→B→A approval revocation, unchanged commits, explicit zero, invalid drafts, immutability and link round trips.

### S02 · Asynchronous completion regressions

Status: **passed**

Action: Run tests/async-state.test.mjs.

Expected: Only the matching pending request may finish; reset and stale completion cannot change newer feedback.

Observed: 14 request-state tests passed; success, failure, request replacement, reset and stale callbacks remain distinct.

### S12 · Transition inventory and narrow agent retrieval

Status: **passed**

Action: Inventory runtime families; generate static HTML/Markdown/JSON; run artifact validation and source-package checks.

Expected: Agents can discover state owners, events, guards and recovery without executing the app or fetching the corpus.

Observed: 17 authored interaction families documented with scoped DOM/source owners and retrieval guidance. Generated archive and source package are checked in the release artifact record.

### S13 · Calculation and source continuity

Status: **passed**

Action: Run the full Node suite, typecheck and source/corpus integrity checks after the state refactor.

Expected: Tariff, original corpus, rate precision and valid legacy scenario links remain compatible.

Observed: Full suite: 93 passing automated tests. The historical corpus remains 572 paragraphs with its recorded SHA. Build/type/artifact results are recorded separately; physical Safari and assistive-technology checks remain unrun.

## Observed browser interactions

### I01 · AI usage charge

Status: **passed**

Action: Change 86.40 to 86.41 with the range keyboard control, then type an out-of-range 1,000,000.

Expected: The paired amount and subtotal update; rejected input explains which prior value is still used.

Observed: [v17 baseline] Subtotal became 106.41. The invalid draft kept 86.41 in use with a range/last-value notice; blur restored it explicitly.

### I02 · Donation amount

Status: **passed**

Action: Select $1/$5/$10/$0, then enter a custom 2.135 on a 1,000 service bill.

Expected: Preset and custom choices change only the donation and final payment, with cent rounding.

Observed: [v17 baseline] Presets produced 101/105/110/100 on the original bill. Custom 2.135 displayed 2.14 and total 1,002.14. Provider balance did not change.

### I03 · Formula subtotal

Status: **passed**

Action: Type subtotal 525, then load the 524.99 boundary example.

Expected: The formula and receipt share one meter; adopted half-step behavior remains intact.

Observed: [v17 baseline] 525 settled to 550; 524.99 settled to 500. Linked receipt and worked formula agreed.

### I04 · Serving and infrastructure

Status: **passed**

Action: Enter 888, then 888.001.

Expected: Valid cents are accepted; excess precision is identified and blocks review.

Observed: [v17 baseline] 888 appeared in the ledger; 888.001 showed the two-decimal correction and no balance.

### I05 · Research and development

Status: **passed**

Action: Enter 555, then -1.

Expected: A valid monthly allocation is retained; a negative draft is explicitly invalid.

Observed: [v17 baseline] 555 appeared in the ledger. -1 showed the allowed range and no balance.

### I06 · Company operations

Status: **passed**

Action: Enter 555, then 1,000,001.

Expected: An out-of-range allocation remains a visible draft, not a supplied zero.

Observed: [v17 baseline] 555 appeared in the ledger. 1,000,001 showed a range error and no balance.

### I07 · Payment processing

Status: **passed**

Action: Enter 555%, correct to 3%, then use 2.875%, blank and explicit zero.

Expected: The rejected value is named; correction restores calculation; blank and zero differ; the percentage is not rounded early.

Observed: [v17 baseline] 555% showed the requested exact correction. 3% of 1,000 = 30; 2.875% = 28.75; blank withheld the result; explicit zero gave a zero fee after review.

### I08 · Comparison · Assumed demand

Status: **passed**

Action: 154.7 → 180.3

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] Tier contribution 104.90 → 92.10; annual 1,208.80 → 1,055.20. Revenue stays 200 because the subtotal remains in the same settlement band.

### I09 · Comparison · Price per comparison unit

Status: **passed**

Action: 1.25 → 1.35

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] Base + metered revenue 220.38 → 236.41; contribution 111.89 → 127.46.

### I10 · Comparison · Cost per comparison unit

Status: **passed**

Action: 0.50 → 0.55

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] Tier contribution 92.10 → 83.08; annual 1,055.20 → 947.02; revenue remains 200.

### I11 · Comparison · Customers leaving each month

Status: **passed**

Action: 0% → 4%

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] Tier annual 947.02 → 754.45; monthly contribution stays 83.08.

### I12 · Comparison · Fixed-plan allowance

Status: **passed**

Action: 120 → 140

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] Fixed 200 fulfillment 66.6% → 77.6%; contribution 116.25 → 105.25.

### I13 · Comparison · $50 plan allowance

Status: **passed**

Action: 60 → 70

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] $50 fulfillment 33.3% → 38.8%; contribution 3.56 → −1.94. Negative displayed.

### I14 · Comparison · Base-plan allowance

Status: **passed**

Action: 20 → 30

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] Base + metered revenue 236.41 → 222.91; contribution 118.44 → 105.33.

### I15 · Comparison · Loyalty usage discount

Status: **passed**

Action: 15% → 20%

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] Loyalty revenue 192.47 → 182.32; contribution 75.77 → 65.92.

### I16 · Comparison · Loyalty churn reduction

Status: **passed**

Action: 10% → 25% relative

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] Loyalty churn 3.6% → 3.0%; annual 601.74 → 622.70; monthly contribution stays 65.92.

### I17 · Comparison · Delivery overhead

Status: **passed**

Action: 8 → 12

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] Tier contribution 83.08 → 79.08; annual 754.45 → 715.72.

### I18 · Comparison · Other variable expense

Status: **passed**

Action: 4 → 6

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] Tier contribution 79.08 → 77.08; annual 715.72 → 696.36.

### I19 · Comparison · Payment fee

Status: **passed**

Action: 2.875% → 3.125%

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] Tier contribution 77.08 → 76.58, exactly 0.50 lower on 200 revenue; annual 696.36 → 691.52.

### I20 · Comparison · Acquisition cost

Status: **passed**

Action: 50 → 75

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] Tier annual 691.52 → 666.52, exactly 25 lower; monthly contribution unchanged 76.58.

### I21 · Comparison · Default probability

Status: **passed**

Action: 0% → 10%

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] Risk expected loss 0 → 480 with 12,000 balance and 40% LGD.

### I22 · Comparison · Outstanding balance

Status: **passed**

Action: 12,000 → 18,000

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] Risk expected loss 480 → 720.

### I23 · Comparison · Loss given default

Status: **passed**

Action: 40% → 50%

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] Risk expected loss 720 → 900.

### I24 · Comparison · Investment

Status: **passed**

Action: 500,000 → 200,000

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] At 0× return, expected proceeds−500,000 → −200,000.

### I25 · Comparison · Success gross multiple

Status: **passed**

Action: 0× → 4×

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] At 25% success, proceeds−200,000 → 0.

### I26 · Comparison · Success probability

Status: **passed**

Action: 25% → 30%

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: [v17 baseline] At 4× return, proceeds 0 → 40,000. Credit expected loss remained 900.

### I27 · Monthly loyalty discount

Status: **passed**

Action: 5 → 10

Expected: The displayed financial effect follows the labeled control.

Observed: [v17 baseline] Without-benefit annual 340.13 unchanged; with-benefit 295.55 → 250.96.

### I28 · Monthly departures

Status: **passed**

Action: 5 → 10 out of 100

Expected: The displayed financial effect follows the labeled control.

Observed: [v17 baseline] Without 340.13 → 265.50; with 250.96 → 195.90.

### I29 · Relative departure reduction

Status: **passed**

Action: 0% → 50%

Expected: The displayed financial effect follows the labeled control.

Observed: [v17 baseline] Without 265.50 unchanged; with 195.90 → 250.96.

### I30 · Additional acquisition cost

Status: **passed**

Action: 0 → 25

Expected: The displayed financial effect follows the labeled control.

Observed: [v17 baseline] Without 265.50 → 240.50; with 250.96 → 225.96. Both fell 25.

### I31 · Founder investment

Status: **passed**

Action: 1,000,000 → 2,000,000 with 9m pre-money

Expected: The displayed financial effect follows the labeled control.

Observed: [v17 baseline] Ownership 10.00% → 18.18%.

### I32 · Founder pre-money valuation

Status: **passed**

Action: 9,000,000 → 8,000,000 with 2m investment

Expected: The displayed financial effect follows the labeled control.

Observed: [v17 baseline] Ownership 18.18% → 20.00%.

### N01 · Research → Current pricing formula → next Tab

Status: **passed**

Action: Research → Current pricing formula → next Tab

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Reproduced body-focus failure; repaired summary focus and next Tab into subtotal verified

### N02 · Economics comparison → Open the fictional comparison

Status: **passed**

Action: Economics comparison → Open the fictional comparison

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Reproduced lost focus; final wrapper focus and next Tab into demand verified

### N03 · Nested comparison demand 123.45 → reload

Status: **passed**

Action: Nested comparison demand 123.45 → reload

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Reproduced silent restoration to 96.4; revised parser restores 123.45

### N05 · Main tabs: Home from Research, End from Bill

Status: **passed**

Action: Main tabs: Home from Research, End from Bill

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Correct destination selected; focus follows the selected tab

### N06 · Research search: nonexistent term

Status: **passed**

Action: Research search: nonexistent term

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] No chapters shown; visible message offers useful replacement terms

### N07 · Research search: loyalty, switch to Bill and back

Status: **passed**

Action: Research search: loyalty, switch to Bill and back

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Matching chapters remain filtered; query is retained

### N08 · Direct `#chapter-billing` while search hides Billing

Status: **passed**

Action: Direct `#chapter-billing` while search hides Billing

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Search clears, Billing chapter opens, and scroll target is visible

### N09 · Research → Current pricing formula

Status: **passed**

Action: Research → Current pricing formula

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Billing becomes selected; formula drawer opens; top measured near 119 CSS px

### N10 · Clean archive URL `/archive/pricing-formula`

Status: **passed**

Action: Clean archive URL `/archive/pricing-formula`

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Static formula page loads without `.html`; equation and examples are present

### N11 · Static formula → Open interactive drawer

Status: **passed**

Action: Static formula → Open interactive drawer

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] App opens the matching disclosure and displays the current calculation

### N12 · Formula Copy link → clipboard and visible feedback

Status: **passed**

Action: Formula Copy link → clipboard and visible feedback

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Copy feedback and clipboard preserved the formula route and values. Final retest exposed Open this calculation with use=504.99, gift=0 and formula=1.

### N13 · Open this scenario from formula share feedback

Status: **passed**

Action: Open this scenario from formula share feedback

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Route retains formula target and encoded values

### N14 · Formula summary → Enter

Status: **passed**

Action: Formula summary → Enter

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Drawer collapses; focus remains on its summary

### N15 · Direct `#economics-comparison`

Status: **passed**

Action: Direct `#economics-comparison`

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Economics selected; parent worksheet and nested comparison disclosure both open

### N19 · Main-tab ArrowRight at Research; ArrowLeft at Bill

Status: **passed**

Action: Main-tab ArrowRight at Research; ArrowLeft at Bill

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Wraps to Bill and Research respectively; selected tab receives focus

### N20 · Main-tab Space, then main/nested Back and Forward

Status: **passed**

Action: Main-tab Space, then main/nested Back and Forward

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Space selects Economics; final repair aligns focused and selected main tab; nested Back focuses comparison summary

### N21 · Research index → Loyalty chapter → bounded source

Status: **passed**

Action: Research index → Loyalty chapter → bounded source

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Correct static chapter and p-10404 passage open

### N22 · Source passage Next → Previous

Status: **passed**

Action: Source passage Next → Previous

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] p-10404 → p-13252 → p-10404

### N23 · Header Sources → next Tab

Status: **passed**

Action: Header Sources → next Tab

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Sources region receives focus near 119 CSS px; next Tab reaches original conversation

### N24 · Sibling nested aliases with a nondefault scenario

Status: **passed**

Action: Sibling nested aliases with a nondefault scenario

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Public benchmarks, loyalty, method each restore usage/gift/serving draft and correct receipt totals

### N25 · Static chapter → Interactive chapter → Copy chapter link → conflicting search → shared link

Status: **passed**

Action: Static chapter → Interactive chapter → Copy chapter link → conflicting search → shared link

Expected: The destination, state and next action remain understandable and reachable.

Observed: [v17 baseline] Loyalty chapter opens and focuses; copy produces `#chapter-loyalty`; opening it clears hidden-result search and restores chapter context

### R01 · Invalid fee recovery

Status: **passed**

Action: Activate Correct payment processing from the blocked result.

Expected: Focus returns to the invalid field without erasing other values.

Observed: [v17 baseline] Focus reached cost-paymentFee with 555 retained. The field and result both said: 555% is outside this calculator’s 0–20% range. Correct payment processing to calculate.

### R02 · Invalid shared-link recovery

Status: **passed**

Action: Share and reopen the 888/555/555/555% cost scenario.

Expected: Invalid input remains invalid through copy/open/reload.

Observed: [v17 baseline] The v5 link retained the raw 555 draft; the reopened worksheet withheld its balance and showed a correction.

### R03 · Valid review and shared restoration

Status: **passed**

Action: Correct the fee to 3, review costs, then reopen the link.

Expected: Current valid reviewed assumptions restore with the same signed result.

Observed: [v17 baseline] The 1,000 bill minus 888, 555, 555 and 30 produced -1,028.00 and restored consistently.

### R04 · Stale assumptions within the same tier

Status: **passed**

Action: Change usage 1,000 to 1,001 after reviewing costs.

Expected: Review invalidates even if the settled bill is unchanged.

Observed: [v17 baseline] Bill stayed 1,000 but the Usage changed notice appeared and the balance was withheld until review.

### R05 · Scoped cost clearing

Status: **passed**

Action: Clear costs after editing advanced demand, credit balance and loyalty settings, then re-enter and review the costs.

Expected: Only the named cost assumptions clear.

Observed: [v17 baseline] Four cost drafts cleared; demand 180.4, credit 18,000 and loyalty settings remained. Re-review restored the same loyalty comparison.

### R06 · Reset with an unchanged canonical value

Status: **passed**

Action: At the default receipt, type invalid usage, then reset the example.

Expected: Reset clears the invalid local draft even when the accepted number was already the default.

Observed: [v17 baseline] Usage returned to 86.4 and the stale validation hint cleared after rendering.

### R07 · Generic invalid input recovery

Status: **passed**

Action: Enter founder valuation 0; then use Escape. Also test invalid credit probability 101.

Expected: The last valid calculation remains explicitly labeled; recovery restores the accepted entry.

Observed: [v17 baseline] Valuation 0 showed the valid range and prior 8m; Escape restored 8m and ownership 20%. Credit 101 showed the 0–100 range and prior 10%; correcting to 0 yielded zero expected loss.

### R08 · Collapsed worksheet warning

Status: **passed**

Action: Collapse the worksheet while a cost draft is invalid.

Expected: The collapsed summary still identifies a correction needed.

Observed: [v17 baseline] Summary retained Business assumptions · 1 input needs correction; the result did not display an earnings figure.

### R09 · Clipboard failure fallback

Status: **passed**

Action: Use the local QA harness to force clipboard.writeText rejection, then activate Copy link and Tab through the recovery controls.

Expected: Failure offers a usable link and a selectable text field.

Observed: [v17 baseline] Select and copy the link below appeared. Next Tab reached Open this scenario, then the readonly Shareable link field with all 60 characters selected. Controlled failure injection, not a real OS permission prompt.

### R10 · Custom donation continuity

Status: **passed**

Action: Choose $5 then reveal Custom.

Expected: Changing the input mode preserves the selected amount.

Observed: [v17 baseline] Custom retained 5 and the final payment stayed consistent.

### R11 · More examples and threshold switch

Status: **passed**

Action: Switch to threshold examples, load a boundary, then request more examples.

Expected: Examples are actionable, vary to cents and use the same settlement rule.

Observed: [v17 baseline] 524.99 loaded into the linked calculator; more example bills changed the cent-level rows and reconciled.

### C01 · All paired ranges

Status: **passed**

Action: Use ArrowRight on receipt, four advanced ranges and provider retention range.

Expected: Every range and numeric field stay synchronized.

Observed: [v17 baseline] Receipt 86.40→86.41; advanced demand 180.3→180.4, price 1.35→1.40, cost 0.55→0.60, churn 4→4.5; retention 50→51 with departures 4.9% and annual 227.26.

### C02 · Fixed-plan selection

Status: **passed**

Action: Change fixed-plan selection 200→500.

Expected: The selected price affects revenue and contribution; allowance remains its separately labeled assumption.

Observed: [v17 baseline] Revenue 200→500 and contribution 98.75→389.38; fulfillment remained 77.6%.

### C03 · Relationship stage navigation

Status: **passed**

Action: Click all four stage tabs; use Home and ArrowLeft from Customer.

Expected: The selected stage, panel and keyboard focus agree.

Observed: [v17 baseline] Each stage showed its matching heading; Home selected Customer and ArrowLeft wrapped to Mutual investment.

### C04 · Permission preview and revocation

Status: **passed**

Action: Inspect no selection, select Projects & GitHub, revoke it, then select all four categories.

Expected: The preview explains what is selected and disappears when permissions change.

Observed: [v17 baseline] Empty preview was disabled with instructions. Single preview named one category; revocation removed it. All-category preview listed four and stated nothing was connected or sent.

### C05 · All ten research chapter drawers

Status: **passed**

Action: Open and close each chapter individually.

Expected: Each disclosure reveals useful text and its relevant evidence, then closes predictably.

Observed: [v17 baseline] All ten exposed substantive text/source links and closed again. Billing also exposed the current formula link.

### C06 · Companion dismissal and origin

Status: **passed**

Action: Open the pet note; close by button, Escape and outside click; follow Uber inspiration.

Expected: Dismissal returns focus or follows the clicked destination; origin link opens its story.

Observed: [v17 baseline] Close and Escape returned focus to the pet. Outside The idea click dismissed it. Uber inspiration selected Bill and opened the correct founding story.

### C07 · Zero churn and separate speculative models

Status: **passed**

Action: Set churn 0; change credit and partnership assumptions.

Expected: No infinite lifetime claim; credit risk and speculative investment stay separate from subscription earnings.

Observed: [v17 baseline] Lifetime cells said No finite estimate. Credit example was 480; investment example was-125,000, with negative results preserved and separated.

### V01 · Narrow error recovery

Status: **passed**

Action: Inspect 390px layout and use the error recovery control.

Expected: Fields remain full-width, legible and actionable.

Observed: [v17 baseline] Cost controls measured 50px high; error and correction action remained readable without page overflow.

### V02 · 320px with 200% text

Status: **passed**

Action: Inspect the invalid-cost worksheet and recovery focus in the responsive harness at 320px/32px root text.

Expected: Text and buttons wrap; recovery reaches the invalid field.

Observed: [v17 baseline] Document width 305 matched available 305; focus recovery brought the invalid field into view. This is enlarged-text emulation, not physical iOS.

### V03 · Desktop error recovery

Status: **passed**

Action: Inspect 1280px layout at normal and 200% text.

Expected: The paired form/result layout reflows when enlarged.

Observed: [v17 baseline] Normal text showed two columns; enlarged text showed a readable single column. Document width 1265 matched available 1265 in both.

### V04 · Large receipt amounts

Status: **passed**

Action: Enter maximum usage 999,980 and donation 10,000 at 390px and 320px/200% text.

Expected: The 1,010,000 final amount does not create page-wide overflow.

Observed: [v17 baseline] 390px was readable. The first 320px enlarged pass exposed nowrap overflow; revised receipt wrapping passed with document and available widths both 305.

### R12 · Loading and saved-value readiness

Status: **passed**

Action: Reload a shared bill with a $5 donation; inspect pending controls, then act once ready.

Expected: Pending controls are disabled and explain loading. Saved values restore before the available control changes the bill.

Observed: [v17 baseline] During loading aria-busy was true and the $10 button was disabled. Once ready, the saved bill showed $105; clicking the available $10 choice produced $110 and selected that button. Native disabled choices and a visible loading notice now replace the previously active-looking pending buttons.

### S03 · Nested bill snapshot and formula closure

Status: **passed**

Action: Set usage $585.25 and donation $5; follow the pet’s Uber link; refresh. Open the formula, close it and refresh.

Expected: Nested destinations retain the receipt. Closing a formula destination persists a closed drawer.

Observed: Uber destination saved usage $585.25 / donation $5 and restored final $605. Formula closure normalized to billing with formula = 0 and stayed closed after reload.

### S04 · Review validity follows usage history

Status: **passed**

Action: Review serving $50 / development $20 / operations $10 / fee 2.875% with service bill $600. Change donation; commit unchanged usage; change usage $585.25→586.25→585.25.

Expected: Gift and unchanged commits preserve review; any changed usage revokes it until reviewed again.

Observed: Fee $17.25 and balance $502.75 were shown after review. Donation and unchanged Enter preserved review. The A→B→A sequence remained stale with no balance.

### S05 · Nested economics snapshot

Status: **passed**

Action: From a reviewed scenario, follow economics-loyalty and refresh.

Expected: Raw costs, fee precision, review and receipt restore together.

Observed: The v5 nested URL retained the costs, fee 2.875% and reviewed balance $502.75 after reload.

### S06 · Copy feedback belongs to its snapshot

Status: **passed**

Action: Copy the scenario, observe completion, then change its assumptions.

Expected: Pending is visible, successful copy is acknowledged, and changed assumptions clear old feedback.

Observed: Observed Copying link then Link copied. Changing the share target returned feedback to idle. Late/failure paths are automated here; controlled browser rejection belongs to the v17 record.

### S07 · Research loading failure and retry

Status: **passed**

Action: Use the preview-only loader fixture: reject first and second load; retry with keyboard; allow the third load.

Expected: Failure explains recovery, retains the rest of the app, offers static archive and keeps retry keyboard focus.

Observed: Failure status and static-index link appeared. The second rejection retained retry focus; the third attempt loaded the real ten chapters and focused chapters. Fixture route is removed before packaging.

### S08 · Research search is not navigation

Status: **passed**

Action: Enter an unmatched query; clear by button and by editing to empty; follow a chapter destination with a conflicting query.

Expected: Search edits retain focus; deliberate chapter navigation clears conflict and opens the intended chapter.

Observed: No-match count and clear control appeared. Both clearing paths kept search focus. Chapter navigation cleared the query and opened its destination.

### S09 · Same-document navigation ownership

Status: **passed**

Action: Use main tabs, ArrowRight, browser Back and Forward, then Back to the initial empty fragment. Then change usage, switch to economics and back, and immediately press Reset or a donation choice.

Expected: Selected tab, keyboard focus and visible destination agree; empty-fragment home returns to the introduction.

Observed: Tab and keyboard transitions focused the selected tab at explore. Back/Forward retained scroll 1335px in the test viewport instead of jumping to 0. Back to the empty home entry focused main at scroll 0. Returning to the chapters destination focused chapters at scroll 1916px; opening the static index and returning worked across documents. A late production check exposed post-frame scrolling during a new click. The final correction restricts this follow-up to browser history/initial navigation and cancels it on new input. Repeating the quick tab/reset sequence locally restored usage 86.4; quick donation selection applied $5, and Reset cleared it. Back still focused the billing tab at scroll 1335px.

### S10 · Narrow layout at enlarged text

Status: **passed**

Action: Use a 390px responsive frame and 200% root text; set service bill $1,000, donation $10 then custom $12.34; enter invalid fee 555%.

Expected: Receipt remains readable; no page-wide horizontal overflow; error and recovery remain visible.

Observed: Content width 375px matched scroll width 375px. Custom donation produced $1,012.34. Invalid 555% showed the exact range/correction explanation and the collapsed warning. Screenshots: sm-mobile-large.png and sm-mobile-error.png.

### S11 · Enlarged desktop and negative scenario recovery

Status: **passed**

Action: Use a 1280px frame at200% root text; correct fee 555% to2.875 with costs888/555/555 on service bill $1,000, then review.

Expected: Desktop reflows; correcting inputs allows a transparent negative scenario instead of stale profit.

Observed: Content width 1265px matched scroll width 1265px; equation remained mounted. Corrected fee $28.75 yielded balance −$1,026.75. Desktop recovery screenshot saved. These are entered assumptions, not OpenAI cost estimates.

## Device and permission checks still required

### D01 · Physical mobile Safari and touch

Status: **not run**

Action: Use the released site on physical iPhone/iPad, including drag gestures and the OS keyboard.

Expected: Confirm native touch and keyboard behavior.

Observed: [v17 baseline] Not run in this environment. Responsive Chrome checks do not establish Safari behavior.

### D02 · Screen-reader speech output

Status: **not run**

Action: Exercise invalid state, recovery and navigation with VoiceOver or NVDA.

Expected: Verify spoken error context and focus order.

Observed: [v17 baseline] Not run. DOM labels, invalid state and keyboard focus were inspected, but speech output was not.

### D03 · Real browser zoom, OS text size and permission prompts

Status: **not run**

Action: Repeat enlarged-text and clipboard checks using browser zoom, mobile OS text settings and actual denied clipboard permission.

Expected: Confirm native device preference and permission behavior.

Observed: [v17 baseline] Not run.200% root-text/reflow and controlled clipboard rejection were tested instead.

## Reproduce

Run `node --test tests/*.test.mjs` and `./node_modules/.bin/tsc --noEmit` from the source checkout. Browser cases are review procedures, not an unattended Playwright test suite. Reset a simulator before a case unless its action describes a sequence. Monetary inputs and outcomes are USD unless stated otherwise.

Raw Node output: review/state-machines/node-tests.txt. Browser observations were recorded from direct cloud-Chrome interaction. Evidence revision and method notes distinguish retained baseline cases from follow-up execution. They are not an unattended browser suite or a saved replay.
