# Exercise 04 — API Bug Hunt

**Time:** ~30 minutes
**Grader:** bug-match
**Pass threshold:** 3 out of 4 API bugs identified

## Your mission

The tasks API has **4 planted bugs**. Find them by testing the API manually in Postman and report each one in `starter/api-bugs.yaml`.

## The API

**TODO: actual buggy API URL** — this is a special buggy version. Different from other exercises.

## What to test

Try every endpoint. Things to look for:
- Wrong status codes (e.g. 200 when spec says 201, 200 when spec says 404)
- Missing response fields that the API spec lists as required
- Fields that return the wrong data type (string instead of number)
- Endpoints that accept invalid input and return 200 instead of 400

## Deliverable

`starter/api-bugs.yaml` — one entry per API bug found. Use the same format as Part 1.

**You need 3/4 bugs to pass.**
