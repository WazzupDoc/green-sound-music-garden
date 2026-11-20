import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("V218 consented video permission boundary", () => {
  const source = readFileSync(resolve(process.cwd(), "src/components/site/VideoLite.tsx"), "utf8");
  it("does not grant sensors or clipboard access to third-party playback", () => {
    expect(source).toContain('allow="autoplay; encrypted-media; picture-in-picture"');
    expect(source).not.toMatch(/allow="[^"]*(accelerometer|gyroscope|clipboard-write)/);
  });
  it("preserves explicit click-to-play, referrer privacy and Stop", () => {
    expect(source).toMatch(/onClick=\{\(\) => \{ if \(validVideoId\) setActive\(true\); \}\}/);
    expect(source).toContain('disabled={!validVideoId}');
    expect(source).toContain('referrerPolicy="no-referrer"');
    expect(source).toContain('onClick={stopPlayback}');
    expect(source).toContain('youtube-nocookie.com/embed/');
  });
});
