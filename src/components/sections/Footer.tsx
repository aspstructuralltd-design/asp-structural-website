import { Facebook, Mail, MessageCircle, ArrowUp } from 'lucide-react';
import type { SiteSettings } from '@/lib/supabase';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Team', path: '/team' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

const serviceLinks = [
  'Structural Design',
  'Architectural Design',
  'Construction Supervision',
  'Estimate & BOQ',
  'Project Management',
];

export function Footer({
  settings,
  navigate,
}: {
  settings: SiteSettings;
  navigate: (to: string) => void;
}) {
  return (
    <footer className="relative overflow-hidden bg-white">
      {/* Gold divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div className="section-pad mx-auto max-w-7xl py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              {settings.logo_url ? (
                <img src={settings.logo_url} alt="Logo" className="h-10 w-auto" />
              ) : (
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold-500 to-gold2-500 font-display text-xl font-bold text-white shadow-gold">
                  A
                </span>
              )}
              <div>
                <div className="font-display text-base font-bold text-ink-800">{settings.company_name}</div>
                <div className="text-[9px] uppercase tracking-[0.25em] text-gold-500">{settings.tagline}</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-500 line-clamp-4">{settings.about_text}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-ink-800">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.path}>
                  <button onClick={() => navigate(l.path)} className="text-sm text-ink-500 transition hover:text-gold-600">
                    {l.label}
                  </button>
                </li>
              ))}
              <li><a href="/admin" className="text-sm text-ink-500 transition hover:text-gold-600">Admin Login</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-ink-800">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button onClick={() => navigate('/services')} className="text-sm text-ink-500 transition hover:text-gold-600">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-ink-800">Connect</h4>
            <p className="text-sm text-ink-500">{settings.address}</p>
            <div className="mt-2 space-y-1 text-sm text-ink-500">
              <div>{settings.phone}</div>
              <div>+8801797334951</div>
              <div>+8801758911597</div>
              <div>+8801873631950</div>
            </div>
            <p className="mt-2 text-sm text-ink-500">{settings.email}</p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: Facebook, href: settings.facebook_url, label: 'Facebook' },
                { icon: MessageCircle, href: settings.whatsapp_url, label: 'WhatsApp' },
                { icon: Mail, href: `mailto:${settings.email}`, label: 'Email' },
              ].filter((s) => s.href && s.href !== '#').map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 text-ink-500 transition hover:border-gold-500 hover:bg-gold-500 hover:text-white"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Gold divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-ink-500">{settings.footer_note}</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-sm text-ink-500 transition hover:text-gold-600"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
