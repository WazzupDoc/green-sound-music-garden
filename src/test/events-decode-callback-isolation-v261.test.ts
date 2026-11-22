import { describe, expect, it, vi } from "vitest";
import { preloadEventFrame } from "@/lib/preload-event-frame";

describe("V261 Events decode callback isolation", () => {
  it("does not misreport a successful decode as an image failure if onReady throws", async () => {
    const onError = vi.fn();
    const image = { src: "", decode: vi.fn().mockResolvedValue(undefined) };
    const onReady = vi.fn(() => { throw new Error("consumer render failure"); });
    preloadEventFrame("/verified-event.webp", onReady, () => image, onError);
    await Promise.resolve();
    await Promise.resolve();
    expect(onReady).toHaveBeenCalledOnce();
    expect(onError).not.toHaveBeenCalled();
  });

  it("still reports actual decode rejection exactly once", async () => {
    const onReady = vi.fn();
    const onError = vi.fn();
    const image = { src: "", decode: vi.fn().mockRejectedValue(new Error("decode failed")) };
    preloadEventFrame("/verified-event.webp", onReady, () => image, onError);
    await Promise.resolve();
    await Promise.resolve();
    expect(onReady).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledOnce();
  });
});
