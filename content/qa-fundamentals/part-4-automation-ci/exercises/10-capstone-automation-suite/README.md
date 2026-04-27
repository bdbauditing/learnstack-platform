# Exercise 10 — Capstone: Full Automation Suite

## Mission

Assemble a complete automation suite for TaskForge. Pull together everything from Exercises 01–09 into one Playwright project with at least four test files and at least eight passing tests.

## Required test files

| File | What it must cover |
|------|--------------------|
| `tests/login.spec.ts` | Login via LoginPage POM — at least 1 test |
| `tests/tasks.spec.ts` | Task CRUD (create, read, update, delete) — at least 4 tests |
| `tests/a11y.spec.ts` | axe-core audit on the dashboard — at least 1 test |
| `tests/security.spec.ts` | Security headers check on login page — at least 1 test |

Total: at least 7 tests across four files. Add one more test anywhere to reach 8.

## Technique

You know all the techniques from previous exercises. Bring them together:
- LoginPage POM from Ex02 — import and reuse it in `login.spec.ts`
- CRUD tests from Ex03 — copy and refine your `tasks.spec.ts`
- axe-core from Ex08 — copy your `a11y.spec.ts`
- Security headers from Ex09 — copy your `security.spec.ts`
- One shared `playwright.config.ts` at the project root

## Deliverable

A completed starter directory with all four spec files implemented. All 8+ tests must pass.

## How to test locally

```bash
# From the starter/ folder:
npm install
npx playwright install chromium
npx playwright test
```

## Pass condition

- `npx playwright test` exits with code 0.
- At least four test files exist.
- At least eight tests pass.
