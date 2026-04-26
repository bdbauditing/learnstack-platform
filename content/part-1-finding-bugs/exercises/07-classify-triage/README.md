# Exercise 07 — Classify and Triage

**Technique focus:** Severity vs Priority Classification + Test Prioritization

**Time:** ~25 minutes
**Grader:** classification-match (±1 tolerance + Spearman >= 0.8)
**Pass threshold:** 70% of classifications within tolerance AND Spearman >= 0.8

## Your mission

You have **10 bug descriptions** in `starter/bugs-to-classify.yaml`. For each:
1. Assign a **Severity** (Critical / High / Medium / Low)
2. Assign a **Priority** (High / Medium / Low)
3. **Order them** from highest priority to lowest (put the IDs in order)

## Deliverable

`starter/classifications.yaml` — severity, priority, and ordering for all 10 bugs.

## Reference

**Severity** = technical impact (how bad is the break?)
- Critical: data loss, security breach, system crash
- High: major feature broken, no workaround
- Medium: feature broken, workaround exists
- Low: cosmetic, minor annoyance

**Priority** = business urgency (how fast must this be fixed?)
- High: fix before next release
- Medium: fix in upcoming sprint
- Low: fix when convenient

## Tips

- Severity and priority are independent — a Low severity bug can be High priority if it affects the CEO or a key business metric.
- Security bugs (data exposed without auth) are almost always Critical severity AND High priority.
- Bugs affecting 0% of your real users (IE11, for example) can be Low priority even at High severity.
- When in doubt: "How many users are affected?" and "How bad is it for them?"
