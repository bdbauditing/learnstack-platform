# Starter — Exercise 02: Bug Hunt Registration

Open **https://learnstack-taskforge-web.onrender.com/register** and find 5 bugs. You need **4/5 to pass**.

> No login needed — go directly to `/register`.

Create one Markdown file per bug: `bug-001.md`, `bug-002.md`, etc. A blank template is already in `bug-001.md`.

## Format (GitHub Issue / Jira style)

```markdown
---
title: "[Registration] Email field accepts text without an @ symbol"
severity: High
priority: High
---

## Environment

| Field    | Value |
|----------|-------|
| Browser  | Chrome 130 |
| OS       | macOS 14 |
| Viewport | 1440x900 |
| URL      | https://learnstack-taskforge-web.onrender.com/register |

## Steps to Reproduce

1. Navigate to /register
2. Enter "notanemail" in the Email field (no @ symbol)
3. Fill in all other required fields with valid data
4. Click Create Account

## Expected Behavior

Inline validation error: "Please enter a valid email address."

## Actual Behavior

The form submits without any email format validation error.
```

## Tips

- Test every field with invalid data — empty, too short, wrong format.
- Try submitting with an email that already has an account (e.g. `bob@taskforge.io`).
- Watch what the password strength indicator says for weak passwords.
- Check the Terms and Conditions checkbox — is it enforced?
