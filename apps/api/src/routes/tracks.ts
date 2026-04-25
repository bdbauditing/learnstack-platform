import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { requireAuth } from '../middleware/auth.js';
import { getTrack, getPart, getExercise, getQuiz } from '../lib/content-loader.js';

const CONTENT_ROOT = process.env.CONTENT_REPO_PATH ?? path.resolve(__dirname, '../../../../learnstack-qa-track');
const CONTENT_DIR = path.join(CONTENT_ROOT, 'content');

const router = Router();

// All tracks routes require auth
router.use(requireAuth);

// GET /api/tracks — return the full track index
router.get('/', (_req, res) => {
  try {
    const track = getTrack();
    res.json([track]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: String(err) });
  }
});

// GET /api/tracks/:trackSlug — return a single track
router.get('/:trackSlug', (req, res) => {
  try {
    const track = getTrack();
    if (track.slug !== req.params.trackSlug) {
      res.status(404).json({ error: 'Not Found', message: 'Track not found' });
      return;
    }
    res.json(track);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: String(err) });
  }
});

// GET /api/tracks/:trackSlug/parts/:partSlug
router.get('/:trackSlug/parts/:partSlug', (req, res) => {
  const part = getPart(req.params.partSlug);
  if (!part) {
    res.status(404).json({ error: 'Not Found', message: 'Part not found' });
    return;
  }
  res.json(part);
});

// GET /api/tracks/:trackSlug/parts/:partSlug/exercises/:exerciseSlug
router.get('/:trackSlug/parts/:partSlug/exercises/:exerciseSlug', (req, res) => {
  const exercise = getExercise(req.params.partSlug, req.params.exerciseSlug);
  if (!exercise) {
    res.status(404).json({ error: 'Not Found', message: 'Exercise not found' });
    return;
  }
  res.json(exercise);
});

// GET /api/tracks/:trackSlug/parts/:partSlug/concepts
router.get('/:trackSlug/parts/:partSlug/concepts', (req, res) => {
  const conceptsPath = path.join(CONTENT_DIR, req.params.partSlug, 'concepts.md');
  if (!fs.existsSync(conceptsPath)) {
    res.json({ content: '' });
    return;
  }
  res.json({ content: fs.readFileSync(conceptsPath, 'utf8') });
});

// GET /api/tracks/:trackSlug/parts/:partSlug/quiz
router.get('/:trackSlug/parts/:partSlug/quiz', (req, res) => {
  const quiz = getQuiz(req.params.partSlug);
  if (!quiz) {
    res.status(404).json({ error: 'Not Found', message: 'Quiz not found' });
    return;
  }
  res.json(quiz);
});

export default router;
