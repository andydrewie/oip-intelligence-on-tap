# Interaction states: a map for contributors and agents

**The app has 17 authored interaction families. Its highest-risk transitions already have explicit owners and guards.** The useful next step is to make those contracts easy to find and preserve them when changing a flow. Introducing a new state-machine framework would add migration risk without resolving an observed defect in this repository presentation review.

This inventory was checked against the application source on 9 November 2026. It covers authored React state, asynchronous requests, routing, native disclosures and downloads. It does not enumerate browser internals or claim that every possible event sequence has been tested.

## Find the owner

The [machine-readable contract](../public/archive/interaction-states.json) is the detailed source for family IDs, events, guards, recovery, persistence and accessible observations. The short map below is a GitHub entry point into that contract.

| Family ID | State or transition that matters | Source owner |
| --- | --- | --- |
| `experience` | Loading → restored; receipt and economics share one owner; resets have explicit scope. | [experience-state.mjs](../lib/experience-state.mjs) |
| `navigation` | Destination → selected panel → committed focus; a new user action cancels stale navigation. | [page.tsx](../app/page.tsx), [scenarios.mjs](../lib/scenarios.mjs), [ui.tsx](../app/ui.tsx) |
| `number-input` | Empty, invalid and valid drafts; only accepted values update results; Escape/blur recover. | [Field in ui.tsx](../app/ui.tsx), [inputs.mjs](../lib/inputs.mjs) |
| `receipt-and-donation` | Ready receipt; preset/custom donation; revealing custom preserves the amount. | [billing.tsx](../app/billing.tsx) |
| `formula-and-examples` | Open/closed formula; example modes and seed; selecting an example preserves donation. | [billing.tsx](../app/billing.tsx), [equations.tsx](../app/equations.tsx) |
| `cost-inputs` | Empty, invalid and valid zero remain distinct, including through shared links. | [CostField in economics.tsx](../app/economics.tsx) |
| `cost-review-and-loyalty` | Incomplete/invalid → unreviewed → reviewed; usage or cost edits revoke review. | [experience-state.mjs](../lib/experience-state.mjs), [provider-economics.mjs](../lib/provider-economics.mjs) |
| `fictional-comparison-and-risk` | Deliberate reveal and accepted assumptions; comparison never certifies provider costs. | [economics.tsx](../app/economics.tsx), [AdvancedEconomics in page.tsx](../app/page.tsx) |
| `research-load` | Loading → ready/failed; retry has a current attempt; static research remains reachable. | [research-loader.tsx](../app/research-loader.tsx) |
| `research-search-and-chapters` | Unfiltered/matches/empty; direct chapter entry clears a conflicting filter before focus. | [research.tsx](../app/research.tsx) |
| `share-link` | Idle → pending → succeeded/failed; late responses cannot overwrite a newer request. | [async-state.mjs](../lib/async-state.mjs), [ShareLink in ui.tsx](../app/ui.tsx) |
| `pet-note` | Open/closed; Escape and Close restore trigger focus. | [UtilityEgg in ui.tsx](../app/ui.tsx) |
| `relationship-stages` | One of four stages; selection, focus and panel labeling stay aligned. | [Relationship in page.tsx](../app/page.tsx) |
| `evidence-preview` | Empty selection → draft → preview; any edit invalidates the preview; no data is sent. | [Relationship in page.tsx](../app/page.tsx) |
| `founder-terms` | Two accepted numbers and local drafts; derived ownership is illustrative. | [Relationship in page.tsx](../app/page.tsx), [Field in ui.tsx](../app/ui.tsx) |
| `native-disclosures-and-overflow` | Native open/closed and local scroll state; the controlled formula is the exception. | [Detail in ui.tsx](../app/ui.tsx), [equations.tsx](../app/equations.tsx) |
| `archive-links-and-downloads` | Ordinary document, fragment and download navigation; no custom state needed. | [build-archive.mjs](../scripts/build-archive.mjs) |

## Preserve the consequential sequences

- **Edit → review → edit again.** Costs must be valid and explicitly reviewed for current usage. Returning to an earlier usage value does not restore a revoked review. A donation change or a no-op commit does not revoke it.
- **Type → reject → recover.** An invalid numeric draft must not silently become zero or overwrite the last accepted result. Cost drafts have their own persistence contract.
- **Navigate → act immediately.** Deferred focus must yield to the user's newer action. A route change must not steal focus from a donation choice, reset or search edit.
- **Share → change scenario → receive a late result.** Completion belongs to the initiating request and URL snapshot. Failure has a manual-copy path; the timeout does not prove the underlying clipboard request was cancelled.
- **Load → fail → retry.** Research failure is local. The receipt remains available, and the static archive is an escape route.

Billing v2 and economics v5 URLs carry accepted scenario data; cost links also carry raw drafts. Bare tab links preserve the current in-session values. Selected relationship stages, evidence previews, search filters and ordinary disclosure states are local; do not imply they survive refresh.

## Why this helps UX, DX and AX

People get visible feedback, retained edits and recovery. Developers get one owner for consequential state and named boundaries for changes. Agents get small contracts, stable family IDs and source paths without retrieving the entire historical corpus.

For a proposed behavior change, record **initial state → event → guard → visible result → recovery → persistence**, then test an interrupted sequence as well as the happy path. Keep simple browser-native interactions native. A request to improve all three experiences is a decision criterion, not a guarantee that every tradeoff disappears.

## Retrieve and verify

- Start with one family in the [JSON contract](../public/archive/interaction-states.json), then its source owner and relevant [tests](../tests/).
- For a research question, start with the [archive index](../public/archive/index.json), then one relevant chapter and linked passage. Paths beginning with `/` inside the exported Site contracts resolve against [the live Site](https://intelligence-on-tap-andrew-fai.andydrewie.chatgpt.site/), not GitHub's domain. Source-owner paths resolve against this repository.
- The [100-case record](../review/state-machines/REVIEW.md) reports 97 passes and 3 not run, with retained baseline evidence. The 93 automated tests are a separate measurement. This source audit does not turn historical browser checks into fresh passes.
- Physical Safari/touch, screen-reader speech and native device text settings remain unverified. See the [GitHub presentation review](../review/github-presentation/REVIEW.md) for the distinct README checks.

[Return to the README](../README.md)
