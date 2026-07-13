import { prisma } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function VerifyCertificate({ params }: { params: { token: string } }) {
  const cert = await prisma.certificate.findUnique({
    where: { verifyToken: params.token },
    include: {
      learner: { select: { name: true } },
      course:  { select: { title: true, code: true, nqfLevel: true, credits: true } },
    },
  });

  const issuedDate = cert?.issuedAt.toLocaleDateString("en-ZA", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-lg">
        {cert ? (
          <div className="card overflow-hidden">
            {/* Green verified header */}
            <div className="bg-teal px-6 py-5 text-white text-center">
              <div className="text-4xl mb-2">✓</div>
              <h1 className="font-serif text-2xl font-bold">Certificate Verified</h1>
              <p className="mt-1 text-white/80 text-sm">This is an authentic AUK Marine Training certificate</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 space-y-3">
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Awarded to</div>
                  <div className="font-serif text-2xl font-bold text-hull mt-1">{cert.learner.name}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Course</div>
                  <div className="font-semibold text-gray-800 mt-1">{cert.course.title}</div>
                  <div className="text-xs text-teal mt-0.5 font-mono">{cert.course.code}</div>
                </div>
                {cert.course.nqfLevel && (
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Qualification</div>
                    <div className="text-sm text-gray-700 mt-1">
                      NQF {cert.course.nqfLevel}
                      {cert.course.credits ? ` · ${cert.course.credits} Credits` : ""}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Date Issued</div>
                  <div className="text-sm text-gray-700 mt-1">{issuedDate}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Issued by</div>
                  <div className="text-sm text-gray-700 mt-1">AUK Marine and Mining (Pty) Ltd</div>
                  <div className="text-xs text-gray-400">TETA Accredited Training Service Provider · Est. 2012 & 2017</div>
                </div>
              </div>

              <div className="rounded-lg bg-teal/5 border border-teal/20 px-4 py-3 text-xs text-teal">
                <b>Certificate No:</b> AUK-{cert.id.slice(-8).toUpperCase()}<br />
                <b>Verification Token:</b> {cert.verifyToken}
              </div>
            </div>

            <div className="border-t border-gray-100 px-6 py-4 text-center text-xs text-gray-400">
              Verified at <b>training.auk-maritime.com</b> · {new Date().toLocaleDateString("en-ZA")}
            </div>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="bg-red-500 px-6 py-5 text-white text-center">
              <div className="text-4xl mb-2">✗</div>
              <h1 className="font-serif text-2xl font-bold">Certificate Not Found</h1>
              <p className="mt-1 text-white/80 text-sm">This verification link is invalid or the certificate does not exist</p>
            </div>
            <div className="p-6 text-center text-gray-500 text-sm">
              <p>If you believe this is an error, please contact AUK Marine directly.</p>
              <p className="mt-2">
                <a href="mailto:training@auk-maritime.com" className="text-teal hover:underline">training@auk-maritime.com</a>
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-teal hover:underline">← AUK Marine Training</Link>
        </div>
      </div>
    </main>
  );
}
