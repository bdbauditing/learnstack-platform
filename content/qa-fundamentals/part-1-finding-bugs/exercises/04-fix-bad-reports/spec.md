# Exercise 04 Spec — Fix Bad Reports

## The 5 Bad Reports (in starter/bad-reports/)

1. `bad-001.md` — "Login broken" — vague title, steps say "do login", expected/actual swapped
2. `bad-002.md` — "Price wrong sometimes" — vague steps, no selector, no environment
3. `bad-003.md` — "Dashboard crashes" — only actual, no expected, no environment
4. `bad-004.md` — "The email thing doesn't work" — completely vague, no steps, no location
5. `bad-005.md` — "Button problem on mobile" — no device info, no selector, no steps

## Grader Config

- Grader: `markdown-doc`
- Required: 5 bug-*.md files in starter/
- Each file must have: title (frontmatter), severity, priority, all 4 sections with content
- Pass threshold: all 5 files pass
