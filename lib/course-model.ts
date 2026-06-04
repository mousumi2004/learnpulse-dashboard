import { getCourseIconName, type CourseIconName } from "./icon-registry";

export type CourseRow = {
  id: string;
  title: string | null;
  progress: number | null;
  icon_name: string | null;
  created_at: string | null;
};

export type Course = {
  id: string;
  title: string;
  progress: number;
  iconName: CourseIconName;
  createdAt: string | null;
};

export type CourseSummary = {
  activeCount: number;
  averageProgress: number;
  strongestProgress: number;
  lowestProgress: number;
  latestCreatedAt: string | null;
};

function clampProgress(value: number | null | undefined) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(Number(value))));
}

export function normalizeCourseRow(row: CourseRow): Course {
  const title = row.title?.trim();

  return {
    id: row.id,
    title: title ? title : "Untitled course",
    progress: clampProgress(row.progress),
    iconName: getCourseIconName(row.icon_name),
    createdAt: row.created_at
  };
}

export function normalizeCourses(rows: CourseRow[]) {
  return rows.map(normalizeCourseRow);
}

export function getCourseSummary(rows: CourseRow[] | Course[]): CourseSummary {
  const courses = rows.map((course) =>
    "iconName" in course ? course : normalizeCourseRow(course)
  );
  const progressValues = courses.map((course) => course.progress);
  const activeCount = courses.length;
  const total = progressValues.reduce((sum, progress) => sum + progress, 0);
  const createdDates = courses
    .map((course) => course.createdAt)
    .filter((value): value is string => Boolean(value))
    .sort();

  return {
    activeCount,
    averageProgress: activeCount ? Math.round(total / activeCount) : 0,
    strongestProgress: activeCount ? Math.max(...progressValues) : 0,
    lowestProgress: activeCount ? Math.min(...progressValues) : 0,
    latestCreatedAt: createdDates.at(-1) ?? null
  };
}

export function getFocusCourse(rows: CourseRow[] | Course[]) {
  const courses = rows.map((course) =>
    "iconName" in course ? course : normalizeCourseRow(course)
  );

  return courses.toSorted((a, b) => a.progress - b.progress)[0] ?? null;
}

export function formatDate(value: string | null) {
  if (!value) {
    return "No timestamp";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
