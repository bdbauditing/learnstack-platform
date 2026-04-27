# Exercise 04 — In-Memory JSON CRUD

## Overview

Build a complete Create-Read-Update-Delete API for a notes resource stored in memory. This is the standard pattern for all REST APIs — the only thing that changes later is the storage layer (database instead of an array).

## Your Task

Implement the Express app in `starter/src/index.js`.

### Data Model

```js
// Note object
{
  id: 1,               // auto-incremented integer
  content: "Buy milk", // string (required)
  done: false,         // boolean, default false
  createdAt: "..."     // ISO timestamp set at creation
}
```

### Endpoints to Implement

| Method | Path | Behaviour | Success Status |
|--------|------|-----------|----------------|
| GET | `/notes` | Return array of all notes | 200 |
| GET | `/notes/:id` | Return single note or 404 | 200 |
| POST | `/notes` | Create note from `{ content }` body | 201 |
| PUT | `/notes/:id` | Replace note fields (`content`, `done`) | 200 |
| DELETE | `/notes/:id` | Delete note | 204 (no body) |

### Validation

- `POST /notes`: if `content` is missing or empty string, return `{ error: "content is required" }` with status 400.
- `PUT /notes/:id`: if note not found, return 404.

## Running the Tests

```bash
cd starter
npm install
npm test
```

## Grading

- Grader: `test-runner`
