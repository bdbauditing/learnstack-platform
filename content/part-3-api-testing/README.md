# Part 3 — API Testing

**Time estimate:** ~5 hours (reading + exercises)
**Prerequisites:** Part 1 — Finding and Reporting Bugs

## What you'll learn

By the end of this part you can:
- Build and run a Postman collection against a real API
- Chain authentication (login → capture token → use token)
- Write negative test cases for API endpoints
- Spot bugs in API responses (wrong status codes, missing fields, bad data)
- Set up data-driven tests with a CSV file
- Assert response times and flag slow endpoints
- Detect when an API violates its own contract (OpenAPI spec)

## Tools you need

| Tool | Install |
|------|---------|
| Postman desktop | postman.com/downloads |
| Newman CLI | `npm install -g newman` |
| Newman HTML reporter (optional) | `npm install -g newman-reporter-htmlextra` |

## Structure

| # | What | Format |
|---|------|--------|
| 1 | Reading | concepts.md (~15 min) |
| 2 | Knowledge check | quiz.yaml (10 questions) |
| 3–10 | Exercises | 8 hands-on tasks |

## Exercises at a glance

| Exercise | Topic | Grader |
|----------|-------|--------|
| 01 | First Collection: CRUD | script-runs (newman) |
| 02 | Auth Chaining + Env Variables | script-runs (newman) |
| 03 | Negative Testing | script-runs (newman) |
| 04 | API Bug Hunt | bug-match |
| 05 | Data-Driven Testing | script-runs (newman) |
| 06 | Response-Time Assertions | script-runs (newman) |
| 07 | Contract Violation Detection | bug-match |
| 08 | Capstone: Full API Test Suite | script-runs (newman) |

## How exercises are graded

You build Postman collections and export them as JSON. The grader runs each collection via Newman CLI (`newman run collection.json --environment environment.json`) and checks exit code + output patterns. A single failing `pm.test()` assertion causes Newman to exit non-zero, which fails the grade.
