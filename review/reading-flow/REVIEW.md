# Intelligence on Tap · Interaction review

2026-11-08

51 documented cases: 46 passed, 0 partly verified, 5 not run. This is a bounded concept-site review, not a cross-browser or accessibility certification.

This pass addresses reading order, receipt clarity and text enlargement. The adopted pricing formula and historical source corpus are unchanged.

The final billing interaction is one receipt. Membership and editable usage lead to subtotal and rounding, then an optional donation and final total. Supporting calculations and background come afterward.

These are bounded engineering and editorial observations, not proof that every visitor will understand the site or a formal accessibility certification.

---

## Method and limits

28 existing Node regression tests plus 18 observed browser procedures. The browser checks were performed through direct cloud-Chrome interaction; they are not an unattended test suite.

Desktop screenshots and narrow same-origin frames were inspected. Root-font enlargement to 200% and a narrow viewport displayed at 2x tested two distinct kinds of reflow. Native browser zoom, physical Safari/iPhone, VoiceOver and denied-clipboard paths remain unverified.

The temporary responsive fixture is excluded from the release. Screenshots in this review show the local production-source preview. The deployed revision receives an additional public smoke check.

Uber reference: https://help.uber.com/en/riders/article/node-title?nodeId=12312768-6482-4969-8790-ff6efcf8c93f and https://www.uber.com/tw/en/ride/how-it-works/tips/ . Used the optional post-trip choice, preset amounts and custom-amount pattern; this is an independently designed concept receipt, not a reproduction of a particular Uber screen.

## Consequential changes

- Introduced billing vocabulary in scroll order and removed the duplicated calculator/payment surface.
- Placed usage, rounding, optional donation and final total in one receipt. Donation choices preserve usage; custom entry preserves the selected amount.
- Used readable relative type, quieter supporting notes and reflowing layouts; separated the custom donation control from preset dollar buttons.
- Explained economics terms before controls/results; clarified the local permission preview and source/download labels.
- Fixed scenario persistence for visitors who naturally scroll into the bill. Shared calculations and reset remain connected to the same formula.
- Kept exact pricing, source evidence, philosophical wording, blue palette, official font files and pet declarations intact.

## Calculation and source regressions

### A01 · M19 Economics baseline distinguishes revenue, gross profit, contribution

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A02 · M20 Fixed-plan fulfillment responds to allowance, not imaginary overage

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A03 · M21 Retail rate and inference cost affect different parts of economics

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A04 · M22 Churn changes horizon value without changing monthly revenue

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A05 · M23 Loyalty rate and retention benefits remain separate hypotheses

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A06 · M24 Expense classifications and acquisition cost do not contaminate revenue

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A07 · M25 Credit loss corners remain separate from subscription economics

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A08 · five models reconcile service and contribution economics

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A09 · zero churn has a finite horizon but no finite perpetual LTV

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A10 · high cost losses are preserved; no negative value clamping

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A11 · receipt amounts reconcile at cent precision and reject non-finite inputs

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A12 · near-zero churn converges to the zero-churn finite horizon

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A13 · shared scenarios round-trip every allowed input without leaking extra state

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A14 · bounded source passages reconstruct every source paragraph without omissions or edits

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A15 · S01 Adopted totals, exact ties and adjacent cents match author-approved outcomes

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A16 · S02 Screenshot regression: meter 585.25 includes base exactly once and continues beyond 500

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A17 · S03 Original 106.40 → 100 settles before every contribution

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A18 · S04 Positive adjustments are explicit; no negative discounts or hidden cap

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A19 · S05 Dollar amounts reconcile to cents even at fractional-cent entry

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A20 · S06 Settlement is nondecreasing throughout the first $10,000 in cent increments

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A21 · S07 Above 500, distance to nearest 50 is at most 25 and each band grows by 50

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A22 · S08 Invalid monetary inputs remain finite, nonnegative

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A23 · S09 Example generator provides changing cent-level totals within supported bounds

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A24 · S10 Formula link restores the same meter, contribution and open drawer

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A25 · S11 Legacy links retain valid meter and gift, disclose removal of former cap and curve

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A26 · S12 Scenario validation rejects invalid amounts, flags and unsupported versions

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A27 · S13 Economic comparison uses the same settlement function for its calculated meter

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

### A28 · S14 Published model specification agrees with canonical cases and version

Status: **passed**

Action: Run node --test tests/*.test.mjs from the source checkout.

Expected: All assertions for this behavior pass; expected settlement outputs are specified independently in tests/settlement.test.mjs.

Observed: Passed. Exact assertion code and raw output are included in the source download.

## Observed browser interactions

### B01 · First-reader orientation

Status: **passed**

Action: Read the homepage, overview and billing entry in viewport-sized steps at 390 CSS pixels.

Expected: Purpose and billing sequence are introduced before the controls.

Observed: The page identifies an independent ChatGPT concept, explains membership plus usage, then rounding and optional donation. This is an editorial review, not a novice-user study.

### B02 · One receipt, one payment sequence

Status: **passed**

Action: Inspect the final billing panel on desktop and mobile.

Expected: One receipt contains membership, editable usage, subtotal, adjustment, donation and final bill.

Observed: The duplicate calculator summary and quick-donation preset were removed. Formula, charitable-path and origin details follow the receipt.

### B03 · All preset donations

Status: **passed**

Action: Set usage to 86.40; choose $0, $1, $5 and $10.

Expected: Final totals 100.00, 101.00, 105.00 and 110.00.

Observed: All four final totals matched; the $0 option explicitly means no donation.

### B04 · Donation preserves a nondefault usage amount

Status: **passed**

Action: Set usage to 585.25 and choose a $5 donation.

Expected: Subtotal 605.25, rounded bill 600.00, final 605.00; usage remains 585.25.

Observed: Matched in desktop interaction and 320-pixel mobile with 200% root text.

### B05 · Custom donation preserves the selected amount

Status: **passed**

Action: Choose $5, open Enter another amount, then type 7.23 at usage 585.25.

Expected: Opening custom preserves 5; final becomes 607.23 without resetting usage.

Observed: Observed 5 in the custom field, then 607.23 final and unchanged 585.25 usage. The custom control spans its own row.

### B06 · Formula and receipt share one scenario

Status: **passed**

Action: With a $10 donation, select the 525.17 subtotal example.

Expected: Usage becomes 505.17, settled bill 550, final 560 in both views.

Observed: Receipt and drawer both displayed 560.00. The donation was retained.

### B07 · Shared calculation restores the same values

Status: **passed**

Action: Copy the calculation link and navigate to the clipboard URL.

Expected: Restore usage, donation and expanded formula.

Observed: Restored /#pricing-formula?v=2&use=505.17&gift=10&formula=1; both totals were 560.00.

### B08 · Reset has a complete and predictable result

Status: **passed**

Action: Activate Reset example bill from a shared nondefault calculation.

Expected: Restore usage 86.40, no donation, final 100 and collapsed formula.

Observed: Observed 86.4 input, 100.00 final, and no open attribute on the formula drawer.

### B09 · Natural-scroll edits survive refresh

Status: **passed**

Action: Enter from the root without a hash, edit usage to 585.25, choose 5, and reload.

Expected: The URL records the scenario and reload preserves it.

Observed: URL became #billing?v=2&use=585.25&gift=5&formula=0; reload restored 585.25 and final 605.00. This corrects an observed pre-fix omission for natural scrolling.

### B10 · Pointer and keyboard controls

Status: **passed**

Action: Drag the usage range with a pointer; use Home and ArrowRight; operate donation buttons and tabs by keyboard.

Expected: Inputs update and navigation remains operable without a pointer.

Observed: Home plus ArrowRight produced 0.01 usage and a 20.00 pre-donation bill. Enter activated donation options; ArrowRight changed desktop tabs. Large-text permission preview also worked with Space and Enter. A native pointer drag to the range midpoint produced 500 usage, 520 subtotal and 500 rounded bill.

### B11 · Economics definitions and visible response

Status: **passed**

Action: Open economics directly; inspect definitions and change monthly AI usage to 120.75.

Expected: Units and contribution are explained before results; revenue updates.

Observed: Modeled units precede inputs; financial contribution is distinguished from donations. Revenue changed to 130.75 on desktop and mobile. The comparison explains demand served and tier settlement before the table/cards.

### B12 · Permission preview is contextual and local

Status: **passed**

Action: Read the permission introduction; select Projects & GitHub and preview.

Expected: Explain the choice before selection; report only selected evidence without implying access was granted.

Observed: The result said 1 evidence category selected, named Projects & GitHub, and reiterated that nothing was connected or sent. Verified with keyboard at 200% mobile text.

### B13 · Research access and filtering

Status: **passed**

Action: Open research, inspect source/download labels, and search for loyalty.

Expected: Sources and file formats are named; relevant chapters remain.

Observed: The filter returned thesis, loyalty, economics, philosophy, timeline and open-questions chapters. Source labels identify Pasta Board and file formats.

### B14 · Desktop layout review

Status: **passed**

Action: Inspect homepage, receipt, economics, relationship and research at 1348 CSS-pixel content width.

Expected: Hierarchy and interactions remain clear across desktop panels.

Observed: Screenshots reviewed for each panel. The receipt remains beside its short introduction; the formula expands below. Tab and calculator interactions were exercised.

### B15 · Narrow default layout

Status: **passed**

Action: Inspect billing and adjacent panels at 390 and 320 CSS pixels.

Expected: No whole-page horizontal overflow; controls and disclosures remain usable.

Observed: Observed document widths equal content widths. Receipt precedes supporting drawers. The donation custom control has its own row; preset controls have at least 48-pixel height at default text size.

### B16 · 200% text enlargement

Status: **passed**

Action: Set root text to 32px in a temporary same-origin test frame at 320, 390 and desktop widths.

Expected: Text scales, controls wrap and the document does not widen.

Observed: Billing reflowed without whole-page overflow at 320 and 390; desktop text enlargement also reflowed. Economics, relationship and research were checked at 320; corrected formula-grid and loyalty-comparison overflow. Donation arithmetic and permission keyboard controls worked while enlarged.

### B17 · Zoom-equivalent reflow

Status: **passed**

Action: Render a 659 CSS-pixel content viewport at 2x visual scale in the test frame.

Expected: The desktop-sized display reflows to a narrow single-column layout.

Observed: Observed 659 scroll width matching 659 client width. This is a layout simulation only, not native browser zoom or a scaled-frame pointer certification.

### B18 · Primary and secondary type hierarchy

Status: **passed**

Action: Inspect computed type and donation button dimensions.

Expected: Primary mobile prose and inputs remain readable; supporting notes are smaller; custom amount is not squeezed into an equal amount pill.

Observed: Primary prose and inputs are 16px at default size; notes are 13px. Type uses rem units. Donation choices use 48px minimum targets and adapt to two columns when enlarged; custom amount is full width.

## Device and permission checks still required

### D01 · Physical iPhone touch and Safari

Status: **not run**

Action: Drag and tap on a physical iPhone in Safari.

Expected: Same clear, usable results.

Observed: Not executed in this environment.

### D02 · VoiceOver and assistive technology

Status: **not run**

Action: Navigate the complete drawer with a screen reader.

Expected: Same clear, usable results.

Observed: Not executed in this environment.

### D03 · Other browser engines

Status: **not run**

Action: Repeat core flows in Firefox and Safari engines.

Expected: Same clear, usable results.

Observed: Not executed in this environment.

### D04 · Clipboard-denied fallback

Status: **not run**

Action: Deny clipboard access and copy the displayed manual link.

Expected: Same clear, usable results.

Observed: Not executed in this environment.

### D05 · Native browser zoom and mobile OS text settings

Status: **not run**

Action: Repeat the final flows with native Command/Ctrl-plus zoom and physical-device text preferences.

Expected: Same reflow and readable controls.

Observed: The cloud-browser shortcut did not change native zoom. Relative-text enlargement and zoom-equivalent responsive layouts were tested instead; they are not claimed as native-device verification.

## Reproduce

Run `node --test tests/*.test.mjs` and `./node_modules/.bin/tsc --noEmit` from the source checkout. Browser cases are review procedures, not an unattended Playwright test suite. Reset a simulator before a case unless its action describes a sequence. Monetary inputs and outcomes are USD unless stated otherwise.

Raw Node output: review/reading-flow/node-tests.txt. Browser observations were recorded from direct cloud-Chrome interaction during this revision. They are not an unattended browser suite or a saved replay.
