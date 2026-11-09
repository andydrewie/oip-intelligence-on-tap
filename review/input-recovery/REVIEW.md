# Intelligence on Tap · Interaction review

9 November 2026 · Asia/Taipei

87 documented cases: 84 passed, 0 partly verified, 3 not run. This is a bounded concept-site review, not a cross-browser or accessibility certification.

Three independent reconnaissance agents reviewed input contracts, interactive controls, and navigation/archive behavior. The implementation owner repaired the confirmed defects and verified the connected recovery paths. All 32 numeric input instances received real browser edits with recorded visible effects.

The root was fragmented state handling: controls, the calculation engine and URL parsing validated separately; binary supplied flags discarded rejected drafts; a money-rounding helper was reused for percentage rates. Tests had covered arithmetic and selected successful interactions without covering the complete invalid → explanation → correction → share/reload → reset path.

This revision separates missing, invalid and valid values, preserves rejected cost drafts, makes recovery actionable, and centralizes route and validation contracts. The adopted settlement equation and historical source corpus are unchanged. This record is evidence of bounded coverage, not a promise that every device or every possible state is defect-free.

---

## Method and limits

The 57 Node tests are automated. The browser cases are directly observed cloud-Chrome procedures, including independent agent observations; they are not an unattended browser suite or a saved replay. Numeric case tables in the reconnaissance notes record sequential edits, so their outputs are not all based on the default scenario.

All 32 numeric instances, six ranges, the fixed-plan select, donation choices, tabs, permission previews, research search and chapter drawers, companion, scenario sharing and reset behavior were inventoried. Shared-field state and boundary tests supplement one real causal edit per numeric instance; not every boundary was physically typed into every repeated field.

Visual checks used responsive frames at 320/390/1280px and normal/200% root text, plus desktop browser observations. This exercises reflow but is not physical Safari or actual browser zoom. Controlled clipboard rejection verified fallback presentation and keyboard selection.

External financial claims were not re-researched during this interaction repair. Static link integrity cannot establish external source accuracy. Company evidence remains separate from user-entered cost assumptions.

After the final source/report package is built, deployment must be followed by a live-site smoke check. Build and deployment outcomes are reported separately from these pre-publication cases.

## Consequential changes

- One cost-state contract across fields, calculation and v5 links: empty, invalid and explicit zero remain distinct.
- Exact invalid-value messages beside the field and blocked result, a correction action that returns focus, and a warning retained in a collapsed worksheet.
- Percentages retain their precision until the final monetary charge; decimal half-cent handling is centralized.
- Cost clearing affects only costs; invalid generic entries explain the last accepted value and reset reliably.
- Nested scenario URLs restore their values, while cross-tab navigation and comparison reveal move keyboard focus to the destination.
- Contextual chapter/calculation sharing labels, full-size cost fields and large-amount wrapping.
- Updated human and machine documentation, regression tests, source download and a project release gate covering complete recovery paths.
- The receipt explains loading and visibly disables donation choices until the interactive state is ready.

## Calculation and source regressions

### A01 · Automated regression suite

Status: **passed**

Action: Run node --test tests/*.test.mjs.

Expected: All existing and new calculation/input/source regressions pass.

Observed: 57 tests passed,0 failed. Raw output is included in the source download.

### A02 · Malformed and legacy cost links

Status: **passed**

Action: Test v4 known-flag variants, rejected numbers, omitted supplied values and v5 raw drafts.

Expected: No invalid or missing supplied value becomes a trusted zero.

Observed: Independent regression cases pass for 1.0/01/1e0 flags, hex/binary values, missing values and valid/empty/invalid round trips.

### A03 · Decimal money and percentage arithmetic

Status: **passed**

Action: Test half-cent money and 2.875% of 1,000 without pre-rounding the percentage.

Expected: Decimal semantics agree with the displayed cents.

Observed: 2.135→2.14;2.875%×1,000→28.75. Tiny and high-precision rates remain finite within supported bounds.

### A04 · Tariff boundaries and monotonicity

Status: **passed**

Action: Check exact named midpoints, adjacent cents and above 500 half-steps; scan subtotal cents through 10,000.

Expected: The adopted equation remains consistent and nondecreasing.

Observed: All settlement tests pass;525→550 and 524.99→500. No pricing-policy changes were made.

### A05 · All nested scenario aliases

Status: **passed**

Action: Round-trip nondefault receipt and economics state through all six economics destinations.

Expected: Writer, parser and linked receipt agree for every registered target.

Observed: Regression tests pass for economics, cost-scenario, public-benchmarks, economics-loyalty, economics-method and economics-comparison.

### A06 · Archive and source contract

Status: **passed**

Action: Regenerate archive; test v5 metadata, input states, cost bounds and preserved source digest.

Expected: Human and machine exports match current behavior; historical evidence stays unchanged.

Observed: Both new archive-contract tests and existing source/model tests pass.

### A07 · Static target and JSON integrity

Status: **passed**

Action: Run final release artifact checker after report and source packaging.

Expected: Static local destinations/fragments resolve; JSON parses; archive members are valid and current.

Observed: Recorded in review/input-recovery/artifact-checks.json; no broken static destinations, duplicate IDs, invalid JSON or corrupt ZIP members.

### A08 · TypeScript validation

Status: **passed**

Action: Run ./node_modules/.bin/tsc --noEmit.

Expected: No type errors.

Observed: Completed with exit 0 and no diagnostics.

## Observed browser interactions

### I01 · AI usage charge

Status: **passed**

Action: Change 86.40 to 86.41 with the range keyboard control, then type an out-of-range 1,000,000.

Expected: The paired amount and subtotal update; rejected input explains which prior value is still used.

Observed: Subtotal became 106.41. The invalid draft kept 86.41 in use with a range/last-value notice; blur restored it explicitly.

### I02 · Donation amount

Status: **passed**

Action: Select $1/$5/$10/$0, then enter a custom 2.135 on a 1,000 service bill.

Expected: Preset and custom choices change only the donation and final payment, with cent rounding.

Observed: Presets produced 101/105/110/100 on the original bill. Custom 2.135 displayed 2.14 and total 1,002.14. Provider balance did not change.

### I03 · Formula subtotal

Status: **passed**

Action: Type subtotal 525, then load the 524.99 boundary example.

Expected: The formula and receipt share one meter; adopted half-step behavior remains intact.

Observed: 525 settled to 550; 524.99 settled to 500. Linked receipt and worked formula agreed.

### I04 · Serving and infrastructure

Status: **passed**

Action: Enter 888, then 888.001.

Expected: Valid cents are accepted; excess precision is identified and blocks review.

Observed: 888 appeared in the ledger; 888.001 showed the two-decimal correction and no balance.

### I05 · Research and development

Status: **passed**

Action: Enter 555, then -1.

Expected: A valid monthly allocation is retained; a negative draft is explicitly invalid.

Observed: 555 appeared in the ledger. -1 showed the allowed range and no balance.

### I06 · Company operations

Status: **passed**

Action: Enter 555, then 1,000,001.

Expected: An out-of-range allocation remains a visible draft, not a supplied zero.

Observed: 555 appeared in the ledger. 1,000,001 showed a range error and no balance.

### I07 · Payment processing

Status: **passed**

Action: Enter 555%, correct to 3%, then use 2.875%, blank and explicit zero.

Expected: The rejected value is named; correction restores calculation; blank and zero differ; the percentage is not rounded early.

Observed: 555% showed the requested exact correction. 3% of 1,000 = 30; 2.875% = 28.75; blank withheld the result; explicit zero gave a zero fee after review.

### I08 · Comparison · Assumed demand

Status: **passed**

Action: 154.7 → 180.3

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: Tier contribution 104.90 → 92.10; annual 1,208.80 → 1,055.20. Revenue stays 200 because the subtotal remains in the same settlement band.

### I09 · Comparison · Price per comparison unit

Status: **passed**

Action: 1.25 → 1.35

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: Base + metered revenue 220.38 → 236.41; contribution 111.89 → 127.46.

### I10 · Comparison · Cost per comparison unit

Status: **passed**

Action: 0.50 → 0.55

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: Tier contribution 92.10 → 83.08; annual 1,055.20 → 947.02; revenue remains 200.

### I11 · Comparison · Customers leaving each month

Status: **passed**

Action: 0% → 4%

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: Tier annual 947.02 → 754.45; monthly contribution stays 83.08.

### I12 · Comparison · Fixed-plan allowance

Status: **passed**

Action: 120 → 140

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: Fixed 200 fulfillment 66.6% → 77.6%; contribution 116.25 → 105.25.

### I13 · Comparison · $50 plan allowance

Status: **passed**

Action: 60 → 70

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: $50 fulfillment 33.3% → 38.8%; contribution 3.56 → −1.94. Negative displayed.

### I14 · Comparison · Base-plan allowance

Status: **passed**

Action: 20 → 30

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: Base + metered revenue 236.41 → 222.91; contribution 118.44 → 105.33.

### I15 · Comparison · Loyalty usage discount

Status: **passed**

Action: 15% → 20%

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: Loyalty revenue 192.47 → 182.32; contribution 75.77 → 65.92.

### I16 · Comparison · Loyalty churn reduction

Status: **passed**

Action: 10% → 25% relative

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: Loyalty churn 3.6% → 3.0%; annual 601.74 → 622.70; monthly contribution stays 65.92.

### I17 · Comparison · Delivery overhead

Status: **passed**

Action: 8 → 12

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: Tier contribution 83.08 → 79.08; annual 754.45 → 715.72.

### I18 · Comparison · Other variable expense

Status: **passed**

Action: 4 → 6

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: Tier contribution 79.08 → 77.08; annual 715.72 → 696.36.

### I19 · Comparison · Payment fee

Status: **passed**

Action: 2.875% → 3.125%

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: Tier contribution 77.08 → 76.58, exactly 0.50 lower on 200 revenue; annual 696.36 → 691.52.

### I20 · Comparison · Acquisition cost

Status: **passed**

Action: 50 → 75

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: Tier annual 691.52 → 666.52, exactly 25 lower; monthly contribution unchanged 76.58.

### I21 · Comparison · Default probability

Status: **passed**

Action: 0% → 10%

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: Risk expected loss 0 → 480 with 12,000 balance and 40% LGD.

### I22 · Comparison · Outstanding balance

Status: **passed**

Action: 12,000 → 18,000

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: Risk expected loss 480 → 720.

### I23 · Comparison · Loss given default

Status: **passed**

Action: 40% → 50%

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: Risk expected loss 720 → 900.

### I24 · Comparison · Investment

Status: **passed**

Action: 500,000 → 200,000

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: At 0× return, expected proceeds−500,000 → −200,000.

### I25 · Comparison · Success gross multiple

Status: **passed**

Action: 0× → 4×

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: At 25% success, proceeds−200,000 → 0.

### I26 · Comparison · Success probability

Status: **passed**

Action: 25% → 30%

Expected: A real edit produces the corresponding visible result; unrelated models remain separate.

Observed: At 4× return, proceeds 0 → 40,000. Credit expected loss remained 900.

### I27 · Monthly loyalty discount

Status: **passed**

Action: 5 → 10

Expected: The displayed financial effect follows the labeled control.

Observed: Without-benefit annual 340.13 unchanged; with-benefit 295.55 → 250.96.

### I28 · Monthly departures

Status: **passed**

Action: 5 → 10 out of 100

Expected: The displayed financial effect follows the labeled control.

Observed: Without 340.13 → 265.50; with 250.96 → 195.90.

### I29 · Relative departure reduction

Status: **passed**

Action: 0% → 50%

Expected: The displayed financial effect follows the labeled control.

Observed: Without 265.50 unchanged; with 195.90 → 250.96.

### I30 · Additional acquisition cost

Status: **passed**

Action: 0 → 25

Expected: The displayed financial effect follows the labeled control.

Observed: Without 265.50 → 240.50; with 250.96 → 225.96. Both fell 25.

### I31 · Founder investment

Status: **passed**

Action: 1,000,000 → 2,000,000 with 9m pre-money

Expected: The displayed financial effect follows the labeled control.

Observed: Ownership 10.00% → 18.18%.

### I32 · Founder pre-money valuation

Status: **passed**

Action: 9,000,000 → 8,000,000 with 2m investment

Expected: The displayed financial effect follows the labeled control.

Observed: Ownership 18.18% → 20.00%.

### N01 · Research → Current pricing formula → next Tab

Status: **passed**

Action: Research → Current pricing formula → next Tab

Expected: The destination, state and next action remain understandable and reachable.

Observed: Reproduced body-focus failure; repaired summary focus and next Tab into subtotal verified

### N02 · Economics comparison → Open the fictional comparison

Status: **passed**

Action: Economics comparison → Open the fictional comparison

Expected: The destination, state and next action remain understandable and reachable.

Observed: Reproduced lost focus; final wrapper focus and next Tab into demand verified

### N03 · Nested comparison demand 123.45 → reload

Status: **passed**

Action: Nested comparison demand 123.45 → reload

Expected: The destination, state and next action remain understandable and reachable.

Observed: Reproduced silent restoration to 96.4; revised parser restores 123.45

### N05 · Main tabs: Home from Research, End from Bill

Status: **passed**

Action: Main tabs: Home from Research, End from Bill

Expected: The destination, state and next action remain understandable and reachable.

Observed: Correct destination selected; focus follows the selected tab

### N06 · Research search: nonexistent term

Status: **passed**

Action: Research search: nonexistent term

Expected: The destination, state and next action remain understandable and reachable.

Observed: No chapters shown; visible message offers useful replacement terms

### N07 · Research search: loyalty, switch to Bill and back

Status: **passed**

Action: Research search: loyalty, switch to Bill and back

Expected: The destination, state and next action remain understandable and reachable.

Observed: Matching chapters remain filtered; query is retained

### N08 · Direct `#chapter-billing` while search hides Billing

Status: **passed**

Action: Direct `#chapter-billing` while search hides Billing

Expected: The destination, state and next action remain understandable and reachable.

Observed: Search clears, Billing chapter opens, and scroll target is visible

### N09 · Research → Current pricing formula

Status: **passed**

Action: Research → Current pricing formula

Expected: The destination, state and next action remain understandable and reachable.

Observed: Billing becomes selected; formula drawer opens; top measured near 119 CSS px

### N10 · Clean archive URL `/archive/pricing-formula`

Status: **passed**

Action: Clean archive URL `/archive/pricing-formula`

Expected: The destination, state and next action remain understandable and reachable.

Observed: Static formula page loads without `.html`; equation and examples are present

### N11 · Static formula → Open interactive drawer

Status: **passed**

Action: Static formula → Open interactive drawer

Expected: The destination, state and next action remain understandable and reachable.

Observed: App opens the matching disclosure and displays the current calculation

### N12 · Formula Copy link → clipboard and visible feedback

Status: **passed**

Action: Formula Copy link → clipboard and visible feedback

Expected: The destination, state and next action remain understandable and reachable.

Observed: Copy feedback and clipboard preserved the formula route and values. Final retest exposed Open this calculation with use=504.99, gift=0 and formula=1.

### N13 · Open this scenario from formula share feedback

Status: **passed**

Action: Open this scenario from formula share feedback

Expected: The destination, state and next action remain understandable and reachable.

Observed: Route retains formula target and encoded values

### N14 · Formula summary → Enter

Status: **passed**

Action: Formula summary → Enter

Expected: The destination, state and next action remain understandable and reachable.

Observed: Drawer collapses; focus remains on its summary

### N15 · Direct `#economics-comparison`

Status: **passed**

Action: Direct `#economics-comparison`

Expected: The destination, state and next action remain understandable and reachable.

Observed: Economics selected; parent worksheet and nested comparison disclosure both open

### N19 · Main-tab ArrowRight at Research; ArrowLeft at Bill

Status: **passed**

Action: Main-tab ArrowRight at Research; ArrowLeft at Bill

Expected: The destination, state and next action remain understandable and reachable.

Observed: Wraps to Bill and Research respectively; selected tab receives focus

### N20 · Main-tab Space, then main/nested Back and Forward

Status: **passed**

Action: Main-tab Space, then main/nested Back and Forward

Expected: The destination, state and next action remain understandable and reachable.

Observed: Space selects Economics; final repair aligns focused and selected main tab; nested Back focuses comparison summary

### N21 · Research index → Loyalty chapter → bounded source

Status: **passed**

Action: Research index → Loyalty chapter → bounded source

Expected: The destination, state and next action remain understandable and reachable.

Observed: Correct static chapter and p-10404 passage open

### N22 · Source passage Next → Previous

Status: **passed**

Action: Source passage Next → Previous

Expected: The destination, state and next action remain understandable and reachable.

Observed: p-10404 → p-13252 → p-10404

### N23 · Header Sources → next Tab

Status: **passed**

Action: Header Sources → next Tab

Expected: The destination, state and next action remain understandable and reachable.

Observed: Sources region receives focus near 119 CSS px; next Tab reaches original conversation

### N24 · Sibling nested aliases with a nondefault scenario

Status: **passed**

Action: Sibling nested aliases with a nondefault scenario

Expected: The destination, state and next action remain understandable and reachable.

Observed: Public benchmarks, loyalty, method each restore usage/gift/serving draft and correct receipt totals

### N25 · Static chapter → Interactive chapter → Copy chapter link → conflicting search → shared link

Status: **passed**

Action: Static chapter → Interactive chapter → Copy chapter link → conflicting search → shared link

Expected: The destination, state and next action remain understandable and reachable.

Observed: Loyalty chapter opens and focuses; copy produces `#chapter-loyalty`; opening it clears hidden-result search and restores chapter context

### R01 · Invalid fee recovery

Status: **passed**

Action: Activate Correct payment processing from the blocked result.

Expected: Focus returns to the invalid field without erasing other values.

Observed: Focus reached cost-paymentFee with 555 retained. The field and result both said: 555% is outside this calculator’s 0–20% range. Correct payment processing to calculate.

### R02 · Invalid shared-link recovery

Status: **passed**

Action: Share and reopen the 888/555/555/555% cost scenario.

Expected: Invalid input remains invalid through copy/open/reload.

Observed: The v5 link retained the raw 555 draft; the reopened worksheet withheld its balance and showed a correction.

### R03 · Valid review and shared restoration

Status: **passed**

Action: Correct the fee to 3, review costs, then reopen the link.

Expected: Current valid reviewed assumptions restore with the same signed result.

Observed: The 1,000 bill minus 888, 555, 555 and 30 produced -1,028.00 and restored consistently.

### R04 · Stale assumptions within the same tier

Status: **passed**

Action: Change usage 1,000 to 1,001 after reviewing costs.

Expected: Review invalidates even if the settled bill is unchanged.

Observed: Bill stayed 1,000 but the Usage changed notice appeared and the balance was withheld until review.

### R05 · Scoped cost clearing

Status: **passed**

Action: Clear costs after editing advanced demand, credit balance and loyalty settings, then re-enter and review the costs.

Expected: Only the named cost assumptions clear.

Observed: Four cost drafts cleared; demand 180.4, credit 18,000 and loyalty settings remained. Re-review restored the same loyalty comparison.

### R06 · Reset with an unchanged canonical value

Status: **passed**

Action: At the default receipt, type invalid usage, then reset the example.

Expected: Reset clears the invalid local draft even when the accepted number was already the default.

Observed: Usage returned to 86.4 and the stale validation hint cleared after rendering.

### R07 · Generic invalid input recovery

Status: **passed**

Action: Enter founder valuation 0; then use Escape. Also test invalid credit probability 101.

Expected: The last valid calculation remains explicitly labeled; recovery restores the accepted entry.

Observed: Valuation 0 showed the valid range and prior 8m; Escape restored 8m and ownership 20%. Credit 101 showed the 0–100 range and prior 10%; correcting to 0 yielded zero expected loss.

### R08 · Collapsed worksheet warning

Status: **passed**

Action: Collapse the worksheet while a cost draft is invalid.

Expected: The collapsed summary still identifies a correction needed.

Observed: Summary retained Business assumptions · 1 input needs correction; the result did not display an earnings figure.

### R09 · Clipboard failure fallback

Status: **passed**

Action: Use the local QA harness to force clipboard.writeText rejection, then activate Copy link and Tab through the recovery controls.

Expected: Failure offers a usable link and a selectable text field.

Observed: Select and copy the link below appeared. Next Tab reached Open this scenario, then the readonly Shareable link field with all 60 characters selected. Controlled failure injection, not a real OS permission prompt.

### R10 · Custom donation continuity

Status: **passed**

Action: Choose $5 then reveal Custom.

Expected: Changing the input mode preserves the selected amount.

Observed: Custom retained 5 and the final payment stayed consistent.

### R11 · More examples and threshold switch

Status: **passed**

Action: Switch to threshold examples, load a boundary, then request more examples.

Expected: Examples are actionable, vary to cents and use the same settlement rule.

Observed: 524.99 loaded into the linked calculator; more example bills changed the cent-level rows and reconciled.

### C01 · All paired ranges

Status: **passed**

Action: Use ArrowRight on receipt, four advanced ranges and provider retention range.

Expected: Every range and numeric field stay synchronized.

Observed: Receipt 86.40→86.41; advanced demand 180.3→180.4, price 1.35→1.40, cost 0.55→0.60, churn 4→4.5; retention 50→51 with departures 4.9% and annual 227.26.

### C02 · Fixed-plan selection

Status: **passed**

Action: Change fixed-plan selection 200→500.

Expected: The selected price affects revenue and contribution; allowance remains its separately labeled assumption.

Observed: Revenue 200→500 and contribution 98.75→389.38; fulfillment remained 77.6%.

### C03 · Relationship stage navigation

Status: **passed**

Action: Click all four stage tabs; use Home and ArrowLeft from Customer.

Expected: The selected stage, panel and keyboard focus agree.

Observed: Each stage showed its matching heading; Home selected Customer and ArrowLeft wrapped to Mutual investment.

### C04 · Permission preview and revocation

Status: **passed**

Action: Inspect no selection, select Projects & GitHub, revoke it, then select all four categories.

Expected: The preview explains what is selected and disappears when permissions change.

Observed: Empty preview was disabled with instructions. Single preview named one category; revocation removed it. All-category preview listed four and stated nothing was connected or sent.

### C05 · All ten research chapter drawers

Status: **passed**

Action: Open and close each chapter individually.

Expected: Each disclosure reveals useful text and its relevant evidence, then closes predictably.

Observed: All ten exposed substantive text/source links and closed again. Billing also exposed the current formula link.

### C06 · Companion dismissal and origin

Status: **passed**

Action: Open the pet note; close by button, Escape and outside click; follow Uber inspiration.

Expected: Dismissal returns focus or follows the clicked destination; origin link opens its story.

Observed: Close and Escape returned focus to the pet. Outside The idea click dismissed it. Uber inspiration selected Bill and opened the correct founding story.

### C07 · Zero churn and separate speculative models

Status: **passed**

Action: Set churn 0; change credit and partnership assumptions.

Expected: No infinite lifetime claim; credit risk and speculative investment stay separate from subscription earnings.

Observed: Lifetime cells said No finite estimate. Credit example was 480; investment example was-125,000, with negative results preserved and separated.

### V01 · Narrow error recovery

Status: **passed**

Action: Inspect 390px layout and use the error recovery control.

Expected: Fields remain full-width, legible and actionable.

Observed: Cost controls measured 50px high; error and correction action remained readable without page overflow.

### V02 · 320px with 200% text

Status: **passed**

Action: Inspect the invalid-cost worksheet and recovery focus in the responsive harness at 320px/32px root text.

Expected: Text and buttons wrap; recovery reaches the invalid field.

Observed: Document width 305 matched available 305; focus recovery brought the invalid field into view. This is enlarged-text emulation, not physical iOS.

### V03 · Desktop error recovery

Status: **passed**

Action: Inspect 1280px layout at normal and 200% text.

Expected: The paired form/result layout reflows when enlarged.

Observed: Normal text showed two columns; enlarged text showed a readable single column. Document width 1265 matched available 1265 in both.

### V04 · Large receipt amounts

Status: **passed**

Action: Enter maximum usage 999,980 and donation 10,000 at 390px and 320px/200% text.

Expected: The 1,010,000 final amount does not create page-wide overflow.

Observed: 390px was readable. The first 320px enlarged pass exposed nowrap overflow; revised receipt wrapping passed with document and available widths both 305.

### R12 · Loading and saved-value readiness

Status: **passed**

Action: Reload a shared bill with a $5 donation; inspect pending controls, then act once ready.

Expected: Pending controls are disabled and explain loading. Saved values restore before the available control changes the bill.

Observed: During loading aria-busy was true and the $10 button was disabled. Once ready, the saved bill showed $105; clicking the available $10 choice produced $110 and selected that button. Native disabled choices and a visible loading notice now replace the previously active-looking pending buttons.

## Device and permission checks still required

### D01 · Physical mobile Safari and touch

Status: **not run**

Action: Use the released site on physical iPhone/iPad, including drag gestures and the OS keyboard.

Expected: Confirm native touch and keyboard behavior.

Observed: Not run in this environment. Responsive Chrome checks do not establish Safari behavior.

### D02 · Screen-reader speech output

Status: **not run**

Action: Exercise invalid state, recovery and navigation with VoiceOver or NVDA.

Expected: Verify spoken error context and focus order.

Observed: Not run. DOM labels, invalid state and keyboard focus were inspected, but speech output was not.

### D03 · Real browser zoom, OS text size and permission prompts

Status: **not run**

Action: Repeat enlarged-text and clipboard checks using browser zoom, mobile OS text settings and actual denied clipboard permission.

Expected: Confirm native device preference and permission behavior.

Observed: Not run.200% root-text/reflow and controlled clipboard rejection were tested instead.

## Reproduce

Run `node --test tests/*.test.mjs` and `./node_modules/.bin/tsc --noEmit` from the source checkout. Browser cases are review procedures, not an unattended Playwright test suite. Reset a simulator before a case unless its action describes a sequence. Monetary inputs and outcomes are USD unless stated otherwise.

Raw Node output: review/input-recovery/node-tests.txt. Browser observations were recorded from direct cloud-Chrome interaction during this revision. They are not an unattended browser suite or a saved replay.
