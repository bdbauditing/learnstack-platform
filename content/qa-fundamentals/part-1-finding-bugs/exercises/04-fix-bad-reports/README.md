# Exercise 04 — Fix 5 Bad Bug Reports

**Time:** ~30 minutes
**Grader:** markdown-doc
**Pass threshold:** All 5 rewrites must pass structural validation

## Your mission

Five terrible bug reports are in `starter/bad-reports/`. Each one is missing critical information, has vague steps, or has reversed expected/actual.

Rewrite each one as a proper bug report in the standard format.

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

## Deliverable

Create 5 files named `bug-001.md` through `bug-005.md` in `starter/`. Each is your rewritten version of the corresponding bad report.

A blank template is in `starter/bug-001.md`.

Each rewritten report must have:
- A specific title in frontmatter (not vague — say exactly what's broken and where)
- `severity` and `priority` filled in
- All 4 sections with real content:
  - `## Environment` — browser, OS, viewport, URL
  - `## Steps to Reproduce` — numbered, specific, reproducible
  - `## Expected Behavior` — what should happen
  - `## Actual Behavior` — what actually happens (not what should happen)

## How to submit

Push your `bug-001.md` through `bug-005.md` files to your fork. CI grades them automatically.
