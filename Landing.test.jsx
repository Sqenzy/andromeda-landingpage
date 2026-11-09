// @vitest-environment jsdom
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import Landing, { APP_URL } from "./Landing.jsx";

afterEach(cleanup);

describe("Andromeda landing page", () => {
  it("presents a single main headline and four core capabilities", () => {
    render(<Landing />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Your traffic.Your rules. One platform.",
    );
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(
      screen.getByText(
        /Authorized developers can review infrastructure status/,
      ),
    ).toBeTruthy();
  });

  it("links every app call to action to the production app", () => {
    render(<Landing />);
    for (const name of ["Open app", "Enter Andromeda", "Open the app"]) {
      expect(screen.getByRole("link", { name }).getAttribute("href")).toBe(
        APP_URL,
      );
    }
    expect(APP_URL).toBe("https://app.andromedasecurity.eu");
  });

  it("provides valid in-page navigation and a keyboard skip link", () => {
    render(<Landing />);
    for (const link of screen
      .getAllByRole("link")
      .filter((link) => link.hash)) {
      expect(document.getElementById(link.hash.slice(1))).not.toBeNull();
    }
    expect(
      screen
        .getByRole("link", { name: "Skip to content" })
        .getAttribute("href"),
    ).toBe("#main");
  });

  it("switches capability content and keeps ARIA references valid", () => {
    render(<Landing />);
    for (const name of ["Routing", "Targets", "IP blocks", "Security checks"]) {
      const tab = screen.getByRole("tab", { name });
      expect(
        document.getElementById(tab.getAttribute("aria-controls")),
      ).not.toBeNull();
      fireEvent.click(tab);
      expect(tab.getAttribute("aria-selected")).toBe("true");
      expect(screen.getByRole("tabpanel").getAttribute("aria-labelledby")).toBe(
        tab.id,
      );
      expect(
        screen
          .getAllByRole("tab")
          .filter((item) => item.getAttribute("aria-selected") === "true"),
      ).toHaveLength(1);
    }
    expect(
      within(screen.getByRole("tabpanel")).getByRole("heading", {
        name: "A checkpoint before the endpoint.",
      }),
    ).toBeTruthy();
  });

  it("supports arrow, Home, and End keys on capability tabs", () => {
    render(<Landing />);
    const routing = screen.getByRole("tab", { name: "Routing" });
    routing.focus();
    fireEvent.keyDown(routing, { key: "ArrowRight" });
    expect(document.activeElement).toBe(
      screen.getByRole("tab", { name: "Targets" }),
    );
    fireEvent.keyDown(document.activeElement, { key: "End" });
    expect(document.activeElement).toBe(
      screen.getByRole("tab", { name: "Security checks" }),
    );
    fireEvent.keyDown(document.activeElement, { key: "ArrowRight" });
    expect(document.activeElement).toBe(routing);
    fireEvent.keyDown(document.activeElement, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(
      screen.getByRole("tab", { name: "Security checks" }),
    );
    fireEvent.keyDown(document.activeElement, { key: "Home" });
    expect(document.activeElement).toBe(routing);
  });

  it("opens and closes the mobile navigation on selection or Escape", () => {
    render(<Landing />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(
      within(screen.getByRole("navigation")).getByRole("link", {
        name: "Capabilities",
      }),
    );
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(toggle);
    fireEvent.keyDown(screen.getByRole("navigation"), { key: "Escape" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggle);
  });
});
