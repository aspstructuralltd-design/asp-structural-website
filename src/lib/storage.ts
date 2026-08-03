import { supabase, STORAGE_BUCKET } from '@/lib/supabase';

export async function uploadImage(
  file: File,
  folder: string
): Promise<{ url: string; path: string } | { error: string }> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `${folder}/${safeName}`;
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { error: error.message };
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path };
}

export async function deleteImage(path: string): Promise<void> {
  await supabase.storage.from(STORAGE_BUCKET).remove([path]);
}

export function pathFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const idx = u.pathname.indexOf(STORAGE_BUCKET);
    if (idx === -1) return null;
    return decodeURIComponent(u.pathname.slice(idx + STORAGE_BUCKET.length + 1));
  } catch {
    return null;
  }
}
