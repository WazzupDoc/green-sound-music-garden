import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("V257 event detail conversion", () => {
  it("links the first hero action to the same prefilled, editable Contact brief as the service mix", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/site/EventPage.tsx"), "utf8");
    expect(source).toContain('const briefHref = `/contact?event=${encodeURIComponent(event.formLabel)}&services=${encodeURIComponent(serviceLabels.join("|"))}#contact-form-title`;');
    expect(source.match(/href={briefHref}/g)).toHaveLength(2);
    expect(source).toContain("se poate modifica în Contact");
    expect(source).not.toContain('href="#oferta-titlu" className="rs-inline-link"');
  });
});
