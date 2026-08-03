import { motion } from 'framer-motion';
import { CheckCircle2, Target, Eye } from 'lucide-react';
import type { SiteSettings } from '@/lib/supabase';

const HIGHLIGHTS = [
  'BNBC Standard Design',
  'Experienced Engineers',
  'Affordable Consultancy',
  'Fast Delivery',
  'Modern Software',
  'Professional Support',
];

export function About({ settings }: { settings: SiteSettings }) {
  return (
    <section className="section-pad py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">About Us</span>
            <h2 className="heading-lg mt-3 text-ink-800">
              Engineering Excellence,<br />
              <span className="gold-gradient-text">Built on Trust</span>
            </h2>
            <div className="gold-line mt-6" />
            <p className="mt-6 text-lg leading-relaxed text-ink-500">{settings.about_text}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 rounded-2xl border border-ink-200 bg-white px-4 py-3 shadow-soft"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-gold-500" />
                  <span className="text-sm font-medium text-ink-600">{h}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-6">
            {[
              { icon: Target, title: 'Our Mission', text: settings.mission },
              { icon: Eye, title: 'Our Vision', text: settings.vision },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="glass-card p-8"
              >
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-500/15 to-gold2-500/10 text-gold-500">
                  <item.icon size={24} />
                </div>
                <h3 className="heading-md text-ink-800">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-500">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
