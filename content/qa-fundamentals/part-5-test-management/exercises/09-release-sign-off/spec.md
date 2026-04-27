# Exercise 09 — Spec

## Grader config (primary)

```yaml
grader: script-runs
submissionFile: validate-metrics.js
options:
  scriptType: node
  expectedExitCode: 0
  requiredOutputPatterns:
    - "PASS"
```

## Secondary grader configs (reviewed manually — not the primary grader)

```yaml
# Secondary grader (regression-suite.yaml — reviewed manually for coverage rationale):
# grader: structured-doc
# submissionFile: regression-suite.yaml

# Secondary grader (sign-off.md — reviewed manually):
# grader: structured-doc
# submissionFile: sign-off.md
```

## Detailed requirements

1. The primary submission is `validate-metrics.js` in the `starter/` directory. The grader runs `node validate-metrics.js` from the `starter/` directory and checks that it exits with code 0 and outputs "PASS".
2. `validate-metrics.js` is provided — the learner edits `metrics.yaml`, not the script.
3. `metrics.yaml` must have all 5 metric fields filled in with numeric values (not null).
4. The script accepts ±15% tolerance on each value.
5. `sign-off.md` must also be submitted and will be reviewed for all 6 sections (Summary of Testing, Test Results, Open Defects, Risk Assessment, Recommendation, Release Conditions).
6. `regression-suite.yaml` must also be submitted with 15 smoke suite tests and 5 regression additions selected, each with a rationale.

## Expected metric values

| Metric | Expected | Calculation |
|--------|----------|-------------|
| defect_density | 1.5 | 18 defects / 12 story points |
| pass_rate_pct | 86.7 | 39 / 45 × 100 |
| escape_rate_pct | 11.1 | 2 / 18 × 100 |
| avg_bug_age_days | 10.7 | mean of [1,2,3,5,7,8,12,14,21,25,30,2,4,6,8,10,15,20] |
| mttr_days | 10.7 | same as avg_bug_age |

## Grader notes

The `script-runs` grader:

1. Copies the `starter/` directory into a sandbox.
2. Runs `node validate-metrics.js` from that directory.
3. Checks exit code is 0.
4. Checks stdout contains "PASS".
5. Reports PASS or FAIL with the script's stdout for learner feedback.

The script uses `js-yaml` — the grader sandbox must have it installed, or the grader must inject it. If the learner does not have `js-yaml` available, the script prints an install hint and exits 1.

The `sign-off.md` secondary check uses the same structured-doc rubric as the previous version of this exercise (5 of 6 sections graded, same keyword lists). Staff should review both deliverables for completeness before marking the exercise fully passed.
