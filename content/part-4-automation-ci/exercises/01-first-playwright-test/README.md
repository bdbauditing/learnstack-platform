# Exercise 01 — First Playwright Test

## Mission

Write a Playwright test that:
1. Navigates to the TaskForge login page
2. Enters valid credentials
3. Clicks the submit button
4. Asserts that the dashboard heading is visible

This is your first automated test. Keep it simple — one test, four lines of code.

## Start with Playwright Codegen (recommended)

Before writing any code by hand, let Playwright record the clicks for you:

```bash
# From the starter/ folder:
npx playwright codegen TODO:https://taskforge.example.com/login
```

A browser opens. Click through the login flow. Playwright writes the TypeScript code in a side panel. Copy it into `tests/login.spec.ts` and add the final assertion.

## Core Playwright API

- `page.goto(url)` — navigate to a URL
- `page.fill(selector, value)` — type into an input
- `page.click(selector)` — click a button
- `expect(locator).toBeVisible()` — assert an element is on screen

## Deliverable

A completed `tests/login.spec.ts` file where all TODOs are replaced with real Playwright code.

## How to test locally

```bash
# From the starter/ folder:
npx playwright test tests/login.spec.ts
```

The test should exit with code 0 (all green).

## Pass condition

- The script runs without errors.
- The `test('user can log in', ...)` block passes.
- The dashboard heading assertion fires (the `expect(...)` line must be present and must pass).
