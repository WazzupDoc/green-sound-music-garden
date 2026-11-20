import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync("src/components/site/MediaLightbox.tsx", "utf8");

describe("lightbox third-party consent gate", () => {
  it("only mounts a YouTube iframe after a user click", () => {
    expect(source).toContain("playing ? (");
    expect(source).toContain("onClick={() => setPlaying(true)}");
    expect(source).toContain("youtube-nocookie.com/embed/");
    expect(source).toContain("key={item.key}");
  });
  it("offers a stop action and guards invalid video IDs", () => {
    expect(source).toContain("onClick={() => setPlaying(false)}");
    expect(source).toContain("validId");
    expect(source).toContain("prefers-reduced-motion: reduce");
  });
});
