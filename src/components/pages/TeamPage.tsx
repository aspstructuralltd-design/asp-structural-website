import type { TeamMember } from '@/lib/supabase';
import { PageHeader, PageShell } from '@/components/PageHeader';
import { Team as TeamSection } from '@/components/sections/Team';

export function TeamPage({ members }: { members: TeamMember[] }) {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Our People"
        title="Meet the Team"
        subtitle="A dedicated team of engineers, architects, and coordinators committed to delivering excellence on every project."
      />
      <TeamSection members={members} />
    </PageShell>
  );
}
