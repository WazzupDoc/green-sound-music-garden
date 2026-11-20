import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

describe("VideoLite start offset guard", () => {
  it("only forwards bounded safe whole seconds to the consented YouTube iframe", () => {
    const source = readFileSync("src/components/site/VideoLite.tsx", "utf8");
    expect(source).toContain('typeof video.start === "number"');
    expect(source).toContain("Number.isSafeInteger(video.start)");
    expect(source).toContain("video.start > 0 && video.start <= 86400");
    expect(source).toContain('params.set("start", String(video.start))');
    expect(source).not.toContain('if (video.start) params.set("start", String(video.start))');
  });
});
