# Equation typography review · 8 November 2026

Scope: format the adopted billing equation in mathematical notation throughout the interactive drawer, worked examples, billing research chapter, static archive and reusable exports. Later direction: lock the equation layout and mathematical typography.

## Implemented

- A single MathML expression holds B(S), the brace, five rows, stacked fraction and floor brackets. Function parentheses retain normal height; only the case brace and floor brackets stretch.
- Bundled Latin Modern Math 1.959 gives equations a consistent TeX-family typeface. OpenAI Sans remains the interface font. The original OTF and its upstream notices are retained; the WOFF web container preserves the glyph order and MATH table.
- Display sizing: 18px at normal mobile text size and 20px at desktop, expressed in rem. The structure stays intact at enlarged sizes; only its local region scrolls. Keyboard ArrowRight moved the overflowing region by 40px. Narrow layouts include a scroll hint.
- App and static archive use lib/equations.mjs. Pricing Markdown, billing chapter Markdown, research compilation and models JSON include the corresponding LaTeX. JSON also preserves a plain-language rule for simple retrieval.
- The model implementation and historical source corpus remain unchanged. Generated source passages reconstruct the original corpus exactly.

## Actual browser checks

Chrome responsive iframe checks, not physical Safari or browser zoom. The iframe has a 15px vertical scrollbar; its document widths are 15px below the selected viewport widths.

| Surface | Selected width | Root text size | Page overflow | Equation behavior |
| --- | ---: | ---: | --- | --- |
| Interactive drawer | 1280px | 16px | None | Complete 20px equation visible |
| Interactive drawer | 440px | 16px | None | Complete 18px equation visible |
| Interactive drawer | 320px | 16px | None | Intact equation; local horizontal scroll |
| Interactive drawer | 440px | 32px | None | Intact enlarged equation; local horizontal scroll |
| Interactive drawer | 1280px | 32px | None | Intact enlarged equation; local horizontal scroll |
| Formula archive | 1280px | 16px | None | Complete equation visible |
| Formula archive | 320px | 16px | None | Intact equation; local horizontal scroll |
| Formula archive | 440px | 32px | None | Intact enlarged equation and locally scrolling example table |

The research chapter opened correctly in the app, and its equation link navigated to the standalone formula page. The static billing chapter contained the shared fraction, conditions and equation link. The user's extensionless /archive/pricing-formula URL was independently verified to resolve to the formula page before publishing; no replacement route was created.

Edited the real subtotal field and checked both receipt and worked-example totals:

| Subtotal | Settled bill | Donation | Final bill, both views |
| ---: | ---: | ---: | ---: |
| $106.40 | $100.00 | $10.00 | $110.00 |
| $524.99 | $500.00 | $10.00 | $510.00 |
| $525.00 | $550.00 | $10.00 | $560.00 |
| $1,020.00 | $1,000.00 | $10.00 | $1,010.00 |

## Code and export checks

- TypeScript no-emit check passed.
- Existing settlement and source-review suites: 18 checks passed, zero failed. They cover cent precision, thresholds, original example, scenario restoration, economic continuity and source preservation.
- Static pricing/billing HTML contains the exact shared MathML; all three relevant Markdown exports and models.json contain the same LaTeX string.
- Browser log sampling surfaced extension metadata errors, not an observed application error; this is not a claim of a comprehensive console audit.

Limitations: no physical iPhone/Safari, screen-reader session or printed-page test. Native MathML is selectable and carries accessible labels, but assistive-technology behavior was not manually certified.
