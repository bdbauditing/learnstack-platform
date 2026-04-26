# Exercise 02 — Test Cases for Checkout

**Technique focus:** Decision Tables + Equivalence Partitioning

**Time:** ~35 minutes
**Grader:** test-catches-bug (Playwright)
**Pass threshold:** catch 5 out of 6 planted bugs

## Your mission

Write test cases for a checkout flow. The checkout has multi-step logic (cart → address → payment → confirmation), which means more decision paths.

## The buggy app

**TODO: actual buggy app URL** — the checkout flow has 6 planted bugs.

## What to test

Apply decision table thinking:
- Checkout with items in cart (happy path)
- Checkout with empty cart
- Invalid card number format
- Expired card
- Billing address validation (required fields)
- Coupon code (valid, invalid, already-used)
- Order total calculation
- Confirmation email trigger

## Deliverable

`starter/test-cases.yaml` — test cases covering the checkout flow. Aim for 10+ cases.

**Pass: catch 5/6 bugs.**
