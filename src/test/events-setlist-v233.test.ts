import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const source = readFileSync("src/routes/evenimente.index.tsx", "utf8");
describe("V233 events setlist factual and keyboard copy", () => {
  it("uses the live event count", () => {
    expect(source).toContain('01—{String(events.length).padStart(2, "0")}');
    expect(source).not.toContain("01—05");
  });
  it("does not assert an unverified founding year", () => {
    expect(source).not.toContain("DIN 2008");
    expect(source).toContain("<span>PITEȘTI / ARGEȘ</span>");
  });
  it("makes existing keyboard shortcuts discoverable", () => {
    expect(source).toContain("săgețile tastaturii");
    expect(source).toContain('event.key === "ArrowRight"');
    expect(source).toContain('event.key === "Home"');
    expect(source).toContain('aria-pressed={selected}');
  });
});
