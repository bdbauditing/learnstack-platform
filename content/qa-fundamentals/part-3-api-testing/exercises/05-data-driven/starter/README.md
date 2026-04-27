# Starter — Exercise 05: Data-Driven Testing

The `data.csv` file is pre-filled with 10 rows. Do not modify it.

Your job is to build the collection that consumes it:

1. Create a POST /auth/login request with body variables `{{email}}` and `{{password}}`
2. In the Tests tab, assert the response status matches the CSV value:
   ```javascript
   pm.test("Status matches expected for: " + data.scenario, function () {
     pm.expect(pm.response.code).to.equal(parseInt(data.expected_status));
   });
   ```
3. Export as `collection.json` and set your base URL in `environment.json`
4. Run locally to verify all 10 iterations pass:
   ```bash
   newman run collection.json \
     --environment environment.json \
     --iteration-data data.csv
   ```

**The grader runs this exact command. Pass = Newman exits 0 with "iterations" in the output.**
