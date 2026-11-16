import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const read=(path:string)=>readFileSync(path,"utf8");
const route=read("src/routes/index.tsx");
const page=read("src/components/atelier/ConceptHomeV170.tsx");
const css=read("src/styles/home-reference-v170.css");
const oldArtwork=read("src/components/atelier/ProductionDeckArt.tsx");
describe("V170 production equipment is a lightweight UI illustration",()=>{
 it("leaves archived production artwork for rollback but does not mount it",()=>{
   expect(oldArtwork).toContain('<svg viewBox="0 0 900 490"');
   expect(route).toContain("<ConceptHomeV170 />");
   expect(page).not.toContain("<ProductionDeckArt");
   expect(page).toContain("gs170-stage__console");
   expect(css).toContain("gs170-stage__eq");
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
   expect(page).toContain("existing real Green Sound");
   expect(page).toContain("VideoLite video={film.video}");
   expect(css).toContain("prefers-reduced-motion:reduce");
   expect(css).not.toContain("url(https:");
 });
});
