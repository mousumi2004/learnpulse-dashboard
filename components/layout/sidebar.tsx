"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Activity, BookOpen, ChevronLeft, Database, Gauge, Timer } from "lucide-react";

import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/icon-button";
import { Wordmark } from "./wordmark";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/focus", label: "Focus", icon: Timer },
  { href: "/source", label: "Data", icon: Database }
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const activeIndex = Math.max(
    navItems.findIndex((item) => pathname === item.href),
    0
  );

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-dvh shrink-0 border-r border-white/10 bg-black/55 backdrop-blur-xl transition-[width] duration-300 lg:block",
        collapsed ? "w-[84px]" : "w-[252px]"
      )}
    >
      <div className="flex h-full flex-col gap-8 px-4 py-5">
        <header className="flex h-10 items-center justify-between gap-3">
          <div className={cn("overflow-hidden transition-opacity", collapsed && "pointer-events-none opacity-0")}>
            <Wordmark />
          </div>
          <IconButton
            ariaLabel={collapsed ? "Expand navigation" : "Collapse navigation"}
            className={cn("ml-auto", collapsed && "rotate-180")}
            icon={ChevronLeft}
            onClick={() => setCollapsed((value) => !value)}
            tooltip={collapsed ? "Expand" : "Collapse"}
          />
        </header>

        <nav aria-label="Primary" className="relative min-w-0">
          <motion.span
            aria-hidden="true"
            className="absolute left-0 right-0 top-0 h-11 rounded-md border border-cyan-200/20 bg-cyan-200/[0.08]"
            animate={{ y: activeIndex * 50 }}
            transition={{ type: "spring", stiffness: 190, damping: 24, mass: 0.72 }}
          />
          <ul className="relative grid gap-1.5">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex h-11 items-center gap-3 rounded-md px-3 text-sm text-zinc-400 transition-colors",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200",
                      active ? "text-zinc-50" : "hover:text-zinc-100"
                    )}
                    href={item.href}
                  >
                    <Icon aria-hidden="true" className="relative size-4 shrink-0" strokeWidth={1.8} />
                    <span className={cn("relative truncate", collapsed && "sr-only")}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <footer className={cn("mt-auto rounded-md border border-white/10 bg-white/[0.03] p-3", collapsed && "hidden")}>
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Learning engine</p>
          <p className="mt-2 text-sm text-zinc-200">Progress signals stay synced across planning, activity, and course work.</p>
        </footer>
      </div>
    </aside>
  );
}
