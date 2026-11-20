import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("V230 root SEO trust", () => {
  const source = readFileSync(resolve(process.cwd(), "src/routes/__root.tsx"), "utf8");
  it("describes actual service categories without unsupported founding year", () => {
    expect(source).toContain("DJ & MC, trupe live, sonorizare, lumini și servicii de studio");
    expect(source).toContain("Pitești, Argeș și România");
    expect(source).not.toContain("din 2008");
  });
  it("retains Romanian document language and crawler environment policy", () => {
    expect(source).toContain('<html lang="ro">');
    expect(source).toContain('noindex, follow');
  });
});
