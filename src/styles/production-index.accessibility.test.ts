import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/styles/production-index.css", "utf8");

describe("editorial keyboard focus cue", () => {
  it("exposes a visual focus cue on the chapter and preserves native link focus", () => {
    expect(css).toContain(".gs-index__chapter:focus-within .gs-index__photo");
    expect(css).toContain(".gs-index__service:focus-visible");
  });
  it("avoids layout-affecting hover padding and gates the compositor cue", () => {
    expect(css).not.toMatch(/\\.gs-index__service:hover\\s*\\{[^}]*padding-left/);
    expect(css).not.toContain("transition:padding");
    expect(css).toContain("html:not([data-gs-performance=lite]) .gs-index__service:hover span");
    expect(css).toContain(".gs-index__service span{overflow-wrap:anywhere;transition:transform");
    expect(css).toContain(".gs-index__service span{transition:none!important;transform:none!important}");
  });
  it("limits focus zoom to non-reduced-motion and non-Lite experiences", () => {
    expect(css).toContain("@media (prefers-reduced-motion:no-preference)");
    expect(css).toContain("html:not([data-gs-performance=lite]) .gs-index__chapter:focus-within");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
  });
});
