# Starter — Exercise 03: Task CRUD Automation

Follow these steps in order.

## Step 1 — Install dependencies

```bash
npm install
npx playwright install chromium
```

## Step 2 — Understand the four tests

Open `tests/tasks.spec.ts`. There are four `test()` blocks, each with TODO comments. Your job is to replace every TODO with real Playwright code.

## Step 3 — Fill the login helper

Near the top you will see a `loginAs` function stub. Fill it in:

```typescript
async function loginAs(page: any, email: string, password: string) {
  await page.goto('/login');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('**/dashboard');
}
```

Or import your `LoginPage` from Exercise 02 — that is even better.

## Step 4 — Write the Create test

After login, navigate to tasks and create one:

```typescript
await page.goto('/tasks');
await page.getByRole('button', { name: 'New Task' }).click();
await page.getByLabel('Title').fill('Buy groceries');
await page.getByRole('button', { name: 'Save' }).click();
await expect(page.getByText('Buy groceries')).toBeVisible();
```

## Step 5 — Write the Read test

The read test just navigates to the list and checks a task appears:

```typescript
await page.goto('/tasks');
await expect(page.getByText('Buy groceries')).toBeVisible();
```

Note: this test depends on the Create test running first and leaving data. That is acceptable for this exercise, but in production suites you would seed test data via an API call.

## Step 6 — Write the Update test

Open a task, change its title, save, and assert the new title:

```typescript
await page.goto('/tasks');
await page.getByText('Buy groceries').click();
await page.getByLabel('Title').fill('Buy organic groceries');
await page.getByRole('button', { name: 'Save' }).click();
await expect(page.getByText('Buy organic groceries')).toBeVisible();
```

## Step 7 — Write the Delete test

Find the task and delete it, then assert it is gone:

```typescript
await page.goto('/tasks');
await page.getByText('Buy organic groceries').hover();
await page.getByRole('button', { name: 'Delete' }).click();
await page.getByRole('button', { name: 'Confirm' }).click();
await expect(page.getByText('Buy organic groceries')).not.toBeVisible();
```

## Step 8 — Run the suite

```bash
npx playwright test tests/tasks.spec.ts --headed
```

All four tests should be green.

## Hints

- Selectors like `getByRole` and `getByLabel` are more stable than CSS selectors.
- If you are unsure of a selector, use `npx playwright codegen TODO: https://taskforge.example.com` to record interactions.
- Each test must have at least one `expect(...)` — a test with no assertions always passes and tells you nothing.
