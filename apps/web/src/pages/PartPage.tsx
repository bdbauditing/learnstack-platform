import { useEffect, useState } from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import type { TrackIndex, QuizData, ExerciseProgress, QuizAttemptDto } from '@learnstack/shared';
import { api } from '../lib/api.ts';
import Nav from '../components/Nav.tsx';
import Quiz from '../components/Quiz.tsx';
import 'highlight.js/styles/github.css';

type Tab = 'concepts' | 'exercises' | 'quiz';

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code ?? []), 'className'],
    pre: [...(defaultSchema.attributes?.pre ?? []), 'className'],
    span: [...(defaultSchema.attributes?.span ?? []), 'className'],
  },
};

export default function PartPage() {
  const { trackSlug, partSlug } = useParams<{ trackSlug: string; partSlug: string }>();
  const [track, setTrack] = useState<TrackIndex | null>(null);
  const [conceptsMd, setConceptsMd] = useState('');
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [latestAttempt, setLatestAttempt] = useState<QuizAttemptDto | null>(null);
  const [progress, setProgress] = useState<ExerciseProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Tab>('concepts');

  useEffect(() => {
    if (!trackSlug || !partSlug) return;
    setLoading(true);

    Promise.all([
      api.tracks.get(trackSlug),
      fetchConceptsMd(trackSlug, partSlug),
      api.tracks.getQuiz(trackSlug, partSlug).catch(() => null),
      api.quizAttempts.listMe(partSlug).then((a) => a[0] ?? null).catch(() => null),
      api.progress.getPart(trackSlug!, partSlug).catch(() => []),
    ])
      .then(([t, md, q, attempt, prog]) => {
        setTrack(t);
        setConceptsMd(md);
        setQuiz(q);
        setLatestAttempt(attempt);
        setProgress(prog);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [trackSlug, partSlug]);

  const part = track?.parts.find((p) => p.slug === partSlug);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="flex items-center justify-center py-24 text-gray-400 text-sm">Loading…</div>
      </div>
    );
  }

  if (error || !part) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="max-w-3xl mx-auto px-6 py-10 text-red-600 text-sm">{error || 'Part not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
          <Link to="/dashboard" className="hover:text-gray-600">Dashboard</Link>
          <span>/</span>
          <span className="text-gray-600">{part.title}</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">{part.title}</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-gray-200">
          {(['concepts', 'exercises', 'quiz'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                tab === t
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
              {t === 'quiz' && latestAttempt && (
                <span className={`ml-1.5 text-xs ${latestAttempt.passed ? 'text-green-500' : 'text-red-400'}`}>
                  {latestAttempt.passed ? '✓' : '✗'}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Concepts tab */}
        {tab === 'concepts' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {conceptsMd ? (
              <article className="prose prose-sm prose-gray max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[
                    [rehypeSanitize, sanitizeSchema],
                    rehypeHighlight,
                  ]}
                >
                  {conceptsMd}
                </ReactMarkdown>
              </article>
            ) : (
              <p className="text-sm text-gray-400">No concepts content for this part.</p>
            )}
          </div>
        )}

        {/* Exercises tab */}
        {tab === 'exercises' && (
          <div className="space-y-3">
            {part.exercises.length === 0 ? (
              <p className="text-sm text-gray-400">No exercises in this part.</p>
            ) : (
              <ExerciseList
                trackSlug={trackSlug!}
                partSlug={partSlug!}
                exercises={part.exercises}
                progress={progress}
              />
            )}
          </div>
        )}

        {/* Quiz tab */}
        {tab === 'quiz' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {quiz ? (
              <Quiz
                quiz={quiz}
                quizId={partSlug}
                latestAttempt={latestAttempt ?? undefined}
              />
            ) : (
              <p className="text-sm text-gray-400">No quiz for this part.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

async function fetchConceptsMd(trackSlug: string, partSlug: string): Promise<string> {
  const res = await fetch(`/api/tracks/${trackSlug}/parts/${partSlug}/concepts`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });
  if (!res.ok) return '';
  const data = await res.json() as { content: string };
  return data.content ?? '';
}

function ExerciseList({
  trackSlug,
  partSlug,
  exercises,
  progress,
}: {
  trackSlug: string;
  partSlug: string;
  exercises: Array<{ slug: string; title: string; order: number }>;
  progress: ExerciseProgress[];
}) {
  const progressMap = new Map(progress.map((p) => [p.exerciseId, p]));

  return (
    <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
      {exercises.map((ex) => {
        const prog = progressMap.get(`${partSlug}/${ex.slug}`);
        return (
          <NavLink
            key={ex.slug}
            to={`/tracks/${trackSlug}/parts/${partSlug}/exercises/${ex.slug}`}
            className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-mono flex items-center justify-center shrink-0">
                {ex.order}
              </span>
              <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                {ex.title}
              </span>
            </div>
            <ExerciseStatusBadge status={prog?.status ?? null} />
          </NavLink>
        );
      })}
    </div>
  );
}

function ExerciseStatusBadge({ status }: { status: string | null }) {
  if (status === 'PASSED') {
    return <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Passed</span>;
  }
  if (status === 'FAILED') {
    return <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">Failed</span>;
  }
  if (status === 'PENDING' || status === 'GRADING') {
    return <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">Grading…</span>;
  }
  if (status === 'ERROR') {
    return <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium">Error</span>;
  }
  return <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 font-medium">Not started</span>;
}
