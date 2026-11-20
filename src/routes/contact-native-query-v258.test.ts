import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("V258 native Contact brief handoff", () => {
  it("recovers browser query only after hydration and passes it through the existing allowlist", () => {
    const source = readFileSync(resolve(process.cwd(), "src/routes/contact.tsx"), "utf8");
    expect(source).toContain('hydrated && typeof window !== "undefined"');
    expect(source).toContain('validateBrief(Object.fromEntries(new URLSearchParams(window.location.search)))');
    expect(source).toContain('search.services?.length ? search.services : addressBrief.services ?? []');
  });
});
