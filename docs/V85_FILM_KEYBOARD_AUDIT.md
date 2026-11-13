# V85 — Film directory keyboard audit (2026-11-13)

Base: V84 draft PR #79, head at branch creation c6ee7b6dd85471a4f702ff45f01f8ea759cc2208. Scope: homepage EditorialPortfolio film selector only. Three existing videos, no autoplay, no media replacement, no new dependencies, no backend.

## Implemented
Native film buttons now optionally accept ArrowDown/ArrowUp with wraparound and Home/End, update the chosen film and move focus to the corresponding native button. Tab remains ordinary document navigation; accessible hidden instruction is associated through aria-describedby. Existing aria-pressed, explicit Play, SSR-safe initial state and reduced-motion player are preserved.

## Research and rejected alternatives
- https://www.w3.org/WAI/ARIA/apg/patterns/radio/ — roving tabindex would imply a full radio-group semantics rewrite, rejected to preserve individually tabbable existing buttons.
- https://www.w3.org/WAI/ARIA/apg/patterns/listbox/ — listbox would add inappropriate option semantics for existing video choice buttons, rejected.
- No external code copied or assets used; behavior is original native React event handling, no license/dependency change.

## Evidence and release gate
Source contract test added. **No browser screenshot before/after or six-width execution has been obtained in this run**; no CI exact-head confirmation. Keyboard change is primarily functional, not a claimed visual redesign. Verify Chromium ArrowUp/Down/Home/End, focus, Escape where relevant, 390/1440 film/player screenshots, reduced-motion/Lite, TS, SSR, Vitest and gzip before acceptance. Main/production untouched. Next audit: event discovery routes.
