import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const read=(p:string)=>readFileSync(p,"utf8");
const route=read("src/routes/index.tsx");
const css=read("src/styles/home-signature-v86.css");
const shared=read("src/styles.css");

describe("V86 replaces V84/V85 cascade with one scoped branded design",()=>{
 it("actually loads ONE homepage stylesheet via SSR and retains the four-section promise",()=>{
  expect(route).toContain('import homeSignatureCss from "@/styles/home-signature-v86.css?inline"');
  expect(route).toContain('<style>{homeSignatureCss}</style>');
  expect(route).toContain('<style>{premiumEventCss}</style>');
  expect(route).toContain('home-event-v89.css?inline');
  expect(route).toContain('className="gs-home-v86"');
  expect(route).not.toContain("homeNightshiftCss");
  expect(route).not.toContain("homeProductionCss");
  expect(shared).not.toContain("home-signature-v86.css");
  for (const section of ["<StageHero />","<ProductionIndex />","<EditorialPortfolio />",'className="crafted-finale gs-finale"']){
   expect(route).toContain(section);
  }
  expect(route.match(/<Link to="\/contact"/g)).toHaveLength(1);
 });
 it("replaces repetitive three cards with asymmetric photo editorial and a clear final CTA",()=>{
  expect(css).toContain(".gs-home-v86 .gs-index__chapters");
  expect(css).toContain(".gs-index__chapter[data-chapter=sound]");
  expect(css).toContain("grid-row:1/span2");
  expect(css).toContain(".gs-index__chapter[data-chapter=people]");
  expect(css).toContain(".gs-home-v86 .gs-finale");
  expect(css).toContain("background:#bcf1a0");
 });
 it("safely preserves mobile, user motion preferences and real media",()=>{
  expect(css).toContain(".gs-home-v86 .crafted-hero__image");
  expect(css).toContain(".gs-home-v86 .scene-console");
  expect(css).toContain(".gs-home-v86 .director-reel");
  expect(css).toContain("@media(max-width:640px)");
  expect(css).toContain("@media(prefers-reduced-motion:reduce)");
  expect(css).toContain("html[data-gs-performance=lite]");
 });
});
