# Exercise 09 — Security Smoke Test

**Time:** ~50 minutes
**Grader:** structured-doc (5-section rubric on `security-smoke.md`)
**Pass threshold:** All 5 sections pass keyword + word-count checks

## Your mission

Run a security smoke check across 5 categories and document your findings in `security-smoke.md`. This is not a full penetration test — it is the quick checklist a QA engineer runs before every release.

## The 5 categories

### 1. HTTPS enforcement
- Does the app force HTTPS? (HTTP → HTTPS redirect)
- Is the `Strict-Transport-Security` header present?

### 2. Security headers
Check the response headers on the login page for:
- `Content-Security-Policy` — present? What is the value?
- `X-Frame-Options` — present? Valid value (DENY or SAMEORIGIN)?

### 3. Cookie flags
After logging in, inspect the session cookie:
- Is the `Secure` flag set? (cookie only sent over HTTPS)
- Is the `HttpOnly` flag set? (JavaScript cannot read it)

### 4. Auth bypass — 5 protected endpoints
Test these endpoints without sending an auth token. Each should return 401 or 403:
- `GET /api/tasks`
- `POST /api/tasks`
- `GET /api/users`
- `DELETE /api/tasks/:id`
- `GET /api/admin/stats`

### 5. OWASP Top 10 probes (3 manual checks)
- **SQL injection** — add `' OR '1'='1` to a search parameter. Does the server return 500 (error leakage) or correctly return 400/empty?
- **Reflected XSS** — create a task with title `<script>alert(1)</script>`. Does the title render unescaped in the task list?
- **IDOR** — after creating your own task, try accessing `/api/tasks/<another user's ID>`. Does the server return 403 or expose the other user's data?

## Helper scripts

Scripts in `starter/scripts/` automate the header, cookie, and auth checks:

```bash
# From starter/ directory:
npx ts-node scripts/check-headers.ts      # categories 1 + 2
npx ts-node scripts/check-cookies.ts      # category 3
npx ts-node scripts/check-auth.ts         # category 4
```

Run each, observe the output, then document your findings in `security-smoke.md`. Categories 1–4 can be verified with these scripts. Category 5 (OWASP probes) requires manual browser testing — use the instructions in `scripts/check-auth.ts` as a guide.

## Deliverable

`starter/security-smoke.md` — 5 H2 sections filled in with your findings.

## Pass condition

The grader checks each section for minimum word count and relevant keywords. A section that is blank or too short fails automatically. See `spec.md` for the exact rubric.
