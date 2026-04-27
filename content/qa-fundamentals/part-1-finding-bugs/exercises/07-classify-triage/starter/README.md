# Starter — Exercise 07: Classify and Triage

Read each bug description in `bugs-to-classify.yaml`. Assign severity and priority to each, then order them from highest to lowest priority in `classifications.yaml`.

## Severity scale

| Level | Meaning |
|-------|---------|
| Critical | Data loss, security breach, complete system crash, revenue blocked |
| High | Major feature broken for many users, no workaround available |
| Medium | Feature broken but workaround exists, or affects a subset of users |
| Low | Cosmetic issue, typo, minor annoyance, affects very few users |

## Priority scale

| Level | Meaning |
|-------|---------|
| High | Must be fixed before the next release — blocking or business-critical |
| Medium | Should be fixed in the next sprint — important but not blocking |
| Low | Fix when convenient — low business impact |

## Remember

Severity and priority are NOT the same axis. Ask two separate questions:

1. "How badly is the software broken?" → Severity
2. "How urgently does the business need this fixed?" → Priority
