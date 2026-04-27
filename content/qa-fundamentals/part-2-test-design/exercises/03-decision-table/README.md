# Exercise 03 — Decision Table Drill

**Technique focus:** Decision Tables

**Time:** ~25 minutes
**Grader:** structured-doc (CSV validation)
**Pass threshold:** 90% of cells correct

## Your mission

Complete a decision table for a **shipping rules** feature.

The shipping logic is:
- Free shipping if: order ≥ $50 AND customer is a member
- $5 shipping if: order < $50 AND customer is a member
- $10 shipping if: customer is NOT a member (regardless of order value)
- Orders under $10 are rejected (too small to ship)

## Deliverable

`starter/decision-table.csv` — fill in the Action rows (shipping cost + order accepted? columns).

The Condition rows and column headers are already filled in. You complete the bottom two rows.

## Format

```
Condition 1: Order ≥ $50 | Y | Y | N | N
Condition 2: Member      | Y | N | Y | N
Action: Shipping cost    | ? | ? | ? | ?
Action: Order accepted?  | ? | ? | ? | ?
```
