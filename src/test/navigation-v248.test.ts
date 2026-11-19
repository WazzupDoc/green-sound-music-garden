import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

describe("V248 finder keyboard shortcut", () => {
  const header = readFileSync("src/components/site/SiteHeader.tsx", "utf8");
  it("dismisses the desktop service directory before opening finder", () => {
    const shortcut = header.slice(header.indexOf('const onKey = (event: KeyboardEvent) => {'), header.indexOf('document.addEventListener("keydown", onKey)'));
    expect(shortcut).toContain('setServicesOpen(false);');
    expect(shortcut.indexOf('setServicesOpen(false);')).toBeLessThan(shortcut.indexOf('setFinderOpen(previous => !previous);'));
  });
  it("does not intercept shortcuts while editing or another modal is open", () => {
    expect(header).toContain('if (editing || hasModal) return;');
  });
});
