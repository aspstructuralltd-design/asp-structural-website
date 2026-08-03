import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { SiteSettings } from '@/lib/supabase';

const defaultSettings: SiteSettings = {
  id: '',
  key: 'primary',
  company_name: 'ASP Structural Ltd.',
  tagline: 'Building a Safer Nation',
  hero_headline: 'Designing the Future with Engineering Excellence',
  hero_subheadline:
    'Professional Structural Design, Architectural Planning, Construction Consultancy & Supervision.',
  hero_button1_text: 'Get Free Consultation',
  hero_button2_text: 'View Our Projects',
  hero_banner_url: null,
  logo_url: null,
  about_text:
    'ASP Structural Ltd. is a professional engineering consultancy providing structural design, architectural planning, construction supervision, estimation, BOQ preparation, and engineering solutions throughout Bangladesh.',
  mission: 'Deliver safe, innovative and economical engineering solutions.',
  vision: 'Become one of Bangladesh\u2019s leading structural engineering firms.',
  address: 'Dhaka, Bangladesh',
  phone: '+880 1000-000000',
  email: 'info@aspstructural.com',
  whatsapp: '+8801000000000',
  facebook_url: '#',
  linkedin_url: '#',
  whatsapp_url: '#',
  map_embed: null,
  footer_note: 'Copyright \u00a9 ASP Structural Ltd.',
  seo_title: '',
  seo_description: '',
  seo_keywords: '',
  og_image_url: null,
  updated_at: '',
};

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', 'primary')
      .maybeSingle();
    if (!error && data) setSettings({ ...defaultSettings, ...data });
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { settings, loading, reload: load, setSettings };
}
