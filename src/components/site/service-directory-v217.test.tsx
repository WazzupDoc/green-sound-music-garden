import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { services } from "@/data/site";
import { ServiceSigilV217, ChapterSigilV217 } from "@/components/site/ServiceSigilV217";

const source = (path: string) => readFileSync(resolve(process.cwd(),path),"utf8");

describe("V217: first-party production directory", () => {
  it("renders eight distinct, accessible-by-adjacent-text original SVG glyphs in SSR", () => {
    expect(services).toHaveLength(8);
    const outputs=services.map(({slug})=>renderToStaticMarkup(
      <ServiceSigilV217 slug={slug} className="gs217-service-glyph" />
    ));
    expect(new Set(outputs).size).toBe(8);
    for(const output of outputs) {
      expect(output).toContain("<svg");
      expect(output).toContain('aria-hidden="true"');
      expect(output).toContain('focusable="false"');
      expect(output).not.toContain("<img");
    }
    expect(renderToStaticMarkup(<ChapterSigilV217 type="tech" />)).toContain("<svg");
  });
  it("keeps all eight real services as links, plus native mobile routes and direct services URL", () => {
    const mega=source("src/components/site/ServiceDirectoryV217.tsx");
    const header=source("src/components/site/SiteHeader.tsx");
    expect(mega).toContain("const allSlugs = groups.flatMap");
    expect(mega).toContain("allSlugs.some(slug => !services.some");
    expect(mega).toContain('to={"/" + slug}');
    expect(mega).toContain('to="/contact"');
    expect(mega).toContain('to="/servicii"');
    expect(header).toContain("ServiceDirectoryV217");
    expect(header).toContain('aria-expanded={servicesOpen}');
    expect(header).toContain('aria-controls="gs217-service-directory"');
    expect(header).toContain('onClick={() => setServicesOpen(previous => !previous)}');
    expect(header).toContain('event.key !== "Escape"');
    expect(header).toContain("servicesButtonRef.current?.focus()");
    expect(header).toContain('id="atelier-mobile-navigation"');
    expect(header).toContain('aria-label="Navigare principală mobilă"');
  });
  it("uses the existing green look, with reduced-motion and Lite modes", () => {
    const header=source("src/components/site/SiteHeader.tsx");
    const css=source("src/styles/navigation-v217.css");
    expect(header).toContain('navigation-v217.css?inline');
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain('data-gs-performance="lite"');
    expect(css).toContain("@media(max-width:1120px)");
    expect(css).toContain(".gs217-directory__grid");
    expect(css).not.toContain("https://");
  });
});
