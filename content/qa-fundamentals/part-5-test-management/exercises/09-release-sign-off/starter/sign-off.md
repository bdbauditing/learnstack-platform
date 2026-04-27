# QA Sign-Off — TaskForge 2.0

**QA Lead:** [Your name]
**Date:** [Today's date]
**Release:** TaskForge 2.0
**Sign-off status:** [APPROVED / NOT APPROVED]

---

## Summary of Testing

<!-- Describe what was tested during this release cycle. Cover:
     - Which test types were run (smoke, regression, exploratory, API, automation)
     - Number of test cycles or sprints
     - Features covered
     Keep this section factual and concise — 3–5 sentences or a short bullet list. -->

[Replace with your summary of the testing effort]

---

## Test Results

<!-- Include the numbers. Use a table or bullet list.
     Required data to include:
     - Total test cases planned
     - Total executed (run, not blocked)
     - Passed
     - Failed
     - Blocked (and reason)
     - Pass rate (as a percentage)
     - API regression collection result
     Use the data from the exercise README. -->

| Metric | Value |
|--------|-------|
| Total planned | |
| Executed | |
| Passed | |
| Failed | |
| Blocked | |
| Pass rate | |
| API assertions passing | |

---

## Open Defects

<!-- List all open defects at the time of sign-off.
     Include: ID, severity, current status, and risk to the release.
     Use the defects from the exercise README. -->

| Defect ID | Severity | Status | Risk to Release |
|-----------|----------|--------|----------------|
| | | | |

---

## Risk Assessment

<!-- What could go wrong in production based on what you found during testing?
     List 2–3 specific risks. For each:
     - What the risk is
     - Which defect or finding it relates to
     - How likely it is and what the impact would be
     - Whether a mitigation or workaround exists -->

[Replace with your risk assessment]

---

## Recommendation

<!-- State your recommendation clearly: GO or NO-GO.
     If GO: state it confidently and list any conditions (things that must be true before deployment).
     If NO-GO: state the reason and what needs to happen before you can re-assess.
     If conditional GO: explain which conditions must be met.

     Example: "RECOMMENDATION: GO — I am confident that TaskForge 2.0 is ready for release subject to the conditions listed below." -->

[Replace with your explicit GO or NO-GO recommendation and reasoning]

---

## Release Conditions

<!-- List the specific conditions that must be verified before the deployment proceeds.
     Each condition should be a gate — something that can be checked with a yes/no answer.
     If recommending a clean GO with no open risks, this section can say "None — release can proceed immediately."

     Example:
     - BUG-006 (Critical) must be verified fixed by a QA engineer before deployment.
     - Rollback plan must be confirmed with DevOps before deployment window opens.
     - Deployment to 10% of production traffic first; hold for 1 hour before full rollout. -->

[Replace with your release conditions, or "None — release can proceed immediately" if there are no conditions]
