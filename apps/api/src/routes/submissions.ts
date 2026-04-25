import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth.js';
import { runGrader } from '../lib/grader-runner.js';

const router = Router();
const prisma = new PrismaClient();

const ALLOW_LOCAL = process.env.ALLOW_LOCAL_FORK_PATHS === 'true';
const GITHUB_URL_RE = /^https?:\/\/github\.com\/.+/;

function validateForkUrl(url: string): string | null {
  if (GITHUB_URL_RE.test(url)) return null;
  const isLocal = url.startsWith('/') || url.startsWith('file://');
  if (ALLOW_LOCAL && isLocal) return null;
  return ALLOW_LOCAL
    ? 'forkUrl must be a github.com URL or an absolute local path (ALLOW_LOCAL_FORK_PATHS=true)'
    : 'forkUrl must be a github.com HTTPS URL (e.g. https://github.com/you/learnstack-qa-track)';
}

router.use(requireAuth);

// POST /api/submissions
router.post('/', async (req, res) => {
  const { exerciseId, forkUrl, commitSha } = req.body ?? {};
  const userId = req.user!.sub;

  if (!exerciseId || !forkUrl) {
    res.status(400).json({ error: 'Bad Request', message: 'exerciseId and forkUrl are required' });
    return;
  }

  const urlError = validateForkUrl(forkUrl);
  if (urlError) {
    res.status(400).json({ error: 'Bad Request', message: urlError });
    return;
  }

  const submission = await prisma.submission.create({
    data: {
      userId,
      exerciseId,
      forkUrl,
      commitSha: commitSha || null,
      payload: { forkUrl, commitSha },
      status: 'PENDING',
    },
  });

  // Fire-and-forget grading (no await — returns immediately)
  runGrader(submission.id).catch((e) => console.error('Grader error:', e));

  res.status(202).json(toDto(submission));
});

// GET /api/submissions/:id
router.get('/:id', async (req, res) => {
  const submission = await prisma.submission.findUnique({ where: { id: req.params.id } });

  if (!submission) {
    res.status(404).json({ error: 'Not Found', message: 'Submission not found' });
    return;
  }

  // Only owner or admin can view
  if (submission.userId !== req.user!.sub && req.user!.role !== 'ADMIN') {
    res.status(403).json({ error: 'Forbidden', message: 'Not your submission' });
    return;
  }

  res.json(toDto(submission));
});

// GET /api/submissions?exerciseId=part-X/slug
router.get('/', async (req, res) => {
  const { exerciseId } = req.query;
  const userId = req.user!.sub;

  const where: Record<string, unknown> = { userId };
  if (exerciseId && typeof exerciseId === 'string') {
    where.exerciseId = exerciseId;
  }

  const submissions = await prisma.submission.findMany({
    where,
    orderBy: { submittedAt: 'desc' },
    take: 50,
  });

  res.json(submissions.map(toDto));
});

function toDto(s: {
  id: string;
  exerciseId: string;
  forkUrl: string;
  commitSha: string | null;
  status: string;
  score: number | null;
  graderOutput: unknown;
  submittedAt: Date;
  gradedAt: Date | null;
}) {
  return {
    id: s.id,
    exerciseId: s.exerciseId,
    forkUrl: s.forkUrl,
    commitSha: s.commitSha,
    status: s.status,
    score: s.score,
    graderOutput: s.graderOutput,
    submittedAt: s.submittedAt.toISOString(),
    gradedAt: s.gradedAt?.toISOString() ?? null,
  };
}

export default router;
