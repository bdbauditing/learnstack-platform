import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth.js';
import { getTrack } from '../lib/content-loader.js';
import type { TrackProgress } from '@learnstack/shared';

const router = Router();
const prisma = new PrismaClient();

router.use(requireAuth);

// GET /api/progress/me?partSlug=...  → ExerciseProgress[] for one part (PartPage)
// GET /api/progress/me               → TrackProgress (ProgressPage)
router.get('/me', async (req, res) => {
  const userId = req.user!.sub;
  const { partSlug } = req.query;

  if (partSlug && typeof partSlug === 'string') {
    // Backward-compat: per-part flat list used by PartPage
    const submissions = await prisma.submission.findMany({
      where: { userId, exerciseId: { startsWith: `${partSlug}/` } },
      select: { exerciseId: true, status: true, score: true, submittedAt: true },
      orderBy: { submittedAt: 'desc' },
    });

    const latest = new Map<string, { exerciseId: string; status: string; score: number | null }>();
    for (const s of submissions) {
      if (!latest.has(s.exerciseId)) {
        latest.set(s.exerciseId, { exerciseId: s.exerciseId, status: s.status, score: s.score });
      }
    }
    res.json(Array.from(latest.values()));
    return;
  }

  // Full track progress — 2 DB queries, joined in memory
  const [submissions, quizAttempts] = await Promise.all([
    prisma.submission.findMany({
      where: { userId },
      select: { exerciseId: true, status: true, score: true, submittedAt: true },
      orderBy: { submittedAt: 'desc' },
    }),
    prisma.quizAttempt.findMany({
      where: { userId },
      select: { quizId: true, score: true, passed: true, attemptedAt: true },
      orderBy: { attemptedAt: 'desc' },
    }),
  ]);

  // Latest submission per exerciseId
  const latestSub = new Map<string, { status: string; score: number | null }>();
  for (const s of submissions) {
    if (!latestSub.has(s.exerciseId)) {
      latestSub.set(s.exerciseId, { status: s.status, score: s.score });
    }
  }

  // Latest quiz attempt per quizId
  const latestQuiz = new Map<string, { score: number; passed: boolean }>();
  for (const a of quizAttempts) {
    if (!latestQuiz.has(a.quizId)) {
      latestQuiz.set(a.quizId, { score: a.score, passed: a.passed });
    }
  }

  const track = getTrack();
  let completedItems = 0;
  let totalItems = 0;

  const parts = track.parts.map((part) => {
    const quizAttempt = latestQuiz.get(part.slug);
    const quizStatus = quizAttempt
      ? quizAttempt.passed ? 'PASSED' : 'FAILED'
      : 'NOT_ATTEMPTED';

    if (part.hasQuiz) {
      totalItems++;
      if (quizStatus === 'PASSED') completedItems++;
    }

    const exercises = part.exercises.map((ex) => {
      const key = `${part.slug}/${ex.slug}`;
      const sub = latestSub.get(key);
      totalItems++;
      if (sub?.status === 'PASSED') completedItems++;
      return {
        slug: ex.slug,
        title: ex.title,
        order: ex.order,
        status: (sub?.status ?? null) as TrackProgress['parts'][0]['exercises'][0]['status'],
        score: sub?.score ?? null,
      };
    });

    return {
      slug: part.slug,
      title: part.title,
      order: part.order,
      quizStatus: quizStatus as 'PASSED' | 'FAILED' | 'NOT_ATTEMPTED',
      quizScore: quizAttempt?.score ?? null,
      exercises,
    };
  });

  const response: TrackProgress = { totalItems, completedItems, parts };
  res.json(response);
});

export default router;
