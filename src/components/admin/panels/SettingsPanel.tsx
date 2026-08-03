import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { SiteSettings } from '@/lib/supabase';
import { useSettings } from '@/hooks/useSettings';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { PanelHeader } from '@/components/admin/ui';
import { Save, Loader2, CheckCircle2 } from 'lucide-react';

export function SettingsPanel() {
  const { settings, setSettings } = useSettings();
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm(settings), [settings]);

  const update = (k: keyof SiteSettings, v: string | null) =>
    setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    const { data, error } = await supabase
      .from('site_settings')
      .update({
        company_name: form.company_name,
        tagline: form.tagline,
        hero_headline: form.hero_headline,
        hero_subheadline: form.hero_subheadline,
        hero_button1_text: form.hero_button1_text,
        hero_button2_text: form.hero_button2_text,
        hero_banner_url: form.hero_banner_url,
        logo_url: form.logo_url,
        about_text: form.about_text,
        mission: form.mission,
        vision: form.vision,
        address: form.address,
        phone: form.phone,
        email: form.email,
        whatsapp: form.whatsapp,
        facebook_url: form.facebook_url,
        linkedin_url: form.linkedin_url,
        whatsapp_url: form.whatsapp_url,
        map_embed: form.map_embed,
        footer_note: form.footer_note,
        seo_title: form.seo_title,
        seo_description: form.seo_description,
        seo_keywords: form.seo_keywords,
        og_image_url: form.og_image_url,
        updated_at: new Date().toISOString(),
      })
      .eq('key', 'primary')
      .select()
      .maybeSingle();
    if (!error && data) {
      setSettings(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const Field = ({
    label, k, type = 'text', area = false,
  }: {
    label: string; k: keyof SiteSettings; type?: string; area?: boolean;
  }) => (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">{label}</label>
      {area ? (
        <textarea
          className="input-field min-h-[100px] resize-y"
          value={form[k] as string}
          onChange={(e) => update(k, e.target.value)}
        />
      ) : (
        <input
          type={type}
          className="input-field"
          value={form[k] as string}
          onChange={(e) => update(k, e.target.value)}
        />
      )}
    </div>
  );

  return (
    <div>
      <PanelHeader
        title="Site Settings"
        desc="Edit all text, branding, and contact details shown across the website."
        action={
          <button onClick={save} disabled={saving} className="btn-gold disabled:opacity-60">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Changes
          </button>
        }
      />

      {saved && (
        <div className="mb-6 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 size={18} /> Settings saved successfully.
        </div>
      )}

      <div className="space-y-8">
        {/* Branding */}
        <section className="admin-card">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-500">Branding</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <ImageUpload
              label="Logo"
              folder="logo"
              value={form.logo_url}
              onChange={(v) => update('logo_url', v)}
            />
            <ImageUpload
              label="Homepage Banner"
              folder="banner"
              value={form.hero_banner_url}
              onChange={(v) => update('hero_banner_url', v)}
            />
          </div>
        </section>

        {/* Hero */}
        <section className="admin-card">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-500">Hero Section</h3>
          <div className="space-y-4">
            <Field label="Headline" k="hero_headline" />
            <Field label="Subheadline" k="hero_subheadline" area />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Button 1 Text" k="hero_button1_text" />
              <Field label="Button 2 Text" k="hero_button2_text" />
            </div>
          </div>
        </section>

        {/* About */}
        <section className="admin-card">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-500">About Section</h3>
          <div className="space-y-4">
            <Field label="About Text" k="about_text" area />
            <Field label="Mission" k="mission" area />
            <Field label="Vision" k="vision" area />
          </div>
        </section>

        {/* Contact */}
        <section className="admin-card">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-500">Contact &amp; Social</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Company Name" k="company_name" />
            <Field label="Tagline" k="tagline" />
            <Field label="Address" k="address" />
            <Field label="Phone" k="phone" />
            <Field label="Email" k="email" type="email" />
            <Field label="WhatsApp Number" k="whatsapp" />
            <Field label="Facebook URL" k="facebook_url" />
            <Field label="LinkedIn URL" k="linkedin_url" />
            <Field label="WhatsApp URL" k="whatsapp_url" />
            <Field label="Footer Note" k="footer_note" />
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">
              Google Map Embed (paste the iframe src URL)
            </label>
            <input
              className="input-field"
              value={form.map_embed ?? ''}
              onChange={(e) => update('map_embed', e.target.value ? `<iframe src="${e.target.value}" width="100%" height="260" style="border:0;" loading="lazy"></iframe>` : null)}
              placeholder="https://www.google.com/maps/embed?..."
            />
          </div>
        </section>

        {/* SEO */}
        <section className="admin-card">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-500">SEO Settings</h3>
          <div className="space-y-4">
            <Field label="SEO Title (browser tab / search results)" k="seo_title" />
            <Field label="Meta Description" k="seo_description" area />
            <Field label="Keywords (comma-separated)" k="seo_keywords" />
            <ImageUpload
              label="Social Share Image (Open Graph)"
              folder="seo"
              value={form.og_image_url}
              onChange={(v) => update('og_image_url', v)}
            />
          </div>
        </section>

        <div className="flex justify-end">
          <button onClick={save} disabled={saving} className="btn-gold disabled:opacity-60">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
