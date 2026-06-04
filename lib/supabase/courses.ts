import { normalizeCourses, type Course, type CourseRow } from "@/lib/course-model";

import { getSupabaseReadClient } from "./server";

export type CourseFetchResult = {
  courses: Course[];
  rows: CourseRow[];
  error: string | null;
};

export async function fetchCourses(): Promise<CourseFetchResult> {
  const supabase = getSupabaseReadClient();

  if (!supabase) {
    return {
      courses: [],
      rows: [],
      error: "Supabase environment variables are missing."
    };
  }

  const { data, error } = await supabase
    .from("courses")
    .select("id,title,progress,icon_name,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return {
      courses: [],
      rows: [],
      error: error.message
    };
  }

  const rows = (data ?? []) as CourseRow[];

  return {
    courses: normalizeCourses(rows),
    rows,
    error: null
  };
}
