import { getCourseIconName } from "./icon-registry";

export type CourseFormPayload = {
  title: string;
  progress: number;
  iconName: string;
};

export type CourseFormResult =
  | {
      ok: true;
      payload: CourseFormPayload;
    }
  | {
      ok: false;
      errors: string[];
    };

export function parseCourseForm(formData: FormData): CourseFormResult {
  const title = String(formData.get("title") ?? "").trim();
  const rawProgress = Number(formData.get("progress"));
  const iconName = getCourseIconName(String(formData.get("iconName") ?? ""));
  const errors: string[] = [];

  if (!title) {
    errors.push("Course title is required.");
  }

  if (!Number.isFinite(rawProgress) || rawProgress < 0 || rawProgress > 100) {
    errors.push("Progress must be between 0 and 100.");
  }

  if (errors.length) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    payload: {
      title,
      progress: Math.round(rawProgress),
      iconName
    }
  };
}
