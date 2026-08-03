/*
# Add SEO settings columns to site_settings

1. Purpose
- Let the admin control SEO metadata (title, description, keywords, Open Graph image) from the dashboard.
- Applied dynamically to the document <head> on the public site.

2. New Columns on `site_settings`
- `seo_title` (text) — browser tab / search result title.
- `seo_description` (text) — meta description.
- `seo_keywords` (text) — comma-separated keywords.
- `og_image_url` (text) — Open Graph / social share image URL.

3. Security
- No policy changes; existing public-read / admin-write policies on site_settings cover the new columns automatically.

4. Notes
- Uses DO $$ ... END $$ to add columns idempotently.
- Defaults are empty strings so existing reads don't break.
*/

DO $$
BEGIN
  ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS seo_title text NOT NULL DEFAULT '';
  ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS seo_description text NOT NULL DEFAULT '';
  ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS seo_keywords text NOT NULL DEFAULT '';
  ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS og_image_url text;
END $$;
