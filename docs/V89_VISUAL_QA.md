# V89 — Real-browser visual difference & end-to-end QA

Date: 2026-11-13 · Project: GREEN SOUND MUSIC · Route: `/evenimente/nunti`

## True before vs after, not a generated mockup

| Evidence | BEFORE | AFTER |
| --- | --- | --- |
| Source | V88 app `1e1feb930cdb295d73ff7b4e5d4a523bd5f9b5b7` plus QA script and documentation-only trigger | V89 app `613eb52e8275e6741e6129f4b2c39500eeb2fd0b` |
| GitHub Actions | [SUCCESS #43423935945](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43423935945) | [SUCCESS #43424678233](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43424678233) |
| Screenshots | [V88 artifact #14035536377](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43423935945/artifacts/14035536377) | [V89 artifact #14035687119](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43424678233/artifacts/14035687119) |

Exact filenames in both ZIP archives:
`event-detail-timeline-390.png`, `event-detail-timeline-1440.png`, `event-detail-services-390.png`, `event-detail-services-1440.png`.

A consistent real Chromium scenario produced these captures: same URL, same element selector, same 390/1440 viewport width and 900px height, same `prefers-reduced-motion:reduce` setting. Playwright also checks route/overflow/semantic counts at 360/390/430/768/1440/1920. ZIP archives preserve untouched screenshots.

## Specific visible changes and result

1. Timeline: old four-column table-like list -> two-column editorial production cue sheet, large numbered steps, clear moment titles, original subtle waveform, service detail link. Original Green Sound event moment text retained; no fabricated times.
2. Recommended services: old static text row list -> distinctive dark emerald typographic index, service detail links, native selection toggles with pressed state, and a functional Contact handoff panel. Rendered headings and copy have clear hierarchy on desktop and mobile; no copied marketing imagery.
3. Conversion: choose at least two real catalogue services (e.g. DJ & MC and fum greu), then a **native GET** sends only permitted `event` and pipe-separated `services` labels to `/contact` for prefill. No auto-sending or booking.
4. SSR/accessibility: actual issue found by CI — E2E clicks arrived before hydration of SSR button markup. A `useHydrated` gate and explicit E2E wait corrected it. Native semantic buttons/links, `aria-pressed`, `aria-live`, visible focus; Lite/reduced CSS safety preserved.

## Measured CI results at V89 app SHA

- TypeScript strict: pass
- Production SSR build: pass
- Shared gzip CSS: 51.3/52.0 kB; home entry: 110.9/190 kB; QuoteForm: 31.2/50 kB
- Vitest: 84/84 assertions in 30 files
- Real Chromium browser at six viewport widths: pass
- Two-service Contact handoff, form prefill, SSR/no-JS/hydration, 20 SEO pages/sitemap: pass
- No added dependencies, images, video/audio assets, autoplay, external API or cost

## Known limitations / release gate

- **Not measured:** Lighthouse/field LCP, real conversions/SEO positions, cross-browser physical touch/VoiceOver/TalkBack. Never claim 100/100.
- Long section-element screenshot captures can show fixed navigation and mobile action bar across intermediate stitched section pixels. This is not evidence they are broken or perfect; physical mobile viewport and focus/scroll obstruction audit remains in backlog.
- This exact QA documentation addition advances branch HEAD: a **new CI run on final head** is required, even if the cited application source SHA passed.
- Main/deployment unmodified. No merge until SHA-exact CI+visual+conflict checks and verified main backup tag/rollback. Separate permission for publication if CD auto-deploys.

## Next zone

Audit `/contact` Guided Event Brief and direct conversion experience, including two-service selection, validation, keyboard, error feedback, clipboard grant/denial and mobile UI. Keep individual event pages/production cue sheet untouched while rotating main work.
