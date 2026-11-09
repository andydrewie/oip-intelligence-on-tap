# Interaction state contract

This is a compact implementation map for reviewers, agents and tests. **One shared experience owns the receipt and economic assumptions.** Navigation, copying and research loading have explicit completion guards. Ordinary disclosures and small local controls retain native HTML or simple local state.

The [JSON inventory](/archive/interaction-states.json) contains owners, states, events, guards, persistence and DOM scopes for every family below. Source paths name files inside the [source ZIP](/source-code.zip); they are not extra HTTP endpoints.

## Retrieve only what answers the question

1. Start here or with the small JSON inventory. Find the relevant family id.
2. Use its entry point and DOM scope to inspect that interaction. Read only its listed implementation owner if code is needed.
3. For arithmetic and input bounds, read [models.json](/archive/models.json). For source reasoning, start with the [research index](/archive/index.json), then follow the relevant chapter or paragraph.
4. Use [recorded checks](/testing.json) for execution evidence. This contract is not a substitute for browser verification.

The archive works without application JavaScript. No polling or full-corpus download is necessary for an interaction question. JSON fragments do not filter on the server; retrieve this small file once and select the family locally.

## Rules shared across the interface

- **One receipt:** economics consumes the same metered usage and donation. Generic economics edits cannot fork the receipt or certify costs.
- **Review is an event:** all four costs must be valid, then explicitly reviewed for the current usage. Cost or usage changes revoke review; donation and disclosure changes do not. Returning to an earlier usage amount does not restore approval automatically.
- **Unknown is not zero:** raw cost drafts distinguish blank, invalid and deliberately entered zero. Invalid drafts survive shared links and remain blocked.
- **A destination has meaning:** formula links mean open. Closing the formula writes a compatible billing destination with `formula=0`. Query edits are not navigation.
- **Completion belongs to its request:** a late clipboard response cannot report success for a different scenario. Timeout/failure leaves manual copying available.
- **Focus follows intent:** link navigation uses committed destination DOM, with no later frame that can interrupt the next action. Research fulfills its pending route after a filtered chapter remounts. Only initial, native-fragment and history navigation may reconcile once after the browser history phase. Route change or the next pointer, key, wheel or touch event cancels that frame; current-target and selected-panel guards reject stale work. Search edits create no navigation; an empty fragment returns to main.

The pricing equation, original source corpus, and separation between the service bill and Foundation donation are unchanged.

## Authored interaction inventory

| Family id | Owner and state | Events and essential guard | Persistence |
|---|---|---|---|
| `experience` | `experience-state.mjs`, `useExperienceState`; loading/ready, receipt, assumptions, drafts, warnings | Restore; accepted edit; review; scoped reset. Allowlisted keys and shared bounds govern transitions. | Billing v2 and economics v5 snapshots; one receipt owner. |
| `navigation` | `Home`, `panelForTarget`, `scrollToRoute`; destination, selected/visited panels, link/history kind | App links use committed DOM only. Initial/native/history entries may reconcile once; the next pointer/key/wheel/touch intent or route change cancels it. Current-target/owner guards apply. | Fragment History API preserves framework `history.state`; visited panels remain mounted locally. |
| `number-input` | `Field`, `inputs.mjs`; loading/empty/invalid/valid plus last accepted value | Type, slider, blur, Enter, Escape, reset. Invalid draft keeps the accepted result with an explanation; blur/Enter visibly restores it. | Accepted scenario values persist; generic invalid drafts do not. |
| `receipt-and-donation` | `Billing`, `bill()`; readiness, usage, gift and custom-input visibility | Usage/preset/custom edit, reset. Gift follows settlement and never enters provider revenue. | Usage/gift persist; custom presentation is local unless saved amount is non-preset. |
| `formula-and-examples` | `Billing`, equation presentation; open/closed, everyday/threshold examples | Toggle, direct link, generate or choose example. Generation does not change the bill; choosing subtotal preserves gift. | Formula/amounts persist; seed and example-view choice are local. |
| `cost-inputs` | `CostField`, `costCategories`; empty/invalid/valid raw drafts | Edit, restore, clear. Allocation USD allows cents; fee allows 0–20%, retaining precision until monetary rounding. | Raw drafts persist in v5, including rejected values. |
| `cost-review-and-loyalty` | `reviewStatus`, `providerEconomics`; incomplete/invalid/unreviewed/reviewed/stale | Review, edit, usage change, clear. Balance and loyalty results require valid inputs and current review. | Inputs, review flag and usage basis persist; in-session invalidation reason is local. |
| `fictional-comparison-and-risk` | `Economics`, `AdvancedEconomics`; unrevealed/revealed and accepted assumptions | Reveal, edit comparison/credit/investment inputs. No mutation of receipt or cost approval; layout effect focuses the committed wrapper only while visible. | Accepted assumptions persist; reveal flag is local. |
| `research-load` | `ResearchLoader`; loading/ready/failed and attempt | Load, resolve, reject, retry, unmount. Only current attempt may complete; static index remains available. | Destination persists; loading/attempt state does not. |
| `research-search-and-chapters` | `Research`; unfiltered/matches/empty, pending route and native chapter state | New chapter navigation clears a conflicting filter, then fulfills its pending destination after DOM commit. Typing clears pending intent; clearing a query alone never navigates. | Chapter link persists; search/open states and pending intent are local. |
| `share-link` | `async-state.mjs`, `ShareLink`; idle/pending/succeeded/failed, id and URL snapshot | Start/reset/success/failure/timeout. Only matching pending request may finish; retry uses a new id. | Copied URL carries scenario/chapter; copy feedback is transient. |
| `pet-note` | `UtilityEgg`; closed/open | Toggle, close, Escape, outside pointer, inspiration link. Close/Escape focus trigger; navigation follows its destination. | Local visibility; inspiration has a stable link. |
| `relationship-stages` | `Relationship`; one of four stage indices | Click, arrows, Home/End. Focus, selected stage and panel label agree. | Local stage retained in mounted panel, not refresh. |
| `evidence-preview` | `Relationship`; empty selection/draft/preview | Toggle, preview. At least one category; edits invalidate prior preview. Nothing is connected or sent. | Local only; no consent or transfer record. |
| `founder-terms` | `Relationship`, `Field`; two accepted numbers and drafts | Edit investment/valuation, leave/return. Shared validation and adjacent derived ownership. | Local only; no sharing/persistence control is promised. |
| `native-disclosures-and-overflow` | `Detail` and authored native HTML; open/closed/local scroll | Summary, direct destination, scrolling. Native semantics; formula is the controlled exception. | Destination persists; ordinary open/scroll state is local/browser-owned. |
| `archive-links-and-downloads` | Static archive generator and ordinary anchors | Follow document/paragraph, download Markdown/JSON/ZIP. Preserve stable source ids and readable fallback assets. | Normal document URL and fragment; no custom runtime controller. |

## Inspect state without guessing

Custom DOM attributes help an agent or test locate runtime state. **They do not replace accessibility semantics.** Use visible labels and native/ARIA state for user-facing meaning.

| DOM scope | `data-state` values | Human-facing evidence |
|---|---|---|
| `[data-machine=receipt]` | `loading`, `ready` | Loading status outside the inert controls, then labeled editable receipt and live totals. |
| `[data-machine=number-input]` | `loading`, `empty`, `invalid`, `valid` | Disabled readiness, label/units, `aria-invalid`, linked hint and retained accepted result. |
| `[data-machine=cost-review]` | `incomplete`, `invalid`, `unreviewed`, `reviewed`, `stale` | Worksheet summary warning, result explanation and correction/review action. |
| `[data-machine=research-load]` | `loading`, `ready`, `failed` | `aria-busy`, status text, retry and static archive escape. |
| `[data-machine=research-search]` | `unfiltered`, `matches`, `empty` | Labeled search, match count, clear action and no-match help. |
| `[data-machine=share-link]` | `idle`, `pending`, `succeeded`, `failed` | Copy status, disabled pending button, exact fallback link and selectable manual-copy input. |

For native/simple controls inspect `details.open`, `aria-selected`, `aria-expanded`, `aria-pressed`, checkbox state, the `hidden` panel attribute and `document.activeElement`. Native state is deliberately not duplicated in a second machine. Repeated `number-input` and `share-link` scopes need a local label or owning section to identify the intended instance.

## Saved-state contract

- Billing links encode `use`, `gift` and `formula`. Economics links include their assumptions, review state, usage basis and the same receipt snapshot.
- Economics v5 also carries `input-servingCost`, `input-developmentCost`, `input-operationsCost` and `input-paymentFee`. Blank and rejected input remain distinguishable. Legacy links receive migration/rejection feedback.
- Bare owned-tab links preserve current in-session values. An explicit versioned scenario link restores its encoded snapshot. Editing replaces the current history entry. The app coordinates same-document fragments while preserving framework `history.state`; cross-document, modifier and non-primary clicks remain native. Scroll restoration is manual while mounted and restored on cleanup. An empty fragment returns to main without resetting retained panel data.
- A formula destination always opens its drawer. Closing normalizes the target to billing rather than leaving contradictory `formula=0` on a formula-opening URL.
- Search terms, pet visibility, evidence selection, stage index, comparison reveal and example seed are intentionally local. A shared scenario does not claim to save the entire interface.
- Clipboard feedback belongs to a request id plus immutable URL. A changed share target or unmount resets it. The eight-second timer enters manual-copy recovery; it does not cancel a browser clipboard operation already in progress.

## Verification boundary

This inventory follows source inspection of the authored controllers. The command `node --test tests/async-state.test.mjs` passed **14 pure transition tests** for request identities, stale completion, reset, retry and timeout terminal guards.

Those tests simulate completion events. They do not prove real clipboard permission behavior, the browser's eight-second timer, failed module loading/retry, screen-reader announcements, physical touch, Safari or post-change visual/focus behavior. Browser evidence is recorded separately in [testing.json](/testing.json); read its stated scope and revision before using it as readiness evidence.

For a changed asynchronous or navigation control, check a successful transition, an interruption and a recoverable failure. Record the visible explanation and the next keyboard destination, not only the computed value.
