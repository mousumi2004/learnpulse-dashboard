import { describe, expect, it } from "vitest";

import { buildActivityBands, buildProgressBars } from "./course-analytics";
import type { CourseRow } from "./course-model";

const rows: CourseRow[] = [
  { id: "1", title: "Foundations", progress: 35, icon_name: "BookOpen", created_at: null },
  { id: "2", title: "React", progress: 72, icon_name: "Code2", created_at: null },
  { id: "3", title: "Motion", progress: 91, icon_name: "Sparkles", created_at: null }
];

describe("course analytics", () => {
  it("groups progress into meaningful activity bands", () => {
    expect(buildActivityBands(rows)).toEqual([
      { label: "At risk", range: "0-49%", count: 1, courses: ["Foundations"] },
      { label: "Building", range: "50-79%", count: 1, courses: ["React"] },
      { label: "Strong", range: "80-100%", count: 1, courses: ["Motion"] }
    ]);
  });

  it("builds sorted chart rows with percentages", () => {
    expect(buildProgressBars(rows).map((bar) => [bar.title, bar.progress])).toEqual([
      ["Motion", 91],
      ["React", 72],
      ["Foundations", 35]
    ]);
  });
});
