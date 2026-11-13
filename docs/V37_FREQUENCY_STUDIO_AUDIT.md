# V37 — Frequency Studio / Interaction, Accessibility and Real Performance Audit
Updated 2026-11-11
Working branch: `design/crafted-atmospheres-v37-frequency-studio`
Draft PR: https://github.com/WazzupDoc/green-sound-music-garden/pull/23
Review base: V36 `design/crafted-atmospheres-v36-contact-error-regression` (PR #22).

## Observed starting point
Before V37, the homepage already had a beautiful but **static** Frequency interlude
(`src/components/atelier/AtmosphereInterlude.tsx`): a 36-bar single-shape
waveform, introductory music copy and a portfolio link. A scroll-linked
progressive animation existed on capable browsers, but no direct user control
or real event-related next step. Other pages already had the Light Desk
(V26), Soundcheck (V22), Service Mix (V29), Frequency Finder (V30) and
Guided Quote (V34), so a duplicate stand-alone wizard would add page length
without value.

## What was built
- **One existing section upgraded rather than another section added.**
  Contrast between soft ivory, deep green sound-desk panel, visual meter,
  deliberate typographic hierarchy and tactile brand-specific controls.
- **Three original illustrative atmosphere states** with distinct rendered
  deterministic waveform profiles; each maps to one **real** event route
  from the `events` catalogue. The copy describes a potential feeling,
  not a specific previously performed event or booking.
- **Visual BPM slider** (68–140, native <input type=range>) controls a
  CSS duration of 120/BPM seconds. This is explicitly a *visual* rate,
  not actual musical playback or real live-event telemetry.
- **Play/pause** toggles only the moving bars, never hides controls or
  content. Screenshot/keyboard/regression tests prove changing mode resets
  to its declared visual tempo and the event deep-link changes correctly.
- **Lightweight animation**: 12 of the 36 bars are compositor-transform
  animations. The others are static, making the artwork visually rich
  without 36 independent infinite keyframe loops. No Canvas/WebGL,
  GSAP, remote video, audio playback, microphone, permission request,
  external effect dependency or per-frame React state updates.
- **Offscreen/hidden tab pause**: IntersectionObserver + document
  visibilitychange toggle a single `data-playing` attribute. Animation
  exists only while visible, the tab is active and the visitor has not
  paused it. Observer and listeners are removed on unmount.
- OS reduced-motion and the existing `data-gs-performance=lite`
  (Save-Data/2G/low memory) **override animation** while preserving
  all content and buttons. The CSS reduced-motion override is absolute.
- First-party event links, no fabricated price, review, booking,
  analytics, device fingerprint or user data storage.

## Accessibility and limitations
- Buttons use accessible text and `aria-pressed`; a labeled native range
  input is controllable by keyboard, touch and assistive technology.
- The scene note uses an atomic polite live region; decorative bars are
  `aria-hidden`, so 36 bars are never read by screen readers.
- Control sizes at least 48px on desktop and mobile (slider native).
  Visual focus outline and adequate text contrast are specified in CSS.
- There is no audio; the frequency lab is not an audio synthesizer.
  A visitor may switch a scene but no audio is produced.
- Under a user/browser reduce-motion preference, Pause state remains
  editable but motion is forcibly disabled. The section explicitly says
  OS and low-resource preferences override visual animation.
- Real Core Web Vitals and physical device GPU performance still require
  deployment to private staging; CI screenshots are synthetic browser QA.

## Reference guidance (not a copied design)
- WCAG 2.2 Pause, Stop, Hide:
  https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
- WCAG 2.2 Keyboard:
  https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html
- MDN prefers-reduced-motion:
  https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- MDN IntersectionObserver:
  https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- web.dev animation performance:
  https://web.dev/articles/animations-guide

## Release gates
- [ ] Strict TypeScript, SSR/Vite production build, existing unit tests
  and gzip size budgets; no increase over acceptable regression caps.
- [ ] E2E at both 390px / 1440px: real 3 scenes, visual tempo slider via
  native keyboard End, real /evenimente links, pause/resume and no audio.
- [ ] Offscreen/hidden view stops animations and does not hide content.
- [ ] Save-Data browser simulation and prefers-reduced-motion disable bars.
- [ ] Existing six-width responsive, keyboard, contact, 404, SEO,
  sitemap, service mix and guided quote regression suite passes.
- [ ] Capture and visually inspect real screenshots of phone and desktop.
- [ ] Owner checks any new editorial microcopy and physical device behavior.
- [ ] Never merge into main or publish official website without approval.
