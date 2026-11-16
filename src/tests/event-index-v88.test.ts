import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { events, getService } from "@/data/site";
const route = readFileSync("src/routes/evenimente.index.tsx","utf8");
const css = readFileSync("src/styles/event-show-poster-v173.css","utf8");
describe("V173 Live Show Poster contract",()=>{
 it("links five genuine event routes on SSR without JavaScript",()=>{
  expect(events).toHaveLength(5);
  expect(new Set(events.map(e=>e.slug)).size).toBe(5);
  expect(route).toContain("events.map((event, index)");
  expect(route).toContain('to="/evenimente/$slug"');
  expect(route).toContain("params={{ slug: event.slug }}");
  expect(route).toContain("QuoteSection");
 });
 it("controls stage and cue-sheet with keyboard and truthful CTA",()=>{
  expect(route).toContain("aria-pressed={selected}");
  expect(route).toContain('aria-controls="gs173-selected-programme"');
  for(const key of ["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","Home","End"]) expect(route).toContain('event.key === "'+key+'"');
  expect(route).toContain("setActiveSlug");
  expect(route).toContain('aria-live="polite"');
  expect(route).toContain("encodeURIComponent(activeEvent.formLabel)");
  for(const event of events) for(const cue of event.moments.slice(0,3)) expect(getService(cue.service).name).toBeTruthy();
 });
 it("uses existing real event images, adaptive motion, no new backend or autoplay",()=>{
  for(const value of ["visualEvent.image.src","visualEvent.image.alt","width={visualEvent.image.w}","height={visualEvent.image.h}"]) expect(route).toContain(value);
  expect(route).not.toContain("autoplay");
  expect(route).not.toContain("fetch(");
  expect(route).toContain("preload.decode()");
  expect(route).toContain("setVisualEvent(activeEvent)");
  for(const value of ["@media(max-width:780px)","@media(max-width:480px)","@media(prefers-reduced-motion:reduce)","data-gs-performance=lite",":focus-visible","@keyframes gs173-gate-open","transform:translateY"]) expect(css).toContain(value);
  expect(route).toContain("<style>{eventPosterCss}</style>");
  expect(css).not.toContain("@import");
 });
});