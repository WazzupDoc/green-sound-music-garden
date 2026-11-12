import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("../../styles/production-index.css", import.meta.url), "utf8");

describe("V70 editorial photo motion policy", () => {
  it("gates decorative photo zoom behind pointer hover and no reduced motion", () => {
    expect(css).toContain("@media (hover:hover) and (prefers-reduced-motion:no-preference)");
    expect(css).toContain("html:not([data-gs-performance=lite]) .gs-index__chapter:hover .gs-index__photo img{transform:scale(1.06)}");
    expect(css).not.toMatch(/^\.gs-index__chapter:hover \.gs-index__photo img\{transform:scale\(1\.06\)/m);
  });
  it("preserves non-motion color feedback and keyboard focus treatment", () => {
    expect(css).toContain(".gs-index__chapter:hover .gs-index__photo img{filter:saturate(1) contrast(1.06)}");
    expect(css).toContain(".gs-index__chapter:has(.gs-index__service:focus-visible) .gs-index__photo{outline:2px solid #286d3a;outline-offset:3px}");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain("html[data-gs-performance=lite] .gs-index__photo img");
  });
});
