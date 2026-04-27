# Exercise 05 — Regression Suite Selection

**Technique focus:** Risk-Based Test Selection

**Time:** ~25 minutes
**Grader:** classification-match
**Pass threshold:** 8/10 selected tests match expected

## Your mission

A sprint just shipped changes to two areas of TaskForge:

- **Task creation:** Added a file attachment field and rewrote title validation
- **Billing page:** Seat count controls rewritten; promo code logic changed

You have 30 test cases in the full suite (`starter/all-tests.yaml`). Select the **10 most important ones for regression** given what changed.

## How to think about it

Good regression selection targets:
1. Tests that directly exercise what changed
2. Tests for features that share code with what changed (same component, same API)
3. Tests for high-risk user paths that a regression would break visibly

Deprioritise tests for unrelated stable features.

## Deliverable

`starter/regression-selection.yaml` — list the IDs of your 10 selected tests in priority order (highest risk first).
