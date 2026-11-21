import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("../routes/evenimente.index.tsx", import.meta.url), "utf8");

describe("V247 Events provenance copy", () => {
  it("avoids an unsupported founding year and keeps grounded location copy", () => {
    expect(source).not.toContain("DIN 2008");
    expect(source).toContain("<span>PITEȘTI / ARGEȘ</span>");
  });
});
