# Starter — Exercise 06: Evidence Attachment

Three bugs are partially written. Add evidence to each.

For each bug, fill in the `evidence:` section with:
- `screenshot:` — a filename (e.g., "login-button-disabled.png")
- `console:` — a relevant error snippet (e.g., "TypeError: Cannot read properties of null")
- `network:` — a request/response (e.g., "POST /api/login → 500 Internal Server Error")

## Evidence format

```yaml
evidence:
  screenshot: "cart-total-not-updating-firefox130.png"
  console: "ReferenceError: cartTotal is not defined at cart.js:112:5"
  network: "PATCH /api/cart/items/42 → 200 OK | Response: {\"quantity\": 3, \"total\": 59.97}"
```

## Tips

- Screenshot filenames should describe the bug (not just "screenshot.png").
- Console messages — look for `TypeError`, `ReferenceError`, `Uncaught`, `404`, etc.
- For the network entry, include the HTTP method (GET/POST/PATCH), the path, and the status code.
- You're writing plausible evidence, not real evidence from a real app. Make it realistic.
