# Exercise 05 — Write Reports from Scratch

**Time:** ~35 minutes
**Grader:** github-issues
**Pass threshold:** All 5 reports pass structural validation

## Your mission

You're given **5 bug descriptions** in plain English — no steps, no details. Write a complete bug report for each one and file it as a **GitHub Issue** on your fork.

You'll need to use your knowledge of a typical web app to write plausible, specific steps.

## Bug descriptions to report

1. "On the profile page, the bio text field doesn't save changes when you click Update"
2. "The task search results show items from the wrong status category"
3. "Password reset email never arrives after clicking the Forgot Password link"
4. "The date picker on task due date accepts February 30 as a valid date"
5. "After logging out, the browser back button shows the previous logged-in page"

## How to file your reports

For each description:
1. Go to **your fork** on GitHub → **Issues** → **New Issue** → **Bug Report**
2. Write a complete report — specific title, severity/priority, all four sections with real content
3. Submit the issue and copy the URL
4. Paste all 5 URLs into `starter/submissions.txt` — one per line

### Required format

```markdown
# [Profile] Bio changes not saved when clicking Update

**Severity:** Medium
**Priority:** Medium

## Environment

- **Browser:** Chrome 130
- **OS:** macOS 14
- **Viewport:** 1440x900
- **URL:** https://learnstack-taskforge-web.onrender.com/profile

## Steps to Reproduce

1. Log in and navigate to /profile
2. Click into the Bio text field
3. Clear the existing text and type "My updated bio"
4. Click the Update button

## Expected Behavior

The profile page saves the new bio text and shows a success confirmation.

## Actual Behavior

The page reloads but the Bio field shows the original text — changes are not saved.
```

Each report must include:
- A specific title (not vague — say exactly what's broken and where)
- `**Severity:**` and `**Priority:**` inline fields
- **## Environment**: browser, OS, viewport, URL (use TaskForge URLs like `/profile`, `/tasks`, `/login`)
- **## Steps to Reproduce**: numbered, specific steps
- **## Expected Behavior**: what should happen
- **## Actual Behavior**: what actually happens

Imagining plausible UI details is fine — this exercise is about writing quality, not about the exact app.

## How to submit

Open `starter/submissions.txt` and paste your 5 issue URLs. Push your fork — CI grades automatically.
