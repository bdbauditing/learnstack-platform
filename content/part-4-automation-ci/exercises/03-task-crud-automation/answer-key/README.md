# Answer Key — Exercise 03: Task CRUD Automation

## Grader config (authoritative)

```yaml
grader: script-runs
submissionFile: tests/tasks.spec.ts
options:
  scriptType: playwright
  expectedExitCode: 0
```

## Grader notes

- Grader supplies `PLAYWRIGHT_BASE_URL` and runs the full spec.
- All four `test()` blocks must pass for exit code 0.
- Tests that share state via test execution order are a known fragility but are not penalised in this exercise.
- Tests with no `expect(...)` calls technically pass (exit 0) but a manual reviewer should flag them.

## Common mistakes

- Forgetting to log in before each test — the task pages are behind auth.
- Asserting `toBeVisible()` immediately after clicking without waiting for navigation or response.
- Using `waitForTimeout(1000)` as a substitute for a proper locator wait.
- The Delete test failing because a confirmation dialog is not handled.
