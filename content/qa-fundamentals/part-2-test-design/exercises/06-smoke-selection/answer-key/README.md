# Grader Notes — Exercise 06

**Grader:** `set-overlap-match`
**Answer key:** `smoke-expected.yaml` (`expected_ids` list + `pass_threshold: 4`)

The grader computes SET INTERSECTION. **Order does not matter.**

**Pass:** 4 or more of the 5 expected IDs present in the submission.

**Example grader output:**
```
Overlap: 4/5 (need 4) ✓ PASS
Matched: TC-001, TC-003, TC-005, TC-010
Missing: TC-006
Extra:   TC-007
```

**Must-haves:** TC-001 (login gate) and TC-010 (API health). Without both, the smoke suite cannot determine if the app is reachable or if the backend is up.

**Acceptable alternates:** TC-004 for TC-003; TC-007 or TC-016 for TC-005.
