import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve(process.cwd(), "src/components/site/QuoteForm.tsx"), "utf8");

describe("V246 Contact clipboard keyboard continuity", () => {
  it("retains a manual-copy fallback after clipboard rejection", () => {
    expect(source).toContain('setCopyStatus("failed")');
    expect(source).toContain('ref={manualCopyRef}');
    expect(source).toContain('readOnly rows={6} value={message}');
  });
  it("does not steal focus when visitor navigated elsewhere during a pending copy", () => {
    expect(source).toContain('document.activeElement === copyButtonRef.current || document.activeElement === document.body');
    expect(source).toContain('if (restoreManualCopyFocusRef.current)');
    expect(source).toContain('restoreManualCopyFocusRef.current = false;');
  });
});
