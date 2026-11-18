import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const read=(path:string)=>readFileSync(path,"utf8");
const route=read("src/routes/index.tsx");
const page=read("src/components/atelier/ConceptHomeV170.tsx");
const css=read("src/styles/home-reference-v170.css");
const scoreCss=read("src/styles/hero-signal-v214.css");
const score=read("src/components/atelier/SceneScoreV214.tsx");
const oldArtwork=read("src/components/atelier/ProductionDeckArt.tsx");
describe("V214 procedural production artwork preserves the original site",()=>{
 it("leaves archived production artwork for rollback but does not mount it",()=>{
   expect(oldArtwork).toContain('<svg viewBox="0 0 900 490"');
   expect(route).toContain("<ConceptHomeV170 />");
   expect(page).not.toContain("<ProductionDeckArt");
   expect(page).toContain("<SceneScoreV214 />");
   expect(page).not.toContain("gs170-stage__console");
   expect(scoreCss).toContain("gs214-score__plot");
   expect(score).toContain("makeScorePath");
 });
 it("routes exactly eight actual catalogue services, without fabricated offerings",()=>{
   expect(page).toContain('slug: "dj-mc"');
   expect(page).toContain('slug: "trupa"');
   expect(page).toContain('slug: "echipamente-de-sunet-si-lumini"');
   expect(page).toContain('slug: "masina-fum-greu-cu-gheata-carbonica"');
   expect(page).toContain('slug: "studio-inregistrari"');
   expect(page).toContain('"hostess", "ursitoare-botez", "start-veselia"');
   expect(page).toContain("services.some(service => !allSlugs.includes(service.slug))");
 });
 it("keeps provenance, reduced motion and no auto-playing media",()=>{
   expect(page).toContain("Real first-party media");
   expect(page).toContain("VideoLite video={film.video}");
   expect(css).toContain("prefers-reduced-motion:reduce");
   expect(css).not.toContain("url(https:");
   expect(scoreCss).toContain("prefers-reduced-motion:reduce");
   expect(scoreCss).not.toContain("url(https:");
 });
});
