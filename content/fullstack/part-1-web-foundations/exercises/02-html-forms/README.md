# Exercise 02 — HTML Form POST Flow

## Overview

HTML forms are the oldest and most reliable way to send user data to a server. Understanding the form POST flow — encoding, transport, and the Post–Redirect–Get pattern — is essential before building any backend that handles user input.

## Instructions

### Part A — Observe a Real Form POST

1. Go to `https://httpbin.org/forms/post` in your browser with DevTools open (Network tab).
2. Fill in some values and submit the form.
3. Observe the request that appears in the Network tab (it will be a POST to `/post`).
4. Examine the **Headers** and **Payload/Body** tabs.

### Part B — Analyse the Encoding

The browser encodes form fields as `application/x-www-form-urlencoded` by default.

For example, a form with fields `username=alice` and `message=hello world` becomes:
```
username=alice&message=hello+world
```

Special characters are percent-encoded. Spaces become `+` or `%20`.

### Part C — Fill in submission.yaml

Open `starter/submission.yaml` and complete all `TODO` fields based on your observations and understanding of the concepts.

## Grading

- Grader: `structured-doc`
