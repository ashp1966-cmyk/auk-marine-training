import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Research() {
  const research = await prisma.research.findMany();

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-serif text-3xl font-bold text-hull">The AUK Research Lab</h1>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {research.map((r) => (
          <div key={r.id} className="card border-l-4 border-l-teal p-5">
            <span className="text-xs font-semibold text-gray-400">{r.field}</span>
            <h3 className="mt-1 font-serif text-lg font-bold">{r.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{r.abstract}</p>
            <p className="mt-2 text-xs text-gray-400">Status: {r.status}</p>
          </div>
        ))}
        {research.length === 0 && <p className="text-gray-500">No research projects listed yet.</p>}
      </div>
    </main>
  );
}
