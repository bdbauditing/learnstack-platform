# Exercise 08 — Capstone: Full Test Suite for a New Feature

**Time:** ~60 minutes
**Grader:** test-catches-bug (Playwright)
**Pass threshold:** catch 7 out of 8 planted bugs

## Your mission

TaskForge Inc. just shipped a **Bulk Task Operations** feature. It lets users:
- Select multiple tasks with checkboxes
- Bulk-delete selected tasks
- Bulk-assign selected tasks to a team member
- Bulk-set priority (High / Medium / Low) on selected tasks

Write a full test suite that would catch bugs in this feature.

## The app

**https://learnstack-taskforge-web.onrender.com** — navigate to the tasks page, enable bulk mode.

## What to test

Apply everything from this part:
- Happy path (select 3, bulk delete → gone)
- Empty selection edge case (bulk action with nothing selected)
- Boundary (select all, select none)
- State transition (bulk assign → undo)
- Decision table (bulk priority × role permissions)
- Negative (no permission to delete → reject)

## Deliverable

`starter/test-cases.yaml` — 12+ test cases.

**Pass: catch 7/8 planted bugs.**
