import { describe, expect, it } from "vitest";
import { chapters } from "./ProductionIndex";

describe("editorial service programme integrity", () => {
  it("contains exactly eight distinct services across three chapters", () => {
    const slugs = chapters.flatMap((chapter) => chapter.serviceSlugs);
    expect(chapters).toHaveLength(3);
    expect(slugs).toHaveLength(8);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
