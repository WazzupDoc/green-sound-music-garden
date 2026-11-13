# Green Sound Music V26 — Signature interactions, references and technical audit

Date: 2026-11-11

## Design decision
Make Green Sound feel like a music/event production company without faking concerts, copying another agency or hijacking the visitor's browser.

### Sources reviewed (inspiration, not imported assets)
- [Google Chrome, Modern Web Guidance: Motion](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/motion) recommends transform/opacity, prefers-reduced-motion and non-urgent decorative animations that avoid scrolling and accessibility regressions.
- [W3C, WCAG 2.2, Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions) emphasizes making nonessential movement suppressible and providing a motion-reduced variant.
- [GitHub, cursor-effects open-source topic](https://github.com/topics/cursor-effects) offers cursor concepts (e.g. velocity followers), but this version implements **original small code** instead of importing a large dependency or copying someone else's design.
- [Reddit, webdesign, March 2026, cursor hijacking complaints](https://www.reddit.com/r/webdesign/comments/1s5u1tm/rate_my_portfolio_website/) highlights practical problems with slow, imprecise custom cursor systems. We preserve native pointer + click target and use a decorative follower which is easily switched off.
- [Reddit, webdev, October 2026](https://www.reddit.com/r/webdev/comments/1wwhc8b/i_restyled_my_portfolio/) observes that excessive reveal, scroll and animated text undermine site usability. Consequently V26 adds meaningful, user-controlled FX, not automatic flashes or continuous soundtrack.
- [MDN, CSS performance](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS) explains that animating many properties can degrade performance and recommends CSS transform/opacity over layout-affecting motion.

## V26 built components
- `SoundCursor.tsx` and `signature-cursor.css`: musical-note SVG, two-stage feedback, optional visual equalizer and actionable hover labels. Precise native pointer stays intact. Pointer movements are sampled via one RAF and written to CSS transforms; no dynamic network requests or analytics. Disabled below desktop width, with coarse pointer, reduced motion, or save-data.
- `StageHero.tsx` and `light-desk.css`: viewer can direct light tone and energy from a meaningful native details panel. The hero's real photo and semantic H1 remain unchanged; no autoplay. Stage effects are decorative and not a product configuration claim.
- `QuoteForm.tsx` and `quote-preview.css`: message is prepared on successful schema validation, shown in a clear review step, with valid mailto and wa.me links. The call to `window.open` from asynchronous form validation was removed. There is no server-side submission; the visitor sends deliberately.
- `EditorialPortfolio.tsx`, `PortfolioJournal.tsx`, `routes/portofoliu.tsx`: selected verified film can be opened in the archive via shareable validated route query. No new third-party embed until visitor explicitly plays.
- `blocks.tsx`: embedded quote forms are progressive-enhanced `ClientOnly` components with a meaningful SSR contact fallback.

## Safety, a11y, privacy, media
- No stock, AI-created or scraped images were included. Green Sound's own first-party photographs and documented published video identifiers remain the sole featured content; verify editorial and privacy permissions before publication.
- The cursor doesn't conceal the native cursor or interfere with focus, mouse clicks or text selection. It is `aria-hidden`. Its toggle has an explicit label.
- Hover interactions aren't required for key information: every CTA remains a normal button/link.
- No autoplay audio, flashing strobe effects, hidden navigation or false "sent successfully" states.
- Video loads only after Play. No invented prices, capacity, availability, awards, client testimonials or usage metrics.

## Verification checklist
- [ ] TypeScript strict / SSR-Vite production build / existing tests.
- [ ] Playwright Chromium 360, 390, 430, 768, 1440, 1920.
- [ ] Desktop 1440 cursor toggle, mouse tracking and context labels.
- [ ] No decorative cursor on narrow screens or reduced motion.
- [ ] Stage Light Desk: 3 palette options, intensity slider, on/off and current visual state.
- [ ] Quote validated with real-looking but non-delivered test fields, verify message preview/links, edit and no auto-submit.
- [ ] Homepage reel deep-link selects the intended archived clip and does not play it.
- [ ] Manual preview on touch device, actual desktop mouse, keyboard, reduced-motion and default image loading.
- [ ] Lighthouse, Core Web Vitals and live content checks on a separately deployed QA preview.
- [ ] Explicit owner approval before merging or deploying to `main`.
