import { describe, expect, it } from "vitest";
import { events, services } from "@/data/site";
import { ADVICE_SERVICE_LABEL, MAX_QUOTE_SERVICES, quoteSchema } from "@/lib/quote";
import { quoteRecommendations, toggleQuoteService } from "./quote-service-guidance";

describe("Green Sound guided quote choices", () => {
  const labels = services.map(service => service.formLabel);
  it("recommends only authentic, curated services for actual company events", () => {
    for (const event of events) {
      const suggestions = quoteRecommendations(event.formLabel);
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions.length).toBeLessThanOrEqual(4);
      expect(new Set(suggestions.map(s => s.slug)).size).toBe(suggestions.length);
      for (const item of suggestions) {
        expect(labels).toContain(item.label);
        expect(event.recommended.map(rec => rec.slug)).toContain(item.slug);
        expect(item.why.length).toBeGreaterThan(10);
      }
    }
    expect(quoteRecommendations("Studio înregistrări")).toEqual([]);
    expect(quoteRecommendations("Unknown event")).toEqual([]);
    expect(quoteRecommendations()).toEqual([]);
  });

  it("suggestions never auto-select anything", () => {
    const source: string[] = [];
    quoteRecommendations("Nuntă");
    expect(source).toEqual([]);
  });

  it("selects genuine services at most once, up to the exact catalogue limit", () => {
    expect(MAX_QUOTE_SERVICES).toBe(8);
    let chosen: string[] = [];
    for (const label of labels) chosen = toggleQuoteService(chosen, label);
    expect(chosen).toEqual(labels);
    expect(chosen).toHaveLength(MAX_QUOTE_SERVICES);
    expect(toggleQuoteService(chosen, "Invented event service")).toEqual(chosen);
    expect(toggleQuoteService(chosen, labels[0]!)).toHaveLength(7);
    expect(toggleQuoteService(chosen, ADVICE_SERVICE_LABEL)).toEqual([ADVICE_SERVICE_LABEL]);
  });

  it("advice for me is exclusive, reversible and never leaves contradictory selections", () => {
    expect(toggleQuoteService([], ADVICE_SERVICE_LABEL)).toEqual([ADVICE_SERVICE_LABEL]);
    expect(toggleQuoteService([ADVICE_SERVICE_LABEL], ADVICE_SERVICE_LABEL)).toEqual([]);
    expect(toggleQuoteService([labels[0]!, labels[1]!], ADVICE_SERVICE_LABEL)).toEqual([ADVICE_SERVICE_LABEL]);
    expect(toggleQuoteService([ADVICE_SERVICE_LABEL], labels[0]!)).toEqual([labels[0]!]);
    expect(toggleQuoteService([labels[0]!, labels[0]!], labels[0]!)).toEqual([]);
  });

  it("rejects a forged mixed advice selection at the schema boundary", () => {
    const base = {
      name: "Ana Test",
      phone: "0766 566 275",
      email: "",
      eventType: "Nuntă",
      date: "",
      location: "",
      guests: "",
      services: [labels[0]!],
      message: "",
      consent: true,
      website: "",
    };
    expect(quoteSchema.safeParse(base).success).toBe(true);
    expect(quoteSchema.safeParse({ ...base, services: [ADVICE_SERVICE_LABEL] }).success).toBe(true);
    expect(quoteSchema.safeParse({ ...base, services: [labels[0]!, ADVICE_SERVICE_LABEL] }).success).toBe(false);
    expect(quoteSchema.safeParse({ ...base, services: labels }).success).toBe(true);
    expect(quoteSchema.safeParse({ ...base, services: [...labels, ADVICE_SERVICE_LABEL] }).success).toBe(false);
  });
});
