import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "src/components/site/blocks.tsx"), "utf8");

describe("V269 no-JS quote context", () => {
  it("shows event and service selection in the server fallback", () => {
    expect(source).toContain("Selecția ta pentru ofertă");
    expect(source).toContain("Tip eveniment: {defaultEventType}");
    expect(source).toContain("Servicii: {defaultServices.join(\", \")}");
    expect(source).toContain("Selecția este inclusă în mesajele pregătite pentru email și WhatsApp.");
    expect(source).toContain("Verifică și completează detaliile înainte de trimitere.");
  });
  it("retains real contact actions and does not claim automatic delivery", () => {
    expect(source).toContain("Deschide emailul pentru ofertă (mesaj pregătit, netrimis)");
    expect(source).toContain("Deschide WhatsApp pentru ofertă (mesaj pregătit, netrimis)");
    expect(source).toContain("Sună pentru detalii");
    expect(source).toContain("Niciun mesaj nu este trimis automat.");
  });
});
