import type { Service } from '@/lib/supabase';
import { PageHeader, PageShell } from '@/components/PageHeader';
import { Services as ServicesSection } from '@/components/sections/Services';

export function ServicesPage({ services }: { services: Service[] }) {
  return (
    <PageShell>
      <PageHeader
        eyebrow="What We Do"
        title="Our Services"
        subtitle="Comprehensive engineering solutions from concept to completion, delivered to the highest professional standards."
      />
      <ServicesSection services={services} />
    </PageShell>
  );
}
