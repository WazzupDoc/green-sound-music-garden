import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const source = readFileSync("src/components/atelier/ProductionIndex.tsx", "utf8");

describe("editorial chapter semantic navigation", () => {
  it("provides a unique chapter heading and explanation for each service list", () => {
    expect(source).toContain('id={`gs-index-chapter-${chapter.index}`}');
    expect(source).toContain('id={`gs-index-note-${chapter.index}`}');
    expect(source).toContain('aria-labelledby={`gs-index-chapter-${chapter.index}`}');
    expect(source).toContain('aria-describedby={`gs-index-note-${chapter.index}`}');
  });
});
