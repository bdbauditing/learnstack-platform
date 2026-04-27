# Exercise 06 — Debugging with the Network Tab

## Overview

Real-world debugging starts with reading network traffic. In this exercise you will use browser DevTools to diagnose a series of API request issues and document your findings.

## Setup

Visit the following URLs in your browser with DevTools (Network tab) open and document what you find for each scenario.

### Scenario A — 404 Not Found

Open: `https://jsonplaceholder.typicode.com/posts/9999`

This should return a 404 because there is no post with id 9999.

### Scenario B — Successful JSON Response

Open: `https://jsonplaceholder.typicode.com/users/1`

Observe a successful 200 response with a JSON body.

### Scenario C — Query String Parameters

Open: `https://jsonplaceholder.typicode.com/posts?userId=1`

Observe how query string parameters appear in the URL and how they filter the results.

### Scenario D — Slow Request Simulation

Using DevTools Network tab "throttling" feature:
1. Click the throttle dropdown (defaults to "No throttling").
2. Select "Slow 3G".
3. Reload `https://jsonplaceholder.typicode.com/posts/1`.
4. Observe the Timing breakdown.
5. Switch back to "No throttling".

## Fill in submission.yaml

Document your observations for each scenario in `starter/submission.yaml`.

## Grading

- Grader: `structured-doc`
