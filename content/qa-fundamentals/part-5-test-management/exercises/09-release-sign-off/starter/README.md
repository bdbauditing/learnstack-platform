# Starter — Exercise 08: Release Sign-Off

Follow these steps in order.

## Step 1 — Understand the situation

Read the exercise README for the fictional test data you will use:

- 52 planned, 50 executed, 47 passed, 3 failed
- 2 blocked (staging issue, now resolved)
- 2 exploratory sessions complete
- API regression: 12/12 passing
- 3 open defects: BUG-001 (Medium, open), BUG-005 (Medium, open), BUG-006 (Critical, fixed pending verification)

This is your raw material. Use it to fill in the sign-off document.

## Step 2 — Open the template

Open `sign-off.md`. You will see 6 sections with comment guidance. Replace the placeholder text in each section with real content.

## Step 3 — Write the Summary of Testing

3–5 sentences covering:

- What test types ran (smoke, regression, exploratory, API, Playwright automation)
- How many features were covered
- Any notable findings or cycles

Example: "The TaskForge 2.0 release underwent two full test cycles covering smoke, regression, exploratory, API regression, and Playwright automation testing. All 12 new 2.0 user stories were covered by at least one test case. Two exploratory sessions were completed targeting the task management and file attachment feature areas."

## Step 4 — Fill in the Test Results table

Use the numbers from the exercise README:

| Metric | Value |
|--------|-------|
| Total planned | 52 |
| Executed | 50 |
| Passed | 47 |
| Failed | 3 |
| Blocked | 2 (staging issue — resolved) |
| Pass rate | 94% (47 / 50) |
| API assertions passing | 12 / 12 |

## Step 5 — Fill in the Open Defects table

List the 3 defects from the exercise README:

| Defect ID | Severity | Status | Risk to Release |
|-----------|----------|--------|----------------|
| BUG-001 | Medium | Open | Low — cosmetic, no data loss |
| BUG-005 | Medium | Open | Medium — could cause accidental deletion of completed task history |
| BUG-006 | Critical | Fixed, pending verification | High if unverified — security bypass |

## Step 6 — Write the Risk Assessment

For each open or recently fixed defect, assess the post-release risk:

- **BUG-001** — Low risk. Users can set correct dates manually. No data is corrupted. UI cosmetic issue only.
- **BUG-005** — Medium risk. Bulk delete is a deliberate action with a confirmation dialog. Risk is accidental but requires multiple steps to trigger.
- **BUG-006** — Critical if not verified. If the fix is incomplete, any user with an active session can view all API keys. Must be verified before deployment.

Also consider systemic risks: performance under real load, email delivery in production vs. staging, etc.

## Step 7 — Write the Recommendation

Make a decision. Based on the data:

- Pass rate is 94% (below the 95% exit criterion — this needs to be acknowledged)
- BUG-006 is Critical and only Fixed-pending-verification
- BUG-005 is a Medium risk with a workaround

A reasonable recommendation here is **Conditional GO** — release can proceed when:
1. BUG-006 is verified fixed by a QA engineer.
2. BUG-005 is accepted by the product owner as a known risk for this release.

State your recommendation clearly with the exact word GO or NO-GO.

## Step 8 — Write the Release Conditions

Turn your recommendation's conditions into explicit gates:

- Each condition must be verifiable with a yes/no answer.
- Assign ownership if possible (who verifies which condition).

Example conditions for this scenario:
- BUG-006 must be verified fixed by a QA engineer in the staging environment.
- Product owner must formally accept BUG-005 as a known risk for this release.
- Rollback plan must be confirmed with DevOps before deployment.
- Deploy to 10% of production traffic first; hold for 1 hour; expand to 100% only if error rates are normal.

## Hints

- Be honest about the 94% pass rate. It is below 95% exit criteria. Acknowledge this and justify the conditional GO — do not pretend the number is fine.
- The sign-off document has your name on it. Write it as if a real release manager and your engineering manager will read it. They will.
- GO with conditions is professional and normal — it is not a failure. It means "we can ship this if we do these specific things first."
- A clean NO-GO is also professional. If BUG-006 were still open with no fix in sight, NO-GO would be correct.
