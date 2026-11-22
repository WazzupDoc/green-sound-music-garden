import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "src/routes/evenimente.index.tsx"), "utf8");

describe("Events photo error selection reset", () => {
  it("clears stale photo errors only when mouse/touch changes event", () => {
    expect(source).toMatch(/onClick=\{\(\) => \{ if \(event\.slug !== activeEvent\.slug\) setFailedFrameSlug\(null\); setActiveSlug\(event\.slug\)/);
  });
  it("clears stale photo errors only when keyboard changes event", () => {
    expect(source).toMatch(/if \(nextEvent\.slug !== activeEvent\.slug\) setFailedFrameSlug\(null\);\s*setActiveSlug\(nextEvent\.slug\)/);
  });
});
