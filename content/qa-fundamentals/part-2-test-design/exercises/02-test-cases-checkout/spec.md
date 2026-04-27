# Exercise 02 Spec — Test Cases for Checkout

## Planted Bugs

| ID | Location | Description |
|----|----------|-------------|
| BUG-001 | checkout/cart-guard | Checkout proceeds even with empty cart |
| BUG-002 | checkout/card | Card number field accepts non-numeric characters |
| BUG-003 | checkout/total | Order total includes removed coupon discount after page refresh |
| BUG-004 | checkout/address | Address form submits with empty "Street" field |
| BUG-005 | checkout/expiry | Expired card (01/20) accepted without validation error |
| BUG-006 | checkout/confirmation | Confirmation page shows but order not saved in database (verified via GET /api/orders) |

## Grader Config
- Grader: test-catches-bug (Playwright)
- Pass threshold: 5/6
