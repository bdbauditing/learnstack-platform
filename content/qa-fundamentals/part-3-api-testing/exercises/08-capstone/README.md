# Exercise 08 — Capstone: Full API Test Suite

**Time:** ~75 minutes
**Grader:** script-runs (Newman)
**Pass threshold:** Newman exits 0 + structural requirements met

## Your mission

Build a complete API test suite for the TaskForge API covering all endpoints with positive, negative, auth, data-driven, and performance assertions.

## Requirements

| Category | Minimum count |
|----------|---------------|
| Total requests | 25+ |
| Positive tests | 8+ |
| Negative tests (4xx) | 6+ |
| Auth tests (including 401) | 3+ |
| Data-driven iterations | 5+ CSV rows |
| Response-time assertions | On all GET endpoints |

## The API

**TODO: actual API URL** — full TaskForge API

## Structure your collection

Suggested folder structure:
```
Capstone Suite/
├── Auth/
│   ├── Login (captures token)
│   └── 401 - No token
├── Tasks - Positive/
│   ├── GET all tasks
│   ├── POST create task
│   ├── GET single task
│   ├── PATCH update task
│   └── DELETE task
├── Tasks - Negative/
│   ├── POST missing title
│   ├── POST empty title
│   ├── GET non-existent ID
│   └── DELETE non-existent ID
├── Data-Driven/
│   └── POST tasks (CSV iteration)
└── Performance/
    ├── GET /tasks (< 500ms)
    └── GET /reports/export (documented threshold)
```

## Deliverable

`starter/collection.json`
`starter/environment.json`
`starter/data.csv` (5+ rows for data-driven folder)

**Pass = Newman exits 0.**
