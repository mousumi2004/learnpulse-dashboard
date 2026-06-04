import "dotenv/config";

import { fetchCourses } from "../lib/supabase/courses";
import { getSupabaseWriteStatus } from "../lib/supabase/server";

async function main() {
  const result = await fetchCourses();
  const writeStatus = getSupabaseWriteStatus();

  if (result.error) {
    console.error(`Supabase read failed: ${result.error}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Supabase read ok: ${result.courses.length} course rows`);
  for (const course of result.courses) {
    console.log(`- ${course.title}: ${course.progress}% (${course.iconName})`);
  }
  console.log(`Write status: ${writeStatus.canWrite ? "enabled" : "locked"} - ${writeStatus.reason}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
