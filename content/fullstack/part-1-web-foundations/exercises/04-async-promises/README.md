# Exercise 04 — Async/Await and Promises

## Overview

Modern JavaScript relies on promises and async/await for all I/O operations. In this exercise you will implement utility functions that work with async patterns: wrapping callbacks, chaining async operations, handling errors, and running promises in parallel.

## Your Task

Implement the functions in `starter/src/async-utils.js`. Do **not** modify `__tests__/async-utils.test.js`.

## Functions to Implement

| Function | Description |
|----------|-------------|
| `delay(ms)` | Return a Promise that resolves after `ms` milliseconds |
| `fetchUser(id)` | Return a Promise that resolves with a user object (use the provided mock) |
| `fetchUserPosts(userId)` | Return a Promise that resolves with an array of posts (use mock) |
| `getUserWithPosts(id)` | Chain fetchUser and fetchUserPosts, return combined result |
| `fetchAll(ids)` | Fetch all users in parallel using Promise.all |
| `safeJsonParse(str)` | Return parsed JSON or `null` on error (no throw) |

## Running the Tests

```bash
cd starter
npm install
npm test
```

## Grading

- Grader: `test-runner`
