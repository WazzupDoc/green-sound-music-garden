import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Vitest/Vite may rewrite import.meta.url to a non-file URL in CI.
const source = readFileSync(resolve(process.cwd(), "src/components/site/QuoteForm.tsx"), "utf8");

describe("V212 Contact privacy discard confirmation", () => {
  it("confirms local clearing without claiming a message was sent", () => {
    expect(source).toContain("setDiscardConfirmed(true)");
    expect(source).toContain("Datele introduse au fost șterse din acest formular.");
    expect(source).toContain("Nu a fost trimis niciun mesaj.");
    expect(source).toContain('role="status" aria-live="polite"');
  });
  it("clears stale confirmation when a new preview is prepared", () => {
    expect(source).toContain("setDiscardConfirmed(false);");
  });
});
