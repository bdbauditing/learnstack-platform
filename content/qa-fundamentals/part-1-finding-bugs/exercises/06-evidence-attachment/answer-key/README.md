# Grader Notes — Exercise 06

**Grader:** markdown-doc (see `grader-config.yaml`, `requireEvidence: true`)

Validates `## Evidence` section in each `bug-*.md` file:
- **screenshot**: non-empty, `**Screenshot:**` line with a filename
- **console**: `**Console:**` line with ≥10 chars
- **network**: `**Network:**` line with ≥10 chars mentioning a URL path and status code

All 3 files must pass.

## Reference answer — what good evidence looks like

### Bug 1 (Login submit disabled)
```
**Screenshot:** login-submit-disabled-valid-creds-chrome130.png
**Console:** TypeError: Cannot set properties of null (setting 'disabled') at login-form.js:83:22
**Network:** POST /api/auth/validate → 200 OK | {"valid": true} (but button stays disabled)
```

### Bug 2 (Billing total not updating)
```
**Screenshot:** billing-total-stale-after-seat-increase-firefox130.png
**Console:** Warning: setState called on unmounted component. Total listener detached.
**Network:** GET /api/billing/total → 200 {"total": 9.99} (server returned stale value)
```

### Bug 3 (Registration 500)
```
**Screenshot:** registration-500-duplicate-email-chrome130.png
**Console:** Uncaught Error: Request failed with status code 500 at api.js:234
**Network:** POST /api/auth/register → 500 Internal Server Error | {"message": "Internal Server Error"}
```

## Common learner mistakes
- Writing a full file path instead of a filename for screenshot (accept either)
- Pasting the entire console log (accept — they understand the concept)
- Using "N/A" for network (do NOT accept — network evidence is required)
