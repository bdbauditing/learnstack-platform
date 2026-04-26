# Starter — Exercise 08: Capstone

Explore the entire app at **TODO: actual buggy app URL**. Find 10 bugs across all pages.

Write complete bug reports with:
- All required fields
- Specific, actionable steps
- Evidence (screenshot, console, network)
- Correct severity and priority

**You need 8/10 reports to pass full validation.**

## Pages to test

| Page | URL | What to look for |
|------|-----|-----------------|
| Login | /login | Credentials, error messages, field types, links |
| Registration | /register | Validation, duplicate email, password rules |
| Cart | /cart | Quantities, pricing, coupons, remove items |
| Checkout | /checkout | Payment fields, order placement, confirmation |
| Profile | /profile | Bio save, avatar upload, field validation |

## Checklist before submitting

- [ ] 10 bug reports in bugs.yaml
- [ ] Every report has title, location, severity, priority
- [ ] Every report has all 4 environment fields filled
- [ ] Every report has at least 3 steps
- [ ] Every report has expected and actual (each at least 15 chars)
- [ ] Every report has all 3 evidence fields (screenshot, console, network)

## Format reminder

```yaml
bugs:
  - title: "[Login] Submit button disabled with valid credentials"
    location: "login/form"
    severity: High
    priority: High
    environment:
      browser: Chrome 130
      os: macOS 14
      viewport: 1440x900
      url: "TODO: actual buggy app URL/login"
    steps:
      - action: navigate
        url: "/login"
      - action: type
        selector: '[data-test="email"]'
        value: "user@example.com"
      - action: type
        selector: '[data-test="password"]'
        value: "ValidPass123!"
      - action: click
        selector: '[data-test="submit"]'
    expected: "User is redirected to /dashboard after successful login"
    actual: "Submit button remains disabled — cannot be clicked despite valid credentials"
    evidence:
      screenshot: "login-submit-disabled-chrome130-macos14.png"
      console: "TypeError: Cannot read properties of null (reading 'disabled') at login-form.js:83"
      network: "POST /api/auth/login → never fired (button never became enabled)"
```
