import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "src/routes/evenimente.index.tsx"), "utf8");

describe("V249 event frame provenance while decoding", () => {
  it("distinguishes the active event from a retained previous photo", () => {
    expect(source).toContain("const framePending = visualEvent.slug !== activeEvent.slug");
    expect(source).toContain('framePending ? "CADRU ANTERIOR" : "SCENA SELECTATĂ"');
    expect(source).toContain('framePending ? "FOTOGRAFIE DIN CATEGORIA ANTERIOARĂ" : "ACUM ÎN REGIE"');
    expect(source).toContain("preloadEventFrame(activeEvent.image.src");
  });
});
