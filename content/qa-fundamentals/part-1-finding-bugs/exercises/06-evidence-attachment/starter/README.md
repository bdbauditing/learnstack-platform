# Starter — Exercise 06: Evidence Attachment

File 3 bug reports as **GitHub Issues** on your fork — each one must include a complete `## Evidence` section. Paste all 3 issue URLs into `submissions.txt`.

See the exercise README for the three bug descriptions to report.

## Evidence format

```markdown
## Evidence

**Screenshot:** login-submit-disabled-chrome130.png

**Console:** TypeError: Cannot read properties of null (reading 'addEventListener') at login.js:47

**Network:** POST /api/auth/login → 422 Unprocessable Entity | Body: {"error": "validation_failed"}
```

## Tips

- Screenshot filename should describe the bug (not just "screenshot.png") and include the browser/version.
- Console — copy the relevant error line from DevTools → Console. Look for `TypeError`, `ReferenceError`, `Uncaught`, or any network error.
- Network — include the HTTP method (GET/POST/PATCH), the endpoint path, and the status code. Find it in DevTools → Network tab.
- You're writing plausible evidence — make it realistic even if you didn't capture it live.
