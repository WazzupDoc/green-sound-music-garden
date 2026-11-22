import { describe, expect, it, vi } from "vitest";
import { preloadEventFrame } from "@/lib/preload-event-frame";

describe("V260 Events blank photo source", () => {
  it.each(["", " ", "\n\t"])("rejects blank source %j without requesting an image", (src) => {
    const createImage = vi.fn();
    const onReady = vi.fn();
    const onError = vi.fn();
    preloadEventFrame(src, onReady, createImage, onError);
    expect(createImage).not.toHaveBeenCalled();
    expect(onReady).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledOnce();
  });

  it("keeps the valid image decoding path unchanged", async () => {
    const onReady = vi.fn();
    const onError = vi.fn();
    const image = { src: "", decode: vi.fn().mockResolvedValue(undefined) };
    preloadEventFrame("/verified-event.webp", onReady, () => image, onError);
    await Promise.resolve();
    await Promise.resolve();
    expect(image.src).toBe("/verified-event.webp");
    expect(onReady).toHaveBeenCalledOnce();
    expect(onError).not.toHaveBeenCalled();
  });
});
