# Exercise 07 — Spec

## Grader config

```yaml
grader: script-runs
submissionFile: .github/workflows/qa-suite.yml
options:
  scriptType: github-actions-validate
  expectedExitCode: 0
  requiredOutputPatterns:
    - "valid"
```

## Detailed requirements

1. The submission file is `.github/workflows/qa-suite.yml` in the `starter/` directory.
2. The file must be valid GitHub Actions YAML (the validator checks schema conformance).
3. The `on:` trigger must include `push:` with `branches:` containing `main` and `release/*`.
4. The workflow must have at least one `job`.
5. The job must include steps that: install dependencies, install Playwright browsers, run Playwright tests, upload the HTML report as an artifact.
6. At least one step must be conditional on failure (`if: failure()`).
7. The grader runs the GitHub Actions YAML validator and checks the output for the word `valid`.

## Grader notes

The `github-actions-validate` scriptType runs a schema-based validator (equivalent to `action-validator` or `actionlint`). It does not run the workflow — it checks that the YAML structure is correct GitHub Actions syntax.

The validator checks:
- Valid YAML syntax
- Required top-level keys: `on`, `jobs`
- Valid trigger events
- Valid step syntax (each step has either `uses` or `run`)
- Valid `if` expressions
- Valid `with` keys for known actions (e.g., `actions/upload-artifact`)

The validator does NOT check:
- Whether the Playwright command is correct
- Whether the artifact path exists
- Whether the failure notification actually sends a notification

If the learner writes a structurally valid YAML file that would fail at runtime (e.g., wrong artifact path), the grader still passes. Staff review catches these cases.
