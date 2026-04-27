# Exercise 10 — Spec

## Grader config

```yaml
grader: script-runs
submissionFile: playwright.config.ts
options:
  scriptType: playwright
  expectedExitCode: 0
```

## Detailed requirements

1. `playwright.config.ts` must exist at the root of the starter directory.
2. At least four test files must exist under `tests/`: `login.spec.ts`, `tasks.spec.ts`, `a11y.spec.ts`, `security.spec.ts`.
3. At least eight `test(...)` blocks must exist across all spec files.
4. `pages/LoginPage.ts` must exist and export a `LoginPage` class.
5. `tests/login.spec.ts` must import and use `LoginPage`.
6. `tests/tasks.spec.ts` must have at least four tests covering create, read, update, delete.
7. `tests/a11y.spec.ts` must import `AxeBuilder` and assert on violations.
8. `tests/security.spec.ts` must check at least two security headers.
9. Running `npx playwright test` (no specific file) must exit with code 0 and report at least 8 passing tests.

## Grader notes

- The grader submits the `playwright.config.ts` as the anchor file. It then runs `npx playwright test` from the directory containing `playwright.config.ts`.
- Grader supplies `PLAYWRIGHT_BASE_URL` to the staging environment.
- Exit code 0 + at least 8 tests reported as passed = green.
- Pass: remind learners to pull in their POM from Ex02.
- Answer key note: Pass = Playwright exits 0 (all tests pass). Remind learners to pull in their POM from Ex02.
