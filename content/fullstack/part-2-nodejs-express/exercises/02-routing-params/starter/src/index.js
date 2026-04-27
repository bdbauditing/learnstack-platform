const express = require('express');

const app = express();

// Sample data — do not modify
const items = [
  { id: 1, name: 'Widget', category: 'hardware' },
  { id: 2, name: 'Sprocket', category: 'hardware' },
  { id: 3, name: 'Notebook', category: 'stationery' },
  { id: 4, name: 'Pen', category: 'stationery' },
];

// TODO: GET /items
// Return all items as JSON.
// If query param ?category=<cat> is present, return only items matching that category.
// Example: GET /items?category=hardware → returns items 1 and 2

// TODO: GET /items/:id
// Parse :id as an integer.
// Find the item with matching id.
// If found, return it with status 200.
// If not found, return { error: "Item not found" } with status 404.

// TODO: GET /items/:id/label
// Return { label: "Item #<id>" } where <id> is the route param (as a string is fine).
// If the item doesn't exist, return 404.

// TODO: GET /echo
// Return { query: req.query } — echo back all query string parameters.

module.exports = app;
