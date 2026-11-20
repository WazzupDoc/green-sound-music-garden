import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { quoteSchema } from "../lib/quote";

describe("V260 Contact phone length guard", () => {
  it("keeps the native maximum aligned with the schema", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/site/QuoteForm.tsx"), "utf8");
    expect(source).toMatch(/id="q-phone"[^>]*maxLength=\{32\}/);
  });

  it("accepts a formatted Romanian mobile number and rejects oversized values", () => {
    const base = {
      name: "Test Client", phone: "+40 (766) 566 275", email: "",
      eventType: "Nuntă", date: "", location: "", guests: "",
      services: [], message: "", consent: true, website: "",
    };
    expect(quoteSchema.safeParse(base).success).toBe(true);
    expect(quoteSchema.safeParse({ ...base, phone: "9".repeat(33) }).success).toBe(false);
  });
});
