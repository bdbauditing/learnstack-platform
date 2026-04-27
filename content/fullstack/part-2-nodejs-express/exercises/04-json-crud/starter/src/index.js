const express = require('express');

const app = express();
app.use(express.json());

// In-memory store
let notes = [];
let nextId = 1;

// TODO: GET /notes
// Return all notes as a JSON array.

// TODO: GET /notes/:id
// Find the note by id (parse :id as integer).
// Return 200 + note if found.
// Return 404 + { error: "Note not found" } if not found.

// TODO: POST /notes
// Read { content } from req.body.
// Validate: if content is missing or empty string, return 400 + { error: "content is required" }
// Create a new note: { id: nextId++, content, done: false, createdAt: new Date().toISOString() }
// Push it to notes array and return 201 + the new note.

// TODO: PUT /notes/:id
// Find the note by id.
// If not found, return 404 + { error: "Note not found" }
// Update the note with { content, done } from req.body (only update fields that are provided).
// Return 200 + the updated note.

// TODO: DELETE /notes/:id
// Find and remove the note by id.
// If not found, return 404 + { error: "Note not found" }
// If deleted, return 204 with no body (use res.status(204).send()).

module.exports = app;
