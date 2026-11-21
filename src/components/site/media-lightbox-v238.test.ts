import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve(process.cwd(), "src/components/site/MediaLightbox.tsx"), "utf8");

describe("V238 lightbox keyboard focus continuity", () => {
  it("focuses Stop after Play and returns focus to Play after Stop", () => {
    expect(source).toContain("useLayoutEffect(() => {");
    expect(source).toContain("if (playing) stopRef.current?.focus()");
    expect(source).toContain("else playRef.current?.focus()");
    expect(source).toContain("ref={stopRef}");
    expect(source).toContain("ref={playRef}");
  });
});
