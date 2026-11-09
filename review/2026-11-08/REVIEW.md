# Intelligence on Tap — bounded final review

Reviewed 8 November 2026. Existing public project retained. Canonical Pasta Board revision was checked against the connected document; the source JSON, editorial chapters and evidence inventory were not changed.

## Material findings and changes

- **Verified defect:** a $5 contribution disappeared when leaving and returning to Billing. Previously selected panels unmounted. Visited panels now preserve their inputs; the research bundle loads only when needed.
- **Verified defect:** Sources selected Research but left the source section roughly 2,800 pixels away. Sources now lands on the source list. Chapter URLs select Research, expand the chapter and land on its heading. Browser Back works across exploration tabs.
- **Verified limitation:** the existing links could not reproduce a simulator scenario. Billing and Economics now expose versioned links with all their numerical inputs, bounds, reset and copy feedback. Links exclude personal records and permission selections.
- **Verified numerical edge case:** the quotient form of the finite-horizon churn formula loses accuracy near zero churn. The implementation now uses the explicit twelve-term survival sum. Receipt input amounts are normalized to cents and non-finite values are rejected.
- **Editorial judgment:** the abstract opening took longer than necessary to explain the concrete proposal; it now leads with the $20 base, metering and earned privileges. The overview keeps the commercial uncertainty visible.
- **Editorial judgment:** eight financial columns and two risk models competed for attention. The first comparison shows service fulfillment, revenue and contribution; full metrics, formulas, credit and investment scenarios remain available through deliberate expansion.
- **Verified access cost:** the former archive required whole-research or whole-source retrieval for narrow questions. The new small index links to ten scoped chapters, fifteen lossless source passages and an explicit model specification. All have static access paths; chapter HTML requires no JavaScript.
- **Explicit author direction:** blue replaces green. Exact OpenAI Sans files and the original blue Codex companion are sourced from OpenAI's CDN. Two static sprite frames add familiarity without animation or overlays. Their third-party rights remain distinct.

## Verification performed

1. Billing: original $100 bill, $5 → $105, custom $25 → $125; $99.99 subtotal discount cliff; pre-discount spending ceiling; rounding off; editable blank number field; state retained across sections.
2. Scenario transport: shared $105 receipt reopened and loaded as $105; changed demand of 140 survived reload; all model parameters round-trip through versioned links; invalid numeric/version input tests pass.
3. Navigation: Sources landing position, direct `#chapter-loyalty` after reload, browser Back, keyboard tab navigation and End-to-last relationship stage with focus confirmed.
4. Responsive inspection: desktop and 390/320 px iframe layouts (375/305 px content widths with scrollbars); overview, billing and economics showed no document-level horizontal overflow. Inputs use 16 px text. These are Chromium layout checks, not physical-device or screen-reader certification.
5. Mathematical and source checks: nine automated tests pass, including zero/near-zero churn, negative margins, credit expected loss, receipt reconciliation, and exact reconstruction of all 572 source paragraphs from scoped passages. 1,275 local static links/anchors resolve on disk. Primary text/blue/background contrast pairs range from 4.59:1 to 14.66:1. TypeScript check passes.

The founder runway example now explicitly assumes cash collection equals the stated monthly recurring revenue; revenue alone cannot determine cash runway. Loyalty's spend + tenure + reliability correction remains linked to original paragraph 10404. Credit underwriting, investment consent, charity and actual product facts remain separate.

## Evidence

- [Original overview](01-before-overview.png)
- [Original Sources navigation](02-before-sources.png)
- [Revised Sources landing](05-after-sources.png)
- [Final blue, OpenAI Sans and companion](09-openai-sans-blue-pet.png)
- [Final narrow overview](10-final-mobile-top.png)
- [Mobile billing interaction](08-blue-mobile-billing.png)
- [Narrow economics](11-final-mobile-economics.png)

## Boundaries

This is a review of a concept site, not empirical validation of pricing or investment economics. No user study with Tibo, full assistive-technology audit or real financial/data connection was performed. CC0 remains a recommended dedication for original written material; OpenAI assets and other third-party material are excluded from that proposal and the code's MIT grant.
