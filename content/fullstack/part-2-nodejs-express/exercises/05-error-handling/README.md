# Exercise 05 — Error Handling Middleware

## Overview

Proper error handling keeps your API from leaking stack traces and crashing on unexpected input. In this exercise you will implement a 404 catch-all and a global 500 error handler using Express's 4-argument error middleware pattern.

## Your Task

Implement the Express app in `starter/src/index.js`.

### Routes to Implement

| Method | Path | Behaviour |
|--------|------|-----------|
| GET | `/ok` | Return `{ status: "ok" }` with 200 |
| GET | `/fail` | Call `next(new Error("Something broke"))` — let the error handler deal with it |
| GET | `/fail-custom` | Create an error with `.status = 422` and `.message = "Unprocessable"`, then call `next(err)` |

### Middleware to Implement

1. **404 handler** — registered after all routes; returns `{ error: "Not Found" }` with status 404
2. **Global error handler** — 4-argument `(err, req, res, next)`; returns `{ error: err.message }` with status `err.status || 500`

### Order Matters!

```
Routes → 404 handler → Global error handler
```

## Running the Tests

```bash
cd starter
npm install
npm test
```

## Grading

- Grader: `test-runner`
