# Exercise 01 — Requirements Gap Analysis

**Technique focus:** Requirements Gap Analysis

**Time:** 30 min
**Grader:** bug-match
**Pass threshold:** 7 of 10 planted gaps identified

## Mission

You are the QA lead reviewing the user stories for TaskForge 2.0 before a single test case is written. Bad requirements produce bad tests. Your job: find the gaps before anyone starts coding or testing.

Read the 12 user stories in `starter/user-stories.md`. Identify at least 7 requirements gaps — places where a story is ambiguous, unmeasurable, missing acceptance criteria, or impossible to test as written.

## What is a requirements gap?

A requirements gap is any place in a spec where a tester cannot determine what "pass" looks like. Common types:

- **No acceptance criteria** — the story says what the user wants but not what success looks like
- **Unmeasurable language** — words like "fast", "easy", "good" with no numbers attached
- **Undefined terms** — references to "required fields" or "productivity" without saying what those mean
- **Missing edge cases** — no mention of what happens when input is invalid, empty, or out of range
- **Missing policies** — no expiry, retry, size limit, or error handling defined

## What to do

1. Read all 12 user stories in `starter/user-stories.md`.
2. Open `starter/requirements-gaps.yaml`.
3. For each gap you find, fill in one entry:
   - `id` — keep GAP-001 through GAP-010 in order
   - `title` — one line naming the gap (e.g. "US-001 has no acceptance criteria")
   - `description` — 2–3 sentences explaining what is ambiguous, missing, or untestable, and what clarification you would request
   - `severity` and `priority` — High/Medium/Low
   - `expected` — what the story *should* say
   - `actual` — what it currently says (or does not say)
4. You need to fill in at least 7 of the 10 stubs to pass.

## Pass condition

- Submit `requirements-gaps.yaml` with at least 7 gaps filled in.
- Each filled gap must name the relevant story (US-XXX) and describe what is unclear.
- The grader (bug-match) checks your descriptions against 10 planted gaps using keyword matching.
- You pass if your submissions match at least 7 of the 10 planted gaps.
