# Starter — Exercise 06: API Regression Collection

Follow these steps in order.

## Step 1 — Understand the structure

Open `collection.json`. You will see a Postman Collection v2.1 JSON file with 4 placeholder folders: Auth, Tasks, Search, and Negative Tests. Each folder has one skeleton request with TODO comments.

Your job is to replace the skeletons with real, working requests and fill in the test scripts.

## Step 2 — Install Newman (if not already installed)

```bash
npm install -g newman
# or use npx (no install required):
npx newman --version
```

## Step 3 — Update the environment

Open `environment.json`. Replace the `baseUrl` TODO with the TaskForge 2.0 staging URL. Replace the email and password TODOs with real test credentials.

If you do not have staging access, leave the TODOs in place — the grader environment supplies the real values automatically.

## Step 4 — Build the Auth folder

You need 2 requests:

### Request 1 — Login

- Method: `POST`
- URL: `{{baseUrl}}/api/auth/login`
- Body (JSON): `{ "email": "{{testUserEmail}}", "password": "{{testUserPassword}}" }`
- Test script:
  ```javascript
  pm.test('Login returns 200', () => pm.response.to.have.status(200));
  pm.test('Response has access_token', () => {
    const json = pm.response.json();
    pm.expect(json).to.have.property('access_token');
    pm.collectionVariables.set('access_token', json.access_token);
  });
  ```

### Request 2 — Refresh token

- Method: `POST`
- URL: `{{baseUrl}}/api/auth/refresh`
- Header: `Authorization: Bearer {{access_token}}`
- Test script: assert status 200 and that a new `access_token` is returned.

## Step 5 — Build the Tasks folder (CRUD)

You need 5 requests in this order (they chain together using collection variables):

1. **GET /api/tasks** — list tasks, assert status 200 and response is an array.
2. **POST /api/tasks** — create a task, assert status 201, save the task ID to `{{task_id}}`.
3. **GET /api/tasks/{{task_id}}** — read the task back, assert status 200 and the title matches.
4. **PUT /api/tasks/{{task_id}}** — update the task title, assert status 200.
5. **DELETE /api/tasks/{{task_id}}** — delete the task, assert status 204 or 200.

All task requests need the `Authorization: Bearer {{access_token}}` header.

## Step 6 — Build the Search folder

1. **GET /api/tasks/search?q=test** — search with a keyword.
   - Header: `Authorization: Bearer {{access_token}}`
   - Test script: assert status 200, response is an array.

## Step 7 — Build the Negative Tests folder

1. **GET /api/tasks with invalid token** — send an invalid Bearer token.
   - Header: `Authorization: Bearer invalid-token-xyz`
   - Test script: assert status 401.

You now have at least 9 requests. Add 3 more to reach the 12 minimum — ideas:
- GET /api/tasks with no auth header (expect 401)
- POST /api/tasks with missing required fields (expect 400 or 422)
- GET /api/tasks/:id with a non-existent ID (expect 404)

## Step 8 — Run the collection

```bash
npx newman run collection.json --environment environment.json
```

Fix any failing tests. When all tests pass, the run exits 0.

## Common mistakes

- **Forgetting to set the collection variable** — if you do not call `pm.collectionVariables.set('access_token', ...)` in the login test, all subsequent requests will use an empty token and return 401.
- **Test order matters** — Newman runs requests in order. Create before Read, Read before Update, Update before Delete.
- **Auth header format** — must be exactly `Bearer <token>` with a capital B and a space. `bearer` or `Bearer<token>` will fail.
- **Empty test scripts** — a request with no passing assertions does not count toward your coverage. Every request needs at least one `pm.test(...)` call that actually asserts something.

## Hints

- Use `pm.collectionVariables.set(key, value)` to pass data between requests (e.g., the task ID from the create response to the read/update/delete requests).
- `pm.response.json()` parses the response body as JSON. Call it inside a test and assign to a variable before asserting properties.
- If an endpoint returns an empty body on success (like a 204 for DELETE), do not try to parse the body — just assert the status code.
