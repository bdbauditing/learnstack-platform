# Exercise 03 — Spec

## Grader config

```yaml
grader: script-runs
submissionFile: validate-csv.js
options:
  scriptType: node
  expectedExitCode: 0
  requiredOutputPatterns:
    - "PASS"
```

## Detailed requirements

1. The learner edits `test-cases.csv` in the `starter/` directory.
2. The CSV must have the header row: `ID,Title,Section,Priority,Type,Steps,Expected Result`
3. The 2 existing example rows (TC-001 and TC-002) must remain in the file.
4. At least 10 additional rows must be added (IDs TC-003 and beyond).
5. No cell in any data row may be empty in the 7 required columns.
6. Priority values must be one of: `High`, `Medium`, `Low`.
7. Type values must be one of: `Functional`, `Regression`, `Smoke`, `Negative`.
8. The grader runs `node validate-csv.js` from the `starter/` directory.
9. The script exits 0 if all checks pass and prints `PASS` somewhere in stdout.
10. The script exits 1 and prints descriptive errors if any check fails.

## Grader notes

The grader runs the `validate-csv.js` script as-is — it is a provided validator, not a learner submission. The learner's only submission is the `test-cases.csv` file. The grader's `submissionFile` points to `validate-csv.js` because that is the file the grader executes, but the file being evaluated is `test-cases.csv`.

If a learner modifies `validate-csv.js`, the grader will still run it — modifications that make validation trivially pass will be caught by staff review.
