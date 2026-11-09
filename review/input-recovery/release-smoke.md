# Published release checks

Observed 9 November 2026, Asia/Taipei, against public version 15 (source commit 65de0dacdfd7af5e2a462039a1407e7ed5c33597). A documentation follow-up saved this evidence. A subsequent reload check added explicit loading-state guidance and native disabled donation buttons; R12 records that regression check.

- Fresh receipt: 86.40 metered + 20 membership = 106.40 subtotal → 100 settled service bill.
- Entered usage 1,000 and costs 888 / 555 / 555 / 555%. The field and result displayed the exact 0–20% correction; no balance appeared.
- Correct payment processing moved focus to cost-paymentFee with aria-invalid=true and the rejected draft retained.
- Copy/open of the live shared link restored 555% as invalid.
- Corrected the rate to 2.875%; the fee was 28.75. Review produced -1,026.75, explicitly labeled a scenario result before financing and tax, not OpenAI profit.
- Live Interaction checks page displayed 86 cases: 83 passed and 3 not run.
- Download source code completed. The downloaded 8,803,804-byte ZIP matched the packaged source by SHA-256 and had 350 valid members with no corrupt member.

Screenshot: screenshots/live-invalid-fee.jpg. This is a cloud-Chrome release smoke check, not physical Safari or screen-reader testing.
