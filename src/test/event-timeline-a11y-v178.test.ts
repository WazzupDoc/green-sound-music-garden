import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("event timeline accessible counters", () => {
  const source = readFileSync(resolve(process.cwd(), "src/components/site/EventPage.tsx"), "utf8");
  it("provides one readable current/total label", () => {
    expect(source).toContain('role="img"');
    expect(source).toContain('aria-label={`Etapa ${index + 1} din ${event.moments.length}`}');
    expect(source).toContain('<span aria-hidden="true">{String(index+1).padStart(2,"0")}</span><small aria-hidden="true">/{String(event.moments.length).padStart(2,"0")}</small>');
  });
});
