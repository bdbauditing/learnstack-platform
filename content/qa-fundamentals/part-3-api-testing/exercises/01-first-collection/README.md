# Exercise 01 — First Collection: CRUD

**Time:** ~35 minutes
**Grader:** script-runs (Newman)
**Pass threshold:** Newman exits 0 (all pm.test assertions pass)

## Your mission

Build a Postman collection that performs full CRUD operations against a tasks API.

## The API

Base URL: **TODO: actual API URL** (e.g. `https://api.taskforge.dev`)

Endpoints to test:
- `GET /tasks` — list all tasks
- `POST /tasks` — create a task
- `GET /tasks/:id` — get a single task
- `PUT /tasks/:id` — replace a task
- `DELETE /tasks/:id` — delete a task

## Requirements

Your collection must have **at least 5 requests** with `pm.test()` assertions on every request. Minimum assertions per request:

| Request | Required assertions |
|---------|---------------------|
| GET /tasks | Status 200, response is array |
| POST /tasks | Status 201, response has `id` field |
| GET /tasks/:id | Status 200, id matches created task |
| PUT /tasks/:id | Status 200, updated field is reflected in response |
| DELETE /tasks/:id | Status 204 or 200 |

## Deliverable

`starter/collection.json` — exported Postman collection v2.1
`starter/environment.json` — exported environment with `base_url` variable

## How to test locally

```bash
newman run starter/collection.json --environment starter/environment.json
```

**Pass = Newman exits with code 0.**
