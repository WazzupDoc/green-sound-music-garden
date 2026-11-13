import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const source = readFileSync("src/components/atelier/EditorialPortfolio.tsx", "utf8");

describe("V85 film directory keyboard contract", () => {
  it("supports arrows, Home and End while preserving native buttons and Tab", () => {
    for (const key of ["ArrowDown", "ArrowUp", "Home", "End"]) expect(source).toContain('event.key === "' + key + '"');
    expect(source).toContain('type="button"');
    expect(source).toContain('aria-pressed={selected === index}');
    expect(source).toContain('onKeyDown={(event) => onFilmKeyDown(event, index)}');
    expect(source).toContain('buttons?.[next]?.focus()');
    expect(source).toContain('Apasă Tab pentru a continua navigarea');
  });
});
