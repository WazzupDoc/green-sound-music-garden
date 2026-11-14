import { describe, expect, it } from "vitest";
import { chapters, editorialChapters } from "./ProductionIndex";
import { services } from "@/data/site";

describe("editorial programme catalogue completeness", () => {
  it("links to every real service exactly once across three chapters", () => {
    const listed = editorialChapters.flatMap((chapter) =>
      chapter.linkedServices.map((service) => service.slug),
    );
    const catalogue = services.map((service) => service.slug);
    expect(chapters).toHaveLength(3);
    expect(listed).toHaveLength(catalogue.length);
    expect(new Set(listed).size).toBe(listed.length);
    expect([...listed].sort()).toEqual([...catalogue].sort());
  });

  it("preserves each chapter's explicit service order", () => {
    for (const chapter of editorialChapters) {
      expect(chapter.linkedServices.map((service) => service.slug)).toEqual(chapter.serviceSlugs);
    }
  });
});
