import { Database, KeyRound, Table2 } from "lucide-react";

import type { Course } from "@/lib/course-model";
import { formatDate, getCourseSummary } from "@/lib/course-model";
import { Surface } from "@/components/ui/surface";
import { StatusBanner } from "@/components/ui/status-banner";

type SourcePageProps = {
  courses: Course[];
  writeStatus: {
    canWrite: boolean;
    reason: string;
  };
  error: string | null;
};

const fieldMap = [
  ["id", "Row identity for edit/delete actions"],
  ["title", "Course headings, editable form inputs, and analytics labels"],
  ["progress", "Dashboard KPIs, progress bars, activity bands, and focus priority"],
  ["icon_name", "Lucide icon lookup for course tiles"],
  ["created_at", "Freshness and row ordering"]
];

export function SourcePage({ courses, writeStatus, error }: SourcePageProps) {
  const summary = getCourseSummary(courses);

  return (
    <section className="space-y-6 pt-2">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-100">Data health</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Learning data status</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
          A compact status view for freshness, row count, and the fields that drive the product experience.
        </p>
      </header>

      {error ? (
        <StatusBanner title="Live data issue" tone="error">
          {error}
        </StatusBanner>
      ) : null}
      <StatusBanner title={writeStatus.canWrite ? "Editing enabled" : "Editing unavailable"} tone={writeStatus.canWrite ? "success" : "warning"}>
        {writeStatus.reason}
      </StatusBanner>

      <div className="grid gap-4 lg:grid-cols-3">
        <Surface className="p-5">
          <div className="relative z-10">
            <Table2 aria-hidden="true" className="size-5 text-cyan-100" strokeWidth={1.8} />
            <p className="mt-6 text-3xl font-semibold text-white">courses</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500">Data table</p>
          </div>
        </Surface>
        <Surface className="p-5">
          <div className="relative z-10">
            <Database aria-hidden="true" className="size-5 text-cyan-100" strokeWidth={1.8} />
            <p className="mt-6 text-3xl font-semibold text-white">{summary.activeCount}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500">Live row count</p>
          </div>
        </Surface>
        <Surface className="p-5">
          <div className="relative z-10">
            <KeyRound aria-hidden="true" className="size-5 text-cyan-100" strokeWidth={1.8} />
            <p className="mt-6 text-xl font-semibold text-white">{writeStatus.canWrite ? "Secure editing" : "Read only"}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500">Current write mode</p>
          </div>
        </Surface>
      </div>

      <Surface as="section" className="p-5">
        <div className="relative z-10">
          <h2 className="text-xl font-semibold text-white">Field map</h2>
          <div className="mt-5 grid gap-2">
            {fieldMap.map(([field, usage]) => (
              <div key={field} className="grid gap-2 rounded-md border border-white/10 bg-white/[0.025] p-3 text-sm sm:grid-cols-[140px_1fr]">
                <code className="font-mono text-cyan-100">{field}</code>
                <span className="text-zinc-300">{usage}</span>
              </div>
            ))}
          </div>
        </div>
      </Surface>

      <Surface as="section" className="p-5">
        <div className="relative z-10">
          <h2 className="text-xl font-semibold text-white">Current rows</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                <tr>
                  <th className="py-3 pr-4 font-medium">Title</th>
                  <th className="py-3 pr-4 font-medium">Progress</th>
                  <th className="py-3 pr-4 font-medium">Icon</th>
                  <th className="py-3 pr-4 font-medium">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td className="py-3 pr-4 text-zinc-100">{course.title}</td>
                    <td className="py-3 pr-4 tabular-nums text-zinc-300">{course.progress}%</td>
                    <td className="py-3 pr-4 text-zinc-300">{course.iconName}</td>
                    <td className="py-3 pr-4 text-zinc-400">{formatDate(course.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Surface>
    </section>
  );
}
