# Direction, origin and reuse review — 8 November 2026

## What prompted this revision

The supplied mobile screenshot showed Customer Lifetime Value and Relationship Lifetime Value side by side, with an arrow pointing down between them. The mobile layout and the arrow were governed by separate overrides: a later enlargement rule removed the rotation without changing the horizontal layout. The earlier visual review had checked wrapping and overflow without checking the meaning conveyed by the arrow. This was a missed regression, not a pricing-model defect.

## Changes

- A single grid rule set now controls both the thesis arrangement and arrow direction. The arrow points right between horizontal labels and down between vertically stacked labels. The accessible wording includes “to”. Independent flex wrapping can no longer orphan the arrow.
- The two customer spending commitments are compared with “vs”. They are not depicted as one amount turning into the other.
- Internal exploration links use forward arrows. The overview jump points down; formula and inspiration disclosures point down when closed and up when open. Copy and download affordances retain their distinct meanings. Inline mathematical arrows and historical source text remain unchanged.
- On a 320px viewport with the root type doubled, the first check exposed an awkward mid-word break and a crowded companion/heading. Narrow-card spacing now gives “Relationship” a whole line and separates the heading from the companion.
- The origin drawer distinguishes Tibo’s $50 question from Andrew’s ChatGPT Pro/Uber One experience and the end-of-ride tipping inspiration. “Read the inspiration note” and “Read the original billing discussion” now describe their separate destinations. The homepage retains the author-supplied X link.
- Andrew’s original writing is now dedicated under CC0 1.0, with MIT for original application code and explicit third-party exclusions. The footer, downloadable terms, source documentation and generated agent/archive metadata agree. The hero invitation remains simple.

## Actual browser verification

The local running application was exercised in Chrome using the retained `reflow-harness.html`. The harness is a same-origin iframe with explicit CSS widths and optional root-font enlargement. Its results are **not** physical iPhone/Safari testing and are **not** actual browser zoom.

`geometry.json` records 14 final combinations. Every combination had the arrow between the labels, pointing toward the target label, and zero document horizontal overflow:

| Viewport width | Root type | Arrangement / direction |
| --- | --- | --- |
| 320, 390, 430 | 16px | Stacked / down |
| 440, 640, 700 | 16px | Horizontal / right |
| 701, 950, 951, 1280, 1440 | 16px | Stacked / down |
| 320, 440, 1280 | 32px | Stacked / down |

Screenshots were inspected at wide mobile, narrow enlarged mobile, desktop and enlarged desktop sizes. They include the surrounding page, not only isolated icons. Width changes can leave the current scroll position outside the card; the geometry check reads the rendered card independently, and screenshot review used explicit navigation to the card.

Additional checks performed:

1. Open the companion, dismiss with Escape, reopen, and follow its inspiration link. The pop-up closes and the correct drawer opens.
2. Toggle the inspiration drawer with Enter; verify its open state and down/up cue.
3. Toggle the pricing formula with Enter; verify the open state and settled icon direction after its short transition.
4. Inspect the spending comparison at mobile and desktop widths: “vs” stays upright in both column and row arrangements.
5. Inspect the billing and overview call-to-action paths: right and down respectively, with no residual shared rotation.
6. Open the footer with Enter and read the adopted CC0 dedication, MIT code label and third-party exclusions.
7. Confirm the inspiration note and original billing discussion have different, accurately named destinations; preserve the exact supplied X URL.

## Other validation

- TypeScript `--noEmit`: passed.
- Existing `tests/review.test.mjs`: all four checks passed, including cent reconciliation, finite-horizon behavior, scenario sharing and reconstruction of every archived source paragraph without edits or omissions.
- The source/archive generator reports ten chapters and fifteen bounded source passages, with original source unchanged.
- No billing, settlement or provider-economics formula was changed in this revision.

The temporary public harness is removed before packaging. The reproducible harness and the observed screenshots/data are retained here. This is a bounded regression review of the changed presentation and adjacent cues, not a claim that every possible device, browser or website interaction has been exhaustively tested.
