import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("../../styles/production-index.css", import.meta.url), "utf8");

describe("editorial services CTA layout stability", () => {
  it("does not animate flex gap or padding on the intro link", () => {
    expect(css).not.toMatch(/\\.gs-index__intro-note a:hover\\s*\\{[^}]*\\bgap\\s*:/);
    expect(css).not.toMatch(/\\.gs-index__intro-note a:hover\\s*\\{[^}]*\\bpadding(?:-left|-right)?\\s*:/);
    expect(css).toContain(".gs-index__intro-note a svg{flex:none;transition:transform");
  });
  it("gates decorative arrow movement by motion preference and Lite", () => {
    expect(css).toContain("@media (prefers-reduced-motion:no-preference)");
    expect(css).toContain("html:not([data-gs-performance=lite]) .gs-index__intro-note a:hover svg{transform:translate(4px,-4px)}");
    expect(css).toContain(".gs-index__intro-note a svg{transition:none!important;transform:none!important}");
    expect(css).toContain("html[data-gs-performance=lite] .gs-index__intro-note a svg{transition:none!important;transform:none!important}");
  });
});
