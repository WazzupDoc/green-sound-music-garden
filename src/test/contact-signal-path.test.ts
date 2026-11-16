import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const contact = readFileSync(resolve(process.cwd(), "src/routes/contact.tsx"), "utf8");
const css = readFileSync(resolve(process.cwd(), "src/styles/contact-editorial.css"), "utf8");
const entry = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8");

describe("Contact signal path", () => {
  it("shows a real three-step client-controlled quote flow without claiming submission", () => {
    expect(contact).toContain('aria-label="Etapele cererii de ofertă"');
    expect(contact).toContain('<ol className="director-contact-signal__steps">');
    expect((contact.match(/<li><span>0[123] \/ /g) ?? [])).toHaveLength(3);
    expect(contact).toContain("Alegi tu trimiterea");
    expect(contact).toContain('href="#contact-form-title"');
    expect(contact).toContain('id="contact-form-title" tabIndex={-1}');
  });

  it("ships from the existing CSS graph with narrow-screen and reduced-motion rules", () => {
    expect(entry).toContain('@import "./styles/contact-editorial.css"');
    expect(css).toContain(".director-contact-signal__steps");
    expect(css).toContain("@media(max-width:680px)");
    expect(css).toContain(".director-contact-signal__action{width:100%");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain(".director-contact-signal__action:focus-visible");
    expect(css).not.toContain("border-radius:50%;box-shadow:0 0 0 65px");
  });
});
