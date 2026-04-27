# Exercise 06 — Evidence Attachment

**Time:** ~25 minutes
**Grader:** github-issues
**Pass threshold:** All 3 reports include all 3 evidence types

## Your mission

Three bug descriptions are given below — reports that need evidence added. File each one as a **GitHub Issue** on your fork, including a complete `## Evidence` section.

## The three bugs to report

**Bug A — Login submit button disabled**
The login submit button stays visually disabled even after both email and password fields are filled. Users must press Enter to submit.

**Bug B — Seat count drops to zero**
On the billing page, clicking the minus (-) button on the seat count continues past 1 down to 0, which shows a $0 total.

**Bug C — Bio not saved on profile**
On the profile page, editing the bio field and clicking Update appears to succeed but the text reverts to the original value on reload.

## How to file each issue

1. Go to **your fork** on GitHub → **Issues** → **New Issue** → **Bug Report**
2. Fill in all four standard sections (Environment, Steps to Reproduce, Expected, Actual)
3. Add an `## Evidence` section at the bottom (see format below)
4. Submit and copy the URL
5. Paste all 3 URLs into `starter/submissions.txt` — one per line

## Evidence section format

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
| Network | Method + path + status code | DevTools → Network tab → click the failing request |

You don't need to take a real screenshot — write a realistic filename and paste a plausible console/network snippet. The grader checks:
- **Screenshot:** ends with `.png` or `.jpg`
- **Console:** at least 10 characters
- **Network:** contains `/api/` or `http` AND a 3-digit status code

## Why this matters

A bug report without evidence is your word against the developer's. A report with a screenshot + console error + network dump is nearly impossible to dismiss — and it cuts the time-to-fix in half.

## How to submit

Open `starter/submissions.txt` and paste your 3 issue URLs. Push your fork — CI grades automatically.
