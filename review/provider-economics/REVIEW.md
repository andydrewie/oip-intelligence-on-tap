# Intelligence on Tap · Interaction review

2026-11-08

24 documented cases: 21 passed, 0 partly verified, 3 not run. This is a bounded concept-site review, not a cross-browser or accessibility certification.

Current bounded review: receipt-linked provider economics, optional public accounting context, and responsive disclosure behavior. The 24 cases below group 35 automated tests and 12 observed browser procedures; they are not 59 independent automated tests.

Historical reviews remain in the source package. This revision does not claim to have repeated every prior device or browser procedure.

---

## Method and limits

Automated: 35 Node calculation/source tests and TypeScript type checking. Browser: direct cloud-Chrome mouse, keyboard, form, clipboard and navigation actions.

Responsive review used a temporary same-origin iframe at 320, 390 and 1280 pixels, with 100% or 200% root-font scaling. Browser scrollbars reduce content widths by 15px. The harness is retained in review notes but is not deployed as a public route.

Screenshots are actual browser captures. The font-scaling harness caused a development hydration warning when it set the root style before React hydration; it is test-only and is absent from the delivered site. Browser-extension metadata errors were also seen and are separate from application behavior.

Public benchmark values were checked against Anthropic S-1/A filed 2026-11-02, Results of Operations p.150 and supplemental expenses p.F-40. Ratios are our calculations, never OpenAI cost estimates.

## Consequential changes

- Primary economics now follows the receipt’s settled bill and explicitly excludes donations.
- Dollar-denominated serving costs replace undefined units in the primary view; results distinguish available funds from net profit.
- Cost assumptions, loyalty, public benchmarks, formulas and the original five-plan comparison are progressively disclosed.
- Economics v3 links restore the receipt and assumptions; reset retains the bill. Legacy comparisons migrate visibly.
- Narrow and enlarged text reflows; benchmark numbers no longer split and disclosure symbols no longer overflow.
- Readable and machine-readable notes include provenance, definitions, assumptions and exclusions.

## Calculation and source regressions

### A01 · Default provider ledger

Status: **passed**

Action: Calculate the default bill and illustrative costs.

Expected: 100 revenue minus 50 serving, 5 other and 3 payment = 42; serving ceiling 92.

Observed: Exact cents assertions pass; no retention improvement is assumed.

### A02 · Receipt boundaries and donation exclusion

Status: **passed**

Action: Evaluate receipt thresholds, large usage and donation variants.

Expected: Provider revenue always equals bill(usage).adjusted and excludes gift.

Observed: M=585.25 gives revenue 600 and default remainder 527; donation cannot alter revenue.

### A03 · Losses and fee rounding

Status: **passed**

Action: Evaluate excess costs, zero fees and a fractional fee rate.

Expected: Preserve losses and cent rounding.

Observed: 2.875% of 100 gives 2.88; negative remainders and cost ceilings remain visible.

### A04 · Loyalty and retention math

Status: **passed**

Action: Evaluate 0% and 100% departures, a 20% relative reduction, and oversized discounts.

Expected: Finite 12-month horizon; relative percent differs from percentage points; no negative price.

Observed: 5% departures reduced by 20% becomes 4%; discount is capped at the settled bill; zero-churn baseline is 454 after acquisition.

### A05 · Shared receipt and assumptions

Status: **passed**

Action: Round-trip v3 economics link with usage 585.25, donation 7.23 and nondefault costs.

Expected: Restore numerical assumptions and the associated receipt.

Observed: Allowlisted fields and receipt restore exactly.

### A06 · Legacy scenario migration

Status: **passed**

Action: Parse v1/v2 economics links.

Expected: Retain advanced inputs, derive metered dollars and explain the change.

Observed: Demand 200, base allowance 10 and price 2 become usage 380; warning is provided.

### A07 · Reported figures and calculated ratios

Status: **passed**

Action: Reconcile the cited benchmark and inspect provider defaults.

Expected: Expense categories sum to 34,502 million; ratios use 33,242 million revenue; no default is sourced from peer ratios.

Observed: Four category ratios round to 14.48, 57.88, 19.91 and 11.52 per 100; serving default remains the independent assumption 50.

### A08 · Existing calculation and source regressions

Status: **passed**

Action: Run all existing model and source tests with the seven new provider tests.

Expected: Existing receipt, settlement, source partitions and scenario checks still pass.

Observed: All 35 Node tests pass: 28 existing and 7 new. Raw output is included.

### A09 · Type checking

Status: **passed**

Action: Run node node_modules/typescript/bin/tsc --noEmit.

Expected: No TypeScript errors.

Observed: Passed.

## Observed browser interactions

### B01 · Cost input, keyboard and pointer slider

Status: **passed**

Action: Type 120.25, press ArrowRight on the cost slider, then drag the slider with the mouse.

Expected: The same input and visible ledger update after each action.

Observed: 120.25 produced a -28.25 shortfall; ArrowRight changed it to 120.26 and -28.26; pointer drag later set 134.05 and showed -42.05.

### B02 · Receipt to economics continuity

Status: **passed**

Action: Enter usage 585.25 and custom donation 7.23, then follow the receipt economics link.

Expected: Subtotal 605.25 settles to 600; donation produces 607.23 final; provider revenue remains 600.

Observed: Observed all values, including payment fee 18 and default remainder 527.

### B03 · Scenario copy and reload

Status: **passed**

Action: Set serving cost 173.48 on that larger bill, copy its link and reload.

Expected: The copied URL includes receipt plus costs; reload restores them.

Observed: Clipboard contained v3, use=585.25, gift=7.23 and servingCost=173.48. Reload showed bill 600 and remainder 403.52.

### B04 · Reset costs while preserving the bill

Status: **passed**

Action: Reset assumptions after the nondefault shared scenario.

Expected: Return cost assumptions to examples, retain current receipt.

Observed: Bill stayed 600; serving cost returned to 50 and remainder to 527. Receipt reset separately restored the 100 example.

### B05 · Loyalty relative reduction and benefit cap

Status: **passed**

Action: Set reduction in departures to 20 and a 700 discount on a 600 bill.

Expected: 95 of 100 retained without benefit versus 96 with it; discount cannot exceed 600.

Observed: Correct retention numbers and a visible 600 cap appeared; negative loyalty result remained visible.

### B06 · Legacy link and advanced isolation

Status: **passed**

Action: Open v2 demand=200, baseUnits=10, rate=2; expand advanced comparison and change demand to 300.

Expected: Migration is visible; advanced changes do not rewrite primary receipt.

Observed: Original comparison inputs and warning appeared. Primary revenue stayed 500 while advanced settlement revenue changed to 600.

### B07 · History navigation

Status: **passed**

Action: Navigate from economics to Edit the bill, then use browser Back.

Expected: Return to economics with assumptions retained.

Observed: Returned to v3 demand 300 / rate 2 / receipt usage 380, with comparison revenue 600.

### B08 · Mobile receipt donation sequence

Status: **passed**

Action: At 390px iframe width and 100% text, select the 5 donation.

Expected: Donation is below the bill, is explicitly labeled, and updates final total without changing usage.

Observed: 100 settled plus 5 donation gave 105 final. Separate custom amount control and commercial-contribution qualification remained readable. No page overflow: 375px client and scroll width.

### B09 · Narrow provider view and enlarged text

Status: **passed**

Action: Inspect 390px default text and 320px at 200% root text; enter serving cost 62.48.

Expected: Controls remain editable, values stay visible and content reflows.

Observed: Remainder became 29.52; at 320px/200%, client and scroll widths were both 305px. Screenshot retained.

### B10 · Expanded benchmark at 200% narrow text

Status: **passed**

Action: Open benchmark at 320px and 200% text, inspect and repair overflow.

Expected: Readable amounts with no page-wide horizontal scroll.

Observed: Found a rotating disclosure symbol overflow and split monetary values. Fixed symbol sizing and stacked benchmark rows. Retest: 305px client and scroll widths; amounts such as 57.88 stay intact.

### B11 · Enlarged desktop reflow

Status: **passed**

Action: Inspect provider view at 1280px iframe width and 200% root text.

Expected: Columns reflow rather than clipping.

Observed: Single-column provider layout remained usable; client and scroll widths both 1265px. Screenshot retained.

### B12 · Direct benchmark entry

Status: **passed**

Action: Navigate directly to #public-benchmarks.

Expected: Select economics and open the correct drawer.

Observed: Economics selected, benchmark expanded and source link present.

## Device and permission checks still required

### D01 · Physical mobile touch and Safari

Status: **not run**

Action: Test on physical iPhone/Android browsers.

Expected: Native touch dragging, virtual keyboard and browser chrome behave correctly.

Observed: Not performed. Cloud Chrome responsive screenshots are not physical-device tests.

### D02 · Assistive technology

Status: **not run**

Action: Use VoiceOver or NVDA through receipt and cost disclosures.

Expected: Controls, value changes and navigation are understandable.

Observed: Not performed. Accessible labels and actual keyboard actions were inspected, but this is not screen-reader certification.

### D03 · Native browser zoom and OS text settings

Status: **not run**

Action: Test actual browser zoom and mobile OS text enlargement.

Expected: Reader settings preserve usability.

Observed: Not performed. This pass used responsive iframe widths and 200% root-font scaling, explicitly labeled as simulations.

## Reproduce

Run `node --test tests/*.test.mjs` and `./node_modules/.bin/tsc --noEmit` from the source checkout. Browser cases are review procedures, not an unattended Playwright test suite. Reset a simulator before a case unless its action describes a sequence. Monetary inputs and outcomes are USD unless stated otherwise.

Raw Node output: review/provider-economics/node-tests.txt. Browser observations were recorded from direct cloud-Chrome interaction during this revision. They are not an unattended browser suite or a saved replay.
