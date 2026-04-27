# Exercise 07 Spec — Traceability Matrix

## Requirements (12)

REQ-001: User can log in with valid credentials
REQ-002: Login fails with invalid password
REQ-003: User can register with a new email
REQ-004: Duplicate email registration is rejected
REQ-005: User can add items to cart
REQ-006: Cart total updates on quantity change
REQ-007: Checkout validates payment card
REQ-008: Checkout requires address
REQ-009: Order confirmation email is sent
REQ-010: User can update profile
REQ-011: Search returns relevant results
REQ-012: Admin can manage users

## Defects (8)

DEF-001: Login button disabled with valid credentials (links to TC-001 area)
DEF-002: Duplicate email shows 500 error (links to TC-004 area)
DEF-003: Cart total doesn't update (links to TC-006 area)
DEF-004: Card field accepts letters (links to TC-007 area)
DEF-005: Coupon code applies 100% discount (links to TC-008 area)
DEF-006: Empty cart proceeds to checkout (links to TC-009 area)
DEF-007: Bio doesn't save (links to TC-010 area)
DEF-008: Search returns wrong category (links to TC-011 area)

## Grader Config
- structured-doc: validate traceability.yaml
- Pass: all 12 reqs have ≥1 test, all 8 defects have ≥1 test link
