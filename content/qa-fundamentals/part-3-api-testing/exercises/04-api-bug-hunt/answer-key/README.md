# Grader Notes — Exercise 04

Grader: bug-match. Pass: 3/4.

Location matching is flexible — "POST /tasks", "POST/tasks", "/tasks POST" all match "POST /tasks".

BUG-003 (empty string) keyword threshold is 0.5 — accept any report mentioning "empty", "blank", or "string" + "title" + "patch".

BUG-002 (missing field): accept "missing", "absent", "not returned" + "created_at" OR "field". Also accept "response" + "missing" without the specific field name.
