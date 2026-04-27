# Exercise 02 — Page Object Model

## Mission

Refactor the login test from Exercise 01 into a proper **Page Object**. Instead of calling `page.fill(...)` directly in your test, you will:

1. Create a `LoginPage` class in `pages/LoginPage.ts` with:
   - A `goto()` method that navigates to the login page
   - A `login(email, password)` method that fills the form and submits
   - A `dashboardHeading` locator that points to the heading shown after login
2. Update `tests/login.spec.ts` to import and use `LoginPage` — no raw `page.fill()` calls allowed in the test body

## Why this matters

If the login form's selectors change, you fix one file (`LoginPage.ts`) instead of hunting through every test that touches the login page.

## Technique

- Define a class with a constructor that accepts `page: Page`
- Use `this.page.goto(...)`, `this.page.getByLabel(...)` inside the class
- Return `this` from methods where it makes sense (fluent API), or just use `async/await`

## Deliverable

- A completed `pages/LoginPage.ts` with all method bodies filled in
- A `tests/login.spec.ts` that uses `LoginPage` and passes

## How to test locally

```bash
# From the starter/ folder:
npx playwright test tests/login.spec.ts
```

## Pass condition

- `npx playwright test` exits with code 0.
- The test imports `LoginPage` and calls at least `loginPage.goto()` and `loginPage.login(...)`.
- No raw `page.fill(...)` calls appear in the test body.
