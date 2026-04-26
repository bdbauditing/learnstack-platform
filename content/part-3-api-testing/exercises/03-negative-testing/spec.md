# Exercise 03 Spec — Negative Testing

## 6 Required Cases

| Case | Endpoint | Deliberate error | Expected status |
|------|----------|-----------------|-----------------|
| NEG-001 | Any protected endpoint | Authorization: Bearer invalidtoken123 | 401 |
| NEG-002 | POST /tasks | Body missing "title" field | 400 |
| NEG-003 | GET /admin/users | Valid token, non-admin user | 403 |
| NEG-004 | GET /tasks/99999999 | Non-existent resource ID | 404 |
| NEG-005 | POST /tasks | Body: `{"title": "test"` (malformed JSON, missing closing brace) | 400 |
| NEG-006 | POST /auth/login | Correct email, wrong password | 401 |

## Grader Config

```yaml
grader: script-runs
submissionFile: collection.json
options:
  scriptType: newman
  expectedExitCode: 0
  args:
    - "--environment"
    - "environment.json"
  requiredOutputPatterns:
    - "6 requests"
  forbiddenOutputPatterns:
    - "AssertionError"
    - "test failed"
```

## Pass Conditions
- Exactly 6 negative cases present
- All pm.test() assertions pass
- Each case asserts BOTH status code AND non-empty error body
