import { FocusPage } from "@/components/focus/focus-page";
import { fetchCourses } from "@/lib/supabase/courses";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { courses } = await fetchCourses();

  return <FocusPage courses={courses} />;
}
