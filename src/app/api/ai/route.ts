import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { passage = '', type = 'questions', count = 3 } = await req
    .json()
    .catch(() => ({}));

  if (type !== 'questions') return NextResponse.json({ items: [] });

  const n = Math.min(10, Math.max(1, Number(count)));
  const items = Array.from({ length: n }).map((_, i) => ({
    prompt: `Q${i + 1}. What’s a key idea in: “${String(passage).slice(0, 80)}…”?`,
    choices: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    answer: 0,
    explanation: 'Mock explanation — swap to a real provider later.'
  }));

  return NextResponse.json({ items });
}
