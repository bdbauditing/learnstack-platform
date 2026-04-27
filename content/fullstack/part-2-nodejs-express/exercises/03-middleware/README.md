# Exercise 03 — Middleware

## Overview

Middleware is the glue of Express apps. In this exercise you will write two pieces of custom middleware: a request logger and a request-ID injector. You will also test that `express.json()` correctly parses request bodies.

## Your Task

Implement the Express app in `starter/src/index.js`.

### Middleware to Implement

1. **Request Logger** (`requestLogger`): Logs each request in the format:
   ```
   [<timestamp>] <METHOD> <path>
   ```
   Also attaches `req.requestTime = new Date().toISOString()` so routes can use it.

2. **Request ID** (`addRequestId`): Generates a unique request ID (use a simple incrementing counter is fine) and attaches it as both `req.requestId` and a response header `X-Request-Id`.

### Endpoints to Implement

| Method | Path | Behaviour |
|--------|------|-----------|
| GET | `/ping` | Return `{ pong: true, requestId: req.requestId, time: req.requestTime }` |
| POST | `/echo-body` | Return the parsed JSON body back as-is (use `express.json()` middleware) |
| GET | `/headers` | Return `{ headers: req.headers }` |

### Important

- Apply `requestLogger` and `addRequestId` globally (via `app.use()`) before routes
- Apply `express.json()` before POST routes that need `req.body`

## Running the Tests

```bash
cd starter
npm install
npm test
```

## Grading

- Grader: `test-runner`
