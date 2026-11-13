import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const entry = read("src/styles.css");
const hero = read("src/components/atelier/StageHero.tsx");
const stage = read("src/styles/stage-v78.css");

describe("V78 visual stylesheet recovery", () => {
  it("actually loads the pre-existing V48 editorial and interaction styles", () => {
    for (const module of [
      "scene-console", "light-desk", "production-index", "portfolio-journal",
      "event-brief", "event-journal", "production-journey", "service-mix",
      "service-discovery", "offstage", "signature-cursor",
      "editorial-reset", "stage-v78",
    ]) {
      expect(entry).toContain(`@import "./styles/${module}.css";`);
    }
    expect(entry.indexOf('"./styles/editorial-reset.css"')).toBeGreaterThan(
      entry.indexOf('"./styles/regia-serii-final.css"')
    );
    expect(entry.indexOf('"./styles/stage-v78.css"')).toBeGreaterThan(
      entry.indexOf('"./styles/editorial-reset.css"')
    );
  });

  it("uses one readable, semantic hero with genuine photography and an active stage selector", () => {
    expect(hero).toContain('className="crafted-hero gs-stage-v78"');
    expect(hero).toContain('id="crafted-hero-title"');
    expect(hero).toContain("Muzica");
    expect(hero).toContain("schimbă <em>tot.</em>");
    expect(hero).not.toContain('className="gs-poster__stamp"');
    expect(hero).toContain('src={scene.src}');
    expect(hero).toContain('fetchPriority={active === "live" ? "high" : undefined}');
    expect(hero).toContain('modes.map((mode)');
    expect(hero).toContain('className="gs-stage-v78__light-sweep"');
    expect(hero).toContain('className="gs-stage-v78__aperture"');
  });

  it("keeps the new light effect decorative, pauseable and disabled in Lite and reduced motion", () => {
    expect(stage).toContain('pointer-events:none');
    expect(stage).toContain('transform:translate3d');
    expect(stage).toContain('gs-v78-sweep');
    expect(stage).toContain('[data-stage-visible="false"]');
    expect(stage).toContain('[data-lights="off"]');
    expect(stage).toContain('html[data-gs-performance="lite"]');
    expect(stage).toContain('@media(prefers-reduced-motion:reduce)');
    expect(stage).toContain('@media(max-width:640px)');
  });
});
