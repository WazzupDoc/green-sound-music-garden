import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const home=readFileSync("src/routes/index.tsx","utf8");
const hero=readFileSync("src/components/atelier/ProductionHeroV166.tsx","utf8");
const css=readFileSync("src/styles/home-rebuild-v166.css","utf8");
describe("V166 replaces V158's cumulative theme without losing working conversion",()=>{
 it("keeps one photo, an offer CTA, an authentic click-to-play film and three controlled modes",()=>{
   expect(home).toContain("<ProductionHeroV166 />");
   expect(hero).toContain('className="gs160-stage__photo"');
   expect(hero).toContain('to="/contact"');
   expect(hero).toContain("setFilmOpen(true)");
   expect(hero).toContain("editions.map(item =>");
   expect(hero).toContain('aria-pressed={selected === item.key}');
   expect(hero).toContain('to="/evenimente/$slug"');
 });
 it("keeps all original photos and real film links, not generated event imagery",()=>{
   expect(hero).toContain("images.concert");
   expect(hero).toContain("images.dj");
   expect(hero).toContain("images.scena");
   expect(hero).toContain("videos.showLumini");
   expect(hero).toContain("videos.nuntaRamada");
   expect(hero).toContain("<VideoLite");
   expect(css).not.toMatch(/@import\s|url\(https?:/);
 });
 it("adapts mobile and Lite mode",()=>{
   expect(css).toContain("@media(max-width:900px)");
   expect(css).toContain("@media(max-width:470px)");
   expect(css).toContain("@media(prefers-reduced-motion:reduce)");
   expect(css).toContain("html[data-gs-performance=lite]");
 });
});
