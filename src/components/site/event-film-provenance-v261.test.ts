import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("V261 event film provenance copy", () => {
  it("does not describe unverified event films as Green Sound archive material", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/site/EventPage.tsx"), "utf8");
    expect(source).toContain('id="filmari-eveniment-titlu">Filmări disponibile</h2>');
    expect(source).not.toContain("Filmări din arhiva Green Sound");
    expect(source).toContain("Filmele nu pornesc automat");
  });
});
