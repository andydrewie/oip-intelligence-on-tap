# Repository publication review

**The proposal is inspectable and ready for substantive critique; its commercial and societal outcomes remain unproven.** This review checks the source publication and its presentation on 9 November 2026. It does not certify a production billing service or a completed customer study.

## README follow-up: navigation, typography and equations

Andrew's mobile screenshot showed a crowded four-link entry, a missing visible equation and lettering below the center of its circle. This follow-up is **GitHub-only**. The application and live Site were not edited or deployed.

The README now leads with a standalone level-two link, “Live payment UI prototype,” pointing directly to the bill. Secondary paths are vertical and described by purpose. The live economics, relationship and reasoning views are surfaced without reproducing their entire interface. The interaction map links all 17 authored state families to their source owners. This is a source audit and navigation improvement, not a new state-machine refactor or a claim of exhaustive runtime coverage.

The cover's two-line lettering moved 13 SVG units upward and 1.5 units right. Rasterized visible-ink center is (1025.5, 297), within half a unit of the circle's center (1025, 297). The PNG derivative matches the SVG render.

GitHub initially rendered only two equation rows because literal less-than signs were interpreted incorrectly. The README, economics guide and three generated Markdown companions now use equivalent `\lt` / `\gt` commands. The archive generator preserves that representation. Billing arithmetic, the shared application equation and all historical source passages remain unchanged.

| Fresh follow-up check | Observed result |
| --- | --- |
| Controlled README typography | 15 combinations: frame widths 320, 390 and 1012 CSS px; text sizes 87.5%, 100%, 125%, 150% and 200%. No document-wide horizontal overflow or broken images. |
| Increased text spacing | 390 px frame with 200% text, 0.12em letter spacing, 0.16em word spacing and 2em paragraph spacing: no document-wide horizontal overflow. |
| Controlled keyboard check | Tab from the primary action reaches “Read the proposal”; visible focus remains available. |
| Actual GitHub web | Primary action renders as a larger heading link; cover loads; destination retains `#billing`; native math has all five rows. |
| Actual Chrome zoom on GitHub | 200%: 681 px viewport, 674 px usable/document width. 400%: 340 px viewport, 337 px usable/document width. No horizontal page overflow; primary link wraps with its arrow attached. Zoom restored to 100%. |
| Actual GitHub keyboard check | Tab advances from the primary link to GitHub's heading permalink. Normal native anchors remain keyboard reachable. |
| Linked economics guide | GitHub renders all five settlement cases, including the final floor expression. |
| Equation consistency | All five Markdown copies normalize to the shared application LaTeX; only renderer-safe notation differs. |
| Repository links and state owners | 90 relative Markdown targets resolve; all 17 contract families appear in the guide and their listed source-owner files exist. |
| Regression checks | 93 tests passed, typecheck passed, production build passed. No new runtime behavior was introduced. |

[Reviewed GitHub rendering](readme-github-preview.png).

The native GitHub checks used candidate `171d52b224e65cb1449d0b7e2465fb1c3d1aabd5`; the reviewed README and artwork bytes are retained in the final publication. The controlled rendering approximates GitHub typography and uses native MathML; it is separate from the checks of GitHub's actual renderer. Its 320 px frame has 305 px usable width after the scrollbar. The temporary fixture is removed before packaging.

**Remaining limits:** the GitHub iOS/Android apps, OS Dynamic Type, screen-reader speech and reader studies with people of different ages or with ADHD were not tested. These checks establish layout and navigation observations, not universal accessibility or attention outcomes. The historical application/device review remains unchanged. GitHub controls native font settings; Markdown supplies semantic headings, ordinary links and reflow-friendly content.

Reference criteria: [GitHub mathematics](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions), [W3C resize text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), [W3C reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html). These references informed the checks; no conformance certification is claimed.

## Completion verification

The resumed review found `main` still at `d5518f857c4e562cd35e4cd69194d07b418aab27`, while the reviewed presentation was in detached candidate `171d52b224e65cb1449d0b7e2465fb1c3d1aabd5`. That candidate also retained the older downloadable source ZIP. The final publication combines the reviewed presentation with the completed review record and a synchronized source package.

Fresh checks on 9 November 2026: 93 automated tests passed with no failures; TypeScript and the production build passed. GitHub rendered both equations, all five settlement rows and the fraction/floor expression. Native Chrome zoom was exercised at 200% (681 px viewport, 674 px document) and 400% (340 px viewport, 337 px document), with no document-wide horizontal overflow; zoom was restored to 100%. These fresh checks confirm the retained candidate README bytes. Earlier controlled typography and keyboard checks above remain explicitly retained evidence.

The package check now also compares the README, contributor and agent entry points, documentation and artwork, generated Markdown, provenance and archive generator with their ZIP copies; GitHub CI runs that check. Application and library files, tests and the historical source corpus are unchanged from the published baseline. No Site deployment is part of this release.

The linked publication discussion was read in the shared browser view. Its earlier project link exposes some messages and execution markers without complete assistant replies; those gaps are not represented as recovered transcript. The current request, recorded project guidance, prepared source and published branch determine this completion's scope.

## Findings retained from the initial publication

- The adopted tariff is internally consistent and intentionally discontinuous. A subtotal of $350.00 settles to $200; $350.01 settles to $500. The README and economics guide now expose that consequence.
- Existing OpenAI credits mean flexible usage alone is not a novelty claim. The proposed contribution is the combined billing experience, relationship model and evaluation framework.
- Company-level peer expenses were checked against the primary SEC filing. They are not OpenAI costs or customer-cost defaults.
- The new Relationship Lifetime Value essay distinguishes purchases, voluntary gifts, knowledge sharing and separately negotiated investments. It presents a university-inspired ecosystem as a hypothesis and ambition.
- Independent authorship is prominent. The original repository cover uses system typography and original geometry. Existing third-party site assets remain separately identified in CONTENT-LICENSE.md; this review does not establish blanket redistribution permission.

## Initial publication checks

| Check | Result |
| --- | --- |
| Automated regression suite | 93 passed; 0 failed; see automated-tests.txt |
| TypeScript check | Passed with no diagnostics |
| Production build | Passed; Vinext reports a route-classification limitation, not a build failure |
| Application, library, test and historical archive files | Unchanged against the prepared Sites version 20 export |
| Citation, issue forms and workflow YAML | Parsed successfully |
| Original cover | Rendered to 1280 × 640 PNG and visually inspected; under 1 MB |
| New documentation links and packaged source | Results in publication-checks.json and artifact-checks.json |

The initial standalone local preview could not run. The follow-up above used a managed preview for controlled layout checks and GitHub web for native rendering and zoom checks; these supersede that preview limitation for the README only.

## Historical evidence retained

The 100-case interaction record reports 97 passes and 3 not run, combining 87 retained baseline cases and 13 follow-up cases. It is not 100 newly executed browser tests. No historical browser or physical-device result was promoted to a fresh pass during this documentation review.

Physical Safari/touch, screen-reader speech, application browser zoom/OS text settings and actual permission dialogs still require verification in the historical application record. The fresh GitHub zoom checks above do not change those application results. See [the original review](../state-machines/REVIEW.md) for its scope.

## Publication boundaries

GitHub publication does not deploy the existing Sites application. The historical source corpus and adopted tariff remain unchanged. The new ecosystem essay is explicitly dated and separated from that corpus. No messages were sent to OpenAI or other recipients, and no donation or investment program was created.
