# Grader Notes — Exercise 07

Grader: bug-match against violations-expected.yaml (which uses the bug-match schema for consistency).

The learner submits violations.yaml but the grader reads it as a bugs.yaml-equivalent. The violation "location" field maps to the endpoint path.

All 3 must be identified. Keywords are generous:
- VIO-001: "priority" + ("integer"/"number"/"int") + ("string"/"text")
- VIO-002: "created_at" + ("missing"/"absent"/"not present"/"not returned")
- VIO-003: "completed" + ("boolean"/"bool"/"true/false") + ("string"/"text"/"quoted")
