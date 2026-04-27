# Grader Notes — Exercise 05

**Grader:** `set-overlap-match`
**Answer key:** `regression-expected.yaml` (`expected_ids` list + `pass_threshold: 8`)

The grader computes SET INTERSECTION — how many of the 10 expected IDs appear anywhere in the learner's submission. **Order does not matter.**

**Pass:** 8 or more of the 10 expected IDs present in the submission.

**Example grader output:**
```
Overlap: 9/10 (need 8) ✓ PASS
Matched: TC-006, TC-007, TC-008, TC-009, TC-010, TC-011, TC-013, TC-001, TC-002
Missing: TC-014
Extra:   TC-015
```

**Must-have IDs:** TC-006, TC-007, TC-008, TC-009 (directly impacted by checkout changes) and TC-013, TC-014 (new profile features). Missing both new feature tests is the most common failure pattern.

**Extra IDs** beyond the 10 (e.g. TC-005) do not penalize — only missing expected IDs count against the score.
