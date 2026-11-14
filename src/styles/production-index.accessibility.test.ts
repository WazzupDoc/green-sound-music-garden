import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/styles/production-index.css", "utf8");

describe("editorial keyboard focus cue", () => {
  it("highlights the chapter only when a service link has visible keyboard focus", () => {
    expect(css).toContain(".gs-index__chapter:has(.gs-index__service:focus-visible) .gs-index__photo");
    expect(css).toContain(".gs-index__service:focus-visible{outline:");
    expect(css).not.toContain(".gs-index__chapter:focus-within .gs-index__photo");
  });

  it("keeps hover cues compositor-only without layout shifts", () => {
    expect(css).not.toMatch(/\.gs-index__service:hover\s*\{[^}]*padding-left/);
    expect(css).not.toContain("transition:padding");
    expect(css).toContain("html:not([data-gs-performance=lite]) .gs-index__service:hover span{transform:translateX(3px)}");
    expect(css).toContain(".gs-index__service span{overflow-wrap:anywhere;transition:transform");
  });

  it("gates decorative focus zoom and disables motion for reduced-motion and Lite", () => {
    expect(css).toContain("@media (prefers-reduced-motion:no-preference)");
    expect(css).toContain("html:not([data-gs-performance=lite]) .gs-index__chapter:has(.gs-index__service:focus-visible) .gs-index__photo img{transform:scale(1.025)}");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toMatch(/@media\(prefers-reduced-motion:reduce\)\s*\{[^}]*\.gs-index__service span,[^}]*\{transition:none!important;transform:none!important\}/);
    expect(css).toMatch(/html\[data-gs-performance=lite\] \.gs-index__service span,[\s\S]*?\{transition:none!important;transform:none!important\}/);
  });
});
