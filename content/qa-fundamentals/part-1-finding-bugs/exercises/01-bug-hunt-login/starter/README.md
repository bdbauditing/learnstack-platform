# Starter — Exercise 01: Bug Hunt Login

Open the app at **https://learnstack-taskforge-web.onrender.com** and find bugs on the login page.

**Test credentials:** `bob@taskforge.io` / `Password1!`
> The submit button is one of the bugs — it looks disabled. Press **Enter** to log in.

Find bugs, then **create one Markdown file per bug** — name them `bug-001.md`, `bug-002.md`, etc. A blank template is already here in `bug-001.md`.

You need at least **3 bugs** to pass.

## Format (GitHub Issue / Jira style)

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
2. Enter bob@taskforge.io in the Email field
3. Enter Password1! in the Password field
4. Click the Submit button

## Expected Behavior

Submit button becomes enabled and clicking it logs the user in.

## Actual Behavior

Submit button remains visually disabled even with valid credentials.
```

### Field guide

| Field | Real-world equivalent | Values |
|-------|-----------------------|--------|
| `title` | Jira Summary / GitHub Issue title | Start with `[Area]` e.g. `[Login]`, `[Registration]` |
| `severity` | Jira Severity | Critical / High / Medium / Low |
| `priority` | Jira Priority | High / Medium / Low |
| `## Environment` | Jira Environment field | Browser, OS, viewport, URL |
| `## Steps to Reproduce` | Jira Steps to Reproduce | Numbered, specific steps |
| `## Expected Behavior` | Jira Expected Result | What should happen |
| `## Actual Behavior` | Jira Actual Result | What does happen |

## Tips

- Test the obvious paths first: happy path, wrong password, empty fields.
- Check the browser console (DevTools → Console) for JavaScript errors.
- Check network requests (DevTools → Network) for failed API calls.
- Use specific step language: "Click the **Submit** button" not "click submit".
