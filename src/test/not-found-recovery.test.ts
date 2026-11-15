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

  it("keeps the error retry separate from not-found navigation", () => {
    expect(source).toContain("missing && (");
    expect(source).toContain("onClick={onRetry}");
    expect(source).toContain('to="/"');
  });
});
