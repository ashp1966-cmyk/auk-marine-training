"use client";

/**
 * app/certificate/[courseId]/confirm-name.tsx
 *
 * The step between "you passed" and "download your certificate".
 *
 * Certificate.learnerName is frozen at issue, so a typo is permanent unless the
 * certificate is revoked and reissued. The learner is the only person who can
 * catch a misspelling of their own name, and a certificate with the wrong name
 * is worthless to them.
 *
 * This deliberately shows the name as it will print rather than as a pre-filled
 * form field. A field invites skimming — people see something plausible and
 * click on. Rendering it at print size, in the certificate's own typeface and
 * frame, makes them read it. Editing is one click away.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatCompletionDates } from "@/lib/cert/formatDates";

type Props = {
  courseId: string;
  initialName: string;
  courseTitle: string;
  courseCode: string;
  startedOn: string;
};

export default function ConfirmCertificateName({
  courseId,
  initialName,
  courseTitle,
  courseCode,
  startedOn,
}: Props) {
  const router = useRouter();

  // Same formatter the certificate uses, so the preview is exact
  const dateLine = formatCompletionDates(startedOn, new Date());

  const [name, setName] = useState(initialName);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialName);
  const [issuing, setIssuing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Same shrink thresholds as certificate-template.html, so the preview is honest
  const nameClass =
    name.length > 34 ? "name-xlong" : name.length > 24 ? "name-long" : "name";

  function startEdit() {
    setDraft(name);
    setEditing(true);
    setError(null);
  }

  function saveEdit() {
    const cleaned = draft.trim().replace(/\s+/g, " ");
    if (cleaned.length < 2) {
      setError("Enter your full name as it should appear.");
      return;
    }
    if (cleaned.length > 60) {
      setError("That name is too long to print. Shorten it to 60 characters.");
      return;
    }
    setName(cleaned);
    setEditing(false);
    setError(null);
  }

  async function issue() {
    setIssuing(true);
    setError(null);
    try {
      const res = await fetch("/api/certificate/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, learnerName: name }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error ?? "The certificate could not be issued. Try again.");
        setIssuing(false);
        return;
      }

      router.push(`/verify/${data.verifyToken}`);
    } catch {
      setError("The certificate could not be issued. Check your connection and try again.");
      setIssuing(false);
    }
  }

  return (
    <div className="wrap">
      <h1>Check your name before we issue</h1>
      <p className="intro">
        This is exactly how your name will be printed. Once the certificate is issued
        the name cannot be changed, so read it carefully — including spelling, spacing
        and capitalisation.
      </p>

      <div className="preview">
        <div className="cert-header">
          <div className="est">Est. 2012</div>
          <div className="company">AUK Marine and Mining</div>
          <div className="reg">Reg No: 2012/099242/07&nbsp;&nbsp;VAT No: 4410268256</div>
        </div>

        <div className="preview-label">Certificate of Completion</div>

        {editing ? (
          <div className="edit">
            <label htmlFor="learner-name">Your full name</label>
            <input
              id="learner-name"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveEdit()}
              maxLength={60}
              autoFocus
            />
            <div className="edit-actions">
              <button className="btn-primary" onClick={saveEdit}>
                Use this name
              </button>
              <button className="btn-quiet" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={nameClass}>{name}</div>
            <button className="btn-link" onClick={startEdit}>
              Correct my name
            </button>
          </>
        )}

        <div className="course">
          <span>Has successfully completed</span>
          <strong>{courseTitle}</strong>
          <span className="code">{courseCode}</span>
          <span className="delivery">Held Online</span>
          <span className="dates">{dateLine}</span>
        </div>
      </div>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <button className="btn-issue" onClick={issue} disabled={issuing || editing}>
        {issuing ? "Issuing…" : "Issue my certificate"}
      </button>

      <p className="foot">
        Issued in the name above by AUK Marine and Mining. If you need it in a
        different name later, contact admin@auk-maritime.com — the certificate has to
        be reissued.
      </p>

      <style jsx>{`
        .wrap {
          max-width: 34rem;
          margin: 0 auto;
          padding: 3rem 1.25rem 4rem;
        }
        h1 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.6rem;
        }
        .intro {
          color: #555;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        /* Borrows the certificate's frame and typeface, so what the learner
           reads here is what gets printed. */
        .preview {
          border: 2px solid #1f3f6b;
          padding: 2.25rem 1.5rem 1.75rem;
          text-align: center;
          background: #fff;
          font-family: "Century Gothic", "Questrial", "Trebuchet MS", sans-serif;
        }
        .cert-header {
          padding-bottom: 1.25rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #dfe4ea;
        }
        .est {
          font-size: 0.8rem;
          color: #444;
          margin-bottom: 0.15rem;
        }
        .company {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 0.15rem;
        }
        .reg {
          font-size: 0.75rem;
          color: #777;
        }

        .preview-label {
          font-size: 1.05rem;
          letter-spacing: 0.02em;
          color: #1f3f6b;
          margin-bottom: 1.75rem;
        }

        .name,
        .name-long,
        .name-xlong {
          font-weight: 700;
          line-height: 1.15;
          word-break: break-word;
          margin-bottom: 0.5rem;
        }
        .name { font-size: 2rem; }
        .name-long { font-size: 1.65rem; }
        .name-xlong { font-size: 1.4rem; }

        .course {
          margin-top: 1.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid #dfe4ea;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          color: #444;
          font-size: 0.95rem;
        }
        .course strong { font-weight: 600; font-size: 1.05rem; color: #1a1a1a; }
        .code { font-size: 0.8rem; color: #777; }
        .delivery {
          margin-top: 0.6rem;
          font-weight: 700;
          font-size: 0.9rem;
          color: #1a1a1a;
        }
        .dates { font-size: 0.9rem; color: #444; }

        .edit { text-align: left; }
        .edit label {
          display: block;
          font-size: 0.85rem;
          color: #555;
          margin-bottom: 0.4rem;
        }
        .edit input {
          width: 100%;
          font-size: 1.25rem;
          font-family: inherit;
          padding: 0.65rem 0.75rem;
          border: 1px solid #1f3f6b;
          border-radius: 3px;
        }
        .edit input:focus { outline: 2px solid #4a6d99; outline-offset: 1px; }
        .edit-actions { display: flex; gap: 0.75rem; margin-top: 0.9rem; }

        .btn-link {
          background: none;
          border: none;
          color: #1f3f6b;
          text-decoration: underline;
          cursor: pointer;
          font-size: 0.85rem;
          padding: 0.25rem;
        }
        .btn-primary {
          background: #1f3f6b;
          color: #fff;
          border: none;
          border-radius: 3px;
          padding: 0.55rem 1rem;
          cursor: pointer;
          font-size: 0.9rem;
        }
        .btn-quiet {
          background: none;
          border: 1px solid #c5cbd3;
          border-radius: 3px;
          padding: 0.55rem 1rem;
          cursor: pointer;
          font-size: 0.9rem;
        }
        .btn-issue {
          width: 100%;
          margin-top: 1.5rem;
          background: #1f3f6b;
          color: #fff;
          border: none;
          border-radius: 3px;
          padding: 0.9rem;
          font-size: 1rem;
          cursor: pointer;
        }
        .btn-issue:disabled { background: #9aa7b8; cursor: not-allowed; }
        .btn-issue:focus-visible,
        .btn-primary:focus-visible,
        .btn-quiet:focus-visible,
        .btn-link:focus-visible {
          outline: 2px solid #1f3f6b;
          outline-offset: 2px;
        }

        .error {
          color: #a3241c;
          font-size: 0.9rem;
          margin-top: 1rem;
        }
        .foot {
          color: #777;
          font-size: 0.8rem;
          line-height: 1.55;
          margin-top: 1.25rem;
        }
      `}</style>
    </div>
  );
}
