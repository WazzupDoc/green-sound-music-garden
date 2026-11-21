import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { preloadEventFrame } from "@/lib/preload-event-frame";

const route = readFileSync(resolve(process.cwd(), "src/routes/evenimente.index.tsx"), "utf8");

describe("V250 Events image failure provenance", () => {
  it("announces loading and failed decoding without misidentifying the retained photograph", () => {
    expect(route).toContain('const frameFailed = framePending && failedFrameSlug === activeEvent.slug');
    expect(route).toContain('role="status" aria-live="polite"');
    expect(route).toContain("Fotografia selectată nu s-a putut încărca.");
    expect(route).toContain("Se încarcă fotografia selectată");
  });

  it("reports a rejected decode for the current image", async () => {
    const onError = vi.fn();
    const onReady = vi.fn();
    preloadEventFrame("/broken.webp", onReady, () => ({
      src: "",
      decode: () => Promise.reject(new Error("decode failed")),
    }), onError);
    await Promise.resolve();
    await Promise.resolve();
    expect(onError).toHaveBeenCalledOnce();
    expect(onReady).not.toHaveBeenCalled();
  });

  it("reports a synchronous decode exception without throwing from the route", () => {
    const onReady = vi.fn();
    const onError = vi.fn();
    expect(() => preloadEventFrame("/broken.webp", onReady, () => ({
      src: "",
      decode: () => { throw new Error("synchronous decode failure"); },
    }), onError)).not.toThrow();
    expect(onError).toHaveBeenCalledOnce();
    expect(onReady).not.toHaveBeenCalled();
  });

  it("reports a synchronous image creation exception", () => {
    const onError = vi.fn();
    expect(() => preloadEventFrame("/broken.webp", vi.fn(), () => {
      throw new Error("image constructor unavailable");
    }, onError)).not.toThrow();
    expect(onError).toHaveBeenCalledOnce();
  });

  it("does not report a stale failure after the selection is superseded", async () => {
    let rejectDecode: (reason?: unknown) => void = () => {};
    const onError = vi.fn();
    const cancel = preloadEventFrame("/slow.webp", vi.fn(), () => ({
      src: "",
      decode: () => new Promise<void>((_, reject) => { rejectDecode = reject; }),
    }), onError);
    cancel();
    rejectDecode(new Error("stale"));
    await Promise.resolve();
    await Promise.resolve();
    expect(onError).not.toHaveBeenCalled();
  });
});
