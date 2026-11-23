import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Contact hydrated brief announcement V276", () => {
  it("announces the selected brief as one noninteractive status region", () => {
    const source = readFileSync(resolve(process.cwd(), "src/routes/contact.tsx"), "utf8");
    const summary = source.match(/\{fromBrief && \(\s*<div([^>]+)>/);
    expect(summary?.[1]).toContain('role="status"');
    expect(summary?.[1]).toContain('aria-live="polite"');
    expect(summary?.[1]).toContain('aria-atomic="true"');
    expect(summary?.[1]).toContain('aria-label="Selecția preluată');
    expect(source).toContain("const fromBrief = Boolean(event || date || location || selectedServices.length)");
    expect(source).toContain("Nu am trimis nimic automat.");
  });
});
