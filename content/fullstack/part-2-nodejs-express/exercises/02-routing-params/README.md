# Exercise 02 — Route Parameters and Query Strings

## Overview

Real APIs use dynamic route segments (`:id`) and query strings (`?key=value`) to identify and filter resources. In this exercise you will build endpoints that demonstrate both patterns.

## Your Task

Implement the Express app in `starter/src/index.js`.

### Endpoints to Implement

| Method | Path | Behaviour |
|--------|------|-----------|
| GET | `/items` | Return all items. If `?category=<cat>` is provided, filter by category |
| GET | `/items/:id` | Return item with matching `id` (integer). Return 404 if not found |
| GET | `/items/:id/label` | Return `{ label: "Item #<id>" }` |
| GET | `/echo` | Return `{ query: req.query }` — echo back all query params |

### Sample Data (hard-code this in your app)

```js
const items = [
  { id: 1, name: 'Widget', category: 'hardware' },
  { id: 2, name: 'Sprocket', category: 'hardware' },
  { id: 3, name: 'Notebook', category: 'stationery' },
  { id: 4, name: 'Pen', category: 'stationery' },
];
```

## Running the Tests

```bash
cd starter
npm install
npm test
```

## Grading

- Grader: `test-runner`
