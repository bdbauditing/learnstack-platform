# Node.js & Express

Welcome to Part 2. You will build your first HTTP servers using Node.js and the Express framework — progressing from a single-route hello-world app to a fully validated REST API.

## Learning Goals

- Understand the Node.js event loop and why it is non-blocking
- Create an Express app and define routes with path and query parameters
- Write and compose Express middleware
- Build a complete in-memory CRUD API (GET, POST, PUT, DELETE)
- Handle errors with dedicated error middleware

## Exercises

| # | Slug | Type | Description |
|---|------|------|-------------|
| 1 | `01-hello-express` | test-runner | GET /hello and GET /health endpoints |
| 2 | `02-routing-params` | test-runner | Route params and query strings |
| 3 | `03-middleware` | test-runner | Request logger + JSON body parser |
| 4 | `04-json-crud` | test-runner | In-memory CRUD for notes |
| 5 | `05-error-handling` | test-runner | 404 + 500 error middleware |
| 6 | `06-capstone-rest-api` | test-runner | Full validated todo REST API |

## Prerequisites

- Node.js 18+ installed
- Part 1 completed (especially async/await)
- Basic understanding of what HTTP methods do

## Setup

Each exercise has its own `package.json`. Run `npm install` inside the `starter/` directory before running tests.
