# Exercise 02 — Test Cases: Multi-Step Checkout Flow

**Technique focus:** Decision Tables + Equivalence Partitioning

**Time:** ~35 minutes
**Grader:** structured-doc
**Pass threshold:** 8 test cases with all required fields

> **Note:** This exercise uses a hypothetical e-commerce checkout scenario — not TaskForge itself. You don't need to open any app. The goal is to practice writing structured test cases for a multi-step flow with complex decision logic.

## Your mission

You are testing a checkout flow with four steps: **cart → address → payment → confirmation**.

Write test cases using equivalence partitioning and decision table thinking to cover all meaningful combinations. You need at least 8 well-formed test cases.

## What to cover

Apply decision table thinking to these variables:

| Variable | Partitions |
|----------|-----------|
| Cart state | Items in cart / Empty cart |
| Card number | Valid / Invalid format / Expired |
| Billing address | Complete / Missing required field |
| Coupon code | None / Valid / Invalid / Already used |
| Order total | Normal / Zero (empty cart) |

## Deliverable

`starter/test-cases.yaml` — at least 8 test cases. Each must have:
- `id`, `title`, `preconditions`, `steps`, `expected`, `priority`

**Pass: 8+ cases with all required fields filled.**
