import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Source regression only: browser keyboard/assistive-technology verification remains required.
describe("V250 mobile directory modified keys", () => {
  it("does not capture Shift-modified arrow/Home/End navigation", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/site/SiteHeader.tsx"), "utf8");
    expect(source).toMatch(/if \(event\.altKey \|\| event\.ctrlKey \|\| event\.metaKey \|\| event\.shiftKey\) return;/);
    expect(source).toContain('event.preventDefault();\n    links[next]?.focus();');
  });
});
