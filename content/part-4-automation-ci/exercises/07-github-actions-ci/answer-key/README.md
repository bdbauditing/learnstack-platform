# Answer Key — Exercise 07: GitHub Actions CI

## Grader config (authoritative)

```yaml
grader: script-runs
submissionFile: .github/workflows/ci.yml
options:
  scriptType: github-actions-validate
  expectedExitCode: 0
  requiredOutputPatterns:
    - "valid"
```

## Grader notes

- The `github-actions-validate` script parses the YAML with a schema validator (using `@actions/toolkit` or equivalent), checks for required fields, and prints `valid` on success.
- The grader does not actually run the workflow on GitHub — structural validation only.
- Common fail reasons: invalid YAML syntax, missing `actions/checkout`, missing `steps:` entirely, `on:` key missing.

## Reference solution (staff only)

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

## Common mistakes

- Leaving the TODO comments in the file — the grader ignores them, but learners sometimes forget to replace them with actual steps, leaving an empty `steps:` list.
- Using `npm install` instead of `npm ci` — both work, but `npm ci` is the correct practice for CI.
- Not pinning the action version (`uses: actions/checkout` without `@v4`) — this works but is a security risk (unpinned actions can be hijacked).
