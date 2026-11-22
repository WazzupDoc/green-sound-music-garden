import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("V268 no-JS quote fallback accessibility", () => {
  const source = readFileSync(resolve(process.cwd(), "src/components/site/blocks.tsx"), "utf8");
  const fallback = source.match(/<ClientOnly fallback=\{([\s\S]*?)\}:?\s*>/)?.[1] ?? source;
  it("offers actual email and phone actions without an intrusive live region", () => {
    expect(fallback).toContain('aria-label="Alternative de contact fără JavaScript"');
    expect(fallback).not.toContain('role="status"');
    expect(fallback).toContain('href={business.phoneHref}');
    expect(fallback).toContain('mailto:');
    expect(fallback).toContain("Niciun mesaj nu este trimis automat.");
  });
});
