# Answer Key — Exercise 06: API Regression Collection

## Grader config (authoritative)

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
    - "iterations"
```

## Grader notes

- The grader runs `npx newman run collection.json --environment environment.json` from the `starter/` directory.
- The grader environment overrides `baseUrl`, `testUserEmail`, and `testUserPassword` with real staging values.
- A pass requires: exit code 0 (all Newman tests pass) AND the string `iterations` in stdout.
- Newman always prints `iterations: 1` in the summary line, so the `requiredOutputPatterns` check is effectively a check that Newman ran at all.
- If a learner submits a collection with no test scripts (just requests), Newman exits 0 but there are no assertions — this is a structural pass but a QA quality fail. Flag for staff review if the grader passes but the collection has zero `pm.test(...)` calls.

## Required coverage checklist

- [ ] Auth: POST /api/auth/login — asserts 200 and saves access_token
- [ ] Auth: POST /api/auth/refresh — asserts 200 and new token returned
- [ ] Tasks: GET /api/tasks — asserts 200 and array response
- [ ] Tasks: POST /api/tasks — asserts 201 and saves task_id
- [ ] Tasks: GET /api/tasks/:id — asserts 200 and correct data
- [ ] Tasks: PUT /api/tasks/:id — asserts 200 and updated data
- [ ] Tasks: DELETE /api/tasks/:id — asserts 2xx
- [ ] Search: GET /api/tasks/search?q= — asserts 200 and array response
- [ ] Negative: any endpoint with invalid token — asserts 401
- [ ] 3 additional requests with assertions to reach minimum of 12 total

## Common learner mistakes

- Not saving `access_token` from the login response — all subsequent requests fail with 401.
- Wrong collection variable syntax — use `{{access_token}}` in request headers, not `{{token}}` or any other name.
- Test execution order — DELETE runs before GET/PUT because requests were added in wrong order.
- Hardcoding task IDs instead of using collection variables — works locally but fails in the grader environment where IDs differ.
