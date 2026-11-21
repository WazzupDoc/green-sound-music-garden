import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Events image retry focus", () => {
  it("restores focus to the selected event when the retry button disappears", () => {
    const source = readFileSync(resolve(process.cwd(), "src/routes/evenimente.index.tsx"), "utf8");
    expect(source).toContain('setFrameRetry(n => n + 1); document.querySelectorAll<HTMLButtonElement>(".gs173-setlist__select")[activeIndex - 1]?.focus()');
    expect(source).toContain("aria-pressed={selected}");
  });
});
