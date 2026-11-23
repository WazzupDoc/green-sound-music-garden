import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const route = readFileSync("src/routes/index.tsx", "utf8");
const page = readFileSync("src/components/atelier/ConceptHomeV170.tsx", "utf8");
describe("V170 concept reference homepage route", () => {
  it("mounts exactly one full homepage composition with route-scoped CSS", () => {
    expect(route).toContain("<ConceptHomeV170 />");
    expect(route).toContain('home-reference-v170.css?inline');
    expect(route).toContain('className="gs170-home"');
    expect(route).toContain('home-photographic-v279.css?inline');
    expect(route).toContain('data-art-direction="v279"');
    expect(route).toContain('data-services-direction="v280"');
    expect(route).toContain("home-editorial-v280.css?inline");
    expect(route.match(/<style>/g)).toHaveLength(1);
  });
  it("keeps the four real sections in reference order and two functional quote actions", () => {
    const order = ['className="gs170-hero"', '<ProductionIndex />', 'className="gs170-films"', 'className="gs170-final"'];
    const indices = order.map(value => page.indexOf(value));
    expect(indices.every(index => index >= 0)).toBe(true);
    expect(indices).toEqual([...indices].sort((a, b) => a - b));
    expect(page.match(/to="\/contact"/g)?.length).toBe(2);
  });
});
