import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

// Source contract: the discard action must clear both the visible preview and
// react-hook-form's retained values; hiding the preview alone is insufficient.
describe("V203 contact private-brief discard", () => {
  const source = readFileSync("src/components/site/QuoteForm.tsx", "utf8");
  it("offers a distinct, explicitly labelled discard action", () => {
    expect(source).toContain("Renunță și șterge datele din formular");
    expect(source).toContain("quote-preview__discard");
  });
  it("clears retained identity, event, service and consent values", () => {
    const action = source.split('className="quote-preview__discard"')[1]?.split("</button>")[0] ?? "";
    for (const field of ['name: ""', 'phone: ""', 'email: ""', 'date: ""',
      'location: ""', 'guests: ""', 'services: []', 'message: ""', 'website: ""']) {
      expect(action).toContain(field);
    }
    expect(action).toContain("reset({");
    expect(action).toContain("setPrepared(null)");
    expect(action).toContain("++copyGenerationRef.current");
  });
});
