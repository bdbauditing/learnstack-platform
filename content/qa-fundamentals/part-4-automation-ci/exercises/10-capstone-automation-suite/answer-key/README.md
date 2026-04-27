# Answer Key — Exercise 10: Capstone Automation Suite

## Grader config (authoritative)

```yaml
grader: script-runs
submissionFile: playwright.config.ts
options:
  scriptType: playwright
  expectedExitCode: 0
```

## Grader notes

- The grader uses `playwright.config.ts` as the anchor to locate the project root, then runs `npx playwright test` from that directory.
- Grader supplies `PLAYWRIGHT_BASE_URL` to the staging environment.
- Exit code 0 = pass.
- The grader does not count tests automatically — manual review verifies that at least 8 tests exist and pass.
- Pass = Playwright exits 0 (all tests pass). Remind learners to pull in their POM from Ex02.
- If a learner submits stub tests (empty bodies with `// TODO` and no assertions), pytest exits 0 but they are not testing anything. Manual review should flag this.

## What a complete submission looks like

```
starter/
  pages/
    LoginPage.ts          ← real implementation from Ex02
  tests/
    login.spec.ts         ← 1+ tests using LoginPage
    tasks.spec.ts         ← 4+ CRUD tests
    a11y.spec.ts          ← 1+ tests using AxeBuilder
    security.spec.ts      ← 1+ tests checking 3 security headers
  playwright.config.ts
```

## Common failure modes

- `LoginPage.ts` left as a stub — all tests that import it will throw TypeScript errors or runtime errors.
- `tasks.spec.ts` tests share state and fail in parallel. The learner should either: (a) disable parallelism in config with `workers: 1`, or (b) make each test independent by seeding data via an API call.
- `a11y.spec.ts` navigates to the dashboard but does not log in first — axe audits the login redirect page instead.
- Learner has 7 tests not 8 — they need to add one more.
