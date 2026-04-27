# Exercise 01 — Hello Express

## Overview

Your first Express server. You will create two endpoints that confirm the server is running correctly.

## Your Task

Implement the Express app in `starter/src/index.js`.

### Endpoints to Implement

| Method | Path | Response |
|--------|------|----------|
| GET | `/hello` | `{ "message": "Hello, World!" }` with status 200 |
| GET | `/health` | `{ "status": "ok", "timestamp": "<ISO string>" }` with status 200 |

### Rules

- Export `app` from `src/index.js` — **do not** call `app.listen()` in the file (tests handle that)
- Use `res.json()` to send JSON responses
- The `timestamp` in `/health` should be a new `Date().toISOString()` at the time of the request

## Running the Tests

```bash
cd starter
npm install
npm test
```

## Grading

- Grader: `test-runner`
