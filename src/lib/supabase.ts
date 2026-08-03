import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  storageKey: 'asp-admin-auth',
  },
});

export const STORAGE_BUCKET = 'cms-media';

export type SiteSettings = {
  id: string;
  key: string;
  company_name: string;
  tagline: string;
  hero_headline: string;
  hero_subheadline: string;
  hero_button1_text: string;
  hero_button2_text: string;
  hero_banner_url: string | null;
  logo_url: string | null;
  about_text: string;
  mission: string;
  vision: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  facebook_url: string;
  linkedin_url: string;
  whatsapp_url: string;
  map_embed: string | null;
  footer_note: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  og_image_url: string | null;
  updated_at: string;
};

export type Service = {
  id: string;
  title: string;
  description: string | null;
  icon_name: string;
  sort_order: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  position: string;
  email: string | null;
  bio: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
  facebook_url: string | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  location: string | null;
  status: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type Testimonial = {
  id: string;
  client_name: string;
  role: string | null;
  quote: string;
  photo_url: string | null;
  rating: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  created_at: string;
};

export const PROJECT_CATEGORIES = [
  'Residential Building',
  'Commercial Building',
  'Industrial Building',
  'Duplex House',
  'Apartment Building',
  'Foundation Design',
  'Bridge Design',
] as const;

export const PROJECT_STATUSES = ['Completed', 'Ongoing', 'Planning'] as const;
