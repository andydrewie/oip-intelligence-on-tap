# Personal scaling beyond $500 — superseded implementation

The separate continuous-benefit curve from the earlier build was not the author's intended model. It is no longer an active calculator or a recommendation.

Andrew adopted one exact settlement formula for all billing views. Above $500, the equation is:

$$
B(S)=50\left\lfloor\frac{S+25}{50}\right\rfloor,\qquad S>500.
$$

Here, S already includes the $20 base. $524.99 settles to $500; $525 settles to $550. The bands continue upward in $50 steps, corresponding to 5× increments under the concept's stated anchors.

Read [the typeset equation and examples](/archive/pricing-formula.html), or /archive/pricing-formula.md for the complete piecewise rule, table, units and provenance. Open /#pricing-formula for the linked interactive table and receipt.

The original Pasta Board source remains unchanged. Historical implementation tests are retained in the downloadable source archive; they do not validate the adopted policy.
