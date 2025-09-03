'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

function readLessons(): Lesson[] {
  try {
    return JSON.parse(localStorage.getItem('lessons') || '[]');
  } catch {
    return [];
  }
}

function writeLessons(lessons: Lesson[]) {
  localStorage.setItem('lessons', JSON.stringify(lessons));
}

export default function LessonsPage() {
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    setLessons(readLessons());
  }, []);

  const totalQuestions = useMemo(
    () => lessons.reduce((sum, l) => sum + (l.questions?.length || 0), 0),
    [lessons]
  );

  function openInLearner(id: string) {
    // just navigate with a query param; /learn will pull from localStorage
    router.push(`/learn?lesson=${encodeURIComponent(id)}`);
  }

  function deleteLesson(id: string) {
    const next = lessons.filter((l) => l.id !== id);
    setLessons(next);
    writeLessons(next);
  }

  const downloadHref =
    'data:application/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(lessons, null, 2));

  return (
    <main className="space-y-4">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Saved Lessons</h2>
          <p className="text-sm text-neutral-400">
            {lessons.length} lesson{lessons.length === 1 ? '' : 's'} · {totalQuestions} question
            {totalQuestions === 1 ? '' : 's'}
          </p>
        </div>
        <Link href="/" className="underline">Home</Link>
      </header>

      {lessons.length === 0 ? (
        <p className="text-neutral-400">
          No lessons yet. Go to <Link className="underline" href="/learn">Learner</Link> → type a
          passage → <em>Freeze</em> → <em>Save as Lesson</em>.
        </p>
      ) : (
        <ul className="grid gap-3">
          {lessons.map((l) => (
            <li key={l.id} className="p-3 rounded border border-neutral-800">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium">{l.title}</h3>
                  <p className="text-sm text-neutral-400">
                    {l.questions.length} question{l.questions.length === 1 ? '' : 's'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openInLearner(l.id)}
                    className="px-3 py-2 bg-blue-600 rounded hover:bg-blue-500"
                    title="Open this lesson in Learner (frozen)"
                  >
                    Open in Learner
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteLesson(l.id)}
                    className="px-3 py-2 bg-neutral-700 rounded hover:bg-neutral-600"
                    title="Delete this lesson"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm line-clamp-2 text-neutral-300">{l.passage}</p>
            </li>
          ))}
        </ul>
      )}

      {lessons.length > 0 && (
        <a
          download="lessons.json"
          href={downloadHref}
          className="inline-block px-3 py-2 bg-neutral-800 rounded hover:bg-neutral-700"
          title="Download all lessons as JSON"
        >
          Download JSON
        </a>
      )}
    </main>
  );
}
