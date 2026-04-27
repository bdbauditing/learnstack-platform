# Grader Notes — Exercise 06

Two-stage grading:
1. Newman exits 0 (collection passes with adjusted threshold)
2. perf-findings.yaml has realistic values: measured_time_ms > 500, slow_endpoint = "GET /reports/export" or similar, recommendation non-empty

Common issue: learner sets all thresholds to 99999ms (everything passes but defeats the purpose). Check that the fast endpoints still have reasonable thresholds (< 2000ms) even if the slow one is higher.
