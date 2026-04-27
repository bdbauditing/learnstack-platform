# Exercise 05 — Write Reports from Scratch

**Time:** ~35 minutes
**Grader:** markdown-doc
**Pass threshold:** All 5 reports pass structural validation

## Your mission

You're given **5 bug descriptions** in plain English — no steps, no details. Write a complete bug report for each one from scratch.

You'll need to use your knowledge of a typical web app to write plausible, specific steps.

## Bug descriptions to report

1. "On the profile page, the bio text field doesn't save changes when you click Update"
2. "The task search results show items from the wrong status category"
3. "Password reset email never arrives after clicking the Forgot Password link"
4. "The date picker on task due date accepts February 30 as a valid date"
5. "After logging out, the browser back button shows the previous logged-in page"

## Deliverable

Create 5 files: `bug-001.md` through `bug-005.md` in `starter/`. A blank template is in `starter/bug-001.md`.

Each report must include:
- **title** + **severity** + **priority** in frontmatter
- **## Environment**: browser, OS, viewport, URL
- **## Steps to Reproduce**: numbered, specific steps (use TaskForge URLs like `/profile`, `/tasks`, `/login`)
- **## Expected Behavior**: what should happen
- **## Actual Behavior**: what actually happens

Imagining plausible UI details is fine — this exercise is about writing quality, not about the exact app.

## How to submit

Push your 5 `bug-*.md` files to your fork. CI grades automatically.
