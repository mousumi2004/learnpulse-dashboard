import { SourcePage } from "@/components/source/source-page";
import { fetchCourses } from "@/lib/supabase/courses";
import { getSupabaseWriteStatus } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { courses, error } = await fetchCourses();
  const writeStatus = getSupabaseWriteStatus();

  return <SourcePage courses={courses} error={error} writeStatus={writeStatus} />;
}
