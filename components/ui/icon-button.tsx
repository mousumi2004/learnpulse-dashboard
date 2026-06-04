"use client";

import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  ariaLabel: string;
  icon: LucideIcon;
  tooltip?: string;
  intent?: "neutral" | "primary" | "danger";
};

const intentClass = {
  neutral: "border-white/10 bg-white/[0.035] text-zinc-200 hover:border-white/25 hover:bg-white/[0.07]",
  primary: "border-cyan-300/25 bg-cyan-300/[0.08] text-cyan-100 hover:border-cyan-200/45 hover:bg-cyan-300/[0.14]",
  danger: "border-red-300/20 bg-red-400/[0.06] text-red-100 hover:border-red-200/40 hover:bg-red-400/[0.13]"
};

export function IconButton({
  ariaLabel,
  icon: Icon,
  tooltip,
  intent = "neutral",
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={cn(
        "group relative inline-flex size-9 shrink-0 items-center justify-center rounded-md border transition-colors duration-200",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200",
        intentClass[intent],
        className
      )}
      title={tooltip}
      type={type}
      {...props}
    >
      <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
      {tooltip ? (
        <span className="pointer-events-none absolute -top-9 left-1/2 z-30 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-zinc-950 px-2 py-1 text-[11px] font-medium text-zinc-200 shadow-xl group-hover:block">
          {tooltip}
        </span>
      ) : null}
    </button>
  );
}
