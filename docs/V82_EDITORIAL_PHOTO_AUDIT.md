## V82 — Editorial service photography visibility (2026-11-13)

- Branch `design/v82-editorial-photo-visibility` based on V81. Single audited zone: homepage editorial service programme, retaining 3 chapters / 8 service links / 3 existing photos / one final CTA.
- Changed `src/styles/production-index.css`: reduced near-black overlay (top alpha 0x52→0x20, bottom 0xc9→0x91), improved image luminance and saturation while keeping labels on darker bottom. No new assets, dependencies, homepage sections or network calls.
- Visual hypothesis: event photos previously appeared underfilled/dark in V81 screenshots. Contrast of photo labels, perceived color, actual original image quality and visual difference need real same-state before/after Chromium screenshots at 390 and 1440; NOT verified in this run.
- CI TypeScript/SSR/Vitest/gzip/Chromium exact-head: NOT YET VERIFIED. Main and deployment untouched. Rollback: revert the single CSS commit.
- Next rotation: real film gallery and video controls; then event discovery and Contact.
