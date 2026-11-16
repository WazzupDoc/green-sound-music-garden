import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(resolve(process.cwd(), "src/routes/index.tsx"), "utf8");
const css = readFileSync(resolve(process.cwd(), "src/styles/home-redesign-v158.css"), "utf8");

describe("V158 major home editorial redesign", () => {
  it("actually loads the new scoped CSS after previous art direction and keeps four sections", () => {
    expect(home).toContain('homeRedesignCss from "@/styles/home-redesign-v158.css?inline"');
    expect(home).toContain('className="gs-home-v86 gs-home-v158"');
    expect(home.indexOf("<style>{premiumEventCss}</style>")).toBeLessThan(
      home.indexOf("<style>{homeRedesignCss}</style>")
    );
    const sections = ["<StageHero />", "<ProductionIndex />", "<EditorialPortfolio />", 'className="crafted-finale gs-finale"'];
    const offsets = sections.map(item => home.indexOf(item));
    expect(offsets.every(x => x >= 0)).toBe(true);
    expect(offsets).toEqual([...offsets].sort((a,b) => a-b));
    expect((home.match(/<Link to="\/contact"/g) ?? []).length).toBe(1);
  });

  it("contains the cinematic single-photograph treatment and warm-ivory editorial magazine", () => {
    expect(css).toContain(".gs-home-v86.gs-home-v158 .gs-stage-v90 .crafted-hero__canvas");
    expect(css).toContain("width:69%!important");
    expect(css).toContain(".gs-home-v86.gs-home-v158 .gs-index");
    expect(css).toContain("background:var(--gs-v158-cream)!important");
    expect(css).toContain(".gs-home-v86.gs-home-v158 .gs-v90-show-wall__rig");
    expect(css).toContain("grid-template-columns:repeat(3,minmax(0,1fr))");
    expect(css).toContain(".gs-home-v86.gs-home-v158 .gs-finale");
    expect(css).toContain("background:#bde7a8!important");
  });

  it("retains interactive services, films and Lite/reduced-motion support without new assets", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:640px)");
    expect(css).toContain("html[data-gs-performance=lite]");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).not.toMatch(/url\(https?:|<video\b|autoplay\s*=|@import\s/);
  });
});
