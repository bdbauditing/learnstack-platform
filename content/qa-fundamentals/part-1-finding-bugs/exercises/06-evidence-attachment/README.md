# Exercise 06 — Evidence Attachment

**Time:** ~25 minutes
**Grader:** markdown-doc
**Pass threshold:** All 3 reports include all 3 evidence types

## Your mission

Three bug reports are provided in `starter/` with steps already written but no evidence. Add an `## Evidence` section to each one.

## Deliverable

Edit `bug-001.md`, `bug-002.md`, and `bug-003.md` in `starter/` — add the evidence section to each.

The `## Evidence` section requires all three:
1. **Screenshot** — the filename of a screenshot you'd take (e.g. `login-submit-disabled-chrome130.png`)
2. **Console** — the relevant error line from DevTools Console (paste the actual text)
3. **Network** — the failing request + response status from DevTools Network tab

You don't need to take a real screenshot — just write a realistic filename and paste a plausible console/network snippet.

## Evidence format

```markdown
## Evidence

**Screenshot:** login-submit-disabled-chrome130.png

**Console:** TypeError: Cannot read properties of null (reading 'addEventListener') at login.js:47

**Network:** POST /api/auth/login → 422 Unprocessable Entity | Body: {"error": "validation_failed"}
```

## Field by field

| Field | What to write | Real-world source |
|-------|--------------|-------------------|
| Screenshot | Filename with `.png` or `.jpg` | DevTools → right-click → Save as screenshot |
| Console | The error line (not the full log) | DevTools → Console tab |
| Network | Method, path, status code | DevTools → Network tab → click the failing request |

## Why this matters

A bug report without evidence is your word against the developer's. A report with a screenshot + console error + network dump is nearly impossible to dismiss — and it cuts the time-to-fix in half.
