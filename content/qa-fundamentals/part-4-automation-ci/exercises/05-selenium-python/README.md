# Exercise 05 — Selenium + Python

## Mission

Write a Selenium/pytest test in Python that:
1. Opens the TaskForge login page
2. Enters valid credentials
3. Submits the form
4. Asserts the dashboard heading is visible

This exercise introduces you to the Python ecosystem for browser automation — a common alternative to Node.js Playwright in many organisations.

## Technique

- `webdriver.Chrome()` — launches a Chrome browser
- `driver.get(url)` — navigate to a URL
- `driver.find_element(By.NAME, 'email')` — find an element
- `.send_keys('text')` — type into an input
- `.click()` — click an element
- `pytest` fixtures — `@pytest.fixture` sets up the driver before the test and quits it after
- `WebDriverWait` + `EC.visibility_of_element_located` — wait for an element to appear

## Deliverable

A completed `test_login.py` where the `test_login_shows_dashboard` function body is filled in.

## How to test locally

```bash
# From the starter/ folder:
pip install -r requirements.txt
pytest test_login.py -v
```

## Pass condition

- `pytest test_login.py` exits with code 0.
- The `test_login_shows_dashboard` function includes at least one assertion.
