import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("V256 film keyboard focus", () => {
  it("keeps the poster Play action visible to keyboard users", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/site/VideoLite.tsx"), "utf8");
    expect(source).toContain("focus-visible:outline-[#B5F4C5]");
    expect(source).toContain("focus-visible:-outline-offset-[3px]");
    expect(source).toContain("aria-label={`Redă videoclipul: ${video.title}`}");
  });
});
