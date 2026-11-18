import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const header = readFileSync("src/components/site/SiteHeader.tsx", "utf8");

describe("V202 mobile-to-desktop focus continuity", () => {
  it("closes the modal on the actual 1121px desktop breakpoint", () => {
    expect(header).toContain('window.matchMedia("(min-width: 1121px)")');
    expect(header).toContain('desktop.addEventListener("change", onDesktop)');
    expect(header).toContain("menuDesktopHandoffRef.current = Boolean(menuDialogRef.current?.open)");
    expect(header).toContain("setOpen(false)");
  });
  it("returns focus to a visible desktop navigation link, not the hidden mobile opener", () => {
    expect(header).toContain("if (menuDesktopHandoffRef.current)");
    expect(header).toContain(".atelier-header__nav .atelier-header__link--active");
    expect(header).toContain("desktopLink?.focus()");
    expect(header).toContain("menuDesktopHandoffRef.current = false");
    expect(header).toContain("menuButtonRef.current?.focus()");
  });
});
