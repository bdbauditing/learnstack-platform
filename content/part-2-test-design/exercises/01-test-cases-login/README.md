# Exercise 01 — Test Cases for Login

**Technique focus:** Equivalence Partitioning + Boundary Value Analysis

**Time:** ~30 minutes
**Grader:** test-catches-bug (Playwright)
**Pass threshold:** catch 4 out of 5 planted bugs

## Your mission

Write test cases for a login page. The test cases will be converted to Playwright automation and run against a **buggy version** of the app. A test case "catches a bug" if it would fail against the buggy app.

## The buggy app

**TODO: actual buggy app URL** — the login page has 5 planted bugs.

## What to test

Use equivalence partitioning and boundary value analysis:
- Valid credentials (happy path)
- Invalid password
- Non-existent email
- Empty email, empty password, both empty
- Email format validation
- Password minimum length boundary
- "Remember me" behaviour
- Session after logout (back button)

## Deliverable

`starter/test-cases.yaml` — test cases in the standard format.

**Write at least 8 test cases.** More is better; the grader checks coverage, not count.

## Format reminder

```yaml
test_cases:
  - id: TC-001
    title: "Verify that login succeeds with valid email and password"
    preconditions:
      - "User account exists: user@example.com / correct-password"
    steps:
      - action: navigate
        url: "/login"
      - action: type
        selector: '[data-test="email"]'
        value: "user@example.com"
      - action: type
        selector: '[data-test="password"]'
        value: "correct-password"
      - action: click
        selector: '[data-test="submit"]'
    expected: "User is redirected to dashboard"
    priority: High
```
