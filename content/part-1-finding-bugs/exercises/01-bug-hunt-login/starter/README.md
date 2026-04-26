# Starter — Exercise 01: Bug Hunt Login

Clone this folder. Open the app at **TODO: actual buggy app URL** and find bugs on the login page.

Fill in `bugs.yaml` with each bug you find. You need to find **at least 3 bugs** to pass.

## Format

```yaml
bugs:
  - title: "[Area] What's wrong when doing what"
    location: "login/component-name"
    severity: Critical | High | Medium | Low
    priority: High | Medium | Low
    environment:
      browser: Chrome 130
      os: macOS 14
      viewport: 1440x900
      url: "TODO: actual buggy app URL/login"
    steps:
      - action: navigate
        url: "/login"
      - action: type
        selector: '[data-test="email"]'
        value: "user@example.com"
      - action: type
        selector: '[data-test="password"]'
        value: "correct-password"
      - action: click
        selector: '[data-test="submit"]'
    expected: "User is redirected to dashboard"
    actual: "Submit button is disabled — nothing happens"
```

## Tips

- Test the obvious paths first (happy path, wrong password, empty fields).
- Look at the browser console for JavaScript errors.
- Check network requests in DevTools.
- The `location` field should describe where in the UI the bug lives (e.g. `login/form`, `login/error-message`).
