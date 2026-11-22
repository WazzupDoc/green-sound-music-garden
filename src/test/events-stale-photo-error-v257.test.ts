import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "src/routes/evenimente.index.tsx"), "utf8");

describe("V257 Events photo error selection reset", () => {
  it("clears stale photo errors on mouse/touch event selection", () => {
    expect(source).toMatch(/onClick=\{\(\) => \{ setFailedFrameSlug\(null\); setActiveSlug\(event\.slug\)/);
  });
  it("clears stale photo errors on keyboard setlist navigation", () => {
    expect(source).toMatch(/setFailedFrameSlug\(null\);\s*setActiveSlug\(nextEvent\.slug\)/);
  });
});
