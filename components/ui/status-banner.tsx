import { AlertTriangle, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/cn";

type StatusBannerProps = {
  tone: "success" | "warning" | "error";
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function StatusBanner({ tone, title, children, className }: StatusBannerProps) {
  const Icon = tone === "success" ? CheckCircle2 : AlertTriangle;

  return (
    <aside
      className={cn(
        "flex gap-3 rounded-md border p-3 text-sm",
        tone === "success" && "border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-50",
        tone === "warning" && "border-amber-300/20 bg-amber-300/[0.06] text-amber-50",
        tone === "error" && "border-red-300/20 bg-red-300/[0.06] text-red-50",
        className
      )}
    >
      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={1.8} />
      <div>
        <p className="font-medium">{title}</p>
        <div className="mt-1 text-xs leading-5 opacity-80">{children}</div>
      </div>
    </aside>
  );
}
