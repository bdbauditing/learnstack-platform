# Starter — Exercise 08: Accessibility Audit

Follow these steps in order.

## Step 1 — Install dependencies

```bash
npm install
npx playwright install chromium
```

`@axe-core/playwright` is listed in `package.json` — `npm install` will pull it in.

## Step 2 — Understand axe-core

axe-core checks the DOM for accessibility problems and returns a list of violations. Each violation looks like:

```json
{
  "id": "color-contrast",
  "impact": "serious",
  "description": "Elements must have sufficient color contrast",
  "nodes": [...]
}
```

Impact levels in order of severity: `critical` → `serious` → `moderate` → `minor`.

For this exercise, you only care about `critical` and `serious`.

## Step 3 — Navigate to the dashboard

Open `tests/a11y.spec.ts`. Replace the first TODO with navigation code. If the dashboard requires login:

```typescript
// Log in first
await page.goto('/login');
await page.getByLabel('Email').fill('user@taskforge.example.com');
await page.getByLabel('Password').fill('password123');
await page.getByRole('button', { name: 'Sign in' }).click();
await page.waitForURL('**/dashboard');
```

Or, if there is a public page you want to audit, just navigate there.

## Step 4 — Run the axe analysis

Replace the second TODO:

```typescript
const results = await new AxeBuilder({ page }).analyze();
```

This runs all default axe rules against the current page and returns the results object.

## Step 5 — Filter and assert

Replace the third and fourth TODOs:

```typescript
const blocking = results.violations.filter(v =>
  v.impact === 'critical' || v.impact === 'serious'
);
expect(blocking).toHaveLength(0);
```

If `blocking` is not empty, the assertion fails and Playwright prints which violations were found. You can then decide whether to fix them or exclude specific rules.

## Step 6 — Run the test

```bash
npx playwright test tests/a11y.spec.ts --headed
```

## Step 7 — If the test fails with violations

Read the output. It will say something like:

```
Expected: 0
Received: 2 violations found
- color-contrast (serious): 3 nodes
- label (critical): 1 node
```

You can either:
- Fix the accessibility issues in the app (best)
- Exclude a specific rule: `new AxeBuilder({ page }).disableRules(['color-contrast']).analyze()` (use sparingly)

## Hints

- `.withTags(['wcag2a', 'wcag2aa'])` limits axe to only WCAG 2.0 A and AA rules.
- `.include('#main-content')` limits the audit to a specific part of the page.
- axe-core is not a substitute for manual accessibility testing — it catches ~30-40% of issues automatically.
