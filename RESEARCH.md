## 2026-11-12 — V68 deterministic editorial service lookup

- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map (consulted 2026-11-12). Native Map preserves insertion order and supports keyed lookup; no third-party code or asset used.
- Applied: after the V67 source duplicate guard, construct one slug→service Map, replacing repeated Array.find lookups while retaining original service object references, chapter order, direct routes and SSR semantics. No new dependency. Bundle/performance change not measured; do not claim LCP improvement.
- Experiment gate: authentic differentiation (unchanged, deliberately), utility (deterministic content integrity), performance (bounded native lookup, unmeasured), a11y (unchanged), SSR (deterministic), cost/license (none), tests (new identity/order regression, not yet executed), rollback (revert V68 commits). Rejected: auto-generated service cards and client-side fetching (adds UI complexity and network cost).

## 2026-11-12 — V67 source catalogue integrity

- Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set — a Set removes duplicates, so comparing editorial slugs against a Set alone can conceal duplicate slugs in the original catalogue. Consulted 2026-11-12; documentation only, no code copied or new license.
- Applied: original fail-fast guard comparing source catalogue array length against its Set size before the existing editorial completeness check. Regression test documents the false-positive case. No new dependencies or runtime assets.
- Experiment gate: authentic correctness (yes), user utility (prevents ambiguous service routing), performance (one small module-init comparison, unmeasured), accessibility (unchanged), SSR (pure deterministic code), cost/license (none), testing (static Vitest added; execution pending), rollback (revert V67 commit). Rejected: client-side deduplication, which hides content mistakes and can remove a service silently.

## 2026-11-12 — V66 catalogue completeness

Reference: https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context — descriptive links must retain meaningful destinations. Applied original zero-dependency integrity check ensuring every existing catalogue slug appears exactly once in the editorial programme, plus Vitest set-equality test. No third-party code or assets copied. Rejected: a client-side auto-generated carousel or fallback link (could hide catalogue errors and violate the V48 editorial structure). Browser/CI validation pending.

## 2026-11-12 — V65 service-link integrity

Source: https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context (W3C, WCAG 2.2 SC 2.4.4). Technique: preserve descriptive individual service link text and prevent accidental duplicate destinations in the three-chapter programme. Applied: a zero-dependency build-time guard plus Vitest catalogue uniqueness regression. No source code copied; standard documentation is reference only. Rejected: adding another carousel or client-side selector, as it duplicates existing discovery and harms V48 editorial clarity. No external assets or licenses introduced.

## 2026-11-12 — V64 semantic editorial navigation

- web.dev responsive images: https://web.dev/learn/design/responsive-images — `srcset`/`sizes` can reduce transfer, but first-party image variants have not been verified; rejected inventing image paths or adding remote image transformations. No code copied.
- MDN image loading: https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading — preserve below-fold lazy loading until actual LCP/viewport measurements. No code copied.
- MDN HTML image reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img — retain intrinsic width/height for layout stability.
- Experiment accepted provisionally: accessible, chapter-specific list naming through existing headings/notes; no new UI, runtime package, asset or JS, pending browser/screen-reader verification. Rejected: global image priority boost without LCP evidence.

## 2026-11-12 — V63 editorial clarity and LCP restraint

- web.dev LCP: https://web.dev/articles/optimize-lcp — prioritize discoverability of the measured LCP resource; do not eagerly prioritize every image. No code or assets copied.
- web.dev Fetch Priority: https://web.dev/articles/fetch-priority — high fetch priority is selective, not a global default. No dependency/license involved.
- MDN image loading: https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading — lazy loading suits below-the-fold imagery; first-chapter position relative to viewport is not yet measured, so no premature loading override.
- Editorial experiment accepted provisionally: concise, factual service descriptions in three existing chapters, avoiding vague marketing. Existing company catalogue is the source; no new business claims or dependencies. Tests guard against regressions. Rollback: revert V63 content/test commits.
- Rejected: blanket fetchpriority=high on editorial photos (competes with hero); adding another CTA or feature selector (breaks V48 homepage restraint).

## 2026-11-12 — V62 touch hover persistence

- MDN keyboard accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Keyboard — native links and visible focus must survive interaction changes. Reference only, no code copied.
- MDN :focus-visible: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible — keyboard focus indication is distinct from hover. Reference only, no code copied.
- web.dev interaction performance: https://web.dev/articles/optimize-inp — avoid unnecessary visual work during input. Reference only; no measured INP improvement claimed.
- Experiment: CSS-only @media (hover:none) reset for sticky touch hover image zoom, arrow and label movement. Preserves native keyboard focus and Lite/reduced motion. No new dependencies/assets; reversible by removing V62 CSS/test. Browser validation pending.
- Ideas rejected: JS touch-detection listeners (unnecessary hydration and event cost); removing all desktop hover cues (worse affordance).

## 2026-11-12 — V61: CTA regression test reliability

- MDN JavaScript regex guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions — literal regex uses one backslash for a literal dot and shorthand classes. The previous test double-escaped these sequences, so a layout-affecting hover rule could escape detection. Source is documentation only, no code copied.
- Experiment accepted: replace fragile escaped regex with declaration-level inspection plus positive/negative mutation fixtures. No new package, visual effect, asset or runtime bytes. Rollback: revert V61 test commit.
- Ideas rejected: add CSS parser dependency for a single compact rule (extra package and attack surface); add runtime observer (unnecessary cost). Browser verification still required.

## 2026-11-12 — V60: editorial CTA stability

- web.dev performance animation guide: https://web.dev/articles/animations-guide — transform and opacity avoid layout work; do not add will-change without measurements. Documentation guidance, no code copied; no new license/dependency.
- Shopify performance guidance: https://shopify.dev/docs/storefronts/themes/best-practices/performance/use-transform-for-animations — supports transform instead of layout properties; reference only.
- Experiment accepted provisionally: replace intro CTA hover flex-gap expansion (15px to 22px) with a 4px arrow transform, only for no-preference and non-Lite. Preserve text, native link, focus outline and layout. Static regression added; six-width Chromium verification pending.
- Ideas rejected: animating CTA padding/gap (layout cost); persistent will-change (layer/memory cost); adding a second CTA (violates editorial direction).
- Rollback: revert V60 CSS/test commit. No performance or Lighthouse score asserted.

## 2026-11-12 — V59: keyboard-only editorial photo cue

- MDN keyboard accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Keyboard — interactive native links need visible keyboard focus, avoid altering tab order. Documentation only, no code copied.
- MDN :focus-visible: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible — modality-aware focus indication; use it to prevent pointer-click focus from triggering a chapter-level photographic cue. Documentation only.
- MDN content-visibility: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content-visibility — considered for offscreen content but rejected until LCP/layout measurements and screenshot audit because intrinsic sizing can affect long editorial layout.
- Experiment accepted provisionally: original CSS selector :has(.gs-index__service:focus-visible) instead of :focus-within; native link outline remains usable if :has unsupported. No new dependency/assets or script, SSR-safe, Lite and reduced-motion behavior preserved. Regression test added. Browser six-width and physical keyboard QA pending. Rollback: revert V59 selector commit.
- Ideas rejected: adding another interactive focus overlay or JS keyboard state; duplicates native focus, raises complexity.

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
