# Exercise 05 — Spec

## Grader config

```yaml
grader: bug-match
submissionFile: exploratory-bugs.yaml
options:
  answerKey: answer-key/exploratory-expected.yaml
```

Note: The `session-charter.md` is reviewed manually but is not the primary grader. The primary grader is bug-match on `exploratory-bugs.yaml`.

## Detailed requirements

1. The primary submission file is `exploratory-bugs.yaml` in the `starter/` directory.
2. The file must contain a `bugs` list with at least 12 entries filled in (non-empty `title` and non-empty `actual`).
3. The grader matches each submitted bug's `title` + `actual` + `expected` against the planted bug's `signatureKeywords`.
4. A match fires when ≥ 40% of a planted bug's `signatureKeywords` appear in the learner's submitted entry.
5. Pass requires at least 12 of the 12 planted bugs in `exploratory-expected.yaml` to be matched.
6. `session-charter.md` must also be submitted and will be reviewed for completeness manually.

## Secondary: session-charter.md

The session charter is reviewed manually against these criteria:

- `## Charter` section present with ≥ 20 words describing the mission and area.
- `## Session Report` section present with ≥ 30 words of actual observations.
- `### Notes and observations` present with ≥ 20 words of specific findings.
- `### Coverage summary` present with ≥ 15 words.

## Grader notes

The `bug-match` grader on `exploratory-bugs.yaml`:

1. Parses all `bugs` entries. Skips entries where `title` is empty.
2. For each of the 12 planted bugs in `exploratory-expected.yaml`, finds the best-matching learner entry.
3. Match = proportion of `signatureKeywords` found across the combined text of `title` + `actual` + `expected` + any `description` field.
4. Reports: bugs matched, bugs missed, total score.
5. Pass if matched ≥ 12 (`passThreshold` in `exploratory-expected.yaml`).

Because exploratory testing is free-form, the keyword threshold (0.4) is forgiving — the learner does not need to use exact vocabulary, just enough relevant terms to identify what they found.
