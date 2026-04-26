# Grader Notes — Exercise 08 Capstone

Two-stage grading:
1. bug-match: 8/10 must have location + keyword match
2. structured-doc: each matched report must have non-empty evidence (screenshot, console, network) and correct severity/priority (±1 tolerance)

Both stages must pass. A bug that matches the answer key but has no evidence counts as a FAIL.

Common failure mode: learners find the bugs but don't attach evidence. Coach them to fill in the evidence section even with plausible placeholder values.

## Per-bug grading notes

**BUG-001 (login/submit disabled)**
Location match: "login" (any contains match).
Keywords: "button" + "disabled" in title, actual, or steps.

**BUG-002 (login/password plain text)**
Location match: "login".
Keywords: "password" + ("plain" OR "text" OR "visible" OR "unmasked").

**BUG-003 (registration/invalid email)**
Location match: "registration".
Keywords: "email" + ("invalid" OR "format" OR "validation").

**BUG-004 (registration/500 duplicate email)**
Location match: "registration".
Keywords: "email" + ("500" OR "server error" OR "duplicate" OR "existing").

**BUG-005 (cart/total)**
Location match: "cart".
Keywords: "total" + ("update" OR "quantity" OR "change" OR "stale").

**BUG-006 (cart/coupon)**
Location match: "cart".
Keywords: "coupon" + ("100" OR "free" OR "discount" OR "wrong percent").
This is a Critical bug — if learner rates it High instead of Critical, ±1 tolerance applies and it still passes.

**BUG-007 (checkout/credit card)**
Location match: "checkout".
Keywords: "credit" OR "card" + ("letter" OR "alpha" OR "text" OR "invalid").

**BUG-008 (checkout/email confirmation)**
Location match: "checkout".
Keywords: "email" + ("confirmation" OR "order" OR "not sent" OR "not received").

**BUG-009 (profile/bio save)**
Location match: "profile".
Keywords: "bio" OR "save" + "profile" OR "update".

**BUG-010 (profile/avatar .exe)**
Location match: "profile".
Keywords: "avatar" OR "upload" + ("exe" OR "file type" OR "extension" OR "malicious").
