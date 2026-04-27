# Exercise 06 — Spec

## Grader config

```yaml
grader: script-runs
submissionFile: load-test.jmx
options:
  scriptType: jmeter
  expectedExitCode: 0
```

## Detailed requirements

1. `load-test.jmx` must be valid JMeter XML (parseable by JMeter 5.6).
2. The Thread Group must have 20 threads and a ramp-up period of at least 1 second.
3. There must be at least one HTTP Sampler targeting the `/tasks` endpoint.
4. There must be a Response Assertion that checks HTTP status 200.
5. Running `jmeter -n -t load-test.jmx` must exit with code 0 (meaning all assertions pass on all requests).
6. `perf-baseline.yaml` must have all null values replaced with real numbers and `passed_slo` set to `true` or `false`.

## Grader notes

JMeter exits 0 only when all assertions in the test plan pass on all samples. If any HTTP response is not 200 (e.g., auth failure, 404, 500), JMeter exits non-zero. The grader supplies the real hostname via the environment variable `JMETER_BASE_URL` and patches the sampler host at runtime.

Answer key note: JMeter exits 0 only if all assertions in the plan pass. The learner must set the Response Assertion to check HTTP 200.
