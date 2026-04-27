# Starter — Exercise 01: Bug Hunt Login

Open the app at **https://learnstack-taskforge-web.onrender.com** and find bugs on the login page.

**Test credentials:** `bob@taskforge.io` / `Password1!`
> The submit button is one of the bugs — it looks disabled. Press **Enter** to log in.

Find bugs, then **file each one as a GitHub Issue on your fork**. Paste the issue URLs into `submissions.txt`. You need at least **3 bugs** to pass.

## How to file a bug report

1. Go to your fork on GitHub → **Issues** tab → **New Issue** → **Bug Report**
2. Fill in the title, severity, priority, and all four sections
3. Click **Submit new issue**
4. Copy the issue URL and paste it in `submissions.txt`

## Report format

```markdown
# [Login] Submit button disabled with valid credentials

**Severity:** High
**Priority:** High

## Environment

- **Browser:** Chrome 130
- **OS:** macOS 14
- **Viewport:** 1440x900
- **URL:** https://learnstack-taskforge-web.onrender.com/login

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
| H1 heading `# [Area] ...` | GitHub issue title / Jira Summary | Start with `[Area]` — e.g. `[Login]`, `[Registration]` |
| `**Severity:**` | Jira Severity field (dropdown in UI) | Critical / High / Medium / Low |
| `**Priority:**` | Jira Priority field (dropdown in UI) | High / Medium / Low |
| `## Environment` | Jira Environment field | Browser, OS, viewport, URL |
| `## Steps to Reproduce` | Jira Steps to Reproduce | Numbered, specific steps |
| `## Expected Behavior` | Jira Expected Result | What should happen |
| `## Actual Behavior` | Jira Actual Result | What does happen |

## Tips

- Test the obvious paths first: happy path, wrong password, empty fields.
- Check the browser console (DevTools → Console) for JavaScript errors.
- Check network requests (DevTools → Network) for failed API calls.
- Use specific step language: "Click the **Submit** button" not "click submit".
