import { describe, expect, it } from "vitest";
import { editorialChapters } from "./ProductionIndex";
import { services } from "@/data/site";

describe("editorial service programme", () => {
  it("links exactly eight distinct real services across three chapters", () => {
    expect(editorialChapters).toHaveLength(3);
    const slugs = editorialChapters.flatMap((chapter) => chapter.linkedServices.map((service) => service.slug));
    expect(slugs).toHaveLength(8);
    expect(new Set(slugs).size).toBe(8);
    expect(slugs.every((slug) => services.some((service) => service.slug === slug))).toBe(true);
  });
  it("keeps accessible first-party imagery in each chapter", () => {
    for (const chapter of editorialChapters) {
      expect(chapter.image.src.startsWith("/media/greensound/")).toBe(true);
      expect(chapter.image.alt.trim().length).toBeGreaterThan(12);
      expect(chapter.linkedServices.length).toBeGreaterThan(0);
    }
  });
});
