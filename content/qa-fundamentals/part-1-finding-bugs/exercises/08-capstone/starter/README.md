# Starter — Exercise 08: Capstone

Explore **https://learnstack-taskforge-web.onrender.com**. Find 10 bugs across all pages. Write a complete bug report for each.

**Login:** `bob@taskforge.io` / `Password1!` — press **Enter** to submit (the disabled button is Bug #1).

**You need 8/10 reports to pass.**

## Pages to test

| Page | URL | What to look for |
|------|-----|-----------------|
| Login | /login | Credentials, error messages, field types, links |
| Registration | /register | Validation, duplicate email, password rules |
| Tasks | /tasks | Create task with blank title, completed tasks filter |
| Billing | /billing | Seat count controls, promo code, price display |
| Profile | /profile | Bio save, avatar upload, field validation |

## Create one file per bug

Name your files `bug-001.md`, `bug-002.md`, etc. A template is in `bug-001.md`.

Each report must include:
- `title`, `severity`, `priority` in the frontmatter
- `## Environment` — browser, OS, viewport, URL
- `## Steps to Reproduce` — numbered, specific steps
- `## Expected Behavior` — what should happen
- `## Actual Behavior` — what actually happens
- `## Evidence` — screenshot filename, console error, network request

## Pre-submit checklist

- [ ] 10 `bug-*.md` files in this folder
- [ ] Every report has a specific title with `[Area]` prefix
- [ ] Every report has severity and priority filled in
- [ ] Every environment table is complete (browser, OS, viewport, URL)
- [ ] Every Steps to Reproduce has at least 3 numbered steps
- [ ] Every Expected/Actual Behavior has meaningful content
- [ ] Every `## Evidence` section has screenshot, console, and network entries
