# Economics: what the prototype can and cannot establish

**The arithmetic is reproducible; viability is unproven.** The adopted settlement rule intentionally creates discounts and upward adjustments. A sustainable offer would need workload-specific serving costs, capacity assumptions, customer response and a defined meter. The worksheet helps expose assumptions; it does not estimate OpenAI's profit. Public peer-company financial statements supply accounting context only. Loyalty, gifts and future investment returns should each be evaluated separately, so an attractive ecosystem narrative does not obscure the cost of delivering the underlying service.

---

## The exact adopted rule

Let $S$ be the subtotal in USD: a $20 membership plus nonnegative metered usage. The settled service bill is:

$$
B(S)=\begin{cases}
20 & 20\leq S\leq60\\
100 & 60<S\leq150\\
200 & 150<S\leq350\\
500 & 350<S\leq500\\
50\left\lfloor\frac{S+25}{50}\right\rfloor & S>500
\end{cases}
$$

Comparisons use integer cents. Named-tier midpoint ties settle lower; midpoint ties in the $50 bands above $500 settle upward. A voluntary donation is added after settlement and excluded from service revenue. Taxes and currency conversion are outside the concept.

| Subtotal | Service bill | Consequence |
| ---: | ---: | --- |
| $60.00 | $20.00 | Lower named tier wins the tie |
| $60.01 | $100.00 | One additional cent crosses an $80 boundary |
| $106.40 | $100.00 | $6.40 downward adjustment |
| $350.00 | $200.00 | Lower named tier wins the tie |
| $350.01 | $500.00 | One additional cent crosses a $300 boundary |
| $500.01 | $500.00 | $50 bands continue above the named tiers |
| $525.00 | $550.00 | The midpoint settles upward |
| $605.25 | $600.00 | There is no permanent $500 ceiling |

[Implementation](../lib/model.mjs) · [Settlement tests](../tests/settlement.test.mjs) · [Historical pricing explanation](../public/archive/pricing-formula.md)

These boundaries are intentional in the adopted concept. They may encourage bunching, deferral, account splitting or unexpected bills. Those are hypotheses to test, not observed behavior. A comparison should include the actual bill people can anticipate, not only average revenue. Any future spending controls must be designed around the settlement rule rather than assuming the meter and the final charge are interchangeable.

## Costs remain unknown until entered

The provider worksheet requires explicit monthly allocations for serving infrastructure, development and operations, plus the payment fee assumption. Empty, invalid and explicit zero inputs are distinct. A change in accepted usage requires renewed cost review. The resulting signed balance is before financing, taxes and omitted expenses.

Allocated monthly costs and incremental serving costs answer different questions. Capacity commitments can make apparently low marginal costs misleading; development allocations should not be mistaken for a cost directly caused by one user's next request. Cash capital expenditure is also not interchangeable with a period's recognized expense.

No default allocation is presented as OpenAI's actual cost. The advanced comparison uses fictional service units and explicit scenario assumptions.

## Verified peer context

Anthropic's S-1/A filed on 2 November 2026 reports the following for the nine months ended 30 September 2026. Figures are USD millions; the ratios below are calculations from that filing, rounded to two decimals.

| Item | Reported amount | Per $100 revenue |
| --- | ---: | ---: |
| Revenue | 33,242 | $100.00 |
| Cost of revenue | 4,812 | $14.48 |
| Research and development | 19,240 | $57.88 |
| Sales and marketing | 6,619 | $19.91 |
| General and administrative | 3,831 | $11.52 |
| Total costs and expenses | 34,502 | $103.79 |
| Operating loss | (1,260) | ($3.79) |

[Primary source: consolidated statements and Note 8, Supplemental Operating Expense Information](https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm).

Compute and infrastructure appear across functions; free-user compute is included in sales and marketing. These categories must not be stacked with an extra undifferentiated compute estimate. The ratios describe another company's period accounts, not an OpenAI customer, a pricing recommendation or a serving-cost default.

## Questions for a finance review

- At matched delivered quality, how do workload, capacity and payment costs change across plans?
- How much apparent growth is existing fixed-plan revenue moving to another tariff?
- What happens under adverse demand, heavy users, account splitting and delayed usage near boundaries?
- Are retention and lifetime-value assumptions supported by cohorts, rather than inserted as benefits?
- Can customers forecast and control their final settled bill?
- Can the core service remain viable without counting uncertain donations or venture exits?

A useful next artifact is a sensitivity analysis with independently stated workload and cost assumptions. The current implementation provides mechanics and transparency; it does not supply missing commercial evidence.
