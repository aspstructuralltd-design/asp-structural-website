import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useFetch } from '@/hooks/useFetch';
import type { Testimonial } from '@/lib/supabase';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Modal, ConfirmDelete, PanelHeader, EmptyState } from '@/components/admin/ui';
import { Plus, Pencil, Trash2, Loader2, Star } from 'lucide-react';

const empty: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'> = {
  client_name: '', role: '', quote: '', photo_url: null, rating: 5, sort_order: 0,
};

export function TestimonialsPanel() {
  const { data, loading, reload } = useFetch<Testimonial>({
    table: 'testimonials',
    orderCol: 'sort_order',
    orderAsc: true,
  });
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<typeof empty>(empty);
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState<Testimonial | null>(null);

  const openNew = () => { setForm(empty); setIsNew(true); setEditing({} as Testimonial); };
  const openEdit = (t: Testimonial) => { setForm({ ...t }); setIsNew(false); setEditing(t); };
  const close = () => setEditing(null);

  const save = async () => {
    setBusy(true);
    if (isNew) await supabase.from('testimonials').insert(form);
    else if (editing?.id) await supabase.from('testimonials').update({ ...form, updated_at: new Date().toISOString() }).eq('id', editing.id);
    setBusy(false);
    close();
    reload();
  };

  const remove = async (t: Testimonial) => {
    await supabase.from('testimonials').delete().eq('id', t.id);
    reload();
  };

  return (
    <div>
      <PanelHeader
        title="Testimonials"
        desc="Manage client reviews shown in the testimonial slider."
        action={<button onClick={openNew} className="btn-gold"><Plus size={16} /> Add Testimonial</button>}
      />

      {loading ? (
        <div className="grid place-items-center py-20"><Loader2 className="animate-spin text-gold-500" /></div>
      ) : data.length === 0 ? (
        <EmptyState message="No testimonials yet. Click 'Add Testimonial' to create one." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {data.map((t) => (
            <div key={t.id} className="rounded-2xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 p-5">
              <div className="flex items-start gap-4">
                <img src={t.photo_url ?? ''} alt={t.client_name} className="h-14 w-14 rounded-full object-cover ring-2 ring-gold-500/30" />
                <div className="flex-1">
                  <h3 className="font-semibold text-ink-900 dark:text-ink-50">{t.client_name}</h3>
                  <p className="text-xs text-gold-500">{t.role}</p>
                  <div className="mt-1 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={12} className="fill-gold-500 text-gold-500" />)}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink-500 dark:text-ink-400 line-clamp-3">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => openEdit(t)} className="btn-ghost flex-1 border border-ink-200 dark:border-ink-700"><Pencil size={14} /> Edit</button>
                <button onClick={() => setToDelete(t)} className="grid h-9 w-9 place-items-center rounded-full text-red-500 transition hover:bg-red-500/10"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!editing} onClose={close} title={isNew ? 'Add Testimonial' : 'Edit Testimonial'}>
        <div className="space-y-4">
          <ImageUpload label="Client Photo" folder="testimonials" value={form.photo_url} onChange={(v) => setForm({ ...form, photo_url: v })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Client Name</label>
              <input className="input-field" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Role / Company</label>
              <input className="input-field" value={form.role ?? ''} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Rating</label>
              <select className="input-field" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Sort Order</label>
              <input type="number" className="input-field" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Quote</label>
            <textarea className="input-field min-h-[100px]" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={close} className="btn-ghost border border-ink-200 dark:border-ink-700">Cancel</button>
            <button onClick={save} disabled={busy} className="btn-gold disabled:opacity-60">{busy ? <Loader2 size={16} className="animate-spin" /> : null} Save</button>
          </div>
        </div>
      </Modal>

      <ConfirmDelete open={!!toDelete} onClose={() => setToDelete(null)} onConfirm={() => toDelete && remove(toDelete)} label={toDelete?.client_name ?? ''} />
    </div>
  );
}
