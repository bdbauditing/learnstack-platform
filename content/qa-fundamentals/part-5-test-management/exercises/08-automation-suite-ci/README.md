# Exercise 08 — Automation Suite CI

**Technique focus:** CI Integration + Test Automation

**Time:** 45 min

## Mission

A test suite that only runs on a tester's laptop is not a safety net. Wire the TaskForge 2.0 Playwright test suite to GitHub Actions so it runs automatically on every push to the `main` and `release/*` branches.

## What the workflow must do

1. Trigger on push to `main` and `release/*` branches.
2. Install Node.js and dependencies.
3. Install Playwright browsers.
4. Run the full Playwright test suite.
5. Upload the HTML test report as a workflow artifact.
6. Notify on failure — a simple `echo` step is sufficient ("Notify on failure" step runs only when tests fail).

## The workflow file

Edit `starter/.github/workflows/qa-suite.yml`. The skeleton already has the trigger and job defined — you add the steps.

## Deliverable

A completed `starter/.github/workflows/qa-suite.yml` that passes the GitHub Actions YAML validator.

## How to verify locally

Install `@action-validator/cli` and run:

```bash
npx action-validator starter/.github/workflows/qa-suite.yml
```

Or push the file to a real GitHub repository and check the Actions tab.

## Pass condition

- The YAML file is syntactically valid.
- The grader's validator reports `valid`.
- The workflow contains the required trigger branches, Playwright install step, test run step, artifact upload step, and a failure notification step.
