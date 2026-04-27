import os
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = os.environ.get("TASKFORGE_URL", "TODO: https://taskforge.example.com")


@pytest.fixture
def driver():
    """Set up a Chrome WebDriver and tear it down after the test."""
    d = webdriver.Chrome()
    yield d
    d.quit()


def test_login_shows_dashboard(driver):
    # TODO: navigate to the login page
    # TODO: find the email input and type the test email
    # TODO: find the password input and type the test password
    # TODO: find and click the submit button
    # TODO: wait for the dashboard heading to appear and assert it is visible
    pass
