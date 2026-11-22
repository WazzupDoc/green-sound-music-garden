import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("finder shortcut and form editing isolation", () => {
  it("does not intercept shortcuts while focus is in editable controls", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/site/SiteHeader.tsx"), "utf8");
    expect(source).toContain('Boolean(target.closest("input, textarea, select, [contenteditable=\\\'true\\\']"))');
    expect(source).toMatch(/if \(!slash && !command\) return;\s*\/\/[^\n]*\n\s*if \(editing\) return;/);
  });
});
