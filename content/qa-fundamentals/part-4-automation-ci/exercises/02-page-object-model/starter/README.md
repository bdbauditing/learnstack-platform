# Starter — Exercise 02: Page Object Model

Follow these steps in order.

## Step 1 — Install dependencies

```bash
npm install
npx playwright install chromium
```

## Step 2 — Understand the file layout

```
starter/
  pages/
    LoginPage.ts   ← you build the Page Object here
  tests/
    login.spec.ts  ← you use the Page Object here
  playwright.config.ts
```

## Step 3 — Implement LoginPage.ts

Open `pages/LoginPage.ts`. You will see a class with empty method bodies and a TODO locator.

**Fix the constructor:**

The `dashboardHeading` locator should point to the heading element visible after login. Example:

```typescript
this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
```

**Fix `goto()`:**

```typescript
async goto(): Promise<void> {
  await this.page.goto('/login');
}
```

**Fix `login()`:**

```typescript
async login(email: string, password: string): Promise<void> {
  await this.page.getByLabel('Email').fill(email);
  await this.page.getByLabel('Password').fill(password);
  await this.page.getByRole('button', { name: 'Sign in' }).click();
}
```

Adjust selectors to match the actual TaskForge HTML.

## Step 4 — Use LoginPage in the test

Open `tests/login.spec.ts`. Replace the TODO comments:

```typescript
await loginPage.goto();
await loginPage.login('user@taskforge.example.com', 'password123');
await expect(loginPage.dashboardHeading).toBeVisible();
```

## Step 5 — Run the test

```bash
npx playwright test tests/login.spec.ts --headed
```

Watch the browser. If it passes, you are done. If it fails, read the error message — Playwright will tell you which locator it could not find.

## Key rule

Do NOT add `page.fill(...)` directly in the test body. All page interactions must go through `LoginPage` methods. This is the whole point of the exercise.
