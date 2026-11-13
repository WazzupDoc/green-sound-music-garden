import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const hero = readFileSync("src/components/atelier/StageHero.tsx", "utf8");
const route = readFileSync("src/routes/index.tsx", "utf8");
const css = readFileSync("src/styles/hero-spectrum-v90.css", "utf8");

describe("V90 original cinematic sound-and-light hero", () => {
  it("renders a large first-party original vector curtain without fake show footage", () => {
    expect(hero).toContain('className="gs-v90__spectrum"');
    expect(hero).toContain('className="gs-v90__spectrum-rail"');
    expect(hero).toContain('className="gs-v90__photographic-edge"');
    expect(hero).toContain('className="gs-v90__frequency-stripe"');
    expect(hero).toContain('role="presentation"');
    expect(hero).toContain('src={scene.src}');
    expect(hero).toContain('src={images.scena.src}');
    expect(hero).not.toContain("https://images.unsplash.com");
    expect(hero).not.toContain("<canvas");
  });
  it("reacts to pointer using existing motion values, without a new heavyweight animation dependency", () => {
    expect(hero).toContain("useTransform(pointerX");
    expect(hero).toContain("useTransform(pointerY");
    expect(hero).toContain("style={{ x: spectrumX, y: spectrumY }}");
    expect(hero).toContain("onPointerMove={onMove}");
    expect(hero).toContain('document.documentElement.dataset["gsPerformance"] === "lite"');
    expect(hero).toContain('event.pointerType !== "mouse" || reduced');
  });
  it("ships actual SSR CSS after existing site art direction with mobile static fallback", () => {
    expect(route).toContain('import spectrumCurtainCss from "@/styles/hero-spectrum-v90.css?inline"');
    expect(route).toContain("<style>{spectrumCurtainCss}</style>");
    expect(route.indexOf("<style>{spectrumCurtainCss}</style>")).toBeGreaterThan(route.indexOf("<style>{premiumEventCss}</style>"));
    expect(css).toContain("@media(hover:hover) and (prefers-reduced-motion:no-preference)");
    expect(css).toContain("gs-v90-breathe");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain("html[data-gs-performance=lite]");
    expect(css).toContain("data-stage-visible=false");
    expect(css).toContain("data-lights=off");
    expect(css).toContain("@media(max-width:850px)");
  });
  it("preserves route and conversion contracts; no duplicate homepage sections", () => {
    expect(route).toContain("<StageHero />");
    expect(route).toContain("<ProductionIndex />");
    expect(route).toContain("<EditorialPortfolio />");
    expect(route).toContain('to="/contact"');
    expect(hero).toContain('className="crafted-hero__modes"');
    expect(hero).toContain('className="gs-lightboard"');
    expect(hero).toContain("<Dialog open={showReel}");
  });
});
