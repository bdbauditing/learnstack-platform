# Exercise 01 — Spec

## Grader config

```yaml
grader: bug-match
submissionFile: requirements-gaps.yaml
options:
  answerKey: answer-key/gaps-expected.yaml
```

## Detailed requirements

1. The submission file is `requirements-gaps.yaml` in the `starter/` directory.
2. The file must contain a `bugs` list with entries using IDs GAP-001 through GAP-010.
3. Each entry must have `id`, `title`, `description`, `severity`, and `priority` filled in (non-empty strings).
4. The grader matches each submitted entry's `title` + `description` against the planted gap's `signatureKeywords`.
5. A gap is counted as "identified" when the keyword match meets or exceeds `keywordThreshold` (0.4 for all gaps).
6. Pass requires at least 7 of the 10 planted gaps to be matched.

## Grader notes

The `bug-match` grader:

1. Parses the learner's `requirements-gaps.yaml`.
2. For each planted gap in `gaps-expected.yaml`, it searches the learner's submissions for a matching entry.
3. Match is determined by: proportion of `signatureKeywords` found in the combined text of the submitted entry's `title` + `description` + `expected` + `actual`.
4. A match at or above `keywordThreshold` (0.4 = at least 40% of the keywords present) counts as a hit.
5. Reports: which gaps were matched, which were missed, total score.
6. Pass if matched ≥ `passThreshold` (7).

Each planted gap has a story ID in its `signatureKeywords` list (e.g. `"us-001"`). This means the learner must reference the specific story to get credit for that gap. Writing a generic "some story has no acceptance criteria" without naming the story will not match.
