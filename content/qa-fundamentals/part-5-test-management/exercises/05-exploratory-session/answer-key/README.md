# Answer Key — Exercise 05: Exploratory Testing Session

## Grader config (authoritative)

```yaml
grader: bug-match
submissionFile: exploratory-bugs.yaml
options:
  answerKey: answer-key/exploratory-expected.yaml
```

Note: `session-charter.md` is reviewed manually and is not the primary grader target.

## Grader notes

- Pass = at least 12 of the 12 planted bugs in `exploratory-expected.yaml` matched.
- The `bug-match` grader matches the learner's submitted `title` + `actual` + `expected` against each planted bug's `signatureKeywords`.
- A match fires when ≥ 40% of the `signatureKeywords` appear in the learner's text (case-insensitive).
- `passThreshold: 12` is set in `exploratory-expected.yaml`.

## The 12 planted exploratory bugs

These are a subset of the 30 bugs in Ex04, selected because they are most likely to surface during manual exploratory testing (as opposed to automated or API-level testing):

| ID | Location | Description |
|----|----------|------------|
| BUG-003 | task-form / due-date | Past due date accepted without warning |
| BUG-005 | task-form / file attachment | .exe/.bat file extensions accepted |
| BUG-008 | task-form / tags | Duplicate tags added silently |
| BUG-009 | dashboard / counters | Completed-count not updated on task completion |
| BUG-011 | task-detail / project selector | Tags wiped when task moved between projects |
| BUG-012 | task-list / bulk operations | Bulk "done" update leaves tasks in active filter |
| BUG-014 | task-detail / reopen | Due date reset to null on task reopen |
| BUG-015 | shared-view | Deleted task still visible in shared views |
| BUG-024 | task-list / create button | Create button has no accessible name / aria-label |
| BUG-025 | task-list / status indicator | Status shown by colour only — no text label |
| BUG-026 | task-detail / modal | Modal does not trap focus |
| BUG-028 | GET /tasks/:id | IDOR — user can access another user's private task |

## Session charter review criteria (manual)

A passing session charter has:

- Charter with mission statement and named area (≥ 20 words)
- Session Report with real observations, not just template text (≥ 30 words)
- Notes and observations with at least 3 specific findings (≥ 20 words)
- Coverage summary naming what was and was not explored (≥ 15 words)

## Common learner mistakes

- Documenting bugs with only generic titles like "bug found" — not enough keywords to match planted bugs.
- Filling in `actual` as "it broke" with no context — match requires specific terminology.
- Submitting only a session charter with no `exploratory-bugs.yaml` — the charter alone does not pass the grader.
- Fewer than 12 stubs filled — the grader skips empty entries.
