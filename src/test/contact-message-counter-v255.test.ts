import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

describe("V255 Contact message feedback", () => {
  const source = readFileSync("src/components/site/QuoteForm.tsx", "utf8");
  it("watches the actual message value and shows the native 1500-character limit", () => {
    expect(source).toContain('useWatch({ control, name: "message" })');
    expect(source).toContain('{messageLength} / 1500 caractere');
    expect(source).toContain('maxLength={1500}');
  });
  it("associates the counter with the textarea in both valid and invalid states", () => {
    expect(source).toContain('aria-describedby={errors.message ? "q-message-count q-msg-err" : "q-message-count"}');
    expect(source).toContain('id="q-message-count"');
  });
});
