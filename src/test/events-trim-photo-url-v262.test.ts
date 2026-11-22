import { describe, expect, it, vi } from "vitest";
import { preloadEventFrame } from "@/lib/preload-event-frame";

describe("V262 Events photo URL normalization", () => {
  it("trims surrounding whitespace before requesting a valid photograph", async () => {
    const image = { src: "", decode: vi.fn().mockResolvedValue(undefined) };
    const ready = vi.fn();
    const failed = vi.fn();
    preloadEventFrame("  /event-photo.webp\n", ready, () => image, failed);
    await Promise.resolve();
    await Promise.resolve();
    expect(image.src).toBe("/event-photo.webp");
    expect(ready).toHaveBeenCalledOnce();
    expect(failed).not.toHaveBeenCalled();
  });

  it("does not call ready after cancellation", async () => {
    let resolveDecode!: () => void;
    const image = { src: "", decode: () => new Promise<void>((resolve) => { resolveDecode = resolve; }) };
    const ready = vi.fn();
    const cancel = preloadEventFrame(" /event-photo.webp ", ready, () => image);
    cancel();
    resolveDecode();
    await Promise.resolve();
    await Promise.resolve();
    expect(ready).not.toHaveBeenCalled();
  });
});
