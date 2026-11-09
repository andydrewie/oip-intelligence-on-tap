# Intelligence on Tap

An independent contribution by Andrew Fai. Editorial reconstruction, not a verbatim transcript.

Primary corpus: Pasta Board, author-confirmed complete, plus the supplied screenshots. Later author decisions and implementation analysis are identified in each chapter and /archive/inventory.json. Full historical source: /archive/source.html.

## 01 · The thesis

Status: Author’s proposal
Source: B1 · project brief
Anchor: /archive/source.html#p-23342

Customer Lifetime Value → Relationship Lifetime Value;

The starting point is a choice, not a replacement: keep the $100, $200 and $500 fixed plans and offer a $20 base plus metered intelligence alongside them for personal use. Andrew reaffirmed this scope in a later project discussion. The wider relationship thesis grows from that optional billing relationship.

A subscription begins with a transaction. Over time, useful service, reliable payment and voluntary collaboration could produce something more valuable to both sides. Relationship Lifetime Value is the proposed name for that wider relationship, not an established financial metric.

The relationship connects flexible payment, earned loyalty and voluntary generosity. The proposed checkout offers an optional donation to the OpenAI Foundation, supporting AI that benefits humanity. Commercial benefits and possible partnership have their own terms; charitable gifts are separate from earned privileges and service revenue.

The invitation is deliberately open: consider, challenge, adapt or build on these ideas. This is Andrew Fai’s independent contribution, not a sales pitch, job application, investment solicitation or official OpenAI roadmap.

Open question: Does this improve customer agency and provider economics at the same time?

Boundary: Mutual value is a hypothesis to test. Greater spending is not automatically greater trust.

## 02 · Intelligence on Tap

Status: Original proposal
Source: S1 · original reply; B1 · restaurant analogy; author follow-up · coexistence; O5 · business scope
Anchor: /archive/source.html#p-575

Order what you need. Understand what you pay.

Tibo’s question about a Pro 50 tier prompted a different starting point: a $20 base subscription with dynamic adjustments based on metered use. The original reply imagines 10×, 20× or 50× the base allocation and billing at the nearest tier that covers it. Those multiples are the author’s scenario, not a verified allocation table.

Andrew’s later clarification preserves the $100, $200 and $500 fixed plans as they are. Personal metering is an additional choice for variable usage. He prefers exploring this option to adding a $50 fixed tier; that preference is not evidence that it will outperform fixed pricing.

The restaurant analogy is intelligence on tap rather than a token buffet. A fixed plan provides predictability and access; a meter provides flexibility when appetite varies. A hybrid could offer both, but a counterargument matters: visible per-use charges can discourage exploration and make every question feel expensive.

Published unit rates, a live bill, explicit budget limits, advance alerts and an easy pause would make the proposal understandable. A real design must explain model differences, caching, retries, failed work and taxes. Usage measures resources consumed; it does not by itself measure value delivered.

Official documentation checked on 8 November 2026 already describes credits for eligible usage alongside subscriptions. The incremental proposal is a unified billing experience, a deliberate discount rule and a longer-term relationship design—not the invention of usage credits.

Business and Enterprise have a distinct organizational scope. OpenAI’s business-data documentation describes workspace roles, administrative controls and business data protections, with coverage varying by product. This personal billing proposal does not confer those capabilities. Official source, checked 8 November 2026: https://openai.com/business-data/.

Open question: Will flexibility increase useful demand, or mainly reduce revenue from customers who currently underuse fixed plans?

Boundary: The fixed $50 tier remains hypothetical here. The simulator does not reproduce actual model allowances.

## 03 · The billing experience

Status: Original mockup & adopted formula
Source: S2 · original mockup; author follow-up · adopted settlement rule
Anchor: /archive/source.html#p-138

Consume freely. Pay transparently. Support voluntarily.

The supplied mockup shows $20.00 base + $86.40 metered intelligence = $106.40 subtotal; a $6.40 discount rounds the adjusted bill down to $100.00. Optional contribution choices are $0, $1, $5, $10 or a custom amount.

The screenshot proposes a commercial discount, not a conventional metering rule. It is distinct from the original reply’s tier that covers usage. An earlier implementation generalized this into unrestricted downward rounding and a discount ceiling. Andrew subsequently replaced that implementation with the adopted tier-settlement rule; the historical screenshot still establishes the original $106.40 example.

The current rule adds the $20 base to metered usage to get the subtotal S. The equation below gives the settled bill B(S), before any donation. Named-tier midpoint ties settle lower; half-steps above $500 settle upward. The rule can adjust a bill up or down and continues beyond $500 in $50 steps. The receipt, formula drawer and provider view share this calculation.

M is metered usage in USD; all equation amounts are USD.

$$
S=20+M
$$

$$
B(S)=\begin{cases}
20, & 20\le S\le60,\\
100, & 60\lt S\le150,\\
200, & 150\lt S\le350,\\
500, & 350\lt S\le500,\\
50\left\lfloor\dfrac{S+25}{50}\right\rfloor, & S\gt 500.
\end{cases}
$$

[Equation and example bills](/archive/pricing-formula.html).

Andrew later clarified the intended recipient as the nonprofit OpenAI Foundation. The current receipt says “Help AI benefit humanity,” identifies the Foundation and offers $0, $1, $5, $10 or a custom donation. Zero is the default. The earlier commercial-contribution interpretation is retired. A $100 settled service bill plus a $5 Foundation donation gives a $105 total payment. No money is collected; an actual donation channel and tax eligibility are unverified. The screenshot’s custom $25 field remains historical evidence; the current example produces a $125 total payment when $25 is chosen.

Open question: What do the adopted price bands do to customer choice, exploration and provider economics?

Boundary: The adopted rule is an independent concept, not an official tariff. It settles dollars; it does not define physical compute allowances. Taxes and currency conversion are excluded. There is no hidden default spending ceiling.

## 04 · Compounding loyalty

Status: Original proposal + design elaboration
Source: Pasta Board · spending correction and three dimensions; S3 · loyalty reply
Anchor: /archive/source.html#p-10404

Customers are kings. Loyalty should compound.

The follow-up proposes that people staying on $200/$500 plans build a ‘credit score with OpenAI’ over time, unlocking higher limits, compute on credit and other privileges. The underlying intuition is recognition: sustained support should feel increasingly appreciated.

The discussion first separated loyalty from creditworthiness, then corrected an overemphasis on equality: a customer paying $500 for 24 months has contributed $12,000, compared with $480 from a $20 customer over the same period. Both may pay reliably; their commercial commitments are materially different. Greater sustained spending can reasonably earn greater privileges.

The resolved framing is spend + tenure + reliability → compounding customer privileges. Higher allowances, favorable rates, priority capacity, service and flexibility could make valuable customers feel appreciated. Benefits must remain economically sustainable. Actual deferred payment still requires a separate assessment of repayment risk; the distinction does not erase the importance of spending history.

The source identifies three forms of compounding: economic benefits; a more useful and trusted relationship; and continuity of intelligence through permissioned context. Portability preserves the customer’s ability to leave. Optional contributions remain independent of payment reliability and earned rewards.

Open question: How can accumulated benefits become rewarding enough that valuable customers want to stay, while remaining financially sustainable?

Boundary: The site deliberately does not assign a creditworthiness or founder-quality score.

## 05 · Customer → Partner → Investor

Status: Possible future extension
Source: Pasta Board · bidirectional relationship and $30,000 / 60-month scenario
Anchor: /archive/source.html#p-13252

Relationship building is bidirectional.

A successful customer might need compute financing, product feedback, business-development support, a strategic introduction or a commercial partnership. Equity investment is one possible destination, not the reward at the end of a subscription ladder. Many excellent relationships should remain ordinary customer relationships.

A voluntary founder process could assemble a selected record of shipped work, financial results and strategic decisions. It should verify provenance, account for missing evidence and separate the founder’s own claims from independent confirmation. Subscription history adds context; it should not dominate diligence.

An investor’s agent could examine performance, technical artifacts, market assumptions and proposed terms. A founder’s agent could examine dilution, runway, control rights, compute dependency, data permissions and alternatives. Both should be able to challenge the same evidence and record unresolved disagreements.

This raises conflicts: a platform might be vendor, creditor, distribution channel and shareholder simultaneously. Independent review, explicit limits on reuse and a genuine ability to walk away are essential design questions. The example dossier is synthetic, not an evaluation of Andrew or any real founder.

Open question: Can both sides gain negotiating agency without turning product use into mandatory surveillance?

Boundary: No existing OpenAI investment program, offer, approval or right to investment is implied.

## 06 · Connected personal intelligence

Status: Existing tools / hypothetical workflow
Source: Pasta Board · analytics and plugin corrections; O3–O4 · official documentation
Anchor: /archive/source.html#p-16735

Permissioned evidence. Purpose-specific access.

ChatGPT can use supported connected apps subject to provider access, app capabilities and account or workspace settings. The concept considers selected chats and memories, financial records, analytics, Gmail, calendars, GitHub, documents and other authorized sources. Availability and coverage vary; connecting an account does not mean every historical artifact is available.

An investment workflow built on that information is hypothetical. It would need a distinct consent step specifying the recipient, purpose, records, duration and permitted reuse. Connecting an app to ChatGPT does not automatically authorize an investment team to inspect the underlying information.

The founder should curate and preview an evidence packet, redact confidential and third-party information, disclose only records they are entitled to share and choose whether to release it. The packet should preserve provenance and distinguish verified facts from inferences. User and third-party ownership rights remain with their holders; evidence access is not a transfer of ownership.

Revoking future access cannot guarantee that a recipient forgets information already disclosed. Retention, deletion, onward sharing, access logs and contractual limits need to be explicit. The permission explorer here changes only local demo selections; it connects no accounts and transmits no personal information.

Open question: What is the smallest evidence packet that can answer a specific diligence question?

Boundary: A private exploratory chat should never silently become a character assessment or an investment signal.

## 07 · Economic models & tradeoffs

Status: Explicit assumptions
Source: B1 · requested model; implementation formulas
Anchor: /archive/source.html#p-8287

Revenue can expand. Profitability must be demonstrated.

The economics view explains what subscription revenue must support: serving infrastructure, model development, people and company operations. A sourced Anthropic example precedes the optional calculator and shows company-wide expense ratios; those ratios never fill OpenAI customer costs. Andrew clarified that his 10–20% remark was a guess, so target-margin cards have been removed. Reviewers can open the business assumptions, supply costs and review them for the current usage before a scenario balance appears. See /archive/provider-economics.html for evidence and formulas.

A deliberately opened fictional advanced model compares a selected fixed plan, a hypothetical $50 plan, base plus metering, the author-adopted tier settlement and metering with loyalty privileges. The settlement rule was chosen in the later follow-up; the original source proposed round-down discounts. It shows fulfillment as well as dollars because a cheap plan that stops serving demand is not equivalent to a plan that serves all of it.

Demand is measured in invented normalized compute units, not tokens, actual OpenAI credits or completed tasks. All included allowances, retail rates, inference costs, delivery costs, payment fees, churn rates, reward discounts and retention effects are adjustable assumptions. Official subscription prices are merely reference anchors.

Revenue is the customer charge excluding optional Foundation donations. In the fictional advanced comparison, delivery balance subtracts modeled inference and delivery costs. Partial contribution subtracts further variable costs and payment fees, but still excludes research and shared overhead. These simplified results cannot establish a company’s profitability. The separate reviewed cost worksheet includes user allocations for development and operations, but remains before financing, tax and omitted costs.

Contribution-based lifetime value is monthly contribution divided by monthly churn minus acquisition cost, assuming constant economics, geometric survival and no discounting. Zero churn has no finite perpetual estimate; the 12-month model remains finite. The loyalty retention uplift is an assumed relative reduction in churn, not an observed effect. Credit exposure and speculative partnership upside are kept separate from subscription margin.

The business question is whether additional usage and stronger retention can support customer benefits and the full cost of developing and delivering AI. Evaluate the commercial service without relying on charitable gifts. A company-wide loss does not identify a loss on each customer account; a positive allocation scenario does not establish company profit.

Open question: What demand, cost and retention evidence would falsify the attractive version of this model?

Boundary: No model accounts for all capacity, research, tax, regulatory, fraud, cohort or market effects. No profitability or investment-return forecast is claimed.

## 08 · Philosophy & institutional design

Status: Normative hypothesis
Source: S1 · conscious capitalism; B1 · universal altruism
Anchor: /archive/source.html#p-9620

Trust and reciprocity should be designed into the transaction.

The original reply invokes altruistic, conscious capitalism and questions opaque profit margins. The project brief extends this toward universal altruism: commercial success and public benefit might reinforce one another when incentives, contributions and relationships are more transparent. This is a lens for design, not a claim of inevitable social progress.

Price transparency is narrower than margin transparency. A clear bill does not expose true inference costs, shared infrastructure, research expense or cross-subsidies. Publishing every margin may be impractical; publishing understandable terms, prices, discounts and consent boundaries is a more directly testable first step.

The proposed optional donation to the OpenAI Foundation gives appreciation a charitable destination: AI that benefits humanity. An unusually valuable outcome may inspire generosity regardless of commercial profitability. The donation remains separate from service charges and earned loyalty privileges. The Foundation channel and any tax eligibility require verification; this concept collects no money.

Long-term reciprocity can align incentives, but loyalty can also become lock-in. Partnership can also concentrate power. The institutional test is whether a customer can understand the deal, refuse optional disclosure, export their work and leave without unreasonable penalty.

Open question: What observable outcomes would distinguish mutual value creation from a more persuasive form of extraction?

Boundary: Profit, public benefit and fairness are different objectives. Their alignment requires evidence and governance, not a slogan.

## 09 · Conversation timeline

Status: Source-grounded evolution
Source: Pasta Board · complete author-supplied source; S1–S3 · original tweets
Anchor: /archive/source.html#p-10404

An idea grows through correction, not just addition.

The supplied tweets establish the starting sequence: a reply to Tibo’s Pro 50 question; the Intelligence on Tap billing mockup; and a loyalty follow-up. Pasta Board then documents the reasoning and revisions. Links below use original document paragraph indexes, not invented timestamps.

First, a $20 base and flexible metering lead to a round-down discount and optional contribution. Loyalty introduces reasons to stay on $200/$500 plans. An initial critique separates loyalty from creditworthiness, but the discussion then corrects its underweighting of spending: spend, tenure and reliable payment are economically meaningful dimensions that deserve recognition.

Next, the relationship becomes bidirectional: an AI provider could eventually support or invest in a business its customer builds. A narrow focus on token consumption is challenged by connected analytics and financial evidence, then broadened again by the plugin ecosystem. Explicit consent remains the boundary between a personal assistant and investment diligence.

Finally, both parties use agents to assess opportunities and terms. Customer Lifetime Value → Relationship Lifetime Value becomes the synthesis. The author chooses an open concept site as a generous contribution rather than a pitch. The original source also asks for rigorous tests rather than claims of proven economics.

Open question: Which assumptions should be tested first before this conceptual relationship becomes a product?

Boundary: The source is reproduced in document order. Speaker identities and precise dates are not inferred where the document omits them.

## 10 · Open questions & next steps

Status: Proposed experiments
Source: B1 + implementation analysis
Anchor: /archive/source.html#p-9312

Start with the smallest useful test.

First test the bill, not an investment institution. Compare a fixed-plan explanation with a base-plus-metered explanation using the same tasks and disclosed limits. Ask people to predict their bill, set a spending ceiling and explain the discount. Record comprehension, perceived control and hesitation to use the product.

Then test the economics with consented cohort evidence: actual served usage, realized delivery cost, plan migration, churn and contribution after discounts. Separate revenue expansion from cannibalization. Define acceptance thresholds before the pilot; do not invent positive results from this simulator.

Test bounded loyalty privileges separately from lending. Measure reward cost, retention and fairness across spending levels. A financing pilot needs its own exposure limits, review, loss monitoring and eligibility framework. A founder-partnership pilot needs separate voluntary evidence sharing and conflict governance.

Unresolved decisions include discount anchors and caps; units and model prices; included allowance and rollover; hard-stop behavior; treatment of failed tasks; rights and retention for shared evidence; the separation of rewards, financing and investment; and what Relationship Lifetime Value should measure without double-counting future upside.

Open question: Which single experiment would most reduce uncertainty before anyone commits to building the next layer?

Boundary: This site is an invitation to explore. It does not claim AI pricing or institutional design is solved.
