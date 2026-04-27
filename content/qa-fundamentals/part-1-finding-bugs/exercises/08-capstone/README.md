# Exercise 08 — Capstone: Full Bug Report Suite

**Time:** ~60 minutes
**Graders:** bug-match + structured-doc
**Pass threshold:** 8 out of 10 bugs pass full validation

## Your mission

This is the Part 1 capstone. A full web app — login, registration, cart, checkout, profile — has **10 planted bugs**. Find them all. Report each with complete structure and evidence.

This is everything from exercises 01–07 combined:
- Find the bugs (01–03)
- Write good reports with specific steps (04–05)
- Attach evidence (06)
- Classify severity and priority correctly (07)

## The app

**https://learnstack-taskforge-web.onrender.com** — explore the entire app. Every page has bugs.

**Test credentials:** `bob@taskforge.io` / `Password1!`
> The login submit button is visually broken (that's one of the bugs). Press **Enter** to log in and access the rest of the app.

**Pages to test:** `/login`, `/register`, `/` (dashboard), `/tasks`, `/billing`, `/profile`

## Deliverable

`starter/bugs.yaml` — 10 bug reports. At least 8 must pass both:
- Location + keyword match against the answer key
- Full structural validation (all fields, evidence, correct severity)

## How to submit

Push your fork. **Pass threshold: 8/10.**

## Scoring

Each bug is scored as pass/fail. To pass, a bug report must:
1. Match the answer key by location and at least 50% of signature keywords
2. Have all required fields non-empty (title, location, severity, priority, environment, steps, expected, actual)
3. Have a complete evidence section (screenshot filename, console snippet, network entry)

A bug found but missing evidence = FAIL. A bug with evidence but wrong location = FAIL. Both conditions must be met.
