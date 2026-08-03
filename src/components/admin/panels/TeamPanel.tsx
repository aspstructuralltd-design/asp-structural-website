import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useFetch } from '@/hooks/useFetch';
import type { TeamMember } from '@/lib/supabase';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Modal, ConfirmDelete, PanelHeader, EmptyState } from '@/components/admin/ui';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';

const empty: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'> = {
  name: '', position: '', email: '', bio: '', photo_url: null,
  linkedin_url: '', facebook_url: '', sort_order: 0,
};

export function TeamPanel() {
  const { data, loading, reload } = useFetch<TeamMember>({
    table: 'team_members',
    orderCol: 'sort_order',
    orderAsc: true,
  });
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<typeof empty>(empty);
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState<TeamMember | null>(null);

  const openNew = () => {
    setForm(empty);
    setIsNew(true);
    setEditing({} as TeamMember);
  };
  const openEdit = (m: TeamMember) => {
    setForm({ ...m });
    setIsNew(false);
    setEditing(m);
  };
  const close = () => setEditing(null);

  const save = async () => {
    setBusy(true);
    if (isNew) {
      await supabase.from('team_members').insert(form);
    } else if (editing?.id) {
      await supabase.from('team_members').update({ ...form, updated_at: new Date().toISOString() }).eq('id', editing.id);
    }
    setBusy(false);
    close();
    reload();
  };

  const remove = async (m: TeamMember) => {
    await supabase.from('team_members').delete().eq('id', m.id);
    reload();
  };

  const F = ({ label, k, area = false }: { label: string; k: keyof typeof form; area?: boolean }) => (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">{label}</label>
      {area ? (
        <textarea className="input-field min-h-[90px]" value={form[k] as string} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
      ) : (
        <input className="input-field" value={form[k] as string} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
      )}
    </div>
  );

  return (
    <div>
      <PanelHeader
        title="Team Members"
        desc="Add, edit, and remove team member cards shown on the website."
        action={
          <button onClick={openNew} className="btn-gold">
            <Plus size={16} /> Add Member
          </button>
        }
      />

      {loading ? (
        <div className="grid place-items-center py-20"><Loader2 className="animate-spin text-gold-500" /></div>
      ) : data.length === 0 ? (
        <EmptyState message="No team members yet. Click 'Add Member' to create one." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((m) => (
            <div key={m.id} className="overflow-hidden rounded-2xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-100 dark:bg-ink-800">
                {m.photo_url ? (
                  <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-ink-400">No photo</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-ink-900 dark:text-ink-50">{m.name}</h3>
                <p className="text-sm text-gold-500">{m.position}</p>
                {m.email && <p className="mt-1 text-xs text-ink-400">{m.email}</p>}
                <div className="mt-4 flex gap-2">
                  <button onClick={() => openEdit(m)} className="btn-ghost flex-1 border border-ink-200 dark:border-ink-700">
                    <Pencil size={14} /> Edit
                  </button>
                  <button onClick={() => setToDelete(m)} className="grid h-9 w-9 place-items-center rounded-full text-red-500 transition hover:bg-red-500/10">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!editing} onClose={close} title={isNew ? 'Add Team Member' : 'Edit Team Member'} size="lg">
        <div className="space-y-4">
          <ImageUpload label="Photo" folder="team" value={form.photo_url} onChange={(v) => setForm({ ...form, photo_url: v })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <F label="Name" k="name" />
            <F label="Position" k="position" />
            <F label="Email" k="email" />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Sort Order</label>
              <input type="number" className="input-field" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
            </div>
            <F label="LinkedIn URL" k="linkedin_url" />
            <F label="Facebook URL" k="facebook_url" />
          </div>
          <F label="Short Biography" k="bio" area />
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={close} className="btn-ghost border border-ink-200 dark:border-ink-700">Cancel</button>
            <button onClick={save} disabled={busy} className="btn-gold disabled:opacity-60">
              {busy ? <Loader2 size={16} className="animate-spin" /> : null} Save
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDelete
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => toDelete && remove(toDelete)}
        label={toDelete?.name ?? ''}
      />
    </div>
  );
}
