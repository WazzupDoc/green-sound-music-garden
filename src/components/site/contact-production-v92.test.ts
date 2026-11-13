import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { eventTypeOptions, quoteSchema } from "@/lib/quote";
import { services } from "@/data/site";

const route = readFileSync("src/routes/contact.tsx", "utf8");
const form = readFileSync("src/components/site/QuoteForm.tsx", "utf8");
const css = readFileSync("src/styles/contact-production-v92.css", "utf8");
const browser = readFileSync(".github/scripts/verify-crafted-browser.cjs", "utf8");
const mobileBar = readFileSync("src/components/site/MobileActionBar.tsx", "utf8");

describe("V92 production-brief Contact: design plus a real user-driven quote", () => {
  it("is a single canonical Contact route and keeps strictly allowlisted query data", () => {
    expect(route).toContain('createFileRoute("/contact")');
    expect(route).toContain('typeof raw !== "string" || raw.length > 900');
    expect(route).toContain("allowedServices.has(value)");
    expect(route).toContain("eventTypeOptions");
    expect(route).toContain("isValidBriefDate");
    expect(route).toContain("fromBrief");
    expect(eventTypeOptions).toContain("Nuntă");
    expect(services.length).toBe(8);
    expect(quoteSchema.safeParse({}).success).toBe(false);
  });

  it("has original editorial visual hierarchy without adding another form or fictitious media", () => {
    expect(route).toContain('className="director-contact-intro gs-contact-v92__hero"');
    expect(route).toContain('className="gs-contact-v92__score-art"');
    expect(route).toContain('className="gs-contact-v92__route"');
    expect(route).toContain('className="director-contact-quote gs-contact-v92__quote"');
    expect(route).toContain('id="contact-form-title"');
    expect(route).toContain("href={business.phoneHref}");
    expect(route).toContain("whatsappUrl(defaultWhatsappText)");
    expect(route).toContain("QuoteForm key=");
    expect(route).not.toContain("images.unsplash.com");
    expect(route).not.toContain("tiktok.com");
  });

  it("delivers accessible first-party CSS on SSR, with reduced-motion and Lite guards", () => {
    expect(route).toContain('import contactProductionCss from "@/styles/contact-production-v92.css?inline"');
    expect(route).toContain("<style>{contactProductionCss}</style>");
    expect(css).toContain(".gs-contact-v92__hero");
    expect(css).toContain(".gs-contact-v92__frequency");
    expect(css).toContain(".gs-contact-v92__workbench");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain("html[data-gs-performance=lite]");
    expect(css).toContain(":focus-visible");
    expect(css).toContain(".quote-preview__email");
    expect(mobileBar).toContain('location.pathname === "/contact"');
  });

  it("focuses the prepared message on step change and does not pretend to send", () => {
    expect(form).toContain("previewHeadingRef.current?.focus()");
    expect(form).toContain('tabIndex={-1}');
    expect(form).toContain("onClick={() => { void copyMessage(message); }}");
    expect(form).toContain("Nu trimitem nimic automat.");
    expect(form).toContain('href={whatsappUrl(message)}');
    expect(form).toContain('href={mailtoUrl(prepared, message)}');
  });

  it("audits Contact with actual Chrome screenshots at six widths", () => {
    expect(browser).toContain("[360, 390, 430, 768, 1440, 1920]");
    expect(browser).toContain("contact-v92-intro-");
    expect(browser).toContain("contact-v92-brief-");
    expect(browser).toContain('base + "/contact"');
  });
});
