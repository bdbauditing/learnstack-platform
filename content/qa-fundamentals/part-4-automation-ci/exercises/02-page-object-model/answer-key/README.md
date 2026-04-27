# Answer Key — Exercise 02: Page Object Model

## Grader config (authoritative)

```yaml
grader: script-runs
submissionFile: tests/login.spec.ts
options:
  scriptType: playwright
  expectedExitCode: 0
```

## Grader notes

- Grader sets `PLAYWRIGHT_BASE_URL` to the staging URL and runs `npx playwright test`.
- Exit code 0 = pass.
- Manual spot-check: open the submitted `tests/login.spec.ts` and verify no raw `page.fill(...)` appears in the test body.
- If a learner duplicates Ex01's raw test and wraps it in the same file alongside the POM usage, flag for manual review.

## Reference solution (staff only)

**pages/LoginPage.ts:**
```typescript
import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly dashboardHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }
}
```

**tests/login.spec.ts:**
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('user can log in via page object', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@taskforge.example.com', 'password123');
  await expect(loginPage.dashboardHeading).toBeVisible();
});
```
