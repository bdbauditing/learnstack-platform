# Answer Key — Exercise 09: Release Sign-Off

## Grader config (authoritative — primary)

```yaml
grader: script-runs
submissionFile: validate-metrics.js
options:
  scriptType: node
  expectedExitCode: 0
  requiredOutputPatterns:
    - "PASS"
```

## Secondary grader configs (reviewed manually)

```yaml
# Secondary grader (regression-suite.yaml — reviewed manually for coverage rationale):
# grader: structured-doc
# submissionFile: regression-suite.yaml

# Secondary grader (sign-off.md — reviewed manually):
# grader: structured-doc
# submissionFile: sign-off.md
```

## Grader notes

- Primary pass = `node validate-metrics.js` exits 0 and stdout contains "PASS".
- The script validates `metrics.yaml` with ±15% tolerance on all 5 metrics.
- The learner edits `metrics.yaml` — the script is provided and should not be modified.
- `sign-off.md` and `regression-suite.yaml` are reviewed manually by staff.

## Expected metric values

| Metric | Expected value | Tolerance window |
|--------|---------------|-----------------|
| defect_density | 1.5 | 1.275 – 1.725 |
| pass_rate_pct | 86.7 | 73.7 – 99.7 |
| escape_rate_pct | 11.1 | 9.4 – 12.8 |
| avg_bug_age_days | 10.7 | 9.1 – 12.3 |
| mttr_days | 10.7 | 9.1 – 12.3 |

### Calculation workings

- **defect_density** = 18 / 12 = 1.5
- **pass_rate_pct** = 39 / 45 × 100 = 86.666... ≈ 86.7
- **escape_rate_pct** = 2 / 18 × 100 = 11.111... ≈ 11.1
- **avg_bug_age_days** = mean([1, 2, 3, 5, 7, 8, 12, 14, 21, 25, 30, 2, 4, 6, 8, 10, 15, 20]) = 193 / 18 = 10.722... ≈ 10.7
- **mttr_days** = same as avg_bug_age = 10.7

## Sign-off.md review criteria (secondary — manual)

A passing sign-off.md has all 6 sections with substantive content:

- **Summary of Testing** — mentions test types run (smoke, regression, exploratory, API, automation)
- **Test Results** — uses the numbers from the situation (52 planned, 50 executed, 47 passed, 3 failed)
- **Open Defects** — lists all 3 defects with severity and risk
- **Risk Assessment** — addresses BUG-006 (Critical, security) with appropriate weight
- **Recommendation** — explicit GO or NO-GO (conditional GO is correct for this situation)
- **Release Conditions** — lists gates including BUG-006 verification before deploy

## regression-suite.yaml review criteria (secondary — manual)

A passing regression-suite.yaml:

- Lists exactly 15 TC-IDs in `smoke_suite.selected_tests` — all IDs non-empty.
- Lists exactly 5 TC-IDs in `regression_additions.selected_tests` — all IDs non-empty.
- `smoke_suite.rationale` explains why these tests cover the critical paths.
- `regression_additions.rationale` explains what additional coverage the extra tests provide.
- Smoke suite should favour authentication, task creation, and core workflow tests.
- Regression additions should favour boundary/edge-case and integration tests.

## Common learner mistakes

- Leaving `null` in one or more metrics fields — the script exits 1 for any null.
- Expressing rates as decimals instead of percentages (0.867 instead of 86.7) — will fail the tolerance check.
- Rounding too aggressively (e.g. 11 instead of 11.1) — still within ±15% so usually passes, but instruct learners to round to 1 decimal.
- Not running `node validate-metrics.js` locally before pushing — the script output shows which fields are wrong.
- Empty rationale fields in regression-suite.yaml — not caught by the primary grader but flagged in manual review.
