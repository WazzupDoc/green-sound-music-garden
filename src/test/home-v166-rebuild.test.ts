import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("V166 homepage editorial rebuild contract", () => {
  const home = source("src/routes/index.tsx");
  const hero = source("src/components/atelier/ProductionHeroV166.tsx");
  const css = source("src/styles/home-rebuild-v166.css");

  it("activates one fresh scoped stylesheet rather than accumulating home versions", () => {
    expect(home).toContain('home-rebuild-v166.css?inline');
    expect(home).toContain('className="gs166-home"');
    expect(home).toContain("<ProductionHeroV166 />");
    expect(home).not.toContain('home-direction-v160.css?inline');
    expect(home).not.toContain("<ProductionHeroV160 />");
  });

  it("keeps exactly the four editorial homepage experiences", () => {
    expect(home).toContain("<ProductionHeroV166 />");
    expect(home).toContain("<ProductionIndex />");
    expect(home).toContain("<EditorialPortfolio />");
    expect(home).toContain('className="crafted-finale gs-finale"');
    expect(home).not.toMatch(/QuickBrief|EventsSelector|ServicesAtelier|Soundcheck|FrequencyLab/);
  });

  it("preserves visitor-controlled events, original film and interactive light desk", () => {
    expect(hero).toContain('images.concert');
    expect(hero).toContain('images.dj');
    expect(hero).toContain('images.scena');
    expect(hero).toContain('aria-pressed={selected === item.key}');
    expect(hero).toContain('onClick={() => setFilmOpen(true)}');
    expect(hero).toContain('<VideoLite video={scene.video}');
    expect(hero).toContain('<details ref={desk}');
    expect(hero).toContain('useReducedMotion');
  });

  it("provides photo-first tablet/mobile CSS, reduced-motion and Lite fallbacks", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:470px)");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain('data-gs-performance=lite');
    expect(css).toContain('.gs166-home .gs-index__chapter');
    expect(css).toContain('.gs166-home .director-reel');
  });
});
