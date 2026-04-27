# Exercise 07 — Spec

## Grader config

```yaml
grader: script-runs
submissionFile: .github/workflows/ci.yml
options:
  scriptType: github-actions-validate
  expectedExitCode: 0
  requiredOutputPatterns:
    - "valid"
```

## Detailed requirements

1. The file must be valid YAML.
2. The `on:` key must be present and include a `push` trigger.
3. The `push` trigger must include `branches: [main]` (or `branches: ["main"]`).
4. There must be at least one job under `jobs:`.
5. The job must specify `runs-on: ubuntu-latest` (or another valid runner).
6. The job must have at least two `steps:`.
7. At least one step must use `actions/checkout`.
8. At least one step must use `actions/setup-node`.
9. At least one `run:` step must be present (for `npm ci` or `npm test`).

## Grader notes

The `github-actions-validate` script parses the YAML, checks the required structure, and prints `valid` if all checks pass. Exit code 0 + output containing `valid` = pass.

The grader does NOT execute the workflow on GitHub — it only validates the YAML structure locally. This means the test never actually runs in CI for this exercise, but the learner gets familiar with writing the YAML correctly.
