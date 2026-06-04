import Link from "next/link";

export function Wordmark() {
  return (
    <Link
      className="font-display text-[15px] font-semibold uppercase tracking-[0.32em] text-zinc-100 transition-colors hover:text-cyan-100"
      href="/"
    >
      Nexus OS
    </Link>
  );
}
