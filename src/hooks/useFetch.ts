import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

type FetchOptions = {
  table: string;
  orderCol?: string;
  orderAsc?: boolean;
  filterCol?: string;
  filterVal?: unknown;
  select?: string;
};

export function useFetch<T>(opts: FetchOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Use a ref so load() always sees current opts without becoming a dep itself
  const optsRef = useRef(opts);
  optsRef.current = opts;

  const load = useCallback(async () => {
    const o = optsRef.current;
    setLoading(true);
    let q = supabase.from(o.table).select(o.select ?? '*');
    if (o.filterCol !== undefined) q = q.eq(o.filterCol, o.filterVal);
    if (o.orderCol) q = q.order(o.orderCol, { ascending: o.orderAsc ?? true });
    const { data: rows, error: err } = await q;
    if (err) setError(err.message);
    else setData((rows as T[]) ?? []);
    setLoading(false);
  }, []); // stable: opts read from ref inside

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load, setData };
}
