# Exercise 05 — Spec

## Grader config

```yaml
grader: script-runs
submissionFile: test_login.py
options:
  scriptType: python-pytest
  expectedExitCode: 0
```

## Detailed requirements

1. `test_login.py` must import `pytest`, `webdriver` from `selenium`, and `By` from `selenium.webdriver.common.by`.
2. A `@pytest.fixture` named `driver` must be defined. It must yield a `webdriver.Chrome()` instance and call `.quit()` in teardown.
3. The function `test_login_shows_dashboard(driver)` must exist and accept the `driver` fixture.
4. The function body must call `driver.get(...)` with a non-placeholder URL.
5. The function must interact with at least two form fields.
6. The function must include at least one assertion (e.g., `assert` statement or `WebDriverWait` for an element).
7. Running `pytest test_login.py` must exit with code 0.

## Grader notes

- The grader sets `TASKFORGE_URL` environment variable to the real staging URL. The learner's code should read `os.environ.get('TASKFORGE_URL', BASE_URL)`.
- The grader runs Chrome in headless mode via `options.add_argument('--headless')` — the learner does not need to add this themselves; the grader patches `webdriver.Chrome` to use headless options automatically.
- A test that uses `pass` in the body and exits 0 with no assertions is a fail on manual review even if the exit code is 0.
