/*
# Storage policies for cms-media bucket

1. Purpose
- Allow public (anon) READ of images so the website can display them.
- Allow authenticated admins to UPLOAD, UPDATE, and DELETE images.

2. Security
- SELECT (read) public for anon + authenticated.
- INSERT/UPDATE/DELETE restricted to authenticated admins.
*/

DROP POLICY IF EXISTS "public_read_cms_media" ON storage.objects;
CREATE POLICY "public_read_cms_media" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'cms-media');

DROP POLICY IF EXISTS "admin_insert_cms_media" ON storage.objects;
CREATE POLICY "admin_insert_cms_media" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'cms-media');

DROP POLICY IF EXISTS "admin_update_cms_media" ON storage.objects;
CREATE POLICY "admin_update_cms_media" ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'cms-media') WITH CHECK (bucket_id = 'cms-media');

DROP POLICY IF EXISTS "admin_delete_cms_media" ON storage.objects;
CREATE POLICY "admin_delete_cms_media" ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'cms-media');