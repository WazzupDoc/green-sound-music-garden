import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect } from "vitest";
import { images } from "@/data/site";

const hero = readFileSync(resolve(process.cwd(), "src/components/atelier/ConceptHomeV170.tsx"), "utf8");
const route = readFileSync(resolve(process.cwd(), "src/routes/index.tsx"), "utf8");
const style = readFileSync(resolve(process.cwd(), "src/styles/home-editorial-cover-v244.css"), "utf8");

describe("V244 Green Sound editorial cover", () => {
  it("uses authentic source media and removes the unconvincing faux hardware", () => {
    expect(images.concert.src).toMatch(/^\/media\/greensound\//);
    expect(hero).toContain('src={images.concert.src}');
    expect(hero).toContain('className="gs244-hero__title"');
    expect(hero).toContain("Evenimente");
    expect(hero).toContain("de neuitat.");
    expect(hero).not.toContain('className="gs170-stage__console"');
    expect(hero).not.toContain('className="gs170-wave"');
    expect(route).toContain("editorialCoverCss");
  });

  it("preserves native conversion, real film interaction and explicit light controls", () => {
    expect(hero).toContain('to="/contact" className="gs170-btn gs170-btn--green"');
    expect(hero).toContain('href="#gs170-films"');
    expect(hero).toContain("onClick={() => setLightsOn(value => !value)}");
    expect(hero).toContain("onClick={() => setLightHue(\"cool\")}");
    expect(hero).toContain("setFilmIndex(index)");
    expect(hero).toContain("VideoLite");
  });

  it("provides responsive, calm accessible styling without a new package", () => {
    expect(style).toContain(".gs170-home .gs170-hero h1.gs244-hero__title");
    expect(style).toContain(".gs170-home .gs244-hero__statement");
    expect(style).toContain("@media (max-width: 430px)");
    expect(style).toContain("@media (prefers-reduced-motion: reduce)");
    expect(style).toContain('html[data-gs-performance="lite"]');
    expect(style).toContain(".gs170-home .gs170-hero__control button");
    expect(style).not.toContain("@import url(");
  });
});
