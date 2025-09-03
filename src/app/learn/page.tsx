'use client';

import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

type Item = {
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
};

type Lesson = {
  id: string;
  title: string;
  passage: string;
  questions: Item[];
};

async function fetchQuestions(passage: string): Promise<{ items: Item[] }> {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ passage, type: 'questions', count: 3 })
  });
  if (!res.ok) throw new Error('Failed to generate questions');
  return res.json();
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 48);
}

function readLessons(): Lesson[] {
  try {
    return JSON.parse(localStorage.getItem('lessons') || '[]');
  } catch {
    return [];
  }
}

export default function LearnPage() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get('lesson');

  const [passage, setPassage] = useState(
    'Photosynthesis converts light energy into chemical energy in plants.'
  );
  const [live, setLive] = useState(true);           // live updates as you type
  const [banner, setBanner] = useState<string | null>(null);

  const q = useQuery({
    queryKey: ['questions', passage],
    queryFn: () => fetchQuestions(passage),
    enabled: live
  });

  const items = useMemo(() => q.data?.items ?? [], [q.data?.items]);
  const [frozenItems, setFrozenItems] = useState<Item[] | null>(null);
  const visibleItems = frozenItems ?? items;

  // When lesson param is present, load it from localStorage and freeze
  useEffect(() => {
    if (!lessonId) return;
    const lessons = readLessons();
    const match = lessons.find((l) => l.id === lessonId);
    if (match) {
      setPassage(match.passage);
      setFrozenItems(match.questions);
      setLive(false);
      setBanner(`Loaded saved lesson: ${match.title}`);
    } else {
      setBanner('Saved lesson not found.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  useEffect(() => {
    if (live) setFrozenItems(null);
  }, [live, passage]);

  function toggleFreeze() {
    if (live) {
      setFrozenItems(items);
      setLive(false);
      setBanner('Frozen current questions.');
    } else {
      setFrozenItems(null);
      setLive(true);
      setBanner(null);
    }
  }

  function saveAsLesson() {
    const lessons = readLessons();
    const id = `${slugify(passage)}-${Date.now().toString(36)}`;
    lessons.push({
      id,
      title: passage.slice(0, 60),
      passage,
      questions: visibleItems
    });
    localStorage.setItem('lessons', JSON.stringify(lessons));
    setBanner('Saved this set as a lesson (local only).');
  }

  return (
    <main className="space-y-4">
      <h2 className="text-xl font-semibold">Learner Flow</h2>

      {banner && (
        <div className="p-2 rounded bg-neutral-800 border border-neutral-700 text-sm">
          {banner}
        </div>
      )}

      <textarea
        className="w-full p-3 bg-neutral-900 rounded border border-neutral-800"
        value={passage}
        onChange={(e) => setPassage(e.target.value)}
        rows={3}
        aria-label="Study passage"
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={toggleFreeze}
          className="px-3 py-2 bg-blue-600 rounded hover:bg-blue-500 disabled:opacity-50"
          disabled={q.isFetching && live}
          aria-pressed={!live}
          aria-busy={q.isFetching && live}
          title={live ? 'Lock current questions' : 'Resume live updates'}
        >
          {live ? (q.isFetching ? 'Loading…' : 'Freeze (Lock this set)') : 'Unfreeze (Live updates)'}
        </button>

        <button
          type="button"
          onClick={saveAsLesson}
          className="px-3 py-2 bg-neutral-700 rounded hover:bg-neutral-600"
          disabled={!visibleItems.length}
          title="Save current questions as a lesson (localStorage)"
        >
          Save as Lesson
        </button>
      </div>

      <div className="space-y-3" aria-live="polite">
        {visibleItems.map((q, i) => (
          <div key={i} className="p-3 rounded border border-neutral-800">
            <p className="font-medium">{q.prompt}</p>
            <ul className="mt-2 list-disc ml-5 text-neutral-300">
              {q.choices.map((c, j) => (
                <li key={j}>{c}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-neutral-400">
              Answer index: {q.answer} — {q.explanation}
            </p>
          </div>
        ))}
        {!visibleItems.length && (
          <p className="text-neutral-400 text-sm">Type in the passage to see questions appear.</p>
        )}
      </div>
    </main>
  );
}