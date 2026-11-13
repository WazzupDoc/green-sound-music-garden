import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/styles/production-index.css", "utf8");

describe("editorial keyboard-only chapter cue", () => {
  it("uses focus-visible for chapter photo emphasis, not generic focus-within", () => {
    expect(css).toContain(".gs-index__chapter:has(.gs-index__service:focus-visible) .gs-index__photo");
    expect(css).not.toContain(".gs-index__chapter:focus-within");
    expect(css).toContain(".gs-index__service:focus-visible{outline:");
  });

  it("keeps photo zoom optional in reduced-motion and Lite modes", () => {
    expect(css).toContain("@media (prefers-reduced-motion:no-preference)");
    expect(css).toContain("html:not([data-gs-performance=lite]) .gs-index__chapter:has(.gs-index__service:focus-visible)");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain("html[data-gs-performance=lite] .gs-index__photo img");
  });
});
