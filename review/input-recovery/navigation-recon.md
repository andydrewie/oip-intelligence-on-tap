# Navigation and archive reconnaissance

Scope: independent read-only inspection of navigation, direct routes, research search, disclosures, scenario links, and archive retrieval. Implementation changes are owned by the parent agent. Observations below were made in the managed Chrome preview at `http://127.0.0.1:4173/` on 2026-11-08 UTC while the repair was in progress.

## Confirmed defects and shared causes

### N01 — Cross-tab deep links lose keyboard position

Trigger: open The reasoning, then activate **Current pricing formula**. The bill tab becomes selected and the formula drawer opens and scrolls into view. However, focus becomes `body`. Pressing Tab starts at **Skip to content**, at the top of the page.

Cause: `scrollToRoute()` opens ancestors and scrolls the destination but does not move keyboard focus. The source link is in a panel that has just become hidden.

Sibling risks: worksheet **Edit the bill**, price-support **Explore the economics of this bill**, the pet's founding-story link, and direct research/source navigation. The desired focus target depends on the route: active tab for a tab destination, summary for a disclosure, or a programmatically focusable heading/region for a section. Do not steal the tab-arrow handler's focus.

Acceptance: activate the cross-tab link with the keyboard, observe focus at its destination, and press Tab once. The next focus must stay in the destination flow, rather than restart the page.

Final preview retest passed: Enter on the Research link focuses the formula summary; the next Tab reaches **Subtotal, including $20 membership USD**. Sources navigation similarly focuses its section, with the next Tab reaching the original conversation link.

### N02 — Opening the fictional comparison removes its focused trigger

Trigger: open `#economics-comparison`, then activate **Open the fictional comparison**. The comparison appears, but the triggering button is removed and focus becomes `body`.

Cause: conditional rendering removes the focused element without a destination-focus decision. This is the same human continuity defect as N01, reached by a different UI transition.

Acceptance: keep a stable expanded trigger, or move focus to the comparison heading/first field. Verify keyboard activation, with subsequent Tab remaining inside the revealed comparison.

The first attempted repair still failed: a single animation-frame callback tried to focus the new input while its initial ready/disabled state prevented focus. The final repair instead focuses the stable `#fictional-comparison` wrapper. Enter activation and next-Tab-to-demand passed. Space activation of this reveal was not repeated; main-tab Space activation was tested separately.

### N03 — Nested economics URLs serialize assumptions that their parser ignores

Browser reproduction during the repair: open `#economics-comparison`, reveal the comparison, change **Assumed demand** from 96.4 to 123.45. The URL becomes `#economics-comparison?v=5&demand=123.45&...`. Reload and reveal the comparison again: demand becomes **96.4** with no warning, although the URL still says **123.45**.

Cause: the updated writer preserves nested targets, while `parseScenario()` accepted only `economics` and `cost-scenario`. Billing's linked-state parser used the same narrower list. Routing, serialization and parsing used independently maintained target lists.

Sibling targets: `public-benchmarks`, `economics-loyalty`, `economics-method`, `economics-comparison`. Centralize their target registry and test receipt and economics restoration for every target.

Final preview retest passed: the comparison retains **123.45** after reload. The three other nested aliases restore a test scenario's **585.25** usage, **$600.00** settled bill, **$5.00** gift, **$605.00** final payment and **19.82** serving-cost draft. The method route also visibly opens and focuses its summary with its parent worksheet open. Unit-level coverage of all aliases is owned by the input-contract agent.

### N04 — Generated documentation must follow the state contract

Source inspection found `scripts/build-archive.mjs` still documenting economics v4 and universal invalid-value fallback to defaults, while the repair introduced v5 raw cost drafts and invalid-state preservation. This is a repair dependency, not a claim that the unfinished revision had already shipped.

Acceptance: generator, `models.json`, `provider-economics.json`, human documentation, machine index and packaged source must describe the same version, bounds, missing/invalid distinction and review rules. Preserve historical `source.json` and `source.html` verbatim.

## Executed checks

| Case | Surface and action | Observed result | Status |
| --- | --- | --- | --- |
| N01 | Research → Current pricing formula → next Tab | Reproduced body-focus failure; repaired summary focus and next Tab into subtotal verified | Fixed; browser retest passed |
| N02 | Economics comparison → Open the fictional comparison | Reproduced lost focus; final wrapper focus and next Tab into demand verified | Fixed; browser retest passed |
| N03 | Nested comparison demand 123.45 → reload | Reproduced silent restoration to 96.4; revised parser restores 123.45 | Fixed; browser retest passed |
| N04 | Compare writer/parser/generator contracts | Generator v4 text differs from in-progress v5 contract | Final generator/package update remains parent-owned |
| N05 | Main tabs: Home from Research, End from Bill | Correct destination selected; focus follows the selected tab | Passed |
| N06 | Research search: nonexistent term | No chapters shown; visible message offers useful replacement terms | Passed |
| N07 | Research search: loyalty, switch to Bill and back | Matching chapters remain filtered; query is retained | Passed |
| N08 | Direct `#chapter-billing` while search hides Billing | Search clears, Billing chapter opens, and scroll target is visible | Passed |
| N09 | Research → Current pricing formula | Billing becomes selected; formula drawer opens; top measured near 119 CSS px | Passed for route/scroll; focus covered by N01 |
| N10 | Clean archive URL `/archive/pricing-formula` | Static formula page loads without `.html`; equation and examples are present | Passed |
| N11 | Static formula → Open interactive drawer | App opens the matching disclosure and displays the current calculation | Passed for route/scroll |
| N12 | Formula Copy link → clipboard and visible feedback | Clipboard matches `#pricing-formula?v=2&use=86.4&gift=0&formula=1`; Link copied and Open this scenario shown | Passed |
| N13 | Open this scenario from formula share feedback | Route retains formula target and encoded values | Passed |
| N14 | Formula summary → Enter | Drawer collapses; focus remains on its summary | Passed |
| N15 | Direct `#economics-comparison` | Economics selected; parent worksheet and nested comparison disclosure both open | Passed |
| N16 | Static internal link and fragment audit | 30 HTML files, 745 internal file/fragment targets, no missing targets or duplicate IDs | Passed, filesystem check |
| N17 | Source ZIP integrity | 8,418,580 bytes; 331 members; no corrupt ZIP member; package/model/scenario/page source present | Passed for pre-repair package; final regeneration required |
| N18 | Core JSON retrieval artifacts parse | chapters, index, inventory, models, provider-economics, source all parse as JSON | Passed, filesystem check |
| N19 | Main-tab ArrowRight at Research; ArrowLeft at Bill | Wraps to Bill and Research respectively; selected tab receives focus | Passed |
| N20 | Main-tab Space, then main/nested Back and Forward | Space selects Economics; final repair aligns focused and selected main tab; nested Back focuses comparison summary | Passed, including post-repair history |
| N21 | Research index → Loyalty chapter → bounded source | Correct static chapter and p-10404 passage open | Passed |
| N22 | Source passage Next → Previous | p-10404 → p-13252 → p-10404 | Passed |
| N23 | Header Sources → next Tab | Sources region receives focus near 119 CSS px; next Tab reaches original conversation | Passed after repair |
| N24 | Sibling nested aliases with a nondefault scenario | Public benchmarks, loyalty, method each restore usage/gift/serving draft and correct receipt totals | Passed for restored values; final method disclosure/focus also verified |
| N25 | Static chapter → Interactive chapter → Copy chapter link → conflicting search → shared link | Loyalty chapter opens and focuses; copy produces `#chapter-loyalty`; opening it clears hidden-result search and restores chapter context | Passed |

The 745-target audit is link integrity evidence, not 745 end-to-end UI tests. ZIP integrity does not prove that its contents match the final revision; the final package must be rebuilt.

## Remaining verification owned by the parent

- Update and regenerate the final archive state contract and source ZIP; N04 remained outstanding at this agent's last filesystem read.
- Repeat the static-link/JSON/ZIP integrity checks after regeneration, because the checks above describe the package available during reconnaissance.
- Cost-scenario invalid drafts, clear/reset, review and malformed-link checks belong to the parent and input-contract agent. N24 covers navigation restoration rather than replacing those tests.
- Any deployment verification must exercise the final published build, not infer release health from this managed preview.

## Limits of this reconnaissance

No physical iPhone/iPad, Safari, touch gesture, operating-system text-size preference, screen-reader speech output, reduced-motion preference or clipboard-permission-denial flow was tested by this agent. DOM accessibility state is not a substitute for those tests. Parent/other agents own mobile/desktop visual snapshots, billing controls, numeric validation and calculations.

External citations were not researched during this scope. Internal target existence does not establish an external source's factual accuracy or future availability.

## Prevention rule

For every interactive transition, test **action → visible result → focus destination → recovery or next action → refresh/share restoration**. Maintain one route registry for writer, parser and UI routing. Numeric tests and file-existence checks cannot validate these human continuity contracts.
