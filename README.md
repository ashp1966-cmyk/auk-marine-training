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
