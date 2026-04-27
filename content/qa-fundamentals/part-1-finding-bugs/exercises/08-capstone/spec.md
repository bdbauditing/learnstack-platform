# Exercise 08 Spec — Capstone

## 10 Planted Bugs

| ID | Page | Description | Severity | Priority |
|----|------|-------------|----------|----------|
| BUG-001 | login | Submit disabled with valid credentials | High | High |
| BUG-002 | login | Password shown as plain text | Medium | Medium |
| BUG-003 | registration | Invalid email accepted | High | High |
| BUG-004 | registration | 500 on duplicate email | High | Medium |
| BUG-005 | cart | Total doesn't update on quantity change | High | High |
| BUG-006 | cart | Coupon applies 100% discount | Critical | High |
| BUG-007 | checkout | Credit card field accepts letters | High | High |
| BUG-008 | checkout | Order confirmation email not sent | Medium | High |
| BUG-009 | profile | Bio doesn't save on Update | Medium | Medium |
| BUG-010 | profile | Avatar upload accepts .exe files | High | High |

## Grader Config
- Primary: bug-match (pass threshold: 8/10)
- Secondary: structured-doc (each matched report must have evidence + all fields)
- Both graders must pass for the exercise to pass
