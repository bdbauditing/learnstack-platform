# Exercise 02 — Bug Hunt: Registration Form

**Time:** ~25 minutes
**Grader:** bug-match
**Pass threshold:** 4 out of 5 bugs

## Your mission

The TaskForge registration page has **5 planted bugs**. Find them and file a GitHub Issue for each one.

## The app

**https://learnstack-taskforge-web.onrender.com** — go directly to `/register` (no login needed).

> If you need to test a logged-in flow, use `bob@taskforge.io` / `Password1!` and press **Enter** to log in (the submit button is a known bug from Exercise 01).

What to test:
- All required fields (name, email, password, confirm password)
- Password strength indicator
- Email format validation
- Submit with a duplicate email (one that already has an account)
- Terms checkbox behavior
- What happens after successful registration

## How to file bug reports

1. Go to **your fork** on GitHub
2. Click the **Issues** tab → **New Issue** → **Bug Report**
3. Fill in the title, severity/priority, all four sections, and submit
4. Copy the issue URL and paste it into `starter/submissions.txt` — one URL per line

See Exercise 01's README for the full bug report format.

## How to submit

Open `starter/submissions.txt` and paste your issue URLs there. Push your fork — CI grades automatically.

**Pass threshold: 4/5.**
