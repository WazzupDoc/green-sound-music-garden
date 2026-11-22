import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "src/routes/evenimente.index.tsx"), "utf8");

describe("V258 Events retry continuity", () => {
  it("preserves failed-photo retry on pointer re-selection of active category", () => {
    expect(source).toContain("if (event.slug !== activeEvent.slug) setFailedFrameSlug(null)");
  });
  it("preserves failed-photo retry on keyboard re-selection of active category", () => {
    expect(source).toContain("if (nextEvent.slug !== activeEvent.slug) setFailedFrameSlug(null)");
  });
});
