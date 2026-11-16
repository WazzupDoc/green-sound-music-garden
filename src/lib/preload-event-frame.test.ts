import { describe, expect, it, vi } from "vitest";
import { preloadEventFrame } from "./preload-event-frame";

function deferred() {
  let resolve!: () => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<void>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
const tick = async () => { await Promise.resolve(); await Promise.resolve(); };

describe("event stage image decode", () => {
  it("switches only after a successful decode", async () => {
    const pending = deferred();
    const ready = vi.fn();
    const image = { src: "", decode: () => pending.promise };
    preloadEventFrame("/real-event.webp", ready, () => image);
    expect(image.src).toBe("/real-event.webp");
    expect(ready).not.toHaveBeenCalled();
    pending.resolve();
    await tick();
    expect(ready).toHaveBeenCalledTimes(1);
  });

  it("retains the last valid frame on decode rejection", async () => {
    const pending = deferred();
    const ready = vi.fn();
    preloadEventFrame("/missing.webp", ready, () => ({ src: "", decode: () => pending.promise }));
    pending.reject(new Error("decode failed"));
    await tick();
    expect(ready).not.toHaveBeenCalled();
  });

  it("ignores a completed decode after the selection was superseded", async () => {
    const pending = deferred();
    const ready = vi.fn();
    const cancel = preloadEventFrame("/slow.webp", ready, () => ({ src: "", decode: () => pending.promise }));
    cancel();
    pending.resolve();
    await tick();
    expect(ready).not.toHaveBeenCalled();
  });
});
