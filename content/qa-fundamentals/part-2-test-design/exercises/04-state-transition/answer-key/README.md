# Grader Notes — Exercise 04

**Grader:** `yaml-field-match`
**Answer key:** `transitions-expected.yaml` (36 cells + `pass_threshold: 33`)

The grader matches by composite key `(current_state, event)` and compares `next_state` case-insensitively. A missing cell is treated as incorrect.

**Output includes per-cell detail** — learners see the exact key for every wrong transition:
```
✗ submitted + reject  submitted="cancelled"  expected="draft"
✗ approved + cancel   submitted="cancelled"  expected="invalid"
```

**Pass:** ≥33 of 36 cells correct (90%).

**Most commonly missed transitions:**
- `submitted + reject → draft` (learners guess "cancelled" — it goes back for revision, not cancels)
- `approved + cancel → invalid` (approved orders cannot be cancelled in this model)
- `submitted + submit → invalid` (already submitted, cannot be re-submitted)
