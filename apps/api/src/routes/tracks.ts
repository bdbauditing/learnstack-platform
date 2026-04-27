import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getTracks, getTrack, getPart, getExercise, getQuiz, getConceptsMd } from '../lib/content-loader.js';

const router = Router();

router.use(requireAuth);

// GET /api/tracks
router.get('/', (_req, res) => {
  try {
    res.json(getTracks());
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: String(err) });
  }
});

// GET /api/tracks/:trackSlug
router.get('/:trackSlug', (req, res) => {
  const track = getTrack(req.params.trackSlug);
  if (!track) {
    res.status(404).json({ error: 'Not Found', message: 'Track not found' });
    return;
  }
  res.json(track);
});

// GET /api/tracks/:trackSlug/parts/:partSlug
router.get('/:trackSlug/parts/:partSlug', (req, res) => {
  const part = getPart(req.params.trackSlug, req.params.partSlug);
  if (!part) {
    res.status(404).json({ error: 'Not Found', message: 'Part not found' });
    return;
  }
  res.json(part);
});

// GET /api/tracks/:trackSlug/parts/:partSlug/exercises/:exerciseSlug
router.get('/:trackSlug/parts/:partSlug/exercises/:exerciseSlug', (req, res) => {
  const exercise = getExercise(req.params.trackSlug, req.params.partSlug, req.params.exerciseSlug);
  if (!exercise) {
    res.status(404).json({ error: 'Not Found', message: 'Exercise not found' });
    return;
  }
  res.json(exercise);
});

// GET /api/tracks/:trackSlug/parts/:partSlug/concepts
router.get('/:trackSlug/parts/:partSlug/concepts', (req, res) => {
  const content = getConceptsMd(req.params.trackSlug, req.params.partSlug);
  res.json({ content });
});

// GET /api/tracks/:trackSlug/parts/:partSlug/quiz
router.get('/:trackSlug/parts/:partSlug/quiz', (req, res) => {
  const quiz = getQuiz(req.params.trackSlug, req.params.partSlug);
  if (!quiz) {
    res.status(404).json({ error: 'Not Found', message: 'Quiz not found' });
    return;
  }
  res.json(quiz);
});

export default router;
