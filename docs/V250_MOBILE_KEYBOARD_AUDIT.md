# V250 — Mobile navigation modified-key safety (2026-11-19)

Zone: mobile navigation keyboard behavior, stacked on V249 (`b248d8899240874aec25df88b5098cd65a271b6f`).

Before: the six-link mobile directory captured Shift+Arrow and Shift+Home/End, called preventDefault and moved focus. After: modified combinations are left to the browser/assistive technology; plain arrows/Home/End and Tab/Escape remain as before. This is an accessibility/behavior correction, **not a visual redesign**. No assets, dependencies, service claims or homepage sections added.

Research: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey documents the modifier flag; https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/ documents keyboard/focus conventions; https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-keyshortcuts cautions against intercepting platform/AT shortcuts. Adapted only the principle, not external code or design. Rejected: replacing native links with ARIA menuitem roles, which would unnecessarily change semantics and Tab behavior.

Files: `src/components/site/SiteHeader.tsx`, `src/test/navigation-v250.test.ts`. Source regression added but not executed in this connector session. **QA pending:** strict TypeScript, SSR, Vitest, gzip, exact-head CI, Chromium 360/390/430/768/1440/1920, Shift+Arrow/Home/End, plain arrow, Tab, Escape and focus return, Lite/reduced motion. No before/after screenshots obtained; no visual improvement claimed. Do not merge or deploy. Next rotation: Contact prefill and validation browser QA.
