import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const route = readFileSync(resolve(process.cwd(),"src/routes/portofoliu.tsx"),"utf8");
const component = readFileSync(resolve(process.cwd(),"src/components/atelier/RegiaPortfolio.tsx"),"utf8");
const css = readFileSync(resolve(process.cwd(),"src/styles/portfolio-directors-cut-v161.css"),"utf8");

describe("V161 original portfolio hero and gallery with V191 route-scoped film enhancement",()=>{
  it("retains the original SSR-scoped archive art direction and first-party documentary hero",()=>{
    expect(route).toContain('portfolio-directors-cut-v161.css?inline');
    expect(route).toContain('className="gs161-portfolio"');
    expect(route).toContain('portfolio-cinema-v191.css?inline');
    expect(route).toContain('<style>{portfolioDirectorCss + "\\n" + portfolioCinemaCss}</style>');
    expect(route).toContain('className="gs161-hero"');
    expect(route).toContain("src={images.concert.src}");
    expect(route).toContain('fetchPriority="high"');
    expect(route).toContain('href="#portfolio-photos"');
    expect(route).toContain('href="#portfolio-films"');
    expect(route).toContain("<RegiaPhotoRail activePhoto={photo} />");
    expect(route).toContain("<RegiaFilmArchive film={film} />");
  });
  it("changes the gallery into a visible asymmetric contact sheet, keeping accessible lightbox",()=>{
    expect(css).toContain(".gs161-portfolio .rs-gallery__rail");
    expect(css).toContain("grid-template-columns:repeat(12,minmax(0,1fr))");
    expect(css).toContain(".rs-gallery__frame:nth-child(1)");
    expect(css).toContain("grid-row:span 2");
    expect(css).toContain("@media(max-width:470px)");
    expect(component).toContain('data-photo-id={frame.id}');
    expect(component).toContain("gs161-photo-counter");
    expect(component).toContain('onCloseAutoFocus={event => {');
    expect(component).toContain('onTouchEnd={event=>{');
    expect(component).toContain('event.key==="ArrowRight"');
    expect(route).toContain('photoIds.has(search["photo"])');
  });
  it("shows owner-backed film poster stills, not auto-playing embeds or fictional projects",()=>{
    expect(component).toContain('ytThumb(video, "sd")');
    expect(component).toContain('video.poster ?? ytThumb(video, "sd")');
    expect(component).toContain('className="gs161-film-thumb"');
    expect(component).toContain('<VideoLite key={chosen.id} video={chosen} />');
    expect(component).toContain('aria-current={chosen?.id===video.id?"true":undefined}');
    expect(route).toContain('filmIds.has(search["film"])');
    expect(css).not.toMatch(/url\(https?:|@import\s/);
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain("html[data-gs-performance=lite]");
  });
});
