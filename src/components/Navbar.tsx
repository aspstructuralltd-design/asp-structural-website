import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUp } from 'lucide-react';
import type { SiteSettings } from '@/lib/supabase';

const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Team', path: '/team' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar({
  settings,
  path,
  navigate,
}: {
  settings: SiteSettings;
  path: string;
  navigate: (to: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (to: string) => {
    navigate(to);
    setOpen(false);
  };

  const isHome = path === '/';

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'glass shadow-soft py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="section-pad mx-auto flex max-w-7xl items-center justify-between">
          <button onClick={() => go('/')} className="flex items-center gap-3">
            {settings.logo_url ? (
              <img src={settings.logo_url} alt="Logo" className="h-10 w-auto object-contain" />
            ) : (
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold-500 to-gold2-500 font-display text-xl font-bold text-white shadow-gold">
                A
              </span>
            )}
            <div className="leading-tight text-left">
              <span className="block font-display text-base font-bold text-ink-800">
                {settings.company_name}
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-gold-500">
                {settings.tagline}
              </span>
            </div>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <button
                key={l.path}
                onClick={() => go(l.path)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  path === l.path
                    ? 'text-gold-600'
                    : 'text-ink-600 hover:text-gold-600'
                }`}
              >
                {l.label}
                {path === l.path && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-gold-500/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go('/contact')}
              className="hidden btn-gold !px-6 !py-2.5 sm:inline-flex"
            >
              Get Consultation
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 text-ink-700 lg:hidden"
              aria-label="Menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 lg:hidden"
          >
            <div className="section-pad mx-auto max-w-7xl">
              <div className="glass-card flex flex-col gap-1 p-3">
                {links.map((l) => (
                  <button
                    key={l.path}
                    onClick={() => go(l.path)}
                    className={`rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                      path === l.path
                        ? 'bg-gold-500/10 text-gold-600'
                        : 'text-ink-600 hover:bg-ink-100'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
                <button onClick={() => go('/contact')} className="btn-gold mt-2">
                  Get Free Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold-500 to-gold2-500 text-white shadow-gold transition hover:scale-110 active:scale-90"
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </motion.button>
  );
}
