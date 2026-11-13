import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const header = readFileSync("src/components/site/SiteHeader.tsx", "utf8");
const css = readFileSync("src/styles/navigation-v81.css", "utf8");
const stylesheet = readFileSync("src/styles.css", "utf8");

describe("V81 stage-index navigation contract", () => {
  it("uses a real native modal, not a role-only overlay", () => {
    expect(header).toContain("<dialog");
    expect(header).toContain("dialog.showModal()");
    expect(header).toContain("dialog.close()");
    expect(header).toContain("aria-labelledby=\"gsm-stage-index-title\"");
    expect(header).toContain("autoFocus");
    expect(header).toContain("onCancel={(event) => {");
    expect(header).toContain("event.preventDefault()");
    expect(header).toContain("menuButtonRef.current?.focus()");
    expect(header).not.toContain('aria-modal="true"');
  });

  it("keeps every canonical destination and existing Finder handoff", () => {
    const targets = ["/", "/evenimente", "/servicii", "/portofoliu", "/studio-inregistrari", "/despre-noi"];
    for (const target of targets) {
      expect(header).toContain(`to: "${target}"`);
    }
    expect(header).toContain('to="/contact"');
    expect(header).toContain("FrequencyFinder");
    expect(header).toContain("finderActivated");
    expect(header).toContain("dialog[open]");
  });

  it("ships its actual stylesheet and has a keyboard-visible close button", () => {
    expect(stylesheet).toContain('@import "./styles/navigation-v81.css";');
    expect(css).toContain("dialog.atelier-mobile-menu:not([open])");
    expect(css).toContain("dialog.atelier-mobile-menu[open]");
    expect(css).toContain(".gsm-nav-index__close");
    expect(css).toContain(".gsm-nav-index a:focus-visible");
    expect(css).toContain("max-height:100dvh");
  });

  it("does not animate in reduced-motion or Lite modes", () => {
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain('html[data-gs-performance="lite"] dialog.atelier-mobile-menu[open]');
    expect(css).toContain("animation:none!important");
    expect(css).toContain("@media(prefers-reduced-motion:no-preference)");
    expect(css).toContain("gsm-nav-reveal");
  });
});
