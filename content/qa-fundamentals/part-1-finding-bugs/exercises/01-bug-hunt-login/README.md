# Exercise 01 — Bug Hunt: Login Page

**Time:** ~20 minutes
**Grader:** bug-match
**Pass threshold:** 3 out of 4 bugs

## Your mission

A login page has **4 planted bugs**. Your job is to find them and report each one in `bugs.yaml`.

## The app

**https://learnstack-taskforge-web.onrender.com** — open it in your browser and test the login page manually.

**Test credentials** (use these to log in):
| Email | Password |
|-------|----------|
| bob@taskforge.io | Password1! |

> **Heads up:** The login submit button is one of the bugs — it looks disabled. Press **Enter** to log in anyway and continue testing.

What to test:
- Happy path: valid credentials → should log in
- Wrong password
- Empty fields
- "Remember me" checkbox
- "Forgot password" link
- Field validation messages
- Password visibility toggle

## Deliverable

Fill in `starter/bugs.yaml`. Each entry needs: `title`, `location`, `severity`, `priority`, `environment`, `steps`, `expected`, `actual`.

See `starter/README.md` for the format.

## How to submit

Push your completed `bugs.yaml` to your fork. CI will grade it automatically.

**You need 3/4 bugs to pass.**
