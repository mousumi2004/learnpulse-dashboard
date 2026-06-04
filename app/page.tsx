import { HomePage } from "@/components/home/home-page";
import { fetchCourses } from "@/lib/supabase/courses";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { courses, error } = await fetchCourses();

  return <HomePage courses={courses} error={error} />;
}
