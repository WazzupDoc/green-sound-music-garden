import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("V271 Contact SSR/no-JS fallback", () => {
  const source = readFileSync(resolve(process.cwd(), "src/routes/contact.tsx"), "utf8");
  const fallback = source.split("<ClientOnly fallback=")[1]?.split("<QuoteForm key=")[0] ?? "";
  it("exposes native contact actions without announcing a permanent live status", () => {
    expect(fallback).toContain('aria-label="Alternative de contact fără JavaScript"');
    expect(fallback).not.toContain('role="status"');
    expect(fallback).toContain("mailto:");
    expect(fallback).toContain("href={business.phoneHref}");
    expect(fallback).toContain("Formularul interactiv se afișează după activarea JavaScript.");
  });
});
