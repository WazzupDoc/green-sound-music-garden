import { describe, expect, it } from "vitest";
import { editorialChapters } from "./ProductionIndex";
import { services } from "@/data/site";

describe("V68 editorial service lookup", () => {
  it("preserves all eight catalogue service identities and chapter order", () => {
    const linked = editorialChapters.flatMap((chapter) => chapter.linkedServices);
    expect(linked).toHaveLength(8);
    expect(new Set(linked.map((service) => service.slug)).size).toBe(8);
    expect(linked.map((service) => service.slug)).toEqual(
      editorialChapters.flatMap((chapter) => chapter.serviceSlugs),
    );
    for (const linkedService of linked) {
      expect(linkedService).toBe(services.find((service) => service.slug === linkedService.slug));
    }
  });

  it("does not alter chapter layout or expose extra links", () => {
    expect(editorialChapters).toHaveLength(3);
    expect(editorialChapters.map((chapter) => chapter.linkedServices.length)).toEqual([3, 2, 3]);
  });
});
