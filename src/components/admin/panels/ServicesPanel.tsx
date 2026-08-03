import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useFetch } from '@/hooks/useFetch';
import type { Service } from '@/lib/supabase';
import { Modal, ConfirmDelete, PanelHeader, EmptyState } from '@/components/admin/ui';
import { Plus, Pencil, Trash2, Loader2, GripVertical } from 'lucide-react';

const ICON_OPTIONS = [
  'Building2', 'Ruler', 'FileCheck2', 'HardHat', 'Calculator', 'LayoutGrid',
  'Box', 'Sofa', 'Layers', 'Wrench', 'Lightbulb', 'ClipboardList',
];

const empty: Omit<Service, 'id' | 'created_at' | 'updated_at'> = {
  title: '', description: '', icon_name: 'Building2', sort_order: 0, active: true,
};

export function ServicesPanel() {
  const { data, loading, reload } = useFetch<Service>({
    table: 'services',
    orderCol: 'sort_order',
    orderAsc: true,
  });
  const [editing, setEditing] = useState<Service | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<typeof empty>(empty);
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState<Service | null>(null);

  const openNew = () => { setForm(empty); setIsNew(true); setEditing({} as Service); };
  const openEdit = (s: Service) => { setForm({ ...s }); setIsNew(false); setEditing(s); };
  const close = () => setEditing(null);

  const save = async () => {
    setBusy(true);
    if (isNew) await supabase.from('services').insert(form);
    else if (editing?.id) await supabase.from('services').update({ ...form, updated_at: new Date().toISOString() }).eq('id', editing.id);
    setBusy(false);
    close();
    reload();
  };

  const remove = async (s: Service) => {
    await supabase.from('services').delete().eq('id', s.id);
    reload();
  };

  const toggleActive = async (s: Service) => {
    await supabase.from('services').update({ active: !s.active }).eq('id', s.id);
    reload();
  };

  return (
    <div>
      <PanelHeader
        title="Services"
        desc="Manage the services displayed on your website."
        action={<button onClick={openNew} className="btn-gold"><Plus size={16} /> Add Service</button>}
      />

      {loading ? (
        <div className="grid place-items-center py-20"><Loader2 className="animate-spin text-gold-500" /></div>
      ) : data.length === 0 ? (
        <EmptyState message="No services yet. Click 'Add Service' to create one." />
      ) : (
        <div className="space-y-3">
          {data.map((s) => (
            <div key={s.id} className="flex items-center gap-4 rounded-2xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 p-4">
              <GripVertical size={16} className="text-ink-300" />
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-500">
                <span className="text-xs font-bold">{s.sort_order}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-ink-900 dark:text-ink-50">{s.title}</h3>
                  {!s.active && <span className="rounded-full bg-ink-200 dark:bg-ink-700 px-2 py-0.5 text-[10px] font-semibold uppercase text-ink-500">Hidden</span>}
                </div>
                <p className="text-sm text-ink-400 line-clamp-1">{s.description}</p>
              </div>
              <button
                onClick={() => toggleActive(s)}
                className={`relative h-6 w-11 rounded-full transition ${s.active ? 'bg-gold-500' : 'bg-ink-300 dark:bg-ink-700'}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${s.active ? 'left-5' : 'left-0.5'}`} />
              </button>
              <button onClick={() => openEdit(s)} className="grid h-9 w-9 place-items-center rounded-full text-ink-500 transition hover:bg-ink-100 dark:hover:bg-ink-800"><Pencil size={15} /></button>
              <button onClick={() => setToDelete(s)} className="grid h-9 w-9 place-items-center rounded-full text-red-500 transition hover:bg-red-500/10"><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!editing} onClose={close} title={isNew ? 'Add Service' : 'Edit Service'}>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Title</label>
            <input className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Description</label>
            <textarea className="input-field min-h-[90px]" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Icon</label>
              <select className="input-field" value={form.icon_name} onChange={(e) => setForm({ ...form, icon_name: e.target.value })}>
                {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Sort Order</label>
              <input type="number" className="input-field" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={close} className="btn-ghost border border-ink-200 dark:border-ink-700">Cancel</button>
            <button onClick={save} disabled={busy} className="btn-gold disabled:opacity-60">{busy ? <Loader2 size={16} className="animate-spin" /> : null} Save</button>
          </div>
        </div>
      </Modal>

      <ConfirmDelete open={!!toDelete} onClose={() => setToDelete(null)} onConfirm={() => toDelete && remove(toDelete)} label={toDelete?.title ?? ''} />
    </div>
  );
}
