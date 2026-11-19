import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("finder keyboard ownership", () => {
  const source = readFileSync(resolve(process.cwd(), "src/components/site/SiteHeader.tsx"), "utf8");

  it("does not intercept command shortcuts in editing controls or open dialogs", () => {
    expect(source).toContain('const editing = target instanceof Element');
    expect(source).toContain('const hasModal = Boolean(document.querySelector');
    expect(source).toContain('if (editing || hasModal) return;');
    expect(source).toContain('if (!slash && !command) return;');
  });
});
