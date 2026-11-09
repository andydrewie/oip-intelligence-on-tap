# Independent input-contract reconnaissance

The audit found three additional defect families beyond the originally reported invalid-fee state and early percentage rounding. The implementation owner corrected them, and the independent regression file now passes. The adopted commercial settlement rule was preserved.

Scope: numerical inputs, URL parsing and restoration, monetary rounding, costs marked supplied, finite calculations, and shared receipt/worksheet contracts. Source: the current checkout and isolated Node reproductions. This report does not claim browser, physical-device, screen-reader or visual verification.

## Confirmed findings

| Finding | Reproduction before correction | Expected | Cause and affected family | Severity |
|---|---|---|---|---|
| Alternate flag spelling revives invalid input as supplied zero | Economics v4: `paymentFee=555&paymentKnown=1.0` restored fee `0`, known `1`, raw draft `0`, without a warning. `01` and `1e0` did the same. Reconfirming could calculate with 0%. | Preserve the rejected input, withhold the balance and request correction. A missing value must remain missing. | Bounds validation interpreted the flag numerically; raw-value preservation compared its text to exactly `1`. All four cost categories shared the branch. | High: creates an unintended financial assumption. |
| Link grammar differed from form grammar | Billing link `use=0x20` restored $32; `0b100` restored $4. | Apply the same decimal-number grammar as the visible control, with explicit fallback feedback. | URL parser used unrestricted `Number(raw)` while the shared validator used decimal syntax. | Moderate: malformed links behave differently from typed input. |
| Half-cent final-money rounding disagreed with display | `cents(2.135)` returned `2.13`, while `money(2.135)` displayed `$2.14`. A 2.135% fee on $100 charged $2.13. A raw $2.135 donation also created inconsistent displayed amounts. | Round the final monetary amount to $2.14, without first rounding the rate. | `Number.EPSILON` is not a general decimal-arithmetic correction. The money helper affected gifts, final fee charges and other money normalization. | Moderate: cent-level arithmetic and display contradiction. |
| Perpetual value overflow | Accepted comparison input `churn=1e-320` produced `ltv=Infinity`, which the UI would render as a currency result. | “No finite estimate”; keep the finite 12-month result available. | Model checked zero churn but did not check whether division yielded a finite result. | Low: unusual but valid numerical input. |

The route audit also confirmed that every economics target needs to restore the same scenario contract. The main owner supplied the route-registry correction. Tests cover `economics`, `cost-scenario`, `public-benchmarks`, `economics-loyalty`, `economics-method` and `economics-comparison`, including their linked receipt and invalid raw drafts.

## Executed checks

`node --test tests/recon-contract.test.mjs` passes all eight independent test cases:

1. Alternate supplied-flag spellings cannot turn a rejected value into a known zero, across all cost categories.
2. Supplied flags without a cost value do not manufacture zero.
3. Hexadecimal, binary and octal URL numbers are rejected consistently with visible input grammar.
4. Invalid cost drafts survive copy/reload and remain distinct from empty fields.
5. Final-money half-cent cases agree with the currency display and receipt total.
6. Full percentage precision is retained until final-charge rounding: 2.875% of $1,000 is $28.75; 2.135% of $100 is $2.14.
7. All economics deep-link targets restore worksheet, receipt, donation and invalid states consistently.
8. Accepted near-zero churn never exposes an infinite perpetual currency result.

An additional isolated boundary sweep checked 41 advanced-comparison input combinations and 12 primary cost combinations at their declared minimum, midpoint and maximum. Every displayed finite-horizon result remained finite. The invalid-fee probes `empty`, `-1`, `Infinity`, `NaN`, `1e1000`, `0x10` and `555` all withheld payment and balance calculation. These are arithmetic/parser checks, not extra browser tests.

## Rate and monetary boundaries

Payment processing and the recalculated loyalty payment are monetary percentage products and need exact decimal multiplication followed by one final cent rounding. Departure probability and retention reduction are dimensionless rates: retain their precision; do not run them through a currency helper. The advanced comparison deliberately retains intermediate analytical precision and formats presentation separately. Its assumptions do not establish real provider costs.

The canonical `B(S)` thresholds, named-tier midpoint behavior and upward half-steps above $500 were not revised by this work. The existing settlement suite remains the authority for that adopted commercial rule.

## Prevention rule

Treat input state and arithmetic representation as explicit contracts. A field is empty, invalid or valid; numeric zero is a fourth *value*, not a replacement for the first two states. Use the same grammar and bounds in the control, URL parser and calculation boundary. Test the complete serialization/restoration path as well as arithmetic, especially where flags and raw values can disagree. Review rates and money as different types, and test decimal half-cent boundaries instead of relying solely on integer examples.

Passing this file establishes the inspected calculation and restoration behavior. It does not establish that a user can find an error, recover with a keyboard, or understand the layout. Those require the separate interface reconnaissance and browser verification.
