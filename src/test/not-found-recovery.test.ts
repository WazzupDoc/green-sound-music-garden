import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("../components/site/StageFallback.tsx", import.meta.url)), "utf8");

describe("404 recovery navigation", () => {
  it("offers real service, event and Contact brief routes without simulating a search", () => {
    expect(source).toContain('to="/servicii"');
    expect(source).toContain('to="/evenimente"');
    expect(source).toContain('to="/contact" hash="contact-form-title"');
    expect(source).toContain('aria-label="Alte pagini utile"');
  });

  it("offers a direct accessible Contact route for render failures", () => {
    expect(source).toContain('aria-label="Contact în caz de eroare"');
    expect(source).toContain("Contactează echipa Green Sound");
    expect(source).toContain('to="/contact" hash="contact-form-title"');
    expect(source).toContain("!missing && (");
  });

  it("labels the telephone as a clear call action", () => {
    expect(source).toContain('className="rs-404__phone">Sună-ne: {business.phoneDisplay}');
    expect(source).toContain('href={business.phoneHref}');
  });

  it("keeps the error retry separate from not-found navigation", () => {
    expect(source).toContain("missing && (");
    expect(source).toContain("Pagina nu poate fi afișată.");
    expect(source).not.toContain("Am pierdut legătura cu pagina.");
    expect(source).toContain("onRetry ? <button");
    expect(source).toContain("onClick={onRetry}");
    expect(source).toContain('onRetry\n            ? "Poți încerca din nou încărcarea.');
    expect(source).toContain('Pagina nu este disponibilă momentan. Poți reveni acasă');
    expect(source).toContain('to="/"');
  });
});
