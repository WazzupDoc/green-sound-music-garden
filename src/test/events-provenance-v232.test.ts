import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

describe("V232 events gallery provenance", () => {
  const source = readFileSync("src/routes/evenimente.index.tsx", "utf8");

  it("does not claim that all gallery photographs are verified Green Sound event material", () => {
    expect(source).not.toContain("Fotografii din materialele Green Sound existente.");
    expect(source).toContain("fără a certifica locul, data sau participarea Green Sound");
  });

  it("does not imply a booking or automatic submission", () => {
    expect(source).toContain("Cererea nu se trimite automat.");
    expect(source).toContain("prețurile și disponibilitatea se confirmă separat");
  });
});
