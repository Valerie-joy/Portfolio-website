# Valerie Joy Intong — Portfolio

Personal portfolio site for Valerie Joy Intong, graphic designer / social media manager / video editor. Built with React, Vite, Tailwind CSS, and Supabase, with a glassmorphism dark blue/purple theme.

## Tech stack

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS v4, Framer Motion, wouter (routing)
- **Backend**: Supabase (Postgres + Auth + Storage) — no separate API server
- **Package manager**: pnpm workspaces (this repo is a small monorepo; the app lives in `artifacts/portfolio`)
- **Deployment**: Vercel

## Project structure

```
artifacts/portfolio/     the site (Vite app) — public pages + /admin dashboard
supabase/                schema.sql, seed_valerie.sql, and setup notes for the Supabase backend
scripts/                 misc workspace scripts
```

## Local development

```bash
pnpm install
pnpm --filter @workspace/portfolio run dev
```

The dev server runs at `http://localhost:5173`.

Before it will run, create `artifacts/portfolio/.env` (copy `.env.example`) with your Supabase project's URL and publishable (anon) key:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

### Supabase setup

See [`supabase/README.md`](supabase/README.md) for the full one-time setup: running `schema.sql`, seeding content with `seed_valerie.sql`, enabling email auth, and creating the admin login. The `/admin` dashboard (projects, skills, experience, testimonials, messages) is where all portfolio content is managed after that.

## Deploying to Vercel

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. In the [Vercel dashboard](https://vercel.com/new), import the GitHub repo.
3. Since the app lives in a subfolder, set **Root Directory** to `artifacts/portfolio` in the project's settings (Vercel will still install dependencies from the pnpm workspace root automatically).
4. Vercel will pick up the build settings from `artifacts/portfolio/vercel.json` (`pnpm run build`, output `dist/public`, SPA rewrites, and security headers) — no manual build command changes needed.
5. Add the environment variables under **Settings -> Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
6. Deploy. Every push to `main` will redeploy automatically once the project is linked.

## Scripts

- `pnpm run build` — typecheck + build all workspace packages
- `pnpm --filter @workspace/portfolio run typecheck` — typecheck just the site
- `pnpm --filter @workspace/portfolio run build` — build just the site
- `pnpm --filter @workspace/scripts run portfolio` — rebuild the portfolio galleries (see below)

## Portfolio galleries

The "Portfolio", "My Sample Process" and "Certifications" sections of the site are
generated from the folders at the repository root — `Banners/`, `Fashion Ads/`,
`Certifications/` and the rest. Those folders hold the original full-resolution
files and are never modified.

`scripts/src/build-portfolio.ts` reads them and writes two things into the site:

- `artifacts/portfolio/public/portfolio/<slug>/` — 720px WebP thumbnails, 1600px
  WebP viewer images, and copies of any PDFs (roughly 200 MB of originals
  compress to about 17 MB of derivatives)
- `artifacts/portfolio/src/data/portfolio-manifest.ts` — a generated, typed
  manifest with dimensions and paths, imported by the site

After adding, removing or replacing images in any of those folders, run:

```
pnpm --filter @workspace/scripts run portfolio
```

Display titles, one-line descriptions, and the cover image for each category are
configured in the `CATEGORIES` array at the top of that script; folder names on
disk stay as they are.
