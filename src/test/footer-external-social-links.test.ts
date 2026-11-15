import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("footer external social links", () => {
  const footer = readFileSync("src/components/site/SiteFooter.tsx", "utf8");
  it("keeps secure new-tab links and announces the context change", () => {
    expect(footer).toContain('target="_blank"');
    expect(footer).toContain('rel="noopener noreferrer"');
    expect(footer).toContain('aria-hidden="true">↗</span>');
    expect(footer).toContain('className="sr-only"> (se deschide într-o filă nouă)</span>');
    expect(footer).toContain("business.socials.map");
  });
});
