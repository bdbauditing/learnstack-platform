# Starter — Exercise 02: Bug Hunt Registration

Open **https://learnstack-taskforge-web.onrender.com/register** and find 5 bugs. You need **4/5 to pass**.

> No login needed — go directly to `/register`. If you need to test logged-in flows: `bob@taskforge.io` / `Password1!`, press **Enter** to submit.

Same format as Exercise 01. See the bugs.yaml template below.

## Format

```yaml
bugs:
  - title: "[Area] What's wrong when doing what"
    location: "registration/component-name"
    severity: Critical | High | Medium | Low
    priority: High | Medium | Low
    environment:
      browser: Chrome 130
      os: macOS 14
      viewport: 1440x900
      url: "https://learnstack-taskforge-web.onrender.com/register"
    steps:
      - action: navigate
        url: "/register"
      - action: type
        selector: '[data-test="email"]'
        value: "notanemail"
      - action: click
        selector: '[data-test="submit"]'
    expected: "Validation error: please enter a valid email address"
    actual: "Form submits without any email format error"
```

## Tips

- Test every input field with invalid data.
- Try submitting the form with various fields empty.
- Check that validation messages appear at the right time (on blur vs on submit).
- Try registering with an email you already used.
- Pay attention to the Terms and Conditions checkbox.
