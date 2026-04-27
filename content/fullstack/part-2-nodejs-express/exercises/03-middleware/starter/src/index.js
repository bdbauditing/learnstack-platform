const express = require('express');

const app = express();

// TODO: requestLogger middleware
// - Logs: "[<ISO timestamp>] <METHOD> <path>" to console
// - Attaches req.requestTime = new Date().toISOString()
// - Calls next()
function requestLogger(req, res, next) {
  // TODO: implement
}

// TODO: addRequestId middleware
// - Uses a counter (module-level let idCounter = 0) incremented each request
// - Attaches req.requestId = `req-${idCounter}` (e.g. "req-1", "req-2")
// - Sets response header: res.setHeader('X-Request-Id', req.requestId)
// - Calls next()
let idCounter = 0;
function addRequestId(req, res, next) {
  // TODO: implement
}

// TODO: Apply express.json() globally
// TODO: Apply requestLogger globally
// TODO: Apply addRequestId globally

// TODO: GET /ping
// Return: { pong: true, requestId: req.requestId, time: req.requestTime }

// TODO: POST /echo-body
// Return the parsed req.body back as JSON (whatever was sent)

// TODO: GET /headers
// Return: { headers: req.headers }

module.exports = app;
