# Grader Notes — Exercise 01

## Bug Catch Mapping

A test case catches a bug if:
- BUG-001: test verifies submit button is enabled after filling both fields
- BUG-002: test uses an invalid email format and asserts a validation error appears
- BUG-003: test uses a 5–7 char password and asserts an error (min length not met)
- BUG-004: test uses wrong password and asserts the error does NOT mention "email not found"
- BUG-005: test logs out then navigates back and asserts dashboard is NOT visible

## Pass Condition
4/5 bugs caught.

## Common Miss
BUG-004 and BUG-005 are the hardest. BUG-004 requires the learner to think about information disclosure. BUG-005 requires a logout step.
