# Exercise 08 — Capstone: Full Bug Report Suite

**Time:** ~60 minutes
**Grader:** bug-match
**Pass threshold:** 8 out of 10 bugs

## Your mission

This is the Part 1 capstone. TaskForge has **10 planted bugs** across all its pages. Find them and file a GitHub Issue for each one.

This is everything from exercises 01–07 combined:
- Find the bugs (01–03 skills)
- Write good reports with specific steps (04–05 skills)
- Attach evidence (06 skill)
- Classify severity and priority correctly (07 skill)

## The app

**https://learnstack-taskforge-web.onrender.com** — explore the entire app.

**Test credentials:** `bob@taskforge.io` / `Password1!`
> The login submit button is visually broken (that's Bug #1). Press **Enter** to log in.

**Pages to test:** `/login`, `/register`, `/tasks`, `/billing`, `/profile`

## How to file bug reports

For each bug found:
1. Go to **your fork** on GitHub → **Issues** → **New Issue** → **Bug Report**
2. Fill in title, severity/priority, all four sections, AND the `## Evidence` section
3. Submit and copy the issue URL
4. Paste all your URLs into `starter/submissions.txt` — one per line

**You need 8/10 to pass.**

## Report format (including Evidence)

```markdown
# [Login] Submit button disabled with valid credentials

**Severity:** High
**Priority:** High

## Environment

- **Browser:** Chrome 130
- **OS:** macOS 14
- **Viewport:** 1440x900
- **URL:** https://learnstack-taskforge-web.onrender.com/login

## Steps to Reproduce

1. Navigate to /login
2. Enter bob@taskforge.io in the Email field
3. Enter Password1! in the Password field
4. Click the Submit button

## Expected Behavior

Submit button enables and clicking it logs the user in.

## Actual Behavior

Submit button remains visually disabled even with valid credentials.

## Evidence

**Screenshot:** login-submit-disabled-chrome130.png

**Console:** TypeError: Cannot read properties of null (reading 'addEventListener') at login.js:47

**Network:** POST /api/auth/login → 422 Unprocessable Entity
```

## Scoring

Each matched bug counts as a pass. To be counted:
- Your report must mention the right page (login, registration, tasks, billing, profile)
- Your report must contain the right keywords for that bug

Get 8 or more → PASS.

## How to submit

Open `starter/submissions.txt` and paste your issue URLs. Push your fork — CI grades automatically.
