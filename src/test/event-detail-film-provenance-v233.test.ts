import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync("src/components/site/EventPage.tsx", "utf8");

describe("V233 event detail film provenance", () => {
  it("does not claim unverified ownership of video footage", () => {
    expect(source).not.toContain("Filmări din arhiva Green Sound");
    expect(source).toContain("fără a confirma participarea Green Sound");
  });
  it("retains consent-based video playback", () => {
    expect(source).toContain("<VideoLite key={video.id} video={video}/>");
    expect(source).toContain("Filmele nu pornesc automat");
  });
});
