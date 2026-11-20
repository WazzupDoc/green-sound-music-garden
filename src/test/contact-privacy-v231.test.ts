import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const source = readFileSync("src/components/site/QuoteForm.tsx", "utf8");

describe("V231 Contact privacy-policy handoff", () => {
  it("keeps the draft mounted while opening privacy information separately", () => {
    expect(source).toMatch(/<Link to="\/confidentialitate" target="_blank" rel="noopener noreferrer"/);
    expect(source).toContain('aria-label="Politica de confidențialitate (se deschide într-o filă nouă)"');
    expect(source).toContain('(filă nouă)');
  });
});
