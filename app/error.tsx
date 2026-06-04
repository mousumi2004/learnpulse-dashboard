"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-dvh place-items-center bg-black px-4 text-zinc-100">
      <section className="max-w-md rounded-lg border border-red-300/20 bg-red-300/[0.06] p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-red-100/70">Runtime error</p>
        <h1 className="mt-3 text-2xl font-semibold text-white">The dashboard could not render.</h1>
        <p className="mt-3 text-sm leading-6 text-red-50/80">{error.message}</p>
        <button
          className="mt-6 h-10 rounded-md border border-red-100/25 px-4 text-sm font-medium text-red-50"
          onClick={reset}
          type="button"
        >
          Retry
        </button>
      </section>
    </main>
  );
}
