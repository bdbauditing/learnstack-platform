# Exercise 06 — Spec

## Grader config

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

## Detailed requirements

1. The submission file is `collection.json` in the `starter/` directory.
2. The file must be a valid Postman Collection v2.1 JSON document.
3. The collection must contain at least 12 requests.
4. Each request must have at least one test script (Postman test written in the `event` array with `listen: "test"`).
5. The collection must cover: authentication (login + token refresh), task CRUD (create, read, update, delete), search, and at least one 401 negative test.
6. The `environment.json` file must remain present with a `baseUrl` variable.
7. The grader runs: `npx newman run collection.json --environment environment.json`
8. The run must exit with code 0 (all tests pass).
9. The stdout must include the word `iterations`.

## Grader notes

The grader environment supplies the real `baseUrl` and credentials via the environment file override. The `environment.json` in the starter has `baseUrl` set to `TODO: hostname` — the grader replaces this value before running.

Because the grader runs against a real or mock API, the collection must use the correct endpoint paths. The API reference in the exercise README is authoritative.

If the collection has tests that assert specific response bodies (e.g., `pm.expect(jsonData.title).to.eql("My Task")`), those assertions must be robust to variations in test data. Prefer asserting response status codes and structural properties rather than hardcoded values.
