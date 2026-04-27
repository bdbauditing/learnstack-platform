# Grader Notes — Exercise 02

Pass: 4 of 5 bugs matched.

All keywords are generous. BUG-003 accept "match", "same", "mismatch", "confirm" in any combination.
BUG-005 accept "500", "server error", "internal error", "existing email".

## BUG-001
Accept any mention of invalid email going through without an error. Keywords: "email" + ("invalid" OR "format" OR "validation").

## BUG-002
Accept any observation that the strength indicator is wrong or misleading. "Always strong", "never changes", "incorrect meter" all count.

## BUG-003
Most learners will catch this one — mismatched passwords is a classic QA test case.
Accept: "password" + ("match" OR "mismatch" OR "different" OR "confirm").

## BUG-004
Accept: "terms" OR "checkbox" + "submit" OR "bypassed" OR "unchecked".

## BUG-005
The 500 error is very visible. Accept: "500" OR "server error" OR "internal error" + "email" OR "duplicate" OR "exists".
