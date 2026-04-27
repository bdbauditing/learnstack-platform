# Answer Key — Exercise 05: Selenium + Python

## Grader config (authoritative)

```yaml
grader: script-runs
submissionFile: test_login.py
options:
  scriptType: python-pytest
  expectedExitCode: 0
```

## Grader notes

- Grader sets `TASKFORGE_URL` environment variable to the staging URL.
- Grader patches `webdriver.Chrome` to add `--headless` and `--no-sandbox` options.
- Exit code 0 from `pytest` = pass.
- A `pass`-only test body technically exits 0 — manual review should check for at least one `assert` statement.

## Reference solution (staff only)

```python
import os
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = os.environ.get("TASKFORGE_URL", "TODO: https://taskforge.example.com")


@pytest.fixture
def driver():
    d = webdriver.Chrome()
    yield d
    d.quit()


def test_login_shows_dashboard(driver):
    driver.get(BASE_URL + "/login")

    driver.find_element(By.NAME, "email").send_keys("user@taskforge.example.com")
    driver.find_element(By.NAME, "password").send_keys("password123")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    wait = WebDriverWait(driver, 10)
    heading = wait.until(
        EC.visibility_of_element_located((By.XPATH, "//h1[contains(text(), 'Dashboard')]"))
    )
    assert "Dashboard" in heading.text
```

## Common mistakes

- Calling `driver.find_element(...)` immediately after `.click()` without waiting — the page is still loading.
- Using `By.ID` when the element has no `id` attribute.
- Hardcoding `time.sleep(2)` instead of `WebDriverWait` — the Selenium equivalent of the Playwright flakiness from Ex04.
