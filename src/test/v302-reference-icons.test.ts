import {readFileSync} from "node:fs";
import {describe,it,expect} from "vitest";
describe("V302 approved reference icons",()=>{
it("retains native labeled navigation and uses recognizable white/lime glyphs",()=>{
const s=readFileSync("src/components/site/SiteHeader.tsx","utf8");expect(s).toContain("gs302-reference-glyph");expect(s).toContain('route="/contact"');expect(s).toContain('route="headset"');expect(s).toContain("gs302-contact-link");expect(s).toContain('aria-hidden="true"><path d={d[route]');
});
it("retains eight native service links with only three chapter-level icons",()=>{
const s=readFileSync("src/components/atelier/ProductionIndex.tsx","utf8");expect(s).toContain("<ChapterGlyph art={chapter.art} />");expect(s).not.toContain("<ServiceGlyph");expect(s).toContain("chapter.linkedServices.map");
});
});
