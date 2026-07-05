# AUK Marine Training — Real Backend

A proper database-backed rebuild of the training platform: real admin accounts,
real bookings, and real PayFast payment confirmation — instead of data living only
in a browser. Same stack your own "Build Your Own AI Marketing App" course teaches:
**GitHub + Vercel + a database**, deployed with the same four commands.

## What's real here (and what to know)

- **Real accounts.** One admin account, created once, enforced by the database and
  a signed session cookie checked on every request — not just hidden in the browser.
- **Real payment confirmation.** PayFast calls this app directly, server-to-server,
  after a payment. We verify PayFast's signature before ever marking a booking paid —
  a customer's browser alone can never fake that.
- **Real file storage.** Course photos/materials go to Vercel Blob storage — no size
  games, no browser storage limits.
- **Real email.** Booking confirmations, payment receipts, and facilitator-application
  alerts send via Resend (free tier) — a proper email replacing the earlier
  WhatsApp-button workaround, once you add a `RESEND_API_KEY`.
- **A full course player.** Materials, module-by-module content, the practical
  demonstration, a quiz with a real pass mark, and a certificate — all reading and
  writing real progress in the database, not the browser.
- **Real scheduling.** Admin → Schedule creates real cohort sessions; the public
  booking form reads them live and shows remaining seats.
- **Real multi-tenant ownership.** Your original AUK admin account is the platform
  super-admin. From Admin → Subscribers, you can invite a scoped admin for any
  other provider — they get their own login, but the server enforces (not just
  hides in the UI) that they can only see and edit their own provider's courses,
  bookings, schedule and research. Settings, PayFast, and facilitator approval
  stay super-admin-only, since those are platform-wide, not per-provider.
- **Real PDF certificates.** Generated server-side (pdf-lib) and only ever issued
  if the database genuinely shows 100% progress for that learner — not a client
  claiming "I'm done," and not print-to-PDF.
- **A real visual calendar.** Admin → Schedule is a proper month grid with sessions
  as clickable pills, not a plain list.
- **Real password reset & change.** Every admin (super or provider-scoped) can
  change their own password under Admin → Account, and both admins and learners
  have a genuine "forgot password" flow — a one-time, one-hour link emailed to
  them, never a password shown or guessable in the URL.
- **Admin access can actually be revoked.** Admin → Subscribers now lists every
  admin account; the super-admin can revoke any provider-scoped admin instantly.
  Revocation checks the database on every request, not just an eventually-expiring
  token — so it takes effect on their very next click, not "whenever their session
  happens to time out." (Built-in safeguards stop you revoking yourself or removing
  the last super-admin.)
- **Rate limiting that survives Vercel.** Login attempts are now tracked in the
  database instead of an in-memory counter — the earlier version reset every time
  a new serverless instance spun up, which happens constantly in production.
- **PayFast's second verification layer.** Beyond checking PayFast's signature,
  the webhook now also performs PayFast's own recommended server-to-server
  "validate" callback before ever trusting a payment.
- **Real automated tests** on the payment-signature logic (`npm test`) — verifying
  signatures change when they should, reject tampering, and reject a forged
  passphrase. Run before you deploy, and after any future change to `lib/payfast.ts`.
- **Scope honestly:** this is a solid, working MVP of the full platform we built
  earlier (courses, bookings, PayFast, facilitators, research, admin, learner
  progress) — not a pixel-for-pixel port of every screen from the single-file
  version. Treat it as the real foundation; extending any one section further
  (nicer course player, richer admin tables, learner logins) is straightforward
  from here.

## One-time setup

### 1. Create a GitHub repo and push this code
```bash
git init
git add .
git commit -m "AUK Marine Training — real backend"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/auk-marine-training.git
git push -u origin main
```

### 2. Import into Vercel
- Go to vercel.com → **Add New → Project** → import the GitHub repo you just pushed.
- Don't deploy yet — first add the database and storage below (or add them after
  the first deploy; Vercel will prompt you to redeploy either way).

### 3. Add a database
- In your Vercel project → **Storage → Create Database → Postgres**.
- Connect it to this project. Vercel sets `DATABASE_URL` automatically.

### 4. Add file storage
- **Storage → Create → Blob**. Connect it to this project.
  Vercel sets `BLOB_READ_WRITE_TOKEN` automatically.

### 5. Add the remaining environment variables
Project → **Settings → Environment Variables**:
| Name | Value |
|---|---|
| `SESSION_SECRET` | A long random string (32+ characters) — generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel URL, e.g. `https://auk-marine-training.vercel.app` (update after first deploy, then redeploy) |
| `RESEND_API_KEY` | Optional — sign up free at resend.com, verify your sending domain (or use their test domain to start), paste the API key here. Without it, bookings/applications still work; emails are just skipped. |

### 6. Deploy
- Click **Deploy** (or push again — every push auto-deploys, exactly like your
  Marketing Model course teaches).

### 7. Load the database schema and starter courses
From your own computer, with `DATABASE_URL` pointing at the same database
(copy it from Vercel → Storage → your database → `.env.local` tab):
```bash
npm install
npm run db:push     # creates all the tables
npm run db:seed     # loads AUK's real courses, provider, and facilitators
```

### 8. Set up your admin account
Visit `https://your-site.vercel.app/admin` and create your admin email + passcode.
Only one admin account can ever be created this way — the database enforces it.

### 9. Turn on PayFast
Admin → Settings → paste your Merchant ID, Merchant Key, and Passphrase, set
Status to On and Mode to Live (test in Sandbox mode first). In your PayFast
merchant dashboard, no extra webhook setup is needed — the notify URL is sent
automatically with each payment (`/api/payfast/notify`).

## Local development
```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL at minimum
npm run db:push
npm run db:seed
npm run dev
```

## Project structure
```
app/api/          → all backend logic (auth, courses, bookings, PayFast, uploads…)
app/               → public pages + the admin console
lib/auth.ts        → admin session creation/verification
lib/payfast.ts     → PayFast signature build + ITN verification
prisma/schema.prisma → the real database structure
prisma/seed.ts     → starter data (AUK's courses, provider, facilitators)
```
