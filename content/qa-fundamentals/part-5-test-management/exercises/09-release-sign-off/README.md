# Exercise 09 — Release Sign-Off

**Technique focus:** Test Sign-Off + Release Readiness + QA Metrics

**Time:** 30 min
**Grader:** script-runs/node (validate-metrics.js)
**Pass condition:** All 5 metrics within ±15% of expected

## Mission

This is the final checkpoint. Testing is complete. The release manager is waiting for your sign-off document before deploying TaskForge 2.0 to production. You also need to compute the release quality metrics and select the regression suite.

## The situation

Use this fictional test execution data to fill in the sign-off:

- **Total test cases planned:** 52
- **Executed:** 50 (2 blocked due to a staging environment issue — now resolved)
- **Passed:** 47
- **Failed:** 3 (all 3 bugs filed; see below)
- **Exploratory sessions completed:** 2 of 2
- **API regression collection:** Ran — 12 of 12 assertions passing
- **Open defects:**
  - BUG-001 (Medium) — past due date accepted without warning — Status: Open — Risk: Low (cosmetic, no data loss)
  - BUG-005 (Medium) — bulk delete includes completed tasks — Status: Open — Risk: Medium (accidental data deletion possible)
  - BUG-006 (Critical) — API key page accessible without re-auth — Status: Fixed, pending verification

Use this data to write a realistic, well-reasoned sign-off document.

## Deliverable 1 — sign-off.md

A completed `starter/sign-off.md` with all 6 sections filled in. Reviewed manually.

## Deliverable 2 — metrics.yaml

Open `starter/execution-data.yaml`. Compute each metric from the raw data and enter it in `starter/metrics.yaml`. Round to 1 decimal place, express rates as percentages.

The 5 metrics:
- **Defect density** = total defects found ÷ story points tested
- **Pass rate** = tests passed ÷ total tests × 100
- **Escape rate** = defects that reached production ÷ total defects × 100
- **Average bug age** = mean of all resolution times in days
- **MTTR** (Mean Time To Resolve) = same as average bug age for this data set

Run `node validate-metrics.js` locally to check your numbers.

## Deliverable 3 — regression-suite.yaml

Select 15 test cases from your Ex04 test-cases.yaml for the smoke suite, plus 5 more for full regression. Explain your selection rationale in the `rationale` fields.

## How to verify

- Run `node validate-metrics.js` in the `starter/` directory. All 5 lines should show a green tick.
- Review `sign-off.md` — all 6 sections present, numbers from the situation, explicit GO/NO-GO.
- Review `regression-suite.yaml` — 15 smoke tests + 5 regression additions selected with rationale.

## Pass condition

- **Primary:** `node validate-metrics.js` exits 0 (all 5 metrics within ±15% of expected).
- **Secondary:** `sign-off.md` and `regression-suite.yaml` reviewed manually.
