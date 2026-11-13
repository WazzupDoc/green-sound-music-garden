# V34 — Guided Event Brief / Audit
Updated 2026-11-11
Branch: `design/crafted-atmospheres-v34-guided-quote`
Review PR #20: https://github.com/WazzupDoc/green-sound-music-garden/pull/20
Review base: V33B `design/crafted-atmospheres-v33-adaptive-performance` (PR #19).

## Actual gap and solution
The real eight-service catalogue plus the ninth "Nu știu încă — recomandați-mi"
option previously used unrestricted checkboxes. The form could therefore
create a contradictory combination or exceed Zod's eight-service maximum
without a visible selection limit/inline service error. It also presented
the same service choices regardless of the visitor's selected event type.

The V34 quote form improves this with a 2-step editorial introduction,
native checkbox selection feedback, real counters, and context-relevant
suggestions for one of five *actual* Green Sound events. No invented
packages, rates, discounts or scheduling/availability claims.

## Factual data boundaries
- Source-of-truth: `src/data/site.ts` exports `events[].recommended`
  (existing business-authored rationale), `services[].name` and
  `services[].formLabel`.
- `quoteRecommendations` maps event.formLabel to its actual recommendations.
  This means an unmatched custom event or studio selection shows no
  invented recommendation.
- Visitors actively select each suggested service. No automated precheck,
  implicit consent or background network request.
- `toggleQuoteService` ensures at most 8 real selected labels,
  no duplicate labels and exclusive choice of advisory fallback. The
  Zod `quoteSchema` independently rejects forged combinations.
- Existing Event Pass remains review-before-send and still supports
  WhatsApp, email, clipboard and manual copy (V33B).

## UX and accessibility
- Explicit fieldset and proper checkboxes, pressed states on suggestion
  buttons, focus-visible outline, min 46px service touch surfaces.
- Accessible live count or "RECOMANDARE SOLICITATĂ" status. If invalid,
  display summary and contextual inline service error.
- Two-column editorial recommendation cards desktop, single column
  below 650px, reduced-motion-safe (no new looping animations).
- Automatic event suggestions update only from an existing user choice.

## Standards / non-claims
- WCAG 2.2 form error identification and programmatic labels:
  https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html
- WCAG 2.2 Target Size (Minimum):
  https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- WAI Forms validation and helpful field feedback:
  https://www.w3.org/WAI/tutorials/forms/validation/
- React Hook Form controlled inputs: the existing project already uses
  Controller and useWatch; no new dependency or unreviewed tracking.
- Suggestions are editorial matching only, not recommendations based
  on user profiling, predictive pricing or booked availability.

## Release gates
- [ ] Strict TypeScript, SSR/Vite build, existing Vitest suite and asset budgets.
- [ ] New helper unit tests across all five event types, selection ceiling,
      exclusive recommendation fallback, Zod refusal of forged mixed labels.
- [ ] Chromium 390px wedding suggestions never auto-select; one-click adds
      exact real labels; switching to "Nu știu" clears real services;
      selecting one real service clears advice. All 8 real services allowed,
      no ninth contradictory selection.
- [ ] Chromium 1440px corporate suggestion cards, screenshot and no overflow.
- [ ] Previous V20–V33 six-width UI/SEO, contact, 404, clipboard, Save-Data,
      reduced-motion and SiteHeader regressions remain green.
- [ ] Review screenshots on iOS/Android on a staging server before launch.
- [ ] Business owner confirms service descriptions, availability practice,
      legal and privacy text before approving merge/deploy.

No live domain publication or main merge is authorized.
