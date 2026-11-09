# Domain and input state reconnaissance

Reviewed published-v17 source at commit `d727da2`, including `PROJECT_GUIDANCE.md`, `app/ui.tsx`, `app/billing.tsx`, `app/economics.tsx`, `app/page.tsx`, `lib/inputs.mjs`, `lib/scenarios.mjs` and `lib/provider-economics.mjs`.

This is a read-only source and isolated-state audit. No browser, visual, touch or assistive-technology checks are claimed. The owner is replacing the duplicated scenario listeners with one shared experience owner; this report records the existing behavior and the transitions that change must preserve.

## State inventory

| Machine | Current states and transitions | Guards and invariants | Storage |
|---|---|---|---|
| Calculator readiness | Pending → ready on mount; controls disabled/inert before readiness | Pending controls must explain their state; restored inputs precede meaningful interaction | Separate local flags in Billing and each generic Field |
| Generic numeric input | Last accepted value + draft; draft valid/empty/invalid; change, blur, Enter, Escape, external update and reset | Valid draft changes calculation; rejected draft retains prior result with explanation; blur restores that prior value visibly; Escape cancels | Draft/notice local; accepted number in scenario or local relationship state |
| Cost input | Empty, invalid or valid, including explicit zero | Raw text is authoritative; invalid never becomes unknown or supplied zero; amount precision and fee rate have different rules | Central `costInputs`; numeric values and Known flags derived for compatibility |
| Cost review | Incomplete, invalid, complete/unreviewed, reviewed, stale | Only four valid costs plus accepted review for this usage produce a balance; gifts excluded; negative balance remains meaningful | `costsReviewed`, `costBasis`, cost drafts, linked receipt usage |
| Receipt | Accepted usage and donation; formula closed/open; default/custom donation mode; examples/thresholds mode | One `bill()` result; donation follows settlement and never changes provider revenue; selecting an example retains donation | Numeric receipt + formula in URL; donation presentation and example seed local |
| Scenario restoration | Default, restored, migrated, restored with rejected settings, unsupported version | One decimal grammar; all owned routes restore the same domain; valid v5 drafts survive share/reload; invalid drafts withhold review | URL fragment, React values/refs and warning text |
| Provider loyalty gate | Unavailable until reviewed; available with assumptions; suspended when review invalid | Loyalty controls do not approve or change cost allocations; discount capped to service bill with feedback; rates retain precision | Economic assumptions persisted; input presentation mounted conditionally |
| Fictional comparison gate | Closed notice → explicitly opened | Opening acknowledges its separate assumptions; changes cannot affect the personal receipt or reviewed provider costs | Opening local; numerical comparison/risk assumptions in scenario |
| Reset scopes | Reset bill; clear costs; external restoration reset | Reset changes only its named domain; clear costs retains receipt, gifts, loyalty and comparison assumptions; generic reset epoch refreshes drafts only where intended | Event handlers, numeric state, raw drafts and local Billing state |
| Derived financial results | No balance, finite positive/zero/negative balance; finite-horizon result; no finite perpetual estimate | Unknown costs stay unknown; no financial result is emitted before review; perpetual overflow becomes unavailable rather than `$∞` | Derived selectors, not independent editable state |

## Confirmed transition gap

**A nested anchor could preserve edits on screen while removing their reload representation.**

In v17 `useScenario.sync`, a bare main target such as `#economics` writes the current snapshot into the URL. Bare nested targets generally do not. The edit writer does support those nested targets, so editing *after* navigation saves state while simply navigating and reloading loses it. This is an asymmetric transition, not a tariff defect.

Executed reproduction using the actual `useScenario` function:

| Sequence | In-memory result before reload | URL | Fresh mount result |
|---|---|---|---|
| Set usage 585.25 and donation 5; navigate to founding story | Usage 585.25, gift 5 | `#founding-story` | Usage 86.4, gift 0 |
| Enter costs 50 / 20 / 10 / 2.875%; review; navigate to loyalty | All four supplied costs retained | `#economics-loyalty` | Four empty costs |

Method: read `app/ui.tsx`, extract the actual `useScenario` function, transpile with the installed TypeScript compiler, and inject isolated `useState`, `useRef`, `useEffect`, `location`, `history.replaceState` and event-listener doubles. State updates and hash events were executed, then the hook was freshly mounted with the resulting URL. The harness did not replace the parser, serializer or hook transition logic. It models these synchronous transitions; it does not prove browser scheduling or focus behavior.

Minimal correction: one route-transition owner decides whether a link restores a supplied snapshot or navigates with the current snapshot. Every owned nested target must follow the same rule as its parent target. Avoid another independently maintained route list.

## Review policy clarified during the audit

The current implementation binds review to a usage snapshot: reviewed A → changed B is stale → return to A automatically becomes reviewed again. This behavior was reproduced with `providerEconomics`; it is internally consistent, but the wording “Changing usage requires another review” promises a stricter interaction.

The implementation owner selected the project-guidance policy: **a changed accepted usage value clears approval, including A → B → A, until an explicit review occurs again.** A restored valid reviewed snapshot remains a separate restore event. Donation never invalidates review.

A no-op commit needs a guard. `Field` calls its commit callback on blur and Enter even if the accepted value is unchanged. Merely revisiting an input must not invalidate cost review. Compare accepted old/new usage at the chosen canonical monetary precision before invalidating.

## Duplication and inferred risks

These are design risks, not additional verified user failures:

- Two `useScenario` hooks independently own history listeners while economics also mirrors receipt values through `linkedBilling`. A single shared owner removes event-order dependencies and the distinction between stored and overlaid receipt values.
- `set`, `patch` and `replace` accept arbitrary string keys and permit combinations that the UI normally avoids. Domain events can make a cost edit invalidate review automatically and prevent unrelated code from bypassing that rule.
- Numeric cost slots, Known flags and raw drafts are stored together even though only raw drafts determine current validity. Keep numeric slots as a serialization/legacy projection rather than another authority.
- Generic `Field` normalizes its draft when its accepted numeric prop changes. A keystroke-level test should check trailing decimal points, decimal prefixes and selection/caret continuity; filling an entire value does not test this. This audit did not run a browser, so disruption is not asserted.
- Billing readiness is a local mount flag rather than a named “scenario restored” state. Make readiness derive from the shared owner so new asynchronous restoration cannot accidentally expose defaults as an active saved scenario.

## Minimal pure-state boundaries

Keep calculations and the adopted settlement rule unchanged. A small reducer can own domain transitions without introducing a large state-machine dependency:

| Event | Domain effect |
|---|---|
| Restore snapshot | Parse/version-migrate once, restore receipt/cost drafts/review, record any warnings, then mark ready |
| Navigate | Change destination; retain the appropriate current snapshot unless the destination supplies a replacement snapshot |
| Change usage | Accept validated amount, update receipt, invalidate existing cost approval only when usage changes |
| Change donation | Update donation only |
| Change cost draft | Retain raw text, derive validation, clear approval |
| Review costs | Guard on four valid inputs; bind approval to current usage and allocations |
| Clear costs | Clear the four drafts and approval; retain receipt and unrelated assumptions |
| Reset bill | Reset receipt and Billing presentation state; invalidate cost approval if accepted usage changes |
| Change comparison/loyalty assumption | Update only its own model; do not change receipt or approve costs |
| Open/close formula | Change presentation only |

Derive one provider status (`invalid`, `incomplete`, `unreviewed`, `reviewed`) and its next action rather than reproducing precedence across heading, review button, ledger and disclosure summary. An invalid category should win over an empty one for the correction action, as it does now. Review history can retain an explicit “usage changed” reason without using a second independently mutable status.

## Meaningful regression sequences

1. Restore reviewed v5 scenario → edit usage A→B→A → balance remains withheld until review; donation edits leave review intact.
2. Focus/blur unchanged usage → review remains valid. Change only formula/example presentation → review remains valid.
3. Enter invalid cost → close worksheet → correction count remains in summary → reopen/focus correction → fix → still require explicit review.
4. Clear costs while other economic assumptions are edited → only cost drafts/review clear; receipt, donation and unrelated assumptions persist.
5. Nondefault bill or cost scenario → each owned bare nested route → reload → same domain snapshot restored.
6. Restore invalid v5 draft → share → restore again → rejected value and correction remain identical; explicit zero remains valid.
7. Rejected generic input → copy scenario → copied result uses the visibly identified last accepted value; blur/Escape/reset recover predictably.
8. Restoring/loading → attempt control activation → visibly unavailable; readiness → saved values active before interaction.
9. Keystroke-level decimal editing → accepted value, displayed draft and caret remain coherent through render updates.

Existing correct behavior to preserve: shared decimal validation; exact final monetary rounding; invalid-vs-empty cost distinction; explicit zero; invalid-cost correction actions; collapsed invalid summary; version-aware scenario recovery; negative balances; donation isolation; and the canonical pricing thresholds.

## Independent review of the new pure owner

After the inventory, the owner added `lib/experience-state.mjs`. The independent suite in `tests/state-machines.test.mjs` exercises observable receipt and provider results through its events. The first executed run passed all 18 cases. It covers the sequences above at the state layer, every owned snapshot target, formula-close reload behavior, explicit zero/invalid/missing distinctions, reset scope and legacy v1–v5 recovery. It does not substitute for testing the hook/history integration once wired into React.

Two inconsistencies found during that review were corrected by the implementation owner and are covered:

- Numeric-string events were validated as numbers but stored as strings, which could revoke approval for an equivalent unchanged value. Domain events now require numeric values.
- Review selection compared usage/basis exactly while the calculator compared rounded cents. A restored `use=86.401` with reviewed `costBasis=86.4` could therefore be “stale” in the selector while producing a balance. Both now use the selected exact accepted-usage policy, and the test checks their agreement across fractional-cent boundaries.

Two additional defense-in-depth gaps were reported and corrected, without claiming a current UI path had exposed them: inherited object keys could pass a bounds lookup, and edit events could mutate the initial loading state. Bounds now require an own property and all mutations wait for restoration/readiness. Independent regressions exercise inherited/unknown/reserved keys, every pending mutation command, numerical-event guards and valid edits after restoration.

The final independent run passes **22 state-transition cases**. Snapshot checks confirm that unowned destinations cannot restore receipt or cost parameters, and copied links contain only their versioned allowlist; retired ceiling/scaling keys and foreign parameters are omitted. Deep-frozen state/event tests cover every reducer event plus selectors and serialization: no input is mutated in place. Revoked approval also remains revoked after share/reload. These findings validate the pure domain boundary; actual navigation/history, focus and loading presentation still require the separate integration checks.
