const express = require('express');

const app = express();
app.use(express.json());

const VALID_PRIORITIES = ['low', 'medium', 'high'];

// In-memory store
let todos = [];
let nextId = 1;

// Helper: find todo by id
function findTodo(id) {
  return todos.find(t => t.id === id);
}

// TODO: GET /todos
// Return all todos.
// Support optional query filters:
//   ?completed=true  → return only completed todos
//   ?completed=false → return only incomplete todos
//   ?priority=high   → return only todos with that priority
// Multiple filters can combine (AND logic).

// TODO: GET /todos/:id
// Return todo or 404.

// TODO: POST /todos
// Validate:
//   - title: required, non-empty string → 400 if missing
//   - priority: if provided, must be in VALID_PRIORITIES → 400 if invalid
// Create todo with defaults: description="", priority="medium", completed=false
// Return 201 + created todo.

// TODO: PUT /todos/:id
// Validate same as POST (title required).
// Replace all mutable fields.
// Set updatedAt = new Date().toISOString()
// Return 200 + updated todo or 404.

// TODO: PATCH /todos/:id
// Only update provided fields.
// Validate priority if provided.
// Set updatedAt = new Date().toISOString()
// Return 200 + updated todo or 404.

// TODO: DELETE /todos/:id
// Remove todo.
// Return 204 or 404.

// TODO: 404 handler
// Return { error: "Not Found" } with 404.

// TODO: Global error handler
// Return { error: err.message } with err.status || 500.

module.exports = app;
