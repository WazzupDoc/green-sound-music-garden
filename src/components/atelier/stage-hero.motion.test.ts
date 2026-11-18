import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/styles/editorial-reset.css", "utf8");
const gate = css.split("/* V72 / HERO PERFORMANCE CONTRACT")[1] ?? "";

describe("hero motion safety", () => {
  it("disables stage decoration in Lite without removing the real hero photo", () => {
    expect(gate).toContain('html[data-gs-performance="lite"] .crafted-stage-lights');
    expect(gate).toContain('html[data-gs-performance="lite"] .director-stage-ambient');
    expect(gate).toContain('html[data-gs-performance="lite"] .crafted-hero__pointer');
    expect(gate).toMatch(/display:\s*none\s*!important/);
    expect(gate).not.toMatch(/\.crafted-hero__canvas\s*\{\s*display:\s*none/);
  });

  it("honours reduced motion for decorative stage elements", () => {
    expect(gate).toContain("@media (prefers-reduced-motion: reduce)");
    expect(gate).toContain(".crafted-hero__image");
    expect(gate).toMatch(/animation:\s*none\s*!important/);
    expect(gate).toMatch(/transition:\s*none\s*!important/);
  });
});
