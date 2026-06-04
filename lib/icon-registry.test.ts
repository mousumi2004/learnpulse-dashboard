import { describe, expect, it } from "vitest";

import { COURSE_ICON_NAMES, getCourseIconName } from "./icon-registry";

describe("icon registry", () => {
  it("allows only professional Lucide course icons", () => {
    expect(COURSE_ICON_NAMES).toEqual(["BookOpen", "Brain", "Code2", "Database", "PenTool", "Sparkles"]);
  });

  it("falls back to BookOpen when Supabase contains an unsupported icon", () => {
    expect(getCourseIconName("AlienIcon")).toBe("BookOpen");
  });
});
