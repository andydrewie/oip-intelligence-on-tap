# State ownership and release decisions

## Outcome

The authored runtime has 17 interaction families, documented in `public/archive/interaction-states.json`, `.md` and `.html`. Only connected or asynchronous behavior needed stronger state ownership. Native disclosures, small local selectors and display preferences remain local. No state-machine framework was added.

## Why the earlier standard missed defects

Input validation, URL decoding, known/supplied flags and calculation helpers had separate interpretations. Successful arithmetic and a few rendered controls did not prove invalid-entry recovery. The prior v17 pass repaired that contract and percentage precision.

This pass found the same ownership problem at a different boundary: receipt and economics maintained separate state, while navigation had multiple effects and browser/framework scroll behavior. A calculation can be right while the reader loses their place or sees feedback from an older action. A scalar `reviewed` flag was also too weak unless every change that invalidates it passes through one transition owner.

## Decisions

- The experience reducer owns the receipt and economics assumptions. Economics derives usage and donation. Callers cannot certify costs through a generic field patch.
- Changed usage revokes review; returning to the previous amount does not re-approve it. Donation and unchanged input commits do not revoke review.
- Copy requests have explicit pending/succeeded/failed state, request identity and an eight-second manual-copy recovery. Stale completions cannot update newer feedback.
- Research loading has a bounded retry and static-archive escape. Search input is not navigation. Explicit destinations own clearing a conflicting query and moving focus after DOM commit.
- Same-document fragment navigation belongs to the app. It preserves framework history metadata, decodes the destination apart from scenario parameters and leaves document/external/modifier links native. History traversal receives one guarded, cancellable frame to reconcile browser scroll after the event. Empty history destination means the opening view.
- The original tariff, source corpus, typography, blue visual direction, pet and Foundation/service separation are preserved.

## Evidence and limits

93 automated Node tests and TypeScript passed. Targeted Chrome interaction sequences covered nested snapshots, formula closure/reload, review invalidation and recovery, copy success, controlled research failure/retry, search, tabs, keyboard and history navigation. Narrow and desktop responsive frames were inspected at normal and 200% root text. These frames are not native browser zoom or physical Safari.

`cases.json` retains the v17 baseline with explicit evidence labels and adds 13 follow-up cases. `node-tests.txt` contains this pass's full test output. The baseline's 3 unrun device/permission checks remain unrun. Browser procedures are not an unattended suite or a replay. External financial evidence was not re-researched in this interaction pass.

The source ZIP and generated archive are checked by `scripts/check-release-artifacts.py`. Preview-only routes/harnesses are removed before packaging. Publication is followed by a live-site smoke check; release status is reported separately from pre-publication cases.

## Prevention

For each changed interaction, name its owner, states, events, guards, user-visible consequence, recovery, persistence and cancellation. Test the connected sequence, including interruption and invalid state, and inspect the actual rendered destination on both narrow and wide layouts. Record the evidence revision and untested environments. A test count is coverage evidence, not a universal assurance.

## Late rapid-action correction

Production quick-action testing exposed an adjacent scheduling problem after the initial publication: a post-navigation frame could scroll while the next click was being targeted. The follow-up frame is now limited to initial/native/history navigation; app-owned link transitions settle in committed layout only. A new pointer, keyboard, wheel or touch action cancels the history follow-up. The repeated quick Reset and donation sequences passed locally, alongside Back focus/scroll. The final publication is checked again.
