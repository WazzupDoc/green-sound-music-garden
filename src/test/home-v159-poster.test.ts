import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
const route=readFileSync(resolve(process.cwd(),"src/routes/index.tsx"),"utf8");
const poster=readFileSync(resolve(process.cwd(),"src/styles/home-cover-v159.css"),"utf8");
const hero=readFileSync(resolve(process.cwd(),"src/components/atelier/StageHero.tsx"),"utf8");
describe("V159 premium event-production poster cover",()=>{
 it("mounts exactly one new homepage-only design following the earlier CSS for rollback",()=>{
   expect(route).toContain('className="gs-home-v86 gs-home-v158 gs-home-v159"');
   expect(route).toContain('homeCoverCss from "@/styles/home-cover-v159.css?inline"');
   expect(route.indexOf("<style>{homeRedesignCss}</style>")).toBeLessThan(route.indexOf("<style>{homeCoverCss}</style>"));
   for(const tag of ["<StageHero />","<ProductionIndex />","<EditorialPortfolio />",'className="crafted-finale gs-finale"'])expect(route).toContain(tag);
   expect((route.match(/<Link to="\/contact"/g)||[]).length).toBe(1);
 });
 it("replaces the visible gallery collage with a single licensed-in-project photograph and oversized dark type",()=>{
   expect(poster).toContain("background:var(--gs159-paper)!important");
   expect(poster).toContain("font-size:clamp(6rem,13vw,13.65rem)!important");
   expect(poster).toContain(".gs-v90-show-wall");
   expect(poster).toContain("display:none!important");
   expect(poster).toContain("background:#07170f!important");
   expect(poster).toContain("background:#e9ebe1!important");
   expect(hero).toContain('src={scene.src}');
   expect(hero).toContain("modes.map((mode)");
   expect(hero).toContain("setShowReel(true)");
 });
 it("preserves mobile, accessibility, Lite and reduced motion without external media",()=>{
   expect(poster).toContain("@media(max-width:640px)");
   expect(poster).toContain("@media(max-width:850px)");
   expect(poster).toContain("@media(prefers-reduced-motion:reduce)");
   expect(poster).toContain('html[data-gs-performance="lite"]');
   expect(poster).not.toMatch(/url\(https?:|@import\s/);
   expect(hero).toContain('aria-pressed={mode.key === active}');
   expect(hero).toContain('data-hydrated={hydrated ? "true" : "false"}');
 });
});