# Exercise 06 — JMeter Load Baseline

## Mission

Create a JMeter test plan that simulates 20 concurrent users sending `GET /tasks` requests to TaskForge. After the run, record your results in `perf-baseline.yaml`.

**Pass criteria for the run itself:**
- Error rate: 0%
- p95 response time: < 500ms

## Technique

You will configure three things inside the JMeter GUI (or by editing the XML directly):

1. **Thread Group** — set 20 threads (virtual users) and 5-second ramp-up
2. **HTTP Sampler** — point it at the TaskForge `/tasks` endpoint
3. **Response Assertion** — check that HTTP status is 200
4. **Summary Report listener** — view the p95 and error rate after the run

## Deliverable

- A configured `load-test.jmx` with the Thread Group and Sampler filled in
- A completed `perf-baseline.yaml` with your actual results filled in

## How to test locally

```bash
# Run JMeter in non-GUI mode (recommended for accurate results):
jmeter -n -t load-test.jmx -l results.jtl -e -o report/

# Then open report/index.html in a browser to view p95 and error rate.
```

## Pass condition

- `jmeter -n -t load-test.jmx` exits with code 0 (all assertions in the plan pass).
- `perf-baseline.yaml` has `passed_slo: true` (meaning your recorded p95 was under 500ms and error rate was 0%).
