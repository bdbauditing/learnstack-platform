# Starter — Exercise 06: JMeter Load Baseline

Follow these steps in order.

## Step 1 — Verify JMeter is installed

```bash
jmeter -v
```

You should see `Apache JMeter 5.6.x`. If not, download it from https://jmeter.apache.org/download_jmeter.cgi and add the `bin/` folder to your PATH.

## Step 2 — Open the test plan

You can edit the `.jmx` file in one of two ways:

**Option A — JMeter GUI (recommended for beginners):**
```bash
jmeter
```
Then `File > Open` and select `load-test.jmx`.

**Option B — Edit the XML directly** using a text editor. The file has comments pointing to each TODO.

## Step 3 — Configure the Thread Group

In JMeter GUI, expand the test plan tree and click `Task List Users`.

- Set `Number of Threads (users)` to **20**
- Set `Ramp-Up Period (seconds)` to **5**

If editing XML directly, change:
```xml
<stringProp name="ThreadGroup.num_threads">1</stringProp>
<stringProp name="ThreadGroup.ramp_time">1</stringProp>
```
to:
```xml
<stringProp name="ThreadGroup.num_threads">20</stringProp>
<stringProp name="ThreadGroup.ramp_time">5</stringProp>
```

## Step 4 — Configure the HTTP Sampler

Click `GET /tasks` in the tree. Set the server name (hostname) to the real TaskForge server.

If editing XML:
```xml
<stringProp name="HTTPSampler.domain">TODO_HOSTNAME</stringProp>
```
Replace `TODO_HOSTNAME` with the real hostname (without `https://`), e.g. `taskforge.example.com`.

## Step 5 — Verify the Response Assertion

The `Assert HTTP 200` assertion is already configured. It will fail any sample that returns a non-200 status code. Do not remove it.

## Step 6 — Run the test

```bash
# Non-GUI mode is more accurate — no GUI overhead:
jmeter -n -t load-test.jmx -l results.jtl -e -o report/
```

Wait for all 20 threads to finish. The terminal will print a summary.

## Step 7 — Read the results

Open `report/index.html` in a browser. Look for:
- **Error %** — should be 0.00%
- **99th pct** or **95th pct** — look for the p95 column in the statistics table

## Step 8 — Fill in perf-baseline.yaml

Open `perf-baseline.yaml` and replace the null values with your actual measurements:

```yaml
p95_ms: 342        # your actual p95
error_rate_pct: 0.0
passed_slo: true   # true if p95 < 500 AND error_rate = 0
notes: "Ran on staging, 2026-04-24"
```

## Hints

- If you see authentication errors (401/403), the `/tasks` endpoint requires a session token. Add an HTTP Header Manager with a `Cookie` or `Authorization` header.
- Run in non-GUI mode for accurate results. GUI mode adds latency from the GUI thread.
- `results.jtl` is a CSV file you can open in any spreadsheet app.
