import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(resolve(process.cwd(), "src/routes/index.tsx"), "utf8");

describe("V48 editorial homepage route", () => {
  it("mounts exactly the three editorial sections, then one final Contact CTA", () => {
    expect(home).toContain("<StageHero />");
    expect(home).toContain("<ProductionIndex />");
    expect(home).toContain("<EditorialPortfolio />");
    const order = ["<StageHero />", "<ProductionIndex />", "<EditorialPortfolio />", 'className="crafted-finale gs-finale"'];
    expect(order.map(item => home.indexOf(item))).toEqual([...order.map(item => home.indexOf(item))].sort((a, b) => a - b));
    expect(home.match(/<Link to="\/contact"/g)).toHaveLength(1);
  });

  it("never mounts the legacy multi-section event configurator on the homepage", () => {
    expect(home).not.toMatch(/RegiaHome|rs-programme|rs-backstage|rs-films|rs-hero/);
    expect(home).not.toMatch(/QuickBrief|EventsSelector|ServicesAtelier|Soundcheck|FrequencyLab/);
  });
});
