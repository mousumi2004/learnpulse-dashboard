import { describe, expect, it } from "vitest";

import {
  getCourseSummary,
  getFocusCourse,
  normalizeCourseRow,
  type CourseRow
} from "./course-model";

const rows: CourseRow[] = [
  {
    id: "react",
    title: "Advanced React Patterns",
    progress: 75,
    icon_name: "Code2",
    created_at: "2026-06-01T10:00:00.000Z"
  },
  {
    id: "systems",
    title: "AI Learning Systems",
    progress: 48,
    icon_name: "Brain",
    created_at: "2026-06-03T10:00:00.000Z"
  }
];

describe("course model", () => {
  it("normalizes Supabase rows into safe course values", () => {
    expect(
      normalizeCourseRow({
        id: "bad",
        title: "  ",
        progress: 120,
        icon_name: null,
        created_at: null
      })
    ).toEqual({
      id: "bad",
      title: "Untitled course",
      progress: 100,
      iconName: "BookOpen",
      createdAt: null
    });
  });

  it("summarizes live course rows for dashboard KPIs", () => {
    expect(getCourseSummary(rows)).toEqual({
      activeCount: 2,
      averageProgress: 62,
      strongestProgress: 75,
      lowestProgress: 48,
      latestCreatedAt: "2026-06-03T10:00:00.000Z"
    });
  });

  it("selects the lowest progress course as the focus target", () => {
    expect(getFocusCourse(rows)?.title).toBe("AI Learning Systems");
  });
});
