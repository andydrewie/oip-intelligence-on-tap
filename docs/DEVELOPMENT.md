# Development and verification

**Run the prototype locally, then inspect the contracts behind its behavior.** The repository starts from Sites version 20. GitHub publication and pull requests do not deploy the existing public site.

## Local setup

Requires Node.js 22.13 or later; Node 24 is the verified environment. Python 3 is needed for packaging checks.

```sh
npm ci
npm run dev
```

Open the address printed by the development server. No application secrets, database or external account connections are required.

```sh
npm test
npm run typecheck
npm run build
```

The production build produces a Cloudflare Worker bundle. `npm run start` serves that build locally. The included GitHub workflow runs the same three checks; a local result and a hosted workflow result are reported separately.

## Architecture

| Area | Starting point |
| --- | --- |
| Page and reading order | [page.tsx](../app/page.tsx), [globals.css](../app/globals.css) |
| Shared receipt and economics state | [experience-state.mjs](../lib/experience-state.mjs) |
| Input and money contracts | [inputs.mjs](../lib/inputs.mjs), [money.mjs](../lib/money.mjs) |
| Adopted settlement rule | [model.mjs](../lib/model.mjs) |
| Equation typography | [equations.mjs](../lib/equations.mjs) |
| Provider worksheet | [provider-economics.mjs](../lib/provider-economics.mjs), [economics.tsx](../app/economics.tsx) |
| Shared scenarios and loading | [scenarios.mjs](../lib/scenarios.mjs), [async-state.mjs](../lib/async-state.mjs) |
| Interaction states and contract | [GitHub state map](INTERACTIONS.md), [machine-readable contract](../public/archive/interaction-states.json) |
| Regression tests | [tests](../tests/) |

Billing links use schema v2; economics links use v5. Legacy links disclose migration. Invalid cost drafts remain invalid through sharing and restoration. Blank differs from explicit zero. Any accepted usage change requires renewed cost review. Donation changes do not certify or invalidate service-cost assumptions.

## Regenerate affected artifacts

Record actual test results before rebuilding reports. Scripts do not turn unperformed checks into passes.

```sh
node scripts/build-archive.mjs
node scripts/build-test-report.mjs review/state-machines
python3 scripts/package-source.py
python3 scripts/check-release-artifacts.py review/state-machines
```

For repository-only presentation changes, regenerate the source ZIP and validate its contents. Do not rewrite historical test results. Read [AGENTS.md](../AGENTS.md) and [PROJECT_GUIDANCE.md](../PROJECT_GUIDANCE.md) before changing implementation or claims.

## Deployment and rights

The application uses the Sites Vinext starter with its `sites()` build integration. For a separate deployment, configure your own project/account and bindings. `.openai/hosting.json` identifies Andrew's existing Site; it is not a deployment credential. Do not publish a fork to that project.

See [SOURCE_PROVENANCE.json](../SOURCE_PROVENANCE.json) for origin and [CONTENT-LICENSE.md](../CONTENT-LICENSE.md) for third-party assets. The new repository cover uses original geometry and system typography. OpenAI assets already present in the concept site remain separately identified and are not relicensed by MIT or CC0.
