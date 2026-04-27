# Exercise 09 — Spec

## Grader config

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

## Planted issues (documented in answer-key/README.md)

The TaskForge staging environment has these planted security issues. A passing report identifies or discusses the relevant ones in each section:

| Category | Issue |
|----------|-------|
| HTTPS | HTTP does not redirect to HTTPS |
| Security Headers | CSP header is missing |
| Security Headers | `X-Frame-Options` is set to `ALLOW-ALL` (wrong value) |
| Cookie Flags | Session cookie missing `Secure` flag |
| Cookie Flags | Session cookie missing `HttpOnly` flag |
| Auth Bypass | `GET /api/users` returns 200 without auth |
| Auth Bypass | `GET /api/admin/stats` returns 200 without auth |
| OWASP | SQLi on search returns 500 (DB error leaks) |
| OWASP | XSS: task title reflects unescaped `<script>` |
| OWASP | IDOR: `/api/tasks/:id` returns other users' tasks |

## Section matching rules

Sections are matched case-insensitively on the H2 heading text. The grader trims whitespace. A section below `minWords` fails regardless of keywords.

## Notes

- Category 5 (OWASP probes) is intentionally manual — it teaches learners to think like an attacker, not just run a scanner.
- Learners do not need to find all 10 issues to pass — the rubric checks that each section is substantive and uses domain-appropriate vocabulary.
