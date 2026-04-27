# Exercise 06 — Evidence Attachment

**Time:** ~25 minutes
**Grader:** structured-doc
**Pass threshold:** Each report includes all 3 evidence types

## Your mission

Three bug reports are provided with steps but no evidence. Add evidence to each:

1. A **screenshot** file reference (e.g. `screenshot-login-bug.png`)
2. A **console log** snippet (the relevant error text, not the whole log)
3. A **network request** dump (the failing request + response status)

You don't need to take a real screenshot — just write a proper evidence section referencing a plausible filename and paste the relevant snippet.

## Deliverable

`starter/bugs-with-evidence.yaml` — 3 reports with complete `evidence:` sections.

## Why this matters

A bug report without evidence is your word against the developer's. A bug report with a screenshot + console error + network dump is nearly impossible to dismiss.

## Evidence format

```yaml
evidence:
  screenshot: "login-submit-disabled-chrome130.png"
  console: "TypeError: Cannot read properties of null (reading 'addEventListener') at login.js:47"
  network: "POST /api/auth/login → 422 Unprocessable Entity | Body: {\"error\": \"validation_failed\"}"
```

The screenshot field is a filename. The console field is the relevant error line (copy it from DevTools). The network field is the request method, path, status code, and a brief response summary.
