# Exercise 07 — Contract Violation Detection

**Time:** ~30 minutes
**Grader:** bug-match
**Pass threshold:** 3 out of 3 violations identified

## Your mission

You are given an OpenAPI spec (`starter/api-spec.yaml`) and a live API (**TODO: buggy API URL**). The API has **3 places where it violates its own spec**. Find them and report each one in `starter/violations.yaml`.

## What to look for

For each endpoint in the spec:
- Do the response field names match the spec?
- Are the data types correct (number vs string, boolean vs integer)?
- Are required fields always present in the response?
- Are optional fields documented?
- Do error responses match the spec's error schema?

## Deliverable

`starter/violations.yaml` — one entry per violation found.

**All 3 must be identified to pass.**
