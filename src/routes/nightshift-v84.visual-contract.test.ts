import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(path, "utf8");
const home = read("src/routes/index.tsx");
const css = read("src/styles/home-nightshift-v84.css");
const baseStyles = read("src/styles.css");

describe("V84 Nightshift homepage design contract", () => {
  it("makes a real scoped homepage composition change with all four original sections", () => {
    expect(home).toContain('import homeNightshiftCss from "@/styles/home-nightshift-v84.css?inline"');
    expect(home).toContain('className="gs-home-v84"');
    expect(home).toContain("<style>{homeNightshiftCss}</style>");
    for (const section of ["<StageHero />", "<ProductionIndex />", "<EditorialPortfolio />",
      'className="crafted-finale gs-finale"']) {
      expect(home).toContain(section);
    }
    expect(home.match(/<Link to="\/contact"/g)).toHaveLength(1);
    expect(baseStyles).not.toContain('@import "./styles/home-nightshift-v84.css"');
  });

  it("alters service hierarchy from the preceding two-column cards to alternating full-width acts", () => {
    expect(css).toContain(".gs-home-v84 .gs-index__chapters{");
    expect(css).toContain("grid-template-columns:minmax(0,1fr)");
    expect(css).toContain(".gs-index__chapter[data-chapter=stage] .gs-index__photo{");
    expect(css).toContain("grid-column:2;grid-row:1");
    expect(css).toContain(".gs-index__chapter[data-chapter=stage] .gs-index__chapter-body{");
    expect(css).toContain("grid-column:1;grid-row:1");
    expect(css).toContain(".gs-home-v84 .gs-index__service");
    expect(css).toContain(".gs-home-v84 .gs-finale{");
    expect(css).toContain("background:#bbec96");
  });

  it("keeps native stage interaction, real project images and reduced-motion/Lite settings", () => {
    expect(css).toContain(".gs-stage-v79__architecture");
    expect(css).toContain("display:none!important");
    expect(css).toContain(".crafted-hero__image");
    expect(css).toContain(".crafted-hero__bottom");
    expect(css).toContain(".scene-console");
    expect(css).toContain(".gs-film-slate");
    expect(css).toContain("@media(max-width:640px)");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain("html[data-gs-performance=lite]");
    expect(css).not.toMatch(/url\(https?:|autoplay|new AudioContext|backdrop-filter:blur\(30/);
  });
});
