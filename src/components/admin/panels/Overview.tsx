import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Users, FolderKanban, Wrench, MessageSquareQuote, Mail, TrendingUp } from 'lucide-react';

type Tab = 'overview' | 'settings' | 'team' | 'projects' | 'services' | 'testimonials' | 'messages';

export function AdminOverview({ go }: { go: (t: Tab) => void }) {
  const [counts, setCounts] = useState({
    team: 0,
    projects: 0,
    services: 0,
    testimonials: 0,
    messages: 0,
    unread: 0,
  });

  useEffect(() => {
    (async () => {
      const [t, p, s, te, m] = await Promise.all([
        supabase.from('team_members').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
      ]);
      const { count: unread } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('read', false);
      setCounts({
        team: t.count ?? 0,
        projects: p.count ?? 0,
        services: s.count ?? 0,
        testimonials: te.count ?? 0,
        messages: m.count ?? 0,
        unread: unread ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: 'Team Members', value: counts.team, icon: Users, tab: 'team' as Tab, color: 'from-blue-500/20 to-blue-500/5 text-blue-500' },
    { label: 'Projects', value: counts.projects, icon: FolderKanban, tab: 'projects' as Tab, color: 'from-gold-500/20 to-gold-500/5 text-gold-500' },
    { label: 'Services', value: counts.services, icon: Wrench, tab: 'services' as Tab, color: 'from-emerald-500/20 to-emerald-500/5 text-emerald-500' },
    { label: 'Testimonials', value: counts.testimonials, icon: MessageSquareQuote, tab: 'testimonials' as Tab, color: 'from-purple-500/20 to-purple-500/5 text-purple-500' },
    { label: 'Messages', value: counts.messages, icon: Mail, tab: 'messages' as Tab, color: 'from-sky-500/20 to-sky-500/5 text-sky-500' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="heading-md text-ink-900 dark:text-ink-50">Welcome back, Admin</h2>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
          Manage all your website content from one place.
        </p>
      </div>

      {counts.unread > 0 && (
        <button
          onClick={() => go('messages')}
          className="mb-6 flex w-full items-center gap-3 rounded-xl border border-gold-500/30 bg-gold-500/10 px-5 py-4 text-left transition hover:bg-gold-500/15"
        >
          <Mail size={20} className="text-gold-500" />
          <span className="text-sm font-medium text-ink-700 dark:text-ink-200">
            You have {counts.unread} unread message{counts.unread > 1 ? 's' : ''}. Click to view.
          </span>
        </button>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <button
            key={c.label}
            onClick={() => go(c.tab)}
            className="group flex items-center gap-4 rounded-2xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-luxe"
          >
            <div className={`grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br ${c.color}`}>
              <c.icon size={26} />
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-ink-900 dark:text-ink-50">{c.value}</div>
              <div className="text-sm text-ink-500 dark:text-ink-400">{c.label}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 p-6">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-gold-500" />
          <h3 className="font-semibold text-ink-900 dark:text-ink-50">Quick Actions</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: 'Edit Site Content', tab: 'settings' as Tab },
            { label: 'Add Team Member', tab: 'team' as Tab },
            { label: 'Add Project', tab: 'projects' as Tab },
            { label: 'Add Service', tab: 'services' as Tab },
            { label: 'Add Testimonial', tab: 'testimonials' as Tab },
            { label: 'View Messages', tab: 'messages' as Tab },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => go(a.tab)}
              className="rounded-xl border border-ink-100 dark:border-ink-800 px-4 py-3 text-sm font-medium text-ink-700 dark:text-ink-200 transition hover:border-gold-500 hover:text-gold-500"
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
