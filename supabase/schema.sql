-- Run this once in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query).
-- Mirrors the app's previous Drizzle schema 1:1 so no data shape changes are needed.

create table if not exists public.projects (
  id serial primary key,
  title text not null,
  description text not null,
  category text not null default 'Web',
  status text not null default 'draft' check (status in ('published', 'draft', 'archived')),
  tech_stack text[] not null default '{}',
  image_url text,
  featured boolean not null default false,
  live_url text,
  github_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id serial primary key,
  name text not null,
  category text not null check (category in ('Design & Creative', 'Video Editing', 'Social Media & Web')),
  description text not null,
  proficiency integer not null default 80
);

create table if not exists public.experience (
  id serial primary key,
  role text not null,
  company text not null,
  location text not null,
  start_date text not null,
  end_date text,
  type text not null default 'Full-time' check (type in ('Full-time', 'Part-time', 'Freelance', 'Contract')),
  description text not null,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id serial primary key,
  author text not null,
  company text not null,
  role text not null,
  content text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  avatar_url text,
  created_at timestamptz not null default now()
);

-- name/message length caps and a basic email shape check are defense-in-depth:
-- this table accepts anonymous public inserts (the contact form), so it must not
-- trust the client to enforce limits. Real spam/rate-limit protection still needs
-- to happen in front of this (see security review -- Cloudflare Turnstile widget, works on any host).
create table if not exists public.messages (
  id serial primary key,
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 320),
  project_type text check (char_length(project_type) <= 100),
  budget text check (char_length(budget) <= 100),
  message text not null check (char_length(message) between 1 and 5000),
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Row Level Security
-- This is a single-admin portfolio site: anyone who can sign in (authenticated)
-- is treated as the admin. Do not expose a public sign-up form in the app --
-- create the one admin user yourself via Dashboard -> Authentication -> Users -> Add user.

alter table public.projects enable row level security;
alter table public.skills enable row level security;
alter table public.experience enable row level security;
alter table public.testimonials enable row level security;
alter table public.messages enable row level security;

-- projects: public sees only published rows; admin sees/edits everything
create policy "public read published projects" on public.projects
  for select to anon using (status = 'published');
create policy "admin read all projects" on public.projects
  for select to authenticated using (true);
create policy "admin insert projects" on public.projects
  for insert to authenticated with check (true);
create policy "admin update projects" on public.projects
  for update to authenticated using (true) with check (true);
create policy "admin delete projects" on public.projects
  for delete to authenticated using (true);

-- skills: public read-only, admin manages
create policy "public read skills" on public.skills
  for select to anon, authenticated using (true);
create policy "admin insert skills" on public.skills
  for insert to authenticated with check (true);
create policy "admin update skills" on public.skills
  for update to authenticated using (true) with check (true);
create policy "admin delete skills" on public.skills
  for delete to authenticated using (true);

-- experience: public read-only, admin manages
create policy "public read experience" on public.experience
  for select to anon, authenticated using (true);
create policy "admin insert experience" on public.experience
  for insert to authenticated with check (true);
create policy "admin update experience" on public.experience
  for update to authenticated using (true) with check (true);
create policy "admin delete experience" on public.experience
  for delete to authenticated using (true);

-- testimonials: public read-only, admin manages
create policy "public read testimonials" on public.testimonials
  for select to anon, authenticated using (true);
create policy "admin insert testimonials" on public.testimonials
  for insert to authenticated with check (true);
create policy "admin update testimonials" on public.testimonials
  for update to authenticated using (true) with check (true);
create policy "admin delete testimonials" on public.testimonials
  for delete to authenticated using (true);

-- messages: anyone can submit the contact form; only admin can read/manage the inbox
create policy "anyone can submit a message" on public.messages
  for insert to anon, authenticated with check (true);
create policy "admin read messages" on public.messages
  for select to authenticated using (true);
create policy "admin update messages" on public.messages
  for update to authenticated using (true) with check (true);
create policy "admin delete messages" on public.messages
  for delete to authenticated using (true);

-- Storage: one public bucket for project images / avatars uploaded from the admin panel.
-- file_size_limit and allowed_mime_types are enforced by Supabase Storage server-side --
-- the client's accept="image/*" on the file input is a UX hint only and is not trusted.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-images',
  'portfolio-images',
  true,
  5242880, -- 5 MB
  -- deliberately excludes image/svg+xml: SVGs can carry embedded <script> and are a
  -- known stored-XSS vector when served back with an image content-type
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "public read portfolio images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'portfolio-images');
create policy "admin upload portfolio images" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio-images');
create policy "admin update portfolio images" on storage.objects
  for update to authenticated using (bucket_id = 'portfolio-images') with check (bucket_id = 'portfolio-images');
create policy "admin delete portfolio images" on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio-images');
