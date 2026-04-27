# Exercise 05 — Spec

## Grader config

```yaml
grader: bug-match
submissionFile: bugs.yaml
options:
  answerKey: answer-key/bugs-expected.yaml
```

## Detailed requirements

1. The submission file is `bugs.yaml` in the `starter/` directory.
2. The file must be valid YAML conforming to the `BugReportFileSchema` from `packages/schemas`.
3. The file must contain at least 5 bug entries (the schema enforces `bugs: []` with `min(1)`; the grader enforces min 5 matches).
4. Each bug entry must have all required fields: `title`, `location`, `severity`, `priority`, `environment`, `steps`, `expected`, `actual`.
5. `severity` must be one of: `Critical`, `High`, `Medium`, `Low`.
6. `priority` must be one of: `High`, `Medium`, `Low`.
7. `environment.viewport` must match the pattern `\d+x\d+` (e.g., `1440x900`).
8. `environment.url` must be a valid URL (TODO placeholders are acceptable for the hostname).
9. `steps` must be a non-empty array of step objects conforming to `StepSchema`.
10. `expected` and `actual` must each be at least 10 characters.

## Pass threshold

5 of 6 planted bugs correctly identified. The `bug-match` grader compares location strings and keyword matches against the answer key.

## Grader notes

The `bug-match` grader uses fuzzy matching on `location` and keyword presence in `title`, `expected`, and `actual`. An exact location string is not required — the grader accepts any location string that contains the expected substring (case-insensitive).

Keyword matching: each answer-key bug has a keyword list. A submission bug matches an answer-key bug if the location matches AND at least 50% of the keywords appear somewhere in the submission bug's `title`, `expected`, or `actual` fields.

The grader assigns each submission bug to the best-matching answer-key bug. Each answer-key bug can only be matched once (no double-counting).
