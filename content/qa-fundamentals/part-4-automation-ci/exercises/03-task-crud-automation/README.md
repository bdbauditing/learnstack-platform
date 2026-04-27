# Exercise 03 — Task CRUD Automation

## Mission

Automate the full **Create → Read → Update → Delete** flow for tasks in TaskForge. You will write four separate `test()` blocks in one spec file, one for each operation.

Each test must:
- Perform the action
- Include at least one assertion that confirms the action worked

## Technique

- `page.goto(...)` — navigate between pages
- `page.getByRole(...)`, `page.getByLabel(...)` — find elements semantically
- `expect(locator).toBeVisible()` — confirm element is on screen
- `expect(locator).not.toBeVisible()` — confirm element was removed
- `expect(locator).toHaveText(...)` — confirm text content

## Deliverable

A completed `tests/tasks.spec.ts` with four passing `test()` blocks:
1. `creates a new task`
2. `task appears in the list`
3. `can update a task title`
4. `can delete a task`

## How to test locally

```bash
# From the starter/ folder:
npx playwright test tests/tasks.spec.ts
```

## Pass condition

- `npx playwright test` exits with code 0.
- All four tests pass.
- Each test has at least one `expect(...)` assertion.
