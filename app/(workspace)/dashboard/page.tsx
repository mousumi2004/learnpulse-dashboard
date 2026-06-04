import { DashboardPage } from "@/components/dashboard/dashboard-page";
import { fetchCourses } from "@/lib/supabase/courses";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { courses, error } = await fetchCourses();

  return <DashboardPage courses={courses} error={error} />;
}
