# Exercise 08 Spec — Capstone

## 10 Planted Bugs

| ID | Page | Description | Severity | Priority |
|----|------|-------------|----------|----------|
| BUG-001 | login | Submit button disabled with valid credentials | High | High |
| BUG-002 | login | Password shown as plain text (no masking) | Medium | Medium |
| BUG-003 | registration | Invalid email format accepted (no @ required) | High | High |
| BUG-004 | registration | Duplicate email returns 500 instead of user-friendly error | High | Medium |
| BUG-005 | tasks | Task created with blank title (empty string accepted) | High | High |
| BUG-006 | tasks | Completed task still shows in Active Tasks filter | Medium | High |
| BUG-007 | billing | Seat count can be decremented to 0 (no minimum) | High | High |
| BUG-008 | billing | Promo code SAVE10 applies 100% discount instead of 10% | Critical | High |
| BUG-009 | profile | Bio changes not saved after clicking Update | Medium | Medium |
| BUG-010 | profile | Avatar upload accepts any file type including .exe | High | High |

## Grader Config

- Grader: `bug-match`
- Pass threshold: 8 (any 8 of 10)
- Each bug-*.md file must include location keyword and signature keywords
