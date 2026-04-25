import { useEffect, useState } from 'react';
import type { TrackProgress } from '@learnstack/shared';
import { api } from '../lib/api.ts';
import Nav from '../components/Nav.tsx';
import PartProgressCard from '../components/PartProgressCard.tsx';

const TRACK_SLUG = 'qa-fundamentals';

export default function ProgressPage() {
  const [progress, setProgress] = useState<TrackProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.progress.getFullTrack()
      .then(setProgress)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="flex items-center justify-center py-24 text-gray-400 text-sm">Loading…</div>
      </div>
    );
  }

  if (error || !progress) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="max-w-3xl mx-auto px-6 py-10 text-red-600 text-sm">{error || 'Failed to load'}</div>
      </div>
    );
  }

  const pct = progress.totalItems > 0
    ? Math.round((progress.completedItems / progress.totalItems) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Progress</h1>
        <p className="text-sm text-gray-500 mb-8">QA Fundamentals track</p>

        {/* Completion header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-end justify-between mb-3">
            <div>
              <span className="text-3xl font-bold text-gray-900">{progress.completedItems}</span>
              <span className="text-lg text-gray-400 ml-1">/ {progress.totalItems} items completed</span>
            </div>
            <span className="text-2xl font-semibold text-blue-600">{pct}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex gap-4 mt-4 text-xs text-gray-400">
            <Legend color="bg-green-500" label="Passed" />
            <Legend color="bg-red-400" label="Failed" />
            <Legend color="bg-blue-300" label="Grading" />
            <Legend color="bg-orange-400" label="Error" />
            <Legend color="bg-gray-200" label="Not started" />
          </div>
        </div>

        {/* Per-part cards */}
        <div className="space-y-4">
          {progress.parts.map((part) => (
            <PartProgressCard
              key={part.slug}
              part={part}
              trackSlug={TRACK_SLUG}
              navigable
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-3 h-3 rounded-sm inline-block ${color}`} />
      {label}
    </span>
  );
}
