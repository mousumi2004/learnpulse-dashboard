"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { Course } from "@/lib/course-model";
import { buildActivityBands, buildProgressBars } from "@/lib/course-analytics";
import { Surface } from "@/components/ui/surface";

export function ActivityPage({ courses }: { courses: Course[] }) {
  const reduceMotion = useReducedMotion();
  const bands = buildActivityBands(courses);
  const bars = buildProgressBars(courses);

  return (
    <section className="space-y-6 pt-2">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-100">Activity intelligence</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Learning activity</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
          Activity is calculated from live progress values, grouped into clear progress bands.
        </p>
      </header>

      <motion.div
        className="grid gap-3 lg:grid-cols-3"
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {bands.map((band) => (
          <motion.article
            key={band.label}
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <Surface className="h-full p-5">
              <div className="relative z-10">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-xl font-semibold text-white">{band.label}</h2>
                  <span className="text-xs uppercase tracking-[0.16em] text-zinc-500">{band.range}</span>
                </div>
                <p className="mt-6 text-5xl font-semibold text-white">{band.count}</p>
                <div className="mt-5 grid gap-2">
                  {band.courses.length ? (
                    band.courses.map((course) => (
                      <span key={course} className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-zinc-300">
                        {course}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-md border border-white/10 bg-white/[0.025] px-3 py-2 text-sm text-zinc-500">
                      No courses in this band
                    </span>
                  )}
                </div>
              </div>
            </Surface>
          </motion.article>
        ))}
      </motion.div>

      <Surface as="section" className="p-5">
        <div className="relative z-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Progress distribution</h2>
              <p className="mt-2 text-sm text-zinc-400">Sorted from strongest to weakest course.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            {bars.map((bar, index) => (
              <div key={bar.id} className="grid gap-2">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium text-zinc-200">{bar.title}</span>
                  <span className="tabular-nums text-zinc-400">{bar.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-cyan-200"
                    initial={reduceMotion ? false : { width: 0 }}
                    animate={{ width: `${bar.progress}%` }}
                    transition={{ delay: index * 0.06, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Surface>
    </section>
  );
}
