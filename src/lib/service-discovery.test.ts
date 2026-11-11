import { describe, expect, it } from "vitest";
import { services } from "@/data/site";
import { serviceCompanions, uniqueServiceGallery, actualServiceSlugs } from "./service-discovery";

describe("first-party service discovery and photo hygiene", () => {
  it("recommends three genuine, distinct complementary services per current service", () => {
    expect(new Set(actualServiceSlugs).size).toBe(8);
    const known = new Set(actualServiceSlugs);
    const firstThreeOnEveryPage = services.filter(s => s.slug !== services[0]!.slug).slice(0, 3).map(s => s.slug);
    let different = 0;
    for (const source of services) {
      const related = serviceCompanions(source.slug);
      expect(related).toHaveLength(3);
      expect(new Set(related.map(item => item.service.slug)).size).toBe(3);
      expect(related.every(item => known.has(item.service.slug))).toBe(true);
      expect(related.every(item => item.service.slug !== source.slug)).toBe(true);
      expect(related.every(item => item.why.length >= 30)).toBe(true);
      if (related.map(item => item.service.slug).join("|") !== firstThreeOnEveryPage.join("|"))
        different++;
    }
    expect(different).toBeGreaterThanOrEqual(6);
    expect(serviceCompanions("ursitoare-botez")[0]?.service.slug).toBe("start-veselia");
    expect(serviceCompanions("studio-inregistrari")[0]?.service.slug).toBe("trupa");
  });

  it("never reuses a hero photo in a service sidebar or gallery", () => {
    for (const source of services) {
      const plan = uniqueServiceGallery(source);
      const visible = [...plan.side, ...plan.after];
      expect(new Set(visible.map(image => image.src)).size).toBe(visible.length);
      expect(visible.every(image => image.src !== source.image.src)).toBe(true);
      expect(visible.length).toBe(
        new Set((source.gallery ?? []).map(image => image.src).filter(src => src !== source.image.src)).size,
      );
      expect(plan.side.length).toBeLessThanOrEqual(2);
      if (source.videos.length) expect(plan.side).toEqual([]);
    }
  });
});
