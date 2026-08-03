import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useFetch } from '@/hooks/useFetch';
import type { Project } from '@/lib/supabase';
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from '@/lib/supabase';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Modal, ConfirmDelete, PanelHeader, EmptyState } from '@/components/admin/ui';
import { Plus, Pencil, Trash2, Loader2, MapPin } from 'lucide-react';

const empty: Omit<Project, 'id' | 'created_at' | 'updated_at'> = {
  title: '', category: PROJECT_CATEGORIES[0], location: '', status: 'Completed',
  description: '', image_url: null, sort_order: 0,
};

export function ProjectsPanel() {
  const { data, loading, reload } = useFetch<Project>({
    table: 'projects',
    orderCol: 'sort_order',
    orderAsc: true,
  });
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<typeof empty>(empty);
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState<Project | null>(null);

  const openNew = () => { setForm(empty); setIsNew(true); setEditing({} as Project); };
  const openEdit = (p: Project) => { setForm({ ...p }); setIsNew(false); setEditing(p); };
  const close = () => setEditing(null);

  const save = async () => {
    setBusy(true);
    if (isNew) await supabase.from('projects').insert(form);
    else if (editing?.id) await supabase.from('projects').update({ ...form, updated_at: new Date().toISOString() }).eq('id', editing.id);
    setBusy(false);
    close();
    reload();
  };

  const remove = async (p: Project) => {
    await supabase.from('projects').delete().eq('id', p.id);
    reload();
  };

  return (
    <div>
      <PanelHeader
        title="Projects"
        desc="Manage your project portfolio gallery."
        action={<button onClick={openNew} className="btn-gold"><Plus size={16} /> Add Project</button>}
      />

      {loading ? (
        <div className="grid place-items-center py-20"><Loader2 className="animate-spin text-gold-500" /></div>
      ) : data.length === 0 ? (
        <EmptyState message="No projects yet. Click 'Add Project' to create one." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-2xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-100 dark:bg-ink-800">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-ink-400">No image</div>
                )}
                <span className="absolute right-2 top-2 rounded-full bg-ink-950/70 px-2.5 py-1 text-[10px] font-bold uppercase text-gold-400">
                  {p.status}
                </span>
              </div>
              <div className="p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-500">{p.category}</span>
                <h3 className="font-semibold text-ink-900 dark:text-ink-50">{p.title}</h3>
                {p.location && <p className="mt-1 flex items-center gap-1 text-xs text-ink-400"><MapPin size={11} /> {p.location}</p>}
                <div className="mt-4 flex gap-2">
                  <button onClick={() => openEdit(p)} className="btn-ghost flex-1 border border-ink-200 dark:border-ink-700"><Pencil size={14} /> Edit</button>
                  <button onClick={() => setToDelete(p)} className="grid h-9 w-9 place-items-center rounded-full text-red-500 transition hover:bg-red-500/10"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!editing} onClose={close} title={isNew ? 'Add Project' : 'Edit Project'} size="lg">
        <div className="space-y-4">
          <ImageUpload label="Project Image" folder="projects" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Title</label>
              <input className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Location</label>
              <input className="input-field" value={form.location ?? ''} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Category</label>
              <select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {PROJECT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Status</label>
              <select className="input-field" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                {PROJECT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Sort Order</label>
              <input type="number" className="input-field" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Description</label>
            <textarea className="input-field min-h-[100px]" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
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
