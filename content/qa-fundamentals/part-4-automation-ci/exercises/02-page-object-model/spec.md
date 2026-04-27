# Exercise 02 — Spec

## Grader config

```yaml
grader: script-runs
submissionFile: tests/login.spec.ts
options:
  scriptType: playwright
  expectedExitCode: 0
```

## Detailed requirements

1. `pages/LoginPage.ts` must export a class named `LoginPage`.
2. `LoginPage` must have a constructor that accepts a `Page` argument from `@playwright/test`.
3. `LoginPage` must have a `goto()` method (async) that navigates to the login URL.
4. `LoginPage` must have a `login(email: string, password: string)` method (async) that fills the email field, fills the password field, and submits the form.
5. `LoginPage` must expose a `dashboardHeading` property that is a Playwright `Locator`.
6. `tests/login.spec.ts` must import `LoginPage` from `../pages/LoginPage`.
7. The test body must not contain raw `page.fill(...)` calls — all interactions must go through the `LoginPage` methods.
8. Running `npx playwright test tests/login.spec.ts` must exit with code 0.

## Grader notes

The grader checks exit code only. The structural requirements (no raw `page.fill` in test body, class has correct methods) are enforced by the answer-key reviewer for manual spot-checks. The automated grader simply runs the test and checks the exit code.
