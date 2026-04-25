import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { TrackIndex } from '@learnstack/shared';
import { api } from '../lib/api.ts';
import Nav from '../components/Nav.tsx';
import { useAuth } from '../context/AuthContext.tsx';

export default function DashboardPage() {
  const { user } = useAuth();
  const [tracks, setTracks] = useState<TrackIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.tracks.list()
      .then(setTracks)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Your enrolled tracks</p>
        </div>

        {loading && (
          <p className="text-sm text-gray-400">Loading tracks…</p>
        )}

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {tracks.map((track) => (
          <div key={track.slug} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">{track.title}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{track.parts.length} parts</p>
            </div>

            <div className="divide-y divide-gray-100">
              {track.parts.map((part) => (
                <Link
                  key={part.slug}
                  to={`/tracks/${track.slug}/parts/${part.slug}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 text-xs font-mono flex items-center justify-center shrink-0">
                      {part.order}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                        {part.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {part.exerciseCount} exercise{part.exerciseCount !== 1 ? 's' : ''}
                        {part.hasQuiz ? ' · quiz' : ''}
                      </p>
                    </div>
                  </div>
                  <ProgressBadge partOrder={part.order} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

// Placeholder progress — real data comes in a later step
function ProgressBadge({ partOrder }: { partOrder: number }) {
  // Simulate: Part 1 complete, Part 2 in progress, rest not started
  if (partOrder === 1) {
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        Complete
      </span>
    );
  }
  if (partOrder === 2) {
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
        In progress
      </span>
    );
  }
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
      Not started
    </span>
  );
}
