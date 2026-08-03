/*
# ASP Structural CMS — full schema

1. Purpose
- Single-tenant engineering company website with an admin dashboard.
- Admin signs in (email/password) to manage all content; the public site reads content anonymously.
- Images (logo, banner, team photos, project images, testimonial photos) are stored in the Supabase Storage bucket `cms-media` and referenced by URL in the tables below.

2. New Tables
- `site_settings` — a single row holding editable global content: company name, tagline, hero headline/subheadline, about text, mission, vision, contact details, social links, logo url, hero banner url, theme accent. Uses a fixed key 'primary'.
- `services` — list of services (title, description, icon name, sort order, active).
- `team_members` — staff cards (name, position, email, bio, photo url, social links, sort order).
- `projects` — portfolio gallery (title, category, location, status, description, image url, sort order).
- `testimonials` — client reviews (client name, role/company, quote, photo url, rating, sort order).
- `contact_messages` — submissions from the public contact form (name, email, phone, message, created_at).

3. Security
- RLS enabled on every table.
- Public read access (anon + authenticated) for site_settings, services, team_members, projects, testimonials — these power the public website.
- Public INSERT on contact_messages so visitors can submit the form.
- Only authenticated admins can INSERT/UPDATE/DELETE on content tables and SELECT contact_messages.
- The admin is created via Supabase auth (email/password); no custom auth table.

4. Notes
- All tables use `gen_random_uuid()` primary keys and `timestamptz` created/updated timestamps.
- `site_settings` is a singleton enforced by a unique constraint on `key`.
- Sort order columns allow the admin to reorder items; defaults to 0.
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL DEFAULT 'primary',
  company_name text NOT NULL DEFAULT 'ASP Structural Ltd.',
  tagline text NOT NULL DEFAULT 'Building a Safer Nation',
  hero_headline text NOT NULL DEFAULT 'Designing the Future with Engineering Excellence',
  hero_subheadline text NOT NULL DEFAULT 'Professional Structural Design, Architectural Planning, Construction Consultancy & Supervision.',
  hero_button1_text text NOT NULL DEFAULT 'Get Free Consultation',
  hero_button2_text text NOT NULL DEFAULT 'View Our Projects',
  hero_banner_url text,
  logo_url text,
  about_text text NOT NULL DEFAULT 'ASP Structural Ltd. is a professional engineering consultancy providing structural design, architectural planning, construction supervision, estimation, BOQ preparation, and engineering solutions throughout Bangladesh.',
  mission text NOT NULL DEFAULT 'Deliver safe, innovative and economical engineering solutions.',
  vision text NOT NULL DEFAULT 'Become one of Bangladesh''s leading structural engineering firms.',
  address text NOT NULL DEFAULT 'Dhaka, Bangladesh',
  phone text NOT NULL DEFAULT '+880 1000-000000',
  email text NOT NULL DEFAULT 'info@aspstructural.com',
  whatsapp text NOT NULL DEFAULT '+8801000000000',
  facebook_url text NOT NULL DEFAULT '#',
  linkedin_url text NOT NULL DEFAULT '#',
  whatsapp_url text NOT NULL DEFAULT '#',
  map_embed text,
  footer_note text NOT NULL DEFAULT 'Copyright © ASP Structural Ltd.',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_site_settings" ON site_settings;
CREATE POLICY "public_read_site_settings" ON site_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_write_site_settings" ON site_settings;
CREATE POLICY "admin_write_site_settings" ON site_settings
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_site_settings" ON site_settings;
CREATE POLICY "admin_update_site_settings" ON site_settings
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon_name text NOT NULL DEFAULT 'Building2',
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_services" ON services;
CREATE POLICY "public_read_services" ON services FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_services" ON services;
CREATE POLICY "admin_insert_services" ON services FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_services" ON services;
CREATE POLICY "admin_update_services" ON services FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_services" ON services;
CREATE POLICY "admin_delete_services" ON services FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  email text,
  bio text,
  photo_url text,
  linkedin_url text,
  facebook_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_team_members" ON team_members;
CREATE POLICY "public_read_team_members" ON team_members FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_team_members" ON team_members;
CREATE POLICY "admin_insert_team_members" ON team_members FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_team_members" ON team_members;
CREATE POLICY "admin_update_team_members" ON team_members FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_team_members" ON team_members;
CREATE POLICY "admin_delete_team_members" ON team_members FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  location text,
  status text NOT NULL DEFAULT 'Completed',
  description text,
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_projects" ON projects;
CREATE POLICY "public_read_projects" ON projects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_projects" ON projects;
CREATE POLICY "admin_insert_projects" ON projects FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_projects" ON projects;
CREATE POLICY "admin_update_projects" ON projects FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_projects" ON projects;
CREATE POLICY "admin_delete_projects" ON projects FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  role text,
  quote text NOT NULL,
  photo_url text,
  rating int NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_testimonials" ON testimonials;
CREATE POLICY "public_read_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_testimonials" ON testimonials;
CREATE POLICY "admin_insert_testimonials" ON testimonials FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_testimonials" ON testimonials;
CREATE POLICY "admin_update_testimonials" ON testimonials FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_testimonials" ON testimonials;
CREATE POLICY "admin_delete_testimonials" ON testimonials FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_contact_messages" ON contact_messages;
CREATE POLICY "public_insert_contact_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_contact_messages" ON contact_messages;
CREATE POLICY "admin_read_contact_messages" ON contact_messages FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_delete_contact_messages" ON contact_messages;
CREATE POLICY "admin_delete_contact_messages" ON contact_messages FOR DELETE
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_contact_messages" ON contact_messages;
CREATE POLICY "admin_update_contact_messages" ON contact_messages FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Seed the singleton settings row
INSERT INTO site_settings (key)
SELECT 'primary'
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE key = 'primary');

-- Seed default services
INSERT INTO services (title, description, icon_name, sort_order)
SELECT * FROM (VALUES
  ('Structural Design', 'Safe, code-compliant structural design for buildings and infrastructure.', 'Building2', 1),
  ('Architectural Design', 'Aesthetic and functional architectural design tailored to your needs.', 'Ruler', 2),
  ('Building Planning Approval', 'End-to-end support for building permits and planning approvals.', 'FileCheck2', 3),
  ('Construction Supervision', 'On-site supervision to ensure quality and compliance.', 'HardHat', 4),
  ('Estimate & BOQ', 'Accurate cost estimation and Bill of Quantities preparation.', 'Calculator', 5),
  ('2D Floor Planning', 'Detailed 2D floor plans for residential and commercial spaces.', 'LayoutGrid', 6),
  ('3D Exterior Design', 'Photorealistic 3D exterior visualization.', 'Box', 7),
  ('Interior Planning', 'Smart interior space planning and design.', 'Sofa', 8),
  ('Soil Investigation Consultation', 'Professional soil investigation and geotechnical advice.', 'Layers', 9),
  ('Structural Retrofitting', 'Strengthening and retrofitting of existing structures.', 'Wrench', 10),
  ('Engineering Consultancy', 'Expert consultancy for complex engineering challenges.', 'Lightbulb', 11),
  ('Project Management', 'End-to-end project management from concept to handover.', 'ClipboardList', 12)
) AS v(title, description, icon_name, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM services);
