import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const source = readFileSync("src/routes/evenimente.index.tsx", "utf8");

describe("V240 events setlist no-JavaScript fallback", () => {
  it("explains that interactive preview requires JavaScript", () => {
    expect(source).toContain("<noscript>");
    expect(source).toContain("Previzualizarea interactivă necesită JavaScript");
    expect(source).toContain("</noscript>");
  });
  it("retains SSR-accessible event detail links for each item", () => {
    expect(source).toContain('to="/evenimente/$slug" params={{ slug: event.slug }}');
    expect(source).toContain('aria-label={"Detalii despre " + event.name}');
  });
});
