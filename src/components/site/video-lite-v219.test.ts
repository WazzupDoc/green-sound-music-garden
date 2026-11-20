import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("V219 film replacement requires new consent", () => {
  const source = readFileSync(resolve(process.cwd(), "src/components/site/VideoLite.tsx"), "utf8");
  it("tracks film identity and resets active playback on identity change", () => {
    expect(source).toContain("const previousVideoIdRef = useRef(video.id)");
    expect(source).toContain("previousVideoIdRef.current !== video.id");
    expect(source).toContain("setActive(false)");
    expect(source).toContain("}, [video.id])");
  });
  it("does not mount a replacement iframe in the render before effects run", () => {
    expect(source).toContain("const canRenderPlayer = validVideoId && active && previousVideoIdRef.current === video.id");
    expect(source).toContain("{canRenderPlayer ? (");
    expect(source).not.toContain("{active ? (");
  });
  it("preserves explicit Play and accessible focus restoration", () => {
    expect(source).toContain("onClick={() => { if (validVideoId) setActive(true); }}");
    expect(source).toContain("restoreFocusRef.current = true");
    expect(source).toContain("playButtonRef.current?.focus()");
  });
});
