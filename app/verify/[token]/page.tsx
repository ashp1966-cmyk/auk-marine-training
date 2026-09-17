import { prisma } from "@/lib/db";
import Link from "next/link";
import { formatCompletionDates } from "@/lib/cert/formatDates";

export const dynamic = "force-dynamic";

/**
 * app/verify/[token]/page.tsx
 *
 * The page an employer or manning agent opens to check a certificate is real.
 *
 * Everything displayed comes from the Certificate row's own snapshot columns —
 * learnerName, courseTitle, courseCode, completedOn — never from a live join to
 * Learner or Course. Those tables change: course titles get edited, learners
 * correct their names. A verification page that silently changes is worse than
 * no verification page, because it looks authoritative while being wrong.
 */

export default async function VerifyCertificate({ params }: { params: { token: string } }) {
  const cert = await prisma.certificate.findUnique({
    where: { verifyToken: params.token },
  });

  const certNumber = cert ? `AUK ${String(cert.seq).padStart(3, "0")}` : "";
  const heldOn = cert ? formatCompletionDates(cert.startedOn, cert.completedOn) : "";
  const issuedDate = cert?.issuedAt.toLocaleDateString("en-ZA", {
    year: "numeric", month: "long", day: "numeric",
  });
  const revoked = Boolean(cert?.revokedAt);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-lg">
        {cert && !revoked ? (
          <div className="card overflow-hidden">
            <div className="bg-teal px-6 py-5 text-white text-center">
              <div className="text-4xl mb-2">✓</div>
              <h1 className="font-serif text-2xl font-bold">Certificate Verified</h1>
              <p className="mt-1 text-white/80 text-sm">This is an authentic AUK Marine Training certificate</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 space-y-3">
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Awarded to</div>
                  <div className="font-serif text-2xl font-bold text-hull mt-1">{cert.learnerName}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Course</div>
                  <div className="font-semibold text-gray-800 mt-1">{cert.courseTitle}</div>
                  <div className="text-xs text-teal mt-0.5 font-mono">{cert.courseCode}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Completed</div>
                  <div className="text-sm text-gray-700 mt-1">
                    {cert.deliveryMode} · {heldOn}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Date issued</div>
                  <div className="text-sm text-gray-700 mt-1">{issuedDate}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Issued by</div>
                  <div className="text-sm text-gray-700 mt-1">AUK Marine and Mining (Pty) Ltd</div>
                  <div className="text-xs text-gray-400">Reg No: 2012/099242/07 · Est. 2012</div>
                </div>
              </div>

              <div className="rounded-lg bg-teal/5 border border-teal/20 px-4 py-3 text-xs text-teal">
                <b>Certificate No:</b> {certNumber}<br />
                <b>Verification Token:</b> {cert.verifyToken}
              </div>

              {/* Download. Served by token, same as this page — an employer
                  verifying a certificate has the token and nothing else. */}
              <a
                href={`/api/certificate/${cert.verifyToken}/pdf`}
                className="block w-full rounded-lg bg-hull py-3 text-center font-bold text-white hover:bg-hull/90 transition"
              >
                Download certificate (PDF)
              </a>

              <p className="text-xs text-gray-400 leading-relaxed">
                This certificate records completion of the course named above. It is
                not a statement of accreditation and does not confer credits toward a
                national qualification or a Certificate of Competency.
              </p>
            </div>

            <div className="border-t border-gray-100 px-6 py-4 text-center text-xs text-gray-400">
              Verified at <b>training.auk-maritime.com</b> · {new Date().toLocaleDateString("en-ZA")}
            </div>
          </div>
        ) : cert && revoked ? (
          <div className="card overflow-hidden">
            <div className="bg-amber-600 px-6 py-5 text-white text-center">
              <div className="text-4xl mb-2">!</div>
              <h1 className="font-serif text-2xl font-bold">Certificate Withdrawn</h1>
              <p className="mt-1 text-white/80 text-sm">This certificate is no longer valid</p>
            </div>
            <div className="p-6 space-y-3 text-sm text-gray-700">
              <p>
                Certificate <b>{certNumber}</b>, issued to {cert.learnerName} for{" "}
                {cert.courseTitle}, was withdrawn on{" "}
                {cert.revokedAt?.toLocaleDateString("en-ZA", {
                  year: "numeric", month: "long", day: "numeric",
                })}
                .
              </p>
              {cert.revokedReason && <p className="text-gray-500">{cert.revokedReason}</p>}
              <p className="text-gray-500">
                For confirmation, contact{" "}
                <a href="mailto:training@auk-maritime.com" className="text-teal hover:underline">
                  training@auk-maritime.com
                </a>
                .
              </p>
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
