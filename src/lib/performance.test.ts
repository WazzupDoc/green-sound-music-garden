import { describe, expect, it } from "vitest";
import { shouldUseLiteEffects } from "./performance";

describe("adaptive performance without device profiling or stored data", () => {
  it("uses full effects when all non-Baseline device APIs are missing", () => {
    expect(shouldUseLiteEffects({})).toBe(false);
    expect(shouldUseLiteEffects({ hardwareConcurrency: 2 })).toBe(false);
    expect(shouldUseLiteEffects({ deviceMemory: 4 })).toBe(false);
  });

  it("respects users' reduced-motion and Save-Data preferences", () => {
    expect(shouldUseLiteEffects({ reducedMotion: true })).toBe(true);
    expect(shouldUseLiteEffects({ saveData: true })).toBe(true);
    expect(shouldUseLiteEffects({ saveData: false, reducedMotion: false })).toBe(false);
  });

  it("degrades gracefully on very slow connections", () => {
    expect(shouldUseLiteEffects({ effectiveType: "slow-2g" })).toBe(true);
    expect(shouldUseLiteEffects({ effectiveType: "2g" })).toBe(true);
    expect(shouldUseLiteEffects({ effectiveType: "3g" })).toBe(false);
    expect(shouldUseLiteEffects({ effectiveType: "4g" })).toBe(false);
  });

  it("uses hardware hints only when low memory is corroborated", () => {
    expect(shouldUseLiteEffects({ deviceMemory: 2 })).toBe(true);
    expect(shouldUseLiteEffects({ deviceMemory: 4, hardwareConcurrency: 4 })).toBe(true);
    expect(shouldUseLiteEffects({ deviceMemory: 4, hardwareConcurrency: 8 })).toBe(false);
    expect(shouldUseLiteEffects({ deviceMemory: 8, hardwareConcurrency: 2 })).toBe(false);
    expect(shouldUseLiteEffects({ deviceMemory: 0, hardwareConcurrency: 2 })).toBe(false);
  });
});
