"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, useAnimate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Database, Gauge, Layers3, Sparkles } from "lucide-react";

import type { Course } from "@/lib/course-model";
import { getCourseSummary } from "@/lib/course-model";
import { getCourseIcon } from "@/lib/icon-registry";
import { Surface } from "@/components/ui/surface";

type HomePageProps = {
  courses: Course[];
  error: string | null;
};

const bento = [
  {
    title: "Live course intelligence",
    text: "Course progress drives the dashboard, analytics, planning, and editable workspace.",
    icon: Database
  },
  {
    title: "Bento operating surface",
    text: "Priority, activity, and progress panels stay dense, legible, and responsive.",
    icon: Layers3
  },
  {
    title: "Motion with purpose",
    text: "Staggered reveals, shared layout highlights, spring hover states, and reduced-motion guards.",
    icon: Sparkles
  },
  {
    title: "Data health",
    text: "A focused status view keeps freshness, row count, and field usage easy to inspect.",
    icon: Gauge
  }
];

export function HomePage({ courses, error }: HomePageProps) {
  const [scope, animate] = useAnimate();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.12, 1]);
  const summary = getCourseSummary(courses);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    animate(
      [
        [".intro-kicker", { opacity: [0, 1], y: [12, 0] }, { duration: 0.35, ease: [0.22, 1, 0.36, 1] }],
        [".intro-title", { opacity: [0, 1], y: [24, 0] }, { duration: 0.5, at: "-0.12", ease: [0.22, 1, 0.36, 1] }],
        [".intro-copy", { opacity: [0, 1], y: [16, 0] }, { duration: 0.42, at: "-0.18", ease: [0.22, 1, 0.36, 1] }],
        [".intro-actions", { opacity: [0, 1], y: [10, 0] }, { duration: 0.35, at: "-0.12", ease: [0.22, 1, 0.36, 1] }],
        [".preview-card", { opacity: [0, 1], y: [20, 0] }, { duration: 0.42, at: "-0.08", delay: 0.05, ease: [0.22, 1, 0.36, 1] }]
      ]
    );
  }, [animate, reduceMotion]);

  return (
    <main ref={scope} className="relative min-h-dvh overflow-hidden bg-black text-zinc-100">
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-50 h-0.5 origin-left bg-cyan-200"
        style={{ scaleX: progressScale, width: "100%" }}
      />
      <section className="relative mx-auto grid w-full max-w-7xl content-start gap-10 px-4 py-10 sm:px-6 lg:min-h-[92dvh] lg:grid-cols-[1.05fr_0.95fr] lg:content-center lg:gap-12 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_15%,rgba(99,243,255,0.14),transparent_28%),radial-gradient(circle_at_18%_82%,rgba(255,191,95,0.08),transparent_24%)]" />
        <div className="space-y-8">
          <p className="intro-kicker opacity-0 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100">
            Frontend Intern Challenge
          </p>
          <div className="space-y-5">
            <h1 className="intro-title opacity-0 max-w-4xl font-display text-5xl font-semibold leading-[0.96] tracking-normal text-white sm:text-7xl lg:text-8xl">
              Nexus OS
            </h1>
            <p className="intro-copy opacity-0 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
              A futuristic student dashboard that turns live course data into a premium,
              motion-rich learning command center.
            </p>
          </div>
          <div className="intro-actions flex flex-wrap gap-3 opacity-0">
            <Link
              className="inline-flex h-11 items-center gap-2 rounded-md border border-cyan-200/35 bg-cyan-200/[0.12] px-4 text-sm font-medium text-cyan-50 transition-colors hover:bg-cyan-200/[0.18]"
              href="/dashboard"
            >
              Enter dashboard
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              className="inline-flex h-11 items-center rounded-md border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/[0.08]"
              href="/source"
            >
              View data health
            </Link>
          </div>
        </div>

        <Surface className="preview-card opacity-0 min-h-[540px] p-5">
          <div className="relative z-10 flex h-full flex-col gap-5">
            <header className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Live preview</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Server-rendered course feed</h2>
              </div>
              <div className="rounded-md border border-cyan-200/20 bg-cyan-200/[0.08] px-3 py-2 text-right">
                <p className="text-2xl font-semibold text-cyan-50">{summary.averageProgress}%</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-100/70">average</p>
              </div>
            </header>
            {error ? (
              <div className="rounded-md border border-red-300/20 bg-red-300/[0.07] p-4 text-sm text-red-100">
                {error}
              </div>
            ) : null}
            <div className="grid gap-3">
              {courses.slice(0, 4).map((course, index) => {
                const Icon = getCourseIcon(course.iconName);

                return (
                  <motion.article
                    key={course.id}
                    className="rounded-md border border-white/10 bg-black/35 p-4"
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.08, type: "spring", stiffness: 260, damping: 26 }}
                    whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-cyan-100">
                        <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-medium text-zinc-100">{course.title}</h3>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="h-full rounded-full bg-cyan-200"
                            initial={reduceMotion ? false : { width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ delay: 0.6 + index * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                      <span className="text-sm tabular-nums text-zinc-300">{course.progress}%</span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
            <div className="mt-auto grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-sm">
              <div>
                <p className="text-xl font-semibold text-white">{summary.activeCount}</p>
                <p className="text-xs text-zinc-500">Courses</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-white">{summary.lowestProgress}%</p>
                <p className="text-xs text-zinc-500">Priority</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-white">{summary.strongestProgress}%</p>
                <p className="text-xs text-zinc-500">Best</p>
              </div>
            </div>
          </div>
        </Surface>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-3 px-4 pb-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        {bento.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.article
              key={item.title}
              className="rounded-lg border border-white/10 bg-white/[0.035] p-5"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08, type: "spring", stiffness: 260, damping: 26 }}
              whileHover={reduceMotion ? undefined : { y: -5, scale: 1.01 }}
            >
              <Icon aria-hidden="true" className="size-5 text-cyan-100" strokeWidth={1.7} />
              <h2 className="mt-5 text-base font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{item.text}</p>
            </motion.article>
          );
        })}
      </section>
    </main>
  );
}
