import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "src/routes/contact.tsx"), "utf8");

describe("Contact without JavaScript", () => {
  it("replaces the unavailable form jump with a real telephone CTA", () => {
    expect(source).toContain('id="contact-start-brief"');
    expect(source).toContain("#contact-start-brief { display: none !important; }");
    expect(source).toContain('<a className="director-contact-signal__action" href={business.phoneHref}>Sună pentru ofertă');
    expect(source).toContain("<noscript>");
  });
});
