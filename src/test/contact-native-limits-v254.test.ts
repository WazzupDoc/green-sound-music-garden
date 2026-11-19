import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { quoteSchema } from "@/lib/quote";

const valid = {
  name: "Ana Pop",
  phone: "0766566275",
  email: "",
  eventType: "Nuntă" as const,
  location: "",
  message: "",
  consent: true as const,
};

describe("V254 Contact native length / schema parity", () => {
  const form = readFileSync("src/components/site/QuoteForm.tsx", "utf8");

  it.each([
    ["q-name", 80],
    ["q-location", 120],
    ["q-email", 120],
    ["q-message", 1500],
  ])("%s native maxlength matches validation", (id, max) => {
    const control = form.match(new RegExp(`<(?:input|textarea)\\b[^>]*id=["']${id}["'][^>]*>`))?.[0];
    expect(control, `Missing native field ${id}`).toBeDefined();
    expect(control).toContain(`maxLength={${max}}`);
  });

  it.each([
    ["name", 80],
    ["location", 120],
    ["email", 120],
    ["message", 1500],
  ] as const)("rejects %s values exceeding %i characters", (key, max) => {
    const overlong = "a".repeat(max + 1);
    expect(quoteSchema.safeParse({ ...valid, [key]: overlong }).success).toBe(false);
  });

  it("accepts a 1500-character message at the boundary", () => {
    expect(quoteSchema.safeParse({ ...valid, message: "a".repeat(1500) }).success).toBe(true);
  });
});
