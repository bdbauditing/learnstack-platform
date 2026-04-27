const express = require('express');

const app = express();

// TODO: Implement GET /hello
// Should respond with JSON: { message: "Hello, World!" }
// Status code: 200

// TODO: Implement GET /health
// Should respond with JSON: { status: "ok", timestamp: <current ISO string> }
// Status code: 200
// Hint: use new Date().toISOString() for the timestamp

// Export the app so tests can import it without starting the server
module.exports = app;
