# Exercise 01 — Bug Hunt: Login Page

**Time:** ~20 minutes
**Grader:** bug-match
**Pass threshold:** 3 out of 4 bugs

## Your mission

The TaskForge login page has **4 planted bugs**. Find them and file a GitHub Issue for each one.

## The app

**https://learnstack-taskforge-web.onrender.com** — open it in your browser and test the login page manually.

**Test credentials:**

| Email | Password |
|-------|----------|
| bob@taskforge.io | Password1! |

> **Heads up:** The login submit button is one of the bugs — it looks disabled. Press **Enter** to log in and continue testing.

What to test:
- Happy path: valid credentials → should log in
- Wrong password / empty fields
- "Forgot password" link
- Field validation messages
- Password visibility toggle

## How to file bug reports

1. Go to **your fork** on GitHub
2. Click the **Issues** tab → **New Issue** → **Bug Report**
3. Fill in the title, severity/priority, all four sections, and submit
4. Copy the issue URL (e.g. `https://github.com/yourname/learnstack-qa-track/issues/3`)
5. Paste it into `starter/submissions.txt` — one URL per line

### Bug report format

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
2. Enter valid email in the Email field
3. Enter valid password in the Password field
4. Click the Submit button

## Expected Behavior

The Submit button becomes enabled after both fields are filled and clicking it logs the user in.

## Actual Behavior

The Submit button remains visually disabled even with valid credentials entered.
```

> **Why this format?** H1 heading = GitHub issue title. `**Severity:**` / `**Priority:**` = Jira fields. The sections map to standard fields in every bug tracker.

## How to submit

Open `starter/submissions.txt` and paste your issue URLs there. Push your fork — CI grades automatically.

**You need 3/4 bugs to pass.**
