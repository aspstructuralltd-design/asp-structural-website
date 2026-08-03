export function Loader() {
  return (
    <div
      id="app-loader"
      className="fixed inset-0 z-[200] grid place-items-center bg-ink-950 transition-opacity duration-700"
    >
      <div className="flex flex-col items-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-ink-700" />
          <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-transparent border-t-gold-500" />
          <div className="absolute inset-0 grid place-items-center font-display text-2xl font-bold text-gold-500">
            A
          </div>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-ink-400">ASP Structural</p>
      </div>
    </div>
  );
}
