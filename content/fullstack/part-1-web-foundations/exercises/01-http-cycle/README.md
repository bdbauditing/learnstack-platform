# Exercise 01 — The HTTP Request/Response Cycle

## Overview

In this exercise you will document a real HTTP GET request and its response. This builds a concrete understanding of how the browser and server communicate before we write any backend code.

## Instructions

1. Open your browser and navigate to `https://jsonplaceholder.typicode.com/posts/1`.
2. Open DevTools (F12 or Cmd+Option+I) and go to the **Network** tab.
3. Reload the page so the request appears.
4. Click on the request for `/posts/1`.
5. Examine the **Headers** and **Response** tabs.

Now open `starter/submission.yaml` and fill in every field marked `TODO` based on what you observe.

## What to Document

- The full request line (method + URL + protocol version)
- At least 3 request headers sent by the browser
- The response status code and reason phrase
- At least 3 response headers
- The first 3 fields from the JSON response body

## Grading

- Grader: `structured-doc`
