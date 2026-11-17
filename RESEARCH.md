## 2026-11-17 — V185 event-service navigation
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a — retained real fragment navigation for no-JS and browser history; original implementation, no code copied.
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus — focus({preventScroll:true}) keeps keyboard focus at the destination; original implementation.
- Rejected: adding another selection widget or modal to event detail (duplicates existing service discovery, heavier UX). No dependencies, new media, fonts or license changes. Premium visual reference comparison and browser evidence pending; this is a functional UX increment, not a certified redesign.

## 2026-11-17 — V184 event detail focus navigation
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a — native fragment links retained for no-JS navigation; no external code copied.
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus — focus({preventScroll:true}) used for keyboard focus handoff to existing `tabIndex=-1` section. No dependency or licensing issue; original implementation.
- Rejected: replacing the anchor with a button (would break native fragment navigation and no-JS fallback); adding scroll animation (unnecessary motion). Browser validation pending.

## 2026-11-17 — V183 clipboard async lifecycle
- https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText — asynchronous writeText may reject on permission/security; no delivery is implied.
- https://react.dev/reference/react/useRef — mutable refs track in-flight work synchronously without rendering; used for pending guard and invalidation token.
- Original React code only; no copied design/code/assets, new dependencies or licensing impact. Rejected timers and automatic retry (could generate unwanted permission prompts), and introducing a state-management package. Browser behavior and CI remain unverified.

## 2026-11-17 — V181 Contact preview semantics
References: https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html (clear labels), https://webflow.com/made-in-webflow/website/the-symphony (editorial hierarchy as inspiration only; no assets/code copied). Adapted an existing ticket hierarchy to distinguish advisory request from selected paid-service categories. Rejected adding a second interactive preview control or importing UI libraries: no utility, extra complexity. Original code only; no new license or asset.

## 2026-11-17 — V180 Contact service counter
Local source audit: `src/components/site/QuoteForm.tsx` counted the advisory option as a service even though the eight-service cap excluded it. This created a misleading 9/8 possible display. Adapted the existing selection logic rather than adding a dependency or borrowing external design. Reference for accessible live status: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role (concept only; no copied code). Rejected adding a new progress widget or second homepage CTA: redundant UI and no conversion evidence. No asset/license changes.

## 2026-11-17 — Contact in-page focus handoff\n- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus — native focus({preventScroll:true}) avoids an extra scroll while handing off keyboard position; used with existing heading tabIndex=-1. No third-party code or license dependency.\n- https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html — focus sequence should preserve meaning and operation; used as accessibility rationale.\n- Rejected: custom scroll animation / focus trap / new dependency; native anchor and minimal focus are lower-risk and reduced-motion safe.\n- No new asset, license, package or measured performance claim.\n\n## V173 / 2026-11-16 — /evenimente: photographic live-show poster, design research
- [The Symphony, Made in Webflow](https://webflow.com/made-in-webflow/website/the-symphony): music serves as the concept of the experience, not just visual decoration. Adapted the abstract idea of a "setlist" as five direct event choices. No Webflow source or musical assets copied; publishing site offers no automatic reuse license.
- [Pando — immersive creative studio](https://webflow.com/made-in-webflow/website/pando-studio): studied strong editorial typography, image scale, narrative composition and mobile responsive geometry. Adapted only those general concepts into an original stage poster. No photos, branding, Webflow code or GSAP reused; those remain third-party intellectual property.
- [Web.dev animation performance](https://web.dev/articles/animations-guide): use transform/opacity for a short triggered shutter reveal instead of perpetual blur and layout animation. Tests for full-motion vs reduced-motion and Lite. No code copied.
- [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using_for_accessibility): suppress optional movement with reduced motion. Existing data-gs-performance=lite profile similarly disables it.
- [MDN View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API): considered and rejected for selection; potential focus confusion and unnecessary transition snapshots. Existing router view transitions remain on route links.
- Real baseline V172 browser evidence: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43893170348/artifacts/14238391032 . Observed low photo presence and a generic dark gap. Original V173: giant typographic event poster with real selected event image, manual shutter/light cue on selection, five native deep-linked event choices, contrasting paper "production notes" tied to genuine event moment data. No borrowed design identity/code.
- Rejected: imaginary stage architecture/CGI pretending real, unapproved vertical TikTok frames, auto-play music, large WebGL shader, third party tracking, fabricated customer numbers and generic triple cards. Final visual acceptance requires inspecting identical 390 and 1440 Chromium viewport screenshots and interaction states.

## V172 / 2026-11-16 — /evenimente visual/interaction rotation
- https://webflow.com/made-in-webflow/website/mdnt — real public event-agency portfolio example; observed a distinct split between visitor pathways and restrained after-dark art direction. Adapted conceptually: clear event-type chooser paired with a genuine image/CTA preview. Rejected: WebGL fluid, background video, GSAP dependencies, borrowed imagery/identity (no code/asset licensing obtained).
- https://webflow.com/made-in-webflow/website/360designevents — dynamic event storytelling/controlled transitions as a reference; adapted only the idea of distinct, intentional transitions between event categories. No external code, fonts or media copied; design source remains proprietary.
- https://www.awwwards.com/mobile-excellence-guidelines.pdf — UX/performance checklist used as an evaluative reference, not copied software; leads to mobile tap targets, direct links and visible CTAs.
- https://web.dev/articles/animations-guide — use compositor-friendly transform/opacity and avoid continuous expensive blur/layout animations; GS172 photograph enters with one transform+opacity and EQ bars scaleY; signal stroke motion is small but requires Chromium audit.
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion — implement no-motion CSS when user requests reduced motion. Also Lite profile suppresses animation. No copy of sample code.
- Original implementation uses only existing React/Lucide/site media; **no new packages/assets/licenses/telemetry**. Rejected: auto-playing video, fabricated case studies and generic repeated cards. Visual acceptance remains contingent on exact-route 390/1440 before/after screenshots and owner review.


## 2026-11-16 — Contact query safety
Reference: https://unicode.org/reports/tr9/ — Unicode Bidirectional Algorithm. Control characters U+202A–U+202E and U+2066–U+2069 can alter visual ordering without changing logical input. Adaptation: remove those formatting controls and ASCII/C1 controls from user-provided location URL parameter; normalize whitespace, retain existing 120-character cap and allowlist for services. No external code or dependency copied; no licensing requirement. Rejected: aggressive ASCII-only normalization because it would damage Romanian diacritics and legitimate place names. Visual aesthetic reference research deferred to next /evenimente rotation.


## 2026-11-16 / V169 — original signal desk (research follow-up)
References for editorial art direction: https://pluggedliveshows.com/ (live production image hierarchy), https://www.exoape.com/ (depth and editorial visual rhythm), https://momentfactory.com/ (controlled scenic light). Technique adapted: original foreground sound-mixer schematic with owner-site photo behind; no code, image or branding copied. No external dependency or license required for original CSS/inline SVG. Rejected: AI event photos masquerading as Green Sound, auto-playing sound/video, heavy WebGL and generic full-page neon cards. Accessibility: SVG decorative aria-hidden, no pointer interception, reduced motion and Lite disable dash movement. Reference inspection needs renewed browser visual verification; URLs are direction, not proof of current content.

## 2026-11-16 — V168 / rejected V166, photo-led dark editorial replacement
- https://www.awwwards.com/websites/music-sound/ — surveyed the verified Music & Sound category (premium visual emphasis, large authentic music imagery and typographic individuality). This is a reference directory, NOT an asset/code license. Adapted principle of photography as primary hero material, rejected imitating award-winning sites, motion effects, identities and stock imagery.
- https://webflow.com/blog/music-websites-designed-with-webflow — verified Jeff Cardello's roundup: 'Beyond The Valley' uses concert-poster hierarchy, 'Nard & B' reflects real production identity, 'Mateus Gageiro' organizes sound work with film examples. Applied the editorial hierarchy + directly browseable services; rejected automatic background video, copied type/compositions and complex audio-reactive movement. Article/site designs provide no reuse license; zero external code/media integrated.
- https://web.dev/articles/optimize-lcp — first-party image stays real HTML <img> with intrinsic dimensions and fetchPriority=high for initial scene; no other new preload/fetch priority added. Actual CWV not measured; browser and performance gates required.
- V166 rejection: ivory/green split dashboard, overlaid dark box and repeated low-contrast paper/green pattern did not meet owner's premium reference. V168 visual hypothesis: dramatic actual event photo, oversized condensed editorial title with restrained italic, no floating sales card, slim control strip, paper catalogue, sage video room, emerald final invitation. Reject extra glow, AI/stock event photography, autoplay, WebGL dependencies, new homepage widgets/forms.
- License: no external artwork/code reused. Existing site libraries/assets unchanged; CSS/TSX is authored in repository. Visual acceptance remains subjective and requires owner review plus real screenshots.

## 2026-11-16 / V166 — Editorial photographic agency design (source research)
- https://webflow.com/blog/music-websites-designed-with-webflow — Webflow editorial examples: prioritize authentic music photography, one purposeful interaction and disciplined typography. Adapted *principle* of image-led music identity and controlled interaction; no template, CSS, visual identity or media copied. External website design is not an asset license.
- https://www.stefanodesigner.com/en/portfolio/endless-wonder — independent music editorial architecture: varying image geometry, compositional restraint, clear information hierarchy. Adapted a distinct service chapter rhythm, not code, images, client branding or layout reproduction. No reuse rights inferred.
- https://web.dev/articles/optimize-lcp — retain HTML discoverable hero <img>, first scene fetchPriority=high, intrinsic width/height. No measured V166 LCP yet; verify in Chromium/field before quantitative claims.
- Rejected: recreating Awwwards / Webflow screenshots, external event images or unlicensed video; loading WebGL/GSAP to imitate a demo; extra neon/blur layers; repetitive equal-size service cards; automatic audio/video. No new packages or external assets; original stylesheet written in repository.
- Visual experiment: split magazine cover with original event photography right / warm editorial type left, dark native scene selector, three differentiated service narratives, real film archive. Passes source-level addition test (identity, meaningful service routing, performance-safe CSS, semantic native controls, SSR-inline stylesheet, no cost); browser visual and responsive gates still PENDING.

## 2026-11-16 — V161 / Film & photography portfolio research, one signature experiment
1. **DNA Media Studio case, THEASH** https://www.theash.design/work/dna — editorial pace, a media-studio site as a short cinematic sequence, motion as navigation rather than decoration. **Adaptation**: an original Green Sound split documentary cover followed by full visible contact sheet and film-selection registry; no copyrighted assets, CSS or site source reused. This public visual reference has no permissive source code license; reuse explicitly rejected.
2. **Lumos Produzioni case / Stefani Lefler** https://www.stefanilefler.com/case-study/lumos-produzioni — gallery spreads that read as visual narrative, clear media credits; **adaptation**: six existing Green Sound photos as one browsable atlas with simple indexed cues, not recreated layout/media/animations. Reference is not a code license.
3. **Webflow photography portfolio guidance** https://webflow.com/blog/photography-portfolio — make the true photographs primary, do not overload them with unnecessary copy. **Adaptation**: source-backed single opening image and fully viewable grid, no user-made media or stock masquerading as company material.
4. **SCENE Webflow editorial portfolio reference** https://webflow.com/templates/html/scene-studio-website-template — high-level example of striking type, deliberate image scale and editorial hierarchy. This is a paid template; **strictly no copy/code/image reuse** and no license asserted. Original CSS/React only.
5. **web.dev Video performance** https://web.dev/learn/performance/video-performance — defer YouTube/video player until user interaction; posters provide context and avoid immediate player overhead. Existing `VideoLite` retained, six poster-backed film rows from existing catalog, no autoplay and no additional dependencies or requests until user choice (poster requests for visible thumbnails still occur).
6. **MDN reduced motion** https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion — avoid motion-based reading barriers; all decorative image hover motions disabled in reduced-motion and Lite; native keyboard gestures remain.
**Experiment:** original “Green Sound archival contact sheet”, one actual concert full-scale editorial cover followed by six source photographs fully in view, contrasting warm-ivory production prints and dark film-library records. Addition gate: differentiation YES visible (baseline carousel no hero image), utility YES (all existing filters/dialogs/deep links), no new media/LICENSE/price/deps YES, performance cost route-local CSS + six thumbnails (bundle and field CWV distinction), accessibility YES (keyboard/Escape and focus tested), SSR yes (inline scoped CSS), rollback simple separate branch, owner approval pending. 
**Ideas rejected:** paid Webflow theme reuse; generic masonry external package, autoplaying video, repeated glow/cards, speculative ratings/clients/awards, AI/stock as true events, copying templates or original footage from social networks.

## 2026-11-16 — V160 / research prior to independent new production homepage
1. **LO2S (Awwwards award submission)** https://www.awwwards.com/sites/lo2s — immersive real night-event photograph, restrained type and minimal navigation; inspiration principle only: documentary concert image as the main evidence, not fake WebGL/stadium. No image, design coordinates, code, copy or branding copied. Public showcase does NOT grant asset/code reuse.
2. **Bunker Productions on DDS studio** https://www.wearedds.com/ — real concert production case demonstrates that the atmosphere and visible craft can speak louder than decorations; adapted original Green Sound project catalogue photo with a restrained on-image editorial story and one CTA. No copyrighted asset/code or text transferred. Inspiration only; license unverified and reuse rejected.
3. **Studio Øraya** https://studio-oraya.com/ — sound design company uses focused service taxonomy over atmosphere, avoiding gimmick-rich product UIs. Adapted original 3-mode user-controlled photographic edition list and authentic eight-service production programme, without sound playback or copyrighted layout/text, license unverified.
4. **Webflow music website editorial analysis** https://webflow.com/blog/music-websites-designed-with-webflow — artists/showreels deserve real artwork, authentic media and clear paths to relevant details. Adapted high-level user journey, NOT templates, sample artworks or external code.
5. **web.dev Optimize LCP** https://web.dev/articles/optimize-lcp — keep hero as native HTML image with width/height, fetchPriority on initial live source, avoid CSS background as sole media, no autoplay. Field LCP not measured. **MDN** https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion — static reduced-motion + Lite behavior. Both official references.
**Creative experiment:** *The Real Production Cut*: dark-emerald, intentionally minimal full-bleed original concert photo + oversized expressive sound-themed copy, genuine image-select events, real film click, Light Desk as opt-in. Follow with documentary production chapter compositions and film index, not cloneable cards.
**TEST OF ADDITION:** authentic relevance — yes, existing owned assets; utility — true event mode links + 8 services + 3 videos; cost/license — no new resources; performance — one SSR-local style replacing four old styles; accessibility — semantic native buttons/link, focus, Escape, reduced motion; rollback — revert isolated route, hero component and CSS to V159 commit. All claims of browser success conditional on exact-head QA. Owner aesthetic approval still unknown.
**Rejected:** clone LO2S or Bunker design; sample video/photo downloads; automatic sound; external libraries, expensive tracking, synthetic crowd/equipment, fabricated booking/availability, repeated huge poster, decorative 3D cards, another global CSS-import layer.

## 2026-11-16 — V159 / real competitive research for music/event production premium design
1. **Vibration Production (Narrow Labs editorial case)** https://www.narrowlabs.design/website-inspiration/vibration-production ; original site https://vibrationproduction.com/ . Verified published description: black oversized name typography on an unembellished white canvas, real large stage footage as next visual act, strict black/white contrast. **Adapted** only the art-direction premise (type as hero, photograph as deliberate second panel) to Green Sound owned photos/real services; no copied code, layout coordinates, branding, fonts or photographs. Reference is not permissively licensed.
2. **Creative Spirit (Awwwards case)** https://www.awwwards.com/sites/creative-spirit . Awwwards submission screenshot shows huge editorial statement on white with highly contrasting one-accent typographic identity. **Adapted** emphasis, legibility and single-statement composition; emerald is Green Sound's own instead of their distinctive cobalt. No copied design, copyrighted logo or CSS.
3. **Masters 1987 (Awwwards event-production example)** https://www.awwwards.com/sites/masters-1987-1 ; event-first overlarge words and an expressive picture reveal. Rejected their editorial headline and image arrangement as not own brand; applied only broad scale and fearless negative space. No asset/license reuse.
4. **Webflow editorial reference / Trenchwerk & Toast Recording Studio** https://webflow.com/blog/music-websites-designed-with-webflow (accessed 2026-11-16). Real artist/recording identity is strengthened by actual footage, not invented visual symbols. Retain project-owned source media and button-initiated YouTube. Explicitly rejected their autoplay video, audio, templates, prices and cloning.
5. **MDN prefers-reduced-motion** https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion and **web.dev LCP** https://web.dev/articles/optimize-lcp — keep HTML `img` with width/height/fetchPriority; no poster-as-CSS background and no forced animation in reduced-motion/Lite. User experience and field LCP not yet measured.
**Single visual experiment:** first screen as a production poster: white paper, huge black compressed message, one real saturated full-width stage photograph, service/film chapters alternating dark/white, final brand emerald. Test of addition: brand differentiation yes (photo/type); utility yes (event types, live photo switch, real video, CTA); performance only inline CSS new (budget to measure); no cost/code license; SSR ready; accessibility native buttons, focus; rollback isolated route + CSS. **Pending real Chromium before/after.**
**Ideas rejected:** 3D faux stage, three flying photographs, repeating neon glows, copied Vibration Production WordPress theme, Creative Spirit cobalt or photographs, stock event photos, sound autoplay, new GSAP/WebGL dependency, inflated fake client claims.
## 2026-11-16 — V158 major homepage / photography-led editorial art direction
- **Awwwards Music & Sound category**, https://www.awwwards.com/websites/music-sound/ (visited 2026-11-16). Observation: strong visual separation between music/production identity and conventional agency UI; authored a first-party dramatic photographic hero with restrained editorial index rather than another simulated concert stage. Reference/inspiration only; no code/image/template/branding reused, no reusable code license assumed.
- **Webflow: 12 music websites designed with Webflow**, https://webflow.com/blog/music-websites-designed-with-webflow (visited 2026-11-16). Observed portfolio/catalogue patterns including record sleeve, festival poster hierarchy, strong color bands and authentic artwork; adapted only the high-level idea of changing section color temperature and typography to create intentional music-inspired chapters. Rejected sound autoplay, existing site designs, copied image positions, artists/media. Inspiration only, not a code license.
- **Webflow: Original photography presentation and hierarchy**, https://webflow.com/blog/photography-website-lessons-learned (visited 2026-11-16). Strong original photography and restrained typography vs template repetitions; translated to a single authorised stage photograph + warm ivory photographic services. No layout or assets copied.
- **web.dev official LCP guidance**, https://web.dev/articles/optimize-lcp (visited 2026-11-16). The existing hero image remains a real HTML `img` with specified width/height and high fetch priority for active live scene. No CSS-only LCP background or lazy-loading of hero image added. **Field LCP not measured**, browser QA pending.
- **MDN reduced motion**, https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion — original CSS guards retained and new transitions disabled for reduced-motion/Lite. No new libraries, no source licensing required.
- Single signature experiment: `Signal & Show`, one genuinely cinematic right panoramic original photo on dark ink plus three archival contact-print frames; magazine-like pale production programme and black/emerald cinema archive. **Addition test:** brand differentiation (yes, visible contrast), real service utility (all links/CTA retained), no cost/licensed dependency (yes), SSR (first-party inline CSS), performance (+homepage inline CSS only, exact-head bundle pending), accessibility (native link/mode and focus), rollback (revert route + isolated CSS). Owner acceptance pending.
- Rejected: again adding another homepage widget, green glow/laser effects, fictional DJ/team photographs, TikTok screenshot exports, WebGL packages, scrolling hijack, video autoplay, expensive dependency, fabricated awards/testimonials.

## 2026-11-16 — V157 / Contact signal path — research and experiment
- https://webflow.com/made-in-webflow/website/jackwatkins-d9c4a6 — Jack Watkins, music/design creative platform: editorial pacing, restrained typography and clear atmosphere are preferable to repeated decorative glows. Adapted **only the principle** of quiet typographic sequencing into a custom three-step CSS lane; no code, images, branding, motion or assets copied. License: reference website only; no reuse.
- https://webflow.com/made-in-webflow/event-agency — Webflow event-agency showcase: reference collection for event-specific content positioning and direct route-to-enquiry intent. Applied custom three-step journey tied to actual Contact behavior; no layout/template/code/media copied; license: inspiration only, no reuse.
- https://www.awwwards.com/mobile-excellence-guidelines.pdf — Awwwards mobile evaluation principles: visible primary CTA, legible typography, size targets and streamlined form entry. Used as checklist, not copied source. Browser review remains pending.
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a — native in-page anchor to an existing, named heading. No JS navigation or package. https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion — reduced-motion escape from animated transforms (all new signal steps remain static).
- Signature experiment: `Contact production signal path` (01 input / 02 review / 03 visitor sending). Differentiation: first-party production/console notation tied to truthful no-autosend. Utility: deep-links immediately to real form. Performance: CSS/HTML only, no dependencies/assets. Accessibility: native anchor, focus-visible, semantic ordered list, static in Lite/reduced-motion. SSR: markup deterministic. Rollback: revert isolated Contact TSX/CSS/test changes. **Provisional pending real browser and CI.**
- Rejected: backdrop-video/autoplay, new WebGL scene or dependency, unverified stock event photo, fake booking availability, decorative circle/glow repetition, additional homepage widgets. None adopted.

## 2026-11-16 — Events long-label mobile affordance
- https://developer.mozilla.org/en-US/docs/Web/CSS/min-width — flex items can retain intrinsic minimum widths; `min-width:0` allows shrink.
- https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap — wrap long content rather than force horizontal overflow.
- Original utility-class adjustment, no external code, package or licensed asset. Rejected JS text truncation (hides useful action) and horizontal scrolling (hurts mobile keyboard usability). Real browser proof pending.

## 2026-11-16 — Events controls / responsive layout
- https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap — native flex wrapping prevents rigid inline controls on narrow widths; adapted as first-party utility classes, no copied code or license-bearing asset.
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html — target size and spacing rationale; kept existing 44px minimum-height controls.
- Rejected new animation library and bespoke JS viewport detection: unnecessary complexity for two native buttons. No new dependencies or media.

## 2026-11-16 — Events clear-selection action
- https://www.w3.org/WAI/ARIA/apg/patterns/button/ — native button for state mutation, disabled when action unavailable. Original implementation, no copied code.
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button — explicit type=button prevents unintended form submit. No third-party dependency.
- Rejected: custom modal confirmation (unnecessary for reversible selection), extra JS package (no benefit). Premium visual references not verified this run; defer visual redesign until browser captures available.

## 2026-11-16 / V152 — call affordance\n- https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html — link purpose should be identifiable from its text/context; adapted as explicit `Sună-ne` label for existing tel link.\n- https://www.nngroup.com/articles/recognition-and-recall/ — visible action labels reduce reliance on interpreting an unlabelled number; principle only, no external code/assets copied.\n- Rejected: new phone widget, auto-call, new dependency. No new licensed assets. Browser verification pending.\n\n## 2026-11-16 — V151 error recovery navigation
Design principle: an error state should expose an actionable recovery destination rather than a dead end. Original native router link to existing Contact form; no external code, image, asset or dependency used. Reference for error recovery patterns: https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html ; https://www.nngroup.com/articles/error-message-guidelines/ . Alternatives rejected: fake submission, auto-send, duplicate form in fallback. Browser verification pending.

## 2026-11-16 / V150 — Error message accuracy
- [MDN: ARIA alert role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role): assertive live announcements can be disruptive; rejected adding an automatic alert role to an already visible page heading.
- [W3C WCAG 3.3.3 Error Suggestion](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html): error guidance should identify realistic recovery paths; adapted by preserving conditional retry and real Home/phone routes.
- Implementation: original copy only; no third-party code/assets, license not applicable. Rejected speculative network diagnosis and extra home widgets. Browser and CI verification pending.

## 2026-11-15 — V149 / Error recovery truthful instructions
- Audited existing `StageFallback.tsx` on V148. When `onRetry` absent, a hidden retry action conflicted with always-visible instruction to retry. Adapted conditional text, no external code or assets.
- Reference: https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html — preserve useful, consistent recovery paths. https://www.nngroup.com/articles/error-message-guidelines/ — specific and actionable error guidance. Design research only; no code copied or dependency added.
- Rejected automatic reload, simulated retry, additional UI cards. Visual and browser validation pending.

## 2026-11-15 — V148 / Error recovery control integrity
- Source audit: `StageFallback` types `onRetry` as optional but always displayed its retry button. This is an inert-action risk on error pages without a recovery handler.
- Guidance: https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html and https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html — use truthful actionable controls; guidance only, no external code copied.
- Adapted: conditional native retry button only when `onRetry` exists; existing Home and phone paths preserved.
- Rejected: fake retry simulation, automatic page reload, new backend, additional dependency.
- No visual/CI measurements yet; browser screenshot and HTTP error status still unverified.

## V147 / 2026-11-15
W3C G201 https://www.w3.org/WAI/WCAG21/Techniques/general/G201 : indicate external new-tab navigation visibly and to assistive technology. Adaptation: own arrow and Romanian accessible text, no copied code or assets. W3C G200 https://www.w3.org/WAI/WCAG21/Techniques/general/G200 : avoid unnecessary new windows. Rejected new animation and external dependencies. Browser QA pending.

## 2026-11-15 — V146 / 404 information architecture
- Existing Green Sound source audit: `src/components/site/StageFallback.tsx` offered a generic Contact pitch for missing routes. Adapted its own recovery information architecture, not third-party UI code.
- Reference: https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html — explicit link purposes; applied descriptive service/event/quote labels. License: guidance only, no source code copied.
- Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/404 — missing-route semantics must retain HTTP 404. Current component alone cannot prove SSR status; verify server response before release.
- Rejected: adding a site-wide search field without a working index/backend; adding another homepage CTA; using generated event imagery.
- No packages, fonts, external assets or tracking introduced. No measured conversion or performance claims. Browser screenshots and exact-head CI still pending.

## 2026-11-15 — Mobile conversion affordances (V145)
- [WCAG 2.2 target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html): independent target dimensions and spacing matter on touch devices. Adapted: minimum 48px height in existing mobile action bar; actual hitboxes require browser confirmation.
- [WCAG 2.2 focus visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html): keyboard location must be visually apparent. Adapted: explicit focus-visible outlines on existing three actions.
- [Awwwards music and sound](https://www.awwwards.com/websites/music-sound/) and [Webflow accessibility](https://webflow.com/accessibility): reference collections only, no code/assets/design copied. Rejected animated sticky bar: increases distraction and motion cost without improving task completion.
- Original Tailwind utility edits only; no external license/dependency or media introduced. Sources listed for review; no measured conversion impact.

## 2026-11-15 — Event configurator reset
- W3C WAI button pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/ — use a native button for an immediate local action, not a link or synthetic control. Adapted via `type=button`, disabled state, visible focus.
- MDN disabled attribute: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled — disabled native buttons cannot be activated or focused when reset is unnecessary; avoids misleading actions.
- Rejected: reset entire form with native `type=reset` (would not restore React-controlled recommendation state); custom toast/modal (unnecessary complexity). Original implementation; no external code or assets copied, no new dependency.

## 2026-11-15 — Contact date control
- MDN `color-scheme`: https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme — native form control appearance should follow actual theme; adapted as theme-specific CSS utility; no external code copied or new dependency.
- W3C WAI form instructions: https://www.w3.org/WAI/tutorials/forms/instructions/ — explicitly describe optional fields and associate instructions; adapted through visible text and aria-describedby. No external assets/code.
- Rejected: JS date picker dependency, custom calendar overlay (complexity, size, focus management). Screenshot comparison and runtime validation remain pending.

## 2026-11-15 V139 Contact: HTML label association uses htmlFor/id, with a separate privacy link to avoid nested interactive elements. Reference: https://html.spec.whatwg.org/multipage/forms.html#the-label-element (labelable controls; interactive descendants). No external code/assets/dependencies copied. Rejected: JS click suppression inside label, due to unnecessary complexity.

## 2026-11-15 — V138 touch cancellation
References: https://developer.mozilla.org/en-US/docs/Web/API/Element/touchcancel_event and https://developer.mozilla.org/en-US/docs/Web/API/Touch_events . Adaptation: own React event guards clear swipe origin on cancelled or multi-touch interactions; no third-party code or assets, no dependency. Rejected: intercepting default touch scrolling and gesture libraries (unnecessary complexity and accessibility risk). Visual/interaction QA pending.

## 2026-11-15 — Portfolio touch gesture experiment V137
Reference: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events — touch coordinate handling and gesture tracking (documentation, no code copied). Original implementation: compare horizontal and vertical displacement before switching photo; vertical scroll remains available. Alternative rejected: swipe on absolute X displacement alone, which misfires on diagonal vertical scroll. No external code, assets or packages integrated. Browser validation pending.

## 2026-11-15 — Film archive selection feedback
Reference: https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html — status updates should be programmatically determinable without focus theft. Reference: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role — polite live region for nonurgent status. Original adaptation: textual selection/position inside existing archive heading; no copied code or assets, no new license dependency. Rejected: animated progress indicators and auto-play on selection (unnecessary motion and user control risk). Visual browser verification pending.

## 2026-11-15 / V132 Contact error recovery
Implementation uses existing React Hook Form `handleSubmit` invalid callback and `setFocus`, with native focus for controlled service checkboxes. No external code, assets or dependency introduced. Browser and assistive-technology verification pending; avoid claiming conformance until tested. Reference: https://react-hook-form.com/docs/useform/handlesubmit and https://react-hook-form.com/docs/useform/setfocus . Rejected: auto-scroll-only error banner (does not transfer keyboard focus).


## 2026-11-15 — Contact accessibility audit (V131)
- WAI ARIA aria-describedby: https://www.w3.org/TR/wai-aria-1.2/#aria-describedby — referenced IDs should identify existing description nodes; applied conditionally to fieldset error. No external code copied or dependency added.
- MDN aria-describedby: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby — permanent guidance remains associated; conditional validation message only when rendered. No external assets.
- Rejected: adding duplicate error text permanently just to satisfy the ID, as it increases noise and risks contradictory feedback.

## 2026-11-15 — Footer → Contact navigation
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#linking_to_an_element_on_the_same_page — native fragment links to a stable document ID; applied via existing TanStack router Link `hash` prop, no external code copied.
- https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html — descriptive action text; applied explicit brief-preparation wording, not a promise of automatic submission.
- Rejected: adding a second embedded form or a new animation in footer; duplicates Contact and adds weight. No new dependency/assets; licensing N/A for original text/code.

## 2026-11-15 — V129 About editorial production score
- [Awwwards Music & Sound](https://www.awwwards.com/websites/music-sound/): reference category for distinctive music-site editorial pacing; no external assets or code copied.
- [Webflow portfolio inspiration](https://webflow.com/made-in-webflow/portfolio): reference for large expressive type and asymmetric section hierarchy; no code or branding copied.
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion): preserved static readability and disabled transitions for reduced motion.
- Adaptation: original CSS connecting rule and alternate italic headings on existing four production steps; no JS, WebGL or new dependencies. Rejected: timeline scroll-triggered animations, generic glow, new photographs and decorative card grid (performance/identity/permissions). Source links recorded; this run did not independently measure comparative performance or license external code because none was used.

## 2026-11-15 — V128 / Native fragment navigation
- [MDN: Fragment identifier](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment): native fragment identifiers navigate to matching document elements. Adapted to existing event CTA without custom scroll JS.
- [MDN: scroll-margin-top](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-top): account for sticky navigation when targeting Contact heading; Tailwind's existing `scroll-mt-28` utility used, no new code/dependency.
- [Awwwards music/sound collection](https://www.awwwards.com/websites/music-sound/) and [Webflow music websites](https://webflow.com/made-in-webflow/music): design inspiration references only; no designs, assets or code copied, live content not inspected this run.
- Rejected: hash pointing to ClientOnly form node (absent in SSR), custom scroll effect/timer, auto-focusing personal fields, third-party smooth-scroll package.

## 2026-11-15 — V127 event-index interaction (references, not copied code)
- https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html — focus indicators must be perceivable; adapted a photo outline to connect the active event CTA with its imagery while preserving existing link outline.
- https://developer.mozilla.org/en-US/docs/Web/CSS/:has — relational selector can style event image from descendant CTA focus/hover; authored project-specific CSS, no package or copied implementation.
- https://www.awwwards.com/websites/music-sound/ — editorial inspiration only; no media, CSS, branding or layouts copied; individual site screenshots not accessible in this run.
- https://webflow.com/made-in-webflow — broad editorial interaction reference only; no template/code/media copied.
- Rejected: making the photo a duplicate clickable link (adds competing keyboard targets), perpetual glow, autoplay or JS animation. No dependency/license needed for native CSS.

## 2026-11-15 — V126 event index CTA hierarchy
- https://www.awwwards.com/websites/music-sound/ — editorial art direction for music-oriented websites; reference category for deliberate hierarchy rather than symmetric cards. Original CSS/action markup; no copied code/assets; no license required for independently written code.
- https://webflow.com/blog/website-navigation — reference for clear navigation and distinct visitor intents; adapted dual actions (explore details versus request a quote), without importing Webflow code/templates/assets.
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html — minimum interactive target spacing/size; implemented 48px CTA height and focus outline. No copied code.
- Rejected: adding another modal, event package configurator, auto-submitting quote or decorative animation; these add complexity without real service data. No new dependencies.
- Visual research URLs logged; browser screenshot comparison remains unverified and is a release blocker.

## 2026-11-15 — V125 category-aware gallery navigation
- [WAI-ARIA APG Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/): navigation remains inside an existing accessible dialog; preserved focus return and Escape handling. No external code copied.
- [MDN Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter): use the same visible collection for thumbnails and next/previous navigation, avoiding inconsistent state. Native JS; no license or package required.
- Rejected: importing a carousel package for six existing images; unnecessary bundle cost and change in focus semantics.

## 2026-11-14 — V124 portfolio URL and filter state
- [MDN History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API): browser navigation can restore earlier URL states; local filter should not conceal URL-selected content. Adapted principle to existing TanStack Router state without copying external code.
- [WAI-ARIA APG Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/): toggle state should describe the visible selection; existing aria-pressed reflects derived visible category. No code imported.
- Rejected: resetting category in useEffect on every film change, because asynchronous router updates can race with category click; no dependencies or third-party assets.

## 2026-11-14 — V103 Contact keyboard focus
- [WAI-ARIA APG Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/): keyboard focus should move into newly presented interaction and return predictably. Adapted concept only, no external code or assets.
- [MDN HTMLElement.focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus): native focus used after React state commit, without dependency. No modal semantics added because quote preview is not a modal.
- Rejected: adding a focus-trap or dialog package, unnecessary for an inline two-step form. Source research links recorded; no copied implementation.

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

## 2026-11-15 — V134 keyboard navigation
References for follow-up verification: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ (modal keyboard/focus) and https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ (carousel interaction). Original implementation: Home/End jumps in existing photo dialog, no external code or dependencies copied. Rejected: custom keybinding library and autoplay, unnecessary bundle/UX cost. Source browsing and real-browser verification pending.

## 2026-11-15 — V135 focus restoration
https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ — modal focus should generally return to invoking element. Adapted principle with original local React ref; no external code or dependency. Rejected: forcing focus to last viewed image (loses invocation context) and new focus-management package. Browser QA pending.

### 2026-11-15 — Studio recording-signal treatment
Reference: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path — native SVG path allows original scalable signal graphic; no third-party code/assets. Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/clamp — fluid spacing with bounded values. Adaptation: static original SVG path and responsive CSS in Studio service heading. Rejected: audio autoplay, canvas waveform animation and new dependencies because decorative motion would add cost and distract from booking.

## 2026-11-15 — V143 footer Contact test maintenance
- Evidence: GitHub Actions V142 https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43727508158; source SiteFooter.tsx and footer-editorial-v93.test.ts. Existing Contact CTA includes hash=contact-form-title, but old test asserted direct route without hash. No external design/code was incorporated, no new license/dependency/assets. Updated test matches intentional destination; UI/browser behavior remains to be tested. Reference for fragment navigation: https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment .

## 2026-11-15 — V144 semantic footer navigation
Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav — semantic navigation for major link groups; https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/ — distinguish repeated navigation landmarks with labels. Adaptation: named native nav wrappers for existing footer directories, retaining headings, links and CSS. No third-party code/assets or license requirements. Rejected: extra navigation widgets or new animations as unnecessary and visually repetitive.
