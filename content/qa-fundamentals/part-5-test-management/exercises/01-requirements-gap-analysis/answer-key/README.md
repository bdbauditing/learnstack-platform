# Answer Key — Exercise 01: Requirements Gap Analysis

## Grader config (authoritative)

```yaml
grader: bug-match
submissionFile: requirements-gaps.yaml
options:
  answerKey: answer-key/gaps-expected.yaml
```

## Grader notes

- Pass = at least 7 of the 10 planted gaps matched.
- The `bug-match` grader searches the learner's `title` + `description` + `expected` + `actual` fields for the `signatureKeywords` of each planted gap.
- A match fires when ≥ 40% of a gap's `signatureKeywords` appear in the learner's submitted text for that gap (case-insensitive).
- Each planted gap includes the story ID (e.g. `"us-001"`) as a keyword. The learner must name the story to get credit.
- The grader does NOT require the learner to use stub IDs in order — it scans all submitted entries and picks the best match for each planted gap.
- `passThreshold: 7` is set in `gaps-expected.yaml`.

## The 10 planted gaps

| ID | Story | Gap summary |
|----|-------|------------|
| GAP-001 | US-001 | No acceptance criteria — no security, session timeout, or MFA |
| GAP-002 | US-002 | "fast" is unmeasurable — no SLO or millisecond threshold |
| GAP-003 | US-003 | "productivity" is undefined — no metric or measurement definition |
| GAP-004 | US-004 | "required fields" not listed — no spec of mandatory task fields |
| GAP-005 | US-005/US-006 (file attachments) | No file size limit, no allowed types, no error handling |
| GAP-006 | US-006/US-007 (email notifications) | No delivery SLA, no retry policy, no failure handling |
| GAP-007 | US-007/US-009 (search) | No spec of which fields are searched, no fuzzy match definition |
| GAP-008 | US-008/US-010 (bulk operations) | No undo/rollback, no confirmation prompt requirement |
| GAP-009 | US-008/US-011 (role-based access) | Roles not defined, permissions not listed, assignment not specified |
| GAP-010 | US-010/US-012 (API key management) | No expiration policy, no rotation requirement, no revocation spec |

## Common learner mistakes

- Filling in fewer than 7 stubs and leaving the rest blank — the grader only counts filled entries.
- Writing "this is unclear" without naming the story — the story ID keyword is required for a match.
- Using only generic vocabulary ("acceptance criteria missing") without the specific story content — borderline matches may fall just below the 0.4 threshold.
- Copying the story text verbatim into `actual` without adding their own analysis in `description` — the description field is where the keywords need to appear.
