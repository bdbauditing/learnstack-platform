# Grader Notes — Exercise 07

- Tolerance: ±1 level on severity and priority
- Spearman correlation on priority ordering must be >= 0.8
- BUG-001 and BUG-008 are both Critical/High — swapping their order is fine
- BUG-002, BUG-007, BUG-009 are all Low/Low — any order among them is fine

## Rationale for each classification

**BUG-001** (checkout crash, Chrome, all users) — Critical: core revenue feature broken for all users. High priority: ship nothing until fixed.

**BUG-002** (footer typo) — Low: cosmetic. Low priority: fix in a quiet sprint.

**BUG-003** (bulk export empty files) — High: feature completely non-functional, but it's a secondary feature. High priority: affects a business workflow but not checkout.

**BUG-004** (12-second login) — Medium: login works, just slowly. High priority: UX is severely degraded, users are complaining, could cause abandonment.

**BUG-005** (Canadian dollar symbol) — Medium: wrong display but prices are correct. Medium priority: affects a subset of users, not critical path.

**BUG-006** (admin 403) — High: all admins locked out, no workaround. High priority: operational blocker.

**BUG-007** (IE11 tooltip) — Low: affects a browser with <1% market share. Low priority: fix never, basically.

**BUG-008** (unauthenticated PII) — Critical: security/privacy breach. High priority: must be fixed immediately, potentially stop-ship.

**BUG-009** (11 items instead of 10) — Low: minor data integrity issue, not harmful. Low priority: fix eventually.

**BUG-010** (reset link 5min vs 1hr) — Medium: works but violates policy. High priority: security policy compliance is a hard requirement.

## Common learner mistakes

- Confusing BUG-004's severity (Medium) with its priority (High) — the login WORKS, it's just slow. That's Medium severity.
- Rating BUG-007 too high because tooltips "should work" — context matters: IE11 usage is negligible.
- Missing that BUG-008 is a security issue and rating it Medium instead of Critical.
