import { ActivityPage } from "@/components/activity/activity-page";
import { fetchCourses } from "@/lib/supabase/courses";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { courses } = await fetchCourses();

  return <ActivityPage courses={courses} />;
}
