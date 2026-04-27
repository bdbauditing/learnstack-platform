# Exercise 03 — Spec

## Grader config

```yaml
grader: script-runs
submissionFile: tests/tasks.spec.ts
options:
  scriptType: playwright
  expectedExitCode: 0
```

## Detailed requirements

1. `tests/tasks.spec.ts` must contain exactly four `test(...)` blocks.
2. The four tests must cover: create a task, read (verify in list), update title, delete (verify gone).
3. Each test must include at least one `expect(...)` call.
4. Tests should be independent where possible — avoid relying on execution order for state (hint: each test should log in and create the task it needs).
5. Running `npx playwright test tests/tasks.spec.ts` must exit with code 0.

## Grader notes

- The grader supplies `PLAYWRIGHT_BASE_URL` to the staging environment.
- If tests share state and run in a different order, they may fail non-deterministically. This is acceptable for the exercise but noted in feedback.
- All four tests must pass for a green result.
