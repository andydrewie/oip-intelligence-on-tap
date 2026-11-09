# Adopted pricing formula

Status: exact rule adopted by Andrew for this independent concept on 2026-11-08. Not an official OpenAI tariff.

M is the calculated metered charge in USD, excluding the $20 base. S = 20 + M. Foundation donations follow settlement.

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

The +25 is half a $50 step. Floor rounds down to a whole number. Named-tier midpoint ties settle lower; above $500 they settle upward. $524.99 settles to $500; $525 settles to $550.

| Calculated total S | Tier adjustment | Settled B(S) |
| ---: | ---: | ---: |
| $106.40 | −$6.40 | $100.00 |
| $147.83 | −$47.83 | $100.00 |
| $153.27 | +$46.73 | $200.00 |
| $237.68 | −$37.68 | $200.00 |
| $349.82 | −$149.82 | $200.00 |
| $350.18 | +$149.82 | $500.00 |
| $524.83 | −$24.83 | $500.00 |
| $525.17 | +$24.83 | $550.00 |
| $567.94 | −$17.94 | $550.00 |

The screenshot input M=585.25 means S=605.25 and B(S)=600. An optional $5 Foundation donation then makes the total payment $605.

Author-provided concept anchors: 200 USD = 20x; 500 USD = 50x; continuation of 50 USD per 5x. This settlement formula does not specify the underlying compute meter or verify official entitlements.

Exact rule for this independent concept, not an official price or a claim of proven economics. No permanent $500 cap, hidden $200 ceiling, discretionary percent discount or tax. Both upward and downward settlement are explicit. Foundation donations remain separate from commercial revenue. No automatic charitable deduction or verified collection channel. Account-splitting incentives remain a commercial question.

## Provenance

Author adopted the formula in follow-up discussion after Pasta Board. The historical source and original 106.40 -> 100 example remain unchanged. The prior capped round-down implementation and separate continuous-benefit curve have been superseded. Their tests are historical review evidence, not validation of this rule. No original source paragraphs were edited.

Interactive: /#pricing-formula
Machine-readable: /archive/models.json
Implementation: lib/model.mjs in /source-code.zip
