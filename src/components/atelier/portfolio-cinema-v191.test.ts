import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { videos } from "@/data/site";

const route = readFileSync("src/routes/portofoliu.tsx","utf8");
const portfolio = readFileSync("src/components/atelier/RegiaPortfolio.tsx","utf8");
const css = readFileSync("src/styles/portfolio-cinema-v191.css","utf8");

describe("V191 film cinema registry", () => {
  it("keeps source-backed film selection, filters, shareable URLs and explicit play", () => {
    expect(portfolio).toContain('const videoList: Video[] = Object.values(videos)');
    expect(Object.values(videos).length).toBeGreaterThanOrEqual(3);
    expect(portfolio).toContain('to="/portofoliu" search={{film:video.id}}');
    expect(portfolio).toContain('onClick={()=>selectCategory(item.tag)}');
    expect(portfolio).toContain('<VideoLite key={chosen.id} video={chosen} />');
    expect(portfolio).toContain('data-selected-film={chosen?.id ?? ""}');
    expect(portfolio).not.toContain('<video autoPlay');
    expect(route).toContain('filmIds.has(search["film"])');
  });
  it("ships the new route-local stylesheet on SSR without new dependency", () => {
    expect(route).toContain('import portfolioCinemaCss from "@/styles/portfolio-cinema-v191.css?inline"');
    expect(route).toContain('<style>{portfolioDirectorCss + "\\n" + portfolioCinemaCss}</style>');
    expect(css).toContain(".gs191-film__leader");
    expect(css).toContain(".gs191-film__currently");
    expect(css).toContain(".gs191-film__queue-title");
    expect(css).toContain("@media(max-width:600px)");
    expect(css).not.toContain("@import");
  });
  it("keeps keyboard film list native, with optional arrows, Home/End and no Escape or Tab hijack", () => {
    expect(portfolio).toContain("onKeyDown={onFilmListKeyDown}");
    for (const key of ["ArrowDown","ArrowRight","ArrowUp","ArrowLeft","Home","End"]) {
      expect(portfolio).toContain('event.key === "' + key + '"');
    }
    expect(portfolio).toContain("links[next]?.focus()");
    expect(portfolio).toContain("else return;");
    expect(portfolio).not.toContain("links[next]?.click()");
  });
  it("keeps Lite and reduced-motion static and avoids external image imports", () => {
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain('html[data-gs-performance="lite"]');
    expect(css).toContain("animation:none!important");
    expect(portfolio).toContain('video.poster ?? ytThumb(video, "sd")');
    expect(portfolio).toContain("video.caption");
  });
});