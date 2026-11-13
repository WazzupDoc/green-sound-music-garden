# V33B — Adaptive Performance / Copyable Event Pass

Updated 2026-11-11 | Source branch `design/crafted-atmospheres-v33-adaptive-performance`
Stacked review PR: https://github.com/WazzupDoc/green-sound-music-garden/pull/19
Review base: V33 safe structured data PR #18 (security serializer and tests integrated into this branch). Retains all V20–V32 work. No live deployment or main-branch changes.

## Problem confirmed in actual code and CI
- V32's GitHub Actions Vite production build logged approximately **155.7 kB gzip** for the homepage `index` chunk, **39.4 kB gzip** for shared CSS and **38.6 kB gzip** for the quote form chunk. These were measured **build artifacts**, not downloaded bytes on all routes, field performance, or Lighthouse scores.
- The StageHero already pauses offscreen animations through IntersectionObserver; ClientMotion already limits Lenis to desktop fine pointers and respects explicit reduced motion and Save-Data. However, other expensive decorative effects and moving spotlight updates were not uniformly disabled on a low-resource device. This is an incremental improvement, not an invented rewrite.
- The Event Pass already prepares the message for WhatsApp/email but offered no direct way to copy the text for other apps or handle denied clipboard permissions.

## Improvements
1. `src/lib/performance.ts`: a pure, unit-tested `shouldUseLiteEffects` helper reads Save-Data, 2G/slow-2G, reduced motion and reliably *corroborated* low-resource hints. Missing information defaults to full; no assumptions about user identity, hardware fingerprint logging, cookies, localStorage or telemetry.
2. ClientMotion sets `data-gs-performance="lite|full"` only after mount, preserving SSR hydration. It attaches only supported change listeners and cleans up. Lenis is never fetched in lite mode; if preferences change from full to lite, the enhanced scroller is destroyed and native scroll remains. No paid services or new dependencies.
3. Lightweight mode freezes stage light beams/flare, scroll-progress/frequency decorations, backdrop blur and music cursor, while the real stage image, scene choices, contact CTA and other meaningful content stay interactive. The StageHero no longer recalculates its moving mouse spotlight in lite mode.
4. The quote preview now exposes **Copiază mesajul**, explicitly initiated by the visitor. On verified clipboard success it tells the truth; on denied/unsupported API it displays a selectable manual textarea. Nothing is sent, stored or copied to any third party without a user action. WhatsApp/email options still work as before.
5. New GitHub Actions **gzip asset-size budgets** from actual Vite output: `index-*.js` <=190.0 kB gzip, `QuoteForm-*.js` <=50.0 kB gzip, `styles-*.css` <=52.0 kB gzip. These permit some design headroom but fail on substantial regressions. This is a measurable build regression gate, NOT actual site LCP/INP/CLS measurement.

## References reviewed
- MDN, NetworkInformation saveData is non-Baseline:
  https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/saveData
- MDN, NetworkInformation change event and optional support:
  https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/change_event
- MDN, performance budgets and their limitations:
  https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Performance_budgets
- web.dev, performance budgets 101:
  https://web.dev/articles/performance-budgets-101
- MDN Clipboard API/writeText (secure contexts, permissions vary):
  https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText

## Required release checks
- [ ] Strict TypeScript check and actual production SSR/Vite build.
- [ ] New `check-client-budget.py` passes using output files, not approximations.
- [ ] Pure profile unit cases: absent APIs, Save-Data, reduced motion, 2G,
      low memory, higher-end counterexamples.
- [ ] Chromium desktop Save-Data simulation: `data-gs-performance=lite`,
      stage beam animation disabled, cursor hidden, real scene/offer visible.
- [ ] Chromium quote preview: clipboard write and real copied contents verified,
      no false sent status; denied permission triggers truthful/manual fallback.
- [ ] Earlier V20–V32 interaction/404/SEO/sitemap/quote/menu regression suites
      pass at 360/390/430/768/1440/1920, plus reduced-motion checks.
- [ ] Inspect actual mobile and desktop screenshots.
- [ ] Real hardware audit Android/iOS and field CWV once an approved staging
      deployment exists. Build budgets alone cannot establish user-perceived speed.
- [ ] Media rights, consent/legal text and final public publication require owner approval.

No guaranteed 100/100 Lighthouse score, Google rank, instant WhatsApp message,
background processing, cookie storage or automatic sending is asserted.
