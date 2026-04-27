# Grader Notes — Exercise 01

## Pass Condition
3 of 4 bugs must be matched.

## BUG-001
Accept any bug where:
- location contains "login" (anywhere)
- title/actual mentions "button" AND "disabled"

## BUG-002
Accept any bug where:
- location contains "login/password" or "login"
- text mentions "plain", "text", "visible", OR "not masked"

## BUG-003
Most learners will catch this one — it's the most obvious.
Accept location "login" or "login/forgot".

## BUG-004
This is the hardest. Accept:
- Any mention of "error message" + "wrong" response text
- Location anywhere in "login"
- No need for learners to use the word "enumeration" — just noticing the wrong message is enough.
