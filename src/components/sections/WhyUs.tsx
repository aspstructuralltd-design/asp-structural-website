import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Users, Award, Layers, Ruler } from 'lucide-react';

const STATS = [
  { icon: Layers, value: '3', label: 'Projects Completed' },
  { icon: Users, value: '3+', label: 'Happy Clients' },
  { icon: ShieldCheck, value: '5+', label: 'Professional Engineers' },
  { icon: Award, value: '2026', label: 'Established' },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'BNBC Compliant Design',
    text: 'Every structure meets the Bangladesh National Building Code for maximum safety and durability.',
  },
  {
    icon: Ruler,
    title: 'Precision Engineering',
    text: 'Advanced software and meticulous calculations ensure structural integrity on every project.',
  },
  {
    icon: Award,
    title: 'Award-Winning Team',
    text: 'Our engineers bring decades of combined experience from prestigious projects nationwide.',
  },
];

export function WhyUs() {
  return (
    <section className="section-pad py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-card flex flex-col items-center gap-2 p-8 text-center"
            >
              <s.icon size={28} className="text-gold-500" />
              <span className="font-display text-4xl font-bold text-ink-800">{s.value}</span>
              <span className="text-sm text-ink-500">{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-gold-500/15 to-gold2-500/10 text-gold-500">
                <f.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-ink-800">{f.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-ink-500">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
