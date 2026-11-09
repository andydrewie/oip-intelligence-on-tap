# Navigation and local interaction state reconnaissance

Reviewed the v17 source at commit `d727da2` before the parent agent's state-machine refinements. This is a **source-level review**, with one executed URL round-trip probe. No browser was used in this phase; the managed preview was stopped. The earlier browser and static-link evidence is in `review/input-recovery/navigation-recon.md` and is not counted as verification of this new pass.

Scope: authored runtime components in `app/page.tsx`, `app/ui.tsx`, `app/billing.tsx`, `app/economics.tsx`, `app/research.tsx`, `app/equations.tsx`, their scenario helpers, and the generated archive's native links/disclosures. Unused connector/template scaffolding is excluded. No implementation or generated archive was changed by this agent.

## Main finding

The remaining structural weakness is **multiple owners of an interaction's completion**. Route parsing, panel selection, lazy mounting, disclosure opening, scrolling, and focus each advance through their own effects. Sharing likewise combines two strings and an untracked asynchronous request. The prior input-contract correction improved numeric state; these navigation and asynchronous paths still need explicit transition ownership.

This does not mean every independent local state is wrong. Native disclosures, the relationship stage selector, and the evidence preview are small, mostly synchronous interactions. They do not require a state-machine library. A small route contract, cancellable navigation intent, and request-scoped sharing state are sufficient for the concrete findings below.

## Explicit state inventory

| Family / owner | State actually retained | Events and guards | Required invariant / expected continuation |
|---|---|---|---|
| Page destination — `Home` | `route`, selected `tab`, monotonic `visited` list; location hash is a separate source | Initial hash, `hashchange`, `popstate`, main-tab click, Arrow/Home/End/Space; nested destinations map to an owning tab | Destination, visible panel, selected tab, opened ancestors and keyboard focus must refer to the same latest navigation intent. |
| Scenario restoration — `useScenario` | Values, raw cost drafts, warning, reset revision, current refs; economics overlays linked bill fields | Parse recognized versioned link; preserve current values for bare tab navigation; edits replace current hash; reset is scoped | Restoring a route must not silently replace supplied values with stale linked state. Local edits must not create a URL that restores a different visible state. |
| Research loading — lazy `Research` | Module promise state implicit in `lazy`/`Suspense`; tab stays visited after first opening | Open reasoning or a chapter; pending import shows static-index link; import resolution mounts research | Pending, ready and failed are distinct. A late completion must not take focus from a newer destination. Failure needs a local escape to the static archive. |
| Research search | Local query and derived matching chapters | Typing; no-match result; route to a chapter clears conflicting query | Typing and clearing a query keep focus in search. Only a new navigation intent opens/focuses a chapter. Filtering is local and does not change scenario values. |
| Chapter/native disclosures | DOM-owned open state; filtered chapters can unmount | Summary activation; deep link opens ancestors; filtering removes and recreates entries | Native open state need not be shared, but removing/revealing content must not leave focus hidden. Route opening and manual search must have separate intent. |
| Pricing drawer | `values.formula` controls `<details open>`; routing can also set DOM `open` | Toggle; direct `pricing-formula` / `personal-scaling`; bill reset; example choice | A formula-target link means open. Closing it must serialize to a compatible target with `formula=0`, retaining usage and donation. |
| Example bill presentation | Local `seed`, `thresholds`; usage is central | More examples; threshold mode; choose subtotal; bill reset | Example generation and mode do not change the receipt; choosing a subtotal changes usage only. Donation persists. These are intentionally ephemeral display preferences. |
| Donation presentation | Central gift; local custom-input visibility | Preset click; reveal custom amount; input; reset; URL restoration | Revealing custom entry preserves the donation. Receipt reset resets only bill state. A restored non-preset amount is visible as custom. |
| Worksheet and comparison disclosures | Native cost/method/loyalty disclosures; local `comparisonOpen`; reviewed status derived from scenario | Reveal fictional comparison; review or correct cost; invalidation; scoped clear | Newly revealed comparison has a stable focus destination. Invalidation removes financial results with an explanation. No hidden panel should receive deferred focus. Numeric draft/validation details are owned by the input audit. |
| Copy/share | Current code has independent `message` and `fallback` strings; clipboard promise is untracked | Copy clicked; hash changes; write resolves/rejects; component disappears | Request URL and feedback must come from the same latest snapshot. Pending, copied and manual-copy fallback are explicit states; stale completions do nothing. |
| Pet note | `open`, root and trigger refs | Toggle; close; Escape; outside pointer; inspiration link | Close/Escape return focus to trigger. Navigation to inspiration transfers focus to that destination. Outside-pointer dismissal should preserve the user's new pointer intent. |
| Relationship stages | Stage index 0–3 | Button click; Left/Right/Home/End | One selected tab; focused tab and panel label agree; no mutation of receipt or economics. |
| Evidence packet demo | Selected category list and `preview` boolean | Selection change hides previous preview; preview requires at least one category | No preview with zero categories, no stale preview after edits, and no implication that any data was connected/sent. |
| Founder terms | Local investment and valuation values | Generic numeric fields; generic validation/reset behavior | Derived ownership uses current accepted values. This local illustrative calculator has no share/reset promise; tab changes retain it because visited panels remain mounted. |
| Calculator readiness | `Billing.ready` and each `Field.ready` are independent mount effects | SSR/hydration; saved-link restoration; mount completion | Readiness must mean saved input restoration is complete, not merely that an unrelated effect ran. Loading text should be available to both visual and assistive readers. |
| Archive navigation/downloads | Browser-native URL, anchor and disclosure states; no authored asynchronous app controller | Follow HTML/Markdown/JSON/source links, navigate source paragraphs, download files | Static content remains a usable fallback. Existing link verification is separate from loading/focus transition verification. |

## Bounded findings and minimal repairs

### SMN-F01 — Formula closed state contradicts its URL target

**Confirmed by executed helper probe, not by a browser in this phase.**

`app/ui.tsx:42` keeps a `pricing-formula` or `personal-scaling` target when the formula flag changes. `lib/scenarios.mjs:35` always forces `formula=1` for those targets. `app/billing.tsx:40` can therefore close the drawer, write `formula=0`, and reload into an open drawer.

Executed with usage `585.25`, gift `5`, formula `0`:

| Encoded target | Before encoding | After parsing | Usage / gift |
|---|---:|---:|---|
| `billing` | 0 | 0 | 585.25 / 5 preserved |
| `pricing-formula` | 0 | 1 | 585.25 / 5 preserved |
| `personal-scaling` | 0 | 1 | 585.25 / 5 preserved |

Minimal repair: preserve formula-target links as deliberate open intents; on closing, normalize the route to `billing` with `formula=0`. Make that normalization part of one shared route contract so reader and writer cannot disagree. The parent has accepted this approach.

### SMN-F02 — Clearing chapter search can steal focus

**Confirmed source transition; actual browser effect awaits parent verification.**

In `app/research.tsx:17`, every transition to an empty query while `route` starts with `chapter-` schedules `scrollToRoute(route)`. The helper opens the chapter and focuses its summary. Thus a visitor who entered through a shared chapter, searches, then deletes the search text triggers navigation merely by clearing the field.

Minimal repair: separate a pending chapter-navigation intent from a user query edit. Clear conflicting filters for a *new destination* and fulfill that destination once after the chapter mounts. Query changes alone must not trigger focus or scroll. Preserve the search box's natural focus.

Affected sibling path: a search clear caused by new route and a search clear caused by the user currently use the same condition. A regression must cover both, because deleting the effect entirely could break valid direct chapter entry.

### SMN-F03 — Clipboard completion can belong to an obsolete scenario

**Confirmed missing guard in source; race not exercised in a browser in this phase.**

`ShareLink` (`app/ui.tsx:54–58`) clears its strings when `hash` changes, but a pending `navigator.clipboard.writeText()` subsequently sets a message without checking whether the input hash, request ID, or mounted component is still current.

Two problematic event orders:

1. Copy A → edit scenario to B → A resolves: feedback says “Link copied” beside B, while copied content was A and the fallback may already have been cleared.
2. Copy A → edit/copy B → B resolves → A rejects: A's late rejection can replace B's correct feedback with a manual-copy prompt.

Minimal repair: model `idle | copying | copied | manualCopy` with request ID and immutable URL snapshot. Scenario change or a newer copy invalidates the prior request. Render feedback and fallback from the same accepted request. Disable or visibly mark the pending copy action. Preserve a usable link for clipboard denial; do not make clipboard permission a prerequisite to sharing.

All scenario, calculation and chapter copy controls share this implementation and need the same repair. The parent has accepted the request-token approach.

### SMN-F04 — Navigation has competing, uncancelled completion callbacks

**Concrete race/stale-work risk from source, not a reproduced browser failure.**

Focus/scroll is independently scheduled by `Home.navigate` (`app/page.tsx:51`), the route/tab effect (`:50`), both Research effects (`app/research.tsx:16–17`) and comparison reveal (`app/economics.tsx:100`). None cancels its frame on supersession/unmount or checks that its destination still owns the visible panel. `scrollToRoute` (`app/ui.tsx:61–70`) has no latest-intent or hidden-panel guard.

Minimal repair: use one cancellable route-intent epoch/owner, with destination-to-tab lookup shared by the reader, writer and focus effect. Wait for the owning panel/target to exist, then fulfill the latest intent once. Local reveal should also verify it is still visible and relevant before focusing. Do not repeatedly retry scroll/focus on unrelated state updates.

`hashchange` and `popstate` are both listened to by Home and both scenario hooks. That is not itself proven to corrupt values, but processing the same history destination must be idempotent; duplicate events must not replay focus or discard an active draft through unnecessary revisions.

### SMN-F05 — Lazy research has pending UI but no local failure UI

**Confirmed missing failure branch in source; failed network request not injected in this phase.**

`app/page.tsx:7,55` wraps lazy Research in `Suspense` only. The static-index escape is available while pending, but a rejected import does not have a local error boundary/failure branch. The precise framework-level error appearance was not tested.

Minimal repair: add a small local boundary that keeps the rest of the site usable and offers “Read the static archive” plus a clearly scoped retry/reload path. A failed research load must not imply the receipt or economics failed. A late successful load must not focus a now-inactive research panel.

### SMN-F06 — Loading explanation is inside the inert region

**Confirmed source placement; assistive-technology behavior not tested.**

`app/billing.tsx:19` makes the entire billing subtree inert until local readiness. Its loading `role=status` is inside that subtree (`:28`), as is the “Preparing calculator” tag. The text is visually present while the subtree is removed from interactive/accessible exposure. This undermines the intended nonvisual explanation of readiness.

Minimal repair: place the readiness status outside the inert controls region, or keep the section readable and disable the relevant controls explicitly. Make ready/restoring state owned by actual scenario restoration rather than unrelated component mount flags. The numeric/hydration agent should verify the shared readiness contract before this is considered fixed.

## Transition checks for the implementation owner

All browser checks below are **recommended / unexecuted in this source-only phase**. SMN-01 includes the executed pre-fix helper evidence above. Each check needs its own observed result; passing the helper is not a substitute for focus or loading observation.

| ID | Event sequence | Acceptance condition |
|---|---|---|
| SMN-01 | Formula direct link → close → refresh | URL normalizes consistently; closed drawer, usage and donation survive. Pre-fix helper contradiction confirmed. |
| SMN-02 | Formula direct link with explicit open → refresh | Drawer opens; summary is the navigation focus destination; equation and receipt agree. |
| SMN-03 | Legacy `personal-scaling` link → close → refresh | Alias follows the same normalization; no restored phantom open state. |
| SMN-04 | Chapter deep link → type search → delete query to empty | Search retains focus and viewport; chapter availability changes without unsolicited navigation. |
| SMN-05 | Active search with no match → navigate to a different chapter link | Conflicting query clears; intended chapter opens and gets focus exactly once. |
| SMN-06 | Chapter A → chapter B → Back/Forward | Correct chapter and owning tab, focus and selected state stay aligned; values elsewhere remain intact. |
| SMN-07 | Start copy A → change scenario B → resolve A | Obsolete success does not appear as B's copied result. |
| SMN-08 | Start copy A → change/copy B → resolve B → reject A | B's feedback and URL remain; A's late failure is ignored. |
| SMN-09 | Clipboard denied or unavailable | Clear manual-copy feedback, selectable exact URL and open link; no silent failure. |
| SMN-10 | Start copy → hide tab or filter away copied chapter → completion | No focus jump; unmounted request is safely ignored; hidden feedback is not misattributed on return. |
| SMN-11 | Rapid main-tab keyboard changes | Final selected tab owns visible panel and focus; queued earlier callbacks cannot win. |
| SMN-12 | Nested link → immediately select another tab | Earlier nested focus/scroll never lands in a hidden panel. |
| SMN-13 | Slow Research load → navigate away → load resolves | Current tab and focus remain where the reader moved. |
| SMN-14 | Research import fails | Local failure explanation and static archive remain usable; bill/economics continue functioning. |
| SMN-15 | Reveal comparison → immediately navigate away | Deferred reveal callback does not steal focus; returning shows the retained comparison state. |
| SMN-16 | Back/Forward events reporting same destination | Restoration is idempotent; no duplicate focus or repeated visible reset. |
| SMN-17 | Bare main-tab links versus versioned scenario links | Bare tab navigation retains intended current scenario; explicit shared link replaces it predictably with warning if migrated. |
| SMN-18 | Unknown/missing chapter target | No hidden focus trap or unrelated jump; provide a bounded chapter-list fallback if owner adds invalid-route handling. This is a resilience decision, not a confirmed v17 bug. |
| SMN-19 | Pet open → Escape / close button | Note closes and trigger gets focus. |
| SMN-20 | Pet open → outside pointer / inspiration link | Outside click follows the clicked target; inspiration navigation opens and focuses the story, not the removed pet link. |
| SMN-21 | Native disclosure deep link inside closed parents | Required ancestors open; target is visible/focused; next Tab advances within the intended section. |
| SMN-22 | Relationship stages Left/Right/Home/End | Selected stage, active tab and panel label agree; receipt/economics unchanged. |
| SMN-23 | Select evidence → preview → change selection → deselect all | Previous preview disappears; zero-category preview is disabled; no claim of data transfer. |
| SMN-24 | Edit founder terms → change main tab → return | Accepted local values persist; output changes with valid edits and invalid draft behavior stays explicit. |
| SMN-25 | Bill reset with open formula, custom donation and threshold examples | Bill resets to documented defaults; local example/custom state clears; economics reset scope remains separately defined. |
| SMN-26 | More examples / threshold toggle without selecting a row | Only example presentation changes; receipt and donation stay unchanged. |
| SMN-27 | Ready → custom donation reveal → preset | Revealing preserves current amount; next keyboard action reaches input; preset changes gift only and hides custom input without hidden focus. |
| SMN-28 | Delayed hydration / saved-link restoration | Loading state is visible and accessible, controls cannot commit defaults prematurely, restored values become ready atomically. |
| SMN-29 | Main/nested navigation at narrow width and enlarged text | Destination is unobscured; focus outline and next action are visible; equations retain local overflow rather than altering route state. |
| SMN-30 | Open static index, source passage and downloads from failure UI | Fallback destinations are real authored assets and remain usable without application JavaScript. |

## Prevention rule and practical boundary

For every asynchronous or navigation interaction, specify **the owner, snapshot, completion guard, cancellation event and next keyboard destination** before calling it complete. Test one success, one interruption and one recovery path. Query edits are not navigation; a stale promise is not current feedback; a mounted component is not proof that restoration has finished.

The minimal design is a few explicit local state unions and shared route helpers, not a global rewrite. Keep arithmetic, the adopted tariff, original source corpus, current visual design and all existing valid link versions intact.

No claim is made here about physical mobile touch, Safari, real screen-reader announcements, slow-network timing, browser clipboard-denial UI or post-fix visuals. Those require actual execution by the implementation owner. This report inventories those transitions so they can be checked rather than inferred.

## Final navigation source addendum

The earlier findings above describe the pre-refinement source. A bounded final source review inspected the revised same-document click/history handling, committed-DOM focus and request guards. It did not rerun browser tests.

- `Home` intercepts only same-origin, same-path-and-search fragment navigation. Cross-document/external links remain with the browser/framework. History pushes and replacements preserve the existing `history.state` payload.
- The initial focus pass runs after committed layout. Research owns its pending route through filter clearing/remount and checks the current URL before fulfillment. Home owns other initial destinations.
- The final scheduling distinction is **link versus initial/native/history navigation**. App-owned pushState link transitions use committed layout and schedule no later reconciliation. Initial, native-fragment and history entries may reconcile once after the browser history phase, including research destinations. The frame is guarded by current target/owner and cancelled by route change or the next pointerdown, keydown, wheel or touchstart. This keeps history-scroll recovery from interrupting a new human action.
- The final review caught unconditional React `preventDefault` handlers that bypassed the document handler's modifier exemptions. The owner added modifier/non-primary-click guards to all three authored navigation handlers; source inspection confirms the guards.
- The review also caught the new manual-scroll policy's empty-fragment case. `scrollToRoute('')` now targets `main`; it retains panel data rather than silently resetting it.
- Native source/archive/download destinations have different paths and remain outside interception. Existing framework state is retained, and the previous `scrollRestoration` setting is restored when the component unmounts.

The parent reported browser checks separately: repeated research-load rejection retained retry focus and a later attempt loaded the real chapters; tab/keyboard and Back/Forward selection/focus remained aligned with nonzero destination scroll. Empty-home and chapter-history checks were being completed at this addendum. Those are owner-reported execution results, not browser tests performed by this agent. The public inventory records the final ownership boundaries and points to the separate execution record.

The owner's late production quick-sequence probe exposed an adjacent timing defect: usage 1000 → economics → billing → immediate Reset left the old bill. The final implementation distinguishes app-link navigation from history and cancels the remaining history frame on new input. Source inspection confirms this scope. The owner reported the identical local rapid reset now restored 86.4, a rapid $5 donation applied, reset persisted, and Back retained aligned tab/focus with scroll 1335. These remain owner-reported browser results; this agent updated the contract and performed a bounded source review only. No further material issue was found in the changed scheduling boundary.
