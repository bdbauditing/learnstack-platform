import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type { TrackIndex, PartIndex, ExerciseMeta, QuizData } from '@learnstack/shared';

const CONTENT_ROOT = process.env.CONTENT_REPO_PATH ?? path.resolve(__dirname, '../../../../learnstack-qa-track');
// All tracks live under content/{trackSlug}/part-*/
const TRACKS_DIR = path.join(CONTENT_ROOT, 'content');

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

function isDir(fullPath: string): boolean {
  try {
    return fs.statSync(fullPath).isDirectory();
  } catch {
    return false;
  }
}

function extractTitle(readmePath: string, fallback: string): string {
  const content = readFileOr(readmePath);
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function extractOrder(slug: string): number {
  const match = slug.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 999;
}

function buildTrack(trackSlug: string): TrackIndex {
  const trackDir = path.join(TRACKS_DIR, trackSlug);
  const title = extractTitle(path.join(trackDir, 'README.md'), trackSlug);

  const partDirs = readDirSorted(trackDir).filter((name) => {
    const full = path.join(trackDir, name);
    return isDir(full) && name.startsWith('part-');
  });

  const allParts: PartIndex[] = partDirs.map((partSlug) => {
    const partDir = path.join(trackDir, partSlug);
    const exercisesDir = path.join(partDir, 'exercises');
    const quizPath = path.join(partDir, 'quiz.yaml');

    const exerciseSlugs = readDirSorted(exercisesDir).filter((name) =>
      isDir(path.join(exercisesDir, name)),
    );

    const exercises = exerciseSlugs.map((slug) => ({
      slug,
      title: extractTitle(path.join(exercisesDir, slug, 'README.md'), slug),
      order: extractOrder(slug),
      partSlug,
    }));

    return {
      slug: partSlug,
      title: extractTitle(path.join(partDir, 'README.md'), partSlug),
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

  return { slug: trackSlug, title, parts };
}

export function getTracks(): TrackIndex[] {
  const trackSlugs = readDirSorted(TRACKS_DIR).filter((name) =>
    isDir(path.join(TRACKS_DIR, name)),
  );
  return trackSlugs.map(buildTrack);
}

export function getTrack(trackSlug: string): TrackIndex | null {
  const trackDir = path.join(TRACKS_DIR, trackSlug);
  if (!isDir(trackDir)) return null;
  return buildTrack(trackSlug);
}

export function getPart(trackSlug: string, partSlug: string): PartIndex | null {
  const track = getTrack(trackSlug);
  return track?.parts.find((p) => p.slug === partSlug) ?? null;
}

export function getExercise(trackSlug: string, partSlug: string, exerciseSlug: string): ExerciseMeta | null {
  const exerciseDir = path.join(TRACKS_DIR, trackSlug, partSlug, 'exercises', exerciseSlug);
  if (!fs.existsSync(exerciseDir)) return null;

  const specPath = path.join(exerciseDir, 'spec.md');
  const starterDir = path.join(exerciseDir, 'starter');
  const answerDir = path.join(exerciseDir, 'answer-key');

  const starterFiles: Record<string, string> = {};
  if (fs.existsSync(starterDir)) collectFiles(starterDir, starterDir, starterFiles);

  const answerKeyFiles: Record<string, string> = {};
  if (fs.existsSync(answerDir)) collectFiles(answerDir, answerDir, answerKeyFiles);

  return {
    slug: exerciseSlug,
    title: extractTitle(path.join(exerciseDir, 'README.md'), exerciseSlug),
    order: extractOrder(exerciseSlug),
    partSlug,
    spec: readFileOr(specPath),
    starterFiles,
    answerKeyFiles,
  };
}

export function getQuiz(trackSlug: string, partSlug: string): QuizData | null {
  const quizPath = path.join(TRACKS_DIR, trackSlug, partSlug, 'quiz.yaml');
  if (!fs.existsSync(quizPath)) return null;
  try {
    const raw = yaml.load(fs.readFileSync(quizPath, 'utf8')) as { quiz: QuizData };
    return raw.quiz;
  } catch {
    return null;
  }
}

export function getConceptsMd(trackSlug: string, partSlug: string): string {
  const conceptsPath = path.join(TRACKS_DIR, trackSlug, partSlug, 'concepts.md');
  return readFileOr(conceptsPath);
}

function collectFiles(baseDir: string, currentDir: string, out: Record<string, string>) {
  for (const entry of fs.readdirSync(currentDir)) {
    const full = path.join(currentDir, entry);
    const rel = path.relative(baseDir, full);
    if (isDir(full)) {
      collectFiles(baseDir, full, out);
    } else {
      out[rel] = readFileOr(full);
    }
  }
}
