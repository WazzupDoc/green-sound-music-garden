import { describe, it, expect } from "vitest";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const page = readFileSync(resolve("src/routes/servicii.tsx"),"utf8");
const css = readFileSync(resolve("src/styles/service-chapter-art-v226.css"),"utf8");

describe("V226 first-party generated concept artwork /servicii", () => {
  const names = ["muzica","tehnica","oameni"];
  it("commits actual optimized image files, never external hotlinks", () => {
    for (const name of names) {
      const path = resolve(`public/media/greensound/v226-concept-${name}.webp`);
      const bytes = readFileSync(path);
      expect(bytes.subarray(0,4).toString("ascii")).toBe("RIFF");
      expect(bytes.subarray(8,12).toString("ascii")).toBe("WEBP");
      expect(statSync(path).size).toBeLessThan(85_000);
      expect(page).toContain(`/media/greensound/v226-concept-${name}.webp`);
    }
  });

  it("distinguishes conceptual art from owner-provided real event documentation", () => {
    expect(page).toContain("Ilustrație conceptuală");
    expect(page).toContain("alt=\"\"");
    expect(page).toContain("loading=\"lazy\"");
    expect(page).toContain("decoding=\"async\"");
    expect(page).toContain("width={1152} height={252}");
  });

  it("uses three first-party original SVG chapter symbols and keeps all eight service links", () => {
    expect(page).toContain('type ChapterKind = "music" | "tech" | "people"');
    expect(page).toContain('focusable="false" aria-hidden="true"');
    expect(page).toContain("group.slugs.map");
    expect(page).toContain("<CategorySignal kind={service.slug} />");
    expect(page).toContain('to={`/${service.slug}`}');
  });

  it("preserves full-width conceptual artwork at mobile widths", () => {
    expect(css).toContain("aspect-ratio:1152 / 252");
    expect(css).toContain("object-fit:contain");
  });

  it("preserves mobile layout and disables visual motion under Lite or reduced motion", () => {
    expect(css).toContain("@media(max-width:760px)");
    expect(css).toContain("@media(max-width:430px)");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain('data-gs-performance="lite"');
    expect(css).not.toMatch(/https?:\/\//);
  });
});
