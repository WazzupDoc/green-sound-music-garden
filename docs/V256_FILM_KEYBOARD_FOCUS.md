# V256 — Film Play keyboard focus (2026-11-19)

Area: shared VideoLite on pages displaying approved films. The full-size Play button lacked a visible focus treatment while its poster/title overlays could obscure the browser default. Added a 3px inset emerald focus outline to the button, preserving the poster, play/stop flow, privacy consent and reduced-motion behavior. No new dependency, asset, tracking, backend or homepage section.

Files: src/components/site/VideoLite.tsx; src/components/site/video-lite-v256.test.ts. Rollback: revert the two commits on this draft branch.

References for subsequent verification: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html and https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible . These are accessibility specifications/documentation, not copied source code. Alternative rejected: adding always-visible borders to every film (visual clutter and not keyboard-specific).

QA status: GitHub writes confirmed; TypeScript, SSR, Vitest, six-width Chromium, focus screenshot at 390/1440, and exact-head Actions **not executed/verified** in this run. No before/after screenshots claimed. Do not merge/deploy. Next rotation: event detail conversion and authenticated media provenance; confirm the focus ring in Chromium before release.
