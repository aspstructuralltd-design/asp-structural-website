import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, UserCircle2 } from 'lucide-react';
import type { Testimonial } from '@/lib/supabase';

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, [paused, testimonials.length]);

  if (testimonials.length === 0) return null;
  const t = testimonials[idx];
  if (!t) return null;

  return (
    <section
      className="section-pad relative overflow-hidden bg-ink-100/50 py-24 lg:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-gold2-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">Testimonials</span>
          <h2 className="heading-lg mt-3 text-ink-800">What Our Clients Say</h2>
          <div className="gold-line mx-auto mt-5" />
        </motion.div>

        <div className="relative mt-12 min-h-[280px]">
          <Quote className="mx-auto mb-6 text-gold-500/30" size={48} />
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6 flex justify-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-gold-500 text-gold-500" />
                ))}
              </div>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-ink-600 sm:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                {t.photo_url ? (
                  <img
                    src={t.photo_url}
                    alt={t.client_name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-gold-500/40"
                  />
                ) : (
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-gold-500/15 to-gold2-500/10 ring-2 ring-gold-500/40">
                    <UserCircle2 size={28} className="text-gold-500" />
                  </div>
                )}
                <div className="text-left">
                  <div className="font-semibold text-ink-800">{t.client_name}</div>
                  {t.role && <div className="text-sm text-gold-600">{t.role}</div>}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {testimonials.length > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 text-ink-600 transition hover:border-gold-500 hover:bg-gold-500 hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === idx ? 'w-8 bg-gold-500' : 'w-2 bg-ink-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 text-ink-600 transition hover:border-gold-500 hover:bg-gold-500 hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
