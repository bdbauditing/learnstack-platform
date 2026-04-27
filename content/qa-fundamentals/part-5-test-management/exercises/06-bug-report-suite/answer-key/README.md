# Answer Key — Exercise 05: Bug Report Suite

## Grader config (authoritative)

```yaml
grader: bug-match
submissionFile: bugs.yaml
options:
  answerKey: answer-key/bugs-expected.yaml
```

## Pass threshold

5 of 6 planted bugs correctly identified and reported.

## Grader notes

The `bug-match` grader uses fuzzy matching:

- **Location matching**: case-insensitive substring match. A submission bug whose `location` contains the expected location substring passes the location check.
- **Keyword matching**: each answer-key bug has a `keywords` list. A submission bug matches if at least 50% of the keywords appear anywhere in the submission bug's `title`, `expected`, or `actual` fields (case-insensitive).
- **Assignment**: each submission bug is matched to the best-scoring answer-key bug. Each answer-key bug can only be matched once — no double-counting.

## Planted bugs (staff only)

| ID | Location | Key keywords | Severity |
|----|----------|-------------|----------|
| BUG-001 | task-form / due-date input | due date, past, warning, validation | Medium |
| BUG-002 | task-form / file attachment | attachment, upload, 10mb, silent, fail | High |
| BUG-003 | notifications / task assignment | email, notification, assign, not sent | High |
| BUG-004 | search / task search | search, private, other user, leak | Critical |
| BUG-005 | task-list / bulk operations | bulk, delete, completed, checkbox, unintended | Medium |
| BUG-006 | account settings / api keys | api key, re-authentication, sensitive, bypass | Critical |

## Common learner mistakes

- Filing generic bug reports that do not mention the specific broken behavior (e.g., "search is broken" without mentioning that private tasks from other users are visible).
- Confusing severity and priority — BUG-004 and BUG-006 are Critical severity (data leak, security bypass) regardless of how "often" they might occur.
- Incomplete `steps` — a single `navigate` step is not enough for bugs that require specific actions to trigger.
- Using invalid YAML (unquoted colons in strings, wrong indentation for list items under `steps`).
