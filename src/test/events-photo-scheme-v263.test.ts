import { describe, expect, it, vi } from "vitest";
import { preloadEventFrame } from "@/lib/preload-event-frame";

describe("V263 event photograph scheme safety", () => {
  it.each(["javascript:alert(1)", "data:image/svg+xml,<svg/>", "blob:https://example.com/id", "file:///tmp/a.jpg"])(
    "rejects unsupported source %s without constructing an Image",
    (src) => {
      const factory = vi.fn();
      const failed = vi.fn();
      const ready = vi.fn();
      preloadEventFrame(src, ready, factory, failed);
      expect(factory).not.toHaveBeenCalled();
      expect(ready).not.toHaveBeenCalled();
      expect(failed).toHaveBeenCalledOnce();
    },
  );

  it.each(["/events/real.webp", "./real.webp", "https://example.com/real.webp", "http://example.com/real.jpg"])(
    "accepts ordinary photo source %s",
    async (src) => {
      const image = { src: "", decode: vi.fn().mockResolvedValue(undefined) };
      const ready = vi.fn();
      const failed = vi.fn();
      preloadEventFrame(src, ready, () => image, failed);
      await Promise.resolve();
      expect(image.src).toBe(src);
      expect(ready).toHaveBeenCalledOnce();
      expect(failed).not.toHaveBeenCalled();
    },
  );
});
