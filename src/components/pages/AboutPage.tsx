import type { SiteSettings } from '@/lib/supabase';
import { PageHeader, PageShell } from '@/components/PageHeader';
import { About } from '@/components/sections/About';
import { WhyUs } from '@/components/sections/WhyUs';

export function AboutPage({ settings }: { settings: SiteSettings }) {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About Us"
        title="Engineering Excellence, Built on Trust"
        subtitle="Professional structural and architectural engineering consultancy serving all of Bangladesh."
      />
      <About settings={settings} />
      <WhyUs />
    </PageShell>
  );
}
