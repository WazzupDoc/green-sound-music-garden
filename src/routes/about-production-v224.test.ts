import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
const read = (p: string) => readFileSync(resolve(process.cwd(), p), "utf8");

describe("V224 About page: accessible four-channel editorial score", () => {
  const route = read("src/routes/despre-noi.tsx");
  const root = read("src/routes/__root.tsx");
  const css = read("src/styles/about-production-v95.css");

  it("keeps exactly one main landmark in the shared layout", () => {
    expect(root).toContain('<main id="continut">');
    expect(route).not.toMatch(/<main\b|<\/main>/);
    expect(route).toContain('<div className="gs-about-v95">');
    expect(route).toContain('aria-labelledby="gs-about-process"');
  });

  it("removes the literal escape text between production intro and list", () => {
    expect(route).not.toContain(String.raw`</p>\n          <ol`);
    expect(route).toContain('className="gs-about-v95__steps"');
    expect(route).toContain("process.map((step, index)");
  });

  it("uses only first-party decorative SVG and truthful four-step content", () => {
    expect(route).toContain("const productionCues = [");
    expect(route).toContain('viewBox="0 0 150 30"');
    expect(route).toContain('focusable="false" aria-hidden="true"');
    expect(route).toContain("productionCues[index] ?? productionCues[0]");
    expect(route).toContain("business.founded");
    expect(route).not.toContain("https://i.ytimg.com");
  });

  it("makes the dark section clearly distinct without motion on Lite/reduced", () => {
    expect(css).toContain("background:#0d251b");
    expect(css).toContain(".gs-about-v95__cue");
    expect(css).toContain("@media(max-width:640px)");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain('html[data-gs-performance="lite"]');
  });
});
