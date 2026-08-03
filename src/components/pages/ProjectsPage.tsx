import type { Project } from '@/lib/supabase';
import { PageHeader, PageShell } from '@/components/PageHeader';
import { Projects as ProjectsSection } from '@/components/sections/Projects';

export function ProjectsPage({ projects }: { projects: Project[] }) {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Our Work"
        title="Projects"
        subtitle="A showcase of our engineering and architectural projects across Bangladesh."
      />
      <ProjectsSection projects={projects} />
    </PageShell>
  );
}
