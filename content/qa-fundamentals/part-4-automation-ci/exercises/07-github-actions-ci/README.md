# Exercise 07 — GitHub Actions CI

## Mission

Write a GitHub Actions workflow that runs on every push to `main` and:
1. Checks out the code
2. Sets up Node.js 20
3. Installs dependencies with `npm ci`
4. Runs `npm test`

The workflow file lives at `.github/workflows/ci.yml`.

## Technique

- GitHub Actions workflows are YAML files
- `on: push: branches: [main]` — trigger on push to main
- `jobs: test: runs-on: ubuntu-latest` — use a fresh Ubuntu VM
- `steps:` — a list of things to do in order
- `uses: actions/checkout@v4` — clone the repo (must be first step)
- `uses: actions/setup-node@v4` — install Node.js
- `run: npm ci` — install exact package versions from `package-lock.json`
- `run: npm test` — run the test suite

## Deliverable

A completed `.github/workflows/ci.yml` with all four steps filled in.

## How to validate locally

```bash
# The grader uses a YAML validator. You can check syntax locally:
npx js-yaml .github/workflows/ci.yml
# If it prints nothing, the YAML is valid.
```

Or push to a GitHub repo and watch the Actions tab.

## Pass condition

- The YAML file is syntactically valid.
- The workflow has at least one job with at least two steps.
- The grader validates the YAML and checks for required structure.
