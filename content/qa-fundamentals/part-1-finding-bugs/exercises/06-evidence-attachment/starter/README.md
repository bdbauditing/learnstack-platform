# Starter — Exercise 06: Evidence Attachment

Three bug reports are here with steps already written but no evidence. Add the `## Evidence` section to each file.

Open `bug-001.md`, `bug-002.md`, `bug-003.md` and fill in the evidence for all three.

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
