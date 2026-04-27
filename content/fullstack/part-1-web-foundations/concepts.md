# Part 1 Concepts: Web Foundations

## 1. HTTP — The Language of the Web

HTTP (HyperText Transfer Protocol) is a request–response protocol that defines how a client (usually a browser) talks to a server.

### The Request–Response Cycle

```
Browser                        Server
  |                               |
  |--- HTTP Request ------------->|
  |    Method: GET                |
  |    URL: /api/users            |
  |    Headers: Accept: */*       |
  |                               |
  |<-- HTTP Response -------------|
  |    Status: 200 OK             |
  |    Headers: Content-Type: ... |
  |    Body: [{"id":1, ...}]      |
```

Every HTTP transaction has two parts:

**Request** components:
- **Method** — the verb: GET, POST, PUT, PATCH, DELETE
- **URL** — the resource address (scheme + host + path + optional query string)
- **Headers** — metadata: `Content-Type`, `Authorization`, `Accept`, etc.
- **Body** — optional payload (typically used with POST/PUT/PATCH)

**Response** components:
- **Status line** — protocol version + status code + reason phrase (`HTTP/1.1 200 OK`)
- **Headers** — metadata about the response
- **Body** — the actual data (HTML, JSON, binary, etc.)

### Common HTTP Status Codes

| Range | Meaning | Examples |
|-------|---------|---------|
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirect | 301 Moved Permanently, 302 Found |
| 4xx | Client error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found |
| 5xx | Server error | 500 Internal Server Error, 503 Service Unavailable |

### HTTP Methods in Practice

| Method | Safe? | Idempotent? | Typical use |
|--------|-------|-------------|-------------|
| GET | Yes | Yes | Retrieve a resource |
| POST | No | No | Create a resource |
| PUT | No | Yes | Replace a resource entirely |
| PATCH | No | No | Partially update a resource |
| DELETE | No | Yes | Remove a resource |

*Safe* means the request does not change server state. *Idempotent* means calling it multiple times produces the same result as calling it once.

---

## 2. HTML and Forms

HTML provides the structure of web pages. Forms are the primary mechanism for user input.

### A Basic HTML Form

```html
<form action="/login" method="POST">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required />

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required />

  <button type="submit">Log In</button>
</form>
```

When the user submits this form, the browser:
1. Reads the `action` attribute (target URL) and `method` attribute (HTTP method).
2. Serializes form field values as either URL-encoded data (default) or multipart form data (`enctype="multipart/form-data"` for file uploads).
3. Sends the HTTP request to the server.
4. Follows any redirect the server returns (typically a 302 after a POST — the "Post–Redirect–Get" pattern).

### URL-encoded POST Body Example

```
POST /login HTTP/1.1
Content-Type: application/x-www-form-urlencoded

username=alice&password=secret123
```

---

## 3. REST API Design

REST (Representational State Transfer) is an architectural style for building web APIs.

### Core Constraints

- **Stateless** — each request contains all information the server needs; no session on the server.
- **Uniform interface** — resources are identified by URLs, and standard HTTP methods define operations.
- **Resource-based** — think in nouns (users, articles, orders), not verbs.

### URL Design Rules

```
# Collection
GET    /articles          → list all articles
POST   /articles          → create a new article

# Individual resource
GET    /articles/:id      → get one article
PUT    /articles/:id      → replace an article
PATCH  /articles/:id      → partially update an article
DELETE /articles/:id      → delete an article

# Nested resources
GET    /articles/:id/comments   → list comments on an article
POST   /articles/:id/comments   → add a comment
```

**Anti-patterns to avoid:**
- `/getArticles` — verbs in URLs break REST convention
- `/articles/delete/:id` using GET — should be `DELETE /articles/:id`
- `/api/v1/articles/list` — redundant "list" noun

---

## 4. JavaScript: Functions, Scope, and Modern Syntax

### Pure Functions

A pure function always returns the same output for the same input and has no side effects.

```js
// Pure — no mutation, no I/O
function add(a, b) {
  return a + b;
}

// Not pure — mutates external state
let total = 0;
function addToTotal(n) {
  total += n; // side effect
}
```

### Array Methods

```js
const nums = [1, 2, 3, 4, 5];

nums.map(n => n * 2);          // [2, 4, 6, 8, 10]
nums.filter(n => n % 2 === 0); // [2, 4]
nums.reduce((acc, n) => acc + n, 0); // 15
nums.find(n => n > 3);         // 4
nums.every(n => n > 0);        // true
nums.some(n => n > 4);         // true
```

### Destructuring and Spread

```js
const { name, age } = person;            // object destructuring
const [first, ...rest] = array;          // array destructuring
const merged = { ...obj1, ...obj2 };     // spread — shallow merge
```

---

## 5. Async JavaScript

### The Problem with Synchronous I/O

JavaScript is single-threaded. Blocking the thread for a network request or disk read freezes everything. Async patterns solve this.

### Callbacks → Promises → async/await

```js
// Callback (old style — "callback hell")
fetch('/api/user', function(err, user) {
  if (err) { handle(err); return; }
  fetch('/api/posts?user=' + user.id, function(err2, posts) { ... });
});

// Promise chain
fetch('/api/user')
  .then(res => res.json())
  .then(user => fetch(`/api/posts?user=${user.id}`))
  .then(res => res.json())
  .catch(err => console.error(err));

// async/await (cleanest)
async function loadUserPosts() {
  try {
    const userRes = await fetch('/api/user');
    const user = await userRes.json();
    const postsRes = await fetch(`/api/posts?user=${user.id}`);
    return await postsRes.json();
  } catch (err) {
    console.error('Failed:', err);
  }
}
```

### Promise.all — Parallel Requests

```js
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]);
```

### Error Handling Rules
- Always `try/catch` async functions or add `.catch()` to promise chains.
- Never `await` inside a `forEach` — use `for...of` or `Promise.all` with `map`.

---

## 6. Browser Developer Tools

The browser DevTools Network tab is essential for debugging HTTP.

### Key Columns in the Network Tab

| Column | What it shows |
|--------|---------------|
| Name | URL path |
| Status | HTTP status code |
| Type | MIME type (json, document, xhr, etc.) |
| Size | Response payload size |
| Time | Total request duration |

### Workflow for Debugging a Failed Request

1. Open DevTools → Network tab.
2. Reproduce the action (page load, button click, form submit).
3. Click the failing request (red row or non-2xx status).
4. Check **Headers** tab: verify method, URL, request headers.
5. Check **Preview / Response** tab: read the error message in the body.
6. Check **Timing** tab: identify slow phases (DNS, connection, TTFB).

### Useful Filters

- `XHR` — shows only Ajax/fetch requests
- `Fetch` — same as above in modern browsers
- `Doc` — the main HTML document request
- Type a path in the filter box to narrow results

---

## Summary

| Concept | Key Takeaway |
|---------|-------------|
| HTTP cycle | Every web interaction is a request + response |
| Status codes | 2xx success, 4xx client error, 5xx server error |
| REST | Resources + HTTP methods; nouns not verbs |
| Pure functions | Same input → same output, no side effects |
| async/await | Cleaner syntax over promises for async I/O |
| DevTools | Network tab shows every HTTP request in detail |
