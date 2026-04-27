# Exercise 07 — API Regression Collection

**Technique focus:** API Regression Testing (Newman)

**Time:** 40 min

## Mission

The TaskForge 2.0 API must be regression-tested before every release. In this exercise, you build a Postman collection that covers the critical API paths: authentication, task CRUD operations, search, and at least one negative test. The collection runs with Newman — the command-line Postman runner.

## What the collection must cover

- **Auth**: login endpoint (get a token), token refresh
- **Tasks**: create a task, read it back, update it, delete it (full CRUD)
- **Search**: search endpoint with a keyword
- **Negative test**: at least one request with an invalid token that expects a 401 response

Minimum 12 requests total, each with at least one assertion (test script).

## TaskForge 2.0 API — reference

Base URL: `{{baseUrl}}` (set in the environment file)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Authenticate, returns `access_token` |
| POST | `/api/auth/refresh` | Refresh token |
| GET | `/api/tasks` | List tasks |
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks/:id` | Get task by ID |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/tasks/search?q=keyword` | Search tasks |

All authenticated endpoints require the header: `Authorization: Bearer {{access_token}}`

## Deliverable

- A completed `starter/collection.json` — a valid Postman Collection v2.1 JSON file with at least 12 requests, each containing test scripts.
- The existing `starter/environment.json` may be updated to add variables, but `baseUrl` must remain.

## How to verify locally

If you have Newman installed:

```bash
cd starter/
npx newman run collection.json --environment environment.json
```

The output should show `iterations: 1` and all tests passing.

## Pass condition

- `npx newman run collection.json --environment environment.json` exits with code 0.
- The output includes the word `iterations`.
