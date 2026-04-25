# Architecture

## Three-repo separation

```
learnstack-qa-track/     ← curriculum content (markdown, YAML, fixtures)
learnstack-platform/     ← this repo (API + web + DB schema)
<target-app>/            ← the application learners test (e.g. TaskForge)
```

**Why separate repos?**

- Content can be updated (new exercises, quiz edits, answer-key fixes) without touching the platform code, and vice versa.
- The curriculum repo can be forked and submitted by learners as a clean GitHub PR workflow without any platform coupling.
- The target app evolves independently — swapping it out doesn't require any change to the platform.

## Content-loader pattern

`apps/api/src/lib/content-loader.ts` reads the curriculum at runtime from the path set by `CONTENT_REPO_PATH` (default: `../../learnstack-qa-track`). In Docker it's mounted read-only at `/content`.

The loader:
- Scans `content/part-*/` directories, reads `README.md` for titles, `exercises/*/` for exercise slugs, `quiz.yaml` for quiz data
- Deduplicates parts with the same order number (keeps whichever has more exercises — handles `part-5-test-management` vs `part-5-management-capstone`)
- Returns typed `TrackIndex` / `PartIndex` / `ExerciseMeta` shapes shared with the frontend via `packages/shared`

**No content is stored in the database.** Progress (submissions, quiz attempts) is stored; content structure is always read live. Adding new exercises to the curriculum repo is immediately reflected without any migration.

## Grading model

Grading is synchronous and in-process. When a submission is created:

1. The POST handler creates a `Submission` row (status `PENDING`) and returns 202 immediately.
2. `runGrader(submissionId)` is called as a fire-and-forget async function in the same process.
3. The grader resolves the fork (git clone for GitHub URLs; direct path for local testing), detects the grader type from `spec.md`, runs the appropriate algorithm, and writes the result back to the `Submission` row.

**Grader types implemented:** `bug-match` (keyword + location matching of found bugs against an answer key). `classification-match` and `structured-doc` are detected but return an "unsupported" result rather than crashing.

**To swap to a queue later:** replace the fire-and-forget call in `routes/submissions.ts` with a message enqueue (Redis, SQS, etc.) and run `runGrader` in a separate worker process. The grader logic and DB write are already isolated in `lib/grader-runner.ts`.

## Auth model

JWT-based, stateless:

- Access token: 15-minute expiry, signed with `JWT_SECRET`
- Refresh token: 7-day expiry, signed with `JWT_REFRESH_SECRET`; used to obtain a new access token without re-login
- Tokens stored in `localStorage` on the client
- `requireAuth` middleware verifies the access token on every protected route
- `requireRole(...roles)` middleware checks the `role` claim in the token; used on all `/api/admin/*` routes
- 401 responses from the API client auto-redirect to `/login` and clear stored tokens

## Database schema

Key tables: `User`, `Submission`, `QuizAttempt`, `Track`, `Enrollment`.

`Submission.exerciseId` is a composite string `"<partSlug>/<exerciseSlug>"` (e.g. `part-1-finding-bugs/01-bug-hunt-login`). This avoids a FK to a content table that doesn't exist in the database — content lives in the filesystem.

Similarly `QuizAttempt.quizId` is the part slug (e.g. `part-1-finding-bugs`).

## Adding more tracks

1. Add a new content directory structure under a new root in the curriculum repo (or a new curriculum repo entirely).
2. If using a new repo, mount it in `docker-compose.yml` as a second volume and update `CONTENT_REPO_PATH`, or extend the content-loader to scan multiple roots.
3. Add a `Track` row (or update the seed) with the new slug.
4. No schema migration is needed for content structure — only for new platform features.

The current platform is hardcoded to serve a single track (`qa-fundamentals`). To support multiple tracks, the `DashboardPage` and `ProgressPage` would need to accept a `trackSlug` parameter, and `GET /api/progress/me` would need a `trackSlug` query param.
