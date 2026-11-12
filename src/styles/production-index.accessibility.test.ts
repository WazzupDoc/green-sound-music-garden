import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const css = readFileSync(fileURLToPath(new URL("./production-index.css", import.meta.url)), "utf8");

describe("editorial keyboard focus cue", () => {
  it("exposes a visual focus cue on the chapter and preserves native link focus", () => {
    expect(css).toContain(".gs-index__chapter:focus-within .gs-index__photo");
    expect(css).toContain(".gs-index__service:focus-visible");
  });
  it("limits focus zoom to non-reduced-motion and non-Lite experiences", () => {
    expect(css).toContain("@media (prefers-reduced-motion:no-preference)");
    expect(css).toContain("html:not([data-gs-performance=lite]) .gs-index__chapter:focus-within");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
  });
});
