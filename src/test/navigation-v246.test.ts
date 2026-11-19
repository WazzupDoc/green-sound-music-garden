import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

describe("V246 mobile menu close access", () => {
  const css = readFileSync("src/styles/navigation-v246.css", "utf8");
  const header = readFileSync("src/components/site/SiteHeader.tsx", "utf8");

  it("loads the mobile exit stylesheet into the SSR header", () => {
    expect(header).toContain('navigation-v246.css?inline');
    expect(header).toContain("<style>{mobileExitCss}</style>");
  });

  it("keeps a visible close action in the scrolling native dialog", () => {
    expect(css).toContain("@media (max-width: 1023px)");
    expect(css).toMatch(/\.gsm-nav-index__top\s*\{[^}]*position:\s*sticky/s);
    expect(css).toMatch(/\.gsm-nav-index__close\s*\{[^}]*min-height:\s*44px/s);
    expect(header).toContain('onCancel={(event) => {');
    expect(header).toContain('menuButtonRef.current?.focus()');
  });
});
