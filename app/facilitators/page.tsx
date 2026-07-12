import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Facilitators() {
  // Only show the two core AUK facilitators
  const list = await prisma.facilitator.findMany({
    where: { id: { in: ["capt-ashwani", "kalpana-pathak"] } },
    orderBy: { name: "asc" },
  });

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-serif text-3xl font-bold text-hull">Your facilitators</h1>
      <p className="mt-2 text-gray-500">All AUK Marine courses are delivered by our experienced in-house team.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {list.map((f) => (
          <div key={f.id} className="card p-6">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-full bg-teal/10 font-serif text-2xl font-bold text-teal">
                {f.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="font-serif text-lg font-bold text-hull">{f.name}</div>
                <div className="text-sm font-semibold text-teal">{f.role}</div>
                <div className="mt-0.5 text-xs text-gray-400">{f.country}</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">{f.bio}</p>
            {(f.expertise as string[])?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1">
                {(f.expertise as string[]).map((e: string) => (
                  <span key={e} className="rounded-full bg-foam px-2 py-0.5 text-xs font-semibold text-gray-500">{e}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
