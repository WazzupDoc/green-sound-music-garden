# V28 — Green Sound Music / Professional Journey & UX Release Audit
Date: 2026-11-11
Branch: `design/crafted-atmospheres-v28-production-journey`
Draft PR: https://github.com/WazzupDoc/green-sound-music-garden/pull/13

## Design direction
The V20–V27 homepage already has a visual Light Desk, Soundcheck, film archive,
editorial rhythm and contact process. Adding more sound or a heavyweight 3D
hero would slow the experience and confuse business intent. V28 instead
elevates the underdeveloped "About" experience with a real production story,
while fixing mobile navigation and hero resource prioritization site-wide.

### Production Journey
Four visitor-controlled chapters on /despre-noi:
1. Ideea — clarify event, date, place and what matters;
2. Atmosfera — discuss DJ/MC, live music and musical identity;
3. Producția — discuss audio, stage, lighting and room needs;
4. Momentul — see genuine examples and continue toward a contact request.

Each scene is built from `images` in `src/data/site.ts` (first-party
Green Sound event pictures), not AI stock or fictional client campaigns.
Content says "așa poate prinde contur" rather than implying a contractual
or guaranteed fixed workflow. Controls are semantic real buttons using
`aria-pressed`, with sequential and wraparound navigation. No auto-progress,
background video, popups or new npm packages. All content exists in initial
HTML via the four buttons; the main explanatory panel updates explicitly on
the visitor's action. No motion is required to read it.

### Responsive and accessible UX
At mobile widths, four step controls form a 2x2 grid before the active
photo/story; no sideways scrolling or gestural-only navigation. A reduced
motion preference turns off composited image and chapter reveal effects.
The mobile navigation is a disclosure, not a modal; focus enters the first
link on opening, Escape closes and returns to the trigger, and outside pointer
interaction closes it. We do not wrongly claim `aria-modal` or add a
keyboard trap.

### Performance
The first-party hero image is already present in SSR HTML with `fetchPriority=high` on its real `img`. React 19 **automatically** emits a corresponding high-priority image preload, so a second explicit route-head preload was duplicating the resource hint (verified by Chromium). V28 removes the extra head declaration and tests that exactly one native high-priority preload remains. Below-the-fold photos are lazy, async-decode and intrinsic-size dimensioned to reduce CLS. This is a browser scheduling hint,
not a measured LCP improvement until a deployed staging build is profiled.

## References examined (ideas/standards, no copied code)
- Chrome for Developers modern performance guidance:
  https://developer.chrome.com/docs/modern-web-guidance/guides/performance/performance
- web.dev fetch priority:
  https://web.dev/articles/fetch-priority
- web.dev Optimize LCP:
  https://web.dev/articles/optimize-lcp
- W3C keyboard interface focus persistence:
  https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
- W3C menu and dialog distinctions:
  https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- Creators Agency, Buenas Open 2025:
  https://creatorsagency.be/selected-projects/buenas-open/
  Reference: site-specific experiences work better than copying a
  generic "premium" interaction. No content or assets copied.

## Release gate
- [ ] Strict TypeScript check, SSR production build and application tests
- [ ] Chromium at 360, 390, 430, 768, 1440, 1920, no console errors
- [ ] 390 and 1440 keyboard and production story interaction checks
- [ ] On mobile: no horizontal overflow, 2x2 navigation accessible
- [ ] Browser head preload priority matches real hero image resource
- [ ] New screenshot review of /despre-noi at 390 and 1440
- [ ] User keyboard, screenreader, reduced-motion checks on actual devices
- [ ] Confirm media licenses, business service claims and privacy with owner
- [ ] Measure Core Web Vitals on a real staging deployment, not Vite preview
- [ ] No merge or public domain deployment without explicit owner approval

No guaranteed Awwwards results, conversions, search rankings or 100/100
Lighthouse scores are asserted.

## LCP finding from actual V28 browser test
The initial audit found two high-priority preloads pointing at the same real concert WebP: React 19's automatic `img fetchPriority=high` preload plus an explicit `Route.head` preload. This was a code-level regression, not a Lighthouse field metric. Removed the duplicate, preserved the automatic preload and added a one-resource assertion. Don't reintroduce an explicit image preload unless SSR behavior materially changes.
