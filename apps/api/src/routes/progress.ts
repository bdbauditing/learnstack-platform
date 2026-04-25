import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

router.use(requireAuth);

// GET /api/progress/me?partSlug=...
// Returns the latest Submission status for each exercise the learner has attempted.
router.get('/me', async (req, res) => {
  const userId = req.user!.sub;
  const { partSlug } = req.query;

  const where: Record<string, unknown> = { userId };
  if (partSlug && typeof partSlug === 'string') {
    where.exerciseId = { startsWith: `${partSlug}/` };
  }

  const submissions = await prisma.submission.findMany({
    where,
    select: { exerciseId: true, status: true, score: true, submittedAt: true },
    orderBy: { submittedAt: 'desc' },
  });

  // Keep only the latest submission per exerciseId
  const latest = new Map<string, { exerciseId: string; status: string; score: number | null }>();
  for (const s of submissions) {
    if (!latest.has(s.exerciseId)) {
      latest.set(s.exerciseId, { exerciseId: s.exerciseId, status: s.status, score: s.score });
    }
  }

  res.json(Array.from(latest.values()));
});

export default router;
