# Grader Notes — Exercise 08 Capstone

**Grader:** bug-match (reads `bug-*.md` files)

The grader reads all `bug-*.md` files from the learner's `starter/` directory, extracts the full text of each, and matches against the 10 planted bugs in `bugs-expected.yaml`.

Pass threshold: 8 out of 10.

## Matching logic

For each planted bug, the grader checks:
1. The file text contains the location keyword (e.g. "login", "registration", "tasks", "billing", "profile")
2. The file text matches ≥40% of the signature keywords

## Per-bug grading notes

**BUG-001 (login — submit disabled)**
Location: text contains "login". Keywords: "button" + "disabled".

**BUG-002 (login — password plain text)**
Location: "login". Keywords: "password" + ("plain" OR "visible").

**BUG-003 (registration — invalid email)**
Location: "registration". Keywords: "email" + ("invalid" OR "format").

**BUG-004 (registration — 500 duplicate email)**
Location: "registration". Keywords: "email" + ("duplicate" OR "error").

**BUG-005 (tasks — blank title)**
Location: "tasks". Keywords: "task" + ("blank" OR "title" OR "empty").

**BUG-006 (tasks — completed shows in active)**
Location: "tasks". Keywords: "task" + ("completed" OR "active" OR "filter").

**BUG-007 (billing — seat count to 0)**
Location: "billing". Keywords: "seat" + ("zero" OR "minimum" OR "decrement").

**BUG-008 (billing — promo 100% discount)**
Location: "billing". Keywords: "promo" + ("discount" OR "percent" OR "code").

**BUG-009 (profile — bio not saved)**
Location: "profile". Keywords: "bio" + ("save" OR "update").

**BUG-010 (profile — avatar any file type)**
Location: "profile". Keywords: "avatar" + ("upload" OR "file" OR "exe").
