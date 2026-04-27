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

## File one GitHub Issue per bug

Go to your fork → **Issues** → **New Issue** → **Bug Report** for each bug. Paste all issue URLs into `submissions.txt`.

Each issue must include:
- H1 heading `# [Area] description` — the bug title
- `**Severity:**` and `**Priority:**` inline fields
- `## Environment` — browser, OS, viewport, URL
- `## Steps to Reproduce` — numbered, specific steps
- `## Expected Behavior` — what should happen
- `## Actual Behavior` — what actually happens
- `## Evidence` — screenshot filename, console error, network request

## Pre-submit checklist

- [ ] 10 issue URLs in `submissions.txt`
- [ ] Every issue has a specific title with `[Area]` prefix
- [ ] Every issue has severity and priority filled in
- [ ] Every environment is complete (browser, OS, viewport, URL)
- [ ] Every Steps to Reproduce has at least 3 numbered steps
- [ ] Every Expected/Actual Behavior has meaningful content
- [ ] Every `## Evidence` section has screenshot, console, and network entries
