# Exercise 01 Spec — Test Cases for Login

## Planted Bugs (in buggy app)

| ID | Location | Description |
|----|----------|-------------|
| BUG-001 | login/form | Submit button stays disabled with valid credentials |
| BUG-002 | login/email | Email field accepts "notanemail" without validation error |
| BUG-003 | login/password | Password minimum length is not enforced (5-char passwords accepted when min is 8) |
| BUG-004 | login/error | Wrong-password error message reveals whether the email exists |
| BUG-005 | login/session | After logout, browser back button shows dashboard (session not fully invalidated) |

## Grader Config
- Grader: test-catches-bug (Playwright)
- Pass threshold: 4/5 bugs caught
- A test case catches a bug if its assertion would FAIL against the buggy app

## Learning Objective
Learners must write test cases that cover negative paths, boundary values, and security-adjacent behaviors — not just the happy path.
