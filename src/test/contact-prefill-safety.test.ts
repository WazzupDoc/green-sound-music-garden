import { describe, expect, it } from "vitest";
import { validateBrief } from "../routes/contact";

describe("Contact query prefill safety", () => {
  it("removes bidi controls, line breaks and non-printing characters from location", () => {
    expect(validateBrief({ location: "Pitești\u202e\n\t, Argeș\u0000" }).location)
      .toBe("Pitești , Argeș");
  });

  it("bounds the location and ignores non-string values", () => {
    expect(validateBrief({ location: "A".repeat(250) }).location).toHaveLength(120);
    expect(validateBrief({ location: { unsafe: true } }).location).toBeUndefined();
  });


  it("rejects locations made only of controls and very long query values", () => {
    expect(validateBrief({ location: "\u202e\u0000\\n" }).location).toBeUndefined();
    expect(validateBrief({ location: "X".repeat(2001) }).location).toBeUndefined();
    expect(validateBrief({ location: " Pitești " }).location).toBe("Pitești");
  });

  it("does not accept an unknown service from URL", () => {
    expect(validateBrief({ services: "not-an-actual-service" }).services).toBeUndefined();
  });
});
