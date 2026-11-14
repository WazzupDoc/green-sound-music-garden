import { readFileSync } from "node:fs";
import { describe,it,expect } from "vitest";
const footer=readFileSync("src/components/site/SiteFooter.tsx","utf8");
const css=readFileSync("src/styles/footer-editorial-v93.css","utf8");
describe("V93 footer editorial conversion without regression",()=>{
it("keeps existing navigations, real channels, Light Desk and privacy",()=>{
for(const token of ["navEvents.map","navServices.map","business.phoneHref","business.email","business.socials.map","<LightDesk />", 'to="/confidentialitate"'])expect(footer).toContain(token);
});
it("adds a single meaningful contact action and server-inlined design",()=>{
expect(footer).toContain('to="/contact" className="gs-footer-v93__cta"');
expect(footer).toContain('<style>{footerCss}</style>');
expect(footer).toContain('footer-editorial-v93.css?inline');
expect(footer).toContain('aria-hidden="true"');
});
it("remains responsive and accessible with Lite/reduced motion",()=>{
expect(css).toContain("@media(max-width:760px)");
expect(css).toContain("@media(max-width:390px)");
expect(css).toContain(":focus-visible");
expect(css).toContain("prefers-reduced-motion:reduce");
expect(css).toContain("data-gs-performance=lite");
});
});
