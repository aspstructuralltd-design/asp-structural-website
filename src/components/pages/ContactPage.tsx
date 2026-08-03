import type { SiteSettings } from '@/lib/supabase';
import { PageHeader, PageShell } from '@/components/PageHeader';
import { Contact as ContactSection } from '@/components/sections/Contact';

export function ContactPage({ settings }: { settings: SiteSettings }) {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Ready to build something safer? Reach out for a free consultation."
      />
      <ContactSection settings={settings} />
    </PageShell>
  );
}
