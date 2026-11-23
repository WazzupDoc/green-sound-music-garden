### V282 / 2026-11-23 — Contact no-JS channel parity
- Zone: Contact SSR/no-JS fallback. Added direct WhatsApp choice alongside existing email/phone; no automatic send. Draft PR #320, base V281, source SHA `4aeceddd75de72bc37015afca770244ad7d57070` (before documentation updates).
- QA: no browser screenshots, exact-head CI, TypeScript, SSR, or gzip verified for V282. No aesthetic redesign claim. Next: Contact mobile form/error/clipboard real-browser audit. PR #19 mergeable=false. Main untouched.

### V280 ACTUAL EVIDENCE / 2026-11-23 — COMPLETE (source SHA 2b9362db1e285240f1a5eb547a7c9b7a150e0060)

- **Genuine matched Chromium V279 baseline vs V280**: [GitHub Actions run #45157402285](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/45157402285) SUCCESS, [all screenshots artifact #14810225055](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/45157402285/artifacts/14810225055) captured at identical 390/1440 widths; after 360/390/430/768/1440/1920; full-page, service chapter, genuine-image decoding, focus/links/film Escape/SSR/no-JS, reduced-motion/Lite and hover verified. In screenshot-only capture, header positioning normalized *in both baseline and candidate* to prevent sticky navigation from covering the editorial section; normal site CSS untouched.
- **TS, SSR, Vitest, gzip, global browser QA green** exact source SHA `2b9362db1e285240f1a5eb547a7c9b7a150e0060`: push [#45157401422](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/45157401422), PR [#45157410738](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/45157410738), both SUCCESS. Standard browser verified other routes; stale selectors from V215/V85 corrected to assert same real eight services via ProductionIndex, not disabled.
- **Visible verdict:** undeniable original-code layout change (dark card wall → asymmetric bright photographic editorial, three chapters); aesthetic suitability is a subjective owner decision, not implied by green tests. First photo shows the existing couple/service artwork, not a newly claimed DJ live show. Avoid pretending validation establishes premium taste.
- **PR:** https://github.com/WazzupDoc/green-sound-music-garden/pull/318 (draft), branch `design/v280-premium-editorial-service-programme`. No main/deploy. Next rotation gallery/films.
- Source SHA above was the visually verified exact-head prior to this documentation-only update; after docs changes recheck the *new* exact-head checks and report status truthfully.

---
## 2026-11-23 / V280 — homepage services: editorial visual overhaul, DRAFT, QA PENDING

| Zone | Prior visual issue | Change in code | Before screenshot | After screenshot | Verified status | Next |
|---|---|---|---|---|---|---|
| Homepage services | V279 used five dark cards, three extra links, four workflow boxes: repeated, generic, long | V280: one existing `ProductionIndex` with three asymmetrical genuine-photo chapters, all eight direct service links, paper/ink contrast and editorial type. Removed old card/process markup and unused V188 inline CSS | V279 artifact https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/45142161685/artifacts/14802193389 | V280 six-width script/workflow added; new artifact **pending**, no before/after outcome asserted | Code committed; exact-head CI & real Chromium pending | Inspect screenshots, validate, fix if necessary; next zone films |
| Hero | V279 photographic art direction owner review pending | Unchanged in V280 | V279 artifact above | Same hero expected; browser verification pending | Unchanged source | Visual review |
| Films / Contact / other routes | No V280 intervention | Unchanged | N/A | N/A | No new functional assertions | Film gallery is next visual zone |

- Branch: `design/v280-premium-editorial-service-programme`, base V279 PR #316 exact `521337c42d0af8731e0cb813945c20b3f0b7089b`; do not stack on unrelated V227 PR #317.
- Changed source: `src/components/atelier/ConceptHomeV170.tsx`, `src/routes/index.tsx`, new `src/styles/home-editorial-v280.css`; updated stale source tests and added exact service contract test, dedicated six-width screenshot workflow.
- No new media, packages, claims about client events or commercial fonts. No backend, contact delivery, domain, main, merge or production deployment changes.
- **Status: pending** TS/SSR/Vitest/real Chromium/CI screenshot gate. Do not call V280 validated or visually superior before inspecting genuine screenshots.
- PR #19 remains open/draft/conflicted; not part of this change. Never merge into main without permission, exact-head green, backup tag and rollback.

---
### V279 / 2026-11-23 — ACTUAL CHROMIUM PROOF & SOURCE QA (draft / owner approval pending)
- Source commit `2a66e48d9cb35f38881168b5cd7cef768cfb39f1`: dedicated exact-head Chromium SUCCESS [workflow](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/45141619086); [before-after artifacts](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/45141619086/artifacts/14801619612), standard site React/SEO/Contact/SSR QA SUCCESS [workflow](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/45141619254). Six widths 360/390/430/768/1440/1920, real decoded original concert photo (`/media/greensound/concert-public-lumini.webp`), zero body overflow, selected lights ON/OFF/cool/green, full-motion, Lite and reduced-motion, no-JS, and film modal Escape. TypeScript, SSR build, bundle gzip and 168/168 tests (66 test files) PASS. Homepage hero height: before 868px desktop / 810px mobile; after 848px desktop / 847px mobile. No LCP numeric score measured.
- Visual comparison: BEFORE intensely hue-shifted green dark stage, fake 3D mixing desk and neon sine wave; AFTER photographic violet-light stage, cream typography with genuine Georgia italic, flat CTAs, fake console/wave hidden. All 8 service links, genuine three films and one final CTA retained.
- **AESTHETIC VERDICT:** technical gates pass; user has NOT yet approved and dislikes much of the broader site's look. Next rotation must treat home services and film imagery as a **major art-direction problem**, not a micro CSS polish. Existing cards remain overly green/dark; do not claim entire-site redesign. PR #316 stays draft, no main merge or deployment.
- Documentation-only follow-up changes the Git SHA; do not call this exact-head run green for the new docs SHA without checking its new CI.

### 2026-11-23 — V279 photographic home hero experiment (DRAFT / VISUAL REVIEW PENDING)
- Rotation: **homepage hero only**. Source baseline V277 `10a144e3ac015617186c8df069d1f94fc19eacc3`. Owner rejected V278 Events PR #315; it is CLOSED, not merged, and NOT included in V279. Reference existing [verified homepage V277 screenshot bundle](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/45133791627).
- Defects evidenced by V277 hero screenshots: extremely green hue-rotated real concert photo, exaggerated artificial beams, fake 3D mixing desk and neon waveform competing with headline, fluorescent CTA and bulky control rail; poor visual hierarchy on 390px.
- Implemented *single hero-only experiment*: `src/styles/home-photographic-v279.css`, scoped `gs279-home`, source headline revision in `ConceptHomeV170.tsx`, stylesheet import in `src/routes/index.tsx`. Real existing concert image now renders without -105deg hue rotation, with clearer picture framing; remove displayed fake console and neon waveform; serif emphasis muted warm tone, flatter CTA and small functioning light controls (photo tint also responds). Home service links, all film controls, Contact and global navigation preserved. New .github/scripts/v279-home-browser.cjs and workflow v279-home-qa.yml.
- **Visual QA gate:** same-page Chromium 390/1440 viewport and hero before/after, six after widths 360/390/430/768/1440/1920, owner photo decoded, browser console, keyboard, film Escape, lights/selection, Lite/reduced/no-JS, TS, SSR, Vitest, gzip. Exact-head workflow outcomes and screenshots to be verified before visual acceptance; no aesthetic score claimed.
- Matrix: | zone | severity | defect | patch | screenshots | verdict | next |
  | Homepage / hero | high | neon/competing 3D console, muted authentic photograph, weak mobile hierarchy | V279 photographic editorial reset | V277 [before](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/45133791627), V279 [pending](https://github.com/WazzupDoc/green-sound-music-garden/actions/workflows/v279-home-qa.yml) | PENDING owner review | services photographic cards and film strip |
- Rejected V278 lesson: increasing page length and title size without selective art direction was a regression. Not merged. V279 changes no services/films layout, no assets/dependencies/backend. No tag/merge/deploy; main untouched.
  
### 2026-11-23 — V277 Events timeline link context (DRAFT / QA PENDING)
- Zone: event detail timeline. Service links previously had the same accessible name whenever a service recurred across moments; now include step number and moment title while preserving visible copy and destination. Regression added. This is accessibility/functionality, NOT a visual redesign. No new assets/dependencies/backend. Browser screenshots, six widths, keyboard screen reader, strict TS, Vitest, SSR, gzip and exact-head CI NOT VERIFIED. Next: Events real-browser CTA/focus and visual composition; main untouched.

### 2026-11-23 — V276 Contact selected-brief screen-reader feedback (DRAFT)
- Rotation: Contact prefill. On hydration the selected event/date/location/services summary appears dynamically but previously had no announced status. Added a single polite atomic status to the noninteractive summary, retaining explicit no-auto-send copy. Source regression added. No visual redesign, new dependency or media. TypeScript, Vitest, SSR, gzip, CI exact-head, Chromium six widths and matched screenshots NOT VERIFIED. Next rotation: Events detail CTA and focus; do not merge/publish.

### 2026-11-23 — V275 Contact test TypeScript blocker
- Rotation zone: Contact QA; V274 exact-head `13000ceaaf1c19e35da90564d297ed8ba1d1e105` failed strict TypeScript (run 45103808941) at `src/test/contact-location-invisible-v272.test.ts:13` (TS2769 optional capture). V275 narrows capture; CI pending, no screenshot or visual claim. Next Contact real-browser prefill + six widths, then Events. Main unchanged.

### V273 / 2026-11-23 — Contact prefill: normalize Unicode U+2028/U+2029 separators to spaces, preserving Romanian characters. Regression added. No visual redesign; CI and browser proof pending. Next: Contact end-to-end prefill and mobile screenshots. Main untouched.

### V272 / 2026-11-23 — Contact location prefill: strips invisible Unicode format controls (zero-width, bidi and BOM) before empty-value validation. Test added. No visual change; exact-head CI/Chromium pending. Next: Contact prefill browser journey. Main untouched.

### V271 / 2026-11-23 — Contact SSR/no-JS accessibility: removed persistent role=status from interactive fallback, retained labelled region and direct email/phone actions. Added source regression. No visual redesign; screenshots, exact-head CI, six-width browser QA, TypeScript/SSR/Vitest pending. Next: Contact prefill real-browser audit. Main untouched.

### V270 / 2026-11-23 — One-zone CI regression: V269 PR #306 exact-head run 45074860586 failed 1/163 Vitest because V268 source-test regex terminated at nested JSX `}>` before the phone link. Replaced fragile extraction with bounded ClientOnly-to-QuoteForm slice. No production UI change. QA exact-head CI and browser screenshots pending; next Contact prefill browser audit.

### V269 / 2026-11-22 — Event/service quote fallback context (DRAFT)
- Zone: event detail quote conversion / no-JS. Prior fallback provided contact actions but silently dropped preselected event type/services. Now exposes selection as plain text, with instruction to mention it manually; no claim that mailto transmits selections automatically. Files: src/components/site/blocks.tsx, src/test/quote-nojs-context-v269.test.ts. No new assets or dependencies. Browser screenshot before/after 390/1440 and 360/430/768/1920, SSR/TypeScript/Vitest/gzip and CI exact-head pending. Next zone: Contact prefill/focus validation.

### V267 / 2026-11-22 — Event detail quote no-JS fallback (DRAFT / QA PENDING)
- Rotation: event detail conversion. Shared QuoteSection previously displayed an indefinite loading-style placeholder when JavaScript was disabled; now offers real mailto and telephone actions, explicitly states JS requirement and no automatic sending. Code: src/components/site/blocks.tsx. Shared QuoteSection may also affect service pages; regression coverage required. No new dependency/media/backend, no homepage structure change. Exact-head TypeScript/Vitest/SSR/Chromium matched 390/1440 screenshots NOT VERIFIED; no visual acceptance claim. Next: browser test and focus/keyboard event CTA.

### V223 / 2026-11-22 — Contact no-JS conversion fallback (DRAFT, QA PENDING)
- Rotation: Contact SSR/no-JS. Previously the ClientOnly placeholder said the form was being prepared indefinitely when JavaScript was disabled, with no action inside the quote panel. It now states the dependency and exposes first-party email and telephone links, retaining existing separate contact links and client form behavior.
- Code: src/routes/contact.tsx. No new dependencies, media, APIs, auto-sending, homepage sections or deployment changes. Test gate: real Chromium before/after at 390/1440, JS-disabled click targets, 360/430/768/1920, keyboard, TypeScript, SSR, Vitest, gzip and exact-head Actions are NOT YET VERIFIED. Visual acceptance NOT claimed. Next rotation: event detail CTA and contact prefill journey.

### V222 / 2026-11-18 — MAIN SYNC COMPLETED (documentation-only status)
- Full development history through V221 + V222 CI regression corrections merged by PR #222 https://github.com/WazzupDoc/green-sound-music-garden/pull/222 into main; merge commit `c97f36f6e6628a45f9b2da715888e5af5f5e59b3` (parents original main `557d8b4fd086f4592581cccc68ddd53d2542b45b` and candidate `7c946f5aff3038bc7286603463e3eaff356966af`). This supersedes older DRAFT entries below, which remain historical.
- Validated exact candidate HEAD `7c946f5aff3038bc7286603463e3eaff356966af`: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44311911018 (strict TypeScript, production SSR/Vite build, gzip budgets, 59 test files / 160 tests, real Chromium six widths, Contact SSR/hydration, sitemap and 20-page canonical/SEO audit). Supplemental V19 run https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44311911322 passed. New screenshots: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44311911018/artifacts/14430567777 . Visual changes derive from earlier development; V222 itself only repaired two stale regression assertions.
- Backup verified before merge: Git tag `backup/main-pre-v222-20261118` points exactly to original main `557d8b4fd086f4592581cccc68ddd53d2542b45b`. Rollback option: create a revert PR of merge commit `c97f36f` using `git revert -m 1 c97f36f6` on a new branch, test, then merge; do not force push or rewrite history.
- README says pushes to main sync to Lovable; actual site-publication state is NOT independently verified. No direct domain, deployment, paid service or external setting changes performed here.
- Next: reconcile post-merge Lovable preview with real Chromium screenshots, audit Contact→Evenimente conversion and responsive visuals. Do not assume changing main automatically proves production publication.

### V221 / 2026-11-18 — Contact location prefill validation (DRAFT)
- Branch `fix/v221-contact-empty-location-sanitization` stacked on V220 PR #220. Prevent control-only location URL parameters from creating an empty prefill and cap raw input at 2000 characters before processing. Regression test added. V220 exact-head Actions #44299612544/#44299598313 FAILED in Test existing application; cause not yet isolated. V221 CI/TypeScript/SSR/Vitest/Chromium and matched 390/1440 screenshots pending. No visual redesign, main/deploy unchanged. Next: isolate CI test failure, then Contact browser and event CTA audit.

### V220 rotation: film identity/privacy. V219 effect-based reset could render a replacement iframe for one commit before useLayoutEffect stopped it. Added render-time identity guard; no visual redesign. Browser/CI exact-head and 390/1440 screenshots pending. Next: Contact/event CTA.

### V219 / 2026-11-18 — Reset film consent on changed video identity (DRAFT / QA PENDING)
- Branch `fix/v219-video-switch-consent-reset` stacked on V218 PR #218. Shared VideoLite now detects when a mounted player's video ID changes and stops the previous consented playback before rendering the replacement. Focus is restored to the new Play button. Regression source test added; no dependencies/assets/homepage sections/main/deploy changes.
- Exact-head TypeScript/SSR/Vitest, actual Chromium playback/keyboard and matched screenshots NOT VERIFIED. Next rotation: Contact and event CTA.

### V218 / 2026-11-18 — Video privacy permission audit (DRAFT)
- Rotation: shared video embeds (portfolio/events/home). Third-party iframe previously requested accelerometer, gyroscope and clipboard-write permissions without functional need. Reduced `allow` to autoplay (only after explicit Play), encrypted-media and picture-in-picture. Existing Stop/focus, no-referrer and click-to-load preserved. Source regression added. No visual redesign; screenshots/CI exact-head pending. Main untouched. Next: Contact and event CTA browser audit.

### V217 / 2026-11-18 — Desktop service directory (DRAFT / VISUAL QA PENDING)
- Rotation: desktop navigation; next: Contact and events detail, then gallery and video.
- Base: V216 `199ff989`; UI commit `7f765530`; PR #217 https://github.com/WazzupDoc/green-sound-music-garden/pull/217
- Defect: plain service link gave no preview of the eight actual services; owner asked for clearly visible custom iconography and a substantially more designed top navigation.
- Implemented: three grouped editorial chapters (Muzică, Tehnică, Momente), eight original SVG sigils, keyboard/touch menu toggle with Escape and outside-pointer dismissal; existing mobile menu unchanged.
- Visual gate: screenshots before/after 390/1440 NOT YET AVAILABLE; no aesthetic acceptance claim. CI exact-head pending.
- Main unchanged; PR draft, no publish. Revisit panel clipping, Escape, focus, performance and Lite before merge.

### V216 / 2026-11-18 — Mobile navigation visual decluttering (DRAFT, QA PENDING)
- Parent V215 SHA d221aa53718560939183e62b70fbca98a9228570, PR #215. Zone: mobile navigation only. On <=640px hide decorative stage SVG, redundant live cue and explanatory note, reduce oversized heading and give six actual destinations clearer hierarchy. Preserve desktop navigation, keyboard/escape, existing real actions and no extra media/dependencies. Code: src/styles/navigation-v215.css. Source CSS change committed, **not** yet validated in real Chromium 390/1440; no screenshot before/after or exact-head CI claim. Next: run matched browser captures, verify compact-height devices and contact flow. Main untouched.

### V215 / 2026-11-18 — USER-REJECTED V214, RESTORE V213 + REFINEMENT (DRAFT)
- Owner explicitly disliked the V214 navy/ivory/vector panel, numbered navigation and changed photographic balance. Draft PR #214 CLOSED (not merged). V215 started at known prior green V213 HEAD e43609dd09212d3cbf8d18a2b47d677f29fc2b56 without cherry-picking V214. V215 home keeps original scene photo, title, real eight services, real 3 films, original green shader and decorative 10-channel mixing desk; retunes only desk material/green light softness. The 390px screenshot revealed V213 console overlapping controls, so it is disabled below 740px. Desktop original six-text link navigation remains, no numbers. Search retains Radix dialog / keyboard and adds restrained visible desktop search label + actual local DJ/lumini/nuntă presets. No package/media/brand replacement.
- QA gate: matched V213→V215 390/1440 Chromium plus six width 360/390/430/768/1440/1920, search, keyboard, reduced-motion, Lite and motion states required before visual signoff. Do not overclaim CI until exact HEAD completes. next: mobile nav and Contact funnel. **User approval of visual direction pending**; main/CD untouched.

### V213 / 2026-11-18 — Contact CI blocker
- Confirmed V212 exact-head Actions #44241249565: strict TypeScript, SSR, gzip passed; 54 test files / 147 tests passed, 1 suite failed during module load due to `import.meta.url` non-file URL. Corrected source test path on isolated V213 branch. No visual redesign or screenshots; full CI/browser gate pending. Next: Contact browser QA then events CTA.

### V212 / 2026-11-18 — Contact discard feedback (DRAFT)
- Zone: Contact privacy/UX. Explicit discard now gives accessible local-clearing confirmation; no claim of delivery. Source test added. Draft PR #211. CI and matched Chromium screenshots pending. Next: Contact browser QA, then events detail CTA/focus. Main untouched.

### V210 / 2026-11-18 — Film poster error fallback (DRAFT)
- Rotation: portfolio video image resilience. A configured first-party poster could fail to load and leave a browser broken-image glyph over the play surface. `VideoLite` now tracks the failed poster URL and renders the existing local dark surface; when a different poster URL arrives, it is attempted normally. Existing consent-gated playback, focus handoff, captions and homepage sections unchanged. Source regression updated. TypeScript, Vitest, SSR, exact-head CI and matched real Chromium 390/1440 screenshots **NOT VERIFIED**; main untouched. Next: event detail CTA/focus and real-browser QA.

### V209 / 2026-11-18 — Film keyboard focus on Play (DRAFT)
- Rotation: portfolio/video keyboard accessibility. Play unmounted the focused button and mounted an iframe plus Stop without moving focus; added a layout-effect handoff to the visible Stop button. Existing Stop→Play focus restoration preserved. Source regression added. Exact-head CI and matched Chromium screenshots pending; main unchanged. Next: event detail CTA and browser QA.

### V208 / 2026-11-18 — Video poster third-party request guard (DRAFT)
- Rotation: embedded video privacy. Existing fallback thumbnail fetched `i.ytimg.com` before user pressed Play, contradicting click-to-load privacy claim. Replaced external fallback with local dark poster surface, retaining any configured first-party poster, Play label, accessible title and video controls. Added source regression. This is a privacy fix with a visual fallback change, not a verified redesign. Exact-head CI and real Chromium matched 390/1440 screenshots pending; main unchanged. Next rotation: event detail CTA/focus.

### V207 / 2026-11-17 — Third-party video privacy (DRAFT)
- Rotation: embedded film privacy. Added `referrerPolicy="no-referrer"` to the click-loaded YouTube iframe, protecting page URLs on third-party requests; existing consent, Stop and focus restoration remain. Source assertion updated. This is NOT a visual redesign. No real browser before/after captures or exact-head CI yet. Next: event-detail CTA/focus and real Chromium screenshot verification. Main unchanged.

### V206 / 2026-11-17 — Event film privacy / playback clarity (DRAFT)
- Rotation: event detail films. Visible privacy explanation now precedes video players: third-party YouTube loads only on Play and Stop is available. Region has labelled heading. No extra homepage sections, media or packages. Source regression added. Chromium 390/1440 before/after, six-width QA, exact-head TypeScript/Vitest/SSR/CI **NOT VERIFIED**. Next: event detail CTA/focus browser QA. Main unchanged.

### V205 / 2026-11-17 — Portfolio stop focus reliability (draft)
- Zone: portfolio film controls. V204 scheduled focus with requestAnimationFrame after setState, which does not guarantee that React has committed the replacement poster button. V205 uses a pending-focus ref and useLayoutEffect after the active→inactive commit; no focus on initial mount. Updated source regression. Browser screenshots and CI exact-head pending; main unchanged. Next: event detail UX.

### V204 / 2026-11-17 — Portfolio film playback controls (draft)
- Rotation: Portfolio / film player. Problem: consent-loaded YouTube iframe previously had no first-party Stop action; visitor had to change film or leave page to silence playback.
- Implemented: visible 44px+ Stop button unmounts iframe immediately and returns focus to original Play button on next animation frame. Native keyboard controls, no package, no autoplay before explicit Play; unchanged homepage and original films.
- Source regression: src/components/site/video-lite-v204.test.ts. Browser 390/1440 matched screenshots, 6 widths, exact-head CI, screen-reader and playback smoke **PENDING**; no claim of QA pass. Next: film controls browser validation, then event-detail UX.

### V203 / 2026-11-17 — Contact / privacy discard
- Added explicit discard control on prepared quote preview. Clears React preview and RHF retained personal fields (including query-prefilled details), consent and services; invalidates outstanding clipboard completion. Source regression test added. No backend, external services or new dependencies. **Exact-head CI and matched browser screenshots not yet verified.** Next zone: portfolio / film controls.

### V202 / 2026-11-17 — Navigation / focus continuity
- Latest base: V201 PR #200 source `14feaa41c591ea992f48e110a258c4d51d673b15` (not necessarily CI-validated). V202 branch `fix/v202-menu-desktop-focus-handoff`, stacked on V201.
- P1: mobile dialog closes on desktop resize but previously restored focus to a hidden mobile menu button. Now handoff to active visible desktop navigation link, with first-link fallback. Escape and ordinary close still return to mobile opener. Native dialog only; no new dependencies or homepage edits.
- Source test `v202-menu-focus.test.ts` added. CI exact-head, matched 390→1440 real browser focus/screenshot and six-width regression **NOT VERIFIED**. Do not merge or deploy. Next: Contact clipboard denial and prefill QA.

### V201 decoder QA clarification — 2026-11-17
- An investigation of the WebP verification revealed the direct `Image().decode()` assertion was executed on an `about:blank` page, so the relative `/media/...` URL did **not** resolve to the local Vite site. The original AVIF decoder failure had the same test-origin bug; it is **not evidence that AVIF lacks Chromium support**. Corrected QA now navigates to `http://127.0.0.1:4175/evenimente` before decoding. Selected WebP asset remains preferred for conservative browser compatibility; no claim of AVIF incompatibility.
- Actual screenshot evidence from the V201 partial workflow shows all 13 drawn icons visibly in the page, even though later test assertions failed. Need final exact-head, same-origin decode pass before release.

### V201 actual Chromium uncovered image-format defect; switched from AVIF to WebP
The first real browser run passed six viewport structure checks but proved the AVIF atlas could not decode (`EncodingError`); do not describe AVIF as successful. Final intended `gs-category-illustrations-v201.webp` is **45,888 bytes**, no CDN, same 13 distinct original graphics, with original file removed. This is important user-visible correctness and should be validated via exact-head `v201-category-art-visual.yml` / decoded `Image()`, not only CSS computed styles. Prior full QA before WebP source change: 50 suites / 138 tests, global CSS gzip 49.7KB under 52KB cap. Final-head WebP QA and screenshot artifacts pending at documentation update.

## V201 / 2026-11-17 — owner-approved generated category illustrations / draft PR #200
- Primary zone: event/service category selection and visual identity. User rejected V198 simple line icons and requested using the two rich icon concept images generated in this conversation.
- V201 `design/v201-illustrated-category-art` stacked on V200 `fc8d9601ba94d26fbb8cafd929b1518e355296db` (V200 itself had pre-existing global CSS gzip budget failure; do NOT call that SHA validated). Draft https://github.com/WazzupDoc/green-sound-music-garden/pull/200 . Do not touch main/production.
- New local source `public/media/gs-category-illustrations-v201.avif` (29,919 bytes / 13 cropped thematic AI illustrations), `CategorySignal.tsx` selects proper sprite-cell, `category-illustrated-v201.css` and route components include new imagery SSR. Generated lettering removed; real names/link copy preserved. No fake employee/event media, no new dependencies, paid services or homepage additions. Existing SVG remains fallback in Save-Data.
- One inherited technical blocker addressed: global CSS budget on V200 exceeded 52KB gzip. V78/V79 legacy prototype CSS source files retained in history/repo, but removed from global `src/styles.css` import graph because production homepage uses `ConceptHomeV170` route-specific stylesheet; accompanying old visual integrity test updated to assert active V170 and retention of prototype files, **not disabled**. Validate this in exact-head CI and browser.
- Evidence: `.github/workflows/v201-category-art-visual.yml` makes actual V200-before/V201-after same-state 390/1440 captures and six-width V201 regression; /servicii previews, generated AVIF 200/decode/dimensions, keyboard, click animation, Lite and reduced-motion/no-JS. Final artifact URL and green exact-head CI **PENDING** until check. No fabricated metrics.

| Route/area | Prior status and problem | V201 status | Evidence / next |
|---|---|---|---|
| /evenimente event chooser | V198 simple line icons rejected | 5 illustration tiles with selection animation; photographed hero remains original media | Chromium before/after **PENDING** |
| /servicii catalogue | V198 line icon too simple | 8 rendered detailed thematic illustrations | Chromium / DJ hover **PENDING** |
| / home | clean V170 + V188 four-section contract | **UNMODIFIED** | existing historic artefacts; owner visual review |
| /contact | V199 prefill handoff | inherited from V200 | NEXT rotation clipboard/validation |
| /navigation | V200 viewport resize | inherited, QA budget previously red | Confirm CI and mobile |
| /event detail | V197 editorial rundown | unchanged | historically validated |
| /studio/portfolio | V194 / V191 draft visual themes | unchanged | future route rotation |
| /SEO/SSR/404/security | global budgets and existing audits | CSS import cleanup source change | exact-head QA PENDING |
- Next after V201: Contact clipboard denied/accepted UX and responsive form, then typography/footer and responsive page integrity.

### V200 / 2026-11-17 — Mobile menu viewport recovery (unverified)
- Zone: navigation/mobile menu. On narrow→desktop viewport transitions an open native modal dialog could remain active and block the desktop nav. SiteHeader now listens for the desktop media-query transition and closes the dialog through existing state, restoring background interaction. No dependency, media or homepage changes.
- Evidence pending: Chromium 390→1440 resize, keyboard/Escape/focus, Lite/reduced-motion, six-width screenshots, TypeScript, SSR, Vitest and CI exact-head. No visual QA claimed. Next: service discovery and portfolio.
- References to review: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia ; https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog . Original adaptation, no third-party code copied.

### V199 / 2026-11-17 — Contact handoff audit (DRAFT PR #198)
- **Primary zone:** /contact Guided Event Brief. Problem: visitors arriving from /evenimente or /servicii had no concise confirmation of the exact preselected service choices above the long form; the introductory sentence alone was generic.
- **Implemented:** visible contextual handoff strip using the existing allowlisted validated route search fields (event/date/location/services). Semantic list for services; responsive wrap; clear no-auto-send text. No new query reflection, API, packages, media, or homepage changes.
- **Source commit:** 8c775ea8038bac55f496c48447e36152fc5be192; branch design/v199-contact-prefill-handoff; draft https://github.com/WazzupDoc/green-sound-music-garden/pull/198, stacked on V198.
- **Evidence gate OPEN:** exact-head CI, real Chromium before/after at /contact?event=...&services=... 390/1440 and 360/430/768/1920, focus, prefill, clipboard accept/deny, no-JS fallback. **No screenshots or passing tests claimed for V199.** Do not merge/deploy.
- **Next rotation:** navigation/mobile menu, then footer/SEO; preserve Contact's real external handoff and homepage editorial contract.

### V198 verified source checkpoint / 2026-11-17
- UI/test SHA `501026b89e2b813de97fd127e5912340b020dcbf`: full CI pass https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44087716295 ; real matched Chromium pass https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44087711567 ; PNG artifact https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44087711567/artifacts/14329958280. Actual before/after inspected 390+1440, 6-width regression, event click/keyboard, DJ hover, Lite/reduce/no-JS all pass.
- Remaining: owner design approval, physical device screen-reader review, deployment/CD inspection and backup/rollback before any permitted main integration. PR #19 remains conflicting and unrelated.
- **Next rotation /contact**: multi-service prefill, preview/edit, clipboard accepted/denied, mobile focus, real message handoff without auto-send; then footer/SEO. Do not loop back to hero.

## V198 / 2026-11-17 — Category discovery / original animated signals (PR #197 DRAFT)
**Primary intervention area:** /evenimente selectable setlist and related /servicii discovery rows. Base validated V197 UI SHA `45749fb6391f7ea92d9021f72fc3208094536554`. Branch `design/v198-category-signature-cues`; PR https://github.com/WazzupDoc/green-sound-music-garden/pull/197. 5 event + 8 service first-party vector motifs; click/keyboard selection replays distinct finite animation, service hover/focus plays genre-specific cue; SSR native links and existing photo + Contact remain. No homepage change.
**Files:** `src/components/site/CategorySignal.tsx`, `src/styles/category-signature-v198.css`, `src/routes/evenimente.index.tsx`, `src/routes/servicii.tsx`, `src/components/site/category-signal-v198.test.tsx`, `.github/scripts/verify-v198-category-cues.cjs`, `.github/workflows/v198-category-cues-visual.yml`.
**Proof gate:** real Chromium same /evenimente selected Petreceri at 390/1440 before V197/after V198; six-width regression; animated full-motion frames on click + DJ hovered at /servicii; Lite/reduced-motion, keyboard, no-JS, decoded real imagery. Full exact-head TS, SSR, Vitest, gzip, sitemap/contact CI. Screenshots/CI **PENDING** until confirmed. No scores invented.

| Component / page | Issue / severity | Progress and evidence | Next |
| --- | --- | --- | --- |
| /evenimente category selection | P1 generic unthemed selection reaction | V198 distinct SVG cues + replay click/keyboard, actual screenshot pending | QA first |
| /servicii category directory incl DJ | P1 list generic, few symbols | V198 unique service SVG + DJ record hover/focus, screenshot pending | QA first |
| /evenimente/$slug | P1 utilitarian rundown | V197 validated editorial timeline, screenshots available | Follow-up event type and Contact |
| /contact guided brief | P1 prefill/clipboard denial QA | V195 draft inherited, not claimed verified | **NEXT PRIMARY ZONE** |
| /portfolio | P2 accessible film archive | V191 prior validated UI SHA | Later rotation |
| /studio | P1 visual acceptance | V194 draft, screenshots pending | Later rotation |
| Homepage | P1 owner design approval, clean contract | Untouched, 3 chapters/8 services, 3 genuine films, single CTA | Owner acceptance |
| About/footer/privacy | P2 aesthetic/accuracy | No new change | After Contact |
| SSR/SEO/404/security | P1 if regressions | Existing full QA pending exact V198 HEAD | Complete before release |

## V197 / 2026-11-17 — Rotating full-site component audit (draft PR #196)
Latest planned area: event detail timeline /evenimente/$slug. Real source change: route-scoped SSR CSS, asymmetric intro + oversized editorial sequence, legible service CTA; no added cards or fake stats. Evidence gate: Chromium matched 390/1440 and six-width QA workflow `v197-event-rundown-visual.yml`; exact-head results must be checked. First run had a test fixture mismatch and focus-timing assertion which were revised without removing quality gates. No main/deploy.

| Zone | Priority / defect | Status / evidence | Next |
| --- | --- | --- | --- |
| Event detail rundown | P1 grid too utilitarian | V197 source changed; final screenshots/CI pending | Verify visual and keyboard |
| Event index | P2 discovery complexity | V173 existing; no V197 changes | Retest selection |
| Contact / Guided Brief | P1 preview clipboard and prefill | V195 source, Chromium regression pending | **NEXT primary** |
| Studio detail | P1 V194 visual acceptance unverified | V194 draft; no V197 change | Visual QA |
| Portfolio | P2 film navigation | V191 actual captures, owner approval pending | Keyboard/player |
| Services | P2 internal CTA and imagery | Existing pages retained | Service mix audit |
| Homepage | P1 prior generic feedback | Contract hero + 3 chapters/8 links + 3 real films + 1 CTA unchanged | Owner review |
| About/footer/privacy | P2 content and typography | Pending detailed audit | After Contact |
| SSR/SEO/404/security | P1 if regressions | Inherited existing tests, final exact-head pending | Technical rotation |

No new assets, packages, external services, fictitious business facts, measurement scores, main changes or deployment. Documentation: RESEARCH.md / ASSETS.md / CURRENT_DEVELOPMENT_VERSION.md should describe this branch and final screenshot artifact.

## V195 — 2026-11-17 / Contact review audit
Matrix: Contact preview — P1 missing visible reply phone/email/guest estimate despite collection; now shown in existing review ticket, source changed, QA/screenshot pending. Studio V194 — P1 browser QA pending. Event details — next rotation. Homepage unchanged. Source `b5c5acf23898d9bcfce2e42b4ec314ee31917c34`; no main/deploy. No performance or accessibility scores claimed.

## V190 / 2026-11-17 — Portfolio section focus (DRAFT)
Area: `/portofoliu` hero shortcuts. Native hash navigation previously scrolled to photos/films but did not transfer keyboard focus; both links now focus their existing destination headings. Film heading receives `tabIndex={-1}`. No new packages, media, autoplay, backend or main changes. Source SHA `62988c36ef9ca984e91ddec9dea2bffcef9949bc`. Visual change: none; browser screenshots, keyboard testing, six widths and exact-head CI pending. Rotation next: portfolio film filtering/player interaction and visual archive composition.

## V187 / 2026-11-17 — CI coverage for iterative branches (DRAFT)
Zone: GitHub Actions / full-stack QA. Observed V186 exact-head had only a skipped visual workflow; `verify-crafted-react.yml` matched design branches but excluded `fix/v*` and `feat/v*`, leaving iterative Contact/Event PRs without its TypeScript/SSR/Vitest/browser/budget suite. Added both branch patterns to push and PR base filters, preserving all existing jobs. Source commit 82066e730a9c48e8bf643845946a325662f668bd. No UI change; before/after screenshots are not applicable to this CI-only repair. CI exact-head pending. Matrix: DevOps critical coverage — implemented, QA pending; Contact V186 — still pending QA; Events V185 — pending QA; next rotation: Contact clipboard denied path and matched browser captures. Main/deployment unchanged.

## V186 / 2026-11-17 — Contact external-send clarity (DRAFT)
Zone: /contact step indicator. Source copy previously used `03 / SEND`, potentially implying automatic transmission; replaced with `03 / DESCHIDERE` and explicit user confirmation in the external app. Scope: one copy change, no API, packages, media, homepage, backend or deployment. Source commit 4b357375a40d7853d3ca61e36593dcf5ea8c291e. QA pending: TypeScript, SSR, Vitest, 390/1440 matched Chromium, six-width, clipboard denial, exact-head CI. Audit rotation: Contact copy — source changed, QA pending; /evenimente service shortcut V185 — QA pending; homepage/services/SEO — unchanged. Next: real browser QA and Contact clipboard flow. Main untouched.

## V185 / 2026-11-17 — Event detail service discovery (DRAFT)
Zone: `/evenimente/$slug` hero-to-recommended-services journey. Source improvement: add visible native anchor `#servicii-potrivite` and transfer focus to an explicitly labelled, programmatically focusable section; heading now names the actual event. No new services/media/backend. Evidence: GitHub source commit `1ecdc269b6aecf0f9b582a2878c18ff65a942ca9`; screenshot before/after 390/1440, 360/430/768/1920, CSS/browser, CI and unit/SSR checks pending. Matrix: event details — functional source changed, QA pending; Contact clipboard — QA pending; homepage — unchanged; services/portfolio/footer/SEO/performance — rotation pending. Next: browser event detail visual QA and keyboard navigation. Main unchanged.

## V184 / 2026-11-17 — Event detail focus rotation (DRAFT)
Zone: `/evenimente/$slug` timeline navigation. Defect from source inspection: clicking the hero fragment link scrolls to the timeline but leaves keyboard focus on the hero link. Implemented focus handoff to existing `tabIndex=-1` timeline section while retaining native hash navigation for no-JS. Source-only evidence; no screenshots, browser QA, TypeScript, Vitest, SSR or exact-head CI confirmed. Audit matrix: event detail keyboard navigation — source fixed, QA pending; visual composition — pending; Contact clipboard V183 — QA pending; homepage — unchanged; service pages, SEO, performance, footer — future rotation. Next: event detail visual audit and six-width screenshots. Main unchanged.

## V183 / 2026-11-17 — Contact clipboard async lifecycle (DRAFT)
Area: Contact preview. Defect: clipboard permission prompt may resolve after visitor chooses Edit and later re-enters preview, overwriting the new state; rapid repeat clicks before React render could also issue duplicate writes. Fix: generation-token invalidation and synchronous pending ref. Evidence: source commit only; CI, browser and screenshots pending. No main/deploy. Next: /evenimente detail design/browser audit.

## V181 / 2026-11-17 — Contact preview advice semantics (DRAFT)
Zone: Contact preview only. Separate the optional advice request from the real selected services in the preview ticket; previously it appeared as a service, contradicting V180 counter. Existing `ADVICE_SERVICE_LABEL` used; no new asset/dependency or automatic sending. Source changed, browser matched screenshots, unit/SSR/TypeScript and CI exact-head not yet verified. Next: preview keyboard/edit and clipboard denial browser audit. No main/deploy.

## V180 / 2026-11-17 — Contact selection counter, DRAFT
Zone: Contact / Guided Event Brief. Corrected a misleading count when a visitor requests advice alongside services: the advisory choice is not one of the eight services, so the visible count now reports selected services separately and explicitly states that advice is requested. Source regression guard added. No media, dependencies, homepage or automatic sending. Browser 390/1440 before/after, TypeScript, SSR, Vitest and exact-head CI remain pending. Next: verify Contact preview/edit and denied clipboard in Chromium; then rotate to other interior routes. Main and deployment unchanged.

## V179 / 2026-11-17 — Contact anchor keyboard focus, DRAFT\nZone: /contact entry-to-form. Defect: native hash link scrolled visually but left keyboard focus on the link, creating a disconnect for keyboard/screen-reader users. Source fix focuses existing h2 tabIndex=-1 on activation without suppressing native hash navigation; regression source test. Evidence: code only; real Chromium screenshots/keyboard QA and exact-head CI pending. No visual redesign claim. Rotation: next Contact form/preview validation and mobile accessibility, then interior pages. Main and production unchanged.\n\n## V173 / 2026-11-16 — REAL /evenimente poster rebuild, DRAFT
**Latest verified base** V172 PR #171 on SHA 70a79ed38c447139f7c9b2c6c806fd3a31781cdf, CI GREEN https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43892819449 and browser GREEN https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43893170348 . New branch design/v173-live-show-poster-events stacked on V172, no main/deploy.
**Chosen area:** /evenimente index. Prior browser 1440px showed excessive dark empty first fold and a generic duplicate intro; replaced with a *single* original poster-like stage where selected real photo is much larger, unusually scaled typography crosses the photo edge, five event types act as a keyboard-native numbered setlist, and an ivory production-note cue sheet now derives real moments/services from active event data. No faux app feature, added API or sending. Stutter-safe photo/shutter animation only in full-motion, off in reduced-motion and Lite. All five event detail URLs remain SSR-rendered as true native links even without JavaScript. Dynamic Contact prefill is still event-specific. No changes to homepage/other routes.
**Verification at documentation write:** GitHub Actions exact-head CI & matched 390/1440 real-browser artifacts pending. Version is an unapproved design candidate, not deployed. Next audit area: each /evenimente/$slug detail page, followed by Contact, Services, Portfolio, mobile nav/footer, SEO/SSR/security and performance. Always inspect screenshots and fix aesthetics before claiming success.
**Audit matrix delta:** homepage V170 (unchanged), event index V173 (source implemented; screenshot QA pending), event details (next), Contact V171 (unchanged), service details/Portfolio/navigation/SEO/privacy/perf (scheduled rotation). Screenshot reference V172 run above; V173 artifact link to be documented once generated.

## V172 / 2026-11-16 — EVENTS route, original event direction console (DRAFT)
**Rotation:** /evenimente index; latest inspected base V171 commit a7597cf01f64cf3e01e696f5d8996885a22a90f8; earlier V170 exact-head CI 43884587939 successful; V171 build CI 43887649779 passed. Branch design/v172-event-direction-console, draft PR #171 https://github.com/WazzupDoc/green-sound-music-garden/pull/171. New headline/scene direction replaces V88 repeated alternating rows with five type selections and contextual authentic-photo preview. Native keyboard buttons with arrows/Home/End, five direct SSR event-detail links, active Contact offer event prefill, linked real recommended services. Original signal/scene transition/equalizer cues enabled only in full-motion and suppressed in reduced-motion/Lite. No new media/deps, no homepage change, no fabricated offers. Exact-head CI/screenshots NOT yet confirmed at documentation write; workflow v172-events-qa is intended to create matched before/after images for 390/1440 + six-width regression. **Next:** review real captures and fix issues, then /evenimente/$slug detail pages, Contact and header. No main merge/deploy.
**Audit matrix (current cycle):** homepage V170 — visual review pending; Contact V171 — URL safety implemented, browser abuse case pending; event index V172 — implemented, visual/runtime QA pending; event details — next; service details — pending rotation; Portfolio — prior V161 baseline; navigation/footer/SEO/404/Perf — ongoing global regression. Never count green CI as visual owner approval.


## V171 / 2026-11-16 — Contact URL prefill safety (draft)
Zone: /contact; detected unsanitized Unicode bidi/control characters in location query, which could visually spoof an event location or insert line breaks into the quote form. Replaced these controls with normalized whitespace before the existing 120-character cap, preserving ordinary Romanian text. Added Vitest regression for bidi/newline/NUL, length and unknown service. Branch fix/v171-contact-prefill-safety; PR/CI and browser evidence pending. Visual change is observable only when a malicious or malformed location is supplied; no aesthetic redesign claimed. Next rotation: /evenimente visual and functional audit. Main unchanged.

## V170 / 2026-11-16 — Owner's selected bottom-right Green Sound concept, IMPLEMENTED AS CODE (DRAFT)
**Branch** `design/v170-reference-green-production-experience`, PR #169 https://github.com/WazzupDoc/green-sound-music-garden/pull/169, stacked on V168. Owner provided a four-panel concept board and selected the fourth, lower-right; also confirmed an assistant-produced dark/emerald production-stage mockup. This V170 is a new active homepage composition, not V168 CSS micro-polish. **Changed real route:** `src/routes/index.tsx` imports only `ConceptHomeV170.tsx` and `home-reference-v170.css?inline`; global header, footer, service/event/contact/portfolio routes unchanged. Visual mapping: full-width first-party concert image, layered live-mixer graphic (clearly decorative original CSS), five moving stage beams, equalizer bars, animated continuous waveform, large contrast typography, five real featured service cards, three additional real catalogue links, four-step process, three original project film posters with explicit-play VideoLite dialog, image-backed final contact CTA. All eight actual service URLs appear exactly once, no fabricated statistics, new stock/AI photos or auto-playing media. Light ON/OFF and Green/Cool controls are functional; CSS motion respects prefers-reduced-motion, Lite, and the stage stops animating when off-screen/hidden tab. Verified screenshot baseline: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43883251587/artifacts/14234240176 ; real capture widths 360,390,430,768,1440,1920. Browser screenshot proved the initially all-italic visual was wrong, corrected by source changes; later visual revisions include green hue, continuous waveform, source-right smoke photo, offscreen animation pause, stronger spotlights. **Current final exact SHA/browser CI:** check newest workflow before claiming release. **Do not merge/deploy** without final exact-head green CI, owner visual approval, backup tag, rollback and production review. **Next rotation:** compare V170 final screenshots with model at 390/1440, fix real aesthetics and inspect Services/Events inner routes; preserve the original user reference as the design anchor, not a fabricated image pasted onto the website.


## V169 / 2026-11-16 — hero signal-console experiment
**Zone:** homepage hero only. V168 Chromium baseline https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43869742219/artifacts/14226674395 (390/1440). **Visual defect:** no visible production equipment identity and oversized empty mobile first fold. **Code:** ProductionHeroV168.tsx + home-v168-dark-live.css: original decorative 9-channel mixing-console schematic with SVG signal trace, CSS perspective, 900px mobile exclusion, reduced 390px empty space, lightOn/reduced-motion/Lite-aware signal animation. No packages/media, no change to services/films/CTA/form. **Current QA:** six-width screenshot workflow pending; aesthetic approval pending. **Matrix:** Home hero V169 source implemented/visual QA pending; next rotation /evenimente interior. No main/deploy.

## V168 / 2026-11-16 — Home redesign after explicit owner rejection of V166
**Component audited:** full homepage visual art direction; first user impression was the severity-1 defect. **Observed V166:** real screenshots https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43863078675/artifacts/14224501848, beige split photo/text and sales box; user explicitly rejects. **Implemented:** new V168 author-owned hero and independent CSS activated in `src/routes/index.tsx`: full real event photograph, dark immersive theatrical cover, expressive 'EVENIMENTE / DE NEUITAT.', no floating sales card, mobile full-cover gradient, retained scene selector/film/Light Desk, three asymmetric magazine chapters all 8 real service links, sage-colored 3-real-film proof, emerald final CTA. Link PR #168 https://github.com/WazzupDoc/green-sound-music-garden/pull/168. **Screenshots AFTER:** pending GitHub Actions; DO NOT pass as verified until matched Chromium captures for 390 and 1440. **QA:** TS/SSR/Vitest/gzip/6 viewports/contact/SEO pending exact-head. **Visual verdict:** owner approval pending (V166 rejected). **Dependency/security:** no new library or external asset; no automatic form send, site-public or main update.
**Audit matrix — global:** Home V168 draft unverified (priority P0); /evenimente /servicii interior visual review (P1, next rotation); /contact forms and prefill (P1); mobile sticky CTA (P1; currently hidden on homepage), /portofoliu media and original rights (P1), Studio/Despre/footer/iconography (P2), SEO/SSR/404/perf/reduced motion (P1 continuous). Rotate after screenshot QA, not after another decorative CSS adjustment.

## V166 / 2026-11-16 — Major full-homepage art direction rework (DRAFT)
Branch `design/v166-real-editorial-rebuild` built from V165, not default main. **Area audited:** Homepage full visual composition (one zone): hero, service rhythm, films and single finale considered together because the owner explicitly rejected the cumulative page aesthetic. Changes: independent stylesheet (not extra overrides on V160/V165), separate V166 hero component with original scene switching/Light Desk/video controls, route switch, mobile photo-first 900px, asymmetric media chapters covering eight first-party services, film archive and stronger contrast finale; new source contract test. All content images inherited from project; no new assets/deps/API/audio/autosend. Evidence: SOURCE CODE ONLY. Matched 390/1440 Chromium before/after screenshot, 360/430/768/1920 regressions, UI focus/ESC, Save-Data, TS/Vitest/SSR/gzip, exact-head CI NOT CONFIRMED. No main merge/deploy, no release claim. Owner says current site looks generic: visual approval remains critical. **Matrix:** Home visual=V166 draft unverified; Mobile sticky bar=V164 source only/unverified; Portfolio=V161 browser source verified, V163 focus source only; Events/Services/Contact/Studio/Footer/SEO/404=prior work retained, re-audit required. Next: get real V166 Chromium and fix visual clipping/layout issues, then Events interiors. PR and SHA to be recorded when available.

## V165 / 2026-11-16 — Photographic editorial hero composition (DRAFT, VISUAL QA PENDING)
PR #165 https://github.com/WazzupDoc/green-sound-music-garden/pull/165 ; branch `design/v165-home-photographic-editorial`; code HEAD `d376f2781a8bcb8d4f5670e86ecd4bc75a074f19`. Scope: homepage hero, based on V164. Replaced full-bleed dark photograph overlay with desktop right-side photo panel / left ivory typography, dark production-controls area; on mobile photo-first and ivory copy with adjusted contrast. Existing authorised project images, edition selector, film, Light Desk, service catalogue, 3 films and final CTA preserved. No new dependencies, media or backend. This is a substantial source CSS composition change, NOT a browser-verified improvement. REQUIRED BEFORE MERGE: matched real Chromium screenshots 390/1440, six widths, image crop/load, actual interaction states, reduced-motion/Lite, TS, SSR, Vitest, gzip, exact-head CI and owner visual review. No main/production changes. Next: validate visually and fix issues before rotating to Events interior.

## V164 / 2026-11-16 — Mobile contact bar compact navigation (DRAFT / QA PENDING)
PR #164 https://github.com/WazzupDoc/green-sound-music-garden/pull/164 ; source SHA `0093269f8f984f5845d2e47da4ff18ee17d5c96a`; branch `fix/v164-mobile-action-bar-compact`, stacked on V163. One zone: global mobile contact bar. `src/components/site/MobileActionBar.tsx` uses a labelled native navigation landmark and tighter vertical/icon spacing while retaining min-h-12 targets, existing safe-area padding, links, and focus states. This is a source-level improvement; overlap resolution and actual height delta NOT measured. Browser before/after screenshots 390/1440, 360/430/768/1920 regression, keyboard, Contact anchor, TypeScript, SSR, Vitest, gzip and exact-head CI NOT VERIFIED. No main/deploy. Next: actual browser measurement and persistent bar overlap fix; do not claim visual validation or merge.

## V163 / 2026-11-16 — Portfolio film keyboard focus (DRAFT / QA PENDING)
**Area:** /portofoliu, film filter and film selection keyboard affordance. **Code:** src/styles/portfolio-directors-cut-v161.css adds 3px high-contrast focus-visible outlines to film category filters and film rows, including forced-colors Highlight support; selected row gets an additional background on keyboard focus. No assets, packages, automatic sending, homepage changes or animation. **Baseline evidence:** V161 https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43841889878/artifacts/14213841423 ; **after screenshots:** NOT CAPTURED; browser and exact-head CI unverified. **Source commit:** 2cfb394a9de7828b9e41ec04c38dace4244f4542. **Next:** global sticky mobile contact action bar; inspect and address actual overlap in Chromium before adding more padding. Do not merge/deploy.

## V162 / 2026-11-16 — Portfolio mobile safe-area (DRAFT; QA NOT YET VERIFIED)
**Rotation:** /portofoliu mobile bottom conversion area and in-page anchor navigation. **Observed baseline:** V161 Chromium artifact https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43841889878/artifacts/14213841423 reports fixed contact action overlap at intermediate mobile scroll. **Change:** `src/styles/portfolio-directors-cut-v161.css` adds route-scoped 96px + `env(safe-area-inset-bottom)` trailing room under 768px and 88px scroll offsets for #portfolio-photos/#portfolio-films, to avoid obscuring final content and anchor headings. No packages, images, data, homepage widgets, or shared navigation changes. **Limitation:** this is a conservative mitigation, not a verified fix for mid-scroll fixed-bar overlap; actual mobile CTA component needs its own rotation. **Before:** V161 artifact above. **After:** pending new exact-head Chromium screenshots at 390/1440 and 360/430/768/1920. No claim of visual pass. **PR:** https://github.com/WazzupDoc/green-sound-music-garden/pull/162. **CI:** pending; do not merge. **Next:** shared mobile navigation/sticky CTA, inspect source and screenshots, remove obstruction rather than stacking more padding.

## V161 / 2026-11-16 — Portofoliu / Cinema editorial real, evidence-verified (DRAFT)
**ONE AREA:** `/portofoliu`. Baseline actual V160 browser screenshot at 390/1440: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43839890033/artifacts/14212193082 (`portfolio-current-390.png`, `portfolio-current-1440.png`, photo/film close-ups), screenshot QA-only commit `d8a782ae4125e0e6e200427b9b48497b9180b7a7`. The old page had a text-only dark introduction, horizontally-scrolling three-photo-at-a-time rail and a text-only film selection list; insufficient actual visual evidence. 
**Implemented:** `src/routes/portofoliu.tsx` now has independently authored photography-led split hero with an actual first-party concert shot, large typographic identity and native photo/film section anchors. New route-only SSR stylesheet `src/styles/portfolio-directors-cut-v161.css`: warm-paper six-image full atlas (one large/2 supporting/3 detail) instead of scroll strip, all existing filter modes and working deep-linked photo dialog retained; film archive as a selected real source player and six poster-backed rows rather than text-only playlist. `src/components/atelier/RegiaPortfolio.tsx` adds indexed contact-sheet overlay and source-backed film poster imgs from existing Video metadata. **Functional regression discovered by Chromium:** keyboard ArrowRight in lightbox was not reliably wired in a DOM-query effect; fixed at source by React `onKeyDown` on actual dialog, retains Home/End, previous/next, swipe, Escape and focus-return. No tests disabled or mocked. 
**PASS exact-source push CI `d0807a92684a2cecdfa465c827aa4a312fc94795`**: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43841889878 — TypeScript, SSR, bundle caps (home 113.6/190 KB gzip; quote 31.6/50 KB; shared CSS 52.0/52 KB), **39 Vitest suites/107 tests**, six real Chromium Portfolio widths (360/390/430/768/1440/1920), original media decode (six local photos and three project film posters), gallery filter, film category and URL, native keyboard lightbox ArrowRight/Escape, no external iframe until Play, other route SSR/Contact, sitemap. **After real Chromium evidence**: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43841889878/artifacts/14213841423 (`portfolio-current-390.png`, `portfolio-current-1440.png`, `portfolio-hero-390/1440.png`, `portfolio-photos-390/1440.png`, `portfolio-films-390/1440.png`). Real before/after photographed at IDENTICAL route/viewports, no mockup; code remains draft until owner approves.
**Trade-offs:** full-page screenshot height changed 1440: 4891→5872px; 390: 5834→6769px. Large photographic coverage intentionally increases scroll, should be reviewed by owner. Mobile fixed contact action bar overlays some content at an intermediate scroll position, **not fixed in this one-zone portfolio iteration**. External YouTube posters for other films remain pre-existing metadata paths; no invented clients, prices or brands. No new package/paid template/third-party video inserted. `main` and public website unchanged. 
| Component/route | Priority | Defect | V161 change | Proof | Next |
| --- | --- | --- | --- | --- | --- |
| /portofoliu intro | High aesthetic | Generic text-only first screen | Native large project concert photo + split editorial typography | Before/after 390/1440 above | Owner visual review |
| /portofoliu images | High conversion | Horizontal scroll hides authentic work | Six-image full editorial atlas + filter-aware layouts, true deep-link dialog | Six-width Chrome green | Revisit photo provenance and physical phone |
| /portofoliu films | High conversion | Titles alone, no visual index | Real film stills + selected player, category & sharable URL | Chrome green, no-autoplay iframe test | Field LCP & client review |
| Photo lightbox | High functional | ArrowRight race in effect after dialog mount | React dialog-key handler for arrows/Home/End; Escape/focus return | Browser green | Recheck physical touch |
| Mobile fixed CTA | Medium UX | Overlays content during scroll | Deferred, no change to shared nav | Visible in 390 screenshot | **Next priority** |
| Home / events / services / Contact / About / footer / SEO | Rotation | Existing functionality to preserve | Unchanged, CI retested | Source/CI | Continue matrix |

## V160 — VERIFIED CHROMIUM / 2026-11-16
**Code + documentary content source SHA:** `cedecf6e1f60c888b7b509f038e8a8cab4220612` on draft PR #160. **GREEN exact-source push CI:** https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43838469647 ; 38 Vitest suites / 104 tests passed, TS strict, SSR build, client gzip caps (home 113.6/190 kB, quote 31.6/50 kB, shared CSS 52.0/52 kB), six real Chromium widths 360/390/430/768/1440/1920, owned photo/video poster decode, real event image mode switches and event deep links, native keyboard modal Escape/focus, Light Desk and Lite/reduced motion, Contact SSR prefill and sitemap/internal-link page audits. **Before V159:** https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43833856279/artifacts/14209737691 (`show-wall-v90-hero-390.png`, `show-wall-v90-hero-1440.png`). **After V160:** https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43838469647/artifacts/14212445972 (`v160-hero-390.png`, `v160-hero-1440.png`, plus full-page and section snapshots at six widths). Actual baseline vs V160 before/after checked: paper-white old poster replaced by true photographic dark-emerald canvas; old giant title/collage/ticker CSS history no longer mounted; photo now dominates first screen mobile with corrected crop, real editorial production chapters and a newly legible 3-film index. **Screenshot findings:** Mobile sticky action bar still overlays some flow context at 390px during a static scroll snapshot; this is a remaining aesthetic/UX problem to audit, not hidden. Film poster and choice-list now readable. **Owner visual sign-off NOT obtained; no production CWV measures.** The baseline V159 rejected by owner; V160 is a new proposal until reviewed. Neither `main` nor the public domain changed. Next: /portofoliu full-site media handling and mobile sticky bar overlap if still observed.

## V160 — 2026-11-16 — REPLACEMENT homepage structure / owner rejection of V159
**Problem:** V159's white poster and layered style-history were repeatedly rejected by the owner. This is **not** another CSS overlay: `src/routes/index.tsx` now imports ONE `src/styles/home-direction-v160.css` only, replacing V86/V89/V158/V159 imports. `src/components/atelier/ProductionHeroV160.tsx` is independently authored semantic JSX (not old StageHero with style patches). It has one native first-party event photo with real mode switch (live/private/production), factual links, a click-only original film viewer, an owner-controlled Light Desk with Escape, reduced-motion/Lite/SSR support, and one Quote CTA. Four-section homepage contract remains hero, 3 full-width asymmetric editorial acts with all 8 direct service links, 3 owned film recordings, one final CTA. ProductionIndex, EditorialPortfolio, other routes and real business data remain intact. A new programme-style service CSS alternates image/text direction and the three video choices are a numbered editorial list, not a repeated card grid. No new packages, graphics, social video exports, fake services, team claims, events or booking APIs.

**Real visual baseline (V159):** https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43833856279/artifacts/14209737691 contains `editorial-home-390.png` / `editorial-home-1440.png`; V160 exact-width browser comparison and independent owner acceptance still required. Browser audit now tests V160's actual DOM, image decode, 6 widths, menu, scene, Light Desk, native film, footer and sitemap; source regressions updated for route replacement without disabling tests. Previous Chromium run V160 passed 6 widths but exposed dark mobile source-image crop and unreadable film choice layout; both corrected in V160 CSS. Last full exact-head CI after these fixes PENDING. 
| Zone | Severity | Source defect | V160 change | Evidence/status | Next |
| --- | --- | --- | --- | --- | --- |
| Homepage hero | Critical aesthetic | White V159 giant poster rejected; 4 CSS layers | Entirely new dark-emerald first-party cinema hero, one original event photo, real selectable scenes, no show-wall DOM | V160 screenshots and last QA pending | Compare mobile 390 + desktop 1440 with V159 |
| Home programme/services | High aesthetic | Repeated 3-card grid/card labels | Three asymmetric full-width documentary chapters with all 8 actual direct links | Source implemented, browser screenshot review in progress | Verify layout + contrast |
| Home films | High usability | Vertical squeezed video labels due old CSS dependency | Respecified 3 owner films as readable thumbnail/metadata list + actual click-to-play film | Browser-found defect addressed in source; recheck | Screenshot film archive 390/1440 |
| Home final CTA | Medium | Pale or irrelevant accent | One restrained sage invitation, working Contact link | Source + existing regression | Keep sole CTA |
| /contact | Follow-up | V157 signal path | Unchanged | V157 verified | Rotate next |
| /evenimente | Follow-up | V155 selection controls | Unchanged | Existing CI | Rotate next |
| /portofoliu | Next high | Real film/gallery presentation | Unchanged | Not audited in this run | Next rotation |
| Header/nav/footer | Follow-up | Existing native modal and action links | Unchanged | Retained in six-width browser suite | Mobile keyboard and desktop performance |
**Main/public greensoundmusic.com are not touched.** No unverified screenshots presented as completed.

## V159 VERIFIED SOURCE AUDIT / 2026-11-16
Visual source SHA `a8ed723358e879da5b5f79a3ed232a35817e3c73`, draft PR #159 https://github.com/WazzupDoc/green-sound-music-garden/pull/159. **GREEN exact-source GitHub CI** https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43833856279: TypeScript, SSR Vite production build, unchanged gzip budgets (client home 113.6/190KB, quote 31.6/50KB, shared CSS 52.0/52KB), **38 test files / 104 tests passed**, six real Chromium widths 360/390/430/768/1440/1920, native menu/focus/Escape, 3 service chapters/8 links, 3 real videos, real-image decode, original mode photograph switch, Lite/reduced motion, Contact hydration, sitemap/SEO/internal links. **REAL BEFORE** V158 same route/width Chrome screenshots `show-wall-v90-hero-390.png` and `show-wall-v90-hero-1440.png` in https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43830465643/artifacts/14207949179. **REAL AFTER** V159 same route/width Chrome screenshots + six-width full-page shots in https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43833856279/artifacts/14209737691. Actual browser comparison confirmed large art-direction change: bright poster + black giant title + one authentic show panorama, hidden card collage/ticker, dark services and light film-archive. Mobile title range-bound checks at all widths now pass. We diagnosed and FIXED (not muted) two real visual bugs found during Chromium: mobile title clipped due specificity; mobile low-contrast event-link. Also removed visible desktop generic scene card. Owner aesthetic approval is **NOT** recorded; screenshots show the design to evaluate, no promises of Awwwards award. Field real-user CWV not measured. Main, production domain, paid services unchanged. CSS 52.0/52kB cap is fragile. Next rotation: /portofoliu and overall navigation identity.

## V159 / 2026-11-16 — Poster-format home rebuild (DRAFT, source-only until Chromium)
Zone: **Homepage art direction / hero**, entire first screen; secondary color treatment keeps the four-act editorial rhythm. Baseline is real V158 at `0dd469e927646970ee1db4187f26101dd5b4d2c3`, with CI before screenshots https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43830465643/artifacts/14207949179 (`editorial-home-390.png`, `editorial-home-1440.png`). The user rejected V158 as a repeated AI template. Response: an intentional extreme formal change, not another green glow. New original `src/styles/home-cover-v159.css` SSR-inlined last on `src/routes/index.tsx`, a **paper-white large typographic event-production poster** with one genuine full-width event image starting below the headline and real copy/CTA over it; old show-wall collage and neon ticker removed from *visible* hero but retained in DOM/history for rollback; hero mode buttons now change actual original photographic source, native showreel and Light Desk remain. Act II switched to dark concert services (3 asymmetrical chapters, 8 real direct links); Act III to pale film archive (3 genuine film posters); Act IV to saturated emerald one-CTA finale. No fake customer media, copy, backend, purchased template, new dependency. Brand own logo/site content retained.
Reference principles from Vibration Production (Narrow Labs) and Creative Spirit (Awwwards), plus Webflow's description of Trenchwerk and 2026 typography practice; see RESEARCH.md; no code, images, or identity copied. QA requirements: execute TS, SSR, gzip, 38+ test suites, Chromium real full six widths / decoded images / footer & menu / Contact flow, compare EXACT same route/width screenshot from V158, inspect first-screen legibility and foot; mode change must replace actual photo. **This entry is a design draft, NOT proof of success.** Main, production domain, deployment unchanged. Next matrix after full browser validation: /portofoliu, then nav, Contact and page-detail redesigns.

## V158 VERIFIED VISUAL DIFF / 2026-11-16
Visual source SHA `5bc786b7fa6dca9d924d161939d5c8641aa640f9`. **GREEN exact-source push** https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43829913172 and **GREEN PR** https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43829920555 — TypeScript, SSR, gzip caps, 37 test files/101 Vitest assertions, actual 360/390/430/768/1440/1920 Chromium interaction/responsive QA, Contact SSR hydration, sitemap/internal links. Real after screenshots: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43829913172/artifacts/14208147526, files `editorial-home-390.png` and `editorial-home-1440.png`; real before V157 same route and viewports: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43823453178/artifacts/14205532328. **Visual difference verified** via actual comparison: dark all-over V157 to warm ivory editorial services, single panoramic hero instead of flying photo cards, dark cinema after pale services, a large pale finale instead of another dark green band. Desktop full-page heights measured screenshot V157 4593px → V158 6053px at 1440 width; mobile V157 6590px → V158 6811px at 390 width. **Tradeoff:** desktop scroll grew by 1460px for photographic breathing room; owner review should decide if this is desirable. Shared CSS remains 52.0 kB gzip/52 cap; homepage CSS is route-scoped, no global CSS increase. Existing 3 company photos, 8 service links, 3 film videos and Contact link verified; no new media. Remaining: Owner aesthetic approval, field CWV, physical iOS/Android. `main`/production unchanged. Next rotation: /portofoliu presentation + real media quality.

## V158 / 2026-11-16 — MAJOR homepage redesign, visual direction changed in code (DRAFT)
Branch `design/v158-home-editorial-overhaul` stacked on V157 `815d054f4d019ee70bc7af0f2a2f39f7dc41be68`. **ONE ZONE: entire four-part homepage art direction.** Source deficiency observed in V157 **real** 1440/390 screenshots: all-dark green sections; overlapping 3D-photo collage in hero; similarly shaped card/frames through services and films; repeated bright green UI bars, making major redesign invisible. Implemented original first-party CSS `src/styles/home-redesign-v158.css` loaded SSR-scoped last in `src/routes/index.tsx`; new 800px cinematic hero dominated by a single existing company photo and enormous unitalicised/serif display typography; 3 genuine stage photos become a compact editorial film strip with active-frame cue rather than 3 airborne cards; services become a full **warm-ivory magazine spread** with 3 strongly asymmetric chapters and all eight working links; films remain three genuine existing media with more space; final section uses a large sage contrast field, one Contact CTA only. Previous home components/interactive show selector, video player, links, motion gates, Lite, quotes, events, SEO, direct routes and all existing assets retained. Only first-party CSS; no dependency, media, pseudo-facts, new pages or publication.
Baseline browser screenshots `editorial-home-390.png`/`editorial-home-1440.png` from **V157 CI** https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43823453178/artifacts/14205532328 (actual base route at matching widths). V158 screenshots and exact-head QA must be recorded after GitHub Actions success; **do not claim validated yet**. Real Chromium browser verification script updated to assert measured hero, CSS color, film strip, focus, six widths, media decoding and active selection; no tests disabled. Source test `src/test/home-v158-redesign.test.ts` added.
| Zone | Defect observed | Prior evidence | V158 intervention | New proof | Risk / next |
| --- | --- | --- | --- | --- | --- |
| Homepage hero | Generic collaged 3D cards, old all-dark energy | V157 full-page 390 & 1440 | Single cinematic original event photo + compact 3-photo strip + bold typography | Pending CI screenshot same view | Check photo contrast, motion, LCP, mode switches |
| Homepage services | 3 green panels resembling earlier template | V157 editorial-home 390 & 1440 | Warm paper spread, asymmetrical left featured photo and right programme, all 8 links | Pending | Check text contrast and links |
| Homepage films | Dense dark card layout | V157 editorial-home | Open dark cinema layout, 3 genuine video posters | Pending | No autoplay and poster decode |
| Homepage finale | Earlier green band small arrow | V157 editorial-home | One expansive sage invitation and one CTA | Pending | Ensure no additional forms or CTAs |
| /contact | V157 signal path QA done | CI #43823453178 | Not changed | Existing | Later rotation |
| /evenimente | Existing selection controls | V155/V156 work | Not changed | Existing | Reverify |
| /portofoliu | Genuine media quality/layout | Not audited this run | Not changed | Pending | Next rotation |
`main`, production and public greensoundmusic.com not touched. No site public preview claimed.

## V157 visual + exact-source QA evidence / 2026-11-16
Source commit `5558b7d3692c8b3a9892b0c53bcc5b25d3125a4f` on draft PR #157: https://github.com/WazzupDoc/green-sound-music-garden/pull/157 . **PASS** CI https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43823017968 : TypeScript, SSR build, gzip entry 113.6/190 kB, QuoteForm 31.6/50 kB, shared CSS 52.0/52 kB (**at cap; next CSS change must remain within budget**), 36 suites / 98 Vitest tests, architecture, six-width Chromium regression and site audit. Browser proof artifact: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43823017968/artifacts/14204369475 containing real `v157-contact-intro-390.png` and `v157-contact-intro-1440.png`, captured in reduced-motion state. This proves the *after* Contact introduction, but no identical *before* V156 baseline captures exist, so before/after contrast is **NOT established**; full-motion Contact animation is not claimed. Corrected two stale browser assertions to reflect genuine `/contact#contact-form-title` destinations in footer and About; no browser test was disabled. Previous CI runs failed CSS budget and then stale assertions; final checked run green. Next: prior-version Contact baseline screenshot, owner visual verdict, real device check; rotate to portfolio/media. `main` / production untouched.
| Zone | Source SHA | 390 real | 1440 real | CI | Next |
| --- | --- | --- | --- | --- | --- |
| Contact hero signal path | 5558b7d | Captured in artifact 14204369475 | Captured in artifact 14204369475 | Green 43823017968 | Before V156 baseline + owner aesthetic review |
| Portfolio/gallery | Pending | Pending | Pending | Not audited in this iteration | Next rotation |

## V157 / 2026-11-16 — Contact editorial signal path (DRAFT)
Selected zone: Contact hero and guided-brief entry. Observed source deficiency: V25 static radial circles repeat the generic visual language; the contact introduction has no direct jump to the real form or clear no-auto-send journey. Implemented: three first-party typography-led signal lanes with actual step descriptions and a native hash CTA, clean production-grid backdrop, 390px width CSS and focus-visible/reduced-motion support. Visual change is intentional but **NOT browser-verified**; no real screenshots available. Does not add a form or alter homepage, backend, packages, business data or media. Source test `src/test/contact-signal-path.test.ts` created; not executed. Baseline head V156 `2ee98c2f5ca8855f01220305de6176ebac44ea71`; V157 current head must be read from GitHub. Blockers: Chromium before/after at 390+1440 and 360/430/768/1920 regression, CI exact-head, focus/anchor/SSR audit. `main` unchanged.
| Zone | Priority | Observed defect | V157 action | Before/after | Technical QA | Next |
| --- | --- | --- | --- | --- | --- | --- |
| /contact hero | High | Repeated circle motif; quote flow not directly linked | Editorial 3-step signal path + hash-to-form CTA | Not captured / not captured | Source assertion authored; all executed QA pending | Browser 390+1440 with keyboard and reduced motion |
| /evenimente controls | High | V153–V155 layout unverified | Unchanged this iteration | Not captured | CI/browser baseline unresolved | Recheck previous selection controls |
| /portofoliu | High | Authorised media quality and layout to audit | Not changed | Pending | Pending | Next rotation after Contact QA |
| Homepage | Fixed editorial contract | Avoid repeated cards/hero changes | Untouched | Historic artifacts only | Prior validated history; V157 no change | Preserve V48 editorial contract |

## 2026-11-16 — V156 CI unblock, no visual release
Zone: test infrastructure / not-found fallback regression. Evidence: V155 workflow https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43813721236 (TypeScript/build/budget passed; Vitest failure `ERR_INVALID_URL_SCHEME`). Action: resolve fallback component source from repository root rather than an import.meta URL that Vitest rewrites to a non-file scheme. No visual changes; screenshot before/after not applicable to this fix. V155 Events UI still requires real Chromium 390/1440 screenshots and six-width audit before release. Next rotation: Events real browser QA, then Contact. Main unchanged.

## V155 / 2026-11-16 — Events reset label mobile width
Zone: /evenimente. V154 flex-wrap does not guarantee a long reset button fits a 360px viewport; button now has min-w-0/max-w-full, whitespace wrapping, break-words and left-aligned text. Clear button also max-w-full. No new dependency/media/homepage/main. Browser screenshots, TS/SSR/Vitest/gzip and CI exact-head NOT VERIFIED; release blocked. Next: diagnose V153 Vitest failure and actual six-width browser QA; then Contact.

## V154 / 2026-11-16 — Events action layout
Zone: /evenimente selection controls. V153 reset/clear were inline with a fixed left margin on clear, risking awkward narrow layout. Grouped with flex-wrap and gap; no new assets/dependencies. Source regression test added. CI previous V153 exact-head failed at Vitest; V154 CI and real Chromium screenshots pending. Next: diagnose failing test and browser QA; then Contact. Main unchanged.

## V153 — 2026-11-16 / Events service selection
Zone: /evenimente EventSoundcheck. Added native `Golește selecția` control; disabled for empty selection, retains event and date/location, does not change homepage. Code SHA 1f04106fed7c4bf4af9390d38ecf7907e8f0bedf. QA BLOCKED: no Chromium before/after 390/1440, no six-width audit, no TS/Vitest/SSR/gzip or CI exact-head confirmation. Next: browser QA and test coverage, then Contact/SEO. No main/deployment.

## 2026-11-16 / V152 — fallback telephone affordance\nZone: 404/render error. Defect: phone number lacked an explicit call verb. Changed visible label to `Sună-ne: [număr]`, retaining the actual telephone destination. Test: source assertion added, not executed. Visual evidence: before/after 390/1440 unavailable; do not call validated. Next: browser QA, then /evenimente. Main untouched.\n\n## V151 / 2026-11-16 — Render-error Contact recovery (DRAFT)
Zone: error fallback. Added an explicit Contact form deep link only for render errors, with a named navigation landmark; Home, conditional Retry and telephone retained. Source regression guard added. No assets, dependencies or homepage changes. Real browser screenshots 390/1440, six-width QA, TS/SSR/Vitest/gzip and exact-head CI NOT VERIFIED. Next: real browser/HTTP 404 and error audit; then Events interior.

## V150 / 2026-11-16 — Generic render-error heading (DRAFT)
Area: error fallback only. A generic render exception is not necessarily a lost network connection; changed misleading heading to neutral `Pagina nu poate fi afișată.` Kept retry conditional, recovery links and existing image. Source regression test updated. Browser 390/1440 before/after, six widths, HTTP status, TS/SSR/Vitest/gzip and CI exact-head NOT VERIFIED. No homepage/main/deploy. Next: actual Chromium/HTTP audit, then Events interiors.

## V149 / 2026-11-15 — Error fallback truthful recovery copy (DRAFT)
Area: error fallback only. Source mismatch: V148 hides retry without onRetry, but instructions still said to retry. Copy now distinguishes recoverable and non-retryable errors, retains Home and telephone. Source regression assertion added. Browser before/after 390/1440, six-width QA, TS/SSR/Vitest/gzip and exact-head CI NOT VERIFIED. No visual approval, no main/deploy. Next: real browser 404/500, then Events interior.

## V148 / Error fallback action integrity (2026-11-15, DRAFT)
| Area | Source defect | Change | Browser 390/1440 | QA | Next |
|---|---|---|---|---|---|
| Error fallback | `onRetry` optional but button rendered unconditionally, creating an inert control when absent | Retry rendered only when callback exists; Home/phone remain available | NOT captured | Source regression assertion added; TS/SSR/Vitest/gzip/CI exact-head UNVERIFIED | Verify 404/500 browser and HTTP status, six widths |
No assets, packages, homepage or production changes. Main untouched.

## V147 / Footer external links (2026-11-15, DRAFT)
| Area | Defect | Change | Browser 390/1440 | QA | Next |
|---|---|---|---|---|---|
| Footer social navigation | Social links open new tabs without visual/screen-reader warning | Added visible ↗ cue and Romanian screen-reader text; retained noopener noreferrer and native anchors | NOT captured | Source regression test added; TypeScript/SSR/Vitest/gzip/CI exact-head NOT VERIFIED | Real Chromium and full-width footer review; then SEO/SSR |
No new dependencies, media, backend or homepage changes. Main untouched. PR stacked on V146.

## V146 / 404 recovery navigation (2026-11-15, DRAFT)
| Area | Observed defect | Change | Browser before/after | Test/CI | Next |
|---|---|---|---|---|---|
| Not-found recovery | Primary action redirected straight to Contact, no routes to browse offerings; sales copy obscured missing URL | Clear missing-page explanation; Services primary action; Events and direct Contact brief links, home and phone retained; error retry unchanged | NOT captured; visual approval blocked | Added Vitest source guard; execution/TS/SSR/gzip/CI exact-head NOT verified | Real-browser 390/1440 and six-width 404/500 audit, then SEO/SSR HTTP status check |
No homepage, new media/dependencies/backend, main or production change. Branch `fix/v146-not-found-recovery-navigation` stacked on V145.

## V145 / Mobile sticky conversion (2026-11-15, DRAFT)
| Area | Source defect | Change | Visual QA | Functional QA | Next |
|---|---|---|---|---|---|
| MobileActionBar | Quote action landed at top of Contact; keyboard focus had no explicit component focus style | Direct `#contact-form-title` link, focus-visible rings, 48px minimum targets, accessible labels | Real before/after 390/1440 unavailable; NOT validated | CI/TS/SSR/Vitest/keyboard not verified | Real mobile browser proof; next rotate SEO/404 |

## V141 / Events Soundcheck (2026-11-15, draft)
Area: `/evenimente` configurator. Users who change multiple services can now restore the event-specific recommended selection with one explicit, keyboard-accessible, 44px-minimum control. Disabled when already matching recommendations. Source commit `fa6ecf2c9c0001d0f2321b54b197d6e3f9f6412c`. Browser before/after 390/1440, six widths, TS/SSR/Vitest/gzip and exact-head CI NOT VERIFIED; no visual approval. Next: browser proof and Events responsive audit; then Studio. No main/deploy.

## V140 — Contact date field (2026-11-15, DRAFT)
Area: Contact form. Observed code issue: date optional in Zod schema but label did not indicate optional; native picker forced dark color scheme in light mode. Change: explicit optional label, contextual help linked through aria-describedby (also alongside error ID), theme-aware native picker. Source SHA `9bb9d99dafe4a53d4ebad2fcbfa520bd541fa713`; screenshots before/after: unavailable (no repository network in container); TypeScript, SSR, Vitest, gzip and exact-head CI unverified. No measured visual scores. Next area: Events interior UX after Contact QA. No main/deploy.

## V139 / Contact: privacy link separated from checkbox label; keyboard targets independent. PR #139; QA screenshots/CI pending. Next: Contact keyboard verification, then Events.

## V138 / 2026-11-15 — Portfolio gesture cancellation (DRAFT)
Area: photo dialog. Multi-finger and cancelled touch sequences no longer navigate photos; V137 horizontal-axis guard retained. Code SHA d41bffb16d8dff21bf9a7789402a71926c590241. QA NOT VERIFIED: browser screenshots, touch simulation, TS/SSR/Vitest/gzip/CI. Next rotation: Contact. Main unchanged.

## V137 / 2026-11-15 — Portfolio touch axis guard (DRAFT)
Area: `/portofoliu` photo dialog. Mobile swipe now requires horizontal displacement >55px and >1.5× vertical movement, avoiding accidental photo changes while scrolling. PR #137, code SHA `d4111f6e8ad3c6cf744cced7c3d6d27cd8db4022`. No new assets/dependencies. QA UNVERIFIED: Chromium before/after 390/1440, 360/430/768/1920, touch/keyboard, TypeScript, SSR, Vitest, gzip, exact-head CI. Main unchanged. Next: real-browser portfolio QA, then Contact.

## V136 / 2026-11-15 — Portfolio deep-link dialog focus origin (DRAFT)
Area: /portofoliu photo dialog. Corrected focus-return provenance: only a clicked thumbnail establishes an origin; a photo opened from a direct URL falls back to the gallery heading on close. Preserves arrow/Home/End navigation and original-thumbnail return. Source commit `cccb5656dbdbd018a9dd211ed7d4bf33c4d91e5f`. No new dependencies, assets, backend or homepage sections. QA UNVERIFIED: real Chromium 390/1440 before-after and all six widths, keyboard focus, TypeScript, SSR, Vitest, gzip and exact-head CI. Main untouched. Next: browser QA of photo modal and film archive, then Contact flow.

## V133 / 2026-11-15 — Portfolio film selection feedback
Area: /portofoliu film archive. Adds a visible, polite live status with the selected video title and its ordinal position in the filtered list. No autoplay, new media, dependency or backend. Code commit 741bf4cf0981d72b31c0ab24480948dbd0922af9. QA pending: Chromium before/after 390/1440 and six widths, keyboard, TypeScript, SSR, Vitest, gzip, CI exact-head. Next: film player and URL/category real-browser verification. Main untouched.

## V132 / 2026-11-15 — Contact invalid-submit focus
Single zone: Contact validation. On invalid submit, move focus to first invalid registered field, or first enabled service checkbox for Controller-managed service group. This improves error recovery without new UI, media, dependencies or backend. Source SHA a95249a0449a0dbde157b0d8847a736a9d206235. Browser keyboard verification, six widths, TS/SSR/Vitest/gzip, screenshot and CI exact-head pending. Main untouched. Next: portfolio film player browser audit.


## V131 / 2026-11-15 — Contact service fieldset accessibility
Area: Contact / Guided Event Brief. Source defect: service fieldset aria-describedby always included q-services-err although FieldError is absent before validation. Change: reference the error ID only when errors.services exists, while retaining permanent q-services-guide guidance. No layout, assets, packages, backend or homepage changes. Source commit 7283d479c3c85b27bd22d56c260caed22b308603. QA pending: browser DOM/keyboard, six widths, TypeScript/SSR/Vitest/gzip, CI exact-head and before/after screenshots. Next: portfolio film player actual browser audit. Main untouched.

## V130 / 2026-11-15 — Footer conversion handoff
| Area | Defect | Change | QA evidence | Next |
| Footer | Global primary CTA sent visitors to top of long Contact page | Native router hash targets SSR heading `#contact-form-title`; copy now describes preparing the brief rather than implying automatic messaging | Browser before/after 390/1440, six widths, TS/SSR/Vitest/gzip and exact-head CI pending; NOT visual-validated | Footer browser verification, then portfolio video playback |

## V129 / 2026-11-15 — About / production timeline
| Area | Priority | Observed source issue | Change | Visual evidence | QA | Next |
|---|---|---|---|---|---|---|
| /despre-noi | High | Uniform four-step rows; closing CTA lands atop Contact instead of brief | Asymmetric score-like production timeline, alternating editorial typography, contextual intro and form-anchor CTA | Before/after Chromium not available | TS, SSR, Vitest, six widths and CI exact-head pending | Browser screenshots 390/1440; then footer |

## V128 / 2026-11-15 — Events → Contact anchor handoff
Area: conversion handoff from /evenimente to Contact. The event-specific CTA already prefills the allowlisted event type, but native navigation previously landed at the top of a long Contact intro; visitors still needed to locate the form. Now each action targets `#contact-form-title` on the Contact page, a stable SSR-rendered heading (not the client-only form), with scroll margin and programmatic focus support. No auto-send, no new assets/dependencies, no homepage changes. Source code commits `ba29b70e5e7b8684945597fbd44479b41331fc37`, `daee7b68a2d015cc644138aa4d1cfaea6a5dcda7`. Browser screenshots before/after 390/1440, 6-width QA, TS/SSR/Vitest, exact-head CI pending. Next: verify anchor+prefill in real Chromium; rotate Studio/Despre.

## V127 / 2026-11-15 — Event index contextual CTA and visual focus cue
Area: /evenimente index, following V126. Implemented: descriptive event-specific accessible quote link name; focus on either editorial action also outlines associated photo, quote-action hover also subtly scales photo on pointer devices, mobile targets >=48/52px. No fake image link, no new media/dependencies, reduced-motion disables photo scaling. Visual screenshots before/after 390/1440, six-width Chromium, TS, SSR, Vitest, exact-head CI pending; do not merge/deploy. Next: browser QA and Contact prefill from every event; rotate Studio/Despre after verification.

## V126 — 2026-11-15 / Events index conversion action
Rotation: /evenimente index. Problem: each editorial event chapter offered only a details link; interested visitors had to scroll to a generic quote CTA, losing event context. Change: a distinct dark-green 48px direct `Cere ofertă` action per event, native URL-encoded prefill into existing /contact?event=... allowlisted form, alongside the existing detail link. Mobile action spans available width; keyboard outline and reduced motion included. No backend, new media or homepage changes. Source commits: 171fac192397284f6ef9234b9dda3f5aa3e18d74, 6fb06ee59c4bd43c0e0cb5c02edafdd008bf4076, 8c5f95c744e40f226c73e8b2e5bc6dea87cf5e37. QA: no browser screenshot or exact-head CI confirmed; draft only. Next rotation: /contact prefill browser regression, then Studio visual review.

## V125 — Portfolio photo lightbox respects category / 2026-11-15
Zone: /portofoliu photo gallery. Previously arrows/swipes/keyboard navigated all six images even when category filtering displayed only two. Now navigation, count, previous/next labels and keyboard stay within visible category. Deep-linked photo outside current filter falls back to All without hiding the selected image. Source commit `01643e6ea4d5c3e2b2e80cdbfc171bfc20905f35`. No new media/packages/backend. QA pending: real Chromium before/after 390/1440, all six widths, TS/SSR/Vitest, exact-head CI. Next rotation: Events visual and CTA audit. Main untouched.

## V124 — Portfolio film deep-link reconciliation / 2026-11-14
Zone: /portofoliu film archive. After V123, browser history/deep links can select a film outside the locally active category. Derive visibleCategory from URL film membership, keeping the player, list and aria-pressed consistent; avoid an effect that could race with filter click/router transition. Source SHA 0b5bdcaab12ee82cf79db477f590e0d24a8c7984. No media/dependencies/backend/main changes. Browser 390/1440 before-after, 6-width, TS, SSR, Vitest, CI exact-head still pending. Next: run actual browser and inspect screenshots before additional film UI changes.

## V123 — Portfolio film filter URL coherence / 2026-11-14
Zone: /portofoliu film archive. Prior behavior: changing a category could show a different video while the URL still pointed at the previous film; effect also reset filter to All whenever URL film changed. Now category selection synchronizes URL to the first matching film, preserves category during selection, and keeps playback click-initiated. No new media, dependencies, backend or homepage sections. Source commit ba1eaa7fc953450d419d319b8fe960e32564af6e. QA pending: TypeScript, SSR, Vitest, browser 390/1440 before-after, all six widths, keyboard/filter and exact-head CI. Next: actual browser verification of portfolio player, filter and deep links. Main untouched.

## V121 — Contact error description references / 2026-11-14
Area: Contact validation accessibility. Four inputs referenced error element IDs even before errors were rendered. Conditional aria-describedby fixes dangling relationships without changing layout or submission. PR #121, code commit f553e7fea53114e3308b2d14ccd3bafef4432bdd. No visual redesign claimed. Browser DOM/screenshots, six-width QA, TS/SSR/Vitest/gzip and exact-head CI pending. Next rotation: film/video controls. Main untouched.

## V103 — Contact preview focus / 2026-11-14
Area: Contact quote form. Before: after preparing quote or returning to edit, keyboard focus could be lost in replaced DOM. After: programmatic focus on preview heading, then return to name field. Draft PR #120, source commit 61ce9b0796a7d56a48c95471eee31834d857ae92. Browser screenshots and exact-head QA pending. Next: film filter/video playback accessibility. Main unchanged.

## V102 — Portfolio gallery focus (draft)
Zone: photo lightbox. Source defect: URL-driven close could leave focus without an explicit thumbnail fallback. Added onCloseAutoFocus to return to visible originating thumbnail, otherwise programmatic gallery heading. Source SHA ae2a4503ce3491e74d789fd1d36d59be18375309. Browser screenshots at 390/1440, keyboard/Escape, TS/SSR/Vitest/gzip and exact-head CI pending. Next: film filters and video state. Main untouched.

## V101 — Portfolio photo announcements / 2026-11-13
- Zone: photo lightbox. Accessible status now announces the active photo number/title; Previous/Next buttons name their actual destination photo. No new packages, assets or homepage changes. Browser before/after and exact-head CI pending. Next: gallery focus restoration and filters. Main unchanged.

## V100 — Portfolio lightbox keyboard scope / 2026-11-13
- Zone: /portofoliu photo dialog. Source audit found document-wide ArrowLeft/ArrowRight listener active while the photo dialog was open; it could intercept keys in unrelated controls. Scoped listener to .rs-photo-dialog, excluded modified keys and editable controls. No assets, dependencies, backend or homepage changes.
- Browser before/after 390/1440, six widths, Escape, keyboard and CI exact-head pending; do not claim visual verification. Next: photo filter / dialog return focus and real media audit. Main untouched.

## V99 / event quote anchor accessibility — 2026-11-13
- Single zone: event detail CTA to the shared QuoteSection heading. V98 added a fragment link but heading was not programmatically focusable and lacked its own scroll offset for sticky navigation.
- Shared heading now has tabIndex=-1, scroll-mt-24 and visible focus outline. This permits fragment navigation to move keyboard focus to the heading and makes its position clearer. The same QuoteSection is used elsewhere; regression needed across all routes.
- No external dependency, media, fabricated event, new backend or homepage changes. CI and real Chromium 390/1440 before/after not obtained; **visual and accessibility validation pending**.
- Next: verify actual browser focus and screenshots, then portfolio/film gallery rotation. Main untouched.


## V97 / Contact clipboard retry — 2026-11-13
- V96 exact-head 4aca905b94e42ca2d432253ae3bfa06c10e026d2: GitHub Actions run 43458490804 completed success; artifact 14054593562 exists, visual contents not inspected.
- Single area: Contact copy fallback, retry path. Source defect: after first denied copy, state remains `failed`, so repeated denied attempts did not retrigger focus/selection effect. V97 increments failedCopyAttempts on each denial and reselects textarea for keyboard copy. No new assets/dependencies, no automatic message transmission. CI/screenshots V97 pending. Next rotation: event detail pages. Main untouched.

## V95 / About route — 2026-11-13
- Rotation zone: `/despre-noi` (there is NO `/studio` route; studio is a service page). V94 PR #93 SHA 2a262984 had workflow success #43448478890. PR #19 mergeable=false. Branch design/v95-about-production-notes stacked on V94; main unchanged.
- Before: generic PageHero and three familiar content blocks. After source: dark-emerald large editorial photo/title hero, mint rail, light paper-like factual statement, numbered production process and authentic photographic contact closure. Existing factual business data, SEO, canonical, process, real images and links kept. No new dependencies or fake content.
- Browser screenshots 390/1440 BEFORE/AFTER and six widths not yet obtained. Do not call aesthetic validated; CI exact-head pending. Next rotation: individual event detail pages, then studio service and SEO/perf.

## V94 — 2026-11-13 / navigation and mobile menu
- Base: V93 PR #92 SHA 0893427, exact-head CI runs 43439791132/43439816063 green. V92 Contact PR #91 exact-head green SHA 2e72554; V92 service PR #90 exact-head green SHA 32f9b2c. Sibling branches not combined. PR #19 mergeable=false.
- Selected single zone: global SiteHeader native modal. Real defect: after clicking a route the dialog close callback always returned focus to the now-inappropriate hamburger; old visual was black six-row directory with a faint stage wireframe. Implemented original green production-cue editorial nav, full-row interaction, responsive selected-route cue and conditional focus restoration (Escape/close restores; route navigation does not). Existing native dialog, Finder, keyboard shortcuts, actual six routes and Contact links preserved.
- Browser screenshots requested V94 390/1440 open and focused state, six-width regressions; pending CI and visual inspection. No external package/media or deployment. Next: Studio route, then Despre, gallery, SEO/perf. Matrix: navigation V94 in QA; footer V93 validated CI, aesthetic pending owner; Contact V92 validated CI; services V92 validated CI; events next after Studio.

## V93 / Footer rotation — 2026-11-13
- Source base: V91 e8e3296 (CI previously green); V92 Contact PR #91 and Service PR #90 were still in progress and are separate sibling branches, not blindly combined. PR #19 mergeable=false.
- Footer: original enormous GREEN SOUND / MUSIC editorial typographic closure, practical direct Contact CTA, preserved existing event/service/social/privacy links, LightDesk and actual phone/email. Source: SiteFooter.tsx, footer-editorial-v93.css, footer test, browser 6 widths. No external asset, package, music, fake event or autoplay.
- Visual QA gate: same viewport before/after 390/1440 pending screenshot comparison; no visual approval without actual artifact and review. Next rotation: navigation/mobile keyboard and inner Studio.

## 2026-11-13 V91 — /servicii editorial directory (PR #89)
- Rotation: /servicii index only, based on V90 PR #88 branch (V90 exact-head CI not confirmed). New asymmetric alternating Music/Technology/People group composition, oversize titles, per-service index, counts, keyboard focus, mobile one-column, reduced-motion. Existing 8 direct service routes and homepage unchanged.
- Code: src/routes/servicii.tsx, src/styles/service-index-editorial-v91.css. Source authored, no third-party assets or dependency. No proof yet of browser aesthetics, CSS computed result, 390/1440 screenshot before/after, six-width regression, TS/SSR/Vitest or exact-head CI; **do not merge/publish**.
- Research: Awwwards music-sound directory https://www.awwwards.com/websites/music-sound/ (editorial hierarchy only), Webflow music examples https://webflow.com/made-in-webflow/popular?search=music (asymmetric storytelling only); no copied code or visual assets. MDN prefers-reduced-motion https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion. Reject 3 equal cards, autoplay, fake media and third-party libraries.
- Next audit: /servicii detail pages, then Contact funnel, navigation, events, gallery, footer and SEO. Validate current PR CI, same-viewport screenshots, and accessibility first.

---

## 2026-11-13 V90 / SHOW WALL VISIBLE DIFFERENCE EXPERIMENT
- Owner says **all former designs look identical** despite many versions: same static purple live photo, one weak wave and 2–3 green beam effects, no recognizable motion/3D. Actual V89 hero Chromium screenshot confirms visual criticism. Do not treat test/SEO/doc-only changes as redesign.
- Current base V89 PR #86 SHA `a0e6c3f6e0245f27e9ee0c6ef6d47f1ee75b1f07` with exact-head green CI #43425095295, screenshot artifact #14037051076. V90 draft PR #88 branch `design/v90-kinetic-3d-live-show-wall` implemented NEW JSX + original scoped CSS.
- Rotation matrix snapshot: Hero V90 — **actual visual redesign submitted, exact-head CI/screenshots not yet confirmed**, defects before: static dark image + negligible ambient effect, after: 3D montage using three real local media, kinetic lime ticker across masthead, mode selection reshuffles photographs, Light Desk tone/on-off physically changes media effect; next: audit *mobile visual feedback and image resolution*; Services V89 — done earlier, owner aesthetic approval pending; Film V87 — tested; Events V88 — tested; Contact, inner service pages, footer, privacy, SSR, perf — still audit rotation due.
- Authored proof: `show-wall-v90.css` perspective + 3D transform keyframes + no reduced/Lite/background animation; `KineticShowWall.tsx` 3 actual source-owned photos, decorative and aria-hidden, no autoplay audio/video. On mobile only one image visible, no moving heavy 3D. Reuses scene controls and LIGHT DESK with new effect (not a dead switch).
- AUDIT BEFORE/AFTER REQUIREMENT: capture *same 1440 and 390* old V89 browser vs V90; produce 2 frames in full motion, 1 toggled Private stage, 1 Lite; if effect invisible or lower quality, adjust, don't say 'success' because CI. Notably no logo/font/media licensing changes.
- No merging main, no auto-publication, backup Git tag or verified rollback completed. PR #19 conflicts need separate attention.

---

## V89 / 2026-11-13 — DESIGN LEVEL CORRECTION (OWNER REFERENCE)

- Owner has rejected repeated small V83–V88 changes as nothing like their chosen mockup. V87 actual Chromium 1440 full-page `signature-v86-home-1440.png` shows long dark first screen, generic typography, oversized dark CTA, separated services. **Don't declare success based only on CI or version number.**
- Latest checked validated ancestor V88 PR #84 branch `design/v88-event-editorial-index` SHA `1e1feb930cdb295d73ff7b4e5d4a523bd5f9b5b7`: CI green on push #43421917849 + PR #43421933450. V89 branch `design/v89-live-event-premium-homepage` created from it. V48 clean homepage contract preserved (hero, 3 chapters/8 services, 3 genuine films, 1 final CTA).
- Component ROTATION: HOME COMPOSITION / actual structural art direction V89; PORTFOLIO source-backed film contact-sheet V87; EVENT DIRECTORY V88; NEXT after visual approval/audit: inner service details, Contact conversion, mobile/nav, footer and performance bundle consolidation.
- V89 directly implements visual reference principles: large italic uppercase event headline, dominant existing live show photograph, sound-reactive **style-only original signal** (not fake live audio), reduced vertical dead zones, compact asymmetric photographic 3-chapter catalogue, video evidence and dark final CTA. No fabricated equipment or people, no TikTok stills, no new dependency.
- Screenshots: first Chromium candidate obtained via GitHub artifact of app SHA prior to final screenshot correction; inspected full page 1440/390 and refined to remove oversized right-hand template box and brighten legitimate stage photo on mobile. New exact-head screenshot/artifact **pending**. Report both improvements and limitations, never claim parity with mockup if not visually confirmed.
- Functional audit: Light Desk, scene selector, three film choices, Contact link, 8 direct service destinations, 6 viewport sizes, modal Escape/focus, SSR/SEO remain mandatory.
- Main/prod untouched. PR #19 conflict separate; deploy/tag/rollback publication gate still blocks merge.

---

## 2026-11-13 — V88 event directory / DRAFT NOT YET BROWSER VALIDATED
- Latest source baseline V87 PR #83 b517c6e62c21b0366caf500b4f4cf5d16b42ebf8, exact-head push 43421372923 and PR 43421379048 reported successful; V87 screenshot artifact 14033568505.
- ROTATION: HERO/SERVICES V86 validated; FILMS V87 validated; EVENTS INDEX V88 implemented (asymmetric editorial numbered programme, native detail links, no new media/deps); NEXT individual event details / Contact conversion.
- V88 evidence: source diff and Vitest source contract added; browser 390/1440 BEFORE/AFTER not yet obtained; six widths, CI exact-head and actual screenshot must be checked before visual approval. Main and production untouched.
- Global matrix pending: /evenimente index V88 code pending QA; /evenimente/$slug next; /contact and Guided Event Brief pending; /servicii and detail pages pending; Studio, Despre, footer, mobile keyboard, Lite, SSR/SEO, privacy and deploy gate pending.
- Experiment: original event programme numbering and asymmetric photography. Rejected adding fake events, background video/autoplay, external packages and stock. No claimed visual acceptance.

---
## 2026-11-13 — V87 film proof rather than text-only list
- Last validated homepage design V86, PR #82 source cfa8a245b54b4d65caa8ad1d2fc62a9c0846e5b3: real poster/source photos, left-large/two-right service layout, original wave, 390px hero reduced from 1015px to 764px, CI green on push #43419886703 and PR #43419894739. Owner acceptance still pending.
- Component ROTATION: HERO+SERVICE editorial V86 / real screenshots, CI green; FILMS V87 / implemented and app-source verified, see PR #83 and artifact #14033568505; NEXT: event discovery and individual service pages (photographic identity, real form links, no fake availability), then Contact/brief/FAQ, footer, accessibility, privacy and SEO.
- V87 changes actual visible film navigation into a photographic contact sheet of 3 locally owned video posters; clicked selection stays controlled, no autoplay or fake additional project cards, keyboard focus visible, responsive to 390/1440. Browser asserts three local naturalWidth>0 and records real screenshot.
- Candidate release still draft; do not alter main unless exact-head CI, auto-deploy config, backup Git tag, rollback and explicit publication approval when deploy automatic. No new cost/media rights.

---

## 2026-11-13 — V86 significant visual overhaul, QA gates
- Draft PR #82: https://github.com/WazzupDoc/green-sound-music-garden/pull/82, based on validated V85 SHA 4bf044079f41de251b6d8ced1c8f636f69374f12.
- Owner feedback: V83-V85 did not meet visual expectations; actual V85 screenshot was too dark, with giant synthetic desk and three similar columns. V86 removes dead cosmetics, uses one SSR scoped stylesheet, genuine first-party stage imagery and an original branded waveform. Hero leads directly to contact rather than vague browsing.
- Service visual hierarchy: one lead chapter on left spanning two rows, two compact right-hand subchapters, all 8 links and photos intact. Removed fake V83 sound meters/routing ornaments from runtime. No extra homepage sections.
- Confirmed first real browser run on V86 app SHA db92e4609b265dfd1fd6058c9d0ebcef36108694: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43418750372 ; screenshots artifact #14033232086. 1440px hero shows visible stage photo + original signal; mobile 390 hero too tall: CSS and Chromium guard added in subsequent commits, pending final CI.
- Full rotation state: HERO/SERVICES V86 substantial structural work, full screenshot review and final mobile QA PENDING; PORTFOLIO next for film poster/selection experience; NAV previous V81; inner service/event routes, Contact validation, footer, content/local SEO, performance/security yet to audit in rotation. Do not claim site finished.
- Main/production unchanged due release gates; no verified backup tag/rollback or auto-deploy mapping. Hourly automation existing; do not duplicate it.

---

## V85 — USER-PROVIDED PREMIUM REFERENCE / REBUILT FIRST SCREEN (2026-11-13)

- Critical owner feedback: mockup was a dark emerald, concert-and-production-equipment first page with large but controlled headline, photographic service units and intense genuine stage lighting. Previous V83 was effectively unchanged to the owner; V84 had altered layout but 1440 screenshot still over-dark and generic. Do **not** say tiny UI changes achieved this reference.
- Concrete redesign (branch `design/v85-production-console-reference-rebuild`, draft PR #81): original crafted vector console (ten faders, signal chain, small screens), brighter genuine existing stage Green Sound media and main crowd image composite, first screen «Sunet. Lumină. Emoție.», repositioned small stage monitor, brand-aligned green call-to-action, new photographic trapezoid service strip with 3 unequal widths/heights, and 8 direct service links. On mobile synthetic equipment hidden while actual event photos remain; no TikTok source imagery or claimed event footage generated.
- Original vector = ART, not actual equipment or real-time audio meter. Motion only on hover/no reduced/Lite; image request adds one locally existing reused first-party photo at desktop; verify LCP, performance, size and decoding. No dependencies/new scripts. Scope CSS to homepage SSR only.
- Component rotation: HERO + editorial service structure V85 (under exact-head verification); NAV V81 (green previous); films = NEXT (poster, film UX), then event discovery, service detail pages, Contact, Studio, footer, responsive, SEO and accessibility. Avoid circling back to hero repeatedly except if screenshot real defect.
- Real comparison evidence: V84 push run #43412440606 artifact 14030745424. V85 browser CI 390/1440 and 6 widths with exact SHA must be checked, screenshot source must come from rendered app, not image-generation mockup. Mark any incomplete tests clearly.
- Permission boundary: main/production remain untouched; separate deployment approval if push to main deploys, and validated backup tag+rollback needed. PR #19 conflicts were confirmed. Release readiness not asserted.

---

## V83 — actual CI / screenshot checkpoint 2026-11-13
- Source `fd604c60630f9498555145805c07b250666a8d2e`, PR #78 `design/v83-signal-ledger-editorial-services` stacked onto V82 #77: both [push CI 43409515536](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43409515536) and [PR CI 43409522734](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43409522734) **GREEN**. 70 tests/25 suites, SSR TS, 51.3 kB/52 cap CSS, six-width Chromium, all three local service photos decode, direct service links, 20 SEO page audit, Contact SSR.
- Browser proof: [artifact 14029615502](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43409515536/artifacts/14029615502). 1440 and 390 service captures actually show photo+overlay; added scoped engraving and pulse feedback. Limitations: initial V81 screenshot did not lazy-load all photos; comparison not identical loaded state. Physical phone test and owner aesthetic acceptance pending.
- NEXT ROTATION: EditorialPortfolio real-film media poster, choice UX, clear click-to-play, distinguish synthetic design from original company footage. Main and production unchanged (release safety gates).

---

## V83 — SIGNAL LEDGER / branded services editorial (2026-11-13)
- Verified latest PRs V82 #77 head `81d1dee8...` (exact-head CI 43406429295 FAILED: 1 outdated production-index.photo-motion assertion; 67/68 tests passed), V81 #76 prior real CI success 43399390064. PR #19 remains conflicting. **Component rotation: services / editorial programme**; next **portfolio / real film playback**, then events/contact.
- Baseline screenshot: [V81 artifact 14024876141](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43399390064/artifacts/14024876141) contains services photographed with incomplete lazy loading in screenshot; screenshot can be misleading and is not a proper before-state for media, cannot claim same-state before/after.
- Source improvement on V83 `design/v83-signal-ledger-editorial-services`: three unique static signal engravings inspired by original brand/audio-console motifs, distinctive channel bars with lightweight hover/keyboard-focus pulse, exact direct links unchanged, no media from TikTok or invented stages. Tiny CSS component-scoped via `?inline` to protect 52kB global CSS cap. Browser QA explicitly loads/decodes 3 local existing photos and fails for broken resources, verifies full-motion focus and Lite disable, captures extra service 1440/390 crops. V82 stale test updated, additional V83 guards.
- Audit matrix status: HERO V78–V80 / code+CI reviewed; NAV V81 / green CI+actual screenshots; SERVICES V83 / implemented, CI/screenshots pending; FILMS next; EVENTS pending; CONTACT pending; INNER PAGES pending; FOOTER pending; SEO 20-page CI contract prior green; ACCESSIBILITY Lite/reduced gates pending latest CI; SECURITY/DEPLOY main blocked pending release controls.
- TESTUL DE ADĂUGARE: distinctiveness = Green Sound audio-channel design, not generic cards; user utility = visual hierarchy + clear focus path; cost/license = zero external media/deps; SSR = component style inline; motion = only 2 cycles on hover/focus, Lite/reduced suppressed; rollback = revert V83 PR. Claim no performance score before measurement.

---

## V81 ACTUAL QUALITY GATE — verified 2026-11-13
- At original application-source HEAD `98dacdb0686d76e3943afcb49f646b8578cf6eb5`, GitHub Actions [run #43399390064](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43399390064) **SUCCESS**: strict TypeScript, SSR/Vite build, architecture, 24 suites/68 Vitest tests, six-width Chromium audit, dialog focus + Escape, full-motion and Lite state tests, Contact direct SSR, sitemap/route audit. Measured gzip: homepage 110.9/190 kB, quote 31.2/50 kB, shared stylesheet 51.3/52 kB.
- [Actual browser artifact](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43399390064/artifacts/14024876141) contains 12 screenshots: six homepage widths, four open-menu widths, one 390 active entrance, one 390 Lite. Visually inspected 360/390/768 open menu: editorial layout clear and content readable, no visible clipping. A **same-state BEFORE screenshot V80 with the menu open was not collected**, so no genuine before/after pairing can be asserted. Full-motion screenshot shows animation-in-progress; browser computed animation tests passed. Physical iOS/Android and user acceptance unverified.
- Root cause/resolution documented: initial source-run CSS 52.6/52 cap FAILED, first trim 52.4/52 FAILED; component-scoped CSS SSR import reduced shared to 51.3/52 without raising cap. No new external code/assets.
- **Next rotation:** editorial services and real photo visibility (home screenshot shows very dark/unfilled stage and people image blocks); maintain 3 chapters, 8 links, one final CTA. Main/production untouched. A docs-only HEAD after this entry needs its own exact-head CI before release.

# V81 — Hour 02 STAGE INDEX navigation (2026-11-13)

- Inspected latest relevant source V80 PR #75 / SHA `88f574590c28f28adf3cabddcdfaf12314d809cb`, V79 PR #73; `docs/CURRENT_DEVELOPMENT_VERSION.md`, existing SiteHeader, two legacy CSS sheets, performance Lite, V76 browser script. PR #19 remains **mergeable=false**.
- **Single area changed:** global header/mobile navigation. Previously mobile popup was an absolute positioned `motion.div role=dialog aria-modal=true` with manual focus trap; background was not inert and full-screen stage hierarchy lacked distinctiveness. New `<dialog>` uses native showModal/close/cancel, Escape, native focus containment and focus restoration. Added full-screen **STAGE INDEX** with original SVG set piece, numbered asymmetric six-link running order, clear Contact/call/WhatsApp choices inside nav. Existing desktop header, Finder, route destinations and home composition retained.
- Files changed: `src/components/site/SiteHeader.tsx`; new `src/styles/navigation-v81.css` Vite `?inline` rendered in SiteHeader SSR; removed attempted global `src/styles.css` import after measured CSS budget failure; removal of dormant menu selectors from `src/styles/atelier.css` and `src/styles/regia-serii-final.css`; new `src/components/site/site-header-stage-index.test.ts`; `.github/scripts/verify-crafted-browser.cjs` new modal + animation / Lite checks and screenshots; `RESEARCH.md`, `ASSETS.md`, version docs, this journal.
- Research: professional Webflow fullscreen navigation, Awwwards Neutra VDL editorial index, native MDN dialog guidance; all original implementation, no new dependency or external asset.
- **Initial V81 CI:** strict TypeScript + SSR build passed but global CSS was 52.6 kB (after first trim 52.4) vs 52 kB cap; Vitest/browser skipped. Implemented component-scoped SSR CSS to preserve quality gates. **Validation currently pending for new head:** V81 exact-head TypeScript, SSR build, Vitest, gzip and Playwright; real browser 390 & 1440 before/after screenshots not yet available and do not claim visual approval. Browser capture code now records `stage-index-open-360/390/430/768.png`, `stage-index-motion-390.png`, `stage-index-lite-390.png` if workflow passes. Baseline V80 lacked open-menu screenshots. Motion test checks active CSS and Lite computed styles; reduced-motion fixed test browser state.
- **Component rotation matrix:** Hero V80 implemented, visual screenshot gate pending; navigation V81 implemented draft, CI and visual gate pending; editorial services **NEXT** (3 chapters, 8 links, photo clarity); films/gallery next (actual video poster HTTP/visibility), then event and service routes, Contact Guided Event Brief, Studio, About, footer/buttons, assets/icons/responsive, SEO/SSR/404/security in rotation. No area is marked approved solely because tests exist.
- Rollback: revert V81 branch commits, retain V80 draft; no changes to main, domain, external services, production.
- Next iteration priority: inspect V81 exact-head GitHub Actions and screenshots, fix any genuine failure, then proceed to editorial service programme; do not add a new homepage component.

---

# V80 — Hour 01 hero implementation (2026-11-13)

- Branch: `design/crafted-atmospheres-v80-stage-depth-accessibility`, stacked on PR #74 (docs) / V79 PR #73. Single zone: homepage StageHero, no duplicate hero and no new homepage sections.
- Changed `src/styles/stage-v79.css`: physical stage-wing shadow, perspective contrast, localized footlight and mobile/Lite/reduced-motion fallbacks. Original CSS, no dependency, image or network request. Intended visible difference: architectural depth rather than another standalone glowing beam. **Not yet visually verified by browser captures**.
- Changed `src/components/atelier/stage-v78.visual-integrity.test.ts`: repaired obsolete literal className assertion while still requiring semantic V78 class and explicit V79 class; no test removed.
- Updated `RESEARCH.md` with Webflow and MDN guidance. `ASSETS.md` unchanged because no external assets were added.
- Exact-head TypeScript, SSR, Vitest, gzip and Chromium 360/390/430/768/1440/1920 are **pending GitHub Actions**. Before screenshots/CI, do not claim green or Awwwards quality. Old V79 CI failed 63/64 unit tests; browser skipped.
- Next action: inspect GitHub Actions at new SHA; fix failures, capture **real** before/after at 390 and 1440 (all six widths for regression), evaluate stage visual composition; if weak, iterate. Once hero validated, next distinct zone is navigation/mobile menu. No main merge or production publish.

---

# AUTONOMOUS DESIGN ENGINE — 3-SPRINT BOOTSTRAP (2026-11-13)

> Planning-only initialization. Preserve the complete historical journal below. No component code, screenshot or CI approval is claimed by this update.

## Confirmed baseline, not assumptions

- Repository: `WazzupDoc/green-sound-music-garden`; current editorial stack latest inspected: **V79** `design/crafted-atmospheres-v79-kinetic-stage-depth`, draft **PR #73**, head `fc1957dd24a7a1dc244d49a70c301040fcb81c4b`; stacked over **V78** PR #72, exact-head `c9c936e9cdaeca28c86162e9010bebe03441054b`.
- V79 stage geometry exists and is imported from `src/styles.css`; it is NOT yet visually approved. The prior standalone `HeroCinematic.tsx` chat proposal has **not** been integrated; maintain existing real `StageHero.tsx` instead of creating a duplicate hero.
- **V79 CI FAILS** at exact-head: [GitHub Actions #43389905448](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43389905448). TypeScript strict check, SSR build and bundle budget passed; Vitest: **63 passed / 1 failed (64 total)**, in `src/components/atelier/stage-v78.visual-integrity.test.ts`. That source assertion requires the literal `className="crafted-hero gs-stage-v78"`, but the actual V79 class list also contains `gs-stage-v79`. Repair the brittle expectation **without disabling the semantic assertion or test**. Browser six-width, real-image and visual tests did not execute in this failed workflow. Do not claim production readiness.
- Existing home composition is locked: **hero → 3 editorial chapters / 8 service links → 3 real films → ONE final CTA**. No new sections/forms/finder on the homepage; preserve dedicated functionality on `/contact`, `/servicii` and `/evenimente`.
- Main/production unchanged. No merge, auto-publish, extra paid service, external API, unauthorized media, forced push or history rewrite. Confirm deployment effects, backup-tag capability, rollback and exact-head CI before any release; separate approval if main deploys production.

## First three virtual hours — one component/zone per execution

| Hour | One area | Visible or functional deliverable | Verification and gate |
| --- | --- | --- | --- |
| **01 — Hero / kinetic stage** | `src/components/atelier/StageHero.tsx`, `src/styles/stage-v79.css` | Audit screenshots and visibly refine the existing V79 stage architecture: convincing optical depth / light-cone focal point that frames rather than obscures the genuine concert photo and headline. Fix stale V78 source test as a prerequisite; no parallel `HeroCinematic` import and no extra homepage CTA. | First confirm V79 CI test failure; repair without weakening checks. Capture same-page before/after at 360/390/430/768/1440/1920. Confirm actual CSS, active motion, text contrast, touch/no-hover, Lite/Save-Data, reduced motion, browser keyboard/focus and image loading. TypeScript, SSR, Vitest, gzip, exact-head CI. **Status: not started**. |
| **02 — Navigation + mobile menu** | Existing navigation component(s), located by source inspection at sprint start | One distinctive but practical stage-curtain navigation treatment; readable hierarchy, a genuine mobile-menu focus path, Escape to close and focus restoration. Preserve semantic links and no scroll hijacking. No extra homepage section. | Six widths; real keyboard Tab/Shift+Tab/Escape; touch target, color contrast, SSR/hydration, Lite/reduced-motion and pointer tests; source tests, build, exact-head CI, screenshot before/after. **Status: queued after Hour 01 gate**. |
| **03 — Editorial services index** | `src/components/atelier/ProductionIndex.tsx`, `src/styles/production-index.css` | Refine the asymmetric editorial treatment across three chapters and eight **direct working links** with original typographic rhythm/linework. Do not replace it with three symmetric cards or duplicate the homepage CTA. | Audit route fidelity, focus, legibility, perceived whitespace, mobile and desktop screenshot difference; avoid CLS/jank; verify two-service → Contact handoff where relevant, SSR, SEO anchors, Vitest/build/CI. **Status: queued**. |

## Quality rules for every sprint

1. At start: read `AGENT_STATE.md`, `docs/CURRENT_DEVELOPMENT_VERSION.md`, latest branches/PRs/commits/CI and the **actual current source**. Work from latest relevant validated lineage, not assumed version numbers. Preserve historical journal.
2. Find one genuine aesthetic/UX defect; research >=2 suitable current professional references (Awwwards, Webflow, Godly, FWA) plus official MDN/web.dev guidance where relevant. Record date, URL, observation, technique adapted, license if importing code, rejected variants in `RESEARCH.md`. Prefer original implementation, not copying identity/code.
3. Only one signature experiment per component. Original SVG/CSS and existing licensed packages before dependency additions. For any new dependency record bundle impact, verified permissive license, and no-dependency alternative. Real Green Sound event content must be owner-verified; Unsplash/stock/AI is NEVER represented as Green Sound's real shows and requires verified rights/source in `ASSETS.md`.
4. Do not equate passing CI with visual quality; compare **same viewport, same route, before and after** and inspect interactive states, computed CSS, loaded asset responses, full-motion vs Lite and reduced-motion. If the visible difference is weak/inferior, revise or mark experiment rejected.
5. Each completion updates the **component rotation matrix** below, `RESEARCH.md`, `ASSETS.md` if applicable and `docs/CURRENT_DEVELOPMENT_VERSION.md`; report exact branch, draft PR, SHA, test results, screenshot links and known limitations. Never invent measurement or declare green/mergeable without checking.

## Component rotation matrix (current snapshot)

| Priority | Component / route | Most recent verified context | Current defect / risk | Next required evidence |
| --- | --- | --- | --- | --- |
| P0 | Hero (home) | V79 PR #73, CSS/TSX implemented | Vitest fail; no new V79 before/after screenshots; scene may be visually weak or obscure text | Hour 01: code/test fix + six-width browser images/active motion |
| P1 | Navigation / mobile | Existing implementation (not re-audited in this bootstrap) | Focus/Escape and visual distinction unverified | Hour 02: keyboard and real mobile audit |
| P1 | Editorial services | V48/78 `ProductionIndex` editorial programme | Active images and spacing may appear blank, especially on mobile | Hour 03: direct 8 links, 3 chapters, visual comparison |
| P1 | Three real films / gallery | V78 restoration | Some posters reported blank; source/media loading needs inspection | Hour 04 candidate: poster + play integrity |
| P1 | Events / service discovery | Dedicated routes exist | Visual hierarchy, search, state handoff not rechecked | Later rotation |
| P1 | Contact / Guided Event Brief | Dedicated route exists | Two-service handoff/keyboard/validation/clipboard unverified at V79 | Later rotation |
| P2 | Studio / Despre | Existing routes to locate | Generic repetition risk | Later rotation |
| P2 | Footer / microcopy / CTA | Existing variants | Conversion clarity and focus states unverified | Later rotation |
| P2 | Responsive / images / icons | Existing assets and CSS | Asset provenance and image budget require measurement | Later rotation |
| P2 | SEO / SSR / 404 / privacy / security | V78 CI previous passing, V79 browser audit skipped | V79 exact-head HTTP audit blocked | Later rotation after CI restoration |

## Current state / handoff

- **This execution:** initial three-hour plan added to the existing journal on a documentation-only branch; no redesign/source modification yet. CI and screenshot claims in this section refer solely to the already inspected V79 build.
- **Next actionable hour:** **Hour 01, Hero**. Fix V79 stale Vitest assertion, validate and iterate the actual scene instead of pasting duplicate standalone hero code; create a separate draft PR and real before/after artifacts.
- **Important:** virtual "hours" are sequencing labels. This journal does not itself schedule background work; automated execution depends on an active, authorized scheduled task.

---

## 2026-11-13 — V79 2.5D KINETIC STAGE / REVIEW REQUIRED
- Component: HERO. Baseline V78 c9c936e9cdaeca28c86162e9010bebe03441054b, PR #72. Previous V79 branch existed but no implemented diff at start of this run.
- Changed: StageHero decorative original portal architecture (two 3D-depth trusses, perspective deck, scanning heads, horizon); new stage-v79.css imported after stage-v78.css; no new dependencies or media.
- Accessibility/performance: aria-hidden, CSS transform/opacity animation, pause on lights off, offscreen, reduced-motion, Lite; small-screen visual simplification. Browser before/after 360/390/430/768/1440/1920, SSR, exact-head CI still pending; do not claim visual approval or production readiness.
- Rotation matrix: HERO V79 implemented / awaiting screenshot gate; NEXT navigation/mobile menu; services then films/gallery, events, Contact, Studio, About, footer, microcopy/buttons, icons, images, responsive, SEO/security.
- Main and deployment untouched. Draft PR only.

---

## 2026-11-13 — V78 USER SCREENSHOT ROOT-CAUSE / REAL STYLE RECOVERY

- User verified V77 Codespaces `fix/v77-light-desk-escape-a11y` at `93f085c`. Exported screenshots show extreme circular stamp overpowering hero, missing editorial composition, empty-looking section regions, repeated inner-page styles. This is not hypothetical.
- Audited `src/styles.css`: 15 essential authored styles, including V48 `editorial-reset.css`, editorial services, film archive, live scene, Light Desk, cursor, event-specific/recovery styles, were NEVER imported. Root-cause is build CSS entrypoint, not a lack of additional design concepts.
- Implemented V78 on `design/crafted-atmospheres-v78-visual-style-recovery`: restored import graph + photo-first cinematic StageHero, brand-oriented two-line headline, reduced-motion/Lite-safe decorative light sweep, small stage aperture. Removed giant distracting SVG. No additional homepage sections or package/media.
- Rotation matrix: **CSS pipeline + hero / V78: implemented, visual QA pending** | service editorial / V78 stylesheet now activated, inspect screenshot next | films / style activated, verify | navigation/mobile: pending | Contact/brief: functional tests pending | SEO/404/SSR: CI pending | performance: gzip headroom UNMEASURED.
- Mandatory next: exact-head V78 push CI, six viewport real screenshot review, hover/focus/mobile/two-service handoff, find CSS collisions, test asset 404, audit main workflow auto deploy + backup tag ability. PR #19 reported mergeable=false at inspection. No merge/main yet.

---


## 2026-11-13 — V77 Light Desk Escape / focus
- Component rotation: photos V70; hero V72; CI V73–V76; **hero Light Desk keyboard V77**; NEXT navigation/mobile and actual browser focus tests.
- Change: keep native details/summary; Escape while open closes disclosure and restores keyboard focus to summary; no dependency, image, or layout addition. Added source-level regression test. Test execution and exact-head CI unconfirmed; must validate in Chromium at six widths before merge.
- Base: V76 PR #70, head aa447764f1035cc93c783560e826e8754b894964; PR #19 still mergeable=false. main and production untouched.

## 2026-11-13 — V76 browser CI repair / component rotation

- V75 exact-head React workflow [43368719076](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43368719076) FAILED at browser: legacy `.rs-hero h1` not found after V71 restored editorial homepage. TypeScript, SSR, gzip, Vitest and architecture steps PASSED; motion workflow 43368719061 PASSED. No full green.
- Replaced only the editorial CI browser entrypoint with a six-width actual-home audit (360/390/430/768/1440/1920), chapter/link/film/CTA/no-autoplay assertions, overflow/screenshots and secondary route/Contact/sitemap checks. Kept legacy Regia script intact for its separate branch. No disabling CI. Exact-head V76 CI pending.
- Rotation: photographs V70; homepage V71; hero V72; CI V73–V76. NEXT: navigation/mobile focus/Escape, two-service Contact flow, screenshot inspection. No main change or deployment.

## 2026-11-13 — V75 editorial keyboard focus regression

- Verified V74 exact-head `828ca2ccd8624033b261f93179f8ae8d63dbef56`: workflow 43362462854 FAILED at Vitest (3 assertions in `production-index.accessibility.test.ts`), while strict TypeScript, SSR build and gzip budgets PASSED. Separate motion workflow 43362462868 PASSED; does not imply overall green.
- Updated stale assertions to the current `:has(.gs-index__service:focus-visible)` keyboard focus treatment and grouped Lite/reduced-motion overrides. Retained actual checks against layout-shifting hover padding and motion, without disabling tests. New branch `fix/v75-editorial-focus-ci-regression`; exact-head CI pending.
- Rotation: photo V70, homepage V71, hero V72, CI V73–V75; navigation/mobile Escape NEXT once CI is green. Six-width browser/Contact tests, deployment trigger and rollback remain blocked/unverified. PR #19 mergeable=false, main unchanged.

## 2026-11-13 — V74 Vitest CI blocker

- Verified V73 exact-head: motion workflow #43356575075 SUCCESS; React typecheck/build workflow #43356575133 FAILURE at Vitest: 8 suites cannot evaluate fixture `new URL(..., import.meta.url)` because Vitest's transformed `import.meta.url` is not `file:`. Replaced fixture paths in 8 tests using repository-root paths; preserved all assertions and CI gates. This is not a browser or Lighthouse result.
- Rotation: photo V70, homepage V71, hero V72, CI V73/V74, **navigation/mobile Escape NEXT** after CI validation. V74 draft PR and CI pending. PR #19 mergeable=false; main untouched.

## 2026-11-13 — V73 CI gate repair

- Real V72 head `66969135b31d7808e2847a24bf4e14f98c5fbca6`: typecheck/build workflow 43348988088 **FAILED** in strict TypeScript, with ten errors across date validator and CTA regression; motion workflow 43348988129 passed. These failures supersede prior "CI unconfirmed" note. PR #66 mergeable=true but NOT releasable; PR #19 mergeable=false.
- V73 branch `fix/v73-exact-head-typescript-ci` addresses both exact errors, without disabling checks. Actual V73 workflow not yet verified. Main unchanged. Rotation matrix: photo V70, homepage route V71, hero V72, **CI release gate V73**, next mobile navigation and keyboard Escape. Release gates: CI, SSR, Vitest, browser 360/390/430/768/1440/1920, Contact handoff, deployment trigger/rollback and approval.

## 2026-11-13 — V71 / CRITICAL homepage route regression repaired

- Audited actual `src/routes/index.tsx` on V70 and V48: V70 routed to `RegiaHome`, which rendered hero + event selector/timeline + backstage + three films + closing CTA, contrary to the explicit V48 clean-home requirement. This was a concrete regression hidden by earlier changes to dormant `ProductionIndex` and `editorial-reset.css`.
- V71 restores the exact V48 editorial route: `StageHero`, `ProductionIndex` (3 chapters/8 services), `EditorialPortfolio` (3 real films), one finale Contact CTA. Dedicated event discovery remains on its own routes. Added a static Vitest route composition regression. No new dependency/assets.
- Rotation matrix: homepage composition / hero = V71 restored, **browser visual QA pending**; editorial photos = V70 CSS gate (now actually mounted); buttons/nav/films/Contact/SEO = pending. Prioritize exact-head CI, six-width screenshots, Contact 2-service handoff, and deployment configuration.
- Baseline V70 PR #64 head `6598a345699e1f0abfaeb79e63f6b5845bfd0a1d`, mergeable=true but exact-head PR workflow lookup returned no runs. PR #19 mergeable=false; V48 PR #35 mergeable=true. V71 TypeScript, SSR, Vitest and Chromium not yet run. Main untouched. No score or performance claim.

## 2026-11-13 — V70 / Divide et impera: service photographs

| Area | Last work | Status / next priority |
|---|---|---|
| Editorial service photos | V70 hover motion gate | Draft; verify reduced motion/Lite and six widths in browser |
| Hero / first impression | V48/V50 previous work | Next visual audit: responsive hierarchy, contrast and real asset |
| Buttons / CTAs | V60 previous work | Check one primary CTA and keyboard affordance |
| Navigation / mobile menu | Not audited in this rotation | Keyboard, Escape, touch targets |
| Films / real footage | V49 previous work | Check image/video load, provenance and Lite |
| Service links / typography | V68 previous work | Check routes and mobile legibility |
| Contact / brief | V69 previous work | Check two-service handoff, calendar, clipboard |
| SEO / 404 / sitemap / security | Pending | Verify actual HTTP responses and canonical/JSON-LD |

- Actual code: gated editorial photo hover scale by hover-capable pointer, no reduced motion, and non-Lite mode; retains filter cue and focus outline. Original CSS/Vitest only, no media or dependencies. CI and local tests not run/confirmed. PR #19 mergeable=false; V48 exact-head PR run success; V69 PR #63 mergeable=true but not proven green. No main change.
- Next: hero typography and LCP image audit, then real Chromium QA, TypeScript/SSR tests, deployment config, release rollback and backup-tag permissions. Do not publish without approval if main auto-deploys.

## 2026-11-13 — V69 draft

- Based on V68 PR #62, corrected Contact query prefill acceptance of impossible ISO-shaped dates; pure Gregorian validator plus Vitest regressions. Homepage editorial unchanged. No assets or dependencies.
- V68 exact-head PR workflow query returned zero runs (the connector only lists PR-triggered first-page runs); not evidence of passing or failing CI. No TypeScript/SSR/Chromium tests executed in this environment. V48 remains user-reported last fully validated editorial baseline.
- Backlog: exact-head CI, six-width browser and two-service Contact handoff, invalid/clipboard errors, PR #19 mergeability and main deployment trigger/rollback audit. No main merge or deployment.

## 2026-11-12 — V68 draft

- Stacked on V67 PR #61; native Map resolves eight editorial links by slug after duplicate-source validation, preserving original references and 3/2/3 order. Added identity/order regression; no media, dependencies, homepage sections or external services.
- V67 PR #61 mergeable=true, but exact-head CI and browser QA unverified. PR #19 mergeable=false. V48 remains last user-confirmed fully validated editorial baseline. No measured performance/SEO gains.
- Next: run exact-head CI, TypeScript/SSR/Vitest/Chromium six widths, Contact two-service handoff and audit main deployment triggers. No main merge.

## 2026-11-12 — V67 draft

- Branch design/v67-catalogue-duplicate-source-guard stacked on V66 PR #60. Fixed integrity blind spot: duplicated slugs in source catalogue were hidden by Set before parity validation. Added source guard and regression test. No visible homepage changes or packages.
- V66 exact-head PR workflow query returned zero runs; no claim of passing CI, TypeScript, SSR or browser QA for V67. PR #19 conflict status requires independent mergeability check. Main untouched.
- Next: execute CI exact-head, six-width Chromium, Contact two-service handoff, SSR/sitemap/404 and production deployment/rollback audit. Scores unmeasured.

## 2026-11-12 — V66 draft

Branch `design/v66-editorial-catalogue-completeness` stacked on V65. Added catalogue parity fail-fast guard and unit regression, preserving three chapters and eight direct links. V65 exact-head PR workflow query returned zero runs; V66 CI, TypeScript, SSR and six-width browser audit unverified. No measured Lighthouse or SEO gains. Next: run CI, inspect six widths and Contact two-service handoff; audit deployment triggers. Main unchanged.

## 2026-11-12 — V65

- Branch design/v65-editorial-service-uniqueness-guard stacked on V64. Guard against repeated service slugs across the three editorial chapters; added an eight-unique-service test. No visible UI change or dependency.
- V64 exact-head PR workflow query returned no runs; PR #58 mergeable=true (does not establish CI success). PR #19 mergeable=false. TypeScript, SSR, browser six widths and Contact flow unverified. No main merge/deployment.
- Next: exact-head CI, browser and screen-reader audit, two-service Contact prefill, deployment-trigger review.

## 2026-11-12 — V64

- Branch design/v64-editorial-semantic-navigation based on V63 PR #57. Adds native accessible list labels and descriptions to each of three existing editorial chapters, plus regression test.
- V63 commit 5cbfe8bcc6f98b978f294972685fb3e394c6ecb0: no PR-triggered workflow runs returned by commit query; V64 CI pending. PR #19 still mergeable=false; V63 PR #57 mergeable=true but CI unconfirmed.
- No Lighthouse, LCP, UX, SEO or conversion score claimed. No main merge/deploy.
- Backlog: CI exact-head, screen reader and keyboard QA at 360/390/430/768/1440/1920; 2-service Contact flow; real responsive image variants; deployment/rollback audit.

## 2026-11-12 — V63

- Branch: design/v63-editorial-service-clarity; base V62 PR #56. New concise, service-specific copy in the existing three chapters and regression test; no new widgets or assets.
- Scores: Lighthouse, LCP, SEO ranking and conversion unmeasured. V62 exact-head PR workflow query returned no runs; V63 CI and browser QA pending.
- Blockers: PR #19 mergeable=false; latest editorial stack lacks verified exact-head TypeScript/SSR/browser results; no main deployment/rollback clearance.
- Next: inspect CI exact-head and six-width screenshots; test Contact 2-service prefill and SSR, then audit main deploy triggers.

Updated 2026-11-12, V62 draft: CSS touch-hover neutralization added to existing editorial service programme, with static Vitest guard. V61 exact-head PR workflow query returned no runs; V62 full CI, Chromium six-width and physical touch QA unverified. PR #19 mergeable=false. No main merge/deployment. Next: run TypeScript/SSR/Vitest/Chromium, inspect screenshots and Contact 2-service flow; verify production deployment and rollback gate.

Updated 2026-11-12, V61 draft: found a real false-negative in V60 static CSS regression: regex literals were double-escaped. Replaced with CSS hover declaration checks and mutation fixtures for gap, padding, margin vs transform. New branch stacked on V60 editorial, not the parallel immersive redesign. V60 exact-head CI unconfirmed; PR #52 has a successful PR workflow run but violates the locked V48 homepage composition, so not used as base. PR #19 mergeable=false. No main merge, deployment or measured Lighthouse. Next: exact-head CI, Chromium and Contact tests.

Updated 2026-11-12, V60 draft: removed layout-affecting intro CTA gap hover, replaced with arrow-only transform gated by normal-motion/non-Lite. Added static regression. Baseline V59 CI not confirmed through PR workflow lookup; V60 CI pending. PR #19 mergeable=false; parallel V59 live-show PR #50 not integrated. No main deployment or measured Lighthouse. Next: exact-head CI, six-width Chromium hover/focus, Contact 2-service flow and main deploy/backup audit.

Updated 2026-11-12, V59 draft: refined editorial photographic focus cue to keyboard-visible focus only; pointer clicks no longer trigger the same extra chapter highlight. Added static Vitest guard. V58 exact-head CI not confirmed through connector; V59 CI pending. PR #19 mergeable=false. No measured Lighthouse score, no main deployment. Next: confirm CI, keyboard/pointer Chromium at six widths, Contact prefill, screenshot review, verify deployment/backup gate.

Updated 2026-11-12, V58 draft. Removed layout-affecting hover padding in editorial service links; compositor-only text transform is limited to normal-motion/non-Lite. Added regression test. V57 PR #46 is a separate homepage poster redesign with only its visual QA run confirmed; do not merge it into the V48-clean editorial line without owner review. V56 and V55 exact-head CI unavailable from PR workflow query. PR #19 mergeable=false. No Lighthouse measurements or production merge. Next: exact-head CI, six-width screenshots, keyboard/reduced-motion/Lite behavior, Contact 2-service prefill, main deploy trigger/rollback audit.

Updated 2026-11-12, V56 draft. New keyboard focus-within visual chapter cue on existing editorial service links, CSS-only; guarded by a static Vitest test. V55 CI unverified; V53 live-stage PR #44 is a separate parallel redesign, not merged into this branch. PR #19 mergeable=false. No production merge. Scores remain unmeasured.

# AGENT STATE — Green Sound Music

Updated 2026-11-12, V55 draft. Baseline V54 PR #42 (draft, mergeable at last check, no exact-head CI runs returned); V53 PR #41. PR #19 remains unmergeable due to conflicts.

## Implemented
- V55 continuous editorial 01–08 running order via native CSS counters; no new homepage section or dependency.
- Corrected V54 image-path test to use literal prefix checking.
- Added source/license research, asset provenance, experiment gate and version documentation.

## Unverified
- TypeScript, SSR, Vitest, Chromium six-width, visual screenshots and CI for V55. No Lighthouse or field SEO scores measured.
- Main deployment trigger, backup tag/rollback permissions, and public production status. Main must remain unchanged.

## Next backlog
1. Confirm V55 exact-head CI and fix any failing tests, especially existing test runner imports.
2. Inspect screenshots at 360, 390, 430, 768, 1440, 1920 and ensure numbering reads 01–08 across chapters.
3. Audit Contact prefill (two services), hydration, focus, reduced-motion/Lite, Save-Data and keyboard Finder.
4. Verify true LCP element and image priority in staging before modifying eager/lazy flags.
5. Research actual local DJ/sound/lighting search intents without invented metrics; document only verified service area.
6. Inspect PR #19 conflict and main CI/CD deployment settings; do not merge without backup/tag and separate publication approval where needed.

## 2026-11-13 — V72 / Divide et Impera: hero motion
- Area: hero stage decoration (after V71 route restoration). Added CSS Lite/reduced-motion gate for animated beams, rings, pointer and image transitions; real hero image remains. New source-level Vitest guard. No packages or external media.
- Rotation matrix: hero = V72 pending browser verification; photographs = V70; next = navigation/mobile menu keyboard and Escape, then CTA, films, Contact, SEO.
- V71 PR #65 reported mergeable=true but exact-head PR workflow query returned zero runs, **not** CI success. PR #19 mergeable=false. No TypeScript/SSR/Chromium run confirmed; no main merge or deployment.

## 2026-11-15 V134 — Portfolio photo keyboard (draft, QA pending)
Zone: /portofoliu photo dialog. Home/End now jump to first/last photo within visible filter, alongside arrows and swipe. Pending: Chromium 390/1440 before/after, 360/430/768/1920, keyboard focus, TypeScript, SSR, Vitest, gzip and exact-head CI. Next rotation: film player browser QA and filter/deep-link regression. Main untouched.

## 2026-11-15 V135 — Portfolio dialog focus origin
Area: /portofoliu photo modal. Defect: after Arrow/Home/End navigation, closing modal focused the last viewed thumbnail rather than the link used to open it. Fix: retain original photo id through modal session, restore that thumbnail on close (heading fallback), then clear session ref. Source-only verification; Chromium screenshots, keyboard/Escape and exact-head CI still pending. Next zone: film archive keyboard/deep-link. No main change.

### 2026-11-15 V142 — Studio detail rotation
Area: `/studio-inregistrari` preparation heading. Added a studio-specific typographic title and original static recording-signal SVG; all other service detail headings unchanged. Files: `src/components/site/ServicePage.tsx`, `src/styles.css`. Visual difference expected only in Studio heading; Chromium before/after, accessibility and performance unverified. Next rotation: footer. No main/deploy changes.

## 2026-11-15 V143 — Footer audit / CI blocker
- Selected area: footer Contact conversion CTA; real code already points to /contact#contact-form-title.
- CI V142 failure: footer-editorial-v93.test.ts stale assertion (87 passed, 1 failed), run https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43727508158.
- V143 test updated to assert destination + hash, without changing UI. Chromium before/after screenshots unavailable; no visual redesign claim. V143 CI pending; main unchanged.
- Next rotation: Contact hash scrolling and keyboard focus in real browser, footer desktop/mobile captures.

## 2026-11-15 V144 — Footer navigation landmarks
Area: footer directory. Three visually unchanged columns are now named `<nav>` landmarks (Evenimente, Servicii, Green Sound) for screen-reader navigation. Regression test checks landmark count and matching closures. No dependencies, assets or main changes. CI and Chromium screenshots not yet verified. Next: Contact fragment focus and actual browser captures.


## V188 / 2026-11-17 — Homepage service programme
| Area | Severity | Observed issue | Change | QA | Next |
|---|---|---|---|---|---|
| Home / services | High visual | Five narrow equal-height photo tiles look generic | CSS Grid asymmetric editorial scale and image pacing, no new services | Browser before/after 390/1440, six widths, SSR and exact-head CI pending | Inspect real screenshots; then rotate to mobile navigation |

No merge or deploy authorized. This is a design candidate until real Chromium validation.


## V189 — 2026-11-17 / NAVIGATION LIVE SETLIST (DRAFT)
| Area | Priority | Source defect | Implemented | QA evidence | Next |
|---|---|---|---|---|---|
| Header + mobile full-screen dialog | High visual / medium UX | Six links have repetitive row presentation; narrow menu lacks active destination cue; arrow navigation absent | `navigation-v189.css` and `SiteHeader.tsx`: muted emerald editorial setlist; original five-bar sound-channel motif on selection; contrasting italic second/fifth labels; active-route cue visible on mobile; Arrow keys/Home/End navigation, Tab/Escape and native dialog preserved | Source patch; browser before/after 390/1440, 6 widths, Lite and exact-head CI pending | Real-browser screenshot and keyboard QA; then portfolio/gallery audit |
| QA baseline | Blocking | V188 CI 44033276330 fails 4 test files: two `new URL(..., import.meta.url)` incompatible with Bun Vitest, two stale assertions after legitimate Contact/event code changes | Fixed only test source-path resolution and updated assertions to actual Contact handoff + cancellable image decode helper. No test disabled | Re-run pending | Inspect exact-head CI and patch any genuine failures |

User-visible design is not certified without Chromium evidence. No main push/deployment, no new assets/packages.

### V189 browser-validated UI checkpoint (2026-11-17)
- UI SHA `f482e5a67f6f56b50b28e380330e0b31aedeac51` verified through full QA workflow https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44034682149 : TypeScript, SSR/Vite build, asset budgets, Vitest 46 files/125 tests, browser interactions six viewports, Contact SSR and sitemap checks PASSED.
- Before/after same route `/`, same 390/1440 viewport, native menu open, `Servicii` preview focused; real Playwright `chromium` workflow https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44034682037 PASS. Artifact https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44034682037/artifacts/14306981193 contains 12 source PNGs (before/after 390/1440, after 360/390/430/768/1440/1920, motion and Lite at 390).
- QA-detected mismatch fixed: preview cue had described `Servicii` while `Acasă` stayed highlighted; `data-preview` now aligns visual emphasis to the focused destination without changing canonical page links.
- Remaining: visual owner review, accessibility screen-reader manual check, production approval and exact-head QA after any documentation-only commit. No main changes. Next rotation portfolio/video gallery.

## V191 / 2026-11-17 — /portofoliu film archive
| Zone | Issue | Code change | QA evidence | Next |
|---|---|---|---|---|
| Portofoliu / films | Previous film list read as a generic column; selected link incorrectly styled by [aria-current=true] instead of router value page | New cinematic media frame, selected video slate, photo-backed native link playlist, keyboard arrows/Home/End, query persistence; selected visual state uses data-current while ARIA remains page | Matched Chromium 390/1440 and six-width workflow added; status to verify on exact HEAD | Studio interior page |
| Portofoliu / photos | Existing 6 original photos + category lightbox | Unchanged and retained | Existing regression CI remains active | Later rotation |
| Main / production | Stacked PRs, PR #19 conflicts | No merge or deploy | Await CI, owner approval, backup tag, rollback/CD audit | No publication |
Visual audit: First V191 desktop screenshot was too empty above the film; tightened heading and section spacing. Browser filter diagnostics revealed aria-current=page and incorrect previous CSS selection highlight. Fixed both component and selectors without hiding the problem. No new media or packages.

### V191 verified UI checkpoint / 2026-11-17
- Source/UI commit 8a5d826848736f2e91c766297ca97ba22d85cb12 passed full exact-head QA: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44041711279 (TypeScript, Vite/SSR, 47 suites/129 Vitest tests, client gzip budgets, six-width browser checks, Contact hydration and sitemap).
- Real matched Chromium workflow exact same UI commit PASSED: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44041706985 ; screenshot artifact https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44041706985/artifacts/14309761475.
- The artifact contains V190 before / V191 after screenshots on /portofoliu with unchanged initial film state at 390 and 1440, full film-section captures, responsive screenshots 360/390/430/768/1440/1920, Studio filter states and Lite/full-motion frames. Approved existing poster image decoded; YouTube still only loads after Play.
- CI measured: homepage entry gzip 125.4 kB (limit 190); client quote form 31.7 kB (limit 50); shared CSS 52.0 kB (limit 52, close to cap); not a Lighthouse field measurement.
- Owner visual approval pending; no CD audit, backup tag, main merge or production release. Next site area: Studio interior page.
