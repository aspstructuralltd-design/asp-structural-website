import { useRef, useState } from 'react';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';
import { uploadImage, deleteImage, pathFromUrl } from '@/lib/storage';

export function ImageUpload({
  value,
  onChange,
  folder,
  label = 'Image',
}: {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: string;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handle = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setErr(null);
    if (value) {
      const old = pathFromUrl(value);
      if (old) await deleteImage(old).catch(() => {});
    }
    const res = await uploadImage(file, folder);
    setBusy(false);
    if ('error' in res) setErr(res.error);
    else onChange(res.url);
  };

  const remove = async () => {
    if (value) {
      const p = pathFromUrl(value);
      if (p) await deleteImage(p).catch(() => {});
    }
    onChange(null);
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-700">{label}</label>
      <div className="flex items-start gap-4">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-ink-200 bg-ink-100">
          {value ? (
            <>
              <img src={value} alt="preview" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={remove}
                className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-ink-900/70 text-white transition hover:bg-red-500"
              >
                <X size={12} />
              </button>
            </>
          ) : (
            <div className="grid h-full w-full place-items-center text-ink-300">
              <ImageIcon size={24} />
            </div>
          )}
        </div>
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handle(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="btn-ghost border border-ink-200 disabled:opacity-60"
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {value ? 'Replace Image' : 'Upload Image'}
          </button>
          {err && <p className="mt-2 text-xs text-red-500">{err}</p>}
          {value && (
            <input
              type="url"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="or paste image URL"
              className="input-field mt-2 !py-2 text-xs"
            />
          )}
        </div>
      </div>
    </div>
  );
}
