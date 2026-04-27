# Exercise 01 — Bug Hunt: Login Page

**Time:** ~20 minutes
**Grader:** bug-match
**Pass threshold:** 3 out of 4 bugs

## Your mission

The TaskForge login page has **4 planted bugs**. Find them and file a proper bug report for each one.

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

## Deliverable

Create one Markdown file per bug found, named `bug-001.md`, `bug-002.md`, etc. inside `starter/`.

A template is provided in `starter/bug-001.md`. Copy it for each additional bug.

### Bug report format

```markdown
---
title: "[Login] Submit button disabled with valid credentials"
severity: High
priority: High
---

## Environment

| Field    | Value |
|----------|-------|
| Browser  | Chrome 130 |
| OS       | macOS 14 |
| Viewport | 1440x900 |
| URL      | https://learnstack-taskforge-web.onrender.com/login |

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

> **Why this format?** This is how you'd file a bug in GitHub Issues or Jira. The `title` frontmatter = Jira Summary. `severity`/`priority` = Jira fields. The sections = Jira Description template.

## How to submit

Push your completed `bug-*.md` files to your fork. CI will grade it automatically.

**You need 3/4 bugs to pass.**
