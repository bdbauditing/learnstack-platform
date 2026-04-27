# Exercise 02 Spec — Auth Chaining

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
  requiredOutputPatterns:
    - "requests executed"
  forbiddenOutputPatterns:
    - "AssertionError"
    - "test failed"
```

## Pass Conditions
- Login request captures token into collection variable
- Protected requests succeed (200/201)
- No-token request returns 401 and assertion catches it
- All assertions pass → Newman exits 0

## Learning Objective
Auth chaining is the #1 practical skill for API testing. Learner must NOT hardcode tokens.
