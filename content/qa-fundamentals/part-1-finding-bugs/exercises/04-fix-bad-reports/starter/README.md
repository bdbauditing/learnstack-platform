# Starter — Exercise 04: Fix Bad Reports

Read `bad-reports.yaml`. Each report is broken. Rewrite each one properly in `fixed-reports.yaml`.

Use the same `bugs.yaml` format as previous exercises. Every field must be filled in.

## What you need to fix

| Report | Problem(s) |
|--------|-----------|
| BAD-001 | No environment, vague steps, expected/actual are swapped |
| BAD-002 | Vague steps ("add stuff"), no selector, priority missing |
| BAD-003 | No expected result, actual is wrong (says "everything works"), no environment |
| BAD-004 | Completely vague — no location, no steps, no severity, no priority |
| BAD-005 | No device info in environment, no selector, one-word steps |

## Requirements for each fixed report

- `title`: Descriptive — "[Area] What's wrong when doing what"
- `location`: Specific component path (e.g. "login/form", "cart/total")
- `severity`: One of Critical / High / Medium / Low
- `priority`: One of High / Medium / Low
- `environment`: All four sub-fields filled in (browser, os, viewport, url)
- `steps`: At least 3 steps, each with a real `action` and either `selector` or `url`
- `expected`: At least 10 characters, describes correct behavior
- `actual`: At least 10 characters, describes the actual broken behavior

The grader checks structure only — you don't need to match the exact original bug. Any plausible rewrite that is structurally valid passes.
