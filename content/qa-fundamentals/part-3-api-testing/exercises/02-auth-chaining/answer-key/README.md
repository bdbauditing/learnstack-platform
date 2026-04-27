# Grader Notes — Exercise 02

Grader runs Newman. Exit code 0 = all assertions pass.

Key failures to watch for:
- Learner hardcodes token (collection still passes Newman but defeats the learning objective — consider a secondary check for `{{auth_token}}` substring in collection JSON)
- Learner forgets the 401 negative test (missing one assertion still causes partial credit issue — all assertions must pass)
- Env file missing `auth_token` key (Newman will warn but collection variable set at runtime covers this)
