# Exercise 06 Spec — Smoke Suite Selection

## The 20 Candidates

TC-001: Login with valid credentials
TC-002: Login with invalid password
TC-003: Homepage loads without JS errors
TC-004: Products page renders
TC-005: Add item to cart
TC-006: Checkout happy path
TC-007: Registration happy path
TC-008: Profile page loads
TC-009: Search returns results
TC-010: API health check: GET /api/health → 200
TC-011: Password reset email sent
TC-012: Admin login
TC-013: Accessibility scan
TC-014: 404 page renders
TC-015: Mobile viewport navigation
TC-016: Cart quantity update
TC-017: Order history page loads
TC-018: Notifications preferences page loads
TC-019: Language switcher works
TC-020: Footer links render

## Expected 5

TC-001, TC-003, TC-005, TC-006, TC-010

Rationale: login (can users get in?), homepage health, cart add, checkout (can users buy?), API health (is the backend up?).

## Grader Config
- Pass: 4/5 match expected
