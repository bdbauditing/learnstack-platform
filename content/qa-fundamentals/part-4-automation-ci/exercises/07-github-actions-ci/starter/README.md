# Starter — Exercise 07: GitHub Actions CI

Follow these steps in order.

## Step 1 — Open the workflow file

Open `.github/workflows/ci.yml`. You will see a skeleton workflow with four TODO comments in the `steps:` section.

## Step 2 — Add the checkout step

The checkout step clones your repository into the runner's file system. Without it, none of your files are present.

Replace `# TODO: add checkout step` with:

```yaml
      - uses: actions/checkout@v4
```

Indentation matters in YAML. The `- uses:` must be at the same level as the other steps.

## Step 3 — Add the Node.js setup step

This installs Node.js 20 on the runner:

```yaml
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
```

## Step 4 — Add the install step

`npm ci` is like `npm install` but it uses `package-lock.json` exactly — no version drift, faster in CI:

```yaml
      - run: npm ci
```

## Step 5 — Add the test step

```yaml
      - run: npm test
```

## Step 6 — Validate the YAML

```bash
npx js-yaml .github/workflows/ci.yml
```

If this prints nothing (no errors), the YAML is valid. If it prints an error, check your indentation.

## Step 7 — (Optional) Push to GitHub

If you have a GitHub account, push this file to a repo and watch the `Actions` tab. You should see the workflow run on your next push to `main`.

## Complete workflow (reference)

Your finished file should look like this:

```yaml
name: CI

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
```

## Common YAML mistakes

- Wrong indentation — YAML uses spaces, not tabs. Two spaces per level.
- Missing `- ` before `uses:` or `run:` — each step starts with a dash and space.
- Quotes around `'20'` — the node version should be a string, not a number. `20` becomes `20.0` which may not match any version.
