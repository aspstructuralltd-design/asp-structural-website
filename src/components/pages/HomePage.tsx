import { motion } from 'framer-motion';
import { ArrowRight, ImageIcon } from 'lucide-react';
import type { SiteSettings, Service, Project, Testimonial, TeamMember } from '@/lib/supabase';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { WhyUs } from '@/components/sections/WhyUs';
import { Testimonials } from '@/components/sections/Testimonials';

export function HomePage({
  settings,
  services,
  projects,
  testimonials,
  team,
  navigate,
}: {
  settings: SiteSettings;
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  team: TeamMember[];
  navigate: (to: string) => void;
}) {
  return (
    <>
      <Hero settings={settings} navigate={navigate} />
      <About settings={settings} />
      <Services services={services} />
      <WhyUs />

      {/* Projects preview */}
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -8 }}
                className="group glass-card overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden bg-ink-100">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-ink-100 to-ink-200">
                      <ImageIcon size={40} className="text-ink-300" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold-500">{p.category}</span>
                  <h3 className="mt-1 text-lg font-bold text-ink-800">{p.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button onClick={() => navigate('/projects')} className="btn-outline group">
              View All Projects <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Team preview */}
      {team.length > 0 && (
        <section className="section-pad py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="mb-12 text-center"
            >
              <span className="eyebrow">Our People</span>
              <h2 className="heading-lg mt-3 text-ink-800">Meet the Team</h2>
              <div className="gold-line mx-auto mt-5" />
            </motion.div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.slice(0, 4).map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="glass-card overflow-hidden text-center"
                >
                  <div className="aspect-square overflow-hidden bg-ink-100">
                    {m.photo_url ? (
                      <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-ink-100 to-ink-200">
                        <ImageIcon size={40} className="text-ink-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-ink-800">{m.name}</h3>
                    <p className="text-sm text-gold-600">{m.position}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <button onClick={() => navigate('/team')} className="btn-outline group">
                View Full Team <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
      )}

      <Testimonials testimonials={testimonials} />

      {/* CTA */}
      <section className="section-pad py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="heading-lg text-ink-800">Ready to Build Something Safer?</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-500">
            Get in touch for a free consultation with our engineering experts.
          </p>
          <button onClick={() => navigate('/contact')} className="btn-gold mt-8 group">
            Get Free Consultation <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </button>
        </motion.div>
      </section>
    </>
  );
}
