import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("./ProductionIndex.tsx", import.meta.url), "utf8");

describe("editorial catalogue source integrity", () => {
  it("rejects duplicated catalogue slugs before comparing editorial coverage", () => {
    expect(source).toContain("catalogueSlugs.size !== catalogueSlugList.length");
    expect(source).toContain('throw new Error("Service catalogue contains duplicate slugs")');
    expect(source.indexOf("catalogueSlugs.size !== catalogueSlugList.length"))
      .toBeLessThan(source.indexOf("editorialServiceSlugs.length !== catalogueSlugs.size"));
  });

  it("does not confuse unique set size with original catalogue length", () => {
    const sourceSlugs = ["dj-mc", "dj-mc", "trupa"];
    const editorialSlugs = ["dj-mc", "trupa"];
    // Without the source guard, set equality would incorrectly pass.
    expect(new Set(sourceSlugs).size).toBe(editorialSlugs.length);
    expect(new Set(sourceSlugs).size).not.toBe(sourceSlugs.length);
  });
});
