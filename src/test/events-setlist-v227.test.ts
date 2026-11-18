import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const source = readFileSync("src/routes/evenimente.index.tsx", "utf8");
describe("V227/V228 events setlist truthful, accessible and mobile-readable", () => {
  it("uses live catalogue length instead of a fixed event count", () => {
    expect(source).toContain('01—{String(events.length).padStart(2, "0")}');
    expect(source).not.toContain("01—05");
  });
  it("does not invent a business founding year", () => {
    expect(source).not.toContain("DIN 2008");
    expect(source).toContain("<span>PITEȘTI / ARGEȘ</span>");
  });
  it("explains keyboard navigation while preserving accessible controls", () => {
    expect(source).toContain("săgețile tastaturii");
    expect(source).toContain('aria-pressed={selected}');
    expect(source).toContain('event.key === "ArrowRight"');
    expect(source).toContain('event.key === "Home"');
    expect(source).toContain('event.key === "End"');
  });
  it("restores a single readable column at narrow phone widths", () => {
    const css = readFileSync("src/styles/event-index-v172.css", "utf8");
    expect(css).toContain("V228 — mobile event setlist");
    expect(css).toMatch(/@media\(max-width:460px\)\{\s*\.gs172-programme__options\{grid-template-columns:minmax\(0,1fr\)/);
    expect(css).toContain("min-height:82px");
  });
});
