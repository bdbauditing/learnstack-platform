# Exercise 03 Spec — Bug Hunt: Shopping Cart

## Planted Bugs

| ID | Location | Description | Severity | Priority |
|----|----------|-------------|----------|----------|
| BUG-001 | cart/quantity | Quantity can be set to 0 via the minus button without removing the item — shows "0 × $19.99 = $19.99" | High | High |
| BUG-002 | cart/total | Total price does not update when quantity is changed — always shows initial load total | High | High |
| BUG-003 | cart/remove | Clicking "Remove" shows a confirmation dialog but the item is deleted before user confirms | Medium | Medium |
| BUG-004 | cart/coupon | Valid coupon code "SAVE10" applies a 100% discount instead of 10% | Critical | High |
| BUG-005 | cart/empty-state | After removing all items, "Proceed to Checkout" button remains visible and clickable | Low | Medium |
| BUG-006 | cart/price | Unit price for items over $100 is displayed without the decimal point (e.g. "$12999" instead of "$129.99") | High | High |

## Grader Config
- Pass threshold: 5 of 6
- Grader: bug-match
