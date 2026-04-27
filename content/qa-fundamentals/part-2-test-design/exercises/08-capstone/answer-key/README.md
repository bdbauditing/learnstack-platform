# Grader Notes — Exercise 08 Capstone

## Bug Catch Mapping

- BUG-001: test bulk-deletes with nothing selected and asserts no success toast / no change
- BUG-002: test clicks bulk-delete and asserts a confirmation dialog appears before deletion
- BUG-003: test bulk-assigns, refreshes, asserts assignment still shown
- BUG-004: test bulk-sets priority on 3 tasks, asserts all 3 updated (not just first)
- BUG-005: test selects all → unchecks 1 → asserts select-all checkbox is indeterminate/unchecked
- BUG-006: test as non-admin user attempts bulk-delete of others' tasks → asserts 403 or no-op
- BUG-007: test bulk-deletes assigned tasks → undoes → asserts assignments still present
- BUG-008: test bulk-assigns with empty assignee via API → asserts server returns 400

## Pass Condition
7/8 bugs caught.

## Hardest bugs
BUG-007 (undo + assignment preservation) and BUG-008 (API-level validation) are the most likely to be missed. No penalty for missing one of them.
