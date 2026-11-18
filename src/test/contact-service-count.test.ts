import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const source = readFileSync("src/components/site/QuoteForm.tsx", "utf8");

describe("Contact service selection summary", () => {
  it("excludes the advice request from the count and the eight-service limit", () => {
    expect(source).toContain('const selectedServiceCount = chosenServices.filter(label => label !== ADVICE_SERVICE_LABEL).length;');
    expect(source).toContain('const wantsAdvice = chosenServices.includes(ADVICE_SERVICE_LABEL);');
    expect(source).toContain('const atLimit = selectedServiceCount >= MAX_QUOTE_SERVICES;');
    expect(source).toContain('RECOMANDARE SOLICITATĂ');
    expect(source).toContain('SERVICII SELECTATE');
  });
});
