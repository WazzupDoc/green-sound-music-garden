import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync("src/components/site/VideoLite.tsx", "utf8");

describe("V204 explicit film stop control", () => {
  it("does not mount a third-party iframe before visitor consent", () => {
    expect(source).toContain("{active ? (");
    expect(source).toContain("youtube-nocookie.com/embed/");
    expect(source).toContain("onClick={() => setActive(true)}");
  });
  it("unmounts the playing iframe and restores focus to the play button", () => {
    expect(source).toContain("const stopPlayback = () =>");
    expect(source).toContain("setActive(false)");
    expect(source).toContain("useLayoutEffect(() => {");
    expect(source).toContain("restoreFocusRef.current = true");
    expect(source).toContain("if (!active && restoreFocusRef.current)");
    expect(source).toContain("playButtonRef.current?.focus()");
    expect(source).not.toContain("requestAnimationFrame(() => playButtonRef.current?.focus())");
    expect(source).toContain("onClick={stopPlayback}");
    expect(source).toContain("ref={playButtonRef}");
    expect(source).toContain("Oprește filmarea:");
  });
  it("preserves descriptive title, native buttons and no automatic playback before click", () => {
    expect(source).toContain("title={video.title}");
    expect(source).toContain('type="button"');
    expect(source).toContain('aria-label={`Redă videoclipul: ${video.title}`}');
    expect(source).not.toContain("<video autoPlay");
  });
});
