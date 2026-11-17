import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const header = readFileSync("src/components/site/SiteHeader.tsx", "utf8");
const css = readFileSync("src/styles/navigation-v189.css", "utf8");

describe("V189 live-setlist navigation contract", () => {
  it("keeps the original six real routes and existing native dialog", () => {
    for (const route of ["/", "/evenimente", "/servicii", "/portofoliu", "/studio-inregistrari", "/despre-noi"]) {
      expect(header).toContain(`to: "${route}"`);
    }
    expect(header).toContain("dialog.showModal()");
    expect(header).toContain("menuButtonRef.current?.focus()");
    expect(header).toContain("onCancel={(event) => {");
    expect(header).toContain("<FrequencyFinder open={finderOpen}");
  });

  it("inlines the new stylesheet with SSR and provides route cue and accessible visual signal", () => {
    expect(header).toContain('import liveSetlistCss from "@/styles/navigation-v189.css?inline"');
    expect(header).toContain("<style>{liveSetlistCss}</style>");
    expect(header).toContain('className="gsm189-mobile-current" aria-hidden="true"');
    expect(header).toContain('className="gsm189-channel" aria-hidden="true"');
    expect(header).toContain("navigation[menuSelection]?.note");
    expect(css).toContain(".gsm189-mobile-current");
    expect(css).toContain(".gsm189-channel");
    expect(css).toContain("@media (max-width:500px)");
  });

  it("supports arrow and Home/End shortcuts without hijacking Escape or Tab", () => {
    expect(header).toContain("onKeyDown={onMenuKeyDown}");
    for (const key of ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"]) {
      expect(header).toContain(`event.key === "${key}"`);
    }
    expect(header).toContain("event.preventDefault()");
    expect(header).toContain("links[next]?.focus()");
    expect(header).toContain("if (event.altKey || event.ctrlKey || event.metaKey) return;");
    expect(header).toContain("else return;");
    expect(header).toContain("onCancel={(event) => {");
  });

  it("gates the decorative channel animation for reduced motion and Lite", () => {
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain('html[data-gs-performance="lite"] .gsm189-channel i');
    expect(css).toContain("@media (hover:hover) and (prefers-reduced-motion:no-preference)");
    expect(css).toContain('html:not([data-gs-performance="lite"])');
    expect(css).toContain("animation:none!important");
    expect(css).not.toContain("@import");
  });
});
