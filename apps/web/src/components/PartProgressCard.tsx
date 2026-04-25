import { useNavigate } from 'react-router-dom';
import type { PartProgress } from '@learnstack/shared';

const STATUS_COLORS: Record<string, string> = {
  PASSED: 'bg-green-500',
  FAILED: 'bg-red-400',
  PENDING: 'bg-blue-300',
  GRADING: 'bg-blue-300',
  ERROR: 'bg-orange-400',
};

function StatusDot({ status }: { status: string | null }) {
  const color = status ? (STATUS_COLORS[status] ?? 'bg-gray-200') : 'bg-gray-200';
  return <span className={`w-5 h-5 rounded-sm inline-block ${color}`} title={status ?? 'Not started'} />;
}

function QuizBadge({ status, score }: { status: 'PASSED' | 'FAILED' | 'NOT_ATTEMPTED'; score: number | null }) {
  if (status === 'NOT_ATTEMPTED') {
    return <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">Quiz not taken</span>;
  }
  const passed = status === 'PASSED';
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      Quiz {passed ? 'passed' : 'failed'} {score !== null ? `(${Math.round(score * 100)}%)` : ''}
    </span>
  );
}

interface Props {
  part: PartProgress;
  trackSlug: string;
  /** When true, clicking exercise badges navigates to the exercise. */
  navigable?: boolean;
}

export default function PartProgressCard({ part, trackSlug, navigable = true }: Props) {
  const navigate = useNavigate();
  const passed = part.exercises.filter((e) => e.status === 'PASSED').length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{part.title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{passed}/{part.exercises.length} exercises passed</p>
        </div>
        <QuizBadge status={part.quizStatus} score={part.quizScore} />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {part.exercises.map((ex) => (
          <button
            key={ex.slug}
            disabled={!navigable}
            onClick={() =>
              navigable &&
              navigate(`/tracks/${trackSlug}/parts/${part.slug}/exercises/${ex.slug}`)
            }
            title={`${ex.title} — ${ex.status ?? 'Not started'}`}
            className={`${navigable ? 'cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-blue-400' : 'cursor-default'}`}
          >
            <StatusDot status={ex.status} />
          </button>
        ))}
      </div>
    </div>
  );
}
