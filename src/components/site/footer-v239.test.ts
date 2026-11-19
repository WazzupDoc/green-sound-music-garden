import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("V239 footer factual claims", () => {
  const source = readFileSync(resolve(process.cwd(), "src/components/site/SiteFooter.tsx"), "utf8");
  it("does not claim an unverified founding year", () => {
    expect(source).not.toContain("business.founded");
    expect(source).not.toContain("activă din");
  });
  it("preserves contact routes and existing service directory", () => {
    expect(source).toContain('to="/contact"');
    expect(source).toContain("navServices.map");
    expect(source).toContain("navEvents.map");
  });
});
