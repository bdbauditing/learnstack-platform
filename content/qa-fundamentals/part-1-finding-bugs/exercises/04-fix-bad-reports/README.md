# Exercise 04 — Fix 5 Bad Bug Reports

**Time:** ~30 minutes
**Grader:** structured-doc (rewritten steps must be playable via Playwright)
**Pass threshold:** All 5 rewrites must pass structural validation

## Your mission

You're given 5 terrible bug reports in `starter/bad-reports.yaml`. Each one is missing critical information, has vague steps, or has reversed expected/actual.

Rewrite each one as a proper bug report in `starter/fixed-reports.yaml`.

## What makes a bad report?

- Steps like "do the thing" or "go to page"
- Expected and actual are swapped
- No environment
- Actual says what should happen, expected says what does happen
- Steps missing a selector, URL, or value

## Deliverable

`starter/fixed-reports.yaml` — 5 rewritten bug reports in full bugs.yaml format.

Each rewritten report must have:
- At least 3 specific steps with selectors/URLs
- Expected and actual (minimum 10 chars each)
- Severity and priority filled in
- Environment section complete
