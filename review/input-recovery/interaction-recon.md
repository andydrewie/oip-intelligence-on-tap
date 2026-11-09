# Interaction reconnaissance — human recovery and control coverage

Scope: read-only review of `app/billing.tsx`, `app/economics.tsx`, `app/ui.tsx`, `app/page.tsx`, `app/research.tsx`, related CSS, and the static archive. Browser interactions used an independent Chrome tab on the managed preview `http://127.0.0.1:4173/`. Source files were changing during the review; hot-reload remounts are not reported as production defects.

This report separates source inspection, executed browser checks, confirmed defects, and checks still owned by other reviewers. An inventory entry is **not** evidence that all of its possible states were tested.

## Findings sent to the implementation owner

| Finding | Evidence and affected scope | Minimal remedy / status |
|---|---|---|
| “Clear cost assumptions” reset unrelated experiments | Baseline `app/economics.tsx` called the full `useScenario.reset()`; that includes comparison assumptions, loyalty inputs and credit/partnership scenarios. | Implementation owner replaced it with scoped `clearCosts()`. Regression must preserve unrelated values. |
| Scoped clear still reset unrelated drafts | First version of `clearCosts()` incremented the global economics input revision. Every generic Field listened to it, so unrelated uncommitted drafts/notices disappeared even when their canonical values remained. | Owner removed the global revision change; centrally controlled cost drafts already clear themselves. |
| Chapter sharing leaked calculator vocabulary | Browser: search “loyalty”, expand Compounding loyalty, Copy chapter link. Link correctly targeted `#chapter-loyalty`, but action read “Open this scenario”. `ShareLink` hard-coded its open-link label. | Owner added contextual open-link labels. Test chapters, bills, formulas and assumptions separately. |
| Deep economics addresses could lose values on reload | Source writer preserved `#economics-comparison?…` and other nested targets, while parser accepted only economics/cost-scenario. Browser generated `#economics-comparison?v=5&demand=154.7…`; a separate navigation reviewer confirmed the full reload defect. | Owner introduced a common target registry. Navigation reviewer owns final round-trip verification. |
| Input-type change dropped field styling | Reported by the visual reviewer during this pass: cost inputs changed from number to text to preserve invalid drafts, while base border/width/min-height styling selected only number/search inputs. This left small, unbordered cost controls. Source coupling was in `app/globals.css` base input selectors and the minimum-height rule near line210. | Owner added cost text inputs to full-width bordered48px styles. Root owns screenshot/narrow/enlarged-text verification. The state fix needed a visual-regression check, not only an input-state test. |

These are sibling-state / reusable-component boundary defects: a control's label, reset scope or generated address was not checked against the state transition it actually performed. Calculation assertions alone cannot detect them.

Confirmed fixes independently exercised here: scoped cost clear and contextual chapter-open label. Nested-route restoration and cost-field visual sizing are separately owned checks, not claimed as this reviewer's executions.

## Complete control inventory

There are **32 numeric-entry instances**: 3 billing, 4 provider cost, 4 provider loyalty, 19 advanced comparison/risk, and 2 founder terms. Six have paired range controls: billing usage, loyalty retention, and the four primary comparison inputs. There is also one fixed-plan select, a research search box, four evidence checkboxes, presets, navigation, disclosures and sharing actions.

### Numeric inputs

| Area / source | Field | Allowed range / unit | Expected effect |
|---|---|---|---|
| Billing / `app/billing.tsx` | AI usage charge | 0–999,980 USD; paired dynamic range | Subtotal is 20 + usage; settlement and final payment update; a fixed price band may leave settled bill unchanged. |
| Billing | Donation amount | 0–10,000 USD | Donation and total change; service bill/provider economics do not. |
| Formula drawer | Subtotal including membership | 20–1,000,000 USD | Same usage state as receipt, subtracting the 20 base; worked equation updates. |
| Provider / `app/economics.tsx` | Serving & infrastructure | 0–1,000,000 USD/month | Blank, invalid and explicit zero stay distinct; reviewed result invalidates. |
| Provider | Research & model development | 0–1,000,000 USD/month | Same cost-state and review contract. |
| Provider | Company operations | 0–1,000,000 USD/month | Same cost-state and review contract. |
| Provider | Payment processing | 0–20 percent of bill | Percentage precision retained until resulting money is rounded. |
| Provider loyalty | Monthly loyalty discount | 0–1,000,000 assumed USD | Discount capped at service bill with visible notice; annual comparison updates. |
| Provider loyalty | Customers leaving each month | 0–100 out of 100 | Monthly retention and expected 12-month balances update. |
| Provider loyalty | Reduction in departures | 0–100 relative percent; paired range | With-benefit departure rate and expected balance update. |
| Provider loyalty | Additional acquisition cost | 0–1,000,000 USD once | Both 12-month balances decrease by this one-time amount. |
| Advanced / `app/page.tsx` | Assumed demand | 0–1,000 comparison units; paired range | Requested/served usage and monetary rows update. |
| Advanced | Assumed price per comparison unit | 0–5 USD/unit; paired range | Base-meter and loyalty revenue update; tier revenue may stay within same band. |
| Advanced | Assumed cost per comparison unit | 0–5 USD/unit; paired range | Contribution changes, revenue does not. |
| Advanced | Customers leaving each month | 0–30 percent; paired range | Annual and lifetime estimates change, monthly contribution does not. |
| Advanced | Fixed-plan allowance | 0–2,000 assumed units | Fixed-plan demand served and costs change. |
| Advanced | $50 plan allowance | 0–2,000 assumed units | Hypothetical $50 demand served and costs change. |
| Advanced | Base-plan allowance | 0–2,000 assumed units | Metered billable quantity changes. |
| Advanced | Loyalty usage discount | 0–100 percent | Loyalty variant revenue/contribution changes only. |
| Advanced | Loyalty churn reduction | 0–100 relative percent | Loyalty survival metrics change; no effect at zero starting churn. |
| Advanced | Monthly delivery overhead | 0–1,000 USD | All contributions change; revenue unchanged. |
| Advanced | Other variable expense | 0–1,000 USD/month | All contributions change; revenue unchanged. |
| Advanced | Payment fee | 0–20 percent of revenue | Each contribution changes proportionally to revenue. |
| Advanced | Acquisition cost | 0–1,000 USD/customer | Annual and lifetime values change; monthly figures unchanged. |
| Separate credit risk | Outstanding balance | 0–100,000 USD | Expected loss changes only in risk model. |
| Separate credit risk | Default probability | 0–100 percent | Expected loss changes only in risk model. |
| Separate credit risk | Loss given default | 0–100 percent | Expected loss changes only in risk model. |
| Separate partnership | Investment | 0–10,000,000 USD | Expected speculative net proceeds change. |
| Separate partnership | Success probability | 0–100 percent | Same; never added to subscription figures. |
| Separate partnership | Success gross multiple | 0–50× | Same; zero means complete loss of modeled investment. |
| Founder / `app/page.tsx` | Hypothetical equity investment | 0–10,000,000 USD | Investment / post-money valuation ownership updates. |
| Founder | Pre-money valuation | 100,000–100,000,000 USD | Same formula; denominator remains positive. |

### Other interactive components

| Component | Controls and states to cover |
|---|---|
| Main navigation | Skip link; brand/home; idea; Explore; Sources; hero billing and overview links; four main tabs; tab click, Space, arrows, Home/End; direct links; Back/Forward; focus; retained panel state. |
| Donation chooser | $0/$1/$5/$10 selected state; custom-amount reveal; return to preset; reset; separate totals. |
| Billing reset/share | Reset example bill; copy success; clipboard failure fallback; open bill link; reload and old/malformed link versions. |
| Formula drawer | Open/close; direct link; linked subtotal input; every example-load button; more example bills; everyday/threshold switch; selected row; worked equations; horizontal formula/table scroll; copied calculation. |
| Provider worksheet | Four cost inputs; review/calculate; invalid/missing action focus; reviewed disabled label; stale usage warning; scoped clear; sharing all valid/empty/invalid states; nested routes. |
| Advanced comparison | Fixed-plan select 20/100/200/500; fictional-model opt-in; 19 numeric fields; 4 ranges; compact and expanded tables; zero churn/non-finite lifetime explanation; separate risk and partnership outputs. |
| Relationship stages | Four tabs; selected stage panel; ArrowLeft/Right/Home/End; retained state when visiting another main tab. |
| Evidence permissions | Four checkbox labels; none/one/all/mixed; preview disabled until selection with explanatory introduction; count and category list; changes invalidate preview; nothing connected or sent. |
| Founder evaluation | Drawer; two numeric fields; validity feedback; ownership; bounds; other commercial terms explicitly excluded. |
| Research | Lazy-loading fallback with static index; search; no-results message; filtered results; ten chapter drawers; chapter copy/open; direct chapter clears search and opens destination; source links and downloads. |
| Companion | Toggle; expanded state; outside dismissal; close; Escape; focus return; origin link opens correct section. |
| Disclosures | Fixed-plan rationale; price-support; beyond-$500 scaling; Foundation/tax context; Uber inspiration; public evidence categories; provider worksheet and infrastructure; loyalty; provider method; comparison opt-in; advanced allowances/expanded metrics/formulas/risk; founder evaluation; timeline; current product sources; ten chapters; reuse/attribution. |
| Static archive | Search found no HTML inputs/buttons/selects/details or JavaScript event listeners under `public/archive`; links, downloads, formula rendering and direct paragraph anchors remain navigation-review scope. |

## Browser checks executed by this reviewer

| Check | Action and observed result |
|---|---|
| Permission empty state | Preview disabled; preceding text instructs selecting at least one category and says nothing is connected or sent. |
| Permission single selection | Selected Projects & GitHub; preview said “1 evidence category selected”, named it, and explained inspection/redaction/separate authorization next steps. |
| Permission invalidation | Unchecked sole category; prior preview disappeared and Preview became disabled. |
| Permission all categories | Individually checked all four categories; preview listed all four and said “4 evidence categories selected”. |
| Relationship keyboard | End from Customer activated Mutual investment and updated labeled panel; main ArrowRight from Economics selected Relationship. |
| Founder investment | 1,000,000 → 2,000,000 with 9,000,000 pre-money; ownership 10.00% → 18.18%. |
| Founder invalid valuation | Entered 0; ownership stayed 18.18%, hint identified valid range and 9,000,000 value still in use. Blur explicitly said “Entry not applied. Using 9,000,000 USD.” |
| Research no results | “no such topic zzzz” showed “No chapters match. Try ‘loyalty’, ‘consent’ or ‘pricing’.” |
| Research recovery | Replaced query with “loyalty”; six matching chapters appeared. |
| Chapter sharing | Compounding loyalty expanded; Copy chapter link showed “Link copied.” and linked to `#chapter-loyalty`. Found contextual label defect above. |
| Direct chapter | Opening copied link cleared search, restored ten chapters and opened Compounding loyalty. |
| Companion | Opened note and checked utility declarations, semicolons and Uber link. Escape closed it; `aria-expanded=false`; focus returned to toggle. |
| Comparison gate | Opening drawer first exposed limitation text and explicit “Open the fictional comparison”; clicking revealed simulator. |
| Primary comparison fields | Real edits: demand154.7, rate1.25, cost0.5, churn0. Result: tier revenue200, contribution111.65, annual1,289.80. |
| Comparison range synchronization | Demand range ArrowRight changed154.7→154.8; number field reflected154.8; contribution111.65→111.60 and annual1,289.80→1,289.20. |
| Plan/assumption fields | Real edits: fixed plan200; fixed allowance120; $50 allowance60; base allowance20; loyalty15%; retention10%; delivery8; variable4; fee2.875%; acquisition50. Result: fixed200 demand served77.5%/contribution122.25; $50 served38.8%/contribution6.56; tier contribution104.85/annual1,208.20. At zero churn the retention reduction cannot further lower churn. |
| Zero churn | Expanded lifetime-value explanation showed “No finite estimate” for each row, with explicit zero-churn explanation. |
| Risk inputs | Edited outstanding12,000, default probability10%, loss given default40%; expected loss480.00. |
| Partnership inputs | Edited investment500,000, success25%, gross multiple3×; expected proceeds−125,000.00, retained as negative and kept separate. |
| Risk invalid input | Entered101%; result retained480.00 and text said “Enter 0–100. Results still use 10 %. Your entry has not been applied.” |
| Risk zero correction | Replaced invalid probability with0; expected loss0.00. |
| Partnership zero | Changed gross multiple to0; expected proceeds−500,000.00. |

The primary/allowance rows above represent initial batches. The following final pass was run after the implementation owner froze app/lib edits and records **one real edit plus a visible before/after result for every advanced numeric control**. Each row continues from the preceding scenario state; figures are not independent default scenarios.

### Final causal pass: all 19 advanced numeric fields

| Field | Real entry change | Observed visible result |
|---|---|---|
| Assumed demand | 154.7 → 180.3 | Tier contribution104.90 → 92.10; annual1,208.80 → 1,055.20. Revenue stays200 because the subtotal remains in the same settlement band. |
| Price per comparison unit | 1.25 → 1.35 | Base + metered revenue220.38 → 236.41; contribution111.89 → 127.46. |
| Cost per comparison unit | 0.50 → 0.55 | Tier contribution92.10 → 83.08; annual1,055.20 → 947.02; revenue remains200. |
| Customers leaving each month | 0% → 4% | Tier annual947.02 → 754.45; monthly contribution stays83.08. |
| Fixed-plan allowance | 120 → 140 | Fixed200 fulfillment66.6% → 77.6%; contribution116.25 → 105.25. |
| $50 plan allowance | 60 → 70 | $50 fulfillment33.3% → 38.8%; contribution3.56 → −1.94. Negative displayed. |
| Base-plan allowance | 20 → 30 | Base + metered revenue236.41 → 222.91; contribution118.44 → 105.33. |
| Loyalty usage discount | 15% → 20% | Loyalty revenue192.47 → 182.32; contribution75.77 → 65.92. |
| Loyalty churn reduction | 10% → 25% relative | Loyalty churn3.6% → 3.0%; annual601.74 → 622.70; monthly contribution stays65.92. |
| Delivery overhead | 8 → 12 | Tier contribution83.08 → 79.08; annual754.45 → 715.72. |
| Other variable expense | 4 → 6 | Tier contribution79.08 → 77.08; annual715.72 → 696.36. |
| Payment fee | 2.875% → 3.125% | Tier contribution77.08 → 76.58, exactly0.50 lower on200 revenue; annual696.36 → 691.52. |
| Acquisition cost | 50 → 75 | Tier annual691.52 → 666.52, exactly25 lower; monthly contribution unchanged76.58. |
| Default probability | 0% → 10% | Risk expected loss0 → 480 with12,000 balance and40% LGD. |
| Outstanding balance | 12,000 → 18,000 | Risk expected loss480 → 720. |
| Loss given default | 40% → 50% | Risk expected loss720 → 900. |
| Investment | 500,000 → 200,000 | At0× return, expected proceeds−500,000 → −200,000. |
| Success gross multiple | 0× → 4× | At25% success, proceeds−200,000 → 0. |
| Success probability | 25% → 30% | At4× return, proceeds0 → 40,000. Credit expected loss remained900. |

The fixed-plan select was also changed from200 to500: fulfillment stayed77.6%, revenue200 → 500 and contribution98.75 → 389.38. Its allowance is an independent assumption, as the adjacent explanation states.

All four advanced range controls received real ArrowRight actions. Their paired numeric fields changed respectively: demand180.3 → 180.4, price1.35 → 1.40, cost0.55 → 0.60, and churn4 → 4.5. The resulting tier panel showed revenue200.00, contribution67.51 and annual561.85. This verifies keyboard/range synchronization, not physical touch behavior.

### Final causal pass: provider loyalty and founder terms

Provider setup: service bill100; entered serving10, development20, operations30 and payment3%; explicitly reviewed for the current86.40 usage. Donation excluded.

| Field | Entry change | Observed visible result |
|---|---|---|
| Monthly loyalty discount | 5 → 10 | Without-benefit annual340.13 unchanged; with-benefit295.55 → 250.96. |
| Monthly departures | 5 → 10 out of100 | Without340.13 → 265.50; with250.96 → 195.90. |
| Relative departure reduction | 0% → 50% | Without265.50 unchanged; with195.90 → 250.96. |
| Additional acquisition cost | 0 → 25 | Without265.50 → 240.50; with250.96 → 225.96. Both fell25. |
| Retention range synchronization | ArrowRight50% → 51% | Numeric field51; with-benefit departures4.9%; annual227.26. |
| Founder investment | 1,000,000 → 2,000,000 with9m pre-money | Ownership10.00% → 18.18%. |
| Founder pre-money valuation | 9,000,000 → 8,000,000 with2m investment | Ownership18.18% → 20.00%. |
| Founder recovery | Enter valuation0, then Escape | Inline range/last-value warning appeared;20.00% stayed based on8m; Escape restored8m and cleared warning. |

### Scoped clear regression and other completed checks

- Clicked **Clear cost assumptions** after the advanced and loyalty edits above. The four cost drafts became empty; advanced demand stayed180.4 and risk balance stayed18,000. The loyalty drawer remained open with explicit instruction to complete/review costs. Re-entered the same four costs and reviewed: all loyalty settings returned intact and results stayed240.50 /227.26. This verifies the old reset-scope defect is fixed.
- Clicked each of the four relationship tabs. Each had `aria-selected=true` while its appropriately labeled panel showed the matching heading: A useful transaction; Commitment earns recognition; Support can become reciprocal; Both parties evaluate the opportunity. Home selected Customer; ArrowLeft from Customer wrapped to Mutual investment.
- Opened and closed **all ten research chapter drawers individually**. Each exposed substantive body text and its source link, and closed again. Billing additionally exposed the current-equation link.
- Re-tested corrected chapter sharing: **Copy chapter link** now exposed **Open this chapter**, targeting `#chapter-loyalty`.
- Pet close button and Escape both returned focus to its toggle. Clicking the outside “The idea” link dismissed the note. The pet's **Uber inspiration** link closed the note, selected the Bill tab and opened `#founding-story`, with the correct Tibo/Uber explanation.
- Desktop relationship page width check: viewport1,363px, document/body scroll width1,348px; no page-level horizontal overflow in that state. This is one desktop layout check, not a substitute for narrow/zoom checks.
- Console entries returned during this pass were browser-extension metadata errors (`chrome-extension://…/content-script.bundle.js`), not site exceptions. This observation is not a claim that every possible runtime error was excluded.

## Not executed by this reviewer / separate ownership

- Receipt/payment inputs, cost-field invalid state recovery, provider share/reload, and 200% text: root reviewer.
- Nested route serialization/reload, malformed link parameters, Back/Forward: navigation reviewer and root.
- Mobile/touch Safari or physical iPhone testing was not performed in this review. Desktop browser evidence is not a claim about physical Safari.
- Clipboard denial was inspected in source but not forced in this browser.
- Files/download integrity, external URLs and archived source anchors require the release/link checks.
- Mathematical domain/boundary exhaustiveness belongs to model regression tests; browser input checks complement it.

## Prevention contract

Each control needs four connected assertions: what the person entered, what the calculator accepted, what result is shown, and what recovery action is available. Restoring, clearing or sharing a scenario must preserve that same meaning. Test empty, invalid, explicit zero, valid decimal, over-range, stale/reviewed and reset states separately; do not treat default substitution as successful validation.
