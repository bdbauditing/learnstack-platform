# Exercise 06 Spec — Response-Time Assertions

## Planted Slow Endpoint
GET /reports/export — takes ~3-5 seconds (TODO: set exact delay in test app config)

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
    - "5 requests"
  forbiddenOutputPatterns:
    - "test failed"
```

## Perf Findings Validation
Secondary grader validates perf-findings.yaml contains:
- slow_endpoint (non-empty string)
- measured_time_ms (numeric, > 500)
- recommendation (non-empty string mentioning the endpoint)

## Pass Conditions
1. Newman exits 0 (all assertions pass after threshold adjustment)
2. perf-findings.yaml has all required fields with realistic values
