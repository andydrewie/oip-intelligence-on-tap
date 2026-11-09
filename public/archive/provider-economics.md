# Provider economics: what the subscription supports

Implementation correction prompted by Andrew on November 8, 2026. This supplements the historical Pasta Board corpus; it does not rewrite that source.

## Start with what the receipt establishes

The settled service bill is simulated commercial revenue, excluding the optional OpenAI Foundation donation. The donation has a separate charitable destination and does not subsidize the modeled service economics. Both the receipt and economics view use the same metered dollar amount and adopted settlement equation. The reference example remains $20 + $86.40 = $106.40, settled to $100. Actual OpenAI costs and profitability cannot be inferred from that charge.

The earlier version subtracted arbitrary $50 serving and $5 other-cost defaults, producing a prominent residual even as usage rose. That gave an unsupported earnings impression. Those defaults and the automatic result have been removed. This is a model and presentation correction, not evidence that actual margins are high or low.

## The relationship and its constraints

Flexible payment, earned loyalty and voluntary generosity have different roles. The business question is whether additional usage and stronger retention can support customer benefits and the full cost of developing and delivering AI. Evaluate the commercial service with Foundation donations excluded.

The original 10–20% remark was Andrew thinking aloud, not an approved margin assumption. The featured target-margin cards and reverse-budget model have been retired. Public evidence now precedes the optional worksheet.

## Public accounting context

Reported: Anthropic S-1/A filed November 2, 2026. Unaudited January–September 2026 figures. Revenue $33.242 billion. Source: Results of Operations, p. 150; Note 8, Supplemental Operating Expense Information, p. F-40.

| Reported expense | USD millions | Calculated per $100 revenue |
| --- | ---: | ---: |
| Cost of revenue | 4,812 | $14.48 |
| Research and development | 19,240 | $57.88 |
| Sales and marketing | 6,619 | $19.91 |
| General and administrative | 3,831 | $11.52 |
| Total operating expenses | 34,502 | $103.79 |
| Operating result (loss) | −1,260 | −$3.79 |

Calculation: each expense ÷ revenue × $100. The operating result is revenue minus operating expenses, before financing, other non-operating items and income taxes. These are company-wide accounting ratios, not one subscriber's bill. The customer-serving category is reported as cost of revenue. Infrastructure is included in customer-serving costs, research and other relevant functions; adding it again would double-count expenses. Free-user compute and channel-partner costs are included in sales and marketing. This comparison does not establish OpenAI's costs or either company's profit per token.

Primary source: https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm

OpenAI announced a confidential S-1 submission: https://openai.com/index/openai-submits-confidential-s-1/

The official materials reviewed November 8, 2026 did not establish a comparable public per-customer cost breakdown for OpenAI. API retail prices are what buyers pay; infrastructure rental prices need model, hardware, throughput and utilization context before a serving-cost estimate is possible.

## Cost coverage before calculation

Infrastructure supports both customer workloads and model development. Development includes research, training, experiments, data, evaluation and staff. Operations include remaining support, security, sales, administration and other operating expenses. Know-how and intellectual property contribute value, but there is no established per-customer price for them here.

Use consistent monthly allocations and count each expense once. A cloud bill may already include electricity, equipment and facilities. Distinguish capital purchases from period expense: do not count an asset purchase and its depreciation as the same monthly cost. Keep serving infrastructure and training infrastructure in their respective allocations. No peer cost ratio or API price fills an input.

| Cost input | Initial state | Scope |
| --- | --- | --- |
| Serving & infrastructure | Unknown | Delivery compute, power, capacity, cloud or equipment costs and related support |
| Research & model development | Unknown | Monthly allocation for research, training, data, evaluation, experiments and people |
| Company operations | Unknown | Remaining operating expenses not counted elsewhere |
| Payment processing | Unknown | Assumed percentage of the settled bill; fixed fees belong in operations |

The four cost inputs start blank. An explicit zero is different from unknown. Raw entries retain three distinct states: not entered, invalid, and valid. Explicit zero is valid. The same validation contract is used by the form, calculation and shared-link reader. Legacy numeric slots and Known flags are derived from validated entries; they cannot turn a rejected entry into zero. All four must be supplied and reviewed for the current metered usage before a scenario balance appears. Editing any cost revokes review. Changing usage makes review stale, even if the bill stays within one price band. Costs never scale automatically with dollars billed.

## Optional cost scenario calculation

Scenario balance = settled bill − serving allocation − development allocation − operations allocation − payment fee.

Payment fee = round to cents(settled bill × fee percentage / 100). Retain percentage precision until the resulting dollar charge is rounded; use decimal multiplication and round half cents away from zero. For example, 2.875% of $1,000 is $28.75; 2.135% of $100 is $2.14. The three dollar-allocation fields accept dollars and cents, up to $1,000,000 each. Payment processing accepts 0–20%, a calculator bound rather than a claim about processor pricing.

This balance is before financing, tax and any omitted allocations. It is not OpenAI profit, company-wide break-even, a verified gross margin, or cash available to spend. Missing, invalid or unreviewed costs produce no balance, not a number based on zero. Negative results remain visible once the scenario is reviewed. The worksheet illustrates the supplied allocations; it cannot discover unknown costs or turn a company-wide result into an individual account margin.

## Optional loyalty sensitivity

A reviewed cost scenario enables a separate loyalty comparison. Its starting assumptions are a $5 monthly discount, 5% monthly departures, zero retention improvement and zero additional acquisition cost. These are sensitivity inputs, not observations. Acquisition cost must exclude amounts already counted in monthly allocations.

12-month scenario balance = monthly balance × sum((1 − q)^t, t = 0…11) − additional acquisition cost. Here q is the monthly departure rate expressed as a decimal. The first month counts; zero departures includes all 12 months.

For loyalty, subtract the capped discount, recompute payment fees and use q × (1 − relative departure reduction / 100). Other monthly allocations remain fixed per retained customer. This is an allocation-based sensitivity exercise, not contribution-margin accounting: shared costs may persist when a customer leaves. Usage growth, cost changes, discounting, financing, taxes, credit losses and investment outcomes are outside the model. No causal retention benefit is established.

## Advanced comparison and continuity

The older five-plan comparison is explicitly fictional and requires a deliberate opening action. It uses invented comparison units, costs and allowances. Its partial contribution excludes research and shared company overhead; none of its results establishes profitability. The advanced settlement row still uses the adopted billing equation. Source model field gp is the balance after modeled delivery costs, not verified gross profit. Zero churn has no finite perpetual contribution-LTV estimate.

Economics scenario links use v5. They retain raw cost drafts, review status and usage basis. A partial scenario stays incomplete; an invalid value stays invalid after copying, opening or refreshing the link. For example: “555% is outside this calculator’s 0–20% range. Correct payment processing to calculate.” The result repeats the reason and offers a button back to the field. Manually collapsing the worksheet retains an invalid-input warning in its summary.

The worksheet share link opens /#cost-scenario. The public-benchmarks, economics-loyalty, economics-method and economics-comparison targets restore the same parameters. Version 4 supplied values that fail validation remain invalid drafts; a supplied flag without a value remains unknown. Versions 1–3 retain the receipt and advanced comparison but clear inadequate provider-cost defaults with an explanation. No old link automatically revives an earnings estimate.

“Clear cost assumptions” clears only the four cost entries and their review. The receipt, donation, loyalty settings and separate comparison assumptions stay intact. Changing only the donation does not invalidate costs. Invalid generic simulator edits are not silently clamped: feedback states the retained result, and blur restores the last valid value with a visible explanation.

Regression example: a $1,000 service bill, $888 serving, $555 development, $555 operations and 3% payment processing leaves −$1,028.00 before financing, tax and omitted allocations. At 555%, no balance is calculated. These are test inputs, not estimates of OpenAI’s costs.


Interactive: /#economics
Cost scenario: /#cost-scenario
Public evidence section: /#public-benchmarks
Machine-readable inputs, formulas and evidence: /archive/provider-economics.json
Complete model specification: /archive/models.json
Original corpus: /archive/source.html
