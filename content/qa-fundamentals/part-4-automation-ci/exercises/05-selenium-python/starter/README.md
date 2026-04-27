# Starter — Exercise 05: Selenium + Python

Follow these steps in order.

## Step 1 — Install dependencies

```bash
pip install -r requirements.txt
```

You also need Google Chrome installed. The ChromeDriver version must match your Chrome version — `selenium>=4.6` handles this automatically via Selenium Manager.

## Step 2 — Understand the fixture

Open `test_login.py`. The `driver` fixture at the top creates a Chrome browser before each test and quits it after:

```python
@pytest.fixture
def driver():
    d = webdriver.Chrome()
    yield d      # test runs here
    d.quit()     # cleanup happens here
```

You do not need to change this. Just accept `driver` as a parameter in your test function.

## Step 3 — Write the test body

Replace the TODO comments and the `pass` statement.

**Navigate to the login page:**
```python
driver.get(BASE_URL + "/login")
```

**Find and fill the email field:**
```python
driver.find_element(By.NAME, "email").send_keys("user@taskforge.example.com")
```

If `By.NAME` does not find it, try `By.ID`, `By.CSS_SELECTOR`, or `By.XPATH`. Use your browser's DevTools to inspect the input element.

**Find and fill the password field:**
```python
driver.find_element(By.NAME, "password").send_keys("password123")
```

**Submit the form:**
```python
driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
```

**Wait for and assert the dashboard heading:**
```python
wait = WebDriverWait(driver, 10)
heading = wait.until(
    EC.visibility_of_element_located((By.TAG_NAME, "h1"))
)
assert "Dashboard" in heading.text
```

`WebDriverWait` keeps checking until the element appears or 10 seconds pass. This is the Selenium equivalent of Playwright's smart waits.

## Step 4 — Run the test

```bash
pytest test_login.py -v
```

The `-v` flag shows detailed output. You should see `PASSED` next to `test_login_shows_dashboard`.

## Step 5 — If something goes wrong

- `NoSuchElementException` — the selector is wrong. Open DevTools in Chrome and inspect the element.
- `TimeoutException` — the page did not load in time, or the heading never appeared. Check that the login actually succeeded (wrong credentials?).
- `WebDriverException: ChromeDriver not found` — re-install selenium: `pip install --upgrade selenium`. Selenium Manager auto-downloads ChromeDriver.
