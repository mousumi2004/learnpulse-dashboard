# Nexus OS Learning Dashboard

Nexus OS is a high-fidelity student learning dashboard built for the Frontend Intern Challenge. It combines a dark futuristic interface, a responsive bento-style workspace, live course data, and polished Framer Motion interactions.

The goal of the project is to feel like a finished product rather than a static demo: the dashboard reads real course records, computes activity and focus signals from those records, and supports secure course editing through server-side actions.

## Live Sections

### Home

The homepage introduces Nexus OS and gives the reviewer an immediate first impression of the product. It includes a large typographic hero, primary navigation into the app, and a live course preview.

### Dashboard

The dashboard is the main operating surface. It shows:

- active course count
- average progress
- lowest-progress priority signal
- latest data freshness
- motion-enhanced bento panels that route into the rest of the app
- animated course progress indicators

### Courses

The Courses page is the editable course workspace. It includes:

- create course form
- editable course rows
- icon-only save, reset, and delete actions
- dynamic Lucide icons from each course record
- secure write status

### Activity

The Activity page turns progress values into meaningful analytics instead of decorative blocks. It groups courses into:

- At risk: 0-49%
- Building: 50-79%
- Strong: 80-100%

It also shows a sorted progress distribution chart.

### Focus

The Focus page finds the lowest-progress course and converts it into the next study block. When course progress changes, the focus target changes with it.

### Data

The Data page gives a compact health view for the reviewer:

- live row count
- data table name
- current write mode
- field mapping for `id`, `title`, `progress`, `icon_name`, and `created_at`
- current rows

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase
- Lucide React
- Vitest
- Testing Library
- ESLint

## Architecture

The application uses the Next.js App Router with server-rendered route pages and small client components where interaction or animation is needed.

- `app/page.tsx` renders the public homepage.
- `app/(workspace)/layout.tsx` wraps the application routes in the shared shell.
- `app/(workspace)/dashboard/page.tsx` fetches live course data for the dashboard.
- `app/(workspace)/courses/page.tsx` fetches courses and passes server actions into the course manager.
- `app/(workspace)/courses/actions.ts` handles create, update, and delete operations.
- `app/(workspace)/activity/page.tsx` renders calculated activity bands.
- `app/(workspace)/focus/page.tsx` renders the current focus recommendation.
- `app/(workspace)/source/page.tsx` renders the data health view.

Reusable UI and feature components live in `components/`. Data normalization, validation, analytics, icon mapping, and backend integration live in `lib/`.

## Server And Client Split

Server components are responsible for data loading and route composition. Client components are used only where the interface needs browser behavior:

- animated homepage sequence
- sidebar highlight transition
- bento panel entrance animations
- animated progress bars
- course form interactions
- responsive navigation states

This keeps the data path server-first while still allowing a rich motion layer.

## Data Integration

Course data is stored in a Supabase `courses` table.

Required schema:

| Column | Type | Purpose |
| --- | --- | --- |
| `id` | `uuid` | Course identity |
| `title` | `text` | Course name |
| `progress` | `integer` | Progress value from 0 to 100 |
| `icon_name` | `text` | Lucide icon key |
| `created_at` | `timestamp` | Row freshness and ordering |

Reads are performed on the server in `lib/supabase/courses.ts`.

Course mutations are handled through server actions and `lib/supabase/course-mutations.ts`, so privileged writes are never performed in browser code.

## Motion Details

Framer Motion is used for product-level polish:

- homepage reveal sequence with `useAnimate`
- route navigation highlight with a persistent animated sidebar indicator
- staggered bento and analytics entry
- spring hover states
- animated progress bars
- reduced-motion support for accessibility

Animations use transform and opacity to avoid layout shifts.

## Environment Variables

Create a local `.env` file from `.env.example`.

```bash
cp .env.example .env
```

Required variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Security notes:

- `.env` is ignored by Git and must never be committed.
- `.env.example` is safe to commit because it contains names only, not real keys.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only and is used only by server actions.
- Browser code uses only public-safe environment variables.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open:

```bash
http://127.0.0.1:3000
```

## Quality Checks

Run tests:

```bash
npm run test -- --run
```

Run lint:

```bash
npm run lint
```

Run production build:

```bash
npm run build
```

Check live data connectivity:

```bash
npm run check:supabase
```

## Project Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next.js dev server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint with zero-warning policy |
| `npm run test -- --run` | Run the Vitest test suite |
| `npm run check:supabase` | Verify live course reads and write mode |

## Verification Completed

The project has been verified with:

- unit and component tests
- lint
- production build
- live course read check
- create, update, delete smoke test using a temporary course row
- desktop and mobile browser inspection

## Deployment

The assignment asks for a public GitHub repository and a Vercel deployment.

For Vercel, add the same environment variables from `.env.example` in the Vercel project settings before deploying. Do not upload or commit the local `.env` file.
