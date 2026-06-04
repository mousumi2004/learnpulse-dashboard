"use server";

import { revalidatePath } from "next/cache";

import { createCourse, deleteCourse, updateCourse } from "@/lib/supabase/course-mutations";

function revalidateWorkspace() {
  revalidatePath("/dashboard");
  revalidatePath("/courses");
  revalidatePath("/activity");
  revalidatePath("/focus");
  revalidatePath("/source");
}

export async function createCourseAction(formData: FormData) {
  await createCourse(formData);
  revalidateWorkspace();
}

export async function updateCourseAction(formData: FormData) {
  await updateCourse(formData);
  revalidateWorkspace();
}

export async function deleteCourseAction(formData: FormData) {
  await deleteCourse(formData);
  revalidateWorkspace();
}
