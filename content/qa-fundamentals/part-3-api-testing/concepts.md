# Part 3 Concepts — API Testing

## 1. What an API is (machine-to-machine)

- **API = Application Programming Interface** — a contract between two programs
- Unlike a webpage (made for humans), an API returns structured data (JSON/XML) made for code to consume
- Example: the weather app on your phone doesn't have its own weather database — it calls a weather API
- REST APIs use HTTP, the same protocol as websites
- When your browser loads `example.com`, it gets HTML. When code calls `api.example.com/weather`, it gets JSON — same transport layer, different audience
- APIs are everywhere: payment processing, maps, social logins, notifications — nearly every modern app is stitched together from APIs

---

## 2. HTTP Methods — one-liners

- **GET** — fetch data (never changes anything)
- **POST** — create a new resource
- **PUT** — replace an entire resource
- **PATCH** — update part of a resource
- **DELETE** — remove a resource
- **Rule of thumb:** GET is safe (read-only); POST/PUT/PATCH/DELETE change state

Why does this matter for testing?
- GET requests should be safe to run repeatedly — they must not modify data
- POST/PUT/PATCH/DELETE requests have side effects — test them carefully, and test what happens when they are called twice (idempotency)
- Calling DELETE twice on the same resource should return 404 the second time, not 200

---

## 3. Status Code Categories

- **2xx = success**
  - 200 OK — request succeeded, response body contains data
  - 201 Created — new resource was created (typically after POST)
  - 204 No Content — succeeded, but no body (typical after DELETE)

- **3xx = redirect**
  - 301 Moved Permanently — resource has a new permanent URL
  - 302 Found — temporary redirect

- **4xx = client error — YOU did something wrong**
  - 400 Bad Request — malformed syntax or invalid input
  - 401 Unauthorized — not authenticated (missing or bad credentials)
  - 403 Forbidden — authenticated but no permission
  - 404 Not Found — resource doesn't exist
  - 422 Unprocessable Entity — valid JSON but semantically invalid (e.g. email format wrong)

- **5xx = server error — THE SERVER broke**
  - 500 Internal Server Error — unhandled exception on the server
  - 502 Bad Gateway — upstream service failed
  - 503 Service Unavailable — server is overloaded or down for maintenance

- **Mnemonic: 4xx = your fault, 5xx = their fault**

---

## 4. Headers and Body Basics

- **Headers** = metadata about the request/response (think: the envelope, not the letter)
- **Body** = the actual payload (JSON for most REST APIs)

Common headers every QA engineer should know:

| Header | What it does |
|--------|-------------|
| `Content-Type: application/json` | Tells the server the request body is JSON |
| `Authorization: Bearer <token>` | Passes an auth token with the request |
| `Accept: application/json` | Tells the server what format you want back |

- If you send JSON without `Content-Type: application/json`, many servers will reject the request or misparse the body
- If you omit `Authorization` on a protected endpoint, you should get 401 — and testing that is a negative test case

---

## 5. "200 OK is not always okay"

This is one of the most important concepts in API testing — and the most commonly missed.

- An API can return **200 with an empty array** when you expected data
- An API can return **200 with the wrong data type** in a field (e.g. `"price": "19.99"` instead of `"price": 19.99`)
- An API can return **200 with a missing required field** (e.g. `created_at` is in the spec but not in the response)
- An API can return **200 with stale or incorrect data** (the update didn't actually persist)

**Rule: always assert the RESPONSE BODY, not just the status code.**

Bad assertion (not enough):
```javascript
pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
});
```

Good assertion (checks the body too):
```javascript
pm.test("Status is 200 and items exist", function() {
    pm.response.to.have.status(200);
    const body = pm.response.json();
    pm.expect(body.items).to.be.an('array').with.length.greaterThan(0);
});
```

Think of it this way: a restaurant could hand you a plate and say "your food is here" (200 OK) — but you still need to check whether the right dish arrived.

---

## 6. Auth Schemes — one sentence each

- **Basic Auth:** base64-encoded "username:password" in the Authorization header — simple but never use over plain HTTP since it's trivially decoded
- **Bearer/JWT:** a signed token returned by a login endpoint, sent as `Authorization: Bearer <token>` — stateless and the current industry standard for REST APIs
- **API Keys:** a static secret key sent in a header or query param — common for public APIs and simpler than JWT, but can't be revoked per-session
- **OAuth 2.0:** a delegation protocol where users grant apps limited access to their account without sharing passwords — used by Google/GitHub login ("Sign in with Google")

For most API testing roles you will encounter Bearer/JWT most often. The auth chaining technique (login → capture token → use token) is the practical skill you need.

---

## 7. Negative Testing Mindset

"Does it break correctly?" is just as important as "Does it work correctly?"

- Test what the API **rejects**: missing fields, wrong types, unauthorized requests, malformed JSON
- Every 4xx response should be tested and have an assertion on the **error body** (not just the status)
- A 500 response to a bad request is a bug — the server should handle bad input gracefully and return 400/422

Things to try for any endpoint:
- Send no body (or empty body)
- Send the body with a required field missing
- Send the correct shape but with invalid values (empty string, negative number, string where a number is expected)
- Send a valid request with no auth token → expect 401
- Send a valid request with a token that belongs to a different user's resource → expect 403 or 404

---

## 8. Contract Testing

Contract testing verifies that an API behaves exactly as its OpenAPI/Swagger spec describes — catching cases where the implementation drifts from the documented contract. A field documented as `type: boolean` that returns `"true"` (a string) is a contract violation, even if it looks fine to a human reader. These type mismatches break client code silently and are exactly what contract tests are designed to catch.

---

## 9. Postman vs Bruno Sidebar

Postman is the 2026 industry standard for API testing — it appears in the majority of QA job postings and is what most teams use day-to-day. This course teaches Postman because it is what employers expect. Bruno is a fast-growing open-source alternative with Git-native collections (no sync required) that is worth knowing about, especially on teams that manage everything in version control. The core concepts — collections, environments, tests in JavaScript — are nearly identical between the two; if you can write Postman tests, picking up Bruno takes an afternoon.

---

## 10. REST Assured Mention

Java-shop QA teams often use REST Assured, a Java library for writing API tests in code, instead of Postman — same HTTP concepts, different syntax, and worth recognising if you see it in a job description.
