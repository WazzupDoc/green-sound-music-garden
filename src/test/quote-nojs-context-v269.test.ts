import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "src/components/site/blocks.tsx"), "utf8");

describe("V269 no-JS quote context", () => {
  it("shows event and service selection in the server fallback", () => {
    expect(source).toContain("Selecția ta pentru ofertă");
    expect(source).toContain("Tip eveniment: {defaultEventType}");
    expect(source).toContain("Servicii: {defaultServices.join(\", \")}");
    expect(source).toContain("Menționează aceste detalii în email sau la telefon.");
  });
  it("retains real contact actions and does not claim automatic delivery", () => {
    expect(source).toContain("Trimite un email pentru ofertă");
    expect(source).toContain("Sună pentru detalii");
    expect(source).toContain("Niciun mesaj nu este trimis automat.");
  });
});
