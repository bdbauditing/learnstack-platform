# Answer Key — Exercise 04: Test Cases That Catch Planted Bugs

## Grader config (authoritative)

```yaml
grader: test-catches-bug
submissionFile: test-cases.yaml
options:
  answerKey: answer-key/planted-bugs.yaml
  minSubmittedCases: 40
  minCaughtBugs: 25
```

## How test-catches-bug works

1. Parses the learner's `test-cases.yaml`.
2. Rejects outright if fewer than 40 test cases are present.
3. For each test case, converts the `steps` list to a Playwright script using the action→Playwright mapping in spec.md.
4. Runs each Playwright script against the buggy TaskForge 2.0 staging app.
5. When a script's assertion fails, the grader checks which planted bug caused it by matching the test case's `title` + `description` + `expected_result` against each bug's `signatureKeywords`. A match at or above `keywordThreshold` marks that bug as caught.
6. Reports: total cases submitted, number of bugs caught (out of 30), list of caught bug IDs, list of missed bug IDs.
7. Pass if caught ≥ 25.

## The 30 planted bugs

### UI Validation (8)
- BUG-001 — empty task title accepted
- BUG-002 — title > 200 characters accepted
- BUG-003 — past due date accepted without warning
- BUG-004 — deprecated "archived" priority option present
- BUG-005 — .exe/.bat file attachments accepted
- BUG-006 — HTML not escaped in task title (XSS)
- BUG-007 — SQL injection not sanitised in search
- BUG-008 — duplicate tags added silently

### Workflow (7)
- BUG-009 — dashboard completed-count not updated on task completion
- BUG-010 — no notification on self-assignment
- BUG-011 — tags wiped when task moved between projects
- BUG-012 — bulk status update leaves tasks in active filter
- BUG-013 — API-created tasks need manual refresh to appear in UI
- BUG-014 — due date reset to null on task reopen
- BUG-015 — deleted task still visible in shared views

### API-Layer (8)
- BUG-016 — POST /tasks returns 200 instead of 201
- BUG-017 — GET /tasks/:id returns 200 for missing task (should be 404)
- BUG-018 — PATCH /tasks/:id accepts empty title
- BUG-019 — DELETE /tasks/:id returns 200 for already-deleted task (should be 404)
- BUG-020 — GET /tasks?status=completed ignores the filter
- BUG-021 — POST /auth/login returns 200 for invalid credentials (should be 401)
- BUG-022 — old token not invalidated after refresh
- BUG-023 — password hash included in task API response

### Accessibility (4)
- BUG-024 — create button has no accessible name / aria-label
- BUG-025 — status shown by colour only, no text label
- BUG-026 — modal does not trap focus
- BUG-027 — form validation errors not announced to screen readers

### Security (3)
- BUG-028 — IDOR: user can read another user's private task by ID
- BUG-029 — session not invalidated on logout
- BUG-030 — password reset link is not single-use

## Common failure pattern

Learners who write only happy-path test cases (TC-001 style: "do the thing correctly, assert it worked") typically catch 8–12 bugs — the workflow and API status-code bugs that fire even on valid inputs.

The hard-to-catch bugs (1–8, 24–30) require:
- Negative test cases (empty/invalid/boundary inputs)
- Explicit assertions about what should NOT be present (no error message when there should be one)
- API-level assertions checking response status codes and body contents
- Accessibility assertions (aria-label presence, role=alert)
- Multi-step state tests (complete a task → check the counter; reopen a task → check the due date)

A learner who hits the 25-bug threshold has demonstrated genuine breadth of test case design.
