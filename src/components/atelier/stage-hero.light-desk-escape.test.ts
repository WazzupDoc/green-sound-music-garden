import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("StageHero Light Desk keyboard contract", () => {
  const source = readFileSync(resolve(process.cwd(), "src/components/atelier/StageHero.tsx"), "utf8");

  it("keeps the native details/summary disclosure", () => {
    expect(source).toContain('<details ref={lightDeskRef} className="gs-lightboard"');
    expect(source).toContain('<summary className="gs-lightboard__summary"');
  });

  it("closes only an open Light Desk on Escape and returns focus to summary", () => {
    expect(source).toContain('event.key !== "Escape" || !lightDeskRef.current?.open');
    expect(source).toContain("event.preventDefault()");
    expect(source).toContain("lightDeskRef.current.open = false");
    expect(source).toContain('querySelector<HTMLElement>("summary")?.focus()');
  });
});
