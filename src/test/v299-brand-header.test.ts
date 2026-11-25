import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const read = (p: string) => readFileSync(p, "utf8");
describe("V299 brand header", () => {
  it("preserves accessible home and action labels with decorative first-party SVG", () => {
    const logo = read("src/components/site/Logo.tsx");
    const header = read("src/components/site/SiteHeader.tsx");
    expect(logo).toContain('aria-label="Green Sound Music — pagina principală"');
    expect(logo).toContain('gs299-brand__mark');
    expect(logo).toContain('aria-hidden="true"');
    expect(header).toContain('aria-label="Caută servicii și evenimente"');
    expect(header).toContain('Deschide meniul');
    expect(header).toContain('aria-expanded={open}');
    expect(header).toContain('function SignalIcon');
    expect(header).toContain('aria-hidden="true"><path d={paths[kind]}');
  });
  it("includes SSR styling, focus and motion opt-out", () => {
    const header = read("src/components/site/SiteHeader.tsx");
    const css = read("src/styles/navigation-v299.css");
    expect(header).toContain('<style>{brandNavCss}</style>');
    expect(css).toContain('focus-visible');
    expect(css).toContain('prefers-reduced-motion:reduce');
    expect(css).toContain('data-gs-performance="lite"');
  });
});
