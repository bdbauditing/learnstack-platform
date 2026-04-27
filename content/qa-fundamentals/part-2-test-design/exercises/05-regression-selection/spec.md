# Exercise 05 Spec — Regression Suite Selection

## The 30 Test Cases (provided to learner in starter/all-tests.yaml)

TC-001: Login with valid credentials
TC-002: Login with invalid password
TC-003: Registration happy path
TC-004: Registration with duplicate email
TC-005: Checkout - add item to cart
TC-006: Checkout - apply valid coupon
TC-007: Checkout - apply invalid coupon
TC-008: Checkout - card number validation
TC-009: Checkout - expired card rejection
TC-010: Checkout - empty cart guard
TC-011: Checkout - order confirmation received
TC-012: Profile - update display name
TC-013: Profile - upload avatar (new)
TC-014: Profile - change email with re-verification
TC-015: Profile - change password
TC-016: Search - find products by keyword
TC-017: Search - empty results state
TC-018: Cart - increase quantity
TC-019: Cart - remove item
TC-020: Cart - price recalculation
TC-021: Admin - create user
TC-022: Admin - deactivate user
TC-023: Admin - export report
TC-024: Notifications - email on order
TC-025: Notifications - email on password change
TC-026: API - GET /products
TC-027: API - POST /orders
TC-028: API - auth token expiry
TC-029: Dashboard - load time < 3s
TC-030: Accessibility - homepage scan

## Expected 10 for Regression

TC-006, TC-007, TC-008, TC-009, TC-010, TC-011, TC-013, TC-014, TC-001, TC-002

Rationale: directly impacted by changes (coupon, card, checkout), new features (avatar, email re-verification), and login tests as a smoke sanity baseline.

## Grader Config
- Grader: classification-match (tolerance ±1 position in ranked order)
- Pass: 8/10 match expected selection
