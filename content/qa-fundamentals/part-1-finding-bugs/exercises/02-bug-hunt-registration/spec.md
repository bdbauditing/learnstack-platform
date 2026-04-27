# Exercise 02 Spec — Bug Hunt: Registration Form

## Planted Bugs

| ID | Location | Description | Severity | Priority |
|----|----------|-------------|----------|----------|
| BUG-001 | registration/email | Accepts invalid email format (e.g. "notanemail") without error | High | High |
| BUG-002 | registration/password | Password strength meter always shows "Strong" regardless of password length | Medium | Medium |
| BUG-003 | registration/confirm-password | Passwords "abc" and "xyz" both accepted with no mismatch error | High | High |
| BUG-004 | registration/terms | Form submits successfully even when Terms checkbox is unchecked | Medium | High |
| BUG-005 | registration/duplicate-email | Submitting with an existing email shows a 500 server error instead of a user-friendly message | High | Medium |

## Grader Config
- Pass threshold: 4 of 5
- Grader: bug-match
