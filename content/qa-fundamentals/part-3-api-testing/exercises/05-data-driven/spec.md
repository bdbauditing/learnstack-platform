# Exercise 05 Spec — Data-Driven Testing

## Endpoint under test

`POST /auth/login` — accepts `{ "email": "...", "password": "..." }` in the request body.

## CSV columns (provided in starter/data.csv)

| Column | Values |
|--------|--------|
| `email` | valid address, empty string, or injection payload |
| `password` | correct credential, wrong credential, or arbitrary string |
| `expected_status` | `200` (valid login) or `400`/`401` (rejected) |
| `scenario` | human-readable label — use in `pm.test()` name for readable output |

## Row breakdown (10 rows total)

| Rows | expected_status | Scenario |
|------|----------------|----------|
| 1–6  | 200 | Six distinct users with correct credentials |
| 7    | 401 | Known user, wrong password |
| 8    | 400 | Missing email field (empty string) |
| 9    | 400 | SQL-injection-style payload in the email field |
| 10   | 401 | Expired account — valid format, credentials rejected |

## Required Postman test (Tests tab)

```javascript
pm.test("Status matches expected for: " + data.scenario, function () {
  pm.expect(pm.response.code).to.equal(parseInt(data.expected_status));
});
```

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
    - "--iteration-data"
    - "data.csv"
  requiredOutputPatterns:
    - "iterations"
  forbiddenOutputPatterns:
    - "AssertionError"
    - "test failed"
```
