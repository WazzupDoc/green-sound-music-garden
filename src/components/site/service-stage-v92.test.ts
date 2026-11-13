import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { services } from "@/data/site";
const read=(path:string)=>readFileSync(path,"utf8");
const page=read("src/components/site/ServicePage.tsx");
const stage=read("src/components/site/ServiceStage.tsx");
const css=read("src/styles/service-stage-v92.css");

describe("V92 premium service stage, 8 genuine service pages",()=>{
 it("renders each actual catalogue service without inventing client results or event photographs",()=>{
  expect(services).toHaveLength(8);
  expect(new Set(services.map(s=>s.slug)).size).toBe(8);
  expect(stage).toContain("service.h1");
  expect(stage).toContain("service.lead");
  expect(stage).toContain("service.image.src");
  expect(stage).toContain("service.image.alt");
  expect(stage).toContain("service.highlights.slice(0,3)");
  expect(stage).toContain('aria-labelledby="gs-v92-stage-title"');
  expect(stage).toContain('decoding="async" fetchPriority="high"');
  expect(stage).not.toMatch(/fakeMetric|customerCount|guaranteedUptime|autoPlay=\{true\}/);
 });
 it("preserves the genuine prefilled quote form and makes the hero CTA reach it",()=>{
  expect(stage).toContain('href="#oferta-titlu"');
  expect(stage).toContain('href="#din-culise"');
  expect(page).toContain('id="din-culise"');
  expect(page).toContain("<ServiceStage service={service} />");
  expect(page).toContain('<ServiceSignature service={service} />');
  expect(page).toContain("defaultServices={[service.formLabel]}");
  expect(page).toContain("intro=\"Descrie data și locația.");
  expect(page).not.toContain("<PageHero");
 });
 it("applies native 3D photo layout, responsive no-motion gates and per-discipline tones",()=>{
  for(const token of [
   "perspective:1100px",
   ".gs-v92-stage__photo",
   ".gs-v92-stage__highlights",
   '[data-chapter="technical"]',
   '[data-chapter="people"]',
   "@media(max-width:680px)",
   "@media(prefers-reduced-motion:reduce)",
   "html[data-gs-performance=lite]",
  ]) expect(css).toContain(token);
  expect(css).toContain("@keyframes gs-v92-light-cue");
  expect(css).not.toMatch(/url\(https?:|font-face|@import/);
  expect(stage).toContain('stageCss from "@/styles/service-stage-v92.css?inline"');
  expect(stage).toContain("<style>{stageCss}</style>");
 });
});
