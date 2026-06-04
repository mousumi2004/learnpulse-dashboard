"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowUpRight, BookOpen, Database, Gauge, Timer, type LucideIcon } from "lucide-react";

import type { Course } from "@/lib/course-model";
import { formatDate, getCourseSummary, getFocusCourse } from "@/lib/course-model";
import { getCourseIcon } from "@/lib/icon-registry";
import { Surface } from "@/components/ui/surface";
import { StatusBanner } from "@/components/ui/status-banner";

type DashboardPageProps = {
  courses: Course[];
  error: string | null;
};

const panelLinks = [
  { href: "/courses", title: "Manage courses", icon: BookOpen, text: "Create, edit, and remove live course records." },
  { href: "/activity", title: "Activity bands", icon: Activity, text: "See at-risk, building, and strong progress." },
  { href: "/focus", title: "Focus plan", icon: Timer, text: "Turn the weakest course into next actions." },
  { href: "/source", title: "Data health", icon: Database, text: "Check freshness, row count, and field usage." }
];

type StatCard = {
  label: string;
  value: string | number;
  icon: LucideIcon;
};

export function DashboardPage({ courses, error }: DashboardPageProps) {
  const reduceMotion = useReducedMotion();
  const summary = getCourseSummary(courses);
  const focus = getFocusCourse(courses);
  const statCards: StatCard[] = [
    { label: "Active courses", value: summary.activeCount, icon: BookOpen },
    { label: "Average progress", value: `${summary.averageProgress}%`, icon: Activity },
    { label: "Lowest progress", value: `${summary.lowestProgress}%`, icon: Timer },
    { label: "Latest row", value: formatDate(summary.latestCreatedAt), icon: Database }
  ];

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-100">Student dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-white sm:text-5xl">Welcome back, Mousumi</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            Live course progress, planning, and activity signals arranged as a motion-rich bento workspace.
          </p>
        </div>
        <div className="rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 text-right">
          <p className="text-2xl font-semibold text-white">12</p>
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">day streak</p>
        </div>
      </header>

      {error ? (
        <StatusBanner title="Live data issue" tone="error">
          {error}
        </StatusBanner>
      ) : null}

      <motion.div
        className="grid gap-3 lg:grid-cols-12"
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.075 } }
        }}
      >
        <motion.article
          className="lg:col-span-6"
          variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        >
          <Surface className="h-full p-5">
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Priority tile</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">{focus?.title ?? "No courses yet"}</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
                  Lowest-progress course becomes the focus target so the dashboard has an actionable signal.
                </p>
              </div>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="text-6xl font-semibold text-white">{focus?.progress ?? 0}%</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500">current progress</p>
                </div>
                <Gauge aria-hidden="true" className="size-12 text-cyan-100" strokeWidth={1.4} />
              </div>
            </div>
          </Surface>
        </motion.article>

        {statCards.map(({ label, value, icon: Icon }, index) => (
          <motion.article
            key={String(label)}
            className="lg:col-span-3"
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            transition={{ type: "spring", stiffness: 260, damping: 26, delay: index * 0.02 }}
          >
            <Surface className="h-full p-5">
              <div className="relative z-10 flex h-full min-h-36 flex-col justify-between">
                <Icon aria-hidden="true" className="size-5 text-cyan-100" strokeWidth={1.7} />
                <div>
                  <p className="text-3xl font-semibold text-white">{value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500">{label}</p>
                </div>
              </div>
            </Surface>
          </motion.article>
        ))}

        <motion.section
          className="grid gap-3 lg:col-span-12 lg:grid-cols-4"
          variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        >
          {panelLinks.map((panel) => {
            const Icon = panel.icon;

            return (
              <Link
                key={panel.href}
                className="group rounded-lg border border-white/10 bg-white/[0.035] p-5 transition-colors hover:border-cyan-200/25 hover:bg-white/[0.055]"
                href={panel.href}
              >
                <div className="flex items-center justify-between gap-4">
                  <Icon aria-hidden="true" className="size-5 text-zinc-300" strokeWidth={1.7} />
                  <ArrowUpRight aria-hidden="true" className="size-4 text-zinc-500 transition-colors group-hover:text-cyan-100" />
                </div>
                <h2 className="mt-5 text-base font-semibold text-white">{panel.title}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{panel.text}</p>
              </Link>
            );
          })}
        </motion.section>

        <motion.section
          className="grid gap-3 lg:col-span-12 lg:grid-cols-2"
          variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        >
          {courses.slice(0, 4).map((course) => {
            const Icon = getCourseIcon(course.iconName);

            return (
              <Surface key={course.id} className="p-5">
                <div className="relative z-10 flex items-center gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-cyan-100">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-medium text-white">{course.title}</h2>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-cyan-200"
                        initial={reduceMotion ? false : { width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                  <span className="text-sm tabular-nums text-zinc-300">{course.progress}%</span>
                </div>
              </Surface>
            );
          })}
        </motion.section>
      </motion.div>
    </section>
  );
}
