# V251 — Navigation CI regression (2026-11-19)

Area: mobile navigation keyboard behavior. Base: V250 `81ea4bf2d8050f8cb5457a8d425dae4be1429de1`.

Observed: [V250 exact-head CI](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44549448593) failed in `Test existing application`: `site-header-v189.test.ts` expected the old three-modifier guard, while V250 correctly added `event.shiftKey`. CI reported 1 failed and 180 passed tests (69 files). This is a stale source assertion, not evidence of a browser regression.

Fix: update the legacy V189 test to expect all four modifiers; retain the V250 regression and production behavior. No application code, assets, packages or homepage changed. This is **not a visual redesign**.

QA required: new exact-head CI, strict TS, SSR, Vitest, gzip, six Chromium widths, native mobile Shift+Arrow/Home/End, unmodified arrows, Tab/Escape/focus return, reduced-motion and Lite. No matched screenshots captured in this iteration; browser accessibility remains unverified. Keep draft and main unchanged.

Research: [MDN KeyboardEvent.shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey), [WAI-ARIA keyboard interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/). No external code copied. Next rotation: Contact prefill and clipboard UX.
