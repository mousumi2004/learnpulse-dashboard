export default function Loading() {
  return (
    <main className="min-h-dvh bg-black p-6 text-zinc-100">
      <section className="mx-auto grid max-w-7xl gap-3 lg:grid-cols-12">
        <div className="h-56 animate-pulse rounded-lg border border-white/10 bg-white/[0.04] lg:col-span-6" />
        <div className="h-56 animate-pulse rounded-lg border border-white/10 bg-white/[0.04] lg:col-span-3" />
        <div className="h-56 animate-pulse rounded-lg border border-white/10 bg-white/[0.04] lg:col-span-3" />
        <div className="h-72 animate-pulse rounded-lg border border-white/10 bg-white/[0.04] lg:col-span-12" />
      </section>
    </main>
  );
}
