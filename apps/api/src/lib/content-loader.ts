import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type { TrackIndex, PartIndex, ExerciseMeta, QuizData } from '@learnstack/shared';

const CONTENT_ROOT = process.env.CONTENT_REPO_PATH ?? path.resolve(__dirname, '../../../../learnstack-qa-track');
const CONTENT_DIR = path.join(CONTENT_ROOT, 'content');

function readFileOr(filePath: string, fallback = ''): string {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return fallback;
  }
}

function readDirSorted(dir: string): string[] {
  try {
    return fs.readdirSync(dir).sort();
  } catch {
    return [];
  }
}

// Extracts title from a README.md: first # heading or first line
function extractTitle(readmePath: string): string {
  const content = readFileOr(readmePath);
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : path.basename(path.dirname(readmePath));
}

// Returns first number from a slug: "01-bug-hunt-login" → 1, "part-3-api-testing" → 3
function extractOrder(slug: string): number {
  const match = slug.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 999;
}

export function getTrack(): TrackIndex {
  const partDirs = readDirSorted(CONTENT_DIR).filter((name) => {
    const full = path.join(CONTENT_DIR, name);
    return fs.statSync(full).isDirectory() && name.startsWith('part-');
  });

  const allParts: PartIndex[] = partDirs.map((partSlug) => {
    const partDir = path.join(CONTENT_DIR, partSlug);
    const readmePath = path.join(partDir, 'README.md');
    const exercisesDir = path.join(partDir, 'exercises');
    const quizPath = path.join(partDir, 'quiz.yaml');

    const exerciseSlugs = readDirSorted(exercisesDir).filter((name) =>
      fs.statSync(path.join(exercisesDir, name)).isDirectory(),
    );

    const exercises = exerciseSlugs.map((slug) => ({
      slug,
      title: extractTitle(path.join(exercisesDir, slug, 'README.md')),
      order: extractOrder(slug),
      partSlug,
    }));

    return {
      slug: partSlug,
      title: extractTitle(readmePath),
      order: extractOrder(partSlug),
      exerciseCount: exerciseSlugs.length,
      hasQuiz: fs.existsSync(quizPath),
      exercises,
    };
  });

  // Deduplicate by order number — keep the part with the most exercises
  const byOrder = new Map<number, PartIndex>();
  for (const part of allParts) {
    const existing = byOrder.get(part.order);
    if (!existing || part.exerciseCount > existing.exerciseCount) {
      byOrder.set(part.order, part);
    }
  }
  const parts = Array.from(byOrder.values()).sort((a, b) => a.order - b.order);

  return {
    slug: 'qa-fundamentals',
    title: 'QA Fundamentals',
    parts,
  };
}

export function getPart(partSlug: string): PartIndex | null {
  const track = getTrack();
  return track.parts.find((p) => p.slug === partSlug) ?? null;
}

export function getExercise(partSlug: string, exerciseSlug: string): ExerciseMeta | null {
  const exerciseDir = path.join(CONTENT_DIR, partSlug, 'exercises', exerciseSlug);

  if (!fs.existsSync(exerciseDir)) return null;

  const specPath = path.join(exerciseDir, 'spec.md');
  const starterDir = path.join(exerciseDir, 'starter');
  const answerDir = path.join(exerciseDir, 'answer-key');

  const starterFiles: Record<string, string> = {};
  if (fs.existsSync(starterDir)) {
    collectFiles(starterDir, starterDir, starterFiles);
  }

  const answerKeyFiles: Record<string, string> = {};
  if (fs.existsSync(answerDir)) {
    collectFiles(answerDir, answerDir, answerKeyFiles);
  }

  return {
    slug: exerciseSlug,
    title: extractTitle(path.join(exerciseDir, 'README.md')),
    order: extractOrder(exerciseSlug),
    partSlug,
    spec: readFileOr(specPath),
    starterFiles,
    answerKeyFiles,
  };
}

function collectFiles(baseDir: string, currentDir: string, out: Record<string, string>) {
  for (const entry of fs.readdirSync(currentDir)) {
    const full = path.join(currentDir, entry);
    const rel = path.relative(baseDir, full);
    if (fs.statSync(full).isDirectory()) {
      collectFiles(baseDir, full, out);
    } else {
      out[rel] = readFileOr(full);
    }
  }
}

export function getQuiz(partSlug: string): QuizData | null {
  const quizPath = path.join(CONTENT_DIR, partSlug, 'quiz.yaml');
  if (!fs.existsSync(quizPath)) return null;

  try {
    const raw = yaml.load(fs.readFileSync(quizPath, 'utf8')) as { quiz: QuizData };
    return raw.quiz;
  } catch {
    return null;
  }
}
