# Exercise 04 Spec — API Bug Hunt

## Planted API Bugs

| ID | Endpoint | Description | Category |
|----|----------|-------------|----------|
| BUG-001 | POST /tasks | Returns 200 instead of 201 on successful task creation | Wrong status code |
| BUG-002 | GET /tasks/:id | Response body is missing the `created_at` field despite spec requiring it | Missing field |
| BUG-003 | PATCH /tasks/:id | Accepts an empty string as a valid `title` value and returns 200 | Missing validation |
| BUG-004 | DELETE /tasks/:id | Deleting a non-existent task returns 200 instead of 404 | Wrong status code |

## Grader Config

```yaml
grader: bug-match
submissionFile: api-bugs.yaml
answerKeyFile: api-bugs-expected.yaml
options:
  passThreshold: 3
```

## Notes
BUG-003 (empty string accepted) requires probing — learner must try PATCH with `{"title": ""}` and notice the 200.
BUG-004 is the easiest — try DELETE /tasks/99999999.
