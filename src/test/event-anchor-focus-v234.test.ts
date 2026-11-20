import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync("src/components/site/EventPage.tsx", "utf8");
describe("event quote anchor", () => {
  it("uses native hash navigation instead of focusing an unverified heading", () => {
    expect(source).toContain('href="#oferta-titlu"');
    expect(source).not.toContain('getElementById("oferta-titlu")?.focus');
  });
  it("retains focusable timeline and service destinations", () => {
    expect(source).toContain('id="desfasurator-eveniment"');
    expect(source).toContain('id="servicii-potrivite"');
    expect(source).toContain('tabIndex={-1}');
  });
});
