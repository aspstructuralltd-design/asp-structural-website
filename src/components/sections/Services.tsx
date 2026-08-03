import { motion } from 'framer-motion';
import {
  Wrench, ArrowRight, Building2, Home, Ruler, Calculator, HardHat,
  FileText, Layers, ShieldCheck, ClipboardCheck, PencilRuler, Compass,
  type LucideIcon,
} from 'lucide-react';
import type { Service } from '@/lib/supabase';
import { Tilt } from '@/components/Reveal';

const ICON_MAP: Record<string, LucideIcon> = {
  Wrench, Building2, Home, Ruler, Calculator, HardHat,
  FileText, Layers, ShieldCheck, ClipboardCheck, PencilRuler, Compass,
};

export function Services({ services }: { services: Service[] }) {
  const active = services.filter((s) => s.active);
  if (active.length === 0) return null;

  return (
    <section className="section-pad py-24 lg:py-32 bg-ink-100/50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow">What We Do</span>
          <h2 className="heading-lg mt-3 text-ink-800">Our Premium Services</h2>
          <div className="gold-line mx-auto mt-5" />
          <p className="mx-auto mt-5 max-w-2xl text-ink-500">
            Comprehensive engineering solutions from concept to completion, delivered to the highest professional standards.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((s, i) => {
            const Icon = ICON_MAP[s.icon_name] ?? Wrench;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Tilt max={6} className="h-full">
                  <div className="group glass-card h-full p-8 transition-all duration-500 hover:shadow-luxe">
                    <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-500 to-gold2-500 text-white shadow-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon size={26} />
                    </div>
                    <h3 className="text-xl font-bold text-ink-800">{s.title}</h3>
                    {s.description && (
                      <p className="mt-3 text-sm leading-relaxed text-ink-500">{s.description}</p>
                    )}
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-gold-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Learn more <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
