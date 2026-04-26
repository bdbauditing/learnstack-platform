# Grader Notes — Exercise 06

Validate evidence fields only — no exact match:
- screenshot: non-empty, ends in .png or .jpg
- console: any non-empty string >= 10 chars (they're copying a real error message)
- network: must contain both a URL fragment (/api/ or http) AND a status code (3-digit number)

All 3 bugs must pass.

## Reference answer — what good evidence looks like

### Bug 1 (Login submit disabled)
```yaml
evidence:
  screenshot: "login-submit-disabled-valid-creds-chrome130.png"
  console: "TypeError: Cannot set properties of null (setting 'disabled') at login-form.js:83:22"
  network: "POST /api/auth/validate → 200 OK | {\"valid\": true} (but button stays disabled)"
```

### Bug 2 (Cart total not updating)
```yaml
evidence:
  screenshot: "cart-total-stale-after-qty-increase-firefox130.png"
  console: "Warning: setState called on unmounted component. Cart total listener detached."
  network: "PATCH /api/cart/items/7 → 200 OK | {\"quantity\": 3} (server updated, UI did not)"
```

### Bug 3 (Registration 500)
```yaml
evidence:
  screenshot: "registration-500-duplicate-email-chrome130.png"
  console: "Uncaught Error: Request failed with status code 500 at api.js:234"
  network: "POST /api/auth/register → 500 Internal Server Error | {\"message\": \"Internal Server Error\"}"
```

## Common learner mistakes
- Writing a full file path instead of a filename for screenshot (accept either)
- Pasting the entire console log instead of the relevant line (accept — they understand the concept)
- Using "N/A" for network (do NOT accept — network evidence is required)
