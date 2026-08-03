import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useFetch } from '@/hooks/useFetch';
import type { ContactMessage } from '@/lib/supabase';
import { PanelHeader, EmptyState } from '@/components/admin/ui';
import { Loader2, Mail, MailOpen, Trash2, Phone } from 'lucide-react';

export function MessagesPanel() {
  const { data, loading, reload } = useFetch<ContactMessage>({
    table: 'contact_messages',
    orderCol: 'created_at',
    orderAsc: false,
  });
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const toggleRead = async (m: ContactMessage) => {
    await supabase.from('contact_messages').update({ read: !m.read }).eq('id', m.id);
    reload();
    if (selected?.id === m.id) setSelected({ ...m, read: !m.read });
  };

  const remove = async (m: ContactMessage) => {
    await supabase.from('contact_messages').delete().eq('id', m.id);
    if (selected?.id === m.id) setSelected(null);
    reload();
  };

  return (
    <div>
      <PanelHeader title="Messages" desc="Contact form submissions from your website." />

      {loading ? (
        <div className="grid place-items-center py-20"><Loader2 className="animate-spin text-gold-500" /></div>
      ) : data.length === 0 ? (
        <EmptyState message="No messages yet." />
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* List */}
          <div className="space-y-2 lg:col-span-1">
            {data.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setSelected(m);
                  if (!m.read) toggleRead(m);
                }}
                className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                  selected?.id === m.id
                    ? 'border-gold-500 bg-gold-500/5'
                    : 'border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 hover:border-gold-500/40'
                }`}
              >
                {m.read ? <MailOpen size={16} className="mt-0.5 text-ink-400" /> : <Mail size={16} className="mt-0.5 text-gold-500" />}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`truncate text-sm ${m.read ? 'font-medium text-ink-600 dark:text-ink-300' : 'font-semibold text-ink-900 dark:text-ink-50'}`}>{m.name}</span>
                    <span className="shrink-0 text-[10px] text-ink-400">{new Date(m.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="truncate text-xs text-ink-400">{m.message}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="rounded-2xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-50">{selected.name}</h3>
                    <div className="mt-1 flex flex-wrap gap-4 text-sm text-ink-500 dark:text-ink-400">
                      <a href={`mailto:${selected.email}`} className="hover:text-gold-500">{selected.email}</a>
                      {selected.phone && <span className="flex items-center gap-1"><Phone size={12} /> {selected.phone}</span>}
                    </div>
                  </div>
                  <span className="text-xs text-ink-400">{new Date(selected.created_at).toLocaleString()}</span>
                </div>
                <div className="mt-6 rounded-xl bg-ink-50 dark:bg-ink-950 p-5">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-700 dark:text-ink-200">{selected.message}</p>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={() => toggleRead(selected)} className="btn-ghost border border-ink-200 dark:border-ink-700">
                    {selected.read ? 'Mark Unread' : 'Mark Read'}
                  </button>
                  <button onClick={() => remove(selected)} className="rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600">
                    <Trash2 size={14} className="mr-1.5 inline" /> Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid h-full place-items-center rounded-2xl border border-dashed border-ink-200 dark:border-ink-700 py-20 text-ink-400">
                Select a message to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
