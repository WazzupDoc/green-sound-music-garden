import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (p: string) => readFileSync(p,"utf8");
const home = read("src/routes/index.tsx");
const hero = read("src/components/atelier/StageHero.tsx");
const productionDeck = read("src/components/atelier/ProductionDeckArt.tsx");
const css = read("src/styles/home-production-v85.css");
const index = read("src/components/atelier/ProductionIndex.tsx");

describe("V85 production identity from owner's actual visual reference", () => {
  it("actually activates its new scoped CSS and sizeable original SVG inside SSR homepage", () => {
    expect(home).toContain('import homeProductionCss from "@/styles/home-production-v85.css?inline"');
    expect(home).toContain("<style>{homeProductionCss}</style>");
    expect(hero).toContain('import { ProductionDeckArt } from "@/components/atelier/ProductionDeckArt"');
    expect(hero).toContain("<ProductionDeckArt />");
    expect(hero).toContain('className="gs-production-backdrop-v85"');
    expect(hero).toContain('src={images.scena.src} alt=""');
    expect(css).toContain(".gs-home-v84 .gs-production-backdrop-v85");
    expect(hero).toContain("Sunet.");
    expect(hero).toContain("Lumină. <em>Emoție.</em>");
    expect(productionDeck).toContain("<svg viewBox=\"0 0 900 490\"");
    expect(productionDeck).toContain("GS / LIVE CONTROL / SIGNAL CHAIN");
    expect(productionDeck).toContain('aria-hidden="true"');
    expect(productionDeck).toContain("never handles clicks");
  });
  it("restores truly unequal original-photo editorial chapters and exactly eight native links", () => {
    expect(css).toContain("grid-template-columns:minmax(0,1.16fr) minmax(0,.91fr) minmax(0,1.04fr)");
    expect(css).toContain("clip-path:polygon(");
    expect(css).toContain('gs-index__chapter[data-chapter=stage]');
    expect(css).toContain('gs-index__chapter[data-chapter=people]');
    expect(index).toContain('chapter.linkedServices.map((service)');
    expect(index).toContain('to={`/${service.slug}`}');
    expect(index).toContain('image: images.dj');
    expect(index).toContain('image: images.scena');
    expect(index).toContain('image: images.ursitoare');
  });
  it("disables nonessential graphics and movements for small screens, Lite and reduced motion", () => {
    expect(css).toContain("@media(max-width:640px)");
    expect(css).toContain(".gs-production-deck-v85{display:none}");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain("html[data-gs-performance=lite]");
    expect(css).toContain("transition:none!important");
    expect(productionDeck).not.toMatch(/autoplay|AudioContext|navigator.mediaDevices|fetch\(/);
    expect(css).not.toMatch(/https?:\/\//);
  });
});
