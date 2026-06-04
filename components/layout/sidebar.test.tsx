import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Sidebar } from "./sidebar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/courses"
}));

describe("Sidebar", () => {
  it("uses real route links and exposes a collapse control", () => {
    render(<Sidebar />);

    expect(screen.getByRole("link", { name: /Dashboard/i })).toHaveAttribute("href", "/dashboard");
    expect(screen.getByRole("link", { name: /Courses/i })).toHaveAttribute("href", "/courses");
    expect(screen.getByRole("link", { name: /Activity/i })).toHaveAttribute("href", "/activity");
    expect(screen.getByRole("button", { name: /Collapse navigation/i })).toBeInTheDocument();
  });
});
