# Answer Key — Exercise 01: First Playwright Test

## Grader config (authoritative)

```yaml
grader: script-runs
submissionFile: tests/login.spec.ts
options:
  scriptType: playwright
  expectedExitCode: 0
```

## Grader notes

- The grader sets `PLAYWRIGHT_BASE_URL` to the live TaskForge staging URL before running `npx playwright test`.
- A passing submission exits 0, meaning Playwright's test runner reported all tests passed.
- If the learner left TODO placeholders in the URL, the test will time out and exit non-zero — that is a fail.
- The grader does NOT check for specific selectors — it only checks exit code. Any working selector combination is acceptable.

## Reference solution (staff only)

```typescript
import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@taskforge.example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

## Common learner mistakes

- Forgetting `await` before Playwright calls — TypeScript will not catch this at compile time, but the test will behave unpredictably.
- Using hardcoded `waitForTimeout` instead of smart locators.
- Asserting the page title (`page.title()`) instead of a visible heading — the title check passes even if the page crashed.
