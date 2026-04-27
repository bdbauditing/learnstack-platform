# Exercise 01 — Spec

## Grader config

```yaml
grader: script-runs
submissionFile: tests/login.spec.ts
options:
  scriptType: playwright
  expectedExitCode: 0
```

## Detailed requirements

1. The file `tests/login.spec.ts` must import `test` and `expect` from `@playwright/test`.
2. There must be exactly one `test(...)` block with the description `'user can log in'`.
3. The test must call `page.goto(...)` with a non-empty URL (the TODO placeholder is not acceptable in a submitted answer).
4. The test must call `page.fill(...)` or `page.locator(...).fill(...)` at least twice (email and password fields).
5. The test must call `page.click(...)` or a locator click at least once (submit button).
6. The test must include an `expect(...)` assertion that checks a dashboard-related element is visible.
7. Running `npx playwright test tests/login.spec.ts` must exit with code 0.

## Grader notes

The grader runs `npx playwright test` against the submission. Because the app URL is a TODO placeholder in the starter, the grader environment supplies the real `baseURL` via the environment variable `PLAYWRIGHT_BASE_URL`. The grader's `playwright.config.ts` picks this up automatically.

A test that exits 0 with all assertions passing is a pass. A test that skips the assertions or uses `test.skip()` is a fail.
