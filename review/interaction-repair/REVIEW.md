# Intelligence on Tap · Interaction review

2026-11-08

95 documented cases: 90 passed, 1 partly verified, 4 not run. This is a bounded concept-site review, not a cross-browser or accessibility certification.

The reported meter problem was an interaction-design failure: the slider changed requested usage, but a hidden 200 spending ceiling admitted only 180 of metered usage, and the explanation was below the controls on a phone. A correct total did not make the interaction clear.

The revised build shows subtotal, discount, adjusted bill and paused usage beside the meter. A deliberate action raises the ceiling. Churn now changes a visible 12-month result. Narrow comparisons use cards, shared scenarios survive refresh, and resets clear old parameters.

The original 106.40 → 100 → optional contribution sequence remains. Personal scaling, the possible charitable path, Uber origin note and hidden utility analogy are later additions, clearly separated from the source corpus.

The desktop and tested narrow-layout concept is suitable for review. Physical iPhone touch and assistive technology remain unverified; this report does not claim universal device readiness.

---

## Method and limits

35 automated Node tests passed, including 26 added interaction-model tests and 9 retained regressions. Existing regressions overlap some new examples deliberately. The source corpus checksum and all 572 paragraphs remained intact. TypeScript was checked with no errors.

56 browser procedures were observed through cloud Chrome, using native mouse movement, keyboard input, actual form controls, direct navigation and DOM/accessibility observations. The 390px/320px checks used same-origin iframes with real responsive layouts; they were not physical Safari emulation.

Early browser observations were reconstructed from tool output after a browser REPL reset. The report is a human-readable evidence log, not a saved automated browser trace. Initial layout failures and their rechecks are recorded in U46/U48 rather than omitted.

U51 is partly verified because JSON download capture timed out. The source endpoint itself was readable. No claim is made that every link on the internet, every device, or every permission state was tested.

This report supersedes the earlier readiness assessment for interaction quality. It preserves historical review files instead of rewriting the earlier record.

## Consequential changes

- Immediate billing feedback, clear admitted/paused amounts, visible spending ceiling and explicit recovery action.
- 44px slider targets, native keyboard behavior, blue focus, bounds feedback and synchronized numeric fields.
- Visible 12-month economics result so retention controls have an observable effect.
- Atomic presets, clean reset URLs and reproducible shared numeric scenarios.
- Readable phone-width billing totals and five comparison cards.
- Separate continuous personal-scaling experiment above 500, including one-account versus split-account comparison.
- A separate hypothetical Foundation gift path with no promised deductibility or unverified donation channel.
- Uber founding-inspiration attribution and an unobtrusive utility/grades Easter egg behind the blue companion.

## Calculation and source regressions

### M01 · Canonical bill: discount precedes every voluntary amount

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Canonical bill: discount precedes every voluntary amount. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M02 · Reported 347.54 input admits 180 and pauses 167.54

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Reported 347.54 input admits 180 and pauses 167.54. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M03 · Raising ceiling removes pause; round-down still explains a flat bill

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Raising ceiling removes pause; round-down still explains a flat bill. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M04 · Base-only ceiling pauses all extra use

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Base-only ceiling pauses all extra use. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M05 · Ceilings reconcile at cent boundaries

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Ceilings reconcile at cent boundaries. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M06 · Contribution remains outside spending ceiling

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Contribution remains outside spending ceiling. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M07 · Turning rounding off charges admitted use exactly

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Turning rounding off charges admitted use exactly. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M08 · Zero and 10 percent discount caps have explicit effects

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Zero and 10 percent discount caps have explicit effects. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M09 · Source tier discontinuities remain visible, not silently smoothed

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Source tier discontinuities remain visible, not silently smoothed. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M10 · Original unrestricted rule above 500 is explicitly a cap

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Original unrestricted rule above 500 is explicitly a cap. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M11 · Invalid model monetary inputs cannot create NaN or negative bills

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Invalid model monetary inputs cannot create NaN or negative bills. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M12 · Personal scaling examples: 550, 560, 1000, 2000 subtotals

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Personal scaling examples: 550, 560, 1000, 2000 subtotals. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M13 · Continuous scaling does not reset discounts at its breakpoints

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Continuous scaling does not reset discounts at its breakpoints. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M14 · Scaling remains nondecreasing over 0 to 10000 metered dollars

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Scaling remains nondecreasing over 0 to 10000 metered dollars. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M15 · One account does not cost more than equal splits in this model

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: One account does not cost more than equal splits in this model. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M16 · Unequal splits also do not beat combining billable usage

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Unequal splits also do not beat combining billable usage. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M17 · Large personal use continues to add cost, no top price cap

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Large personal use continues to add cost, no top price cap. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M18 · Source checkout and new scaling curve are intentionally distinct

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Source checkout and new scaling curve are intentionally distinct. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M19 · Economics baseline distinguishes revenue, gross profit, contribution

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Economics baseline distinguishes revenue, gross profit, contribution. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M20 · Fixed-plan fulfillment responds to allowance, not imaginary overage

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Fixed-plan fulfillment responds to allowance, not imaginary overage. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M21 · Retail rate and inference cost affect different parts of economics

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Retail rate and inference cost affect different parts of economics. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M22 · Churn changes horizon value without changing monthly revenue

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Churn changes horizon value without changing monthly revenue. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M23 · Loyalty rate and retention benefits remain separate hypotheses

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Loyalty rate and retention benefits remain separate hypotheses. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M24 · Expense classifications and acquisition cost do not contaminate revenue

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Expense classifications and acquisition cost do not contaminate revenue. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M25 · Credit loss corners remain separate from subscription economics

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Credit loss corners remain separate from subscription economics. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### M26 · Sharing preserves scale scenario and rejects fractional account counts

Status: **passed**

Action: Run the named test in tests/interaction.test.mjs.

Expected: Sharing preserves scale scenario and rejects fractional account counts. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### R01 · reference receipt and voluntary contribution reconcile

Status: **passed**

Action: Run the named test in tests/model.test.mjs.

Expected: reference receipt and voluntary contribution reconcile. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### R02 · discount thresholds, caps and high consumption remain explicit

Status: **passed**

Action: Run the named test in tests/model.test.mjs.

Expected: discount thresholds, caps and high consumption remain explicit. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### R03 · five models reconcile service and contribution economics

Status: **passed**

Action: Run the named test in tests/model.test.mjs.

Expected: five models reconcile service and contribution economics. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### R04 · zero churn has a finite horizon but no finite perpetual LTV

Status: **passed**

Action: Run the named test in tests/model.test.mjs.

Expected: zero churn has a finite horizon but no finite perpetual LTV. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### R05 · high cost losses are preserved; no negative value clamping

Status: **passed**

Action: Run the named test in tests/model.test.mjs.

Expected: high cost losses are preserved; no negative value clamping. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### R06 · receipt amounts reconcile at cent precision and reject non-finite inputs

Status: **passed**

Action: Run the named test in tests/review.test.mjs.

Expected: receipt amounts reconcile at cent precision and reject non-finite inputs. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### R07 · near-zero churn converges to the zero-churn finite horizon

Status: **passed**

Action: Run the named test in tests/review.test.mjs.

Expected: near-zero churn converges to the zero-churn finite horizon. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### R08 · shared scenarios round-trip every allowed input without leaking extra state

Status: **passed**

Action: Run the named test in tests/review.test.mjs.

Expected: shared scenarios round-trip every allowed input without leaking extra state. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

### R09 · bounded source passages reconstruct every source paragraph without omissions or edits

Status: **passed**

Action: Run the named test in tests/review.test.mjs.

Expected: bounded source passages reconstruct every source paragraph without omissions or edits. Exact inputs and assertions are included in the downloadable source.

Observed: Passed in the recorded 35-test Node run; 0 failures.

## Observed browser interactions

### U01 · Drag the billing slider

Status: **passed**

Action: Drag the native range with a mouse, then read its paired field and result.

Expected: The field, range and nearby bill update together.

Observed: A drag moved both inputs to 120.22; subtotal 140.22 and adjusted bill 100.

### U02 · Reproduce Andrew’s phone example

Status: **passed**

Action: Enter requested usage 347.54 with the 200 ceiling.

Expected: 180 admitted, 167.54 paused; the explanation must be beside the slider.

Observed: Nearby result showed subtotal 200, admitted 180 and paused 167.54.

### U03 · Recover from the ceiling

Status: **passed**

Action: Use “Allow all requested use” after U02.

Expected: The explicit action raises the ceiling to 367.54 and removes the pause.

Observed: No use paused; subtotal 367.54, discount 167.54, adjusted 200. Tier behavior remained explained.

### U04 · Turn the discount off

Status: **passed**

Action: After U03, uncheck round-down.

Expected: The bill equals the admitted subtotal.

Observed: Final bill changed to 367.54.

### U05 · Restore the canonical bill

Status: **passed**

Action: Click Original $100 bill after changing controls.

Expected: Restore defaults and a clean billing URL.

Observed: Final 100; URL ended in #billing without stale scenario values.

### U06 · Every contribution preset

Status: **passed**

Action: Choose 1, 5, 10 and 0 on the canonical bill.

Expected: Contribution changes the final bill after discount.

Observed: Final amounts 101, 105, 110 and 100.

### U07 · Custom cents contribution

Status: **passed**

Action: Select Custom and enter 25.25.

Expected: Keep cents and add only to the final amount.

Observed: Final 125.25; adjusted usage bill remained 100.

### U08 · The complete example preset

Status: **passed**

Action: Change custom contribution, then choose With $5 contribution.

Expected: Restore the entire canonical scenario with a 5 contribution.

Observed: Final 105; the custom field closed and defaults returned.

### U09 · Native slider keyboard behavior

Status: **passed**

Action: With ceiling 1000 and rounding off, use End, Home, ArrowRight and ArrowLeft.

Expected: Reach maximum, minimum and one-cent increments.

Observed: Usage 600 / 0 / 0.01 / 0; final 620 / 20 / 20.01 / 20.

### U10 · Click the slider track

Status: **passed**

Action: Click the middle of the billing track.

Expected: Clicking the track changes the actual input and result.

Observed: Input changed to 300; subtotal 320.

### U11 · Invalid input gives feedback

Status: **passed**

Action: Type 700 into the 0–600 request field without leaving it.

Expected: Show bounds and invalid state; retain last valid calculation while editing.

Observed: aria-invalid=true and 0–600 hint appeared; preceding valid subtotal 320 was retained.

### U12 · Commit invalid or empty drafts

Status: **passed**

Action: Press Enter on 700, enter -1 and Tab, then clear and Tab.

Expected: Clamp to supported bounds; empty draft must not produce NaN.

Observed: 700 became 600; -1 became 0; empty restored 0; final 20.

### U13 · The base is the minimum ceiling

Status: **passed**

Action: Enter ceiling 5 and commit with Enter.

Expected: Clamp to 20 and pause all additional usage.

Observed: Ceiling 20; all 86.40 of extra request paused; final 20.

### U14 · Discount cap affects the bill

Status: **passed**

Action: Set usage 130, ceiling 200, cap 10%; then cap 0%.

Expected: Subtotal 150 gets 15 discount at 10%, none at 0%.

Observed: Adjusted 135, then 150.

### U15 · Edited values survive reload

Status: **passed**

Action: Set usage 117.25 and reload.

Expected: The safe scenario URL restores the entered assumptions.

Observed: Usage retained; subtotal 137.25.

### U16 · Reset survives reload

Status: **passed**

Action: Reset to Original $100 bill, then reload.

Expected: Old encoded values must not return.

Observed: Subtotal 106.40 and final 100; clean #billing URL.

### U17 · Personal scaling presets

Status: **passed**

Action: Open Beyond $500 and choose 550, 560, 1000 and 2000 subtotal presets.

Expected: The continuous experiment grows beyond 500 without replacing the source rule.

Observed: One-account prices 500, 508, 860 and 1660; original-rule comparison remained visible.

### U18 · One account versus ten

Status: **passed**

Action: Set personal metered use 1980 and compare 10 accounts, then 1.

Expected: Same total billable usage; each account has its own 20 base.

Observed: 10-account comparison 2062 versus one 1660; setting 1 made both 1660.

### U19 · High personal usage

Status: **passed**

Action: Enter 1000000 in the extended personal meter.

Expected: A finite value continues to scale; no hidden 500 price cap.

Observed: One-account amount 800076.

### U20 · Copy a usable scenario

Status: **passed**

Action: Copy a changed billing scenario and inspect the feedback, exposed link and browser clipboard.

Expected: Copy the actual safe numeric URL and provide feedback.

Observed: “Link copied” and Open this link appeared. Clipboard matched #billing with use=347.54, budget=200 and the remaining allowed values.

### U21 · Reopen a scaling scenario

Status: **passed**

Action: Open the generated shared link with scaling expanded and usage 1000000.

Expected: Restore values and the expanded experiment.

Observed: Scaling section remained open with 1000000 metered input.

### U22 · Economics starts coherent

Status: **passed**

Action: Open The economics at defaults.

Expected: Visible monthly and horizon results match the formulas.

Observed: Revenue 106.40; contribution 64.47; 12-month value 542.64.

### U23 · Churn has a visible effect

Status: **passed**

Action: Change monthly churn from 5% to 10%.

Expected: Horizon value changes while this month’s bill stays fixed.

Observed: 12-month value fell to 412.60 beside the controls; revenue stayed 106.40.

### U24 · Demand and fulfillment differ

Status: **passed**

Action: Set monthly demand 200.

Expected: Fixed plans serve only their assumed allowance; metered variant serves the full request.

Observed: Fixed fulfillment 50%; hypothetical 50 plan 20%; metered revenue 210, contribution 128.70.

### U25 · Retail price changes revenue

Status: **passed**

Action: Reset economics and set metered retail rate 2.

Expected: Revenue responds to the chosen rate.

Observed: Base + metered revenue became 192.80.

### U26 · Cost is not revenue

Status: **passed**

Action: Reset economics and set inference cost 1.

Expected: Revenue stays the same while contribution falls.

Observed: Revenue 106.40; contribution 1.81.

### U27 · Show losses honestly

Status: **passed**

Action: Set inference cost 5.

Expected: Display negative contribution without clamping it away.

Observed: Contribution displayed -383.79.

### U28 · Plan and allowance controls

Status: **passed**

Action: Set fixed price 500, fixed allowance 20; set hypothetical-50 allowance and base allowance to 96.4.

Expected: Each setting affects its respective model, not an invented official entitlement.

Observed: Fixed revenue 500 and 20.7% fulfillment; hypothetical-50 fulfillment 100%; base + metered revenue 20.

### U29 · Loyalty price and retention

Status: **passed**

Action: At defaults, set loyalty discount 20% and relative churn reduction 50%.

Expected: Keep the two effects distinct.

Observed: Loyalty revenue 89.12, churn 2.5%, 12-month value 449.97.

### U30 · Economic round-down cap

Status: **passed**

Action: Set the rounding cap to 0%.

Expected: Rounded variant returns to the undiscounted bill.

Observed: Revenue in that variant became 106.40.

### U31 · Expense and acquisition controls

Status: **passed**

Action: Change delivery overhead to 13, other variable cost to 12, payment fee to 4%, then acquisition cost 50→60.

Expected: Operating deductions change contribution; acquisition cost changes horizon value only.

Observed: Sequential contributions 54.47 / 44.47 / 43.40. Acquisition increase reduced the displayed horizon value by 10.

### U32 · Separate credit exposure

Status: **passed**

Action: Set exposure 10000, default probability 10%, loss given default 50%.

Expected: Expected loss = exposure × probability × loss severity.

Observed: Separate credit loss displayed 500.

### U33 · Separate investment illustration

Status: **passed**

Action: Set investment 200000, success probability 25%, return multiple 5.

Expected: Expected net proceeds equal 200000 × (0.25 × 5 − 1).

Observed: Displayed 50000, separate from subscription results.

### U34 · Reset all economic assumptions

Status: **passed**

Action: After changing advanced and separate scenarios, click Reset all assumptions.

Expected: Reset every scenario, not only the four main sliders.

Observed: Credit loss 150, partnership net 0, annual value 542.64; clean #economics URL.

### U35 · All economics sliders are native controls

Status: **passed**

Action: At defaults between changes, use Home on demand, rate, cost and churn ranges.

Expected: Each responds to keyboard input with a relevant nearby effect.

Observed: Demand 0→revenue20; rate0→revenue20; cost0→contribution98.21; churn0→annual723.62. Range hit areas measured 44px high.

### U36 · Share economic assumptions

Status: **passed**

Action: Change rate to 2 and churn to 12; copy and reopen/reload scenario.

Expected: Encode and restore all allowed numeric assumptions.

Observed: Rate 2 and churn 12 retained; URL contained the full numeric scenario.

### U37 · Relationship stage navigation

Status: **passed**

Action: Open each of the four stages and use Home/End.

Expected: Update selected stage and content; keyboard focus follows.

Observed: All four contents appeared; End selected/focused the final stage.

### U38 · Permission preview is deliberate

Status: **passed**

Action: Observe empty selection, select all four evidence categories and preview; then deselect.

Expected: Empty preview disabled; selection changes invalidate an old preview.

Observed: Button was disabled empty, four categories appeared after preview, and changed selections invalidated the preview.

### U39 · Equity calculation

Status: **passed**

Action: Set investment 2000000 and pre-money valuation 8000000.

Expected: Post-money share = 2 / (8 + 2).

Observed: Displayed 20%.

### U40 · Tab and scaling shortcuts

Status: **passed**

Action: Use Home/End in the main tabs; open What happens beyond $500?.

Expected: Keyboard selects the correct panel; shortcut opens the experiment.

Observed: Research selected/focused with End; scaling opened. Rechecked tabs after anchor-navigation refinement in U55.

### U41 · Research search and empty state

Status: **passed**

Action: Search uppercase LOYALTY, then a nonmatching phrase, then clear.

Expected: Case-insensitive search, useful no-result state and reversible filtering.

Observed: 6 chapters matched; no-result message appeared; clear restored all 10.

### U42 · Direct chapter navigation

Status: **passed**

Action: Open the loyalty chapter’s direct link after filtering research.

Expected: Reach the chapter without a stale search hiding it.

Observed: Search cleared, loyalty expanded, URL #chapter-loyalty.

### U43 · Timeline evidence targets

Status: **passed**

Action: Inspect the six turning-point links.

Expected: Each points to a real, specific original paragraph.

Observed: Targets p-575, p-1327, p-10404, p-13252, p-16735 and p-22631 matched archived anchors.

### U44 · Unsupported scenario links

Status: **passed**

Action: Open economics with version 999 and churn 999.

Expected: Fall back safely and explain the unsupported version.

Observed: Defaults rendered, revenue 106.40, visible version warning.

### U45 · Back and tab continuity

Status: **passed**

Action: Set churn 12, visit Relationship and use Back; switch away/back and reload.

Expected: Keep useful state across navigation.

Observed: Churn stayed 12 after Back and after returning/reloading.

### U46 · Narrow billing amounts

Status: **passed**

Action: Inspect billing at 390px and 320px layout widths, including the ceiling example.

Expected: No page overflow and no line break inside a monetary amount.

Observed: Initial 320px currency wrapping failed. Fixed to two-column summary with a full-width adjusted amount. Recheck: content/scroll widths 375/375 and 305/305; amounts stayed whole.

### U47 · Drag in the phone-width layout

Status: **passed**

Action: Use a native mouse drag within the 390px iframe billing slider.

Expected: Input and nearby result remain synchronized at phone width.

Observed: Field and range became 121.59, subtotal141.59, discount41.59, adjusted100. This was mouse input, not physical touch.

### U48 · Narrow economics comparison

Status: **passed**

Action: Inspect economics at both layout widths, with churn10.

Expected: Read every label and amount without a clipped column.

Observed: Initial 320px table heading clipped. Replaced the small-screen comparison with five cards. Recheck: no page overflow; annual412.60 and metered revenue106.40/contribution64.47 readable.

### U49 · Narrow relationship and research

Status: **passed**

Action: At 320px, select the last relationship stage and search research for loyalty.

Expected: Controls and content remain usable within the page width.

Observed: Final stage opened; 6 results shown; content and scroll widths both305.

### U50 · Typography and keyboard focus

Status: **passed**

Action: Inspect computed body font and focus a range by keyboard.

Expected: Use the requested typeface, blue focus and a usable control target.

Observed: OpenAI Sans; body ink rgb(32,38,50) on rgb(250,251,254); 3px blue focus outline and 44px range height. Calculated core contrast: ink/paper14.66:1; muted/paper5.12:1; blue/white6.25:1; blue/accent5.42:1. This is not a full accessibility audit.

### U51 · Source access and downloads

Status: **partial**

Action: Open source anchors p10404/p10452, retrieve the research Markdown and source JSON, and download the packaged source ZIP.

Expected: Evidence remains accessible and downloadable.

Observed: Source correction paragraphs were readable. Research Markdown downloaded (17989 bytes); source JSON rendered (131789 characters). Automated capture of the JSON download timed out despite one visible link; endpoint access succeeded. Source ZIP downloaded (239 files, 4834224 bytes), matched the local SHA-256 and passed ZIP integrity; it contained the new code/tests/review. The final package is regenerated after these report notes.

### U52 · Origin and charitable-path disclosure

Status: **passed**

Action: Open billing assumptions and Could a separate gift be tax deductible?.

Expected: Attribute the Uber inspiration; keep commercial contribution and a future charitable gift distinct.

Observed: Uber/Uber One origin note present. Foundation path linked primary sources and explicitly stated that donation acceptance and eligibility were not verified.

### U53 · Review runtime diagnostics

Status: **passed**

Action: Inspect browser error logs after the interaction pass.

Expected: Identify site-owned runtime failures without conflating browser instrumentation.

Observed: No site-owned runtime exception identified in the observed interactions. Development hydration warning referred to injected data-oai-browser-agent attributes on html; extension metadata errors were also present. Retained as environment warnings, not silenced in the site.

### U54 · Easter egg keyboard loop

Status: **passed**

Action: Open the blue companion, use Escape, reopen with Enter, then use its close button.

Expected: Reveal the complete note; closing returns focus to its trigger.

Observed: Full utility/grades note appeared; Escape and close dismissed it; focus returned to “A small thought, on tap”.

### U55 · Final anchor-based navigation

Status: **passed**

Action: Use the hero link, then economics; press End, Home and Space in the tabs.

Expected: Links retain native destinations and keyboard tab behavior.

Observed: Economics selected with baseline live output; End focused/selected research; Home and Space returned billing at #billing. Returning to an already encoded billing scenario was also checked after the final explicit scroll change: explore top settled at39.52px/40.06px in320px/390px layouts.

### U56 · Easter egg at phone widths

Status: **passed**

Action: Open the note at 320px and 390px; click outside it.

Expected: Keep the note within the viewport and allow easy dismissal.

Observed: 320px note rect left40/right265; 390px left40/right335. Both readable. Outside click set aria-expanded=false. Screenshot saved.

## Device and permission checks still required

### D01 · Physical iPhone Safari gestures

Status: **not run**

Action: On an iPhone, drag every slider, scroll vertically beside it, type numbers and rotate.

Expected: Smooth touch interaction without accidental scrolling, zoom or browser-chrome obstruction.

Observed: Not run: no physical iPhone session was available. Chromium widths and mouse drags are not a substitute.

### D02 · VoiceOver / screen-reader experience

Status: **not run**

Action: Use VoiceOver to operate tabs, amounts, live results and hidden note.

Expected: Useful announcements at a sensible cadence with correct labels and focus order.

Observed: Not run with an actual assistive-technology session. ARIA labels, focus and keyboard behavior were inspected.

### D03 · Independent browser engines

Status: **not run**

Action: Repeat the canonical, capped, scaled and shared scenarios in Safari/WebKit and Firefox.

Expected: Equivalent calculations and input behavior across engines.

Observed: Not run: browser observations used cloud Chromium.

### D04 · Clipboard denied path

Status: **not run**

Action: Deny clipboard access and use the manual fallback link/input.

Expected: Show a usable copy alternative and no false success state.

Observed: Not run with clipboard permission denied. Allowed clipboard copying was verified in U20.

## Reproduce

Run `node --test tests/*.test.mjs` and `./node_modules/.bin/tsc --noEmit` from the source checkout. Browser cases are review procedures, not an unattended Playwright test suite. Reset a simulator before a case unless its action describes a sequence. Monetary inputs and outcomes are USD unless stated otherwise.

Raw Node output: review/interaction-repair/node-tests.txt. Browser observations were recorded during direct cloud-Chrome interaction; early notes were reconstructed from observed tool output after the browser REPL reset. They are not a saved trace or replay.
