import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("V259 discarded brief URL privacy", () => {
  it("clears all allowlisted brief parameters on explicit discard without changing the path", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/site/QuoteForm.tsx"), "utf8");
    expect(source).toContain('for (const key of ["event", "date", "location", "services"]) url.searchParams.delete(key)');
    expect(source).toContain('window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash)');
    expect(source).toContain("url.searchParams.delete(key)");
  });
});
