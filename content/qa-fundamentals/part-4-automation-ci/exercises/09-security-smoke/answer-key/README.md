# Answer Key — Exercise 09: Security Smoke Test

## Grader config (authoritative)

```yaml
grader: structured-doc
submissionFile: security-smoke.md
options:
  rubric:
    - section: "HTTPS Enforcement"
      minWords: 20
      keywords: ["https", "redirect", "hsts", "strict-transport-security", "http"]
      keywordThreshold: 0.4

    - section: "Security Headers"
      minWords: 30
      keywords: ["content-security-policy", "csp", "x-frame-options", "missing", "present", "value"]
      keywordThreshold: 0.4

    - section: "Cookie Flags"
      minWords: 20
      keywords: ["secure", "httponly", "cookie", "session", "flag"]
      keywordThreshold: 0.4

    - section: "Auth Bypass"
      minWords: 40
      keywords: ["401", "403", "unauthorized", "api", "endpoint", "bypass", "unauthenticated"]
      keywordThreshold: 0.4

    - section: "OWASP Probes"
      minWords: 40
      keywords: ["sql", "injection", "xss", "script", "idor", "500", "reflected", "unescaped", "403"]
      keywordThreshold: 0.4
```

## Planted issues on staging

| Category | Issue | Expected learner observation |
|----------|-------|------------------------------|
| HTTPS | HTTP does not redirect → HTTPS | `check-headers.ts` shows no redirect |
| Security Headers | CSP header missing | `✗ content-security-policy: MISSING` |
| Security Headers | `X-Frame-Options: ALLOW-ALL` | Not DENY/SAMEORIGIN — clickjacking risk |
| Cookie Flags | Session cookie missing `Secure` | `✗ NO (missing Secure flag)` |
| Cookie Flags | Session cookie missing `HttpOnly` | `✗ NO (missing HttpOnly flag)` |
| Auth Bypass | `GET /api/users` returns 200 | `✗ GET /api/users → 200 (ACCESSIBLE)` |
| Auth Bypass | `GET /api/admin/stats` returns 200 | `✗ GET /api/admin/stats → 200 (ACCESSIBLE)` |
| OWASP / SQLi | Search returns 500 with DB error | Error leakage, potential injection |
| OWASP / XSS | Task title renders unescaped | `<script>` executes or raw HTML appears |
| OWASP / IDOR | `/api/tasks/:id` returns other user's data | No ownership check on task fetch |

## Keyword matching notes

- "HTTPS Enforcement" passes if learner mentions redirect behaviour AND hsts/strict-transport-security. A blank entry with just "TODO" fails.
- "Security Headers": learner must name at least CSP and X-Frame-Options by name (keyword threshold 0.4 of 6 keywords = 2–3 keywords required).
- "OWASP Probes": the most commonly underfilled section. Learner must describe at least 2 of 3 probes with domain-appropriate vocabulary.

## Common failure patterns

- Learner runs helper scripts but doesn't add findings to the markdown (leaves TODO).
- OWASP section has only 20–30 words (below 40 minimum) — learner lists outcomes but doesn't explain them.
- "Cookie Flags" section mentions cookies but not the `secure`/`httponly` keywords specifically.
