import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react';
import type { SiteSettings } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

export function Contact({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const { error } = await supabase.from('contact_messages').insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: form.message,
    });
    if (error) {
      setStatus('error');
      return;
    }
    setStatus('sent');
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

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
          <span className="eyebrow">Get In Touch</span>
          <h2 className="heading-lg mt-3 text-ink-800">Let's Build Together</h2>
          <div className="gold-line mx-auto mt-5" />
          <p className="mx-auto mt-5 max-w-2xl text-ink-500">
            Ready to start your next project? Reach out for a free consultation with our engineering experts.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-bold text-ink-800">Send Us a Message</h3>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field"
                />
                <input
                  required
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field"
                />
              </div>
              <input
                placeholder="Phone Number (optional)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-field"
              />
              <textarea
                required
                rows={5}
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="input-field resize-none"
              />
              <button type="submit" disabled={status === 'sending'} className="btn-gold w-full disabled:opacity-60">
                {status === 'sending' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : status === 'sent' ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <Send size={16} />
                )}
                {status === 'sent' ? 'Message Sent!' : status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'error' && (
                <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
              )}
            </form>
          </motion.div>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="glass-card space-y-4 p-8">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold-500/15 to-gold2-500/10 text-gold-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink-800">Visit Us</div>
                  <div className="text-sm text-ink-500">{settings.address}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold-500/15 to-gold2-500/10 text-gold-500">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink-800">Call Us</div>
                  <div className="space-y-0.5 text-sm text-ink-500">
                    <div>{settings.phone}</div>
                    <div>+8801797334951</div>
                    <div>+8801758911597</div>
                    <div>+8801873631950</div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold-500/15 to-gold2-500/10 text-gold-500">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink-800">Email Us</div>
                  <div className="text-sm text-ink-500">{settings.email}</div>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                {settings.whatsapp_url && (
                  <a
                    href={settings.whatsapp_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                )}
                <a
                  href={`tel:${settings.phone}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gold-500/50 px-5 py-3 text-sm font-semibold text-gold-600 transition hover:bg-gold-500 hover:text-white"
                >
                  <Phone size={16} /> Call Now
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="glass-card overflow-hidden p-2">
              {settings.map_embed ? (
                <iframe
                  title="Office Location"
                  src={settings.map_embed}
                  className="h-64 w-full rounded-2xl border-0"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-ink-100 text-ink-400">
                  <MapPin size={32} />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating call button */}
      <a
        href={`tel:${settings.phone}`}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold2-500 text-white shadow-gold-lg transition hover:scale-110 active:scale-90"
        aria-label="Call us"
      >
        <Phone size={22} />
        <span className="absolute inset-0 animate-ping rounded-full bg-gold-500/40" />
      </a>
    </section>
  );
}
