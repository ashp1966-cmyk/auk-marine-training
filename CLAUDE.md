# CLAUDE.md — AUK Marine Training

Project-specific instructions for Claude Code (and for me, reading this back later)
working on `D:\Models\auk-marine-training`.

## Environment

- `.env` (not `.env.local`) holds `DATABASE_URL`, copied verbatim from
  Vercel → Storage → the Postgres database → the `.env.local`/Quickstart tab.
- **`tsx` does not auto-load `.env` in this project's installed version (v4.16.5).**
  Every `tsx`-based script must be invoked with `--env-file=.env`, e.g.:
  ```json
  "db:seed": "tsx --env-file=.env prisma/seed.ts"
  ```
  If a new `db:*` or one-off script is added later and it also calls
  `tsx prisma/....ts` directly, add the same flag — don't assume it inherits
  env loading from elsewhere.
- Never echo the contents of `.env` back into chat, commits, or logs.
  If a real `DATABASE_URL` has ever been pasted into a chat, treat it as
  exposed and rotate the password in Neon.

## Course content pattern

- `prisma/seed.ts` has a generic `upsertCourse()` helper that seeds every course
  with **placeholder** `modules`/`quiz`/`practical` content and explicitly does
  `if (existing) return` — it will never overwrite a course once the row exists.
- Real, hand-built course content (lessons + quiz) lives in its own file under
  `prisma/courses/<course-code>.ts`, exported as an object with `modules`,
  `quiz`, and (optionally) `passMark`.
- To load real content over the placeholder, add a dedicated
  `prisma.course.updateMany({ where: { code: "AUK ..." }, data: { modules, quiz, practical } })`
  block in `seed.ts`, placed **after** the category loop that first creates the
  course row. This is idempotent and safe to re-run — running `db:seed` again
  just refreshes the real content without duplicating the course.
- When adding a new fully-authored course, follow this same pattern rather
  than inlining full content into the big category arrays.

## Client source documents (SMS manuals, audit reports, checklists)

AUK Marine Training builds course content informed by real client documents
(safety management manuals, internal audit checklists, audit reports). These
are confidential per their own document-control clauses (see e.g. SMS Manual
§11.5.8) and must never be reproduced or exposed in course content sold to
other clients. When generating course material from a client document:

- **Reference, don't reproduce.** Use the document's structure, sequencing,
  and real-world scenarios as a *model*, but write original content citing
  public standards (ISM Code sections, SOLAS chapters, MLC Titles, ISPS Parts)
  instead of the client's internal form numbers (e.g. no `RA-001`, `SMS-006`,
  `NTE 019`).
- **Anonymise real audits used as case studies.** Strip vessel name, managing
  company, flag State, classification society, and any named individuals
  before the material goes into a course. Keep only what's pedagogically
  useful: ship type, approximate size, port, dates, the actual findings.
- **Never invent scenario details not in the source.** If a real audit report
  is used as the basis for a practical demonstration, every fact in it must
  trace back to the source document. Do not add invented crew numbers, prior
  findings, weather, or other colour not actually in the report.
- If a source document itself contains an error (e.g. a report dated before
  the event it describes), it's fine to use that as a teaching point in the
  course, but flag it to the person so they can correct it at source too.

## Seeding checklist (for future sessions)

1. `.env` has a valid `DATABASE_URL`.
2. `npm run db:seed` (now correctly wired with `--env-file=.env`).
3. Confirm the console summary counts look right (course totals by category).
4. For any course with hand-authored content, open it in the actual app/admin
   UI and visually confirm modules/quiz render — a successful DB write does
   not guarantee the front-end reads those fields correctly.
