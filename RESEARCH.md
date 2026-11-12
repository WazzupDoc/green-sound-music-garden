## 2026-11-12 — V58: layout-safe editorial hover (researched)

- MDN CSS performance: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS — changing padding requires layout; prefer transform for purely visual motion. Documentation only, no code copied.
- web.dev animation guidance: https://web.dev/articles/animations-guide — prefer transform/opacity over layout-affecting animations; avoid premature will-change and unnecessary compositor layers. Documentation only, no imported library.
- MDN reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion — motion should be optional and content preserved. Documentation only.
- Experiment accepted provisionally: shift only the existing service label by 3px on hover with transform, disabled for Lite/reduced motion; retain native focus outline and static color cue. Removes former padding animation which caused layout recomputation. Zero JS, dependencies, assets, SSR changes. Rollback: revert V58 CSS commit. Browser validation pending.
- Ideas rejected: GPU spotlight/WebGL (no demonstrated benefit, unnecessary complexity); always-on will-change (memory/layer cost).

## 2026-11-12 — Keyboard parity without heavy motion

- MDN, reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion (consulted 2026-11-12). Technique: CSS focus-within highlights chapter; zoom only when no reduced-motion and not Lite. Documentation, not copied code; no third-party software license involved.
- web.dev, responsive images: https://web.dev/learn/design/responsive-images (consulted 2026-11-12). Existing intrinsic width/height and lazy loading for below-fold editorial photographs retained; no imaginary srcset variants generated. Documentation only.
- Experiment gate: keyboard chapter cue accepted provisionally (useful, SSR-compatible, zero dependencies, reversible, no extra sections); pending six-width real browser QA. Rejected: additional JS cursor spotlight on focus, unnecessary motion and complexity.

# RESEARCH — Green Sound Music

## 2026-11-12 — Editorial numbering, accessibility and performance

1. MDN, prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion — CSS feature supports a reduced-motion alternative; existing editorial transitions already have a reduced-motion and Lite override. No code copied. Documentation content, not imported software.
2. web.dev, Optimize LCP (updated 2025-03-31): https://web.dev/articles/optimize-lcp — discover LCP media early, avoid lazy-loading actual LCP, only prioritize the genuine hero after measurement. Editorial chapter photos are below the hero; retain lazy loading. No code copied.
3. web.dev, Responsive images: https://web.dev/learn/design/responsive-images — images below the fold may be lazy; responsive variants need actual files and measured breakpoints before introducing srcset. No new external image URLs.
4. Lucide repository: https://github.com/lucide-icons/lucide — project explicitly lists ISC license; existing icons are reused rather than installing a second set. Source license ISC, no new code copied.

### Experiment V55 — accepted for draft evaluation

A continuous **01–08 running order** across three editorial chapters, implemented with native CSS counters and existing service links. No JavaScript, new package, external asset, autoplay, added homepage block, hydration dependency or new API. Maintains native link labels and focus states; visible number is decorative. Rollback: remove the V55 CSS counter rules. **Not yet visually validated in Chromium**; do not ship before six-width screenshot review and CI exact-head pass.

### Ideas rejected

- WebGL volumetric spotlight: unnecessary GPU cost and motion risk; no demonstrated conversion benefit, poor fit for Lite/reduced-motion.
- Unsplash people/event photography as proof of Green Sound work: misleading provenance; original owner media only.
- Another homepage interactive selector: duplicates dedicated Services/Contact workflows and contradicts V48 editorial reset.

### Measurement gaps

No measured Lighthouse scores, field LCP, real Search Console query volume or verified staging browser artifacts this run. No invented rankings or performance claims.
