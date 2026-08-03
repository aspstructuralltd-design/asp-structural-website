import { useEffect } from 'react';
import type { SiteSettings } from '@/lib/supabase';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useSeo(settings: SiteSettings) {
  useEffect(() => {
    const title = settings.seo_title || `${settings.company_name} — ${settings.tagline}`;
    const desc = settings.seo_description || settings.hero_subheadline;
    document.title = title;
    setMeta('name', 'description', desc);
    if (settings.seo_keywords) setMeta('name', 'keywords', settings.seo_keywords);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', desc);
    if (settings.og_image_url) setMeta('property', 'og:image', settings.og_image_url);
    if (settings.logo_url) setMeta('property', 'og:logo', settings.logo_url);
  }, [settings]);
}
