import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const read=(path:string)=>readFileSync(path,"utf8");
const portfolio=read("src/components/atelier/EditorialPortfolio.tsx");
const css=read("src/styles/film-contact-sheet-v87.css");
const site=read("src/data/site.ts");

describe("V87 source-authentic film contact-sheet",()=>{
 it("renders exactly the same 3 real video sources, with thumbnail-only previews",()=>{
  expect(portfolio).toContain('videos.nuntaRamada');
  expect(portfolio).toContain('videos.showLumini');
  expect(portfolio).toContain('videos.neatza');
  expect(site).toContain('poster: "/media/greensound/film-nunta-ramada.webp"');
  expect(site).toContain('poster: "/media/greensound/film-show-lumini.webp"');
  expect(site).toContain('poster: "/media/greensound/film-studio-live.webp"');
  expect(portfolio).toContain("cuts.map((cut, index)");
  expect(portfolio).toContain('cut.video.poster ?? ytThumb(cut.video, "sd")');
  expect(portfolio).toContain('width={1280} height={720} loading="lazy" decoding="async"');
  expect(portfolio).toContain('aria-pressed={selected === index}');
  expect(portfolio).toContain('aria-label={`Film 0${index + 1}');
  expect(portfolio).toContain('<VideoLite video={active.video}');
 });
 it("loads CSS in SSR instead of adding to legacy global bundle",()=>{
  expect(portfolio).toContain('filmContactCss from "@/styles/film-contact-sheet-v87.css?inline"');
  expect(portfolio).toContain('<style>{filmContactCss}</style>');
  expect(css).toContain(".gs-v87-film-thumb img");
  expect(css).toContain('.director-reel__choice[aria-pressed=true]');
  expect(css).toContain("@media(max-width:440px)");
 });
 it("keeps all video playback click-gated and user motion under control",()=>{
  expect(portfolio).not.toContain("autoplay=");
  expect(css).toContain("@media(prefers-reduced-motion:reduce)");
  expect(css).toContain("html[data-gs-performance=lite]");
  expect(css).not.toMatch(/https?:\/\//);
 });
});
