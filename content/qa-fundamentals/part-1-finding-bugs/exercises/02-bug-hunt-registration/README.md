# Exercise 02 — Bug Hunt: Registration Form

**Time:** ~25 minutes
**Grader:** bug-match
**Pass threshold:** 4 out of 5 bugs

## Your mission

The TaskForge registration page has **5 planted bugs**. Find them and file a bug report for each.

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

## Deliverable

Create one `bug-NNN.md` file per bug found in `starter/`. A blank template is in `starter/bug-001.md`. Copy it for each additional bug.

See `starter/README.md` for the full format guide.

## How to submit

Push your fork. CI grades automatically. **Pass threshold: 4/5.**
