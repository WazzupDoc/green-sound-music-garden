import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const read=(path:string)=>readFileSync(path,"utf8");
const route=read("src/routes/index.tsx");
const page=read("src/components/atelier/ConceptHomeV170.tsx");
const css=read("src/styles/home-rebuild-v297.css");
const oldArtwork=read("src/components/atelier/ProductionDeckArt.tsx");
const programme=read("src/components/atelier/ProductionIndex.tsx");
describe("V170 production equipment is a lightweight UI illustration",()=>{
 it("leaves archived production artwork for rollback but does not mount it",()=>{
   expect(oldArtwork).toContain('<svg viewBox="0 0 900 490"');
   expect(route).toContain("<ConceptHomeV170 />");
   expect(page).not.toContain("<ProductionDeckArt");
   expect(page).not.toContain("gs170-stage__console");
   expect(css).toContain("gs297-diptych");
 });
 it("routes exactly eight actual catalogue services, without fabricated offerings",()=>{
   for (const slug of [
     "dj-mc", "trupa", "echipamente-de-sunet-si-lumini",
     "masina-fum-greu-cu-gheata-carbonica", "studio-inregistrari",
     "hostess", "ursitoare-botez", "start-veselia",
   ]) expect(programme).toContain('"' + slug + '"');
   expect(page).toContain("<ProductionIndex />");
   expect(programme).toContain("new Set(editorialServiceSlugs)");
   expect(programme).toContain("editorialServiceSlugs.length !== catalogueSlugs.size");
   expect(programme).toContain("chapter.linkedServices.map((service)");
 });
 it("keeps provenance, reduced motion and no auto-playing media",()=>{
   expect(page).toContain("images.concert.src");
   expect(page).not.toContain("images.dj.src");
    expect(page).toContain("<LiveDeck />");
    expect(page).toContain('className="gs-live-deck__art"');
    expect(page).toContain('aria-hidden="true"');
   expect(page).toContain("VideoLite video={film.video}");
   expect(css).toContain("prefers-reduced-motion:reduce");
   expect(css).not.toContain("url(https:");
 });
});
