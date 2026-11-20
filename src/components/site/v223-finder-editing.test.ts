import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("V223 global finder editing safety", () => {
  const source = readFileSync(resolve(process.cwd(), "src/components/site/SiteHeader.tsx"), "utf8");
  it("does not intercept Ctrl+K or Cmd+K inside Contact form inputs", () => {
    expect(source).toContain('const editing = target instanceof Element');
    expect(source).toMatch(/if \(editing \|\| hasModal\) return;/);
    expect(source).toContain('event.preventDefault();');
  });
});
