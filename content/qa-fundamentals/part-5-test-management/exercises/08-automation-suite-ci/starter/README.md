# Starter — Exercise 07: Automation Suite CI

Follow these steps in order.

## Step 1 — Open the workflow file

Open `.github/workflows/qa-suite.yml`. You will see a skeleton with 7 TODO comments. Replace each TODO with the correct GitHub Actions syntax.

The file already has:
- The workflow name
- The `on:` trigger (needs branch names filled in)
- The job definition with `runs-on: ubuntu-latest`
- Comment hints for each step

## Step 2 — Fix the trigger

Replace the two `TODO` branch placeholders:

```yaml
on:
  push:
    branches:
      - main
      - release/*
```

The `release/*` pattern is a glob — it matches `release/2.0`, `release/2.1`, etc.

## Step 3 — Add Step 1: Checkout

```yaml
      - name: Checkout repository
        uses: actions/checkout@v4
```

This step checks out your repository code into the runner so subsequent steps can access it.

## Step 4 — Add Step 2: Set up Node.js

```yaml
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
```

## Step 5 — Add Step 3: Install dependencies

```yaml
      - name: Install dependencies
        run: npm ci
```

`npm ci` is preferred over `npm install` in CI because it uses the lockfile and is faster.

## Step 6 — Add Step 4: Install Playwright browsers

```yaml
      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium
```

The `--with-deps` flag also installs the system dependencies that Chromium needs on Linux.

## Step 7 — Add Step 5: Run the Playwright test suite

```yaml
      - name: Run Playwright tests
        run: npx playwright test
```

## Step 8 — Add Step 6: Upload the HTML report

```yaml
      - name: Upload Playwright report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

The `if: always()` condition means this step runs even if the tests failed — you want the report available to diagnose failures.

## Step 9 — Add Step 7: Notify on failure

```yaml
      - name: Notify on failure
        if: failure()
        run: echo "QA suite failed — review the playwright-report artifact for details."
```

In a real project you would replace the `echo` with a Slack notification or a GitHub issue creation. For this exercise, `echo` is sufficient.

## Step 10 — Validate the YAML

Check your YAML file is valid:

```bash
# Option 1: Use npx action-validator (no install required)
npx action-validator .github/workflows/qa-suite.yml

# Option 2: Use the yamllint tool
pip install yamllint
yamllint .github/workflows/qa-suite.yml
```

Or push to a GitHub repository and check the Actions tab for validation errors.

## Common mistakes

- **Indentation** — GitHub Actions YAML is indentation-sensitive. Steps must be indented 6 spaces (2 for `jobs`, 2 for the job name, 2 for `steps`). Use spaces, not tabs.
- **`if: always()` vs `if: failure()`** — `always()` means "run regardless of previous step outcomes". `failure()` means "run only if a previous step failed". The report upload should use `always()`. The notification should use `failure()`.
- **`uses` vs `run`** — `uses` references a pre-built action (e.g., `actions/checkout@v4`). `run` executes a shell command. Never mix them in the same step.
- **Branch glob syntax** — GitHub's branch patterns use `*` for single-path-segment wildcards. `release/*` matches `release/2.0` but not `release/v2/patch`. Use `**` for multi-segment matching.

## Hints

- Copy the exact `uses:` action names from the hints — typos in action names cause the workflow to fail with a cryptic error.
- The `name:` field on each step is optional but highly recommended. It makes the Actions UI readable.
- If you push to a real GitHub repo, the Actions tab shows a real-time log of your workflow running. This is the best way to debug.
