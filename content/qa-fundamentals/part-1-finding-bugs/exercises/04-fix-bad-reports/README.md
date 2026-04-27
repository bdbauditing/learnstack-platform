# Exercise 04 — Fix 5 Bad Bug Reports

**Time:** ~30 minutes
**Grader:** github-issues
**Pass threshold:** All 5 rewrites must pass structural validation

## Your mission

Five terrible bug reports are in `starter/bad-reports/`. Each one is missing critical information, has vague steps, or has reversed expected/actual.

Read each bad report, then rewrite it properly and file it as a **GitHub Issue** on your fork.

## The bad reports

| File | What's wrong |
|------|-------------|
| `bad-001.md` | "Login broken" — vague title, steps say "do login", expected/actual swapped |
| `bad-002.md` | "Price wrong sometimes" — vague steps, no selector or field name, no environment |
| `bad-003.md` | "Dashboard crashes" — no expected behavior, actual says everything works fine |
| `bad-004.md` | "The email thing doesn't work" — completely vague, no steps, no location |
| `bad-005.md` | "Button problem on mobile" — no device info, no selector, no specific steps |

## What makes a bad report?

- Steps like "do the thing" or "go to page" — where? what page? what button?
- Expected and actual swapped — expected describes the bug, actual says it works fine
- Empty environment — developer can't reproduce without knowing browser + OS
- Vague title — "Login broken" tells you nothing; "[Login] Submit button remains disabled with valid credentials" does

## How to file your rewrites

For each bad report:
1. Read `bad-reports/bad-NNN.md` and identify all the problems
2. Go to **your fork** on GitHub → **Issues** → **New Issue** → **Bug Report**
3. Rewrite it properly — specific title, correct sections, real steps, right expected/actual
4. Submit the issue and copy the URL
5. Paste all 5 URLs into `starter/submissions.txt` — one per line

### Required format

```markdown
# [Login] Submit button remains disabled with valid credentials

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

The Submit button becomes enabled and clicking it logs the user in.

## Actual Behavior

The Submit button remains visually disabled even with valid credentials entered.
```

## How to submit

Open `starter/submissions.txt` and paste your 5 issue URLs. Push your fork — CI grades automatically.
