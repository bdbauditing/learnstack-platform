# Exercise 05 — Exploratory Testing Session

**Technique focus:** Exploratory Testing (Charter-Based, Session-Based)

**Time:** 45 min
**Grader:** bug-match (on exploratory-bugs.yaml)
**Pass threshold:** 12+ of the planted bugs identified

## Mission

Scripted test cases cover what you expect. Exploratory testing finds what you did not expect. In this exercise, you will run a 30-minute exploratory testing session against the TaskForge 2.0 task management features.

Before you start, write a one-sentence charter — your mission for the session. Then set a 30-minute timer, explore freely, and take notes as you go. When the timer runs out, write up your session report and document every bug you found.

## How to approach the session

1. **Write the charter first** — one sentence that says what you will explore and what you are looking for.
2. **Start a timer** — 30 minutes. Do not stop to write up until the timer ends.
3. **Explore freely** — click through the task management features. Try things the developers might not have tested. Try things from a user's perspective, not a developer's.
4. **Take notes as you go** — keep a running list of anything surprising, broken, or confusing.
5. **When time is up** — stop exploring, write the session report, then document bugs in `exploratory-bugs.yaml`.

## Ideas for what to explore

- Creating tasks at the edge of input limits (very long title, empty title, special characters)
- Due date picker interactions (past dates, far-future dates, clearing a date)
- File attachment edge cases (wrong file type, very small file, no file selected)
- Task search with unusual queries (empty query, SQL fragments, emoji)
- Switching between tasks rapidly to see if data is saved correctly
- Working in two browser tabs simultaneously

## Deliverable 1 — session-charter.md

A completed `starter/session-charter.md` with both the Charter section and the Session Report filled in.

## Deliverable 2 — exploratory-bugs.yaml

Document every bug you find during the session. Aim for at least 12. Use the bug report format from Part 1: `title`, `location`, `severity`, `priority`, `steps`, `expected`, `actual`. Fill in the 12 stubs in `starter/exploratory-bugs.yaml` — add more entries if you find more bugs.

## How to verify

Review `session-charter.md` and check:

- The Charter section describes a clear mission and the area being explored.
- The Session Report section is filled in (not just template placeholders).
- Notes and observations include at least a few specific findings — not just "everything looks fine".
- Coverage summary describes what was and was not tested.

Review `exploratory-bugs.yaml` and check:

- At least 12 bug entries are filled in.
- Each bug has a meaningful title, a description of actual vs expected behaviour, and reproduction steps.

## Pass condition

- **Primary grader (bug-match on exploratory-bugs.yaml):** 12+ of the planted bugs identified. The grader checks your bug descriptions against bugs planted in the staging app.
- **Session charter is reviewed manually** but is not the primary grader target.
