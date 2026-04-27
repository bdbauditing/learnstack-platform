# Exercise 05 — Data-Driven Testing

**Time:** ~35 minutes
**Grader:** script-runs (Newman)
**Pass threshold:** Newman exits 0 (all 10+ CSV rows pass assertions)

## Your mission

Build a data-driven Postman collection that tests the **POST /auth/login** endpoint with **10 different credential sets from a CSV file**.

Each row drives one iteration. Six rows are valid logins (200 OK); four are invalid — wrong password, missing email, an SQL-injection-style payload, and an expired account (401 or 400). Your `pm.test()` assertions must check the response status against the `expected_status` column for every row.

## The technique

1. In Postman, add a POST /auth/login request with body variables: `{{email}}`, `{{password}}`
2. In the Tests tab: `pm.expect(pm.response.code).to.equal(parseInt(data.expected_status))`
3. Optionally use `data.scenario` in the test name so Newman output is readable
4. Run via Newman with `--iteration-data data.csv`

## Deliverable

`starter/collection.json` — the parameterised collection
`starter/environment.json` — base URL environment
`starter/data.csv` — 10 rows (6 valid, 4 invalid) — **already provided, do not change**

## How to test locally

```bash
newman run collection.json \
  --environment environment.json \
  --iteration-data data.csv
```

**Pass = Newman exits 0.**
