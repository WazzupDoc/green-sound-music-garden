import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const component=readFileSync("src/components/atelier/ProductionIndex.tsx","utf8");
const css=readFileSync("src/styles/home-signature-v86.css","utf8");

describe("V86 authentic editorial services: eight links without fake meters",()=>{
 it("retains all 8 source-backed catalogue destinations and 3 real editorial images",()=>{
  expect(component).toContain("editorialChapters.map((chapter)");
  expect(component).toContain("chapter.linkedServices.map((service)");
  expect(component).toContain('to={`/${service.slug}`}');
  for(const media of ["images.dj","images.scena","images.ursitoare"]){
   expect(component).toContain(media);
  }
  expect(component).toContain('loading="lazy"');
 });
 it("removes the redundant fake-audio stickers and routing bars",()=>{
  expect(component).not.toContain("chapterSignalLevels");
  expect(component).not.toContain('className="gs-index__signal-ledger"');
  expect(component).not.toContain('className="gs-index__routing"');
  expect(component).not.toContain("signalLedgerCss");
  expect(css).toContain(".gs-index__chapter[data-chapter=sound]");
  expect(css).toContain("grid-row:1/span2");
  expect(css).toContain("@media(prefers-reduced-motion:reduce)");
 });
});
