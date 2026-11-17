import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync("src/components/site/EventPage.tsx", "utf8");

describe("V206 event film consent clarity", () => {
  it("explains click-to-load and exposes a labelled film region", () => {
    expect(source).toContain('aria-labelledby="filmari-eveniment-titlu"');
    expect(source).toContain('id="filmari-eveniment-titlu"');
    expect(source).toContain("Filmele nu pornesc automat");
    expect(source).toContain("se încarcă playerul YouTube");
    expect(source).toContain("îl poți opri oricând");
    expect(source).toContain("event.videos.length>0");
  });
});
