# Security Smoke Report — TaskForge

<!-- Fill in each section below. Run the helper scripts first to gather data.
     Each section has a minimum word count — see spec.md for the rubric. -->

---

## HTTPS Enforcement

<!-- Did the app redirect HTTP to HTTPS?
     Was the Strict-Transport-Security header present?
     Run: npx ts-node scripts/check-headers.ts and look for HTTPS-related lines.
     Minimum 20 words. Include: https, redirect, hsts, strict-transport-security -->

TODO: write your findings here.

---

## Security Headers

<!-- What did the check-headers script find for Content-Security-Policy and X-Frame-Options?
     Were the headers present? What were the values? Were any missing or misconfigured?
     Minimum 30 words. Include: content-security-policy (or csp), x-frame-options, missing/present, value -->

TODO: write your findings here.

---

## Cookie Flags

<!-- After logging in, run: npx ts-node scripts/check-cookies.ts
     Was the session cookie marked Secure? Was it marked HttpOnly?
     What are the security implications if either flag is missing?
     Minimum 20 words. Include: secure, httponly, cookie, session, flag -->

TODO: write your findings here.

---

## Auth Bypass

<!-- For each of the 5 endpoints below, record whether it returned 401/403 (good) or 200 (bad):
       GET /api/tasks        | POST /api/tasks        | GET /api/users
       DELETE /api/tasks/:id | GET /api/admin/stats
     Run: npx ts-node scripts/check-auth.ts
     Were any endpoints accessible without authentication?
     Minimum 40 words. Include: 401 or 403, endpoint, unauthorized or bypass -->

TODO: write your findings here.

---

## OWASP Probes

<!-- Manually test all three probes and record your observations:

     1. SQL injection — append ' OR '1'='1 to a search field. Did the server return 500 (bad)
        or 400/empty results (good)? Did you see a database error in the response?

     2. Reflected XSS — create a task with title: <script>alert(1)</script>
        Does the title display as literal text (escaped, safe) or does it execute?

     3. IDOR — create a task, note its ID. Then try /api/tasks/<another user's ID>.
        Did you get 403 Forbidden or did the other user's task data come back?

     Minimum 40 words. Include relevant terms for each probe you tested. -->

TODO: write your findings here.
