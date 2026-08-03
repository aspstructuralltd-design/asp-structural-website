import { motion } from 'framer-motion';
import { Mail, Linkedin, Facebook, UserCircle2 } from 'lucide-react';
import type { TeamMember } from '@/lib/supabase';

export function Team({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;

  return (
    <section className="section-pad py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow">Our People</span>
          <h2 className="heading-lg mt-3 text-ink-800">Meet the Experts</h2>
          <div className="gold-line mx-auto mt-5" />
          <p className="mx-auto mt-5 max-w-2xl text-ink-500">
            A dedicated team of engineers and architects committed to delivering excellence.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group glass-card overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden bg-ink-100">
                {m.photo_url ? (
                  <img
                    src={m.photo_url}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full rounded-t-3xl object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-t-3xl bg-gradient-to-br from-ink-100 to-ink-200">
                    <UserCircle2 size={64} className="text-ink-300" />
                  </div>
                )}
                {/* Circular accent */}
                <div className="pointer-events-none absolute inset-0 rounded-t-3xl ring-1 ring-inset ring-gold-500/20" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-ink-800">{m.name}</h3>
                <p className="text-sm font-medium text-gold-600">{m.position}</p>
                {m.bio && <p className="mt-2 text-xs leading-relaxed text-ink-500 line-clamp-2">{m.bio}</p>}
                <div className="mt-4 flex justify-center gap-3">
                  {m.linkedin_url && (
                    <a
                      href={m.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="grid h-9 w-9 place-items-center rounded-full border border-ink-200 text-ink-500 transition hover:border-gold-500 hover:bg-gold-500 hover:text-white"
                    >
                      <Linkedin size={15} />
                    </a>
                  )}
                  {m.facebook_url && (
                    <a
                      href={m.facebook_url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="grid h-9 w-9 place-items-center rounded-full border border-ink-200 text-ink-500 transition hover:border-gold-500 hover:bg-gold-500 hover:text-white"
                    >
                      <Facebook size={15} />
                    </a>
                  )}
                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      aria-label="Email"
                      className="grid h-9 w-9 place-items-center rounded-full border border-ink-200 text-ink-500 transition hover:border-gold-500 hover:bg-gold-500 hover:text-white"
                    >
                      <Mail size={15} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
