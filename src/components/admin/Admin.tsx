import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Loader } from '@/components/Loader';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export function Admin() {
  const { session, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (loading) return;
    const el = document.getElementById('app-loader');
    if (el) {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 700);
    }
  }, [loading]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setBusy(false);
  };

  if (loading) return <Loader />;
  if (session) return <AdminDashboard />;

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-ink-50 px-5">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold2-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(198,154,59,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(198,154,59,0.06)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-500 to-gold2-500 font-display text-3xl font-bold text-white shadow-gold">
            A
          </div>
          <h1 className="font-display text-2xl font-bold text-ink-800">ASP Structural Admin</h1>
          <p className="mt-1 text-sm text-ink-500">Sign in to manage your website content</p>
        </div>

        <form onSubmit={signIn} className="glass-card space-y-5 p-8">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aspstructural.com"
                className="input-field !pl-10"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field !pl-10"
              />
            </div>
          </div>
          {error && (
            <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">{error}</div>
          )}
          <button type="submit" disabled={busy} className="btn-gold w-full disabled:opacity-60">
            {busy ? 'Signing in...' : 'Sign In'}
            <ArrowRight size={16} />
          </button>
          <div className="flex items-center gap-2 rounded-xl bg-gold-500/10 px-4 py-3 text-xs text-gold-700">
            <ShieldCheck size={14} className="shrink-0" />
            Default credentials: admin@aspstructural.com / aspstructural2024
          </div>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-ink-500 transition hover:text-gold-600">
            ← Back to website
          </a>
        </div>
      </motion.div>
    </div>
  );
}
