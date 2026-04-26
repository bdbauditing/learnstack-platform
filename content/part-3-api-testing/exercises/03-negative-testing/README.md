# Exercise 03 — Negative Testing

**Time:** ~35 minutes
**Grader:** script-runs (Newman)
**Pass threshold:** Newman exits 0 (all 6 negative cases pass their assertions)

## Your mission

Write a Postman collection with **6 negative test cases** for the tasks API. Each case must:
1. Send a deliberately invalid or unauthorized request
2. Assert the correct error status code
3. Assert that the response body contains an error message (not an empty body)

## The 6 cases required

| Case | What to send | Expected status |
|------|-------------|-----------------|
| 1 | Request with invalid/expired JWT token | 401 |
| 2 | POST /tasks with missing required `title` field | 400 |
| 3 | GET /tasks as a non-admin user accessing admin-only endpoint | 403 |
| 4 | GET /tasks/99999999 (non-existent ID) | 404 |
| 5 | POST /tasks with a body that is not valid JSON | 400 |
| 6 | POST /auth/login with expired credentials | 401 |

## What a good negative test looks like

```javascript
pm.test("Status is 401 for invalid token", function() {
    pm.response.to.have.status(401);
});
pm.test("Error body is present", function() {
    const body = pm.response.json();
    pm.expect(body).to.have.property('error');
    pm.expect(body.error).to.not.be.empty;
});
```

## Deliverable

`starter/collection.json` + `starter/environment.json`
