# Neo Analytica — Next.js App

Full-stack landing page + admin dashboard for Neo Analytica's data engineering consultancy.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- **Auth:** JWT via `jose` + bcrypt
- **Validation:** Zod

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and configure
cp .env.example .env
# Edit .env with your settings

# 3. Push database schema & generate client
npx prisma db push

# 4. Seed sample data
npm run db:seed

# 5. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

### Public Landing Page (`/`)
- Conversion-optimized landing page with PAS copywriting
- Email subscribe form (saves to Prisma database)
- Lead magnet gated content with download tracking
- FAQ accordions, testimonials, social proof
- Sticky CTA bar, scarcity badges

### Admin Dashboard (`/dashboard`)
- Protected by JWT auth
- Website visitors by source
- Email subscribers & lead magnet downloads
- Outreach performance (LinkedIn + email)
- Sales pipeline with deal table
- Funnel visualization

### Login (`/login`)
- Type `/login` anywhere on the landing page to navigate
- Or visit `/login` directly
- Default credentials: `admin@neoanalytica.co.uk` / `neo2026`

### API Routes
| Route | Method | Description |
|-------|--------|-------------|
| `/api/subscribe` | POST | Subscribe email + track lead magnet download |
| `/api/subscribe` | GET | List subscribers (admin) |
| `/api/auth/login` | POST | Authenticate and set JWT cookie |
| `/api/dashboard` | GET | Aggregated metrics (auth required) |

## Database Schema

```
Subscriber        — Email list with source tracking
LeadMagnetDownload — Which magnets each subscriber downloaded
ConsultationBooking — Booked calls with status
DashboardMetric   — Time-series metrics for dashboard
User              — Admin users (bcrypt hashed passwords)
OutreachCampaign  — LinkedIn/email campaign tracking
Deal              — Sales pipeline with stages
```

Run `npx prisma studio` to browse data visually.

## Production Deployment

1. Switch DATABASE_URL to PostgreSQL in `.env`
2. Change `provider = "sqlite"` to `provider = "postgresql"` in `prisma/schema.prisma`
3. Run `npx prisma migrate dev --name init`
4. Set a strong `JWT_SECRET`
5. Deploy to Vercel: `npx vercel`

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Tailwind + custom styles
│   ├── login/page.tsx        # Login page
│   ├── dashboard/
│   │   ├── page.tsx          # Auth guard (server)
│   │   └── DashboardClient.tsx # Dashboard UI (client)
│   └── api/
│       ├── subscribe/route.ts
│       ├── auth/login/route.ts
│       └── dashboard/route.ts
├── components/
│   ├── Navbar.tsx
│   ├── SubscribeForm.tsx
│   ├── StickyBar.tsx
│   └── LoginDetector.tsx
└── lib/
    ├── prisma.ts             # Prisma singleton
    └── auth.ts               # JWT helpers
prisma/
├── schema.prisma             # Database schema
└── seed.ts                   # Sample data seeder
```
