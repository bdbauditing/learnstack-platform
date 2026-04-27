# Grader Notes — Exercise 07

**Grader:** `traceability-match`
**Answer key:** `traceability-expected.yaml` (per-requirement and per-defect acceptable sets)

For each requirement and defect, at least one linked test case ID must appear in the `acceptable_test_ids` for that item. This allows multiple valid answers while preventing gaming (e.g., linking every requirement to TC-001).

**Pass:** ALL 12 requirements + ALL 8 defects have at least one valid link.

**Example grader output (failure):**
```
✗ REQ-004  linked=[TC-001]  acceptable=[TC-005, TC-006]
  → Linked [TC-001] — none are in the acceptable set for this item

✗ DEF-003  linked=[]
  → No test cases linked — add at least one
```

**Why per-requirement acceptable sets?**
Without this constraint, a learner can pass by setting `test_cases: [TC-001]` for every requirement — a non-answer that earns full marks. The answer key enforces that each link is domain-correct.

**Acceptable test ID sets by requirement:**

| Req | Acceptable tests |
|-----|-----------------|
| REQ-001 | TC-001 |
| REQ-002 | TC-002, TC-003 |
| REQ-003 | TC-004 |
| REQ-004 | TC-005, TC-006 |
| REQ-005 | TC-007, TC-008 |
| REQ-006 | TC-009, TC-010, TC-011, TC-012 |
| REQ-007 | TC-013, TC-014, TC-015 |
| REQ-008 | TC-016, TC-017, TC-018 |
| REQ-009 | TC-019 |
| REQ-010 | TC-020, TC-021, TC-022 |
| REQ-011 | TC-023, TC-024 |
| REQ-012 | TC-025 |
