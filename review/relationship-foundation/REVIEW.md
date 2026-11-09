# Intelligence on Tap · Interaction review

2026-11-08

21 documented cases: 20 passed, 0 partly verified, 1 not run. This is a bounded concept-site review, not a cross-browser or accessibility certification.

The narrative now separates the service relationship, financial evidence and a proposed charitable destination. The receipt settles first; the optional Foundation gift changes total payment only.

Reported company finances teach cost coverage without estimating OpenAI customer margins. The worksheet remains optional and starts with unknown costs.

---

## Method and limits

This is a bounded review of the relationship/Foundation refinement, plus relevant billing and scenario regressions. It does not certify every historical feature.

Visual review used cloud Chrome, responsive iframes and 16px/32px root text. Screen captures are retained in review/relationship-foundation. Native device behavior, real browser zoom, tax eligibility and a live donation channel are not established.

Public benchmark figures were checked against the primary Anthropic S-1/A, Results of Operations and Note 8. Financial scenarios are hypothetical user inputs. No payment or message was sent.

## Consequential changes

- Named the OpenAI Foundation and charitable purpose before gift selection, separating the service bill, gift and total payment.
- Removed featured speculative margin targets; moved sourced accounting evidence ahead of a single optional reviewer worksheet.
- Kept gifts outside commercial revenue and earned privileges; kept costs unknown until explicitly supplied and reviewed.
- Fixed shared worksheet links and nested direct navigation.
- Updated editorial chapters, Markdown, JSON, agent index and source download while preserving the original source corpus and adopted equation.

## Calculation and source regressions

### A01 · Calculation and scenario regression suite

Status: **passed**

Action: Run node --test tests/*.test.mjs.

Expected: Billing boundaries, cost completeness, negative balances, donation exclusion, shared-state parsing and legacy migration remain correct.

Observed: 37 tests passed. The scenario round-trip case also verifies the new cost-scenario link target.

### A02 · Type safety and patch integrity

Status: **passed**

Action: Run TypeScript --noEmit and git diff --check.

Expected: No type errors or whitespace errors.

Observed: Both completed successfully.

### A03 · Source preservation and archive targets

Status: **passed**

Action: Compare original source HTML/JSON and canonical billing/equation modules with the starting commit; inspect local archive links.

Expected: Historical evidence and adopted math unchanged; current archive targets exist.

Observed: All four files are byte-identical to the starting commit. 150 local link/file references checked; none missing.

### A04 · Reported finances reconcile

Status: **passed**

Action: Recalculate each reported expense per $100 revenue and the operating result from the source amounts.

Expected: Expenses total $34,502 million against $33,242 million revenue; operating loss $1,260 million.

Observed: The test suite reconciles totals and ratios. UI and current archive present the result as negative $3.79 per $100, not an individual account margin.

## Observed browser interactions

### B01 · First-visit donation context

Status: **passed**

Action: Open a fresh receipt.

Expected: Settled service bill appears before the optional Foundation donation; default gift is zero.

Observed: Visible receipt named the OpenAI Foundation and the charitable purpose before the choices; $100 service bill, $0 gift, $100 total.

### B02 · Preset donation preserves the bill

Status: **passed**

Action: Select a $5 gift on the reference $86.40 metered example.

Expected: Subtotal $106.40 settles to $100; only total payment becomes $105.

Observed: All values matched and the selected gift had pressed state.

### B03 · Custom gift and usage above $500

Status: **passed**

Action: Enter a $7.23 gift and $585.25 metered usage, then open economics.

Expected: Subtotal $605.25 settles to $600; total $607.23; provider revenue $600.

Observed: Receipt and linked provider bill matched exactly. No $200 ceiling or permanent $500 cap appeared.

### B04 · Unknown costs stay unknown

Status: **passed**

Action: Open the optional reviewer worksheet with blank cost fields.

Expected: No balance; review control disabled; all missing categories identified.

Observed: All four cost categories were Unknown and no earnings estimate was displayed.

### B05 · Reviewed complete cost scenario

Status: **passed**

Action: For a $100 service bill, enter $40 serving, $30 development, $10 operations and 3% payment costs; review.

Expected: No result before review; $17 scenario balance after review.

Observed: The result appeared only after confirmation and was labeled before financing and tax, not OpenAI profit.

### B06 · Foundation gifts excluded from commercial calculations

Status: **passed**

Action: Change the gift from $5 to $10 while retaining the reviewed cost scenario.

Expected: Commercial revenue and balance unchanged.

Observed: Provider bill stayed $100 and scenario balance stayed $17.

### B07 · Cost changes and negative results

Status: **passed**

Action: Change development allocation from $30 to $80, then review again.

Expected: The previous result disappears until reviewed; revised balance is negative $33.

Observed: Review was invalidated immediately; the reviewed result displayed -$33.

### B08 · Direct shared scenario reload

Status: **passed**

Action: Copy the reviewed assumptions link and reload it.

Expected: Open the worksheet directly and restore amounts, review status, receipt and gift.

Observed: The cost-scenario v4 link opened its drawer and restored the -$33 result with the $100 service bill and $10 gift.

### B09 · Usage changes invalidate cost review

Status: **passed**

Action: Move the receipt slider one keyboard step from $86.40 to $86.41 and return to economics.

Expected: The $100 tier stays constant, but prior cost review becomes stale.

Observed: Usage increased by $0.01; the balance disappeared and the site requested another cost review.

### B10 · Reset does not reset the customer receipt

Status: **passed**

Action: Clear cost assumptions after editing the receipt.

Expected: Costs revert to Unknown while metered use, service bill and gift persist.

Observed: All costs cleared; the linked $100 service bill remained. Receipt state was retained in the scenario URL.

### B11 · Nested disclosure direct navigation

Status: **passed**

Action: Load and reload the economics-loyalty anchor.

Expected: Both parent worksheet and nested loyalty disclosure open.

Observed: Both details elements were open after a fresh reload; the visitor did not need to find a hidden parent.

### B12 · Legacy cost links cannot revive misleading earnings

Status: **passed**

Action: Open an economics v3 link with use=1000, gift=10, servingCost=50 and otherCosts=5.

Expected: Preserve the bill and gift; discard incomplete cost defaults; explain the correction.

Observed: The service bill was $1,000; cost fields were Unknown and an explicit migration message appeared.

### B13 · Keyboard operation

Status: **passed**

Action: Use an arrow key on the slider, Space on a donation choice, and Enter on the Foundation disclosure.

Expected: Equivalent keyboard operation with visible state changes.

Observed: Meter advanced by one cent, $1 gift was selected, and the donation/tax-context disclosure expanded.

### B14 · Mobile and enlarged-text visual review

Status: **passed**

Action: Inspect screenshots at 440px and 390px normal text, 320px/390px doubled root text; inspect receipt, evidence, worksheet, formula and archive.

Expected: Controls and labels reflow without page-wide horizontal overflow.

Observed: Donation controls changed to two columns when necessary; cost rows stacked; long labels remained readable. Measured document width equaled the viewport in checked narrow states. Screenshots are saved beside this report.

### B15 · Desktop visual review

Status: **passed**

Action: Inspect receipt and financial evidence at 1280px with normal and doubled root text.

Expected: Readable hierarchy, matching amounts and no label overlap or page-wide overflow.

Observed: Both states were visually inspected. Document width matched the viewport. Foundation recipient, reported-loss label and context remained visible and legible.

### B16 · Current archive and runtime checks

Status: **passed**

Action: Open static provider economics, inspect revised financial/donation context, and inspect app-origin error logs.

Expected: Static archive matches the app; no app-origin runtime errors in reviewed flow.

Observed: Archive showed signed loss and excluded Foundation donations. App-origin error filter returned no entries; browser extension metadata errors were unrelated to the app.

## Device and permission checks still required

### D01 · Physical devices and assistive technology

Status: **not run**

Action: Test native iPhone Safari, Android touch dragging, actual browser zoom and screen-reader announcements.

Expected: Verify behavior on those devices and settings independently.

Observed: Not run in this environment. Responsive iframe sizes and doubled root text are not physical-device or actual-browser-zoom tests.

## Reproduce

Run `node --test tests/*.test.mjs` and `./node_modules/.bin/tsc --noEmit` from the source checkout. Browser cases are review procedures, not an unattended Playwright test suite. Reset a simulator before a case unless its action describes a sequence. Monetary inputs and outcomes are USD unless stated otherwise.

Raw Node output: review/relationship-foundation/node-tests.txt. Browser observations were recorded from direct cloud-Chrome interaction during this revision. They are not an unattended browser suite or a saved replay.
