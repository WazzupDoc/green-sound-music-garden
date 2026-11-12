import { describe, expect, it } from "vitest";
import { services } from "@/data/site";
import { editorialChapters } from "./ProductionIndex";

/** Editorial homepage is intentionally a direct index, never a hidden selector. */
describe("editorial service programme integrity", () => {
  it("has three distinct chapters and exactly eight unique service links", () => {
    expect(editorialChapters).toHaveLength(3);
    expect(new Set(editorialChapters.map((chapter) => chapter.index)).size).toBe(3);
    const slugs = editorialChapters.flatMap((chapter) => chapter.serviceSlugs);
    expect(slugs).toHaveLength(8);
    expect(new Set(slugs).size).toBe(8);
  });

  it("links to every real service and never silently omits a renamed route", () => {
    const actual = services.map((service) => service.slug);
    const indexed = editorialChapters.flatMap((chapter) => chapter.serviceSlugs);
    expect([...indexed].sort()).toEqual([...actual].sort());
    for (const slug of indexed) {
      const service = services.find((item) => item.slug === slug);
      expect(service?.name.trim().length).toBeGreaterThan(0);
    }
  });

  it("keeps authentic image metadata and descriptive alternative text", () => {
    for (const chapter of editorialChapters) {
      expect(chapter.image.src).toMatch(/^\/media\/greensound\//);
      expect(chapter.image.alt.trim().length).toBeGreaterThan(15);
      expect(chapter.image.w).toBeGreaterThan(0);
      expect(chapter.image.h).toBeGreaterThan(0);
    }
  });
});
