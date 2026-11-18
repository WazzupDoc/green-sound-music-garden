import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (p: string) => readFileSync(resolve(process.cwd(), p), "utf8");

describe("V225 navigation ownership and keyboard disclosure", () => {
  const header = source("src/components/site/SiteHeader.tsx");
  const desktop = source("src/styles/atelier.css");
  const catalogue = source("src/styles/navigation-v217.css");

  it("uses the SAME viewport threshold for React handoff, desktop links and directory", () => {
    expect(header).toContain('window.matchMedia("(min-width: 1121px)")');
    expect(desktop).toContain("@media(max-width:1120px)");
    expect(catalogue).toContain("@media(max-width:1120px)");
    expect(catalogue).toContain("@media(min-width:1121px) and (max-width:1190px)");
    expect(catalogue).not.toContain("@media(max-width:1023px)");
  });

  it("preserves actual focus ownership and explicit dismissals", () => {
    expect(header).toContain('document.addEventListener("focusin", focusOutside)');
    expect(header).toContain('document.addEventListener("pointerdown", dismiss)');
    expect(header).toContain('document.removeEventListener("focusin", focusOutside)');
    expect(header).not.toContain('onBlur={(event) => {');
    expect(header).toContain('event.key !== "Escape"');
    expect(header).toContain("servicesButtonRef.current?.focus()");
    expect(header).toContain("menuDesktopHandoffRef.current = Boolean(menuDialogRef.current?.open)");
    expect(header).toContain('dialog.close()');
  });

  it("keeps the accessible native modal and adds navigation for no-JS visitors", () => {
    expect(header).toContain('id="atelier-mobile-navigation"');
    expect(header).toContain('aria-label="Navigare principală mobilă"');
    expect(header).toContain('<noscript>');
    expect(header).toContain('aria-label="Navigare fără JavaScript"');
    for (const href of ["/", "/servicii", "/evenimente", "/contact", "/portofoliu", "/despre-noi", "/studio-inregistrari"]) {
      expect(header).toContain(`href="${href}"`);
    }
    expect(catalogue).toContain(".gs225-nojs-nav a:focus-visible");
  });

  it("keeps tablet layout signature clear and safe under reduced motion", () => {
    expect(catalogue).toContain("@media(min-width:851px) and (max-width:1120px)");
    expect(catalogue).toContain(".gsm189-mobile-current");
    expect(catalogue).toContain("@media(prefers-reduced-motion:reduce)");
    expect(catalogue).toContain('data-gs-performance="lite"');
  });
});
