# Spec — 01-http-cycle

## Overview

Learner documents a real browser HTTP GET request and its response using DevTools.

## Grading

- Grader: `structured-doc`
- Submission file: `submission.yaml`

## Required Fields

- `request.method` — must be "GET"
- `request.url` — must contain "jsonplaceholder"
- `request.protocol` — e.g. "HTTP/1.1" or "HTTP/2"
- `request.headers` — list of at least 3 header objects with `name` and `value`
- `response.status_code` — must be 200
- `response.status_text` — e.g. "OK"
- `response.headers` — list of at least 3 header objects
- `response.body_fields` — at least 3 key/value pairs from the JSON body

## Pass Threshold

0.8 (7 of ~9 required sections populated correctly)
