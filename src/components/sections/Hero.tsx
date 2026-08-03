import { motion } from 'framer-motion';
import { ArrowRight, Building2, ShieldCheck, Award, Users } from 'lucide-react';
import type { SiteSettings } from '@/lib/supabase';
import { useScrollY, useMouse } from '@/components/Reveal';

export function Hero({
  settings,
  navigate,
}: {
  settings: SiteSettings;
  navigate: (to: string) => void;
}) {
  const scrollY = useScrollY();
  const mouse = useMouse();
  const banner = settings.hero_banner_url;

  return (
    <section className="relative min-h-screen overflow-hidden bg-ink-50">
      {/* Mouse-following soft light */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(600px circle at ${50 + mouse.x * 8}% ${40 + mouse.y * 8}%, rgba(198,154,59,0.10), transparent 60%)`,
        }}
      />

      {/* Background: uploaded banner or blueprint SVG */}
      <div className="absolute inset-0 z-0">
        {banner ? (
          <motion.img
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            src={banner}
            alt="Engineering background"
            className="h-full w-full object-cover"
            style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
          />
        ) : (
          <BlueprintVisual mouse={mouse} scrollY={scrollY} />
        )}
        {/* Soft white overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-ink-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-pad mx-auto flex min-h-screen max-w-7xl flex-col justify-center pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <span className="eyebrow">{settings.tagline}</span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="heading-xl mt-4 text-ink-800"
          >
            {settings.hero_headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500 sm:text-xl"
          >
            {settings.hero_subheadline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button onClick={() => navigate('/contact')} className="btn-gold group">
              {settings.hero_button1_text}
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </button>
            <button onClick={() => navigate('/projects')} className="btn-outline group">
              {settings.hero_button2_text}
            </button>
          </motion.div>
        </motion.div>

        {/* Floating stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid max-w-2xl grid-cols-3 gap-4"
          style={{ transform: `translateY(${scrollY * -0.05}px)` }}
        >
          {[
            { icon: Building2, value: '3', label: 'Projects Completed' },
            { icon: Users, value: '3+', label: 'Happy Clients' },
            { icon: ShieldCheck, value: '5+', label: 'Professional Engineers' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-card flex flex-col items-center gap-1 p-5 text-center"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <s.icon size={22} className="text-gold-500" />
              <span className="font-display text-2xl font-bold text-ink-800">{s.value}</span>
              <span className="text-xs text-ink-500">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-gold-500/40 p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="h-2 w-1 rounded-full bg-gold-500"
          />
        </div>
      </motion.div>
    </section>
  );
}

/** Animated architectural blueprint SVG used when no banner is uploaded. */
function BlueprintVisual({ mouse, scrollY }: { mouse: { x: number; y: number }; scrollY: number }) {
  return (
    <div
      className="absolute inset-0"
      style={{ transform: `translate(${mouse.x * 12}px, ${mouse.y * 12 + scrollY * 0.2}px)` }}
    >
      <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c69a3b" strokeWidth="0.5" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="1200" height="800" fill="url(#grid)" />
        {/* Building outline */}
        <g stroke="#c69a3b" strokeWidth="1.5" fill="none" opacity="0.25">
          <rect x="200" y="150" width="800" height="550" />
          <rect x="260" y="200" width="680" height="450" />
          <line x1="200" y1="300" x2="1000" y2="300" />
          <line x1="200" y1="450" x2="1000" y2="450" />
          <line x1="200" y1="600" x2="1000" y2="600" />
          <line x1="400" y1="150" x2="400" y2="700" />
          <line x1="600" y1="150" x2="600" y2="700" />
          <line x1="800" y1="150" x2="800" y2="700" />
          {/* Foundation */}
          <line x1="150" y1="700" x2="1050" y2="700" strokeWidth="3" />
          {/* Dimension lines */}
          <line x1="200" y1="730" x2="1000" y2="730" strokeDasharray="4 4" />
          <text x="600" y="750" fill="#c69a3b" fontSize="14" textAnchor="middle" opacity="0.4" fontFamily="monospace">
            80.00m
          </text>
        </g>
        {/* Cross section indicator */}
        <g stroke="#d8b15a" strokeWidth="1" fill="none" opacity="0.2">
          <circle cx="600" cy="400" r="180" />
          <circle cx="600" cy="400" r="120" />
          <line x1="420" y1="400" x2="780" y2="400" />
          <line x1="600" y1="220" x2="600" y2="580" />
        </g>
      </svg>
    </div>
  );
}
