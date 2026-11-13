import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/styles/production-index.css", "utf8");

/** Check the actual CSS declaration, not an escaped textual approximation. */
const hoverRules = (source: string) =>
  [...source.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .filter(([, selector]) => selector?.includes(".gs-index__intro-note a:hover") ?? false)
    .map(([, selector, declarations]) => ({ selector: selector ?? "", declarations: declarations ?? "" }));

const layoutProperties = /(?:^|;)\s*(?:gap|column-gap|row-gap|padding(?:-(?:left|right|top|bottom))?|margin(?:-(?:left|right|top|bottom))?|width|height|left|right|top|bottom)\s*:/i;

describe("editorial services CTA layout stability", () => {
  it("does not change geometry on CTA hover", () => {
    const rules = hoverRules(css);
    expect(rules.length).toBeGreaterThan(0);
    for (const { declarations } of rules) {
      expect(declarations).not.toMatch(layoutProperties);
    }
    expect(css).toContain(".gs-index__intro-note a svg{flex:none;transition:transform");
  });

  it("detects deliberate regressions in CSS fixture rules", () => {
    const fixtures = [
      ".gs-index__intro-note a:hover { gap: 22px; }",
      ".gs-index__intro-note a:hover { padding-left: 12px; }",
      ".gs-index__intro-note a:hover { margin-right: 5px; }",
    ];
    for (const fixture of fixtures) {
      const rule = hoverRules(fixture)[0];
      expect(rule).toBeDefined();
      expect(rule?.declarations).toMatch(layoutProperties);
    }
    const transformRule = hoverRules(".gs-index__intro-note a:hover { transform: translateX(4px); }")[0];
    expect(transformRule).toBeDefined();
    expect(transformRule?.declarations).not.toMatch(layoutProperties);
  });

  it("gates decorative arrow movement by motion preference and Lite", () => {
    expect(css).toContain("@media (prefers-reduced-motion:no-preference)");
    expect(css).toContain("html:not([data-gs-performance=lite]) .gs-index__intro-note a:hover svg{transform:translate(4px,-4px)}");
    expect(css).toContain(".gs-index__intro-note a svg{transition:none!important;transform:none!important}");
    expect(css).toContain("html[data-gs-performance=lite] .gs-index__intro-note a svg{transition:none!important;transform:none!important}");
  });
});
