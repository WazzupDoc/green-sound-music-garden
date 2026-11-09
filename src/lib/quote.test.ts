import { describe, expect, it } from "vitest";
import { buildQuoteMessage, quoteSchema, whatsappUrl } from "./quote";

const valid = {
  name: "Ana Popescu",
  phone: "0766 566 275",
  email: "",
  eventType: "Nuntă",
  date: "2027-06-12",
  location: "Pitești",
  guests: "100–200",
  services: ["DJ & MC", "Fum greu / baloane cu fum"],
  message: "",
  consent: true,
  website: "",
} as const;

describe("quote request", () => {
  it("accepts a Romanian mobile number written with spaces", () => {
    expect(quoteSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects a non-mobile phone number", () => {
    expect(quoteSchema.safeParse({ ...valid, phone: "0248 123 456" }).success).toBe(false);
  });

  it("rejects the request without GDPR consent", () => {
    expect(quoteSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });

  it("rejects bots that fill the hidden honeypot field", () => {
    expect(quoteSchema.safeParse({ ...valid, website: "http://spam" }).success).toBe(false);
  });

  it("builds a WhatsApp link to 0766 566 275 with the event details", () => {
    const q = quoteSchema.parse(valid);
    const msg = buildQuoteMessage(q);
    expect(msg).toContain("Data: 12.06.2027");
    expect(msg).toContain("Servicii: DJ & MC, Fum greu / baloane cu fum");
    expect(whatsappUrl(msg).startsWith("https://wa.me/40766566275?text=")).toBe(true);
  });
});
