import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Settings, Users, FolderKanban, Wrench, MessageSquareQuote,
  Mail, LogOut, Menu, X, ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AdminOverview } from '@/components/admin/panels/Overview';
import { SettingsPanel } from '@/components/admin/panels/SettingsPanel';
import { TeamPanel } from '@/components/admin/panels/TeamPanel';
import { ProjectsPanel } from '@/components/admin/panels/ProjectsPanel';
import { ServicesPanel } from '@/components/admin/panels/ServicesPanel';
import { TestimonialsPanel } from '@/components/admin/panels/TestimonialsPanel';
import { MessagesPanel } from '@/components/admin/panels/MessagesPanel';

type Tab = 'overview' | 'settings' | 'team' | 'projects' | 'services' | 'testimonials' | 'messages';

const NAV: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'settings', label: 'Site Settings', icon: Settings },
  { id: 'team', label: 'Team Members', icon: Users },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { id: 'messages', label: 'Messages', icon: Mail },
];

export function AdminDashboard() {
  const { signOut } = useAuth();
  const [tab, setTab] = useState<Tab>('overview');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = document.getElementById('app-loader');
    if (el) {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 700);
    }
  }, []);

  const Panel: Record<Tab, ReactNode> = {
    overview: <AdminOverview go={setTab} />,
    settings: <SettingsPanel />,
    team: <TeamPanel />,
    projects: <ProjectsPanel />,
    services: <ServicesPanel />,
    testimonials: <TestimonialsPanel />,
    messages: <MessagesPanel />,
  };

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-ink-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-ink-200 px-5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold-500 to-gold2-500 font-display text-lg font-bold text-white shadow-gold">
            A
          </span>
          <div className="leading-tight">
            <div className="font-display text-sm font-bold text-ink-800">ASP Admin</div>
            <div className="text-[10px] uppercase tracking-widest text-gold-500">CMS Dashboard</div>
          </div>
        </div>
        <nav className="space-y-1 p-3">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                setTab(n.id);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                tab === n.id
                  ? 'bg-gradient-to-r from-gold-500 to-gold2-500 text-white shadow-gold'
                  : 'text-ink-600 hover:bg-ink-100'
              }`}
            >
              <n.icon size={18} />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="absolute inset-x-0 bottom-0 space-y-2 border-t border-ink-200 p-3">
          <a
            href="/"
            target="_blank"
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-ink-600 transition hover:bg-ink-100"
          >
            <ExternalLink size={18} /> View Website
          </a>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-500/10"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink-900/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-200 bg-white/80 px-5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-ink-600 lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
            <h1 className="font-display text-lg font-bold text-ink-800">
              {NAV.find((n) => n.id === tab)?.label}
            </h1>
          </div>
        </header>

        <motion.main
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-5 lg:p-8"
        >
          {Panel[tab]}
        </motion.main>
      </div>
    </div>
  );
}
