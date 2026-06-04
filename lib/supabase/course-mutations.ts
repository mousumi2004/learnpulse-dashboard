import { parseCourseForm } from "@/lib/course-form";

import { getSupabaseMutationClient, getSupabaseWriteStatus } from "./server";

export type MutationResult = {
  ok: boolean;
  message: string;
};

function mutationClientOrError(): { client: NonNullable<ReturnType<typeof getSupabaseMutationClient>> } | MutationResult {
  const client = getSupabaseMutationClient();

  if (!client) {
    return {
      ok: false,
      message: getSupabaseWriteStatus().reason
    };
  }

  return { client };
}

export async function createCourse(formData: FormData): Promise<MutationResult> {
  const parsed = parseCourseForm(formData);

  if (!parsed.ok) {
    return { ok: false, message: parsed.errors.join(" ") };
  }

  const result = mutationClientOrError();

  if ("ok" in result) {
    return result;
  }

  const { error } = await result.client.from("courses").insert({
    title: parsed.payload.title,
    progress: parsed.payload.progress,
    icon_name: parsed.payload.iconName
  });

  return error ? { ok: false, message: error.message } : { ok: true, message: "Course created." };
}

export async function updateCourse(formData: FormData): Promise<MutationResult> {
  const id = String(formData.get("id") ?? "");
  const parsed = parseCourseForm(formData);

  if (!id) {
    return { ok: false, message: "Missing course id." };
  }

  if (!parsed.ok) {
    return { ok: false, message: parsed.errors.join(" ") };
  }

  const result = mutationClientOrError();

  if ("ok" in result) {
    return result;
  }

  const { error } = await result.client
    .from("courses")
    .update({
      title: parsed.payload.title,
      progress: parsed.payload.progress,
      icon_name: parsed.payload.iconName
    })
    .eq("id", id);

  return error ? { ok: false, message: error.message } : { ok: true, message: "Course saved." };
}

export async function deleteCourse(formData: FormData): Promise<MutationResult> {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return { ok: false, message: "Missing course id." };
  }

  const result = mutationClientOrError();

  if ("ok" in result) {
    return result;
  }

  const { error } = await result.client.from("courses").delete().eq("id", id);

  return error ? { ok: false, message: error.message } : { ok: true, message: "Course deleted." };
}
