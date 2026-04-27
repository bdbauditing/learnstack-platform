# Exercise 03 — Test Cases (TestRail CSV Format)

**Technique focus:** Test Case Management (TestRail CSV format)

**Time:** 35 min

## Mission

Now that the plan is written, write the test cases. Real test management tools like TestRail import test cases from CSV files. This exercise has you write 10 test cases for the new TaskForge 2.0 features in that exact format.

The CSV already has 2 example rows (login and basic task creation from v1.0). You need to add at least 10 more rows covering the new 2.0 features.

## TestRail CSV format

Each row in the CSV is one test case with these columns:

| Column | Description |
|--------|-------------|
| `ID` | Unique identifier, e.g. `TC-003` |
| `Title` | Short description of what the test verifies |
| `Section` | Feature area, e.g. `Due Dates`, `File Attachments` |
| `Priority` | `High`, `Medium`, or `Low` |
| `Type` | `Functional`, `Regression`, `Smoke`, or `Negative` |
| `Steps` | The test steps, written as numbered actions |
| `Expected Result` | What should happen if the test passes |

## Deliverable

A completed `starter/test-cases.csv` with at least 10 new rows (IDs TC-003 through TC-012 or beyond). The 2 existing example rows must not be removed.

## How to verify

Run the provided validation script from the `starter/` directory:

```bash
node validate-csv.js
```

The script checks:
- All required columns are present
- At least 10 non-example rows exist
- No required column is empty in any row

If valid, it prints `PASS` and exits 0. If not, it prints error details.

## Pass condition

- `node validate-csv.js` exits with code 0.
- The script output includes the word `PASS`.
