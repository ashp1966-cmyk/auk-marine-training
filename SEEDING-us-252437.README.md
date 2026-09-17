# Seeding US-252437 — Interpret & Apply International Commercial Terms

Follows the course content pattern in `CLAUDE.md`: real content lives in
`prisma/courses/<course-code>.ts`, and is loaded over the placeholder by a dedicated
`updateMany` block in `seed.ts` placed **after** the category loop that creates the row.

## 1. Place the content file

```bash
cd D:\Models\auk-marine-training
# copy us-252437.ts into prisma/courses/
```

Target path: `prisma/courses/us-252437.ts`

## 2. Confirm the course code in the database

The `updateMany` matches on `code`. The admin UI shows `US-252437`, but confirm the actual
column value before wiring it up — a mismatch fails silently, because `updateMany` returns
`{ count: 0 }` rather than throwing.

```bash
npx prisma studio --browser none
# or
npx tsx --env-file=.env -e "import{PrismaClient}from'@prisma/client';const p=new PrismaClient();p.course.findMany({where:{code:{contains:'252437'}},select:{id:true,code:true,title:true}}).then(r=>{console.log(r);return p.\$disconnect()})"
```

## 3. Patch `seed.ts`

Import at the top:

```ts
import * as us252437 from "./courses/us-252437";
```

Then, **after** the category loop:

```ts
// --- Hand-authored course content ---------------------------------------
// Placed after the category loop so the row exists. Idempotent: re-running
// db:seed refreshes content without duplicating the course.
{
  const result = await prisma.course.updateMany({
    where: { code: "US-252437" },
    data: {
      shortSummary: us252437.shortSummary,
      learningOutcomes: us252437.learningOutcomes,
      modules: us252437.modules,
      quiz: us252437.quiz,
      passMark: us252437.passMark,
      practical: us252437.alignment.practical,
    },
  });
  console.log(
    `US-252437 Incoterms: updated ${result.count} row(s), ` +
      `${us252437.modules.length} modules, ${us252437.quiz.length} quiz questions`
  );
}
```

If `result.count` logs `0`, the code didn't match — go back to step 2.

**Field-name caveat:** `modules`, `quiz`, `practical` and `passMark` come straight from
`CLAUDE.md`. `shortSummary` and `learningOutcomes` are inferred from the admin builder UI
and may sit under different column names, or inside a JSON blob. Check
`prisma/schema.prisma` for the `Course` model before running; drop or rename those two
lines as needed.

## 4. Run the seed

```bash
npm run db:seed
```

`tsx` v4.16.5 does not auto-load `.env` in this project, so the script must already be
wired as `tsx --env-file=.env prisma/seed.ts`. If you add a one-off script for this course,
carry the same flag — it isn't inherited.

## 5. Verify in the app, not just the console

Per the seeding checklist, a successful DB write doesn't prove the front-end reads the
fields correctly.

1. Open `https://training.auk-maritime.com/admin/courses/<id>?tab=content`
2. Tab 1 — short summary and the eight learning outcomes render one per line
3. Tab 2 — all 11 modules present, markdown tables in modules 3, 7 and 11 rendering as
   tables and not as raw pipes
4. Tab 4 — 24 questions, and spot-check that `answer` indices line up with the intended
   option (they're zero-based)
5. Preview as a learner and run the quiz once end to end

## 6. Media assets (tab 3)

The `media` export is upload metadata only — no binaries are seeded. Seven assets are
specified. Produce them, upload to Vercel Blob, and attach against the `slug` values in
the file. The three worth doing first are the risk/cost transfer chart, the mode matrix,
and the landed cost worksheet; the course reads coherently without the other four.

## Notes on content decisions

- **Built to Incoterms 2020**, not the 2000 edition in the source manual. The unit standard
  predates 2020 and its assessment criteria were drafted against the older text, so module
  11 is a legacy annex covering the 13 terms and the migration map. That satisfies AC 1.1
  without teaching obsolete practice as current.
- **VAT stated at 15%**, not the 14% in the source manual. Also replaced the manual's
  "E and F standard-rated, C and D zero-rated" framing with the direct/indirect export test
  that actually governs, since the Incoterm is an indicator rather than the test itself.
- **Source manual not reproduced.** Per `CLAUDE.md`, structure and sequencing were used as a
  model and the content written fresh. No ICC rule text is reproduced either — the rules are
  described, not quoted.
- **`alignment` export** carries the SO/AC-to-module mapping so the moderator's pack can be
  generated from source rather than maintained as a separate document.

## Two things to check at source

1. The source manual has a duplicated assessment criterion — SO1 AC3 and AC4 are identical
   ("The legality of the international commercial terms is identified with examples"). I've
   treated AC4 as covering scope and limits, which is what the SO1 heading implies. Worth
   checking against the SAQA text before the moderator does.
2. The manual's registration end date is 30/06/2012. US 252437 is still listed as a core
   in SAQA ID 59365, so it has been re-registered, but confirm the current registration
   status and end date for the TETA17-960 file.
