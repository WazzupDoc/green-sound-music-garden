import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("V237 lightbox filmstrip privacy", () => {
  it("does not request remote YouTube thumbnails before Play", () => {
    const source = readFileSync("src/components/site/MediaLightbox.tsx", "utf8");
    expect(source).not.toContain("i.ytimg.com");
    expect(source).toContain('it.kind === "video" ? (');
    expect(source).toContain("youtube-nocookie.com/embed/");
    expect(source).toContain("onClick={() => setPlaying(true)}");
  });
});
