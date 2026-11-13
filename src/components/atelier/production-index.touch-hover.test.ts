import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/styles/production-index.css", "utf8");

/** Coarse/touch browsers may preserve hover after activation. */
describe("editorial touch hover parity", () => {
  it("neutralizes photographic zoom and link displacement on touch devices", () => {
    const touch = css.slice(css.lastIndexOf("@media (hover:none)"));
    expect(touch).toContain(".gs-index__chapter:hover .gs-index__photo img{transform:none");
    expect(touch).toContain(".gs-index__service:hover svg{transform:none}");
    expect(touch).toContain(".gs-index__service:hover span{transform:none}");
    expect(touch).toContain(".gs-index__intro-note a:hover svg{transform:none}");
  });
  it("preserves keyboard focus styling and reduced-motion fallback", () => {
    expect(css).toContain(".gs-index__service:focus-visible{outline:");
    expect(css).toContain(".gs-index__intro-note a:focus-visible{outline:");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain("html[data-gs-performance=lite]");
  });
});
