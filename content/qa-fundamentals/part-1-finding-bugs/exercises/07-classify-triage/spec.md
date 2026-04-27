# Exercise 07 Spec — Classify and Triage

## Planted Classifications (answer key)

| ID | Description | Severity | Priority |
|----|-------------|----------|----------|
| BUG-001 | Checkout crashes for all users on Chrome | Critical | High |
| BUG-002 | Typo in footer "Copyrigt" | Low | Low |
| BUG-003 | Bulk export feature produces empty files | High | High |
| BUG-004 | Login works but takes 12 seconds | Medium | High |
| BUG-005 | Wrong currency symbol for Canadian users | Medium | Medium |
| BUG-006 | Admin dashboard inaccessible for all admins | High | High |
| BUG-007 | Hover tooltip text is cut off in IE11 | Low | Low |
| BUG-008 | API returns user data without auth token | Critical | High |
| BUG-009 | Search results show 11 items when 10 requested | Low | Low |
| BUG-010 | Password reset link expires after 5 min (policy says 1hr) | Medium | High |

## Grader Config
- Tolerance: ±1 level for both severity and priority
- Spearman >= 0.8 for priority ordering
- Pass threshold: 70% within tolerance AND Spearman >= 0.8

## Level Ordering (for tolerance math)

Severity: Critical(4) > High(3) > Medium(2) > Low(1)
Priority: High(3) > Medium(2) > Low(1)

±1 level means: if the answer is Critical(4), accept High(3) as well. If answer is Medium(2), accept High(3) or Low(1).
