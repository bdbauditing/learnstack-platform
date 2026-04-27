# Exercise 01 Spec — Bug Hunt: Login Page

## Planted Bugs

| ID | Location | Description | Severity | Priority |
|----|----------|-------------|----------|----------|
| BUG-001 | login/form | Submit button stays disabled even with valid email+password filled in | High | High |
| BUG-002 | login/password | Password field uses type="text" — shows plain text instead of masked dots | Medium | Medium |
| BUG-003 | login/forgot-password | "Forgot password" link navigates to /404 instead of /reset-password | Low | Medium |
| BUG-004 | login/error-message | Error message on wrong password says "Username not found" instead of "Invalid credentials" (misleads attacker to valid username enumeration) | Medium | High |

## Grader Config

- Grader: `bug-match`
- Pass threshold: 3 (any 3 of 4)
- Location match: case-insensitive contains
- Keyword thresholds: see answer-key/bugs-expected.yaml

## Notes for Grader Authors

BUG-004 is nuanced (security-relevant). Accept any submission that mentions:
- "error message" + ("username" OR "credentials" OR "enumeration")
- Location: "login/error" or "login/form" or "login"

BUG-002 keyword check should accept "plain text", "visible", "not masked", "type text".
