# Starter — Exercise 01: First Playwright Test

Follow these steps in order.

## Step 1 — Install dependencies

```bash
npm install
npx playwright install chromium
```

## Step 2 — Open the config

Open `playwright.config.ts`. You will see a `baseURL` set to `TODO: <hostname>`. Replace it with the real TaskForge URL when you have it. For now, keep reading.

## Step 3 — Open the test stub

Open `tests/login.spec.ts`. You will see four TODO comments inside the test body:

```typescript
// TODO: navigate to login page
// TODO: fill email and password
// TODO: click submit
// TODO: assert dashboard heading is visible
```

## Step 4 — Write the navigation

Replace the first TODO with:

```typescript
await page.goto('/login');
```

The `/login` path is relative to the `baseURL` in the config.

## Step 5 — Fill the credentials

Replace the second TODO with something like:

```typescript
await page.fill('[name="email"]', 'user@taskforge.example.com');
await page.fill('[name="password"]', 'password123');
```

Check the actual input selectors in the TaskForge HTML — they may differ.

## Step 6 — Click submit

Replace the third TODO with:

```typescript
await page.click('[type="submit"]');
```

## Step 7 — Assert the dashboard heading

Replace the fourth TODO with an assertion. Something like:

```typescript
await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
```

Adjust the heading text to match what TaskForge actually shows.

## Step 8 — Run the test

```bash
npx playwright test tests/login.spec.ts --headed
```

The `--headed` flag opens a real browser so you can watch what happens. When it passes, run it without `--headed` for the final submission.

## Hints

- If the selector is wrong, Playwright will say `locator not found`. Open DevTools in the headed browser and inspect the element to find the right selector.
- `page.getByLabel('Email')` is more reliable than `page.fill('#email', ...)` because it survives HTML refactors.
- If the test times out, the page probably navigated to an error page. Check the screenshot in `test-results/`.
