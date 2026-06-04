import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ActivityPage } from "./activity-page";

describe("ActivityPage", () => {
  it("renders meaningful activity bands instead of decorative blocks", () => {
    render(
      <ActivityPage
        courses={[
          { id: "1", title: "Foundations", progress: 35, iconName: "BookOpen", createdAt: null },
          { id: "2", title: "Motion", progress: 91, iconName: "Sparkles", createdAt: null }
        ]}
      />
    );

    expect(screen.getByText("At risk")).toBeInTheDocument();
    expect(screen.getByText("Strong")).toBeInTheDocument();
    expect(screen.getAllByText("Foundations").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Motion").length).toBeGreaterThan(0);
  });
});
