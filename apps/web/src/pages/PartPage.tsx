import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import type { TrackIndex, QuizData } from '@learnstack/shared';
import { api } from '../lib/api.ts';
import Nav from '../components/Nav.tsx';
import Quiz from '../components/Quiz.tsx';
import 'highlight.js/styles/github.css';

type Tab = 'concepts' | 'exercises' | 'quiz';

// Allow class attributes on code/pre so rehype-highlight classes survive sanitization
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
    ])
      .then(([t, md, q]) => {
        setTrack(t);
        setConceptsMd(md);
        setQuiz(q);
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
            {part.exerciseCount === 0 ? (
              <p className="text-sm text-gray-400">No exercises in this part.</p>
            ) : (
              <ExerciseList trackSlug={trackSlug!} partSlug={partSlug!} count={part.exerciseCount} />
            )}
          </div>
        )}

        {/* Quiz tab */}
        {tab === 'quiz' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {quiz ? (
              <Quiz quiz={quiz} />
            ) : (
              <p className="text-sm text-gray-400">No quiz for this part.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// Fetch concepts.md via the exercise endpoint workaround: use /api/tracks/:t/parts/:p
// The concepts content is served through the part's raw file listing on the server.
// For now we fetch via a dedicated endpoint we'll add to the API.
async function fetchConceptsMd(trackSlug: string, partSlug: string): Promise<string> {
  const res = await fetch(`/api/tracks/${trackSlug}/parts/${partSlug}/concepts`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });
  if (!res.ok) return '';
  const data = await res.json() as { content: string };
  return data.content ?? '';
}

// Lazy exercise list — loads slugs from the part index
function ExerciseList({ trackSlug, partSlug, count }: { trackSlug: string; partSlug: string; count: number }) {
  const [exercises, setExercises] = useState<Array<{ slug: string; title: string; order: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.tracks.getPart(trackSlug, partSlug)
      .then(() => {
        // Part index doesn't include exercise slugs — fetch track to get exercise slugs
        // For Step 2 we show placeholder numbered entries based on count
        const placeholders = Array.from({ length: count }, (_, i) => ({
          slug: '',
          title: `Exercise ${String(i + 1).padStart(2, '0')}`,
          order: i + 1,
        }));
        setExercises(placeholders);
      })
      .finally(() => setLoading(false));
  }, [trackSlug, partSlug, count]);

  if (loading) return <p className="text-sm text-gray-400">Loading exercises…</p>;

  return (
    <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
      {exercises.map((ex) => (
        <div key={ex.order} className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-mono flex items-center justify-center shrink-0">
              {ex.order}
            </span>
            <span className="text-sm text-gray-700">{ex.title}</span>
          </div>
          <StatusBadge order={ex.order} />
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ order }: { order: number }) {
  if (order <= 2) {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
        Submitted
      </span>
    );
  }
  if (order === 3) {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">
        In progress
      </span>
    );
  }
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 font-medium">
      Not started
    </span>
  );
}
