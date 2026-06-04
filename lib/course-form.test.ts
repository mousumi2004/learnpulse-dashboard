import { describe, expect, it } from "vitest";

import { parseCourseForm } from "./course-form";

describe("course form parsing", () => {
  it("returns a normalized payload for valid course input", () => {
    const formData = new FormData();
    formData.set("title", "  Design Systems Motion  ");
    formData.set("progress", "88");
    formData.set("iconName", "Sparkles");

    expect(parseCourseForm(formData)).toEqual({
      ok: true,
      payload: {
        title: "Design Systems Motion",
        progress: 88,
        iconName: "Sparkles"
      }
    });
  });

  it("rejects blank titles and out-of-range progress values", () => {
    const formData = new FormData();
    formData.set("title", "");
    formData.set("progress", "-4");
    formData.set("iconName", "Unknown");

    expect(parseCourseForm(formData)).toEqual({
      ok: false,
      errors: ["Course title is required.", "Progress must be between 0 and 100."]
    });
  });
});
