import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve(process.cwd(), "src/components/site/QuoteForm.tsx"), "utf8");

describe("V254 Contact clipboard pending keyboard focus", () => {
  it("retains the copy control in keyboard focus order while async clipboard permission is pending", () => {
    expect(source).toContain('aria-disabled={copyStatus === "pending"} aria-busy={copyStatus === "pending"}');
    expect(source).not.toContain('disabled={copyStatus === "pending"}');
  });
  it("guards duplicate clipboard requests even when the button remains focusable", () => {
    expect(source).toContain("if (copyPendingRef.current) return;");
    expect(source).toContain('onClick={() => { void copyMessage(message); }}');
  });
});
