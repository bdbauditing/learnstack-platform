# Exercise 07 — Traceability Matrix

> **Note:** This exercise uses a hypothetical product spec to practice the traceability technique. You don't need to open TaskForge — focus on the mapping exercise itself.

**Technique focus:** Requirements Traceability

**Time:** ~30 minutes
**Grader:** structured-doc
**Pass threshold:** all links valid (every req ≥1 test, every defect links to a test)

## Your mission

You are given:
- 12 requirements (REQ-001 to REQ-012) in `starter/requirements.yaml`
- 25 test cases (TC-001 to TC-025) in `starter/test-cases.yaml`
- 8 defects (DEF-001 to DEF-008) in `starter/defects.yaml`

Build a traceability matrix in `starter/traceability.yaml` that links:
1. Each requirement to the test cases that cover it (at least 1 per req)
2. Each defect to the test case that would catch it

## Pass Conditions

- Every requirement has at least 1 test case linked
- Every defect is linked to at least 1 test case
- No duplicate links
