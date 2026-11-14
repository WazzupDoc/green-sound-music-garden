
## 2026-11-14 — V113 filter recovery
References: https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html (live result feedback); https://www.w3.org/WAI/ARIA/apg/patterns/button/ (native accessible button semantics). Original code, no external license-dependent assets. Rejected animated badges and auto-reset filters: distracting and user-hostile. Premium editorial direction retained without new visual gimmicks.
## 2026-11-14 — V111 mobile gesture guard
- https://developer.mozilla.org/en-US/docs/Web/API/Touch_events — touchstart/touchmove/touchend/touchcancel behavior; adapted horizontal-dominance guard, multi-touch reset, cancellation cleanup. Documentation only; no code copied or dependency added.
- https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html — preserve button-based alternative to path-based gestures; existing Previous/Next controls retained. Documentation only.
- Rejected: intercepting all touchmove events/preventDefault (breaks scrolling), new gesture library (unnecessary bytes/license review), horizontal swipes without direction guard (accidental navigation).

2026-11-14: References for archive filter feedback: https://www.w3.org/WAI/ARIA/apg/patterns/button/ (pressed state), https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label (accessible names). Adapted: native buttons with visible category counts derived from local videos; rejected: animated counters and third-party UI package (unnecessary). No external code copied.

## 2026-11-14 — V107 filter state research notes
- Source-level UX analysis: filter state and URL film selection are independent; resetting filter on film navigation breaks user context. Implemented without dependencies.
- Reference for subsequent browser verification: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ (interaction guidance; not copied code), https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-pressed (toggle state). These URLs are references to review; live pages not fetched in this run. Rejected: syncing filter to every film link, because it complicates deep links and adds no demonstrated benefit.

## 2026-11-14 — V106 source integrity
Source review: existing V105 JSX had literal `\n` tokens in rendered markup, which are invalid TSX outside text. Fix uses only whitespace normalization; no third-party code or assets. References for later accessibility validation: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role and https://www.w3.org/WAI/ARIA/apg/ . No design copied; browser/CI validation pending.

## 2026-11-14 — V105 portfolio archive filter feedback
- W3C ARIA status pattern https://www.w3.org/WAI/ARIA/apg/patterns/status/ : announce concise state changes without moving focus; adapted original JSX string based on existing filter/player state, no external code copied.
- Webflow music website collection https://webflow.com/blog/music-websites-designed-with-webflow : existing editorial media discovery direction, reference only, not independently re-inspected in this run; no copied assets/design.
- Rejected automatic player start, forced focus on category change and announcing the entire video subtree. No new dependencies, licensed assets or invented film metadata.

## 2026-11-14 — V104 film selector
- W3C WAI ARIA APG status pattern: https://www.w3.org/WAI/ARIA/apg/patterns/status/ — a short status can communicate a selection change without moving focus. Applied original React markup only; no external code or dependency.
- W3C WAI ARIA live regions: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/ — minimize unnecessary announcements and keep keyboard focus stable. Rejected announcing the entire media player subtree and autoplay. These URLs are reference documentation, not independently browsed this run.

## 2026-11-13 — V102 gallery focus
Reference: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ — modal dialog should return focus to invoking element where possible. Adapted using existing Radix onCloseAutoFocus, no external code copied or dependency added. Rejected document-wide focus handler because it may interfere with other dialogs.


## 2026-11-13 — V97 clipboard denied retry
- https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText — clipboard writing can reject; no guarantee of permissions or secure context. Existing manual fallback preserved.
- https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html — predictable keyboard focus after failed action. Original React state/ref solution; no external code/assets or dependency.
- Rejected: deprecated document.execCommand('copy') and simulated success message; both would mislead or be unreliable.

## 2026-11-13 — V95 About production notes
- https://webflow.com/blog/music-websites-designed-with-webflow — inspected Trenchwerk and Toast Recording Studio examples: authenticity of production work and restrained editorial texture matter more than gimmicks. Adapted only the principle of media-led, story-specific hierarchy; no code/images/identity copied (not licensed for reuse).
- https://webflow.com/made-in-webflow/music — reviewed music portfolio patterns; adapted category-based hierarchy and a clear service route. Rejected cloneables, third-party player, autoplay and decorative 3D because they do not add factual value to About.
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion — implemented reduced-motion guard. No new dependency, no external assets; original CSS authored for this project.

## 2026-11-13 V94 — navigation / original production cue
- https://webflow.com/blog/music-websites-designed-with-webflow (checked 2026-11-13): Best Albums 2017 uses unusual navigation hierarchy, Trenchwerk expresses music through interaction. Adapted concept only: navigation should feel like a production index and respond visibly to focus, without copying layout, media or code. No Webflow code license assumed; no code copied.
- https://www.awwwards.com/websites/music-sound/ (reference collection): expressive typography and musical editorial pacing; inspiration only, no copied identity/code/assets.
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog (checked 2026-11-13): native modal top layer, initial focus, Escape and return-focus considerations. Existing native dialog retained, route-navigation focus issue fixed. Original CSS/TSX only, zero dependency.
- Rejected: fake mixing console/knobs in navigation, heavy 3D scene, autoplay, external images/fonts, and duplicated homepage widgets. Test of addition: useful 6-route navigation, clear active cue, CSS-only lightweight visuals, mobile one-column, SSR-safe, no license/cost, revert isolated PR. Visual approval pending actual Chromium comparison.

## 2026-11-13 — V93 Footer
- https://www.awwwards.com/websites/music-sound/ — reference: expressive editorial type and controlled visual cadence. Adapted original oversized Green Sound wordmark-as-type, not copied design or assets; no code license needed (original CSS).
- https://webflow.com/made-in-webflow/popular?search=music — reference: footer as closing brand signature with direct conversion action; adapted native /contact link; no external code or asset copied.
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion — original static typography, reduced-motion/Lite guarded. Rejected: autoplay audio, canvas, stock imagery, new JS dependencies and redundant footer widgets.

## 2026-11-13 — V90 / real 3D spatial photography vs generic AI-looking lighting
- Webflow official [12 music websites designed with Webflow](https://webflow.com/blog/music-websites-designed-with-webflow), inspected 2026-11-13: Trenchwerk's bass-themed music imagery and emby's parallax/rotation are examples of sound-connected, precise brand visual direction. **Adaptation**: ORIGINAL three-perspective-planes photographic composition and kinetic type expressing a show's layers; **rejected** copying Webflow layout/code/photos, automatic audio, visual gimmicks unrelated to actual business.
- [MDN transform-style](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-style) and [MDN CSS transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transforms), inspected 2026-11-13: use `perspective`, `transform-style:preserve-3d`, `rotateY` and `translateZ` with deterministic static media fallback. Our CSS is original, no open-source code copied. Rejected heavy commercial 3D engines, unnecessary deps or WebGL for a static visual storyboard.
- [web.dev high performance CSS animations](https://web.dev/articles/animations-guide), inspected 2026-11-13: animate transform/opacity on compositor, avoid continuously triggering layout/paint; implemented slow three-frame float, subtle scan and type strip; guards for hero visibility, Lite and user motion. No Lighthouse/60fps measurement claimed.
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion), inspected 2026-11-13: disable non-essential 3D motion while keeping source images and real calls-to-action available. Light Desk's button and tone now interact with this effect rather than dead pure CSS decoration. No audio capture, mic permission, activity statistics, automatic video.
- TESTUL DE ADĂUGARE: differentiation = *actual moving 3D photography & kinetic upper strip*, conversion = existing hero CTA/show selection remains, performance = native CSS 3D and three existing webp images (no packages; asset bytes measured if possible), accessibility = decorative aria-hidden/media alt empty with real buttons and clear motion gates, SSR = static first frame, fallback = mobile single photo, rollback = revert V90 PR. **Risk**: additional visual media requests and potential small-mobile overflow; CI browser QA required, no invented metric or subjective victory claim.
- Rejected: importing the user's mockup as a fake real show, downloading TikTok/IG source without consent, adding generic neon ring, fabricated music-performance 3D rig, buying a GSAP/WebGL package.

---

## 2026-11-13 — V89: user-led cinema/event production composition

- PRIMARY reference: uploaded specific Green Sound generated homepage mockup `image(20261113-105439).png`, used for overall **hierarchy**, NOT as copied image, code, film or fictional company evidence. Aim: clear big hero, lighting + sound motif, compact production chapters and genuine project film proof; no fake metrics (`500+`, `100%`, `10+`) or copied imagery.
- [web.dev: How to create high-performance CSS animations](https://web.dev/articles/animations-guide) (inspected 2026-11-13): transform/opacity should animate on compositor; avoid changing top/left or shadow blur in every frame. Adapted to opt-in slow transform shift of the **original inline Green Sound waveform**, disable under Lite/reduced. Rejected permanently running expensive WebGL or pointer-tracked illumination.
- [web.dev: prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion) (inspected 2026-11-13): decorative motion off for those who request it; preserve static final scene and content. Used positive `hover:hover && prefers-reduced-motion:no-preference` guard; CSS Lite override.
- [Chrome modern web motion](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/motion) (inspected 2026-11-13): masks/clip paths can clip focus rings, so only **non-interactive photos** use polygon masks; buttons and links keep visible focus on unmasked ancestors.
- No source-code component lifted from Webflow/Awwwards/third-party sites; no external scripts, icon licenses or new dependency. User mockup photography was not integrated. Existing Green Sound photos still need rights confirmation by owner.
- TESTUL DE ADĂUGARE: original differentiating design = compact bold typographic event entry, real Green Sound show, service chapters remain live; utility = clear navigation/direct offer and visible services; performance = CSS only no new media requests, CPU-only animation disabled in Lite/reduced; accessibility = SSR native links and keyboard focus; rollback = revert V89 PR. Art direction quality **subject to actual screenshot comparison and owner verdict**, not claimed automatically.

---

## 2026-11-13 — V87 source-driven cinematic film selection
- Source context: previously inspected https://webflow.com/blog/music-websites-designed-with-webflow (music company authenticity via real show imagery and clear ability to navigate work), adapted into 3 locally source-backed live-film poster selectors rather than copy of any template/code.
- Previously inspected https://web.dev/articles/animations-guide (use CSS transform/opacity and avoid layout effects). Thumbnail selection subtly scales on hover/focus only in full motion, with Lite/reduced gates. No scroll hijacking, no new animation library, no external embeds until Play.
- Originality: visual typography and grid CSS self-authored for Green Sound, not a cloned UI. The film titles, video metadata and 3 posters are taken from actual existing src/data/site.ts. No fabricated video duration or client.
- TESTUL DE ADAUGARE: user benefit is visually discovering differences among the three published productions; accessibility native buttons, aria-pressed, labels, no automatic audio/video; performance 3 small local poster files only, images lazy/async; rollback PR #83. No new dependencies, attribution/license changes or invented claims.
- Rejected: AI-generated event video previews, random stock musicians, generic equal white cards, fake award/social proof counters, automatic YouTube iframe initialization, scroll hijack.

---

## 2026-11-13 — V86 sound-first, original editorial production site
- Inspected Webflow music website case studies: https://webflow.com/blog/music-websites-designed-with-webflow . Principle: strong music-identity visuals, meaningful hierarchy, directly accessible show/video. Adapted concept of authentic show photo leading editorial navigation; copied NO assets, code, layout or text.
- Inspected Webflow unique-website-layouts: https://webflow.com/blog/unique-website-layouts . Principle: distinct asymmetric layout can improve discovery while preserving native user controls. Adapted one original large Music production chapter spanning 2 rows + two compact right subchapters, not borrowed CSS.
- Inspected official web.dev animation performance guidance: https://web.dev/articles/animations-guide . Principle: animate transform and opacity; avoided layout animation and scroll hijack, gated animation by hover/no-reduced-motion/Lite. No measured FPS or Lighthouse claim.
- Attempted Awwwards music/sound: https://www.awwwards.com/websites/music-sound/ but page timed out; not represented as research successfully inspected.
- User's premium dark green event-production reference is a direction, not a licensable website asset. Reused existing project images from src/data/site.ts only, not TikTok social-video frames or fictional photo clients.
- TESTUL DE ADAUGARE: differentiated original small signal graphic + genuine stage photo, structural asymmetry and direct offer CTA; zero dependencies/costs; SSR native links, Lite/reduced motion gates, rollback by reverting V86 PR. Browser screenshots and measured CI needed for acceptance.
- Rejected: fabricated 3D physical speaker rigs pretending to be owned, repeated neon circles, fake live audio meters, widget/FAQ proliferation, AI event photography presented as authentic, autoplay, copying reference screenshots.

---

## 2026-11-13 — V85 / real reference to branded digital production art direction

- **Primary visual reference**: actual user-provided Green Sound premium website mockup in the current conversation, dark-emerald header and hero, concert photo + mixing/production control in foreground, image-led asymmetric service programme. Adapted as GREEN SOUND original visual system; did NOT copy embedded mockup art, fabricated achievements, images of imaginary events, text/copyrighted code or branding beyond owned identity. Older live site/look served as negative comparison.
- Webflow [event website inspiration](https://webflow.com/blog/event-websites) — use powerful visual hierarchy, authentic media, strong CTA, balanced motion. Applied to compact headline + split production image + actual service links. Rejected generic identical cards, fake 500+ events/testimonials/statistics, scroll traps and event-photos generated as real.
- MDN [clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-path) — CSS polygon cut corners for technical-photography service panels. No external dependency or copied code; masks remain decorative, all native links remain visible/clickable.
- MDN [media queries for accessibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using_for_accessibility) — disable nonessential perspective transitions under reduced motion and Lite; hide heavy illustration at small viewport widths, retain meaningful copy/photo/CTA. Tested with browser contract, not measured LCP without dedicated perf instrumentation.
- Implementation: original SVG 10-channel desk is CGI / technical illustration (visually analogous to a mixer but **not an actual Green Sound soundboard or live audio meter**); its artwork and all overlays are self-authored, free of external dependency/image/font/music licenses. Two existing licensed/provenance-tracked company photo URLs from `src/data/site.ts` reused; no TikTok download. The stage photo is reused only as an actual existing project asset with uncertain external reuse permission documented previously.
- Rejected: placing full reference mockup screenshot in site; copying UI from another agency; artificial customer/event photography; WebGL libraries without a measured need; always-on animations; excessive standalone scene widgets.
- TESTUL DE ADĂUGARE: differentiation = event production control hardware + real illuminated stage, information hierarchy = sound/light/event offer and eight direct links, performance = no JS deps / SVG only + one re-used local stage photo on desktop; accessibility = hidden art, native control semantically unchanged, Lite/reduced gates; rollback = revert V85 PR. Visual acceptance still depends on actual user reaction to screenshots and mobile tests.

---

## 2026-11-13 — V83 / channel engraving, authentic visuals and progressive motion
- Research (public reference, not source code): [Webflow — 12 music websites designed with Webflow](https://webflow.com/blog/music-websites-designed-with-webflow), including Trenchwerk's imagery tied to bass rather than generic particles and Francis Phan's precise visual dynamics. **Adapted the principle** of sound-inspired art direction as three original channel engravings (quiet at rest, reacts to focus/hover); **rejected** copying distorted bass animation, layout or authored code. Reference design copyright remains with authors; no copying/licensing claims.
- [Webflow — Motion design principles](https://webflow.com/blog/motion-design-principles): motion should communicate meaningful UI state. Adapted focus/hover channel feedback; rejected always-on decorative strobes.
- [Chrome for Developers — entry/exit effects](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/scroll-entry-exit-effects): prefers transform/opacity, progressive detection, reduced-motion; adaptation is opt-in CSS transform pulse rather than scroll-linked JS. Rejected extra scroll dependencies/polyfills as unnecessary.
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion): motion must disable on user preference. Gated CSS with media query and Lite and hover permission.
- Distinguish source versus hypothesis: V81 capture had largely black stage/people photo areas; project `/public/media/greensound/` contains files for those local URLs. Hypothesis is screenshots were taken before lazy loading, so V83's browser QA explicitly decodes all three before screenshot. A rendered screenshot alone cannot prove image copyright, but no new photo is added. **No downloaded TikTok/Instagram frames, generated event images or invented achievements.**
- New dependency: none; all authored CSS/React. License: self-authored; existing Vite/React project only. Asset provenance unchanged. Rejected: always-on fake real-time audio meter, autoplay, visualizers using microphone permission, generic AI card stacks.

---

### V81 verified CI evidence — 2026-11-13
- Exact application source SHA before evidence-only documentation: `98dacdb0686d76e3943afcb49f646b8578cf6eb5`; [successful six-width CI](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43399390064), including native modal focus/Escape, actual Chromium route audit, motion vs Lite computed CSS checks. [12 real screenshots](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43399390064/artifacts/14024876141); V80 baseline never captured **with menu open**, so a true before/after paired menu screenshot cannot be claimed.
- Measured gzip on the exact source: shared CSS **51.3/52 kB** (initial attempt 52.6, then 52.4 failed); homepage JS **110.9/190 kB**; QuoteForm **31.2/50 kB**. **24 Vitest suites/68 tests passed**; strict TypeScript, SSR build, architecture and browser passed. Avoid claiming Lighthouse or real user CWV.
- Visual inspection of actual 360/390/768 open-menu screenshots: hierarchical six-link stage index is visible without horizontal overflow or obvious clipping; 390 full-motion screenshot captures entrance in progress while reduced/Lite are static. Open menu BEFORE on V80 unavailable; treat release visual comparison as incomplete, not invented.

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

## 2026-11-13 — V101 portfolio accessibility
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ — dialog interaction/focus principles; adapted contextual accessible names for photo navigation; no code copied.
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role — polite status announcements; adapted to photo position/title. No dependency or external media.
- Rejected: animated counter overlay and autoplay slideshow; unnecessary motion and cognitive load.

## 2026-11-14 — Photo gallery filtering
References: https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html (status messages); https://www.w3.org/WAI/ARIA/apg/patterns/button/ (pressed filter buttons). Original implementation uses aria-pressed, computed counts, and polite live status. No third-party code/assets copied. Rejected animated filter badges as distracting and potentially costly.
