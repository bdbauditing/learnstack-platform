import { useState } from 'react';
import type { QuizData } from '@learnstack/shared';

interface Props {
  quiz: QuizData;
}

type Answers = Record<string, string[]>;

export default function Quiz({ quiz }: Props) {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  function toggleAnswer(questionId: string, optionText: string, multiChoice: boolean) {
    setAnswers((prev) => {
      const current = prev[questionId] ?? [];
      if (multiChoice) {
        return {
          ...prev,
          [questionId]: current.includes(optionText)
            ? current.filter((o) => o !== optionText)
            : [...current, optionText],
        };
      }
      return { ...prev, [questionId]: [optionText] };
    });
  }

  function handleSubmit() {
    let correct = 0;
    for (const q of quiz.questions) {
      const selected = answers[q.id] ?? [];
      const correctOptions = q.options.filter((o) => o.correct).map((o) => o.text);
      const isCorrect =
        selected.length === correctOptions.length &&
        correctOptions.every((o) => selected.includes(o));
      if (isCorrect) correct++;
    }
    const pct = correct / quiz.questions.length;
    setScore(pct);
    setSubmitted(true);
  }

  function handleRetry() {
    setAnswers({});
    setSubmitted(false);
    setScore(null);
  }

  const passed = score !== null && score >= quiz.pass_threshold;
  const answeredAll = quiz.questions.every((q) => (answers[q.id]?.length ?? 0) > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{quiz.title}</h2>
        <span className="text-xs text-gray-400">Pass threshold: {Math.round(quiz.pass_threshold * 100)}%</span>
      </div>

      {quiz.questions.map((q, qi) => {
        const selected = answers[q.id] ?? [];
        const multi = q.type === 'multi_choice';

        return (
          <div key={q.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <p className="text-sm font-medium text-gray-800">
              <span className="text-gray-400 mr-2">{qi + 1}.</span>
              {q.question}
            </p>

            <div className="space-y-2">
              {q.options.map((opt) => {
                const isSelected = selected.includes(opt.text);
                let optClass = 'flex items-start gap-3 rounded-md px-3 py-2 cursor-pointer transition-colors text-sm ';

                if (!submitted) {
                  optClass += isSelected
                    ? 'bg-blue-50 border border-blue-300 text-blue-900'
                    : 'border border-gray-200 hover:bg-gray-50 text-gray-700';
                } else {
                  if (opt.correct && isSelected) optClass += 'bg-green-50 border border-green-400 text-green-900';
                  else if (opt.correct && !isSelected) optClass += 'bg-green-50 border border-green-300 text-green-800';
                  else if (!opt.correct && isSelected) optClass += 'bg-red-50 border border-red-400 text-red-900';
                  else optClass += 'border border-gray-200 text-gray-500';
                }

                return (
                  <label key={opt.text} className={optClass}>
                    <input
                      type={multi ? 'checkbox' : 'radio'}
                      name={`q-${q.id}`}
                      value={opt.text}
                      checked={isSelected}
                      disabled={submitted}
                      onChange={() => toggleAnswer(q.id, opt.text, multi)}
                      className="mt-0.5 shrink-0"
                    />
                    <span>{opt.text}</span>
                  </label>
                );
              })}
            </div>

            {submitted && (
              <p className="text-xs text-gray-500 bg-gray-50 rounded p-2">
                <span className="font-medium">Explanation:</span> {q.explanation}
              </p>
            )}
          </div>
        );
      })}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!answeredAll}
          className="w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Submit quiz
        </button>
      ) : (
        <div className={`rounded-lg p-4 ${passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`text-sm font-semibold ${passed ? 'text-green-800' : 'text-red-800'}`}>
            {passed ? '✓ Passed' : '✗ Not yet'} — Score: {Math.round(score! * 100)}%
            {' '}({Math.round(score! * quiz.questions.length)}/{quiz.questions.length} correct)
          </p>
          {!passed && (
            <button
              onClick={handleRetry}
              className="mt-3 text-xs text-red-700 underline hover:no-underline"
            >
              Try again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
