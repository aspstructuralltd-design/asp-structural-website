import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'md' | 'lg';
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink-900/40 p-4 backdrop-blur-sm animate-fade-in">
      <div
        className={`relative my-8 w-full ${size === 'lg' ? 'max-w-3xl' : 'max-w-xl'} rounded-3xl border border-ink-200 bg-white shadow-luxe animate-scale-in`}
      >
        <div className="flex items-center justify-between border-b border-ink-200 px-6 py-4">
          <h3 className="font-display text-lg font-semibold text-ink-800">{title}</h3>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full text-ink-400 transition hover:bg-ink-100 hover:text-ink-800"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmDelete({
  open,
  onClose,
  onConfirm,
  label,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  label: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[110] grid place-items-center bg-ink-900/40 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl border border-ink-200 bg-white p-6 text-center shadow-luxe animate-scale-in">
        <p className="text-ink-700">Delete <strong>{label}</strong>? This cannot be undone.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={onClose} className="btn-ghost border border-ink-200">
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-full bg-red-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function PanelHeader({ title, desc, action }: { title: string; desc: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="heading-md text-ink-800">{title}</h2>
        <p className="mt-1 text-sm text-ink-500">{desc}</p>
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="grid place-items-center rounded-3xl border border-dashed border-ink-200 py-16 text-center">
      <p className="text-ink-400">{message}</p>
    </div>
  );
}
