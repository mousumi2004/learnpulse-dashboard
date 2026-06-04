"use client";

import { useFormStatus } from "react-dom";
import { motion, LayoutGroup, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, RotateCcw, Save, Trash2, type LucideIcon } from "lucide-react";

import type { Course } from "@/lib/course-model";
import { getCourseIcon } from "@/lib/icon-registry";
import { Field } from "@/components/ui/field";
import { IconButton } from "@/components/ui/icon-button";
import { IconSelect } from "@/components/ui/icon-select";
import { StatusBanner } from "@/components/ui/status-banner";
import { Surface } from "@/components/ui/surface";

type ServerAction = (formData: FormData) => void | Promise<void>;

type CourseManagerProps = {
  courses: Course[];
  writeStatus: {
    canWrite: boolean;
    reason: string;
  };
  actions?: {
    create: ServerAction;
    update: ServerAction;
    delete: ServerAction;
  };
};

function SubmitIcon({
  label,
  icon,
  intent = "primary",
  tooltip,
  disabled
}: {
  label: string;
  icon: LucideIcon;
  intent?: "neutral" | "primary" | "danger";
  tooltip: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <IconButton
      ariaLabel={label}
      disabled={disabled || pending}
      icon={icon}
      intent={intent}
      tooltip={pending ? "Working" : tooltip}
      type="submit"
    />
  );
}

export function CourseManager({ courses, writeStatus, actions }: CourseManagerProps) {
  const reduceMotion = useReducedMotion();
  const disabled = !writeStatus.canWrite || !actions;

  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-100">Course control</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Courses</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            Maintain the live course catalog that powers the dashboard, activity bands, and focus plan.
          </p>
        </div>
      </header>

      <StatusBanner title={writeStatus.canWrite ? "Editing enabled" : "Editing unavailable"} tone={writeStatus.canWrite ? "success" : "warning"}>
        {writeStatus.reason}
      </StatusBanner>

      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Surface as="section" className="p-5">
          <div className="relative z-10">
            <h2 className="text-base font-semibold text-white">Create course</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Adds a new course to the shared workspace when editing is available.
            </p>
            <form action={actions?.create} className="mt-5 grid gap-4">
              <Field label="Title" name="title" placeholder="" required />
              <Field label="Progress" max={100} min={0} name="progress" required type="number" />
              <IconSelect />
              <div className="flex justify-end">
                <SubmitIcon disabled={disabled} icon={Plus} label="Create course" tooltip="Create" />
              </div>
            </form>
          </div>
        </Surface>

        <Surface as="section" className="p-2 sm:p-3">
          <div className="relative z-10">
            <LayoutGroup id="course-list">
              <AnimatePresence mode="popLayout">
                {courses.map((course) => {
                  const Icon = getCourseIcon(course.iconName);

                  return (
                    <motion.article
                      key={course.id}
                      className="rounded-md border border-white/0 p-3 transition-colors hover:border-white/10 hover:bg-white/[0.025]"
                      layout
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    >
                      <div className="flex min-w-0 gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-cyan-100">
                          <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <form action={actions?.update} className="grid gap-3">
                            <input name="id" type="hidden" value={course.id} />
                            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_96px]">
                              <Field defaultValue={course.title} label="Course" name="title" required />
                              <Field defaultValue={course.progress} label="Progress" max={100} min={0} name="progress" required type="number" />
                            </div>
                            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                              <IconSelect defaultValue={course.iconName} />
                              <div className="flex justify-end">
                                <SubmitIcon
                                  disabled={disabled}
                                  icon={Save}
                                  label={`Save ${course.title}`}
                                  tooltip="Save"
                                />
                              </div>
                            </div>
                          </form>
                          <form action={actions?.delete} className="mt-2 flex justify-end gap-2">
                            <input name="id" type="hidden" value={course.id} />
                            <IconButton
                              ariaLabel={`Reset ${course.title}`}
                              icon={RotateCcw}
                              onClick={() => window.location.reload()}
                              tooltip="Reset"
                            />
                            <SubmitIcon
                              disabled={disabled}
                              icon={Trash2}
                              intent="danger"
                              label={`Delete ${course.title}`}
                              tooltip="Delete"
                            />
                          </form>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </LayoutGroup>
            {!courses.length ? (
              <div className="p-8 text-center text-sm text-zinc-500">No courses found.</div>
            ) : null}
          </div>
        </Surface>
      </div>
    </section>
  );
}
