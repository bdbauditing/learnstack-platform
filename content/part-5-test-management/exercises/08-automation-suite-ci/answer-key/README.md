# Answer Key — Exercise 07: Automation Suite CI

## Grader config (authoritative)

```yaml
grader: script-runs
submissionFile: .github/workflows/qa-suite.yml
options:
  scriptType: github-actions-validate
  expectedExitCode: 0
  requiredOutputPatterns:
    - "valid"
```

## Grader notes

- The grader runs the GitHub Actions YAML schema validator against the submission file.
- A pass requires: exit code 0 AND the word `valid` in stdout.
- The validator checks schema conformance — not runtime correctness. A structurally valid file that would fail at runtime still passes the grader.
- If a learner submits the skeleton file with TODO placeholders, the validator will fail because `TODO` is not a valid branch name pattern and the step definitions are missing.

## Reference solution (staff only)

```yaml
name: QA Suite — TaskForge 2.0

on:
  push:
    branches:
      - main
      - release/*

jobs:
  playwright-tests:
    name: Playwright Test Suite
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload Playwright report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

      - name: Notify on failure
        if: failure()
        run: echo "QA suite failed — review the playwright-report artifact for details."
```

## Common learner mistakes

- Leaving `TODO` branch names in the trigger — the validator rejects these.
- Missing `if: always()` on the artifact upload step — the grader does not check this specifically, but it is a quality issue (report not available when tests fail).
- Confusing `if: always()` with `if: failure()` — one runs always, one runs only on failure.
- Using `npm install` instead of `npm ci` — not a grader failure, but a CI best practice issue.
- Forgetting `--with-deps` on the Playwright install — tests will fail on Linux without system deps, but the YAML validator does not catch this.
