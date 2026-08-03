import { useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { useSeo } from '@/hooks/useSeo';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from '@/hooks/useRouter';
import type { Service, TeamMember, Project, Testimonial } from '@/lib/supabase';
import { Navbar, BackToTop } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { HomePage } from '@/components/pages/HomePage';
import { AboutPage } from '@/components/pages/AboutPage';
import { ServicesPage } from '@/components/pages/ServicesPage';
import { TeamPage } from '@/components/pages/TeamPage';
import { ProjectsPage } from '@/components/pages/ProjectsPage';
import { ContactPage } from '@/components/pages/ContactPage';

export function PublicSite() {
  const { settings } = useSettings();
  useSeo(settings);
  const { path, navigate } = useRouter();
  const services = useFetch<Service>({ table: 'services', orderCol: 'sort_order', orderAsc: true });
  const team = useFetch<TeamMember>({ table: 'team_members', orderCol: 'sort_order', orderAsc: true });
  const projects = useFetch<Project>({ table: 'projects', orderCol: 'sort_order', orderAsc: true });
  const testimonials = useFetch<Testimonial>({ table: 'testimonials', orderCol: 'sort_order', orderAsc: true });

  useEffect(() => {
    const t = setTimeout(() => {
      const el = document.getElementById('app-loader');
      if (el) {
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 700);
      }
    }, 900);
    return () => clearTimeout(t);
  }, []);

  const renderPage = () => {
    switch (path) {
      case '/about':
        return <AboutPage settings={settings} />;
      case '/services':
        return <ServicesPage services={services.data} />;
      case '/team':
        return <TeamPage members={team.data} />;
      case '/projects':
        return <ProjectsPage projects={projects.data} />;
      case '/contact':
        return <ContactPage settings={settings} />;
      default:
        return (
          <HomePage
            settings={settings}
            services={services.data}
            projects={projects.data}
            testimonials={testimonials.data}
            team={team.data}
            navigate={navigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-ink-950">
      <Navbar settings={settings} path={path} navigate={navigate} />
      <main>{renderPage()}</main>
      <Footer settings={settings} navigate={navigate} />
      <BackToTop />
    </div>
  );
}
