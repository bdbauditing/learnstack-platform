# Starter — Exercise 09: Security Smoke Test

Follow these steps in order.

## Step 1 — Install dependencies

```bash
npm install
npx playwright install chromium
```

## Step 2 — Understand response interception

Open `tests/security-headers.spec.ts`. The `page.on('response', ...)` pattern fires a callback every time the browser receives an HTTP response. This includes the HTML page itself, JS files, CSS, images, and API calls.

You only care about the response to the login page navigation. The callback captures it in a variable so you can check its headers after navigation.

## Step 3 — Store the login response

Replace the first TODO inside the `page.on('response', ...)` callback:

```typescript
page.on('response', response => {
  if (response.url().includes('/login')) {
    loginResponse = response;
  }
});
```

This stores only the response whose URL contains `/login`. Adjust the URL pattern if your login page has a different path.

## Step 4 — Assert X-Content-Type-Options

After `await page.goto('/login')`, replace the first assertion TODO:

```typescript
expect(headers['x-content-type-options']).toBe('nosniff');
```

Playwright normalises all header names to lowercase.

## Step 5 — Assert X-Frame-Options

```typescript
expect(headers['x-frame-options']).toBeTruthy();
```

`toBeTruthy()` passes if the value is any non-empty, non-null string. Common values are `DENY` or `SAMEORIGIN`.

## Step 6 — Assert Strict-Transport-Security

```typescript
expect(headers['strict-transport-security']).toBeTruthy();
```

A typical value is `max-age=31536000; includeSubDomains`.

## Step 7 — Run the test

```bash
npx playwright test tests/security-headers.spec.ts --headed
```

## If a header is missing

The test will fail with something like:

```
expect(received).toBeTruthy()
Received: undefined
```

This means the server is not sending that header. That is a real security finding — note it down. For this exercise, the grading environment guarantees all three headers are present.

## Hints

- `response.headers()` returns an object with all headers. Do `console.log(headers)` to see everything.
- Some servers send `x-frame-options` in the first response but not in subsequent navigations (e.g., SPA redirects). Check that your `response.url()` filter captures the right request.
- HTTPS is required for `Strict-Transport-Security` to have effect. If testing on `http://localhost`, the header may be absent intentionally.
