import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const route = readFileSync("src/routes/index.tsx", "utf8");
const page = readFileSync("src/components/atelier/ConceptHomeV170.tsx", "utf8");
const css = readFileSync("src/styles/home-rebuild-v297.css", "utf8");
describe("V297 independent editorial homepage", () => {
  it("loads one independent art direction, without historical cascading home overrides", () => {
    expect(route).toContain("<ConceptHomeV170 />");
    expect(route).toContain("home-rebuild-v297.css?inline");
    expect(route).toContain('className="gs170-home"');
    expect(route).toContain('data-bespoke="v297"');
    expect(route.match(/<style>/g)).toHaveLength(1);
    for(const legacy of ["home-reference-v170","home-refinement-v215","home-photographic-v279","home-editorial-v280","home-bespoke-v293"]) expect(route).not.toContain(legacy);
  });
  it("retains four sections, two functional quote actions, and actual photo and film content", () => {
    const order = ['className="gs170-hero"', '<ProductionIndex />', 'className="gs170-films"', 'className="gs170-final"'];
    const indices = order.map(value => page.indexOf(value));
    expect(indices.every(index => index >= 0)).toBe(true);
    expect(indices).toEqual([...indices].sort((a, b) => a - b));
    expect(page.match(/to="\/contact"/g)?.length).toBe(2);
    expect(page).toContain("images.concert.src");
    expect(page).not.toContain("images.dj.src");
    expect(page).toContain("<LiveDeck />");
    expect(page).toContain('className="gs-live-deck__art"');
    expect(page).toContain('aria-hidden="true"');
    expect(page).toContain("<VideoLite");
    expect(page).not.toContain("gs170-stage__console");
    expect(page).not.toContain("gs170-stage__beams");
  });
  it("honors both existing performance preferences", () => {
    expect(css).toContain("prefers-reduced-motion:reduce");
    expect(css).toContain('html[data-gs-performance="lite"]');
  });
});
