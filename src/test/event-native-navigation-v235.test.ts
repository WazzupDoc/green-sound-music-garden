import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync("src/components/site/EventPage.tsx", "utf8");

describe("event detail section navigation", () => {
  it("uses native fragment links without premature programmatic focus", () => {
    for (const id of ["oferta-titlu", "desfasurator-eveniment", "servicii-potrivite"]) {
      expect(source).toContain(`href="#${id}"`);
      expect(source).not.toContain(`getElementById("${id}")?.focus`);
    }
  });
  it("keeps timeline and service section destinations keyboard focusable", () => {
    expect(source).toMatch(/id="desfasurator-eveniment"[^>]*tabIndex=\{-1\}/);
    expect(source).toMatch(/id="servicii-potrivite"[^>]*tabIndex=\{-1\}/);
  });
});
