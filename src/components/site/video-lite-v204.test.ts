import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync("src/components/site/VideoLite.tsx", "utf8");

describe("V204 explicit film stop control", () => {
  it("does not mount a third-party iframe before visitor consent", () => {
    expect(source).toContain("{canRenderPlayer ? (");
    expect(source).toContain("const canRenderPlayer = safeVideoId && active && previousVideoIdRef.current === video.id;");
    expect(source).toContain("youtube-nocookie.com/embed/");
    expect(source).toContain("{video.poster && failedPoster !== video.poster ? (");
    expect(source).toContain("onError={() => setFailedPoster(video.poster ?? null)}");
    expect(source).toContain("failedPoster !== video.poster");
    expect(source).toContain("src={video.poster}");
    expect(source).not.toContain("i.ytimg.com");
    expect(source).toContain('referrerPolicy="no-referrer"');
    expect(source).toContain("onClick={() => { if (safeVideoId) setActive(true); }}");
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
  it("moves focus to the visible stop button after play mounts the iframe", () => {
    expect(source).toContain("const stopButtonRef = useRef<HTMLButtonElement>(null)");
    expect(source).toContain("if (active) stopButtonRef.current?.focus()");
    expect(source).toContain("ref={stopButtonRef}");
  });
  it("preserves descriptive title, native buttons and no automatic playback before click", () => {
    expect(source).toContain("title={video.title}");
    expect(source).toContain('type="button"');
    expect(source).toContain('aria-label={safeVideoId ? `Redă videoclipul: ${video.title}` : `Videoclip indisponibil: ${video.title}`}');
    expect(source).toContain("disabled={!safeVideoId}");
    expect(source).not.toContain("<video autoPlay");
  });
});
