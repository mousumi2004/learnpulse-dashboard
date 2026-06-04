import { render, screen } from "@testing-library/react";
import { Save } from "lucide-react";
import { describe, expect, it } from "vitest";

import { IconButton } from "./icon-button";

describe("IconButton", () => {
  it("renders an accessible icon-only control without visible action text", () => {
    render(
      <IconButton ariaLabel="Save Advanced React Patterns" icon={Save} tooltip="Save changes" />
    );

    expect(screen.getByRole("button", { name: "Save Advanced React Patterns" })).toBeInTheDocument();
    expect(screen.queryByText("Save Advanced React Patterns")).not.toBeInTheDocument();
  });
});
