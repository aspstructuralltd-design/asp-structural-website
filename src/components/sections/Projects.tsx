import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, ImageIcon } from 'lucide-react';
import type { Project } from '@/lib/supabase';

export function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>('All');
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  if (projects.length === 0) return null;

  return (
    <section className="section-pad py-24 lg:py-32 bg-ink-100/50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="eyebrow">Our Work</span>
          <h2 className="heading-lg mt-3 text-ink-800">Featured Projects</h2>
          <div className="gold-line mx-auto mt-5" />
        </motion.div>

        {/* Filter pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                filter === c
                  ? 'bg-gradient-to-r from-gold-500 to-gold2-500 text-white shadow-gold'
                  : 'border border-ink-200 bg-white text-ink-600 hover:border-gold-500 hover:text-gold-600'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div layout className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                onClick={() => setLightbox(p)}
                className="group relative mb-6 cursor-pointer break-inside-avoid overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-100 to-ink-200">
                      <ImageIcon size={40} className="text-ink-300" />
                    </div>
                  )}
                  {/* Hover reveal overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">{p.category}</span>
                    <h3 className="mt-1 text-lg font-bold text-white">{p.title}</h3>
                    {p.location && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-white/80">
                        <MapPin size={12} /> {p.location}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/80 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-luxe"
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink-700 shadow-soft transition hover:bg-gold-500 hover:text-white"
              >
                <X size={18} />
              </button>
              <div className="aspect-video w-full overflow-hidden bg-ink-100">
                {lightbox.image_url ? (
                  <img src={lightbox.image_url} alt={lightbox.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon size={48} className="text-ink-300" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-500">{lightbox.category}</span>
                <h3 className="mt-1 text-2xl font-bold text-ink-800">{lightbox.title}</h3>
                {lightbox.location && (
                  <p className="mt-2 flex items-center gap-1 text-sm text-ink-500">
                    <MapPin size={14} /> {lightbox.location}
                  </p>
                )}
                {lightbox.description && <p className="mt-3 leading-relaxed text-ink-500">{lightbox.description}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
