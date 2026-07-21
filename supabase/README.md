# Supabase setup

One-time setup for this project's Supabase backend.

1. **Schema + policies**: open your Supabase project's Dashboard -> SQL Editor -> New query, paste the contents of `schema.sql`, and run it. This creates the `projects`, `skills`, `experience`, `testimonials`, `messages` tables, enables Row Level Security, and creates the `portfolio-images` storage bucket.
2. **Seed content**: paste the contents of `seed_valerie.sql` into a new SQL Editor query and run it. This updates the `skills.category` values to the design-focused categories the site uses, and inserts Valerie's skills, work history, and starter featured projects. Edit or delete rows any time from the admin Projects/Skills pages once logged in.
3. **Auth**: Dashboard -> Authentication -> Providers -> confirm "Email" is enabled (it is by default). This app has no public sign-up form by design -- only an existing user can log in.
4. **Create your admin account**: Dashboard -> Authentication -> Users -> Add user -> set your own email + password. Any authenticated user is treated as the admin (this is a single-owner portfolio site), so only create the one account for yourself.
5. **Env vars**: create `artifacts/portfolio/.env` (gitignored, not included in the repo) with your project's `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` -- copy `.env.example` and fill both in from Dashboard -> Project Settings -> API. Add the same two values in Vercel under Project Settings -> Environment Variables so the deployed build can connect.

Note: your `SUPABASE_SECRET_KEY` (service-role key) is not used anywhere in this app -- there's no backend server left to hold it. Keep it out of the repo; store it in your password manager or Supabase's own dashboard reference if you need it for something else later.
