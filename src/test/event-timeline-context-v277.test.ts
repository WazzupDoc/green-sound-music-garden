import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("V277 event timeline accessible service links", () => {
  it("names each service action by its timeline step without changing navigation", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/site/EventPage.tsx"), "utf8");
    expect(source).toContain('aria-label={`Descoperă ${service.name} pentru etapa ${index + 1}: ${moment.title}`}');
    expect(source).toContain('<Link to={`/${service.slug}`} viewTransition aria-label=');
    expect(source).toContain('tabIndex={-1}');
  });
});
