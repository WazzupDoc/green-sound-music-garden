import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const source = readFileSync("src/routes/contact.tsx", "utf8");

describe("Contact in-page quote navigation", () => {
  it("retains a native fragment link and moves keyboard focus to its heading", () => {
    expect(source).toContain('href="#contact-form-title"');
    expect(source).toContain('document.getElementById("contact-form-title")?.focus({ preventScroll: true })');
    expect(source).toMatch(/id="contact-form-title" tabIndex=\{-1\}/);
  });
});
