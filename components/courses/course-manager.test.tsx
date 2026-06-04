import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CourseManager } from "./course-manager";

describe("CourseManager", () => {
  it("renders editable Supabase courses with icon-only save and delete actions", () => {
    render(
      <CourseManager
        courses={[
          {
            id: "react",
            title: "Advanced React Patterns",
            progress: 75,
            iconName: "Code2",
            createdAt: "2026-06-01T10:00:00.000Z"
          }
        ]}
        writeStatus={{ canWrite: false, reason: "Missing SUPABASE_SERVICE_ROLE_KEY" }}
      />
    );

    expect(screen.getByDisplayValue("Advanced React Patterns")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save Advanced React Patterns" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete Advanced React Patterns" })).toBeInTheDocument();
    expect(screen.queryByText("Save Advanced React Patterns")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete Advanced React Patterns")).not.toBeInTheDocument();
    expect(screen.getByText(/Editing unavailable/i)).toBeInTheDocument();
  });
});
