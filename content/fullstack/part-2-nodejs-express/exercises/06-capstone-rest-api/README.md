# Exercise 06 — Capstone: Validated Todo REST API

## Overview

You now know routing, middleware, CRUD, and error handling. In this capstone exercise you will combine everything to build a production-quality in-memory REST API for a todo list — complete with input validation, proper status codes, and error middleware.

## Your Task

Implement the Express app in `starter/src/index.js`.

### Data Model

```js
// Todo object
{
  id: 1,
  title: "Buy groceries",     // required string, min 1 char
  description: "",            // optional string, default ""
  priority: "medium",         // "low" | "medium" | "high", default "medium"
  completed: false,           // boolean, default false
  createdAt: "...",           // ISO timestamp
  updatedAt: "..."            // ISO timestamp, updated on PUT/PATCH
}
```

### Endpoints

| Method | Path | Notes |
|--------|------|-------|
| GET | `/todos` | List all; support `?completed=true/false` filter and `?priority=low/medium/high` filter |
| GET | `/todos/:id` | Single todo or 404 |
| POST | `/todos` | Validate: title required, priority must be valid enum |
| PUT | `/todos/:id` | Replace all mutable fields; validate same as POST |
| PATCH | `/todos/:id` | Update only provided fields; validate enum if priority provided |
| DELETE | `/todos/:id` | 204 no body |

### Validation Rules

- `title`: required on POST and PUT (not on PATCH); must not be empty string
- `priority`: if provided, must be one of `["low", "medium", "high"]`
- Return `{ error: "<message>" }` with status 400 for validation failures

### Required Middleware

- `express.json()`
- 404 handler
- Global error handler

## Running the Tests

```bash
cd starter
npm install
npm test
```

## Grading

- Grader: `test-runner`
