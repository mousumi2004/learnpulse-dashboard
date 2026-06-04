"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Timer } from "lucide-react";

import type { Course } from "@/lib/course-model";
import { getFocusCourse } from "@/lib/course-model";
import { Surface } from "@/components/ui/surface";

export function FocusPage({ courses }: { courses: Course[] }) {
  const focus = getFocusCourse(courses);
  const actions = focus
    ? [
        `Review the next unit in ${focus.title}.`,
        "Update progress after the study block.",
        "Move the course out of the At risk band."
      ]
    : ["Create the first course row.", "Set an initial progress value.", "Return here for a generated focus plan."];

  return (
    <section className="space-y-6 pt-2">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-100">Focus planner</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Next study block</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
          The plan is generated from the lowest-progress course, so it changes when course progress changes.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Surface as="section" className="p-6">
          <div className="relative z-10">
            <Timer aria-hidden="true" className="size-7 text-cyan-100" strokeWidth={1.7} />
            <h2 className="mt-6 text-3xl font-semibold text-white">{focus?.title ?? "No focus course yet"}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400">
              {focus ? `${focus.progress}% complete. This is currently the most important course to move forward.` : "Courses will appear here once available."}
            </p>
            <ol className="mt-8 grid gap-3">
              {actions.map((action) => (
                <li key={action} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm text-zinc-300">
                  <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-cyan-100" strokeWidth={1.8} />
                  {action}
                </li>
              ))}
            </ol>
          </div>
        </Surface>

        <Surface as="aside" className="p-5">
          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Shortcut</p>
              <h2 className="mt-3 text-xl font-semibold text-white">Update progress</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Course progress updates on the Courses page and then flows into every dashboard panel.
              </p>
            </div>
            <Link
              className="inline-flex h-10 items-center justify-between rounded-md border border-cyan-200/25 bg-cyan-200/[0.08] px-3 text-sm font-medium text-cyan-50"
              href="/courses"
            >
              Open courses
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Surface>
      </div>
    </section>
  );
}
