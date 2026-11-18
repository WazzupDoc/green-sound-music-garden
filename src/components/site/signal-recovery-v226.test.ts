import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const source = readFileSync("src/components/site/StageFallback.tsx", "utf8");
const css = readFileSync("src/styles/signal-recovery-v226.css", "utf8");

describe("V226 recovery signal", () => {
  it("preserves real navigation, retry, and contact actions", () => {
    expect(source).toContain('to="/servicii"');
    expect(source).toContain('to="/"');
    expect(source).toContain('to="/contact"');
    expect(source).toContain("onClick={onRetry}");
    expect(source).toContain("business.phoneHref");
  });
  it("uses original accessible decorative SVG instead of an unrelated concert photograph", () => {
    expect(source).toContain('aria-hidden="true"');
    expect(source).toContain('className="gs-recovery__diagram"');
    expect(source).toContain('SIGNAL NOT FOUND');
    expect(source).not.toContain("images.concert");
  });
  it("provides responsive static rendering for reduced motion", () => {
    expect(css).toContain("@media(max-width:760px)");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
  });
});
