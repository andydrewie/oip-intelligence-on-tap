# [OIP] OpenAI Improvement Proposal - Intelligence on Tap

**An independent proposal by Andrew Fai.**

### Customer Lifetime Value → Relationship Lifetime Value;

What if access to intelligence could grow with a person, and the relationship could grow with what they create?

This proposal explores an **optional $20 membership plus metered intelligence**, alongside fixed plans, and a longer-term ecosystem of loyalty, research and voluntary partnership. The working prototype makes the adopted billing rule inspectable. The larger ambition is an AI native Renaissance in which more people can build, discover and contribute. **Commercial viability and broader access are hypotheses to test**; this repository does not demonstrate superintelligence or its democratization.

[**Explore the live prototype →**](https://intelligence-on-tap-andrew-fai.andydrewie.chatgpt.site/) · [Read the proposal](docs/PROPOSAL.md) · [Relationship Lifetime Value](docs/RELATIONSHIP-LIFETIME-VALUE.md) · [Run locally](#run-locally)

![Intelligence on Tap. Transparent billing, compounding loyalty, mutual value. Independent concept by Andrew Fai.](docs/assets/cover.svg)

---

## The idea in one minute

1. **Keep choice.** Preserve fixed plans; explore an optional membership with metered usage.
2. **Make the bill legible.** Show usage, settlement and any voluntary contribution separately.
3. **Let loyalty compound.** Explore benefits that recognize spend, tenure and reliability, with a meaningful entry path for newcomers.
4. **Grow with what people create.** Help pioneers become researchers, founders, mentors and contributors to the next frontier.

The [university-inspired ecosystem essay](docs/RELATIONSHIP-LIFETIME-VALUE.md) develops the fourth idea: a relationship can produce useful work, shared knowledge, new enterprises and voluntary giving. These are different forms of value, with different owners and consent requirements.

## Try it; inspect the consequences

The [interactive receipt](https://intelligence-on-tap-andrew-fai.andydrewie.chatgpt.site/) applies the author's adopted concept tariff to **$20 + metered usage**. All amounts below are USD, before any separate donation.

| Subtotal | Settled service bill | Adjustment |
| ---: | ---: | ---: |
| $106.40 | $100.00 | −$6.40 |
| $349.99 | $200.00 | −$149.99 |
| $350.01 | $500.00 | +$149.99 |
| $525.00 | $550.00 | +$25.00 |

The rule deliberately creates sweet spots and sharp boundaries. Those consequences deserve study. A production offering would also need a defined compute meter, understandable forecasting and spending controls. This prototype collects no payments.

[Exact formula and economics](docs/ECONOMICS.md) · [Source implementation](lib/model.mjs) · [Regression tests](tests/settlement.test.mjs)

## Choose your way in

| If you are… | Start here | The question |
| --- | --- | --- |
| A researcher | [Research agenda](docs/RESEARCH.md) | Does the design improve useful work within a chosen budget? |
| A finance leader | [Economics review](docs/ECONOMICS.md) | Can the experience be funded at matched service quality? |
| A founder or CEO | [Proposal](docs/PROPOSAL.md) and [relationship essay](docs/RELATIONSHIP-LIFETIME-VALUE.md) | Which part could be evaluated independently? |
| A developer | [Development guide](docs/DEVELOPMENT.md) | Can you reproduce, challenge or improve the prototype? |
| An AI agent | [llms.txt](public/llms.txt) and [AGENTS.md](AGENTS.md) | What is evidence, what is an assumption, and what must be preserved? |

## What is established; what remains open

OpenAI already offers [usage credits for eligible ChatGPT features](https://help.openai.com/en/articles/12642688-using-credits-for-flexible-usage-in-chatgpt-personal-plans). This proposal's contribution is the combined billing experience, relationship model and inspectable evaluation framework. It does not claim to invent metering.

The repository contains **93 automated tests**, an unchanged 572-paragraph historical source corpus, and a [100-case interaction record](review/state-machines/REVIEW.md). That record reports 97 passes and 3 not run, combining 87 retained baseline cases with 13 follow-up cases. It is not 100 fresh browser tests. See the [publication review](review/github-presentation/REVIEW.md) for checks performed on this publication and remaining device checks.

Provider costs start unknown. No OpenAI margin is assumed. Loyalty effects, customer outcomes, investment returns and access improvements have not been demonstrated. The [sources and claims guide](docs/SOURCES.md) keeps these distinctions visible.

## Run locally

Requires Node.js 22.13 or later; Node 24 is the verified environment. Python 3 is needed for packaging checks.

```sh
git clone https://github.com/andydrewie/oip-intelligence-on-tap.git
cd oip-intelligence-on-tap
npm ci
npm run dev
```

Open the local address printed by the server. No application secrets or external account connections are required. See [development and verification](docs/DEVELOPMENT.md) for tests, architecture and deployment details.

## Help make the proposal better

A counterexample, a clearer explanation, a reproducible defect or a careful experiment can be a useful contribution. Read [CONTRIBUTING.md](CONTRIBUTING.md), [challenge a claim](https://github.com/andydrewie/oip-intelligence-on-tap/issues/new/choose), or cite the work using [CITATION.cff](CITATION.cff).

“OIP” is Andrew's label for this independent contribution. It is not an official OpenAI process, endorsement, product or offer. The concept donation is separate from service payments; no official donation channel is established here.

Original code is [MIT](LICENSE); Andrew's original writing is dedicated under [CC0 1.0](CONTENT-LICENSE.md). Third-party assets retain their own rights. The source starts from [Sites version 20](SOURCE_PROVENANCE.json); GitHub publication does not automatically deploy the live site.

**Take what is useful. Challenge what is uncertain.**
