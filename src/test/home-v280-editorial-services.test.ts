import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/** V280: the homepage must be a photograph-led editorial, never a generic
 * card grid or a second multi-step configurator. The eight genuine service
 * routes are modelled in ProductionIndex, not duplicated in the homepage. */
const route = readFileSync("src/routes/index.tsx", "utf8");
const home = readFileSync("src/components/atelier/ConceptHomeV170.tsx", "utf8");
const index = readFileSync("src/components/atelier/ProductionIndex.tsx", "utf8");
const css = readFileSync("src/styles/home-editorial-v280.css", "utf8");

describe("V280 premium editorial service programme", () => {
  it("uses existing three chapters with all eight direct service routes and real photos", () => {
    expect(home).toContain("<ProductionIndex />");
    expect(index).toContain("editorialChapters.map((chapter)");
    expect(index).toContain("chapter.linkedServices.map((service)");
    expect(index).toContain("image: images.dj");
    expect(index).toContain("image: images.scena");
    expect(index).toContain("image: images.ursitoare");
    for (const slug of [
      "dj-mc", "trupa", "studio-inregistrari", "echipamente-de-sunet-si-lumini",
      "masina-fum-greu-cu-gheata-carbonica", "hostess", "ursitoare-botez", "start-veselia",
    ]) expect(index).toContain(`"${slug}"`);
  });

  it("removes old featured tiles and duplicated process without breaking real films", () => {
    expect(home).not.toContain("featured.map((item, index)");
    expect(home).not.toContain("gs170-services__grid");
    expect(home).not.toContain("gs170-process__steps");
    expect(home).toContain("films.map((item, index)");
    expect(home).toContain("VideoLite video={film.video}");
    expect(home.match(/to="\/contact"/g)).toHaveLength(2);
  });

  it("loads the V280 direction after V279 and preserves 390px/mobile + Lite", () => {
    expect(route).toContain('data-art-direction="v279" data-services-direction="v280"');
    expect(route).toContain("home-photographic-v279.css?inline");
    expect(route).toContain("home-editorial-v280.css?inline");
    expect(route).not.toContain("home-editorial-services-v188.css?inline");
    expect(css).toContain("@media (max-width: 540px)");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain('html[data-gs-performance="lite"]');
    expect(css).toContain('.gs-index__chapters');
    expect(css).not.toMatch(/@keyframes\\s+[A-Za-z]|animation(?:-name)?:/);
  });
});
