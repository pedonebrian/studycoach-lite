import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-4">
      <p className="text-neutral-300">
        This is a minimal, production-minded Next.js + TypeScript app showcasing
        staff-level front-end practices for a learning product.
      </p>

      <div className="grid gap-3">
        <Link className="underline" href="/learn">→ Go to Learner Flow</Link>
        <a className="underline" href="https://github.com/your-username/studycoach-lite" target="_blank">Repo</a>
      </div>

      <section className="mt-8">
        <h2 className="font-medium">What’s included today</h2>
        <ul className="list-disc ml-5 text-neutral-300">
          <li>Redux store (UI state) + React Query (server state)</li>
          <li>Mock AI endpoint at <code>/api/ai</code></li>
          <li>Strict TS + Tailwind</li>
        </ul>
      </section>
    </main>
  );
}