## 2026-11-13 — V81 / Stage Index: modal navigation as a production stage programme

- **Professional reference #1:** https://webflow.com/made-in-webflow/website/fullscreen-webflow-navigation (Jonas Arleth); observed: full-viewport responsive menu and deliberate open/close staging. Adapted independently: one full-screen stage index with branded six-route numbering and practical controls, **not** its gradient, animations or cloned code. License: reference only, no assets/source reused.
- **Professional reference #2:** https://assets.awwwards.com/awards/gallery/2023/07/HOT-RIGHT-NOW-BOOK-2023.pdf (Awwwards editorial Neutra VDL coverage, p.115 / index presentation); observed: the navigation index can be a typographic information hierarchy rather than a generic card set. Adapted independently: asymmetrically offset large sans links, supporting serif phrase, disciplined scene grid. No screenshot, image, typography asset or site code copied. Source used for visual analysis only.
- **Accessibility specification:** https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog and https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-modal. The previous V80 navigation rendered a div with role=dialog/aria-modal but did not make the background inert. V81 uses native `<dialog>.showModal()` / `close()`, native top layer and keyboard focus containment, Escape onCancel, and opener focus restoration. Fallback is direct semantic links with the menu closed; progressive enhancement without new package.
- **Original single signature experiment:** STAGE INDEX, a visual backstage directory: six canonical routes as numbered stage cues against originally authored thin-line perspective rig SVG. Familiar labels support wayfinding. No hero/card duplication or extra home section. Mobile uses smaller type and scrollable native dialog.
- **Performance:** no new JS library, image, media, font, remote request or custom tracking; one dedicated original CSS file. Removed dormant old mobile menu CSS rules in two existing style files. Initial CI measured 52.6 kB gzip shared CSS vs 52 kB cap; shrinking selectors yielded 52.4 kB, still failing. **Without raising the budget**, the original CSS is now a component-scoped Vite `?inline` import rendered as trusted first-party `<style>` in SSR SiteHeader; no extra runtime CSS network request. This shifts bytes from global CSS to the header/client payload; verify CSP allowance, actual gzip, SSR inclusion and browser styling in new exact-head CI.
- **Motion + safety:** limited compositor translateY/opacity entrance on full-motion only; CSS `prefers-reduced-motion` and `data-gs-performance=lite` disable it. Focus-visible contrast and scrollable panel. Direct e2e snapshots and Escape/focus checks added; result pending GitHub Actions.
- **Ideas rejected:** cloning Webflow template; commercial brand photos; another homepage CTA; auto-playing stage footage; GSAP addition; cursor hijack and scroll hijack; custom ARIA focus-trap replacing a platform primitive.
- **Rights/provenance:** typography from existing installed project packages; manual inline original SVG paths and CSS, no third-party code. No attribution/license needed for independently authored components. Existing imagery untouched.

---

## 2026-11-13 — V80 / Stage architecture, optical depth and motion safety

- Webflow animation examples: https://webflow.com/blog/webpage-animation (OneTech 3D integration, LITHOSQUARE restraint): adapted the principle that motion and architecture must reinforce the composition. No design, image or source code copied.
- Webflow motion guidance: https://help.webflow.com/hc/en-us/articles/42466201896083-Use-thoughtful-motion-and-animation : animations should not flash, should not carry essential information and need reduced-motion alternatives. Adapted by keeping new stage wings and footlight static; existing moving scanners remain gated.
- MDN reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion : footlight blur disabled in Lite and reduced-motion, scanners already paused. No external code copied.
- Experiment: original CSS-only stage wings + optical floor wash, positioned on right behind the hero copy. Distinct from V79 neon portal geometry; no new image, SVG, package or font. License: original project-authored CSS. New dependency: none. Rollback: revert CSS addition; preserve V79 architecture.
- Rejected: autoplay video, Lenis scroll hijack, expensive WebGL, a fourth decorative beam, stock event photographs, oversized headline overlays. No screenshots or performance measurements available at implementation time; visual outcome remains **unverified** until Chromium artifact review.

## 2026-11-13 — V78 / Visual credibility, stage imagery and accessible motion

- Screenshot observations (user-provided PDF exports, not third-party reference): first viewport dominated by an unstyled white circular waveform on top of a nearly invisible real stage photograph; headline falls below the fold; inner pages have large blank zones and reused layout. Reproduced by code inspection: essential CSS files missing from the **loaded** `src/styles.css` import graph. Adaptation: import existing project-original CSS; reject more cosmetic elements until prior work actually renders.
- Webflow typography: https://webflow.com/blog/typographic-design — strong expressive headline and visual hierarchy improve immediate recognition; adaptation: two-line Romanian first-screen headline and readable service description; no source code, photo or identity copied, licensing not applicable to independently written CSS.
- Webflow visual storytelling: https://webflow.com/blog/storytelling-websites — purposeful large imagery and constrained CTA; adaptation: foreground authentic Green Sound stage photo instead of opaque overlaid SVG and widgets. Rejected background autoplay and endless scroll/video animations.
- MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion — optional stage light sweep disabled under reduced motion and Lite; additionally pause when offscreen. No external code copied.
- web.dev: https://web.dev/articles/optimize-lcp — keep first hero image as SSR-discoverable `<img>` with first-scene fetchPriority high; do not declare measured LCP or load additional hero assets without performance evidence.
- New dependency/license decision: **none**. All CSS and stage effects are originally authored, no imported images/fonts/music; stock/AI imagery not used.
- TESTUL DE ADĂUGARE: original stage aperture + one compositor transform/opacity light sweep. Differentiation: real concert image + contained framing; utility: exposes service hero instead of dominating stamp; accessibility: decorative/aria-hidden, Lite/reduced disabled; SSR: pure CSS; cost/license: zero; rollback: remove `stage-v78.css` import + restore previous Hero from V77. Browser performance/visual tests must still be confirmed.
- Idei respinse: old oversized circle/abstract logo over real show; additional homepage widgets; animated third-party concert video; generated photos described as actual events; scroll hijack; packages added just for effects.

---


## 2026-11-13 — V77 Light Desk keyboard interaction
- Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details — native details/summary disclosure supports keyboard activation and a programmatic open state. No external code/assets copied; reference documentation only (license not applicable to implementation). Adaptation: Escape closes only the expanded hero Light Desk and restores focus to its summary. Rejected: new dialog/accordion dependency, keyboard trap and autoplay.
- Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/summary — summary remains the native focusable toggle. This is an accessibility experiment; browser verification pending.

## 2026-11-13 — V76 editorial browser regression

- Source: https://playwright.dev/docs/locators — stable role/locator assertions; adapted to the actual V48 editorial components, not the retired Regia selectors. No copied code or new dependency. Rejected bypassing the failing browser step or leaving its old assertions in place.
- Source: https://web.dev/articles/optimize-lcp — screenshots and load checks are not LCP measurements; no LCP score claimed. No new assets.

## 2026-11-13 — V75 focus-visible regression / CI

- Source: https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible — keyboard-intent focus cue, no code copied; CSS semantics adapted in source-level tests only.
- Source: https://developer.mozilla.org/en-US/docs/Web/CSS/:has — parent highlighting from focused child, no external code/assets or license required.
- Rejected: restoring broad `:focus-within` zoom and adding a new focus animation; this would reintroduce pointer-triggered motion and degrade reduced-motion/Lite behavior.
- CI evidence: V74 exact-head workflow https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43362462854 failed at 3 stale CSS assertions, after strict TS/SSR/gzip passed. No dependency added; tests now assert the actual scoped focus-visible and grouped Lite/reduced-motion behavior. Browser validation remains pending.

## 2026-11-13 — V74 / Node file URLs in Vitest CI

- [Node.js `fileURLToPath` API](https://nodejs.org/api/url.html#urlfileurltopathurl): expects `file:` URL; transformed module URLs may be other schemes. Technique: avoid converting transformed `import.meta.url` to filesystem path in source-reading tests.
- [Vitest environment guide](https://vitest.dev/guide/environment.html): test files run under a transformed module runner. Adaptation: use repository-root fixture paths with Node `readFileSync`, consistent with CI working directory; no dependency or copied code. Rejected: disabling eight tests, changing global Vitest runner, or silencing URL exceptions. Verification: exact-head CI pending.

## 2026-11-13 — V73 TypeScript strictness / release gate

- Official TypeScript TSConfig `noUncheckedIndexedAccess`: https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html — indexed array reads can be undefined even after a regex matches; explicitly guard year/month/day and month lookup. Applied to Contact date validator. No third-party code or dependency.
- Official TypeScript strict null checks: https://www.typescriptlang.org/tsconfig/strictNullChecks.html — optional indexed match groups and fixture access must be checked; applied to CSS test. No new assets/licenses.
- Rejected: non-null assertions everywhere or disabling `noUncheckedIndexedAccess`, since either hides the actual CI regression. No visual experiment added while release gate fails.

## 2026-11-13 — V71 restore homepage composition (critical regression)

- First-party comparative research: V48 `src/routes/index.tsx` at `design/crafted-atmospheres-v48-editorial-reset` vs V70 same file, plus live component source `RegiaHome.tsx` (no external license). V70 had reintroduced event selector, backstage and redundant calls to action. User-approved V48 architecture is the ground truth.
- Reference design research: https://www.awwwards.com/websites/music-sound/ (editorial inspiration, not reusable code/assets); https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html (semantic heading structure); https://web.dev/articles/optimize-lcp (hero LCP guidance; no priority changes without measurement). No external source copied, no new dependency.
- Applied: restore validated V48 route and add first-party source regression test. Experiment gate: distinct identity = asymmetric editorial service programme; utility = clear journey to services/films/Contact; performance = fewer homepage widgets expected but **not measured**; a11y = native section headings and links retained; SSR = existing components; licensing = no new assets; testing = regression authored, execution pending; rollback = revert V71 route/test/docs commits.
- Rejected: add animated event chooser or new film carousel on homepage, because duplicates dedicated routes and contradicts V48 clean composition. Defer hero LCP/preload edits until real browser LCP audit.

## 2026-11-13 — V70 editorial photograph motion gate

- Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion (documentation; no code copied), https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover (capability query), and https://web.dev/articles/optimize-lcp (image loading principles). Reviewed as implementation guidance; no dependency or external asset integrated. The Awwwards music/sound reference is conceptual only, not a license to copy identity: https://www.awwwards.com/websites/music-sound/ . URLs listed for verification; no measured LCP or claim of live SERP research.
- Applied: decorative photo scale on service-chapter hover now requires `hover:hover`, `prefers-reduced-motion:no-preference`, and no `data-gs-performance=lite`. Original image/filter and focus outline remain. CSS-only, zero new JS, packages or assets; exact-head tests/browser not yet executed. Rollback: revert V70 CSS/test/docs commits.
- Addition test: differentiation = editorial image treatment retained; utility = less involuntary movement; performance = avoids optional transform in Lite (not measured); a11y = reduced motion respected; SSR = CSS-only; license/cost = none; test = static Vitest authored, not executed. Rejected: continuous parallax, cursor-following photo distortion and autoplay, due to motion/CPU/accessibility costs.

## 2026-11-13 — V69 Contact calendar date validation

- Sources consulted 2026-11-13: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date and https://www.w3.org/WAI/tutorials/images/decorative/ . The first informed strict calendar date handling; the second was reviewed for editorial photo semantics, but image alt changes were rejected without image-by-image evidence.
- Applied: original zero-dependency Gregorian calendar validator for untrusted Contact date query prefill; validates YYYY-MM-DD, leap years, month lengths without timezone coercion. Unit cases include 1900/2000 leap distinction, 31 April, invalid months and malformed values. No external code copied.
- Experiment gate: utility (prevents impossible prefilled dates), differentiation (not visual, intentional), performance (tiny synchronous check, unmeasured), accessibility (avoids misleading form data), SSR (pure deterministic), cost/license (none), testing (Vitest authored, execution unconfirmed), rollback (revert V69 commits). Rejected: Date.parse normalization and client-side date libraries, which add ambiguity or dependencies.

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

## 2026-11-13 — V72 hero stage motion gate
- Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion — CSS user preference media query; adapted by disabling only decorative stage layers and transitions. No third-party code or assets copied; documentation is a reference, not a software dependency.
- Reference: https://web.dev/articles/optimize-lcp — prioritise visible content and avoid unnecessary render work. The existing real hero photograph is retained; no unmeasured LCP improvement claimed.
- Experiment: CSS-only Lite + reduced-motion stage suppression, no new dependency (0 added bytes of JS). Rejected: deleting the stage photo or globally disabling all transitions, which would harm presentation and unrelated controls. Needs six-width browser QA.


## 2026-11-13 — V79 kinetic stage architecture
- Reference inspiration: https://www.awwwards.com/websites/music-sound/ (music/sound visual language; no source code or artwork copied); https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/perspective and https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-style (native CSS 3D projection). No third-party code or dependency used.
- Original implementation: two depth-separated truss portals, perspectival stage deck, dual angular scanning fixtures; preserve real concert image; decorative DOM aria-hidden; pause animations for Lite, reduced motion, offscreen and light-off.
- Rejected: generic blob/glow overlays and new WebGL runtime/dependency (higher complexity/performance cost). Visual comparison and browser QA still required before merge.
