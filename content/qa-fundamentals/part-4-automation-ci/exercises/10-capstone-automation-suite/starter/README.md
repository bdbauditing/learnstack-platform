# Starter — Exercise 10: Capstone Automation Suite

This is your final exercise. You are assembling everything from Exercises 01–09 into one complete Playwright project.

## What you need to build

| File | Source | Min tests |
|------|--------|-----------|
| `pages/LoginPage.ts` | Your Ex02 implementation | — |
| `tests/login.spec.ts` | Your Ex02 test | 1 |
| `tests/tasks.spec.ts` | Your Ex03 tests | 4 |
| `tests/a11y.spec.ts` | Your Ex08 test | 1 |
| `tests/security.spec.ts` | Your Ex09 test | 1 |

**Grand total: at least 8 passing tests across 4 files.**

## Step 1 — Install dependencies

```bash
npm install
npx playwright install chromium
```

## Step 2 — Fill in LoginPage.ts

Open `pages/LoginPage.ts`. Copy your implementation from Exercise 02:
- Set `dashboardHeading` to the correct locator
- Implement `goto()` to navigate to `/login`
- Implement `login(email, password)` to fill and submit the form

If you do not do this step, `login.spec.ts` will fail because it imports `LoginPage`.

## Step 3 — Implement login.spec.ts

Copy your working login test from Exercise 02. The stub is already there — just fill in the three TODOs:
```typescript
await loginPage.goto();
await loginPage.login('user@taskforge.example.com', 'password123');
await expect(loginPage.dashboardHeading).toBeVisible();
```

## Step 4 — Implement tasks.spec.ts

Copy your four CRUD tests from Exercise 03. Each test needs at least one `expect(...)` assertion.

## Step 5 — Implement a11y.spec.ts

Copy your accessibility test from Exercise 08:
1. Navigate to dashboard (log in first)
2. Run `new AxeBuilder({ page }).analyze()`
3. Filter to critical/serious and assert length 0

## Step 6 — Implement security.spec.ts

Copy your security headers test from Exercise 09:
1. Register `page.on('response', ...)` before navigating
2. Navigate to `/login`
3. Assert `x-content-type-options`, `x-frame-options`, `strict-transport-security`

## Step 7 — Run the full suite

```bash
npx playwright test --headed
```

You should see 8+ tests run and all pass. The HTML report opens automatically in `playwright-report/index.html`.

## Step 8 — Make it 8+ tests

Count your tests. If you have only 7 (1 login + 4 CRUD + 1 a11y + 1 security), add one more anywhere. Suggestions:
- A negative login test: wrong password should not reach the dashboard
- A second a11y test on the tasks list page
- An additional CRUD assertion (e.g., task count changes after delete)

## Checklist before submitting

- [ ] `pages/LoginPage.ts` has real implementations (not TODO stubs)
- [ ] All four spec files exist and have real test code
- [ ] `npx playwright test` exits with code 0
- [ ] At least 8 tests are reported as passed
- [ ] No hardcoded `waitForTimeout(...)` calls (use smart waits)
