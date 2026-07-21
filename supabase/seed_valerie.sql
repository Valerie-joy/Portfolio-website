-- Content seed for Valerie Joy Intong's portfolio.
-- Run this once in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query)
-- AFTER running schema.sql. Safe to re-run the constraint change, but the INSERT
-- statements will create duplicate rows if run twice -- clear the tables first
-- (see the commented TRUNCATE block below) if you need to re-seed.

-- If your project was set up before this file existed, the skills.category
-- check constraint still allows the old ('Frontend', 'Backend', 'Design') values.
-- This updates it to the new design-focused categories used by the site.
alter table public.skills drop constraint if exists skills_category_check;
alter table public.skills add constraint skills_category_check
  check (category in ('Design & Creative', 'Video Editing', 'Social Media & Web'));

-- Uncomment to wipe existing rows before re-seeding:
-- truncate table public.skills restart identity;
-- truncate table public.experience restart identity;
-- truncate table public.projects restart identity;

-- ---------------------------------------------------------------------------
-- Skills
-- ---------------------------------------------------------------------------
insert into public.skills (name, category, description, proficiency) values
  ('Canva', 'Design & Creative', 'Rapid graphic design for social posts, flyers, and marketing collateral.', 95),
  ('Adobe Premiere Pro', 'Design & Creative', 'Color grading, layout composition, and print/digital assets.', 80),
  ('AI Design Tools', 'Design & Creative', 'Prompt engineering and AI-assisted design ideation and production.', 85),
  ('Premiere Pro (Video)', 'Video Editing', 'Reel and short-form video editing for brands and creators.', 90),
  ('CapCut', 'Video Editing', 'Fast-turnaround reel editing for social media.', 90),
  ('Reel Storytelling', 'Video Editing', 'Planning and cutting narrative-driven short-form video content.', 85),
  ('Meta Business Suite', 'Social Media & Web', 'Scheduling, publishing, and managing Instagram/Facebook content.', 90),
  ('WordPress', 'Social Media & Web', 'Building and editing brand websites and landing pages.', 75),
  ('Wix', 'Social Media & Web', 'Website design and edits for small business clients.', 75)
;

-- ---------------------------------------------------------------------------
-- Experience (from resume work history)
-- ---------------------------------------------------------------------------
insert into public.experience (role, company, location, start_date, end_date, type, description, featured) values
  ('AI Graphic Designer', 'Modenaire', 'Remote', '2026', null, 'Freelance', 'Using AI-assisted design tools to produce on-brand graphics and creative assets at speed.', true),
  ('Graphic Designer / Email Assistant', 'Bluenotes Brandon', 'Remote', '2025', null, 'Freelance', 'Supporting inbox and design workflows with on-brand visual assets and quick-turnaround requests.', false),
  ('Graphic Designer / Reel Editor', 'Ling Skincare Newyork', 'Remote', '2025', null, 'Freelance', 'Editing short-form reels and designing promotional graphics for a skincare brand.', true),
  ('Graphic Designer / WordPress Editor', 'Limelight Online Clothing Store', 'Remote', '2025', null, 'Freelance', 'Designing product graphics and maintaining the brand''s WordPress storefront.', false),
  ('Graphic Designer / Social Media Manager', 'KK Migration Consultants', 'Remote', '2025', null, 'Freelance', 'Managing social content calendars and designing marketing graphics for a migration consultancy.', false),
  ('Graphic Designer / Social Media Manager', 'Bluenotes Brandon', 'Remote', '2024', null, 'Freelance', 'Planned and designed social media content across platforms for consistent brand presence.', false),
  ('Graphic Designer / Reel Editor', 'Mendocino Treehouse', 'Remote', '2024', null, 'Freelance', 'Edited promotional reels and designed graphics for a hospitality brand.', false),
  ('Graphic Designer / Social Media Manager', 'Bugsy''s Pest Solutions', 'Remote', '2024', null, 'Freelance', 'Created social media graphics and managed content posting for a local service business.', false),
  ('Graphic Designer / Social Media Manager', 'OH! Waffles & Crepes', 'Remote', '2024', null, 'Freelance', 'Designed food photography-style graphics and managed the brand''s social presence.', false),
  ('Graphic Designer / Social Media Manager', 'UpNorth Coffee', 'Remote', '2024', null, 'Freelance', 'Built out a consistent visual identity across social posts for a coffee brand.', false),
  ('Graphic Designer / Video Editor', 'New Generations Academy', 'Remote', '2022', '2023', 'Freelance', 'Produced educational and promotional video content alongside supporting graphic design work.', true),
  ('Graphic Designer / Reel Editor', 'Bluenotes Brandon', 'Remote', '2022', '2023', 'Freelance', 'Edited short-form reels to support the brand''s social media marketing.', false),
  ('Graphic Designer / Social Media Manager', '100 Fold Media Agency', 'Remote', '2022', '2023', 'Freelance', 'Delivered social media graphics and content strategy support for agency clients.', false),
  ('Graphic Designer / Reel Editor', 'Cashflow Bros', 'Remote', '2022', '2023', 'Freelance', 'Edited engaging short-form video content for a finance-focused brand.', false),
  ('Graphic Designer / Social Media Manager', 'Northpoint Citi Church', 'Remote', '2019', '2025', 'Freelance', 'Long-running role designing graphics and managing social media content for a church community.', true)
;

-- ---------------------------------------------------------------------------
-- Featured projects (placeholders -- replace descriptions/images via the
-- admin Projects page once real case study assets are ready)
-- ---------------------------------------------------------------------------
insert into public.projects (title, description, category, status, tech_stack, featured) values
  ('Church Social Media Rebrand', 'Refreshed the visual identity and social content strategy for Northpoint Citi Church across Instagram and Facebook.', 'Social Media Ads & Marketing Creatives', 'published', array['Canva', 'Meta Business Suite'], true),
  ('Skincare Reel Campaign', 'A series of short-form reels edited to promote product launches for Ling Skincare Newyork.', 'Video Editing & Short-form Content', 'published', array['Premiere Pro', 'CapCut'], true),
  ('Clothing Store Product Listings', 'Redesigned product graphics and listing images for Limelight Online Clothing Store''s online shop.', 'E-commerce Graphics (Amazon, Shopify, Etsy)', 'published', array['WordPress', 'Canva'], true),
  ('Café Brand Identity', 'Built a consistent visual identity and content calendar for UpNorth Coffee''s social channels.', 'Branding & Packaging Design', 'published', array['Canva', 'Meta Business Suite'], false)
;
