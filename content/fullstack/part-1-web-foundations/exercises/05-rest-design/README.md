# Exercise 05 — REST API Design for a Blog

## Overview

Before writing a single line of server code, good API design prevents problems later. In this exercise you will design a complete REST API for a simple blog platform with users, posts, and comments.

## Your Task

Open `starter/submission.yaml` and fill in the REST API design for a blog that supports:

- **Users**: register, read profile, update profile, delete account
- **Posts**: list all, create, read one, update, delete (only by author)
- **Comments**: list on a post, add to a post, delete a comment

For each endpoint specify:
- HTTP method
- URL path
- Brief description
- What status code a successful response returns

## Rules

- Use resource nouns, not action verbs in URLs
- Nest comments under posts (they belong to a post)
- Use plural nouns for collections
- Authentication would be via a Bearer token header — note which endpoints require it

## Grading

- Grader: `structured-doc`
