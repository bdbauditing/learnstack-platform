# Exercise 01 Spec — First Collection: CRUD

## Grader Config

```yaml
grader: script-runs
submissionFile: collection.json
options:
  scriptType: newman
  expectedExitCode: 0
  args:
    - "--environment"
    - "environment.json"
    - "--reporters"
    - "cli"
  requiredOutputPatterns:
    - "requests executed"
  forbiddenOutputPatterns:
    - "AssertionError"
    - "test failed"
```

## Pass Conditions
- Newman exits 0
- All pm.test() assertions pass against the live API
- Minimum 5 requests in collection

## Planted Bugs in API
None — this exercise tests the happy path. The API is clean for this exercise.

## Learning Objective
Learner builds their first complete Postman collection and learns to write pm.test() assertions.
