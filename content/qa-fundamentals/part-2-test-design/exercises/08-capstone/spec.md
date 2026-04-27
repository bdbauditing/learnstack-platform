# Exercise 08 Spec — Capstone: Bulk Task Operations

## Planted Bugs

| ID | Location | Description |
|----|----------|-------------|
| BUG-001 | bulk/delete | Bulk delete with 0 tasks selected shows success toast but nothing deleted |
| BUG-002 | bulk/delete | Bulk delete doesn't confirm before deleting (no confirmation dialog) |
| BUG-003 | bulk/assign | Assigning to a team member does not persist after page refresh |
| BUG-004 | bulk/priority | Bulk set-priority does not update all selected tasks (first one only) |
| BUG-005 | bulk/select-all | Select-all checkbox does not deselect when individual items unchecked |
| BUG-006 | bulk/permissions | Non-admin users can bulk-delete tasks owned by other users |
| BUG-007 | bulk/undo | Undo after bulk delete restores tasks but removes their assignments |
| BUG-008 | bulk/api | Bulk operations bypass server-side validation (accepts empty assignee) |

## Grader Config
- Grader: test-catches-bug (Playwright)
- Pass threshold: 7/8

## Learning Objective
Learners apply equivalence partitioning, boundary testing, state transitions, and negative testing all at once against a real feature.
