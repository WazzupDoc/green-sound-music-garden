# V90 — Spectrum Curtain / Verified visual QA

Date: 2026-11-13 · Single area: `/ → StageHero`

## Owner complaint & observed V89 baseline

The owner says the site keeps looking unchanged, especially the top hero background and lack of animation. Real screenshot inspected from **V89** current-homepage PR #86 (SHA `a0e6c3f6e0245f27e9ee0c6ef6d47f1ee75b1f07`): almost entirely black/purple photographic area and tiny green wave. We did NOT accept a minimal overlay as a sufficient redesign.

## Actual real-browser proof

| Condition | Real V89 before | Real V90 after |
| --- | --- | --- |
| Route | `/` | `/` |
| Browser | Chromium via GitHub Actions | Same Chromium workflow |
| Widths | 390px, 1440px | 390px, 1440px |
| Height and state | 900px page viewport, `prefers-reduced-motion: reduce`, hero element crop | Same |
| GitHub Actions | [V89 SUCCESS #43425095295](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43425095295) | [V90 SUCCESS #43429307850](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43429307850) |
| Screenshot artifact | [#14037051076](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43425095295/artifacts/14037051076) | [#14039850169](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43429307850/artifacts/14039850169) |
| Exact image files | `premium-v89-hero-1440.png`, `premium-v89-hero-390.png` | `spectrum-v90-hero-1440.png`, `spectrum-v90-hero-390.png` |

Screenshot views are the SAME route/element and viewport. A separate first-pass V90 screenshot was inspected and judged not distinct enough, so the candidate was **revised before approval**, not relabelled: strong diagonal-photo cut, deep emerald field and original spectrum architecture. The second V90 screenshot shows that geometry change unmistakably.

The CI artifact also contains `spectrum-v90-active-1440.png`, `spectrum-v90-lite-1440.png`, `spectrum-v90-lights-off-1440.png`. Chromium asserts that the original `gs-v90-breathe` animation *actually runs* on full-motion desktop, that computed SVG transform changes on real pointer movement, that headline animation `gs-v90-type-reveal` is active, and that Lite / Light Desk OFF disable the decorative animation. Six widths 360/390/430/768/1440/1920 preserve routing, no horizontal overflow, real photos, services, films, 404/sitemap and Contact behavior.

## Visual acceptance judgment

- **Changed visibly:** diagonal green photographic edge on desktop; green stage-light tonality and audio-ribbon vector drawing across upper hero; substantial dark emerald editorial background; category line on upper right; small existing V86 wave becomes background detail instead of the entire motion concept. Mobile shows a different clean green atmosphere and a static ribbon.
- **Changed functionally:** mouse movement now drives SVG transform because the pointer handler was moved from a `pointer-events:none` canvas onto the outer hero. Light Desk OFF, Lite, offscreen tab and reduced-motion remain respected.
- **Preserved:** original authentic Green Sound image, scene selection (Live / Private / Production), Light Desk and movie, H1, one home contact CTA, 3 editorial chapter blocks with 8 links, 3 true films and one finale CTA. No added external assets or extra package.
- **Not claimed:** an approved user-selected final aesthetic, performance 100 Lighthouse, true audio visualization, new event photography, physical mobile VoiceOver testing, production rollout. The actor/photo is the original purple/green scene; creative green grading does NOT create fictitious photo evidence.

## Measured tests at V90 app source

- **SHA:** `b6d6173c8344306a0214bfedcd9f1967d88ce9fd`.
- **GitHub Actions push and PR runs:** [#43429307850](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43429307850), [#43429300542](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43429300542) — both **SUCCESS**, exact SHA.
- **Vitest:** 84/84 in 30 suites; strict TypeScript; production SSR/Vite build; Playwright six-width + hover/reduced/Lite/Light Desk states; Contact no-JS/hydration; site wide SEO audit 20 pages all passed.
- **Gzip measured:** home entry 110.9/190 kB, Quote form 31.2/50 kB, global shared CSS 51.3/52 kB. Scoped original CSS adds route-local bytes but does not raise global budget. No Lighthouse/field LCP or conversion claim.
- **Release restriction:** these measurements were at the app source SHA. This documentation commit advances HEAD; recheck exact-head CI. No main merge or live deployment; backup tag, rollback, CD review and separate publication consent still required.

## Next rotation

Contact/Guided Event Brief UX and full error states, then service detail pages, studio, about, gallery/video, footer, SEO and global QA. The owner may also approve/reject this look; do not blindly multiply the spectral effect across all pages.
