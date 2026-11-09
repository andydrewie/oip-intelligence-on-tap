# The billing experience

Consume freely. Pay transparently. Support voluntarily.

Status: Original mockup & adopted formula
Provenance: Editorial reconstruction, not a verbatim transcript. See /archive/inventory.json for claim-level status.
Original source: /archive/source.html#p-138
Bounded source passage: /archive/passages/p-1.md
Interactive chapter: /#chapter-billing

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
100, & 60<S\le150,\\
200, & 150<S\le350,\\
500, & 350<S\le500,\\
50\left\lfloor\dfrac{S+25}{50}\right\rfloor, & S>500.
\end{cases}
$$

[Equation and example bills](/archive/pricing-formula.html).

Andrew later clarified the intended recipient as the nonprofit OpenAI Foundation. The current receipt says “Help AI benefit humanity,” identifies the Foundation and offers $0, $1, $5, $10 or a custom donation. Zero is the default. The earlier commercial-contribution interpretation is retired. A $100 settled service bill plus a $5 Foundation donation gives a $105 total payment. No money is collected; an actual donation channel and tax eligibility are unverified. The screenshot’s custom $25 field remains historical evidence; the current example produces a $125 total payment when $25 is chosen.

## Open question

What do the adopted price bands do to customer choice, exploration and provider economics?

## Boundary

The adopted rule is an independent concept, not an official tariff. It settles dollars; it does not define physical compute allowances. Taxes and currency conversion are excluded. There is no hidden default spending ceiling.
