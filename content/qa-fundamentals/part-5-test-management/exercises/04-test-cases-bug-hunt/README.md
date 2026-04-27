# Exercise 04 — Test Cases That Catch Planted Bugs

**Technique focus:** Black-Box Test Case Design (Equivalence Partitioning, Boundary Value Analysis, State Transition)

**Time:** 90 min
**Grader:** test-catches-bug (Playwright)
**Pass threshold:** ≥40 test cases submitted AND ≥25 planted bugs caught

## Mission

The TaskForge 2.0 staging app has 30 planted bugs hiding across 10 feature areas:

- UI validation (empty titles, character limits, bad file types)
- Workflow (task counters, bulk ops, project moves)
- API-layer (wrong status codes, broken filters, missing auth checks)
- Accessibility (missing labels, colour-only status, focus traps)
- Security (IDOR, session handling, password reset)

Your job: write test cases good enough to catch them.

## What to do

1. Open `starter/test-cases.yaml`. Read the 3 example cases to understand the schema.
2. Add your own test cases below TC-003. You need **at least 40 total**.
3. Cover all 10 feature areas listed in the comment at the bottom of the file.
4. Think beyond happy-path. Most planted bugs only show up when you test boundaries and error states:
   - What happens with an empty field?
   - What happens at the character limit (exactly 200, exactly 201)?
   - What happens when you do something twice?
   - What does the API return — is the status code correct?
5. Push your file. The grader converts each test case to Playwright, runs it against the buggy staging app, and tells you how many bugs you caught.

## How to test locally

You cannot run against the staging app locally — it is only available to the grader. Use the grader feedback to iterate:

- The grader reports which bugs were caught and which were missed.
- A missed bug means you did not write a test case that exercises that code path.
- Read the bug ID in the feedback, think about what behaviour it describes, and add a test case that targets it.

## Pass condition

- Your `test-cases.yaml` contains **at least 40 test cases**.
- The grader reports **at least 25 of the 30 planted bugs caught** by failing assertions.
- You do not need to catch all 30 — 25 is the threshold.
