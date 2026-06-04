import { CourseManager } from "@/components/courses/course-manager";
import { fetchCourses } from "@/lib/supabase/courses";
import { getSupabaseWriteStatus } from "@/lib/supabase/server";

import { createCourseAction, deleteCourseAction, updateCourseAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { courses } = await fetchCourses();
  const writeStatus = getSupabaseWriteStatus();

  return (
    <CourseManager
      actions={{
        create: createCourseAction,
        update: updateCourseAction,
        delete: deleteCourseAction
      }}
      courses={courses}
      writeStatus={writeStatus}
    />
  );
}
