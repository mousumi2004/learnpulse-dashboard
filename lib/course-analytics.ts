import { normalizeCourses, type Course, type CourseRow } from "./course-model";

export type ActivityBand = {
  label: "At risk" | "Building" | "Strong";
  range: string;
  count: number;
  courses: string[];
};

export type ProgressBarData = {
  id: string;
  title: string;
  progress: number;
};

function toCourses(rows: CourseRow[] | Course[]) {
  return rows.map((course) => ("iconName" in course ? course : normalizeCourses([course])[0]));
}

export function buildActivityBands(rows: CourseRow[] | Course[]): ActivityBand[] {
  const courses = toCourses(rows);
  const bands: ActivityBand[] = [
    { label: "At risk", range: "0-49%", count: 0, courses: [] },
    { label: "Building", range: "50-79%", count: 0, courses: [] },
    { label: "Strong", range: "80-100%", count: 0, courses: [] }
  ];

  for (const course of courses) {
    const band = course.progress < 50 ? bands[0] : course.progress < 80 ? bands[1] : bands[2];
    band.count += 1;
    band.courses.push(course.title);
  }

  return bands;
}

export function buildProgressBars(rows: CourseRow[] | Course[]): ProgressBarData[] {
  return toCourses(rows)
    .map((course) => ({
      id: course.id,
      title: course.title,
      progress: course.progress
    }))
    .toSorted((a, b) => b.progress - a.progress);
}
