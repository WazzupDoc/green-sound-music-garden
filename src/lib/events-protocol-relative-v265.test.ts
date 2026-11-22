import { describe, expect, it, vi } from "vitest";
import { preloadEventFrame } from "./preload-event-frame";

describe("event photograph protocol-relative source guard", () => {
  it.each(["//example.com/event.webp", "  //example.com/event.webp  ", "//evil.test/a.png"])(
    "rejects a remote protocol-relative source without creating an image: %s",
    (source) => {
      const createImage = vi.fn();
      const ready = vi.fn();
      const error = vi.fn();
      preloadEventFrame(source, ready, createImage, error);
      expect(createImage).not.toHaveBeenCalled();
      expect(ready).not.toHaveBeenCalled();
      expect(error).toHaveBeenCalledTimes(1);
    },
  );

  it.each(["/events/real.webp", "./events/real.webp", "https://example.com/event.webp"])(
    "preserves supported sources: %s",
    async (source) => {
      const ready = vi.fn();
      const error = vi.fn();
      const image = { src: "", decode: () => Promise.resolve() };
      preloadEventFrame(source, ready, () => image, error);
      await Promise.resolve();
      await Promise.resolve();
      expect(image.src).toBe(source);
      expect(ready).toHaveBeenCalledTimes(1);
      expect(error).not.toHaveBeenCalled();
    },
  );
});
