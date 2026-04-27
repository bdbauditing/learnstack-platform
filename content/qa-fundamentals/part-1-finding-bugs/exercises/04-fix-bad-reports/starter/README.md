# Starter — Exercise 04: Fix Bad Reports

Read the bad reports in `bad-reports/`. Each one is broken. Rewrite each as a proper bug report.

Create your rewrites as `bug-001.md` through `bug-005.md` in this directory. A blank template is in `bug-001.md`.

## What you need to fix

| Bad report | Problem(s) |
|-----------|-----------|
| `bad-001.md` | Vague title "Login broken", steps say "do login", expected/actual swapped |
| `bad-002.md` | Vague steps, no specific field or button mentioned, missing environment |
| `bad-003.md` | No expected behavior, actual says "everything works fine" (it doesn't), no environment |
| `bad-004.md` | Completely vague — no location, no steps, no severity, no priority |
| `bad-005.md` | No device info, no specific button or URL, one-word steps |

## Requirements per fixed report

Each `bug-NNN.md` must have:
- **title** (frontmatter): specific — "[Area] What's wrong when doing what"
- **severity** + **priority** (frontmatter): filled in
- **## Environment**: browser, OS, viewport, URL — all filled
- **## Steps to Reproduce**: at least 3 numbered steps with specific actions
- **## Expected Behavior**: at least 10 characters describing correct behavior
- **## Actual Behavior**: at least 10 characters describing the actual broken behavior (not what should happen)

The grader checks structure only — you don't need to match the exact original bug. Any plausible, specific rewrite passes.
