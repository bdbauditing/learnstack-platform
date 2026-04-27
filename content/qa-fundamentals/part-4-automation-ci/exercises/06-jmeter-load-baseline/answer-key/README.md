# Answer Key — Exercise 06: JMeter Load Baseline

## Grader config (authoritative)

```yaml
grader: script-runs
submissionFile: load-test.jmx
options:
  scriptType: jmeter
  expectedExitCode: 0
```

## Grader notes

- JMeter exits 0 only if all assertions in the plan pass. The learner must set the Response Assertion to check HTTP 200.
- The grader patches the HTTP Sampler host using `-Jbase_host=<staging-host>` passed to JMeter via `-J` property overrides. The `.jmx` starter uses `${__P(base_host,TODO_HOSTNAME)}` to pick this up automatically.
- If the learner hardcoded the hostname directly (removing the `__P` property reference), the grader will patch it via a search-and-replace on the XML before running.
- A plan with 0 threads or no assertion is a fail.
- `perf-baseline.yaml` is not automatically graded — manual review checks that null values were replaced.

## Key configuration values (for reference)

| Field | Required value |
|---|---|
| ThreadGroup.num_threads | 20 |
| ThreadGroup.ramp_time | 5 (or any value ≥ 1) |
| Assertion field | Assertion.response_code |
| Assertion value | 200 |

## Common mistakes

- Leaving `num_threads` at 1 — the test passes but does not meet the "20 concurrent" requirement.
- Removing the Response Assertion — JMeter then exits 0 even on 404 responses.
- Running in GUI mode and reporting higher latency than non-GUI mode produces.
- Setting `passed_slo: true` when p95 was actually over 500ms.
