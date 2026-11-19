# V249 — Finder keyboard modifier safety (2026-11-19)

## One-zone audit: global navigation / Finder
Based on V248 draft branch. The Finder keyboard handler recognized Ctrl/Meta+K even with Shift held, potentially intercepting distinct browser/assistive keyboard combinations. The handler now requires no Shift (and already required no Alt). Slash remains unchanged. No new dependency, assets, media, network requests, backend, or homepage section.

## Research
- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey — check modifier state explicitly. No third-party code copied.
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ — preserve dialog keyboard conventions and Escape behavior. No third-party code copied.

## Verification status
Source change + Vitest source-regression assertion committed. **Not yet certified**: TypeScript, SSR build, full Vitest, gzip, Chromium six widths, Finder focus/Escape and exact-head CI. No before/after Chromium screenshots obtained for this keyboard-only change; no visual redesign claim. The screenshot gate remains pending. Confirm the previous V248 branch QA before stacking for release.

## Release safety
Draft only. Do not merge main, deploy, add dependencies or modify domain. Next rotation: Contact form mobile and clipboard error flows, with real browser before/after screenshots.
