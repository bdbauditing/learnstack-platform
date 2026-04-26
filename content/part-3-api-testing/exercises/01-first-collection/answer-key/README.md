# Grader Notes — Exercise 01

Grader runs: `newman run collection.json --environment environment.json`

Pass conditions:
- Exit code 0
- Output contains "requests executed"
- Output does NOT contain "AssertionError" or "test failed"

Minimum requests: 5. If fewer than 5 requests exist, the "requests executed" pattern will not be satisfied for GET/POST/GET/PUT/DELETE.

The grader does NOT inspect collection internals — it trusts Newman's exit code.
