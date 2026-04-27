# Part 2 Concepts: Node.js & Express

## 1. The Node.js Event Loop

Node.js runs JavaScript on V8 (the same engine as Chrome) outside the browser. It uses a **single-threaded event loop** that handles thousands of concurrent connections without spawning OS threads for each one.

### How it works

```
   ┌─────────────────────────────┐
   │      Node.js Process        │
   │                             │
   │  ┌─────────┐  ┌──────────┐  │
   │  │  Call   │  │ Event    │  │
   │  │  Stack  │  │ Queue    │  │
   │  └────┬────┘  └────┬─────┘  │
   │       │             │        │
   │       └──Event Loop─┘        │
   │                             │
   │  ┌─────────────────────┐    │
   │  │  libuv (I/O, timers)│    │
   │  └─────────────────────┘    │
   └─────────────────────────────┘
```

Key insight: **I/O operations never block the call stack**. When you call `fs.readFile()`, Node hands it to libuv (a C library), which calls the OS. When the OS is done, it pushes a callback onto the event queue. The event loop picks it up when the call stack is empty.

### Why this matters for servers

A traditional Apache/PHP server might spawn a thread per request. Node serves all requests on one thread — so you must **never block the event loop** with heavy computation (use worker threads or offload to a service instead).

---

## 2. Express: Routing Basics

Install: `npm install express`

```js
const express = require('express');
const app = express();

// GET /
app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// Listen on port 3000
app.listen(3000, () => console.log('Server running on port 3000'));
```

### Route Methods

```js
app.get('/items', handler);
app.post('/items', handler);
app.put('/items/:id', handler);
app.patch('/items/:id', handler);
app.delete('/items/:id', handler);
```

### Route Parameters

```js
// :id is a dynamic segment captured in req.params
app.get('/users/:id', (req, res) => {
  const { id } = req.params; // string — always parse if you need a number
  res.json({ userId: parseInt(id) });
});
```

### Query Strings

```js
// GET /search?q=node&limit=10
app.get('/search', (req, res) => {
  const { q, limit = '20' } = req.query; // req.query contains all ?key=value pairs
  res.json({ query: q, limit: parseInt(limit) });
});
```

---

## 3. Middleware

Middleware functions sit between the incoming request and the final route handler. They have the signature `(req, res, next)`.

### Built-in Express Middleware

```js
// Parse JSON request bodies — required for POST/PUT with JSON
app.use(express.json());

// Serve static files
app.use(express.static('public'));
```

### Writing Custom Middleware

```js
// Request logger
function logger(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next(); // IMPORTANT: always call next() or send a response
}

app.use(logger); // applies to every route below this line
```

### Middleware Order Matters

```
Request → logger → express.json() → route handler → Response
```

If a middleware doesn't call `next()` and doesn't send a response, the request hangs forever.

### Route-Specific Middleware

```js
function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/dashboard', requireAuth, (req, res) => {
  res.json({ page: 'dashboard' });
});
```

---

## 4. Building a JSON CRUD API

### In-Memory Store Pattern

For exercises without a database, keep data in a module-level array:

```js
let notes = [];
let nextId = 1;

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { content } = req.body;
  const note = { id: nextId++, content, createdAt: new Date().toISOString() };
  notes.push(note);
  res.status(201).json(note);
});

app.put('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  notes[idx] = { ...notes[idx], ...req.body };
  res.json(notes[idx]);
});

app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const before = notes.length;
  notes = notes.filter(n => n.id !== id);
  if (notes.length === before) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});
```

---

## 5. Error Handling Middleware

Express error middleware takes **4 parameters** — the first being `err`:

```js
// 404 handler — put AFTER all routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// 500 handler — put LAST, 4-param signature tells Express it's an error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});
```

To trigger the error handler from a route:

```js
app.get('/broken', (req, res, next) => {
  const err = new Error('Something went wrong');
  err.status = 500;
  next(err); // passes to error middleware
});
```

---

## 6. Testing Express with Supertest

[Supertest](https://github.com/ladjs/supertest) lets you test your Express app without starting an actual server:

```js
const request = require('supertest');
const app = require('../src/index');

test('GET /hello returns 200', async () => {
  const res = await request(app).get('/hello');
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ message: 'Hello' });
});

test('POST /notes creates a note', async () => {
  const res = await request(app)
    .post('/notes')
    .send({ content: 'Test note' });
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});
```

**Important**: export `app` from `src/index.js` without calling `app.listen()` — let the tests control when the server starts.

---

## Summary

| Concept | Key Takeaway |
|---------|-------------|
| Event loop | I/O is async; never block the main thread |
| Express routing | `app.METHOD(path, handler)` — method + path → handler |
| Middleware | `(req, res, next)` functions that transform the request pipeline |
| JSON CRUD | GET list, POST create, PUT/PATCH update, DELETE remove |
| Error middleware | 4-param `(err, req, res, next)` placed last |
| Supertest | Test HTTP endpoints without a live server |
