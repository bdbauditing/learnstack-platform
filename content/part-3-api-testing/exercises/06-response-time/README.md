# Exercise 06 — Response-Time Assertions

**Time:** ~25 minutes
**Grader:** script-runs (Newman)
**Pass threshold:** Newman exits 0 + structural requirements met

## Your mission

Add `pm.expect(pm.response.responseTime).to.be.below(N)` assertions to a collection that tests 5 endpoints. One endpoint is intentionally slow and your assertion must **catch it as a failure** — but then you will fix the assertion threshold to document the actual performance instead.

## Wait — if the slow endpoint fails the assertion, won't Newman exit 1?

Yes. This exercise has two phases:

**Phase A:** Run the collection with strict thresholds (reads < 500ms, writes < 1000ms). Observe which endpoint fails.

**Phase B:** Document the finding in `starter/perf-findings.yaml`, then adjust that ONE endpoint's assertion to its actual measured time + 20% buffer (e.g. if it takes 3200ms, set threshold to 3840ms). The collection should now pass Newman.

## Endpoints to test

- `GET /tasks` — should be < 500ms
- `GET /tasks/:id` — should be < 500ms
- `POST /tasks` — should be < 1000ms
- `PATCH /tasks/:id` — should be < 1000ms
- `GET /reports/export` — **intentionally slow** (TODO: this endpoint returns in ~3-5s in the buggy app)

## Deliverable

`starter/collection.json` — collection with adjusted threshold on the slow endpoint
`starter/environment.json`
`starter/perf-findings.yaml` — documents the slow endpoint + measured time + recommendation

## How to test locally

```bash
newman run collection.json --environment environment.json
```
