import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const read=(p:string)=>readFileSync(p,"utf8");
const base=read("src/styles.css");
const hero=read("src/components/atelier/StageHero.tsx");
const oldStage=read("src/styles/stage-v78.css");
const signature=read("src/styles/home-signature-v86.css");

describe("Legacy visual assets retained, V86 signature loads instead of retired decorative geometry",()=>{
 it("keeps correctly loaded active site styles and scoped homepage CSS",()=>{
  for(const p of ["scene-console","light-desk","production-index","portfolio-journal","editorial-reset","stage-v78"]){
   expect(base).toContain(`@import "./styles/${p}.css";`);
  }
  expect(signature).toContain(".gs-home-v86 .crafted-hero");
  expect(signature).toContain(".gs-home-v86 .gs-index__chapters");
 });
 it("renders accessible semantic LCP photo, new live production typography, and scene controls",()=>{
  expect(hero).toContain('className="crafted-hero gs-stage-v78 gs-stage-v79 gs-stage-v86"');
  expect(hero).toContain('id="crafted-hero-title"');
  expect(hero).toContain("Dăm viață");
  expect(hero).toContain("fiecărui <em>eveniment.</em>");
  expect(hero).toContain('src={scene.src}');
  expect(hero).toContain('fetchPriority={active === "live" ? "high" : undefined}');
  expect(hero).toContain("modes.map((mode)");
  expect(hero).toContain('className="gs-v86__graphic"');
  expect(hero).not.toContain("<ProductionDeckArt />");
 });
 it("preserves hydration and reduced-motion controls while retiring fake portal effects",()=>{
  expect(hero).toContain("const deviceReducedMotion = useReducedMotion()");
  expect(hero).toContain("const reduced = hydrated && Boolean(deviceReducedMotion)");
  expect(hero).toContain('data-hydrated={hydrated ? "true" : "false"}');
  expect(oldStage).toContain("@media(prefers-reduced-motion:reduce)");
  expect(signature).toContain(".gs-stage-v79__architecture");
  expect(signature).toContain("display:none!important");
  expect(signature).toContain("html[data-gs-performance=lite]");
  expect(signature).toContain("@media(prefers-reduced-motion:reduce)");
 });
});
