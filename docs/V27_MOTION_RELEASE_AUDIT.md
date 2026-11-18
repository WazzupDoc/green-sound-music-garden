# V27 / GREEN SOUND MUSIC — Motion & Recovery Design Audit
Date: 2026-11-11
Review branch: `design/crafted-atmospheres-v27-motion-and-offstage`
Draft PR: https://github.com/WazzupDoc/green-sound-music-garden/pull/12
Do not deploy or merge without owner approval.

## UX design choice
Green Sound Music is an event-production company, not a template gallery.
The site must evoke a real soundstage and guide visitors to actual
service information; a technically missing page should not become a dead end.

**Offstage Room**: missing route 404 says:
"Aici încă nu a început spectacolul." followed by
"Dar putem fi prezenți la petrecerea ta".
Branding features verified first-party concert imagery, a non-audio
waveform, and three direct paths: Contact, Events and home, plus phone.
Technical rendering errors get a distinct, truthful explanation and a
retry that invalidates the router and resets its error boundary. They
are never called a 404 or declared successfully fixed without action.
Search engines should see the route's genuine missing-status semantics;
review actual SSR HTTP status on deployment.

**Frequency**: a bespoke 36-bar audio-inspired editorial interlude that
connects the current user-configurable Light Desk / Soundcheck to the
first-party showreel. It has no actual audio, no third-party loading,
no pointer interception, and meaningful CTA copy. Bars are full-sized
by default (no hidden content). When the UA supports both native CSS
`animation-timeline: view()` and `animation-range: entry`, the desktop
graphic can gently scale into position as the visitor scrolls. Mobile
and motion-reduced devices keep the full, static layout.

## Web research used (inspiration and standards, not copied implementation)
- Chrome for Developers (current): https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/scroll-entry-exit-effects — progressive CSS-only scroll animation, feature detection for `animation-range`, composited properties, user motion preferences.
- Chrome for Developers: https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/motion — animate opacity and transform, do not make content depend on animation.
- MDN: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS — expensive CSS properties, reduced motion, limiting expensive animations.
- web.dev: https://web.dev/articles/animations-guide — prefer compositor-only animations, audit paint flashing, use will-change sparingly.
- MDN: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API — optional browser support; avoid hijacking navigation or introducing an unsupported SPA transition wrapper.
- Reddit comments from recent design discussions are qualitative, not evidence of conversion improvements; no claims of guaranteed awards, ranking or conversion.

## Quality constraints
- No new npm runtime dependency, no unlicensed media, no fabricated testimonials/metrics, no sound playing without consent.
- The 404 and runtime error fallback use exactly one real H1, explicit CTA, and meaningful button actions; image is decorative in context.
- Waveform bars have no content or focusable elements, are excluded from accessibility tree, and stop movement for reduced-motion settings.
- CSS animation uses transform and opacity. Browser without `animation-timeline` displays fully finished graphic.
- Mobile-first vertical stacking and viewport-adjusted typography prevent horizontal overflow.
- The reusable stage fallback is a React component, not duplicated markup.

## CI incident and improvement
V26's build and TypeScript passed, but Playwright browser setup failed because
`npx playwright install --with-deps chromium` ran `apt` on a GitHub runner
and its Ubuntu DNS mirrors failed. This was an infrastructure issue, not proof
of browser behavior. V27 removes `--with-deps` (GitHub's Ubuntu image already
supplies Chromium libraries) and caches `~/.cache/ms-playwright`.
This removes unnecessary apt network dependency, but full E2E still needs
its **actual** successful run before considering the change validated.

## Release checklist
- [ ] GitHub Actions: TypeScript strict, TanStack Start SSR build and unit suite
- [ ] Chromium responsive browser run at 360,390,430,768,1440,1920
- [ ] Custom 404 route real HTTP 404 response verified on staging SSR
- [ ] 404 heading, contact/event/home links, direct phone, no overflow
- [ ] ErrorBoundary actual retry works on a controlled test error
- [ ] Reduced-motion and non-supporting browser static fallback
- [ ] Original gallery, Light Desk, Music cursor, Event Pass and native contact prefill still work
- [ ] Lighthouse/field LCP/INP/CLS measured on a real deployment; no invented 100/100 score
- [ ] Owner reviews wording, genuine images, privacy terms and explicitly approves release
