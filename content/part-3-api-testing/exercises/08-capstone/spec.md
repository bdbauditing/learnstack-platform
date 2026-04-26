# Exercise 08 Spec — Capstone

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
    - "--iteration-data"
    - "data.csv"
  requiredOutputPatterns:
    - "requests executed"
    - "iterations"
  forbiddenOutputPatterns:
    - "AssertionError"
    - "test failed"
```

## Structural Requirements (checked by secondary structured-doc pass)
- At least 25 requests (Newman output: "N requests executed")
- At least 5 CSV iterations (Newman output: "N iterations")
- "requests executed" and "iterations" both in Newman stdout

## Learning Objective
Synthesis exercise — learner applies auth chaining, negative testing, data-driven iteration, and response-time assertions all in one collection.
