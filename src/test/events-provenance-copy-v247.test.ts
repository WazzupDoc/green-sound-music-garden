import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Vitest can transform import.meta.url into a non-file URL in CI.
const source = readFileSync(resolve(process.cwd(), "src/routes/evenimente.index.tsx"), "utf8");

describe("V247 Events provenance copy", () => {
  it("avoids an unsupported founding year and keeps grounded location copy", () => {
    expect(source).not.toContain("DIN 2008");
    expect(source).toContain("<span>PITEȘTI / ARGEȘ</span>");
  });
});
