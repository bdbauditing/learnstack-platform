const express = require('express');

const app = express();
app.use(express.json());

// TODO: GET /ok
// Return { status: "ok" } with status 200.

// TODO: GET /fail
// Do NOT return a response directly.
// Instead, create a new Error("Something broke") and call next(err).
// The global error handler should catch it.

// TODO: GET /fail-custom
// Create an error: const err = new Error("Unprocessable")
// Set err.status = 422
// Call next(err)

// TODO: 404 handler
// Add a middleware AFTER all routes above that handles unknown paths.
// Return { error: "Not Found" } with status 404.

// TODO: Global error handler
// Add a 4-argument error middleware as the LAST app.use() call.
// It should return { error: err.message } with status err.status || 500.

module.exports = app;
