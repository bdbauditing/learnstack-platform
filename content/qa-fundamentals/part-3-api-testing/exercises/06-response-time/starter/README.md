# Starter — Exercise 06: Response-Time Assertions

1. Add `pm.expect(pm.response.responseTime).to.be.below(500)` to GET requests
2. Add `pm.expect(pm.response.responseTime).to.be.below(1000)` to write requests
3. Run collection, observe which endpoint fails
4. Document the slow endpoint in `perf-findings.yaml`
5. Adjust that endpoint's threshold to `measured_time * 1.2` (give 20% buffer)
6. Re-run until Newman exits 0
