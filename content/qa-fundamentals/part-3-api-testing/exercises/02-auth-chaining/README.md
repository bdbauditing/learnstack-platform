# Exercise 02 — Auth Chaining + Environment Variables

**Time:** ~30 minutes
**Grader:** script-runs (Newman)
**Pass threshold:** Newman exits 0

## Your mission

Build a Postman collection that:
1. POSTs to `/auth/login` and captures the returned JWT token
2. Uses that token automatically on all subsequent requests (no hardcoding)
3. Accesses a protected endpoint (`GET /tasks`) successfully
4. Accesses a protected endpoint (`POST /tasks`) to create a resource
5. Verifies that calling a protected endpoint WITHOUT a token returns 401

## The API

Base URL: **TODO: actual API URL**

Login: `POST /auth/login` with `{"email": "...", "password": "..."}`
Returns: `{"token": "eyJ..."}`

## Key technique: capturing the token

In the `POST /auth/login` **Tests** tab:
```javascript
const response = pm.response.json();
pm.collectionVariables.set('auth_token', response.token);
```

Then in all protected requests, set header:
```
Authorization: Bearer {{auth_token}}
```

## Requirements

- No hardcoded tokens anywhere in the collection
- `base_url`, `test_email`, `test_password` are environment variables
- At least 5 requests in the collection
- The "no token → 401" test must exist

## Deliverable

`starter/collection.json` + `starter/environment.json`
