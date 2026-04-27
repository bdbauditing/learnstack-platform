# Grader Notes — Exercise 05

**Grader:** `script-runs` (Newman)
**Pass:** Newman exits 0 with "iterations" in stdout.

Newman runs: `newman run collection.json --environment environment.json --iteration-data data.csv`

The `data.csv` has 10 rows:

| Row | email | expected_status | scenario |
|-----|-------|----------------|----------|
| 1–6 | alice/bob/carol/dave/eve/frank @taskforge.io | 200 | valid-credentials |
| 7 | alice@taskforge.io (wrong password) | 401 | wrong-password |
| 8 | (empty) | 400 | missing-email |
| 9 | `' OR '1'='1' --` | 400 | sql-injection-payload |
| 10 | expired@taskforge.io | 401 | expired-account |

**Common failure patterns:**
- Learner uses `pm.response.code` as a string — fix: `parseInt(data.expected_status)`
- Collection references `{{title}}`/`{{priority}}` from old task-creation stub — must be `{{email}}`/`{{password}}`
- Missing `--iteration-data` flag — "iterations" won't appear; requiredOutputPattern fails
- SQL-injection row causes server 500 instead of 400 — server-side bug, not a learner error (note in debrief)
