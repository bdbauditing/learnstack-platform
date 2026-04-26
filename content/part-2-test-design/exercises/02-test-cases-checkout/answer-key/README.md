# Grader Notes — Exercise 02

## Bug Catch Mapping

- BUG-001: test navigates to checkout with empty cart and asserts redirect or error
- BUG-002: test types letters in card number field and asserts validation error
- BUG-003: test applies coupon, removes it, refreshes, asserts original total shown
- BUG-004: test leaves Street field empty and attempts to proceed; asserts error shown
- BUG-005: test enters expired card (01/20) and asserts validation error
- BUG-006: test completes checkout then calls GET /api/orders and asserts order is present

## Pass Condition
5/6.

## Note on BUG-006
This requires an API assertion in addition to a UI step, which is advanced. Accept any test case that checks the order is actually persisted (e.g. assert order number appears in order history page after confirmation).
