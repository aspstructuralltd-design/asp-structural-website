import { type ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';

export function PageHeader({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink-100/60 pt-32 pb-16 text-center">
      {/* Decorative grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(198,154,59,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(198,154,59,0.08)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="relative section-pad mx-auto max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="heading-xl mt-3 text-ink-800"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-5 max-w-2xl text-lg text-ink-500"
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="gold-line mx-auto mt-6"
        />
      </div>
    </section>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-ink-50">{children}</div>;
}
