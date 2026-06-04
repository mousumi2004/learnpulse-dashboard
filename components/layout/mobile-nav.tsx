"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BookOpen, Database, Gauge, Timer } from "lucide-react";

import { cn } from "@/lib/cn";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/focus", label: "Focus", icon: Timer },
  { href: "/source", label: "Data", icon: Database }
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile primary"
      className="fixed inset-x-3 bottom-3 z-50 rounded-lg border border-white/10 bg-black/85 px-2 py-2 shadow-2xl backdrop-blur-xl lg:hidden"
    >
      <ul className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                aria-label={item.label}
                className={cn(
                  "flex h-10 items-center justify-center rounded-md border border-transparent text-zinc-500 transition-colors",
                  active && "border-cyan-200/20 bg-cyan-200/[0.08] text-cyan-100"
                )}
                href={item.href}
              >
                <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
