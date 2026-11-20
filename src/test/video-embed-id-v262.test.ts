import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

describe("VideoLite embed URL guard", () => {
  it("requires a canonical 11-character YouTube identifier before mounting the player", () => {
    const source = readFileSync("src/components/site/VideoLite.tsx", "utf8");
    expect(source).toContain("/^[A-Za-z0-9_-]{11}$/.test(video.id)");
    expect(source).toContain("validVideoId && active");
    expect(source).toContain("disabled={!validVideoId}");
  });
});
