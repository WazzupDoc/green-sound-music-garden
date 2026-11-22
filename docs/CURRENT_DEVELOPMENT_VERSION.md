### V258 / 2026-11-22 — Preserve Events retry on active reselect (DRAFT / QA PENDING)
- Branch `fix/v258-events-preserve-retry-on-reselect` stacked on V257 PR #292. Retain active failed-photo state when selecting the same event; clear stale state only when changing categories. Source regression added. No homepage/media/dependency/main/deploy changes. Exact-head CI, TS/SSR/Vitest/gzip, 390/1440 screenshots and six widths NOT VERIFIED.

### V257 / 2026-11-22 — Events stale-photo error reset (DRAFT / QA PENDING)
- Branch `fix/v257-events-clear-stale-photo-error` stacked on V255 PR #291. Pointer and keyboard event changes clear previous image failure state; source regression added. No new media, packages, homepage, main or deploy changes. CI exact-head and matched real Chromium screenshots NOT VERIFIED. Next: Events browser visual audit and image-retry simulation.

### V254 / 2026-11-21 — Contact pending clipboard focus (DRAFT / QA PENDING)
- Branch `fix/v254-contact-copy-focus-pending` stacked on V253 PR #289. Preserve keyboard focus on copy action during async clipboard permissions with `aria-disabled` instead of native disabled; existing `copyPendingRef` guards duplicate actions. Source regression added. No visual redesign; screenshots 390/1440 and six widths NOT CAPTURED, TS/SSR/Vitest/gzip and CI exact-head NOT YET VERIFIED. No main/deploy changes. Next: Events full visual audit.

### V253 / 2026-11-21 — Events retry focus continuity (DRAFT / QA PENDING)
- Branch `fix/v253-events-retry-focus-return` stacked on V252 PR #288. On manual photo retry, keyboard focus returns to selected setlist item before retry control unmounts. Source regression added. No main/deploy, media or dependencies. Browser screenshots, six widths and exact-head CI pending; do not merge.

### V252 / 2026-11-21 — Events image retry (DRAFT / QA PENDING)
- Branch `fix/v252-events-frame-manual-retry` stacked on V251 PR #287. Failed image decode now offers an explicit retry while preserving previous verified photo and active event; two source regression assertions. No new media/dependencies/main changes. CI exact-head, TS/SSR/Vitest/gzip and Chromium before/after screenshots NOT VERIFIED. Next: Contact keyboard/clipboard and six-width Events browser QA.

### V251 / 2026-11-21 — Events synchronous image failure guard (DRAFT / QA PENDING)
- Branch `fix/v251-events-sync-decode-fallback` based on V250 PR #286. Handles synchronous image creation, src assignment and decode exceptions via existing recoverable error callback; two tests added. No new media, dependencies, homepage/main or deployment changes. Exact-head CI, TS/SSR/Vitest/gzip and real Chromium screenshots pending. Next: Contact keyboard/clipboard.

### V250 / 2026-11-21 — Events image decode failure feedback (DRAFT / QA PENDING)
- Branch `fix/v250-events-frame-loading-status`, stacked on V249 PR #285. Added guarded decode-error callback and accessible loading/failure announcement while retaining previous event photograph; stale decode failures ignored. Added Vitest regressions. No homepage, new assets, dependencies or main changes.
- Exact-head GitHub Actions, TypeScript, SSR/Vitest/gzip, Chromium 390/1440 before-after and six-width checks NOT VERIFIED. Do not merge/publish. Next: Contact keyboard/clipboard and event slow-network QA.

### V248 / 2026-11-21 — Events provenance test CI unblock (DRAFT)
- Branch `fix/v248-events-provenance-test-ci` stacked on V247 PR #283. Fixes Vitest `import.meta.url` non-file scheme crash using project-root file path. V247 Actions #44897261840 failed (60 suites, 162 passing tests, one suite load failure). V248 exact-head CI and Chromium screenshots pending. No production UI/assets/dependencies/main change.

### V247 / 2026-11-21 — Events trust copy (DRAFT / QA PENDING)
- Branch `fix/v247-events-unverified-founding-year` stacked on V246 PR #282. /evenimente stage registration removes unsupported «DIN 2008» historical claim and displays Pitești / Argeș instead. No media, dependencies, homepage or main change. Exact-head CI and matched Chromium screenshots pending; next audit: event image decode fallback and keyboard selection.

### V246 / 2026-11-21 — Contact clipboard focus (DRAFT / QA PENDING)
- Branch `fix/v246-contact-clipboard-focus-continuity` based on V245 VideoLite focus PR #281. QuoteForm preserves focus on other controls if asynchronous clipboard permission fails after the user navigates away; still focuses/selects manual fallback when copy button loses focus to body. No homepage/main/deploy changes. Browser 390/1440 matched screenshots, six widths, TS/SSR/Vitest and exact-head Actions pending. Next rotation: Events visual/keyboard.

### V245 / 2026-11-21 — Passive video-switch focus fix (DRAFT / NOT VALIDATED)
- Branch `fix/v245-video-switch-no-focus-theft` stacked on V244 PR #280 (`8ba1843ffd85b768ccfa5b2a03208e750064ac16`). Shared VideoLite no longer steals focus when video identity changes while playback is inactive; if playing, focus still returns to new Play control. Existing source regression updated. No main/deployment. Exact-head CI, six-width Chromium, matched 390/1440 screenshots and keyboard behavior not yet verified. Next rotation: Contact mobile clipboard.

### V243 / 2026-11-21 — VideoLite unavailable accessible label (DRAFT / QA PENDING)
- Branch `fix/v243-videolite-unavailable-accessibility` stacked on V242 PR #278. Invalid YouTube IDs are already blocked; disabled Play now announces the truthful unavailable state to assistive technology. No homepage, assets, dependencies, main or deploy changes. V242 CI success: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44863868659 . V243 exact-head CI and browser screenshots pending; do not merge or publish.


### 2026-11-21 V242 — VideoLite regression CI repair (draft / pending)
- Area: shared VideoLite tests ONLY. V241 exact-head workflow https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44858935944 failed four outdated string assertions across v204/v218/v219; all still demanded unguarded Play. Updated them to require the safer `safeVideoId` gate and guarded click. No production component, homepage, asset or dependency changes.
- Evidence: GitHub Actions job 136707569819 inspected. New V242 exact-head CI, TS, SSR, Chromium six widths and before/after screenshots NOT YET VERIFIED. No visual redesign claimed. Main/deploy untouched. Next zone: Contact mobile keyboard and clipboard recovery.

### V222 / 2026-11-18 — MAIN SYNC COMPLETED (documentation-only status)
- Full development history through V221 + V222 CI regression corrections merged by PR #222 https://github.com/WazzupDoc/green-sound-music-garden/pull/222 into main; merge commit `c97f36f6e6628a45f9b2da715888e5af5f5e59b3` (parents original main `557d8b4fd086f4592581cccc68ddd53d2542b45b` and candidate `7c946f5aff3038bc7286603463e3eaff356966af`). This supersedes older DRAFT entries below, which remain historical.
- Validated exact candidate HEAD `7c946f5aff3038bc7286603463e3eaff356966af`: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44311911018 (strict TypeScript, production SSR/Vite build, gzip budgets, 59 test files / 160 tests, real Chromium six widths, Contact SSR/hydration, sitemap and 20-page canonical/SEO audit). Supplemental V19 run https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44311911322 passed. New screenshots: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44311911018/artifacts/14430567777 . Visual changes derive from earlier development; V222 itself only repaired two stale regression assertions.
- Backup verified before merge: Git tag `backup/main-pre-v222-20261118` points exactly to original main `557d8b4fd086f4592581cccc68ddd53d2542b45b`. Rollback option: create a revert PR of merge commit `c97f36f` using `git revert -m 1 c97f36f6` on a new branch, test, then merge; do not force push or rewrite history.
- README says pushes to main sync to Lovable; actual site-publication state is NOT independently verified. No direct domain, deployment, paid service or external setting changes performed here.
- Next: reconcile post-merge Lovable preview with real Chromium screenshots, audit Contact→Evenimente conversion and responsive visuals. Do not assume changing main automatically proves production publication.

### V221 / 2026-11-18 — Contact location prefill validation (DRAFT)
- Branch `fix/v221-contact-empty-location-sanitization` stacked on V220 PR #220. Prevent control-only location URL parameters from creating an empty prefill and cap raw input at 2000 characters before processing. Regression test added. V220 exact-head Actions #44299612544/#44299598313 FAILED in Test existing application; cause not yet isolated. V221 CI/TypeScript/SSR/Vitest/Chromium and matched 390/1440 screenshots pending. No visual redesign, main/deploy unchanged. Next: isolate CI test failure, then Contact browser and event CTA audit.

### V220 / 2026-11-18 DRAFT: fix/v220-film-identity-render-guard stacked on V219 PR #219. Render-time guard prevents mounting a third-party iframe for a replacement film before the layout-effect reset; source regression updated. No homepage change, media, dependencies or main deployment. Exact-head CI and real Chromium before/after screenshots NOT VERIFIED. Next: Contact/event CTA.

### V219 / 2026-11-18 — Reset film consent on changed video identity (DRAFT / QA PENDING)
- Branch `fix/v219-video-switch-consent-reset` stacked on V218 PR #218. Shared VideoLite now detects when a mounted player's video ID changes and stops the previous consented playback before rendering the replacement. Focus is restored to the new Play button. Regression source test added; no dependencies/assets/homepage sections/main/deploy changes.
- Exact-head TypeScript/SSR/Vitest, actual Chromium playback/keyboard and matched screenshots NOT VERIFIED. Next rotation: Contact and event CTA.

### V218 / 2026-11-18 — Minimal consented video permissions (DRAFT / QA PENDING)
- Branch `fix/v218-film-embed-permissions` stacked on V217 PR #217; shared VideoLite removes unnecessary accelerometer, gyroscope and clipboard-write permissions from YouTube iframe. Preserves explicit Play/Stop, focus handoff, referrer privacy and no third-party load before Play. Source regression added. No homepage layout or assets changed. CI exact-head and Chromium screenshots pending. Main untouched.

### V217 / 2026-11-18 — Production directory navigation (DRAFT / NOT VALIDATED)
- PR: https://github.com/WazzupDoc/green-sound-music-garden/pull/217 ; branch `design/v217-production-directory-header`; initial UI commit `7f765530d4d0b560af56e6b48d19ce6866203c7f`; base V216 `199ff989`.
- Navigation now groups the eight real service routes in a three-chapter emerald editorial dropdown, with eight original SVG glyphs and three bespoke category diagrams. Dedicated direct Services link and mobile dialog retained; no homepage sections added.
- Tests added for icon SSR, route coverage, keyboard contract and motion flags. Exact-head CI, Chromium screenshots and real visual comparison pending. No main/deploy. Next: verify panel positioning at 1440, focus/Escape, mobile at 390, Lite/reduced-motion, then rotate to Contact.

### V216 / 2026-11-18 — Compact mobile setlist (DRAFT / UNVALIDATED)
- Branch `design/v216-mobile-menu-editorial-clarity` stacked on V215. Mobile menu at <=640px prioritizes six navigable destinations, removes redundant stage ornament/secondary cue and reduces heading footprint; desktop and functional actions preserved. CSS-only, no dependencies. Real browser screenshots, TypeScript/SSR/Vitest and exact-head CI **pending**. No main/deploy.

### V215 / 2026-11-18 — Restored emerald art direction (DRAFT)
- User rejected V214. Draft PR #214 closed without merge; V215 `design/v215-restored-emerald-refinement` forks exact green V213 commit `e43609dd09212d3cbf8d18a2b47d677f29fc2b56`. Hero restores original green concert photo, all original headline/CTA/video/service sections and 10-channel decorative mixer instead of V214 artificial vector score; subtle dark-green surface and warm metallic fader caps for texture, softened LED glare, and mobile-safe visual layering (hide console below 740px). Original compact desktop nav, no numbered nav; accessible search label and functional local presets, copy simplified.
- Exact-head CI, tests, six-width Chromium, before/after screenshot and motion gates pending. Main untouched. Next rotation: mobile navigation and Contact conversion. Need owner visual signoff, **do not publish**.

### V213 / 2026-11-18 — Contact Vitest CI unblock (DRAFT)
- V212 exact-head run #44241249565: TypeScript, SSR build and gzip passed; Vitest failed before running V212 tests (`ERR_INVALID_URL_SCHEME` from `new URL(..., import.meta.url)`). Replaced test source path with `resolve(process.cwd(), ...)`, no production UI change. Browser 390/1440 screenshots, six-width QA and exact-head green CI remain unverified. Main untouched. Next: browser Contact discard and event CTA.

### V212 / 2026-11-18 — Contact discard confirmation (DRAFT)
- Branch `fix/v212-contact-discard-confirmation` stacked on V211 PR #210. After explicitly discarding the prepared quote, Contact now shows a live-region confirmation that local form values were cleared and no message was sent. Confirmation resets when preparing another quote. Added source regression test; no dependencies/assets/homepage/main changes. Exact-head CI, TypeScript/SSR/Vitest and matched Chromium 390/1440 screenshots **NOT YET VERIFIED**; do not merge/publish. Next: real-browser Contact discard QA and event-detail CTA.

### V211 / 2026-11-18 — Contact discard strict TypeScript unblock (DRAFT)
- Parent V210 PR #209 SHA `27446472710b6b7dfc29d07c3b7c64e29ab676ba`. Its exact-head GitHub Actions #44203797699 FAILED at TypeScript: QuoteForm reset explicitly assigned `eventType: undefined` under `exactOptionalPropertyTypes`. V211 omits the optional key while preserving the clear-form action and other reset values. No homepage/media/dependency/main changes. New exact-head CI, SSR/Vitest/gzip and real Chromium screenshots pending; do not merge/publish. Next rotation: Contact form reset/validation browser QA, then events detail CTA/focus.

### V210 / 2026-11-18 — Broken film poster fallback (DRAFT)
- Branch `fix/v210-film-poster-load-fallback` stacked on V209 PR #208. Configured first-party posters now gracefully fall back to the local dark play surface on image load error, instead of displaying a broken image. Source assertion updated. No dependency, new media or homepage section. CI exact-head and Chromium screenshots pending; do not merge or publish.

### V209 / 2026-11-18 — Film play focus continuity (DRAFT)
- Branch `fix/v209-film-play-focus-continuity` stacked on V208 PR #207. Shared VideoLite focuses the accessible Stop button after explicit Play activates the iframe; Stop still restores focus to Play. Source regression extended. No new dependency, third-party asset or homepage change. Exact-head CI / Chromium screenshots pending; main untouched.

### V208 / 2026-11-18 — Third-party thumbnail privacy (DRAFT)
- Branch `fix/v208-local-film-poster-fallback` stacked on V207 PR #206. VideoLite no longer loads `i.ytimg.com` fallback thumbnails before user activation; configured poster remains, missing poster uses dark CSS surface. Added regression assertion. No new dependency, main unchanged. CI exact-head, network audit and matched 390/1440 Chromium screenshots PENDING.

### V207 / 2026-11-17 — Consented film referrer privacy (DRAFT)
- Branch `fix/v207-film-referrer-privacy` stacked on V206 PR #205. Shared VideoLite iframe now sets `referrerPolicy="no-referrer"` so consented YouTube playback does not transmit the originating page URL in the Referer header. Regression assertion added. No new dependency or visual redesign. Exact-head CI, browser QA and matched screenshots NOT VERIFIED; main unchanged.

### V206 / 2026-11-17 — Event film disclosure (DRAFT)
- Branch `feat/v206-event-film-consent-clarity` stacked on V205 PR #204. Event detail film region now explains that playback is user-initiated, loads YouTube, and offers Stop. Accessible region label and source regression. Exact-head CI and real matched Chromium captures pending; do not merge or deploy.

### V205 / 2026-11-17 — Portfolio stop focus after commit (DRAFT)
- Branch `fix/v205-film-stop-focus-after-commit`, stacked on V204 PR #203. Replaces rAF focus scheduling with React layout effect guarded by an explicit stop flag; avoids focusing a poster button before it exists. Regression updated. CI exact-head and matched Chromium before/after **PENDING**. No main/deploy.

### V204 / 2026-11-17 — Portfolio film player stop (DRAFT)
- Branch `feat/v204-film-player-stop-control`, stacked on V203 PR #202. Shared VideoLite now exposes an explicit accessible Stop control while a user-initiated YouTube iframe plays. Stop unmounts the iframe and restores keyboard focus to the poster Play button. No new packages, no autoplay before click, no homepage additions, no main/deploy changes.
- Added source regression `src/components/site/video-lite-v204.test.ts`. Exact-head CI, browser 390/1440 matched screenshots, 6-width visual and keyboard QA **PENDING**; this is not a validated release.

### V203 / 2026-11-17 — Contact discard private quote (DRAFT)
- Branch `feat/v203-contact-discard-private-brief`, stacked on V202 PR #201. A distinct action on the prepared quote lets visitors discard the draft and clear retained form values instead of merely returning to edit. No automatic send, no new package, homepage unchanged. Source regression added; TypeScript/SSR/Vitest and Chromium matched screenshots **PENDING**.

### V202 / 2026-11-17 — mobile→desktop menu focus handoff (DRAFT)
- Branch `fix/v202-menu-desktop-focus-handoff`, stacked on V201 PR #200. Fix in `SiteHeader.tsx`: on crossing 1024px with open modal, restore keyboard focus to visible active desktop nav link rather than now-hidden mobile opener. Preserve Escape/ordinary close behaviour.
- Added source regression test `v202-menu-focus.test.ts`; no dependency, homepage, photo or main changes. CI exact-head and real browser screenshots **PENDING**. PR and SHA in GitHub branch history.

### V201 decoder QA clarification — 2026-11-17
- An investigation of the WebP verification revealed the direct `Image().decode()` assertion was executed on an `about:blank` page, so the relative `/media/...` URL did **not** resolve to the local Vite site. The original AVIF decoder failure had the same test-origin bug; it is **not evidence that AVIF lacks Chromium support**. Corrected QA now navigates to `http://127.0.0.1:4175/evenimente` before decoding. Selected WebP asset remains preferred for conservative browser compatibility; no claim of AVIF incompatibility.
- Actual screenshot evidence from the V201 partial workflow shows all 13 drawn icons visibly in the page, even though later test assertions failed. Need final exact-head, same-origin decode pass before release.

### V201 codec and quality gate update — 2026-11-17
- Source boards user approved in chat now integrated into **one 45,888-byte `public/media/gs-category-illustrations-v201.webp`** (13 distinct cropped artwork cells / 1120×320 px), instead of the initial 29,919-byte AVIF. Real Chromium found AVIF decode error; removed that file and changed all CSS/test/QA expectations to WebP. Never claim AVIF screenshot success.
- Route-specific UI art and existing native event/service links remain unchanged; full-motion only on explicit action; reduced-motion and Lite static. V200 shared CSS overflow fixed by removing unused V78/V79 prototype imports while preserving the files and active homepage V170 integrity test.
- **Old source checkpoint** V201 before WebP passed full TypeScript/SSR/50-suite/138-test build and gzip (49.7KB / cap 52KB), but failed visual asset decoding: must rerun exact-head full CI AND real Chromium image decode/screenshots after WebP. **Draft PR #200, main/public site untouched.**

## V201 / 2026-11-17 — Use generated artwork on actual Events and Services pages (DRAFT PR #200)
- **Latest branch:** `design/v201-illustrated-category-art`, base `design/v200-mobile-menu-viewport-recovery` V200 SHA `fc8d9601ba94d26fbb8cafd929b1518e355296db`. PR https://github.com/WazzupDoc/green-sound-music-garden/pull/200. Owner explicitly requested `Acum folosește-le` for two ImageGen icon boards.
- **Actual changes:** one local 29,919-byte AVIF atlas with 13 independent picture cells, used in `CategorySignal.tsx` on existing `/evenimente` and `/servicii` links, with native HTML captions; accessible and mobile-first; existing original category click/keyboard behaviour preserved. Route-scoped CSS, no homepage additions, no new photo claims, apps, APIs or external assets.
- **Performance defect inherited:** V200 already failing shared CSS gzip hard cap 52KB, despite TypeScript/SSR build. V201 removes unused legacy V78/V79 CSS imports from global styles and updates legacy test to assert active V170 architecture (no test removed, no cap raised). Retains actual old CSS files in repo/history. **Full CI pending** for V201 final HEAD; do not claim validation before jobs complete.
- **Screenshot gate:** `v201-category-art-visual.yml` compares exactly same selected Petreceri at 390/1440 before V200 vs after V201, six after resolutions 360/390/430/768/1440/1920, local AVIF HTTP/decoded 1120×320, animation on deliberate click, reduced-motion, Lite static, keyboard and no-JS. Upload artifact `gs-v201-real-illustrations-before-after`; inspect real images before greenlighting.
- **Non-goals:** production main, DNS, publication, costs, third-party photos/real people, fake send or additional homepage sections. Review main deployment and rollback only if later authorized. Next primary area: Contact multi-service prefill/clipboard experience.

### V200 / 2026-11-17 — Navigation viewport recovery (draft, QA pending)
- Branch `design/v200-mobile-menu-viewport-recovery` based on V199. An open mobile native dialog now closes when viewport enters desktop layout (1024px breakpoint). CI and matched screenshots pending; no main merge/deployment.

### V198 real Chromium & QA checkpoint — 2026-11-17
- UI/test source SHA `501026b89e2b813de97fd127e5912340b020dcbf`.
- **PASS** full TypeScript/SSR/Vitest/gzip/architecture/responsive browser/Contact hydration/sitemap workflow https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44087716295 at UI SHA, after resolving existing V173 CSS inline contract and waiting for React hydration in the visual test.
- **PASS** real browser matched screenshot and motion verification https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44087711567; source images https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44087711567/artifacts/14329958280. Before/after V197/V198 at 390px+1440px for selected Petreceri private; after all six widths, party click burst, DJ vinyl hovered, keyboard ArrowLeft, re-click, reduced motion, Lite, no-JS and actual photo decoding.
- Original screenshots were downloaded and inspected; visible new iconography at 390 and 1440. Owner aesthetic approval pending; no production deployment or main merge. **Documentation-only follow-up commits after this checkpoint require exact-head CI confirmation.** Next primary zone Contact.

## V198 / 2026-11-17 — Category-specific vector cues and real click motion (DRAFT)
- **Draft PR #197** https://github.com/WazzupDoc/green-sound-music-garden/pull/197, `design/v198-category-signature-cues`, stacked over V197 PR #196 source `45749fb6391f7ea92d9021f72fc3208094536554` (validated CI before V198). Do not modify main/deploy.
- New original iconography + short reactions: real 5 event types have rings, cradle, faders, beams and party confetti; 8 actual services have unique dedicated SVGs (DJ vinyl, band strings, sound speaker, smoke, studio wave, etc.). Event setlist selection replays effects even on reselect, keyboard Arrow/Home/End still selects, service list hover/focus includes DJ turntable animation. No new dependency, stock photos, external code, audio or fake backend.
- `CategorySignal.tsx` + route-scoped inline `category-signature-v198.css` used only /evenimente and /servicii; homepage four-section editorial contract untouched. Full-motion effects require explicit selection/hover/focus; reduced-motion and Lite static; SSR/no-JS native deep links remain.
- Vitest guard `category-signal-v198.test.tsx` plus `v198-category-cues-visual.yml` browser matched captures (before V197 / after V198 /evenimente 390/1440) and six widths, actual animated party frame + DJ hover, no-JS, keyboard and CSS computed. Artifact name `gs-v198-category-cues-real-chromium`. Browser evidence and exact-head QA **pending at this doc commit**, verify run/commit before reporting.
- Next rotation: Contact request prefill, clipboard accept/refuse, mobile and visual comparison, then footer/SEO. No main publication, tag/rollback work, or domain changes.

## V197 / 2026-11-17 — Event detail editorial rundown (DRAFT, PR #196)
- Branch `design/v197-event-rundown-editorial` stacked on V196 PR #195 (base `c9a25fabad1ef8041d31d5bea0348c9da4f0b495`). Focus: event detail /evenimente/$slug ONLY, no homepage/main/production changes.
- Actual source: `src/components/site/EventPage.tsx`, `src/routes/evenimente.$slug.tsx`, new SSR-inlined `src/styles/event-rundown-v197.css`. Existing real event moments become asymmetric production run-of-show with editorial green numeral and readable service deep links; mobile single column. No additional media, packages, external API or invented event details.
- Visual gate: `.github/workflows/v197-event-rundown-visual.yml` runs matched Chromium before V196 / after V197 on /evenimente/nunti at 390/1440, after 360/390/430/768/1440/1920; screenshots in `gs-v197-event-rundown-before-after` artifact. Inspect exact-head status and images before approving.
- Quality fixes: adjusted V178 semantic counter regression test to assert the new two-piece aria-hidden markup while preserving aria-label/role=img. The V197 browser focus assertion uses a short wait to account for asynchronous native fragment navigation; does not weaken required focus state.
- **Latest exact-head QA, screenshot, owner acceptance: NOT YET CONFIRMED.** Previous first V197 run 44083063388 failed old test; matching visual run 44083053995 found desktop focus timing failure. Later commits must be rechecked. Next rotation: Contact prefill/clipboard, then footer/SEO. PR #19 conflicts; no merge.

## V196 / 2026-11-17 — Event quote anchor keyboard focus (DRAFT)
- Branch `fix/v196-event-quote-keyboard-focus`, stacked on V195 PR #194. The hero's primary in-page quote link now transfers keyboard focus to the already focusable `#oferta-titlu` heading before native hash navigation, matching the two other event hero jump links. No homepage, assets, packages, forms, auto-send or main changes. Source SHA `e055d4816bfae3c984809112231459d8bfad7353`.
- QA: source change confirmed; Chromium before/after, keyboard focus and six-width regression, exact-head CI still require verification. No visual redesign claimed. Next rotation: Event interior composition and actual screenshot review.

## V195 / 2026-11-17 — Contact review ticket (DRAFT)
- Branch `fix/v195-contact-preview-contact-facts`, based on V194 PR #193. Contact preview now displays the actual phone, optional email and guest estimate before opening an external sending app. Values already entered by the visitor; no new collection, sending, API or dependencies. Source commit `b5c5acf23898d9bcfce2e42b4ec314ee31917c34`.
- **QA NOT VERIFIED:** matched real Chromium 390/1440 before-after, 360/430/768/1920 regression, form/clipboard/reduced-motion, TypeScript, SSR, Vitest, gzip, CI exact-head. No main/deploy. Next: real browser validation and event detail rotation.

## V194 / 2026-11-17 — Studio editorial console (DRAFT, unverified)
- PR #193 https://github.com/WazzupDoc/green-sound-music-garden/pull/193 ; branch `design/v194-studio-editorial-console`; source UI SHA `ef0a9ba1420aa9f75a4c24c75030598290c39c4d`.
- Studio-only visual change: asymmetric heading/signal console and process index with dark emerald contrast, mobile single-column fallback. Files: `src/components/site/ServicePage.tsx`, `src/styles/studio-editorial-v194.css`. No dependencies/assets/media; homepage untouched.
- **NOT VERIFIED:** screenshots before/after 390/1440, six widths, CSS computed, TypeScript, SSR, Vitest, gzip and CI exact-head. Do not merge. PR currently reports mergeable=false; stacked base is unvalidated V193. No main/deploy.
- Next: obtain actual Chromium artifacts and fix regressions before visual acceptance; next component Contact UX.


### V191 verified UI checkpoint / 2026-11-17
- Source/UI commit 8a5d826848736f2e91c766297ca97ba22d85cb12 passed full exact-head QA: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44041711279 (TypeScript, Vite/SSR, 47 suites/129 Vitest tests, client gzip budgets, six-width browser checks, Contact hydration and sitemap).
- Real matched Chromium workflow exact same UI commit PASSED: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44041706985 ; screenshot artifact https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44041706985/artifacts/14309761475.
- The artifact contains V190 before / V191 after screenshots on /portofoliu with unchanged initial film state at 390 and 1440, full film-section captures, responsive screenshots 360/390/430/768/1440/1920, Studio filter states and Lite/full-motion frames. Approved existing poster image decoded; YouTube still only loads after Play.
- CI measured: homepage entry gzip 125.4 kB (limit 190); client quote form 31.7 kB (limit 50); shared CSS 52.0 kB (limit 52, close to cap); not a Lighthouse field measurement.
- Owner visual approval pending; no CD audit, backup tag, main merge or production release. Next site area: Studio interior page.

## V191 / 2026-11-17 — Cinematic film registry (DRAFT)
PR #190 https://github.com/WazzupDoc/green-sound-music-garden/pull/190, branch design/v191-portfolio-cinema-registry, stacked on V190 PR #189. Focus: /portofoliu film archive ONLY; homepage remains untouched. Rebuilt media and playlist layout with original film perforation and authentic source-backed poster, selected title and caption, keyboard Arrow/Home/End and shareable ?film= URL, native filters and no autoplay. Original V161 photo gallery/lightbox preserved. No external packages, new images or paid services. New route-scoped CSS (portfolio-cinema-v191.css), Vitest source checks and matched real Chromium workflow (v191-portfolio-visual.yml). Visual correction after first browser capture: reduced excess first-fold type/spacing, ensuring real film visible. Functional correction after tests: TanStack Link uses aria-current=page; selected film now also uses data-current=true for truthful CSS. Legacy tests not disabled; updated assertions. Final exact-head CI/screenshots still require verification; no main merge or deployment. Next: /studio-inregistrari audit, then Contact.

## V190 / 2026-11-17 — Portfolio hero navigation focus (DRAFT)
Branch `fix/v190-portfolio-anchor-focus` stacked on V189 `design/v189-navigation-setlist`. Source SHA `62988c36ef9ca984e91ddec9dea2bffcef9949bc`. Native photo/film jump links now transfer keyboard focus to their headings; the films heading is programmatically focusable. This is a keyboard UX correction, NOT a visual redesign. Chromium before/after screenshots and exact-head CI are unverified; no merge, main or production change. Next: portfolio film filters/player and visual review.


### V189 browser-validated UI checkpoint (2026-11-17)
- UI SHA `f482e5a67f6f56b50b28e380330e0b31aedeac51` verified through full QA workflow https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44034682149 : TypeScript, SSR/Vite build, asset budgets, Vitest 46 files/125 tests, browser interactions six viewports, Contact SSR and sitemap checks PASSED.
- Before/after same route `/`, same 390/1440 viewport, native menu open, `Servicii` preview focused; real Playwright `chromium` workflow https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44034682037 PASS. Artifact https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/44034682037/artifacts/14306981193 contains 12 source PNGs (before/after 390/1440, after 360/390/430/768/1440/1920, motion and Lite at 390).
- QA-detected mismatch fixed: preview cue had described `Servicii` while `Acasă` stayed highlighted; `data-preview` now aligns visual emphasis to the focused destination without changing canonical page links.
- Remaining: visual owner review, accessibility screen-reader manual check, production approval and exact-head QA after any documentation-only commit. No main changes. Next rotation portfolio/video gallery.

## V189 / 2026-11-17 — Live Setlist navigation + QA repairs (DRAFT)
Branch `design/v189-navigation-setlist`, stacked on V188 draft PR #187. Primary zone: menu/header. Modified `src/components/site/SiteHeader.tsx`, introduced SSR-inlined `src/styles/navigation-v189.css`, and added `site-header-v189.test.ts`. Mobile nav has active channel cue, stagger-free sound-bar decoration (animation only in hover-capable full-motion), native dialog Escape/Tab, arrow/Home/End link navigation and clear close. Six canonical routes, Finder, Contact and homepage architecture retained. Incidental CI unblock: repair two broken Bun Vitest file URL tests and align two stale assertions with real Contact and event decode helper; no disabled tests. No new dependencies/media. Chromium matched screenshots, six-width QA, TypeScript/SSR/full CI exact-head pending; no merge or main/deployment. Next rotation: portfolio gallery + film states, only after browser QA.

## V188 / 2026-11-17 — Asymmetric service editorial (DRAFT)
Branch `design/v188-editorial-services-motion` stacked on V187. New `src/styles/home-editorial-services-v188.css` is SSR-inlined after the V170 home stylesheet in `src/routes/index.tsx`. Replaces the five equal service tiles with a varied CSS-grid editorial programme; preserves all eight direct service links, existing photos, 3 real films, CTA, keyboard access and reduced-motion/Lite gating. No packages/media/main/deployment. TypeScript, SSR, browser before/after 390/1440, six-width regression and exact-head CI not yet verified. Next: browser visual audit and mobile navigation.

## V187 / 2026-11-17 — Restore QA coverage for fix/feat branches (DRAFT)
Branch `design/v187-qa-branch-coverage`, stacked on V186. Updated `.github/workflows/verify-crafted-react.yml` to include `fix/v*` and `feat/v*` in push and PR branch filters; previously those branches could skip the full quality pipeline. No jobs removed, no homepage or media changes, no deployment. Exact-head CI and screenshot/browser status pending; not merge-ready. Next: Contact clipboard and Event detail browser QA.

## V186 / 2026-11-17 — Contact handoff wording (DRAFT)
Branch `fix/v186-contact-send-clarity` stacked on V185. The Contact journey step formerly labelled `SEND` now explicitly describes opening the external app and user-confirmed sending, consistent with the actual client-only quote handoff. No automatic send, new service, package, asset, homepage change or deployment. Source commit `4b357375a40d7853d3ca61e36593dcf5ea8c291e`. Exact-head CI, TypeScript, SSR, Vitest, real browser screenshots and keyboard/clipboard checks UNVERIFIED. Not merge-ready. Next: Contact clipboard and event-detail QA.

## V185 / 2026-11-17 — Event detail service shortcut (DRAFT)
Branch `feat/v185-event-service-shortcut` stacked on V184. Event hero adds a native fragment shortcut to the existing recommended-services section, with keyboard focus handoff and event-specific heading. No new services, media, packages, homepage sections or auto-send. Source commit `1ecdc269b6aecf0f9b582a2878c18ff65a942ca9`. TypeScript, SSR, Vitest, six-width Chromium matched before/after, reduced-motion/Lite and exact-head CI remain UNVERIFIED. Do not merge or publish. Next: real-browser event-detail screenshot/keyboard QA and Contact clipboard regressions.

## V184 / 2026-11-17 — Event timeline keyboard focus handoff (DRAFT)
Branch `fix/v184-event-timeline-focus-handoff` stacked on V183. The native "Vezi desfășurătorul" fragment link now focuses its already-focusable timeline target on activation, aligning keyboard focus with visual navigation; normal href remains functional without JS. No packages, images, homepage, auto-send or deployment. TypeScript, SSR, Vitest, six-width Chromium before/after and exact-head CI pending. Next: event detail visual composition and Contact regression QA.

## V183 / 2026-11-17 — Contact clipboard stale completion guard (DRAFT)
Branch `fix/v183-contact-clipboard-stale-result-guard` stacked on V182. Clipboard async completions from an abandoned preview are ignored using a generation token; a synchronous pending guard also blocks duplicate clicks before React renders. No new dependencies, assets, APIs, auto-send, homepage, main or deploy changes. QA pending: TypeScript, Vitest, SSR, Chromium 390/1440 and exact-head CI. Next rotation: /evenimente detail visual/browser audit.

## V182 / 2026-11-17 — Contact clipboard pending feedback (DRAFT)
PR https://github.com/WazzupDoc/green-sound-music-garden/pull/181; branch `fix/v182-contact-clipboard-pending-state`, stacked on V181. `QuoteForm.tsx` shows pending copy state, prevents repeated copy clicks while clipboard API resolves, and keeps explicit no-auto-send messaging. No new dependencies, media, homepage or production changes. TypeScript, Vitest, SSR, exact-head CI and matched real Chromium 390/1440 screenshots NOT YET VERIFIED. Next: clipboard success/denial and focus regression QA, then /evenimente audit.

## V181 / 2026-11-17 — Contact preview service/advice separation (DRAFT)
Branch `fix/v181-contact-preview-advice-separation` stacked on V180 PR #179. Preview ticket lists only actual services and shows advice as a distinct explicit request, matching the V180 8-service counter. No homepage, media, dependencies, backend or sending changes. TypeScript/SSR/Vitest/Chromium 390/1440 before-after/CI exact-head pending; do not merge. Next: Contact edit/clipboard QA.

## V180 / 2026-11-17 — Contact service selection clarity (DRAFT)
Branch `fix/v180-contact-service-count-clarity`, stacked on V179 PR #178. QuoteForm now excludes the optional advice choice from its visible 8-service counter, while showing an explicit recommendation-request indicator when selected. One focused source test added; no new dependencies or assets. Exact-head CI, TypeScript, SSR, Vitest and matched 390/1440 Chromium captures pending. No main/deploy. Next: Contact preview, edit and clipboard error QA.

## V179 / 2026-11-17 — Contact anchor focus (DRAFT)\nBranch fix/v179-contact-anchor-focus, stacked on V178 PR #177. The visible native "Începe cererea" anchor now focuses the actual form heading on activation while retaining fragment navigation. This improves keyboard/screen-reader continuity, does not send data or change the homepage. Source regression test added. Exact-head CI, real 390/1440 Chromium before/after, keyboard and six-width checks pending. No main/deploy. Next: full Contact form/preview interaction audit.\n\n## V178 / 2026-11-16 — Accessible event timeline counters (DRAFT)
Branch `fix/v178-event-timeline-accessible-progress` stacked on V177. Corrects a non-interactive `<span aria-label>` (not consistently exposed as a labeled accessible object) by giving the timeline counter a single semantic image role with accessible current/total label and hiding duplicate visual digits from assistive technology. Added source regression test. No media/dependency/homepage changes. CI exact-head, browser/assistive technology verification and screenshot comparison pending. Next rotate to Contact funnel; do not merge or publish.

## V177 / 2026-11-16 — Event detail timeline orientation (DRAFT)
Branch `feat/v177-event-detail-timeline-orientation` stacked on V176. Event-specific timeline now states its actual number of moments, exposes current/total step counters with accessible labels, and clarifies that service links lead to service details. Uses existing data and styles, no invented schedules, images, packages or homepage changes. CI exact-head and Chromium before/after 390/1440 pending; no visual QA or publication claim. Next: test mobile rendering and anchor focus, then rotate to Contact funnel.

## V176 / 2026-11-16 — Event detail agenda navigation (DRAFT)
Branch `feat/v176-event-detail-agenda-navigation`, stacked on V175. Event detail hero now provides a direct visible link to its event-specific timeline. Timeline has a stable fragment ID and accessible heading relationship, with programmatic focus target. No additional media, dependencies, homepage changes or external services. TypeScript, SSR, Vitest, Chromium screenshots at 390/1440 and exact-head CI pending; this is not a visual redesign or release approval. Next: check real browser focus and anchor navigation, then deeper event-detail editorial composition.

## V175 / 2026-11-16 — Event photo decode race regression (DRAFT)
Branch `fix/v175-event-image-race-regression`, stacked on V174 PR #173. Extracted cancellable decode helper and added three Vitest regressions: successful decode, rejected decode and stale completion after a newer selection. No homepage/media/dependencies/main/deploy changes. Exact-head CI and real browser captures pending; do not merge or publish. Next: event detail routes and matched mobile/desktop screenshots.

## V173 / 2026-11-16 — Live Show Poster /evenimente (draft)
**Review:** [Draft PR #172](https://github.com/WazzupDoc/green-sound-music-garden/pull/172), base V172 PR #171; one QA fail on 2026-11-16 was a case-sensitive Chromium assertion (`Botezuri` vs CSS-uppercased `BOTEZURI`), corrected in commit 46ce34f. Fresh exact-head browser and screenshot evidence must be checked before approving the V173 design. No main/deploy.
Branch design/v173-live-show-poster-events, stacked on validated V172 PR #171. Scope: event index only. New route-scoped event-show-poster-v173.css, real interactive 5-item setlist, moving shutter scene of existing original event photographs, large editorial type, real production cue sheet (first 3 event moments linked to existing services), contextual event-to-contact prefill. Native SSR direct links for all 5 event types. No external code/packages/photos, no music autoplay, no invented availability or sending. Full motion vs Lite/reduced, no JS and six-width visual QA added to V173 dedicated workflow. Exact-head screenshot/CI owner approval pending, draft only. main/domain/production unchanged.

## V172 / 2026-11-16 — Event direction console, DRAFT / not deployed
Branch `design/v172-event-direction-console`, draft PR #171: https://github.com/WazzupDoc/green-sound-music-garden/pull/171 ; stacked on V171 PR #170, which is stacked on V170 PR #169. /evenimente now shows an independent editorial dark-emerald composition, all 5 event types with client-interactive photo previews, event detail links available without JS, recommended real services and contextual prefilled Contact CTA. Original signal/equalizer/photographic transition CSS, prefers-reduced-motion and Lite safeguards, no additional dependency or asset. Homepage untouched. **CI exact-head, matched Chromium before/after screenshots and owner approval pending.** Main unchanged.

## V171 / 2026-11-16 — Contact prefill hardening (DRAFT)
Branch `fix/v171-contact-prefill-safety` stacked on V170; normalized location GET query strips Unicode bidi/control characters before populating the Contact form, with new regression tests. No home changes, assets, dependencies, backend, sending, main or deployment. CI exact-head, screenshot of malicious prefill and owner QA remain pending. V170 remains latest visual redesign candidate, not production approval.

## V170 / 2026-11-16 — Selected dark/green production reference in real React (DRAFT)
PR #169 https://github.com/WazzupDoc/green-sound-music-garden/pull/169 ; branch `design/v170-reference-green-production-experience` on V168. Active home is `ConceptHomeV170.tsx` + independent `home-reference-v170.css` (one SSR-inlined stylesheet in `src/routes/index.tsx`), replaces rejected V166/V168 page visuals without modifying interior routes. Code includes stage photo from existing catalogue, responsive creative mixer motif/animated stage beams/EQ/wave, CTA, 5 featured original-service photo cards + 3 remaining genuine service links, 4-step process, 3 first-party film posters and click-to-Play Dialog, photographic final CTA. CSS disables movement for prefers-reduced-motion/Lite and pauses offscreen/hidden tab; no new assets, external libraries or fake project statistics. Tests updated, six-width Playwright screenshots and interactions in `.github/workflows/v170-concept-qa.yml`; existing `.github/scripts/verify-crafted-browser.cjs` was rewritten for the real V170 contract while preserving header, portfolio, Contact, sitemap, six-viewpoint and other routes coverage. First verified V170 screenshots: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43883251587/artifacts/14234240176 . **Status:** draft, final latest-head CI and owner's visual approval pending; main and domain not changed. Must use latest exact SHA workflow rather than assume previous green run validates later visual edits.


## V169 / 2026-11-16 — original signal-console foreground, V168 draft stack
On `design/v168-dark-live-editorial-rebuild`, PR #168: original inline-SVG/CSS sound desk layered over the existing authorized concert image at desktop; no replacement media, no new deps. Mobile first-fold empty zone reduced, desk hidden below 900px. Light signal animation obeys existing light on/off and CSS reduced-motion/Lite; no sound/video autoplay. V168 baseline screenshot https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43869742219/artifacts/14226674395. After screenshot/CI status must be verified on exact head; no production merge.

## V168 / 2026-11-16 — Dark live editorial, V166 REJECTED (DRAFT)
Branch `design/v168-dark-live-editorial-rebuild` / PR #168 https://github.com/WazzupDoc/green-sound-music-garden/pull/168 ; stacked on `fix/v167-mobile-editorial-type-safety` (V166 changes kept only as historical base). New independent `ProductionHeroV168.tsx` and `home-v168-dark-live.css`; home route imports **only** V168 stylesheet. Changed from rejected V166: dark full-bleed verified project event photo / uppercase italic headline `EVENIMENTE / DE NEUITAT.`, unboxed film + offer actions, visually subordinate Light Desk, original scene mode selector, paper 3-chapter/8-service programme, distinct sage 3-film archive and emerald final single CTA section. All actual links/media/SSR and user-controlled film/light functionality preserved. Added no media, dependency, backend or cost.
Validation still needed until CI exact-head/browser six widths and before-after 390/1440 are available; owner approval NOT granted. Do not merge or deploy. Next: inspect V168 browser screenshots, revise weak first-fold if needed, then Events/Services interiors.

## V166 / 2026-11-16 — Independent photographic editorial homepage (DRAFT / QA PENDING)
Branch `design/v166-real-editorial-rebuild` stacked on V165; new page-scoped `home-rebuild-v166.css`, new `ProductionHeroV166.tsx`, `src/routes/index.tsx` switches to V166 and stops importing V160/V165 homepage CSS. Photo/right editorial-paper/left layout, mobile photo-first through 900px, asymmetrical all-eight-services chapters, actual 3-film archive and one final CTA; native scene/Light Desk/visitor-started film preserved. New source regression test `src/test/home-v166-rebuild.test.ts`. Browser 390/1440 before/after, six viewport QA, accessibility interaction, image decode, TypeScript, Vitest, SSR, gzip and exact-head CI **PENDING**, aesthetic acceptance not implied. Main/deploy unaffected. PR / exact SHA to record after PR created. Next area: same-route Chromium screenshots and correction, then interior /evenimente.

## V161 / 2026-11-16 — Portfolio editorial cinema, actual browser QA (DRAFT)
Branch `design/v161-portfolio-cinema-editorial` stacked on V160 code HEAD `2d48387b600f6c9ee42cb38bf42d41928e048787`, PR https://github.com/WazzupDoc/green-sound-music-garden/pull/161. **Source code SHA `d0807a92684a2cecdfa465c827aa4a312fc94795` PASS** https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43841889878 — TS, SSR, gzip, 39 suites / 107 tests, Chromium six widths, real image decode, filters, photodialog keyboard/mouse and real film selection, Contact/sitemap audit. **Real BEFORE** V160 baseline screenshots: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43839890033/artifacts/14212193082; **real AFTER** same route/viewports: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43841889878/artifacts/14213841423. Changed source: `src/routes/portofoliu.tsx` genuine documentary hero, `src/styles/portfolio-directors-cut-v161.css` original responsive photography atlas & six-film storyboard, `src/components/atelier/RegiaPortfolio.tsx` genuine film poster thumbnails, indexing and repaired dialog ArrowRight/Home/End listener. All existing six photo IDs, filters, real films, URL search params and QuoteSection remain. No external dep/media, new database or automatic send. Photo visual approval still pending; mobile fixed contact overlay not addressed. Do not merge/deploy without owner signoff and production/backup/tag checks. Next: mobile sticky action bar.

## V160 — VERIFIED SOURCE / 2026-11-16 (OWNER REVIEW PENDING)
Draft https://github.com/WazzupDoc/green-sound-music-garden/pull/160 ; code SHA `cedecf6e1f60c888b7b509f038e8a8cab4220612` passed [exact-source Actions CI](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43838469647) with TS, production SSR, gzip caps, 38 suites / 104 tests, real Chromium six widths and photo decode/interaction, Lite and reduced-motion, Contact SSR, sitemap/SEO internal-link audit. Verified **V159 BEFORE** screenshots https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43833856279/artifacts/14209737691 ; **V160 AFTER** real screenshots https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43838469647/artifacts/14212445972 . Real screenshot image names: `v160-hero-390.png`, `v160-hero-1440.png`, `editorial-home-390.png`, `editorial-home-1440.png`, `v160-films-390.png`, `v160-films-1440.png`, plus 360/430/768/1920 proofs. Fully new independently authored hero component and one stylesheet without V86/V89/V158/V159 route imports; no new resources, media, costly deps, fake backend claims or auto-play. **Aesthetic owner approval unconfirmed**; mobile sticky action bar overlap to revisit. Do not merge/publish without owner approval + CD, backup tag, rollback procedure; main/production untouched. Next rotation: /portofoliu and media provenance.

## V160 — 2026-11-16 — Green Sound independent homepage (DRAFT)
Branch `design/v160-cinematic-production-home` stacked on owner-rejected V159 `aecc4f2220e9b027d33f48b66ce9e97cce6d5b4a`, no main merge. New semantic `ProductionHeroV160.tsx`, single `home-direction-v160.css?inline` import; four old home CSS layers removed from active route. Hero now original dark-emerald cinematic documentary/event source photo with user-controlled three event modes, actual original videos and Light Desk. Services displayed as 3 asymmetrically arranged full-width source media chapters containing all 8 links, 3 real film choices and one final CTA. **No new homepage widgets/forms, new assets, backend or packages.** Full six-width Chromium screenshot audit/visual before-after comparison at 390px and 1440px required against V159 archive https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43833856279/artifacts/14209737691. CI on current head PENDING; owner acceptance not assumed. Mobile first-screen photograph crop and squeezed film-list found via first browser proof and repaired; verify exact latest revision. No publish. Next /portofoliu and photo provenance.

## V159 VERIFIED BROWSER SOURCE / 2026-11-16 (still draft)
New project homepage art direction `design/v159-studio-poster-home`, code SHA `a8ed723358e879da5b5f79a3ed232a35817e3c73` from V158. **GREEN** full source CI: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43833856279 : TS, SSR, 38 Vitest suites/104 tests, six-width actual Chromium and Contact/sitemap audits. BEFORE screenshots V158 https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43830465643/artifacts/14207949179 ; AFTER screenshots V159 https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43833856279/artifacts/14209737691 ; exact `show-wall-v90-hero-390.png`, `show-wall-v90-hero-1440.png`, and `editorial-home-[six widths].png`. Poster-scale type, single authorised event photograph, explicit responsive line text-bound checks and real interactive mode, dark production index, light film archive, emerald single-CTA finale. No dependencies, costs, site-public changes, invented media/claims. Browser-found title clipping and mobile link contrast defects fixed. **Owner visual approval pending; not for merge or production deployment**. After this documentation-only commit recheck CI on exact HEAD. Next /portofoliu page and photo provenance.

## V159 / 2026-11-16 — Studio poster homepage (DRAFT, visual validation pending)
From base V158 `0dd469e927646970ee1db4187f26101dd5b4d2c3`, branch `design/v159-studio-poster-home`. Major first-screen rebuild with true black-on-paper oversized title and unframed real concert photograph; previous collage/ticker no longer visible; hero actions, native scene mode photo switch, real reel & Light Desk retained. Four-section homepage contract retained (hero, 3/8 services, 3 real films, one final CTA). New section contrast: dark service catalogue, off-white real film archive, deep emerald finale. No new assets, libs, costs or backend. Unit and browser visual gates updated without disabling checks. Matched baseline real screenshot before at V158: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43830465643/artifacts/14207949179 . Latest after screenshot/CI **PENDING** — do not claim verified, do not merge/publish. Next priority: resolve browser issues, verify 390/1440 and six widths, owner aesthetic review, then /portofoliu.

## V158 / 2026-11-16 — Major homepage editorial composition, VERIFIED CHROMIUM SOURCE (DRAFT)
Visual source commit `5bc786b7fa6dca9d924d161939d5c8641aa640f9` / PR #158 https://github.com/WazzupDoc/green-sound-music-garden/pull/158. **GREEN** exact-source push CI https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43829913172 and PR CI https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43829920555. 37 suites/101 Vitest tests, TypeScript, production SSR, gzip caps, six real Chromium viewports, Contact hydration, public-page/sitemap audits. Real screenshot after: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43829913172/artifacts/14208147526 (`editorial-home-390.png`, `editorial-home-1440.png`). Matched before screenshots from V157: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43823453178/artifacts/14205532328. Significant difference observed: new cinematic photo-led hero, warm ivory production catalogue with 3 asymmetric chapters/8 service links, dark 3-film cinema and pale single-CTA finale. No new media/dependencies/backends; old pages and full functionality preserved. Screenshot page heights: 1440 full-page 4593→6053px, 390 full-page 6590→6811px; longer desktop experience is an explicit tradeoff pending owner review. Owner approval and field CWV not established. Do not publish automatically; main untouched. Next: Portfolio/media audit.

## V158 / 2026-11-16 — MAJOR homepage editorial overhaul (DRAFT)
New feature branch `design/v158-home-editorial-overhaul`, base V157 head `815d054f4d019ee70bc7af0f2a2f39f7dc41be68`. New `src/styles/home-redesign-v158.css`, SSR-inline `src/routes/index.tsx`; original single-photo hero, typographic spread, compact photo-film strip, visually distinct warm-ivory magazine services, cinema films and expansive one-CTA finale. Real first-party images, original components, 3 chapters/8 direct links, 3 authentic films and one CTA preserved; no new homepage sections, media, libraries, backend or claims. Browser QA script gates updated to test actual V158 visual dimensions and responsive interaction rather than old V89 pixel values; unit contract added. **BASELINE** screenshots V157: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43823453178/artifacts/14205532328 (`editorial-home-390.png`, `editorial-home-1440.png`). **AFTER** Chromium screenshots, exact-head CI, image comparisons and owner visual approval still pending. Do not merge or deploy automatically; no production/main changes. Next zone: full-site Portfolio/media with no unapproved TikTok/social exports.

## V157 verified source QA / 2026-11-16
Draft PR #157 https://github.com/WazzupDoc/green-sound-music-garden/pull/157 ; UI+browser-test source SHA `5558b7d3692c8b3a9892b0c53bcc5b25d3125a4f`. **GREEN** GitHub Actions https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43823017968 : typecheck, production SSR build, asset gzip budgets (CSS 52.0 / 52 kB), 36 test files/98 passing tests, six viewport browser audit, Contact hydration and sitemap audit. Real after-state Chromium screenshots at 390px and 1440px: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43823017968/artifacts/14204369475 , files `v157-contact-intro-390.png` and `v157-contact-intro-1440.png`. **No equivalent V156 before-state captures**; not an honest before/after comparison. Owner visual approval and staging field CWV unverified. Follow-up after QA: fix stale deep-link expectations in browser audit, no tests disabled; initial 52.1 kB CSS failure repaired without changing budget. No main/deployment/domain change. Next: obtain exact baseline Contact screenshots and rotate to Portfolio/media review.

## V157 / 2026-11-16 — Contact production signal path (DRAFT)
Branch `design/v157-contact-signal-path` stacked on V156. `/contact` hero now contains a first-party editorial three-step signal path (details → message review → visitor-controlled sending), a visible keyboard-accessible in-page CTA to existing `#contact-form-title`, and CSS-led cue lines replacing the generic concentric decoration. Two-column form, Contact prefill, real WhatsApp/email/copy flow, SSR and homepage remain unchanged. CSS is in the existing `src/styles.css` import graph; no packages/media/assets introduced. Source regression test added. **NOT RELEASE-READY**: no real before/after Chromium images 390/1440, six viewport QA, keyboard focus/fragment, TypeScript/SSR/Vitest/gzip or exact-head CI confirmed at doc write. Do not merge or deploy. Next: capture Contact before/after and test focus/anchor, validate CI, then rotate to portfolio/media provenance.

## V156 / 2026-11-16 — Fix Vitest file URL scheme (DRAFT)
Branch `fix/v156-vitest-file-url-scheme` stacked on V155. GitHub Actions V155 run 43813721236: TypeScript, SSR build and gzip passed; Vitest failed before executing `src/test/not-found-recovery.test.ts` with `ERR_INVALID_URL_SCHEME`. Replaced `fileURLToPath(new URL(..., import.meta.url))` with `resolve(process.cwd(), "src/components/site/StageFallback.tsx")` in this source-reading test. No product UI, dependency, asset, main or deployment change. CI exact-head and Chromium screenshots pending. Next: verify new CI, investigate any further test failure, then browser QA for /evenimente and Contact.

## V155 / 2026-11-16 — Events long action label (DRAFT)
Branch `fix/v155-events-reset-mobile-width` on V154. The long reset-recommendations button may overflow even inside a flex-wrap row. Added width constraints and text wrapping for narrow/mobile layouts; clear action constrained too. No new assets/dependencies or homepage/main/deploy changes. Screenshot before/after 390/1440, six widths, TS/SSR/Vitest/gzip and exact-head CI NOT VERIFIED. Prior V153 Vitest failed; do not merge.

## V154 / 2026-11-16 — Events action layout (DRAFT)
Branch `design/v154-events-action-layout` stacked on V153. Reset/clear service actions now use wrapping flex layout with consistent spacing instead of inline fixed margin, to improve narrow screens. Source regression test added. Previous V153 exact-head CI failed in Vitest; V154 TypeScript/SSR/Vitest/gzip/Chromium/CI exact-head and 390/1440 before-after screenshots not yet confirmed. No homepage/main/deploy changes.

## V153 / 2026-11-16 — Events clear selection (DRAFT)
Branch `design/v153-event-selection-clear` stacked on V152. EventSoundcheck adds a visible native button to clear all selected services while preserving event and optional form fields; disabled if empty. Source commit `1f04106fed7c4bf4af9390d38ecf7907e8f0bedf`. No homepage/assets/dependencies/main/deploy changes. Real browser screenshots, six-width QA, TS/SSR/Vitest/gzip and CI exact-head NOT VERIFIED. Next: browser evidence and regression test, then Contact/SEO.

## V152 / 2026-11-16 — Explicit phone action in fallback (DRAFT)\nBranch `fix/v152-error-phone-action-clarity` stacked on V151. The error/404 phone link now reads `Sună-ne: [număr]` rather than an unexplained number; actual tel href unchanged. Source regression assertion added. No assets/dependencies/homepage/main/deploy. Browser before/after, six-width regression, TS/Vitest/SSR/gzip and CI exact-head not verified. Next: real Chromium and HTTP fallback audit; Events interiors.\n\n## V151 / 2026-11-16 — Error recovery Contact route (DRAFT)
Branch `fix/v151-error-fallback-contact-path` stacked on V150. Render-error screen now exposes a direct Contact form link, instead of requiring Home or phone. Regression source test added. No new packages/assets/homepage/main/deployment. Chromium before/after 390/1440, six widths, TS, SSR, Vitest, gzip, CI exact-head NOT VERIFIED.

## V150 / 2026-11-16 — Neutral error heading (DRAFT)
Branch `fix/v150-error-fallback-neutral-heading` stacked on V149. Generic render errors no longer claim a network connection was lost. Regression source assertion updated; no assets/dependencies/homepage/main/deploy. CI exact-head, TS, SSR, Vitest, gzip, 390/1440 browser before/after and six widths NOT VERIFIED.

## V149 / 2026-11-15 — Error fallback copy matches real actions (DRAFT)
Branch `fix/v149-error-recovery-copy-truthfulness` stacked on V148. When retry handler exists, guidance offers retry; otherwise offers Home/phone, avoiding impossible instructions. Source regression assertion; CI exact-head, TypeScript, SSR, Vitest, gzip, Chromium before/after 390/1440 and six widths NOT VERIFIED. No main/deploy.

## V148 / 2026-11-15 — Error fallback retry guard (DRAFT)
Branch `fix/v148-error-retry-guard` stacked on V147. Prevents displaying an inert `Reîncearcă` button if optional `onRetry` callback is not supplied; existing recovery routes preserved. Source test updated. Browser screenshots, six widths, TS/SSR/Vitest/gzip and exact-head CI UNVERIFIED. No main/deploy.

## V147 / 2026-11-15 — Footer social navigation (DRAFT)
Branch fix/v147-footer-social-external-cue stacked on V146. Visible arrow and screen-reader new-tab cue on footer social links. Source test added; Chromium screenshots, six widths, TS/SSR/Vitest/gzip and exact-head CI unverified. No main/deploy.

## V146 — Not-found recovery routes (DRAFT, 2026-11-15)
Branch `fix/v146-not-found-recovery-navigation` stacked on V145. 404 copy now identifies the missing page, with direct real links to Services, Events and Contact brief plus existing Home/phone. Error retry remains isolated. Added `src/test/not-found-recovery.test.ts`. No homepage, new dependencies, media, backend or main changes. Real Chromium before/after 390/1440 and six widths, HTTP 404/SSR status, TS, Vitest, build, gzip and exact-head CI NOT VERIFIED. Next: actual 404 browser/HTTP QA and SEO audit.

## V145 — Mobile conversion bar (DRAFT, 2026-11-15)
Branch `fix/v145-mobile-action-bar-accessibility` stacked on V144. Mobile sticky bar now provides explicit focus-visible styles, descriptive accessible names, minimum target height and direct Contact form anchor. No homepage section, backend, package, asset or main changes. Chromium before/after 390/1440, six-width QA, TypeScript, SSR, Vitest, gzip and exact-head CI NOT VERIFIED. Next: verify mobile focus, fragment and bottom-bar overlap in real browser.

## V144 — Footer directory landmarks (DRAFT, 2026-11-15)
Branch `fix/v144-footer-directory-landmarks` stacked on V143. Footer link directories now use three labelled native navigation landmarks. No visual layout changes, new dependencies or assets; test asserts landmark count and closure. CI exact-head, browser before/after and six widths unverified. Main/production unchanged. Next: Contact fragment focus and real browser QA.

## V143 — Footer Contact anchor regression (DRAFT, 2026-11-15)
CI V142 exact-head failed (run 43727508158): 1/88 tests failed because footer test expected a bare /contact link while actual footer correctly targets hash=contact-form-title. V143 updates the test assertion to preserve deep-link-to-form behavior; no production component or homepage change. Browser screenshots and V143 CI pending. Main untouched. Next: footer visual QA and Contact hash navigation.

## V142 — Studio editorial signal (DRAFT, 2026-11-15)
Branch `design/v142-studio-session-timeline` stacked on V141. `/studio-inregistrari` now has a dedicated recording-inspired editorial title and original static waveform SVG in its preparation header; no audio playback, assets, dependencies or homepage changes. Browser before/after 390/1440, six-width regression, TypeScript, SSR, Vitest, gzip and exact-head CI NOT VERIFIED. Main/production unchanged. Next: Studio visual QA, then footer audit.

## V141 — Event Soundcheck restore recommendations (DRAFT, 2026-11-15)
Branch `design/v141-event-soundcheck-reset` stacked on V140. Event configuration now offers a native touch-sized button to restore recommended services after customization; disabled when no reset needed. Source commit `fa6ecf2c9c0001d0f2321b54b197d6e3f9f6412c`. No homepage/backend/assets/dependencies changes. Chromium screenshots before/after, six widths, TypeScript, SSR, Vitest, gzip and exact-head CI NOT VERIFIED. Next: Events browser proof and Studio audit. Main/production unchanged.

## V140 — Contact optional date clarity (draft, 2026-11-15)
Branch `fix/v140-contact-optional-date-clarity` stacked on V139. Date input now explicitly says optional, has accessible explanatory text, and uses light/dark native date-picker color scheme. Code commit `9bb9d99dafe4a53d4ebad2fcbfa520bd541fa713`. No backend, dependency, asset, homepage or production changes. Browser before/after screenshots, six-width regression, TypeScript/SSR/Vitest/gzip and exact-head CI NOT VERIFIED. Next: get actual browser preview/captures and check Contact form keyboard/validation.

## V139 draft PR #139 branch fix/v139-contact-consent-link-separation. Consent privacy link is no longer nested in checkbox label. QA not verified; no main/deploy.

## V138 — Portfolio cancelled/multitouch gesture guard (DRAFT)
Branch `fix/v138-photo-multitouch-cancel-guard` stacked on V137. Code commit `d41bffb16d8dff21bf9a7789402a71926c590241`. Touch cancellation and multi-finger gestures cannot advance the photo. QA and exact-head CI NOT VERIFIED; no browser before/after screenshots produced. No main/deploy changes. Next: Contact form audit.

## V137 — Photo swipe direction guard (DRAFT; QA pending)
PR #137 branch `fix/v137-photo-swipe-axis-guard` stacked on V136. Horizontal gesture guard prevents vertical dialog scrolling from advancing photos. Code SHA `d4111f6e8ad3c6cf744cced7c3d6d27cd8db4022`. No new assets/dependencies/homepage changes. Real-browser screenshots, touch gesture QA, TS/SSR/Vitest/gzip and exact-head CI not verified. Main unchanged.

## V136 — Photo deep-link focus provenance (DRAFT; QA pending)
Branch `fix/v136-portfolio-dialog-focus-origin` stacked on V135. On direct photo URL there is no originating thumbnail: closing the dialog focuses the gallery heading instead of assuming the photo thumbnail initiated it. A clicked thumbnail still receives focus on close after image navigation. Code SHA `cccb5656dbdbd018a9dd211ed7d4bf33c4d91e5f`. No assets, dependencies or main changes. TypeScript, SSR, Vitest, gzip, Chromium six widths, before/after screenshots and exact-head CI unverified. Next: real-browser keyboard/deep-link QA.

## V133 — Portfolio selected-film feedback (DRAFT; QA pending)
Branch `design/v133-portfolio-film-selection-feedback` stacked on V132. Shows selected film title and position within active category as visible polite status; player stays click-to-play. Code SHA `741bf4cf0981d72b31c0ab24480948dbd0922af9`. TypeScript/SSR/Vitest, Chromium 390/1440 before/after and other widths, gzip and exact-head CI pending. No main/deploy change.

## V132 — Contact invalid-submit focus (DRAFT; QA pending)
Branch `fix/v132-contact-invalid-submit-focus` stacked on V131. Invalid quote submit focuses the first erroneous field; service group uses first enabled checkbox because Controller does not expose a registered ref. No auto-send or new dependencies. Source SHA a95249a0449a0dbde157b0d8847a736a9d206235. Exact-head CI, TS/SSR/Vitest, Chromium and screenshots pending. Main unchanged.


## V131 — Contact services aria-describedby (DRAFT, QA pending)
Branch `fix/v131-contact-services-error-reference` stacked on V130 PR #130. Fixes dangling q-services-err ID on service fieldset until a validation error exists; permanent guidance remains associated. Source SHA `7283d479c3c85b27bd22d56c260caed22b308603`. No visual redesign claim. Real browser screenshots, six widths, TS/SSR/Vitest/gzip and exact-head CI unverified. Main/production unchanged.

## V130 — Footer direct brief (DRAFT; QA pending)
Branch `design/v130-footer-direct-brief` stacked on V129 PR #129. Footer primary CTA now lands on existing SSR Contact brief heading `#contact-form-title`, with clear action wording. No backend, media, dependencies or homepage sections. No real-browser screenshots, TS/SSR/Vitest or exact-head CI verified. Main and production unchanged.

## V129 — About production score and quote funnel (DRAFT; QA pending)
Branch `design/v129-about-production-route-brief` stacked on V128 PR #128. `/despre-noi` production list now has a connecting editorial score/rail, alternating typographic rhythm, short practical introduction and a closing Contact CTA linked directly to `#contact-form-title`. Original images retained; no homepage, dependencies, backend or production changes. CI exact-head, TypeScript/SSR/Vitest, Chromium six-width and before/after 390/1440 screenshots NOT verified. Next: browser proof, then footer.

## V128 — Event quote CTA direct form anchor (DRAFT; QA pending)
Branch `fix/v128-event-quote-direct-form-anchor` stacked on V127. `/evenimente` event-specific quote actions now include `#contact-form-title` so users arrive at the actual Contact form area, not the top intro. The target heading is SSR-rendered, focusable with `tabIndex=-1` and `scroll-mt-28`; ClientOnly form behavior and allowlisted event prefill are unchanged. No assets/dependencies/main changes. Chromium 390/1440 before/after, six-width, TS/SSR/Vitest and exact-head CI not yet verified.

## V127 — Event index contextual CTA focus / 2026-11-15 (draft)
Branch `design/v127-event-index-contextual-cta-focus` stacked on V126. Event-specific quote action accessible label; both action focus states visually connect to event photo; hover responds to either CTA; mobile tap targets strengthened. No assets/dependencies/homepage changes. CI, browser screenshots and test suite not verified. Main untouched.

## V126 — Event index editorial conversion CTA / 2026-11-15
Branch `design/v126-events-direct-brief-actions` stacked on V125. Each existing event chapter now provides a second, visually differentiated CTA that opens `/contact` with its actual event form label URL-encoded; existing event-detail link remains. CSS includes mobile full-width, focus visible and reduced-motion. No assets or dependencies. CI exact-head, TS/SSR/Vitest and browser screenshots 390/1440 plus other widths pending; no main/deploy changes.

## V125 — Photo gallery category-aware lightbox (DRAFT; QA pending)
Branch `fix/v125-portfolio-photo-filter-dialog-navigation` stacked on V124. Photo lightbox previous/next, keyboard arrows, touch swipe and counter now follow visible category. URL-linked photo outside active category stays accessible by displaying All. Source SHA `01643e6ea4d5c3e2b2e80cdbfc171bfc20905f35`. Browser screenshots and exact-head CI not verified. Main untouched.

## V124 — Portfolio deep-link/filter reconciliation (DRAFT; QA pending)
Branch `fix/v124-portfolio-film-deeplink-filter-reconcile`, stacked on V123 PR #123. Derives visible film category from the selected URL film so browser history/deep links cannot leave the list and player inconsistent. No new assets/dependencies; no main changes. Exact-head CI, TS/SSR/Vitest/gzip, Chromium screenshots 390/1440 and six-width QA pending.

## V123 — Portfolio film filter / draft QA pending
Branch `fix/v123-portfolio-film-filter-url-state`, stacked on V122. Film category selection now updates the shareable URL to the matching video and no longer resets the category on every film query change. Source commit ba1eaa7fc953450d419d319b8fe960e32564af6e. Browser screenshots, six-width checks, TypeScript/SSR/Vitest/gzip and exact-head CI not yet verified. No assets, dependencies or main changes.

## V121 — Contact conditional validation references (DRAFT, QA pending)
Branch `fix/v121-contact-conditional-error-links`, draft PR [#121](https://github.com/WazzupDoc/green-sound-music-garden/pull/121), based on V103 PR #120. Fixes four stale `aria-describedby` references in Contact fields. Source SHA f553e7fea53114e3308b2d14ccd3bafef4432bdd; docs updates advance HEAD. No assets/packages/backend. Real Chromium 390/1440 before/after, six widths, TS/SSR/Vitest/gzip and exact-head CI not verified. No main/deploy changes. Next: film/video accessibility.

## V103 — Contact preview focus (DRAFT; QA pending)
Branch `design/v103-contact-preview-focus`, PR [#120](https://github.com/WazzupDoc/green-sound-music-garden/pull/120), stacked on V102. Fixes focus after preparing/editing a quote. No new assets, packages or backend. Real screenshots 390/1440, TS/SSR/Vitest and exact-head CI not yet verified. Main untouched.

## V102 — Gallery dialog focus restoration (draft, QA pending)
Branch design/v102-gallery-focus-return based on V101. On closing lightbox, restore focus to corresponding visible photo thumbnail or gallery heading when deep-linked/filtered. Code SHA ae2a4503ce3491e74d789fd1d36d59be18375309. No new assets/dependencies. Real browser screenshots and exact-head CI not verified; no production/main changes.

## V101 — Portfolio photo announcements (draft; QA pending)
Branch `design/v101-gallery-dialog-announcements` stacked on V100. Adds live current-photo status and descriptive navigation button labels. No visual redesign claim; screenshots, six-width Chromium, SSR/TS/Vitest/gzip and exact-head CI not yet confirmed. Main unchanged.

## V100 — Portfolio keyboard navigation scope (draft, QA pending)
Branch design/v100-gallery-keyboard-scope stacked on V99. The photo lightbox now handles arrows only inside its dialog and respects text entry and modifier keys. Code commit 884160aabe6bce2ed00189b4cacf734a86923106. No new dependencies/media; no main/deploy change. Chromium before/after, six-width QA, TS/SSR/Vitest/gzip and exact-head Actions unverified. Next: filter and focus regression.

## V99 — event quote fragment keyboard focus (draft, QA pending)
Branch: `design/v99-event-quote-anchor-a11y`, stacked on V98 PR #97. The shared QuoteSection heading now supports fragment focus and sticky-header offset with focus-visible affordance. Source commit d515fe3cc9fcad448e5a112cf4ccb0219a77a1fc (docs commits will advance HEAD). Real-browser screenshots, six-width regression, TypeScript/SSR/Vitest and exact-head CI are not confirmed. No main/deploy changes. Next: gallery and film pages after QA.

## V98 — Event-specific quote CTA (draft; QA pending)
- Branch: `design/v98-event-quote-context` on V97 draft. Main untouched.
- Area: individual event detail pages (`EventPage.tsx`).
- Defect: generic PageHero CTA navigated to /contact, losing the event-type prefill already implemented in the same page's QuoteSection.
- Fix: event-specific hero CTA links to the existing `#oferta-titlu` section, preserving defaultEventType and form state; secondary CTA uses the verified business telephone link.
- No new dependency, image, backend, autoplay, or fabricated events. Homepage contract untouched.
- QA pending: test each event route, anchor and form prefill, keyboard focus, 390/1440 before-after screenshots, all six widths, SSR, TypeScript, Vitest, gzip and exact-head Actions. No CI or screenshot claim until confirmed.
- Next: portfolio gallery and event visual layout after V98 QA.


## V97 — Contact denied clipboard retry (draft, QA pending)
- Branch `design/v97-contact-repeat-copy-focus` stacked on V96 draft PR #95; V96 CI success run 43458490804, artifact 14054593562 (not yet visually inspected).
- Retry of failed clipboard copy now re-focuses and selects fallback even if error state was already active.
- CI exact-head, browser 390/1440 before/after and 6-width regression still required. No production/main changes.
# V96 — Contact clipboard recovery / DRAFT 2026-11-13

- Base: V95 branch design/v95-about-production-notes; not assuming CI status for V95.
- Single audited area: Contact / Guided Event Brief, specifically denied/unavailable clipboard permission after the user prepares a quote.
- Observed source defect: a fallback textarea was rendered after copy failure but focus remained on the failed Copy button; keyboard users had to find the fallback manually.
- Implementation: src/components/site/QuoteForm.tsx adds a textarea ref and a state-driven effect to focus and select the entire fallback text after failed clipboard write. Success path unchanged. No automatic sending, new dependency, backend or tracking.
- QA pending: Chromium deny clipboard and verify focused textarea + selection, retry/edit, 390/1440 screenshots and six-width regression, TypeScript/Vitest/SSR and exact-head CI. This is a functional accessibility improvement, NOT a visual redesign. No screenshot or green CI claimed.
- Main/deployment unchanged. Do not merge without full CI, conflict check, backup/rollback and release consent if auto-deploy.


# V95 — About production notes / DRAFT 2026-11-13
- Base V94 navigation PR #93 exact-head SHA 2a262984, workflow #43448478890 successful. Selected real route `/despre-noi` (not a nonexistent `/studio`). Original editorial layout, dark photographic hero, cream statement, numbered production steps and practical Contact closing. No changes to homepage structure, backend, third-party packages or production.
- Branch design/v95-about-production-notes. Source CSS SSR-inline, reduced-motion/Lite guards and semantic test. CI exact-head and real Chromium before/after still REQUIRED before visual acceptance. PR #19 remains conflicted; main untouched.

# V94 — Navigation production cue / draft 2026-11-13
- Base V93 footer branch (exact-head green), isolated branch design/v94-navigation-editorial-cue. Rebuilt full-screen native mobile menu as an editorial emerald production cue: dynamic selected route preview (desktop), full-row hover/focus, bolder asymmetrical typographic hierarchy and reduced/Lite motion guards. Functional fix: route navigation no longer forces keyboard focus back to a hamburger that may be hidden after a route change; Escape/close still returns focus. Finder and existing routes remain unchanged.
- Real Chromium screenshot targets: v94-navigation-open-390.png, v94-navigation-open-1440.png, v94-navigation-focus-390.png, v94-navigation-focus-1440.png, plus 6-width existing regression. Before reference: stage-index-open-390.png from V93 CI artifact. New exact-head CI and visual verdict pending. No main/deploy change.

# V93 — Footer Editorial Signal (draft, 2026-11-13)
- Branch design/v93-footer-editorial-signal, based on validated V91 e8e3296, separate from concurrent V92 Contact and service-stage branches.
- Single audited component: global SiteFooter. Added high-contrast original brand-scale type, direct Contact conversion and retained all functional footer routes, real business channels, privacy and Light Desk. No dependency or fake media.
- New browser regression captures footer at 390/1440 and checks 360/390/430/768/1440/1920. Screenshot and exact-head CI pending; do not merge/publish. Before/after comparison pending artifact. PR #19 conflict persists. Main untouched.

# V90 — THE SHOW WALL / New animated 3D visual art direction (2026-11-13)

- User feedback: V89 still looked like V87–V88; same dark/purple concert photo and one green sine wave. **V90 replaces the principal ABOVE-THE-FOLD visual**, not just heading/font. Working code in branch `design/v90-kinetic-3d-live-show-wall`, draft PR #88 https://github.com/WazzupDoc/green-sound-music-garden/pull/88, stacked on exact-head validated V89 SHA `a0e6c3f6e0245f27e9ee0c6ef6d47f1ee75b1f07`.
- The V90 hero draws a THREE-PLANE 3D perspective montage from existing first-party media, an immediately visible contrasting lime **kinetic typographic top ribbon**, photograph frames and production markings. Live / Private / Production native mode changes the arrangement (3D active frame), not merely copy. Existing Light Desk's on/off and mint/gold/ice settings now affect the visual stage. Motion is CSS transform/opacity, visible only while on-screen, full-motion and not Lite; reduced-motion/Save-Data/low-power suppress it. Mobile has one original company stage image and the top typography; not the heavy desktop 3D animation.
- Code: `src/components/atelier/KineticShowWall.tsx`, `src/styles/show-wall-v90.css` loaded SSR inline by `StageHero.tsx`; no new JS package/WebGL/canvas/image fetch service/backend. Existing four-block V48 homepage unchanged: hero, 3 asymmetric service acts/8 links, 3 real films, one final CTA. No TikTok stills, fabricated clients/achievements, counterfeit event photography or generic invented scenes.
- Tests: new V90 visual contract (3 original project assets, original CSS-3D, ticker motion, feature gates) + expanded existing React/Chromium tests. Browser QA captures `show-wall-v90-hero-1440.png`, `show-wall-v90-hero-390.png`, `v90-live-wall-motion-start-1440.png`, `v90-live-wall-motion-next-1440.png`, `v90-private-scene-1440.png`; must assert image.decode, true 3D screen area, actual ticker and frame animation, Light Desk OFF and Lite stopped. Six widths, no overflow, SSR and 20-page SEO remain.
- V89 before capture from [CI artifact 14037051076](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43425095295/artifacts/14037051076), `premium-v89-hero-1440.png`. Compare same viewport with V90 once real browser CI artifact available. **No assertion of aesthetic acceptance/green CI/screenshot before exact-head run.** First V90 run hit a superficial unsafe-media regex matching a comment; fixed test rather than disabling it.
- Main/prod remains unchanged. Before release verify CI/CD auto-deploy, tag backup old main with unique existing tag, rollback and explicit owner consent if merge publishes. No app budget/Lighthouse scores unless measured.

---

## V89 — GREEN SOUND / LIVE EVENT PREMIUM (13.11.2026, DRAFT)

- New branch `design/v89-live-event-premium-homepage`, stacked on newest exact-head **CI green V88** SHA `1e1feb930cdb295d73ff7b4e5d4a523bd5f9b5b7` PR #84. V89 draft PR to follow. Main and public website unchanged.
- Owner's specific supplied reference is `image(20261113-105439).png`: cinematic emerald concert/production page with a clear event headline, short visually rich service programme, people/crowd imagery and close visual hierarchy. *Direction only*: no screenshot source or AI event photos copied or represented as real; no fake testimonials, awards, historical achievements, production metrics.
- **Main visible difference**: StageHero text now **EVENIMENTE / DE NEUITAT.** in huge angled typographic headline; hero photo full bleed from existing Green Sound `images.concert`, warm-green gradient, original vector signal across foreground; active 3 native scene controls, Light Desk, real film click-to-play, direct /contact CTA remain functional. Existing secondary `images.scena` inset is not shown in this V89 design to avoid collage.
- **Services**: three genuinely unequal photo-led chapters (large left / two more compact right), but vertically shortened from prior 1000+px stretches. 8 original service links, actual local images and no unnecessary fake audio meters. New heading `Muzică. Lumini. Experiență.` with concrete description. No new homepage forms/FAQ/widget sections.
- **Films**: keeps 3 real existing company films and source-owned local poster previews, selected manually with focus/pressed state; tighter responsive cinematic section, no automatic video/audio or YouTube resource before Play.
- **Final CTA**: still exactly one final link to real Contact; dark cinematic closing block instead of tall solid lime panel.
- Implementation: `src/styles/home-event-v89.css?inline` scoped in homepage SSR after V86 branded styles; V89 is an **experimental visual layer** while owner compares, to be consolidated into one stylesheet after selection rather than grow cascading versions indefinitely. No new assets, package, scripts, backend or paid service.
- Browser QA assertions now check actual heading, computed CSS, 1440px compact hero height, shorter services, 3 existing photos decoded, 8 links, 3 actual film poster files, keyboard/Escape, reduced motion/Lite, 360/390/430/768/1440/1920 screenshot captures; every page/Contact/sitemap/SEO contract retained. **No CI or screenshot claim until exact-head run actually passed.**
- Research applied: web.dev `https://web.dev/articles/animations-guide` and `https://web.dev/articles/prefers-reduced-motion`; compositor-only transform for vector signal, opt-in full-motion, static final state for reduced/Lite. Chrome guidance: `https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/motion`, preserve focus when masked imagery is decorative.
- Stage/portfolio imagery from existing project only. Sources and rights remain documented `ASSETS.md`. No reuse of supplied TikTok clips.
- RELEASE: don't touch `main` until production deploy config checked, backup tag unique and verified, exact-head merged CI green, rollback testable and explicit approval if merging publishes site automatically.

---

# V87 — CINEMATIC REAL FILM CONTACT SHEET (2026-11-13)

- Draft PR #83: https://github.com/WazzupDoc/green-sound-music-garden/pull/83, stacked on successful V86 PR #82 exact source SHA cfa8a245b54b4d65caa8ad1d2fc62a9c0846e5b3.
- Area: EditorialPortfolio. Replaced old text-only 3-film selector with THREE photographic first-party film contact-sheet buttons. Existing published-video posters film-nunta-ramada.webp, film-show-lumini.webp, film-studio-live.webp are already stored locally in public/media/greensound, NO new third-party/AI/TikTok media.
- All 3 native buttons retain aria-pressed, original real-video selection and manual click-to-play via VideoLite (YouTube loads only when explicitly played). Responsive filmstrip/photo index with focus-visible and opt-in transform motion, Lite/reduced gated. The 3 films, 8 services, 3 service chapters, one final homepage CTA and dedicated pages remain intact.
- New scoped src/styles/film-contact-sheet-v87.css via SSR Vite ?inline, new source integrity Vitest, Playwright six-width photo poster decode checks and real 390/1440 film-crop screenshots. No new dependencies.
- App source CI success: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43420893062, screenshot artifact https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43420893062/artifacts/14033568505. The film section is now visually photo-driven, not a text list. Later documentation commits need exact-head CI confirmation.
- Main and production untouched; verify production auto-deploy trigger, backup tag and tested rollback before any release.

---

# V86 — GREEN SOUND / Signature homepage (draft, 2026-11-13)

- Code branch: design/v86-signature-production-site, draft PR #82 https://github.com/WazzupDoc/green-sound-music-garden/pull/82, stacked on V85 PR #81 (validated SHA 4bf044079f41de251b6d8ced1c8f636f69374f12).
- The owner specifically rejected generic AI-style repetition, giant vector audio mixer, dim event background and endless micro-PRs. The V86 improvement is deliberately structural: original typographic/cinematic homepage with authentic existing photographs, a branded SVG sound wave and one actionable offer CTA directly into /contact.
- CSS architecture: replaced 2 separate home CSS style tags from V84/V85 with a SINGLE SSR-scoped home-signature-v86.css file. Old style files/ProductionDeckArt remain in Git for safe rollback, not rendered in current homepage.
- Editorial services: first-party photo for headline Music chapter spans two grid rows, two genuinely smaller stage/people chapters stacked to its right. All 8 real service links work natively. Removed fake signal-ledger ornaments and routing bars from source JSX.
- Hero retains 3 native scene selectors, Light Desk with Escape, modal click-to-play real film, and original photos. Mobile 390 first-screen audit revealed a bulky scene-note widget; corrected to a compact event deep link (must re-validate latest exact head).
- Film selection remains 3 real project videos, no autoplay. Finale retains precisely one offer CTA. No new third-party images/media/scripts/dependencies/expenses.
- Preliminary CI SUCCESS at application SHA db92e4609b265dfd1fd6058c9d0ebcef36108694: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43418750372 . Screenshot artifact https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43418750372/artifacts/14033232086, 360/390/430/768/1440/1920. This predates mobile-height fix; final HEAD CI still required.
- Main and production NOT modified. Before any release inspect auto-deploy triggers, create unique verified backup tag on old main, test rollback and obtain separate public-release approval if merge triggers a deployment. PR #19 conflicts remain separate.

---

# V85 — Original GREEN SOUND production console / premium reference rebuild (2026-11-13)

- Owner supplied a specific dark green technical production website image on 2026-11-13, asking why actual app did not resemble it. V84 screenshots revealed a structurally edited but still mostly black/dim first screen; V85 is a deliberately larger visual correction anchored to that user-approved direction. **It is original interpretation, not pixel duplication.**
- Branch: `design/v85-production-console-reference-rebuild`, draft PR #81 stacked on V84 PR #79 (CI V84 push #43412440606 and PR #43412518984 succeeded on exact SHA `c6ee7b6dd85471a4f702ff45f01f8ea759cc2208`).
- Code: `ProductionDeckArt.tsx` original svg 10-channel mixer desk screen/faders/meters viewed in perspective (ARIA hidden, NOT a photograph or actual live audio reading); `StageHero.tsx` fresh semantic hero «Sunet. Lumină. Emoție.», services and single-team proof text, illustrated desk; a second **already existing original Green Sound stage image** `images.scena` blended to provide real green show lights alongside original existing `images.concert`. No TikTok frames, no claimed artificial events. On desktop a compact actual event selector stage monitor is positioned above equipment; on mobile the illustrative heavy desk and monitor are hidden for cleaner first screen and small screens, but user still has /evenimente CTA/mode toggles/Light Desk. V85 CSS scoped on homepage only via SSR Vite `?inline` alongside V84.
- Editorial service presentation changed again, now **3 unequal diagonal photograph-led panels (not identical card grid)** on desktop, 8 native direct service links beneath, stacked readable on mobile. Films remain 3 real published assets, one final Contact CTA. Dedicated functions/routes untouched.
- Tests updated/added: V78 hero semantic wording test kept (new headline assertion); new `production-console-v85.visual.test.ts`, expanded Chromium computed-color + three unequal side-by-side panel geometry + original production desk size; existing first-party photos decoded before screenshots, including additional green stage photo for desktop. Six widths 360/390/430/768/1440/1920, SSR/contact hydration, SEO and budgets should run exact-head.
- Visual quality bar: full-page/hero/services browser captures at 390 and 1440; compare against V84 `nightshift-v84-hero-1440.png` in [CI artifact 14030745424](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43412440606/artifacts/14030745424). Before/after the layout and photo-loading state must match; do not describe old screenshot as objectively better/worse without evidence. New run CI and screenshot evidence pending final HEAD.
- No main merge or public deploy; unique main backup Git tag, rollback exercise and production auto-deploy assessment not yet verified.

---

## V83 — confirmed application-source CI and browser evidence (2026-11-13)
- V83 source commit `fd604c60630f9498555145805c07b250666a8d2e`: exact-head [push CI #43409515536](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43409515536) PASS; [PR CI #43409522734](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43409522734) PASS.
- 25 Vitest files / **70 tests passed**; TypeScript strict, SSR production build, global CSS **51.3/52 kB gzip**, homepage 110.9/190 kB, quote 31.2/50 kB gzip; browser six widths + 3 loaded local chapter photos + animated focus vs Lite + Contact SSR, 20-page SEO/JSON-LD audit pass.
- [Real browser screenshots — GitHub artifact #14029615502](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43409515536/artifacts/14029615502), including V83 new 1440/390 service cropped screenshots and active motion state. Visual inspection: all 3 authored chapter photos now rendered and 3 distinct channel engravings visible. These are **not** new photography. Previous V81 screenshot sometimes lacked lazy photo loading; comparison is not same image-load state, so distinguish render recovery from purely aesthetic difference. Desktop image cropped via full-page screenshot due sticky header appearing in element capture, not a site bug.
- Changes to documentation AFTER verified source may move branch HEAD. The documented source SHA remains reproducibly validated; verify new exact-head CI before claiming any later docs-only SHA is green.

---

# V83 — GREEN SOUND SIGNAL LEDGER / editorial services (2026-11-13, DRAFT)

- Branch: `design/v83-signal-ledger-editorial-services`, stacked on V82 `81d1dee8c3ea2742f8eca14aebd5b239b224368f`. Most recent verified source baseline before this: V81 application SHA `98dacdb0686d76e3943afcb49f646b8578cf6eb5`, [success run 43399390064](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43399390064). V82 exact head CI failed (1 stale photo-motion test out of 68).
- One area this iteration: `ProductionIndex` service programme. Visual redesign: 3 differently tuned ORIGINAL mixer-channel engravings placed on each of the 3 existing local first-party photos; precision routing rails under each chapter. Bars react only to hover/focus; no fake live sound, audio API, heavy 3D dependency, autoplay, stock, TikTok screenshots or additional homepage sections. Keep 8 native service links and all actual destinations.
- Files: `src/components/atelier/ProductionIndex.tsx`, new scoped `src/styles/production-signal-v83.css` imported via `?inline` and SSR `<style>`; old V82 motion test corrected to check the NEW color treatment without deleting checks; new V83 test; Chromium script now forces native lazy images to load/decode before 360/390/430/768/1440/1920 screenshots and verifies positive image widths; has separate service-area screenshots and full-motion/Lite focus checks.
- Intent: an obvious *branded* interaction instead of generic decorative glow, and genuinely inspectable photographs. Accessibility: original images preserve alt/width/height/lazy loading, new engravings have aria-hidden and pointer-events none; keyboard focus remains on the eight real links; motion gated by hover/no-reduced/Lite. No added dependency/asset/cost.
- **Exact-head GitHub CI, actual screenshots and comparisons NOT YET CONFIRMED** at document write time. Previous V81 screenshot artifact [14024876141](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43399390064/artifacts/14024876141) captured several lazy images unfilled; cannot honestly call that a same-state photo before/after. Run screenshot audit and compare media loaded state before making visual claims. Check gzip cap 52kB shared unchanged, React SSR and no horizontal overflow.
- Next area rotation: EditorialPortfolio real film player and posters / video affordance, then event pages / Contact. Main remains unchanged: no authorized automatic publish without verified CD effects, backup Git tag/rollback and release gate.

---

## V81 verification update — PASS on application source `98dacdb0686d76e3943afcb49f646b8578cf6eb5`

- Exact-head CI [run #43399390064](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43399390064) completed **SUCCESS**, with 24 Vitest suites / 68 tests passed; TypeScript strict, SSR/Vite build, 51.3 kB gzip shared CSS / 52 kB cap, 110.9 kB homepage chunk / 190 cap, 31.2 kB QuoteForm / 50 cap; 360/390/430/768/1440/1920 Chromium homepage, nav open/focus/Escape, full-motion/Lite 390, 20-page route/sitemap audit.
- [Screenshots](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43399390064/artifacts/14024876141): `stage-index-open-360/390/430/768.png + stage-index-motion-390.png + stage-index-lite-390.png` and six homepage captures. **No same-state open-menu V80 baseline**; after images visually inspected at 360/390/768, no obvious clipping/overflow, but this does not prove aesthetic preference or physical-device behavior.
- Evidence-only docs update may create a **later SHA**; re-check exact-head checks on that last SHA before calling the PR validated. Production/main unchanged; no merge approval.

# V81 — STAGE INDEX navigation / draft (2026-11-13)

- Branch: `design/crafted-atmospheres-v81-stage-index-navigation`, based on V80 head `88f574590c28f28adf3cabddcdfaf12314d809cb` (PR #75); V79 PR #73 underneath. Single main zone: existing global `SiteHeader` / mobile navigation.
- Actual code: replace div-role-only pseudo-modal with native `<dialog>` triggered by `showModal()`; Escape/cancel/close, browser focus confinement and focus-return to opener; Finder hotkeys are suppressed while any real dialog is open, without breaking Finder when menu is closed.
- Actual new visual: original magazine-like **STAGE INDEX** featuring a serif/sans title, six large numbered asymmetric route labels, stage-rig line SVG, footline actions and accessible focus states. No new homepage section/extra homepage form/third-party asset.
- Assets: zero external; V81 CSS is imported using Vite `?inline` in `SiteHeader.tsx` and SSR-rendered as a trusted component-scoped `<style>` (not added to the 52 kB global CSS budget); removed obsolete old menu selectors in `atelier.css` and `regia-serii-final.css`. **Initial exact-head CI failed CSS budget (52.6 kB, then 52.4 kB vs 52 cap); latest scoped-CSS fix is still awaiting its own exact-head CI and SSR/CSP verification.**
- Tests: new static Vitest contract; updated Playwright existing six-width audit opens the native dialog at 360/390/430/768, checks `:modal`, initial/Tab focus, Escape restore, captures open-menu screenshot; extra 390 full-motion/Lite capture and computed animation check.
- Release gate: **V81 exact-head TypeScript/SSR/Vitest/gzip/Chromium CI and screenshots pending**; source code pushed but not yet visually verified. No before/after screenshot or production image claim. The last visually confirmed baseline is V78 PR #72 / CI 43386566760. PR #19 currently mergeable=false; main and deployment untouched.
- Next: fix any failed V81 CI without removing tests, inspect real screenshot artifacts (390/1440 and all six widths) and capture baseline-comparable shots. Then rotate to editorial service chapters or actual gallery/media broken posters, not the hero again.

---

# V80 — Stage wings / optical depth (draft, 2026-11-13)

- Branch: `design/crafted-atmospheres-v80-stage-depth-accessibility`; parent: V79 + planning PR #74.
- CSS-only hero depth experiment in `src/styles/stage-v79.css`: perspective stage wings, asymmetric shadows and a subtle floor wash; mobile/Lite/reduced-motion fallback. Existing stage selector, Light Desk, real photos, original homepage editorial composition unchanged.
- Fixed stale V78 visual-integrity test literal class-name expectation without deleting checks.
- Exact-head CI and **actual browser before/after screenshots not yet confirmed**. This is a draft experiment, not approved or deployed.
- `main` untouched. Rollback: revert the V80 CSS additions and test change; preserve prior V79 branch.

---

# V78 — Cinematic Stage / ACTUAL CSS loading recovery (draft, 2026-11-13)

- Branch: `design/crafted-atmospheres-v78-visual-style-recovery`; based on V77 commit `93f085c98a8735dc49fe75fcafe457a3281d76bc`.
- USER OBSERVED REGRESSION: actual Codespaces screenshots showed huge unstyled hero signal, scene info cramped, empty/unstyled page sections, and near-identical secondary pages. Original screenshot evidence was supplied by user (8 PDF exports).
- ROOT CAUSE FOUND IN CODE: `src/styles.css` **did not import** `editorial-reset.css`, `production-index.css`, `scene-console.css`, `light-desk.css`, or `portfolio-journal.css` (nor several dedicated interaction styles). Work committed in previous V48–V77 CSS files was dormant.
- FIX: restore 15 previously absent styles at the actual shared stylesheet entry; place editorial reset after legacy Regia rules; add `stage-v78.css` last. React Hero removes giant SVG brand stamp and shows semantic `Muzica / schimbă tot.`, real event image across full width, a native stage aperture, and a subtle transform/opacity light sweep. Original stage selector, Light Desk, real-film CTA, Contact and editorial 3-chapter / 8-service / 3-film / one-finale structure preserved.
- Tests added: `stage-v78.visual-integrity.test.ts` validates loading order, real hero structure, reduced-motion/Lite/visibility gates. **GitHub Actions typecheck/build/gzip/unit/Chromium exact-head NOT YET CONFIRMED**. Run 360/390/430/768/1440/1920 screenshots and visual comparison before claiming approved. CSS budget 52kB gzip must not be raised.
- No new external assets/packages/costs. `main` remains unchanged until exact-head quality verification and production deployment trigger/rollback/backup verified; the latest user message authorizes main changes but does not waive release gates.

---

# V77 — Light Desk keyboard Escape / focus (draft)

- Based on V76 PR #70, no main merge. StageHero's native Light Desk details disclosure now closes on Escape and restores focus to summary. Added `stage-hero.light-desk-escape.test.ts` source regression test.
- Exact-head CI, Chromium interaction and six-width screenshots are **not confirmed**; do not merge or deploy. PR #19 conflicts remain. No dependencies or assets.

---
# V76 — Editorial browser CI alignment (draft)

- V75 exact-head [43368719076](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43368719076) FAILED in Chromium: the obsolete Regia browser script waited for `.rs-hero h1`, removed from the restored V48 editorial homepage. TypeScript, SSR, gzip, Vitest and architecture passed; separate motion CI passed.
- V76 changes `.github/scripts/verify-crafted-browser.cjs` to audit the current editorial page at 360/390/430/768/1440/1920: 3 chapters/8 links, 3 film selectors, one finale CTA, no homepage form/autoplay, overflow, screenshots; secondary routes, Contact and sitemap. The legacy Regia script is preserved. No new packages/assets, no disabled checks.
- V76 exact-head CI and screenshot results not yet confirmed. PR #19 conflict state and deployment/rollback gates must be checked again before any merge. Main unchanged.

---
# V75 — Editorial keyboard focus CI regression (draft)

- V74 exact-head https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43362462854 **FAILED**: 3 stale assertions in `src/styles/production-index.accessibility.test.ts` expected old `:focus-within` and standalone reduced-motion declarations, whereas V59/V70 CSS uses `:has(:focus-visible)` and grouped overrides. TypeScript, SSR build and gzip budgets passed; motion workflow 43362462868 passed independently.
- V75 changes source regression assertions only, preserving keyboard focus, no layout shift, reduced-motion and Lite behavior. No dependency, asset or homepage redesign. CI V75 and Chromium six widths still unverified. PR #19 remains conflicted; no main merge/deployment.
- Next: verify exact-head CI; audit mobile menu focus/Escape, two-service Contact handoff and browser screenshots before any release.

---
# V74 — Fix Vitest source fixture paths (draft)

- V73 exact-head PR CI [43356575133](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43356575133) **FAILED** after TypeScript stage: 8 Vitest files crashed at module evaluation with `ERR_INVALID_URL_SCHEME` from `new URL(relative, import.meta.url)` / `fileURLToPath(...)` under Vite-transformed module URLs. Separate motion CI [43356575075](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43356575075) **PASSED**, not overall green.
- V74 replaces only those eight source-fixture reads with repo-root relative paths (`src/...`) compatible with the repository's CI working directory. No tests removed/disabled; no new dependency or visual changes. Exact-head CI, SSR and six-width browser still require confirmation. PR #19 independently mergeable=false. Main untouched.
- Next: inspect V74 exact-head CI and fix further genuine failures; audit navigation/Escape after green CI. Do not merge or deploy without all release gates.

---
# V73 — Repair failing exact-head TypeScript CI (draft)

- Based on V72 PR #66. Actual V72 PR CI run [43348988088](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43348988088) failed at strict TypeScript: TS18048/TS2532 in `src/lib/brief-date.ts` and `production-index.cta-layout.test.ts`. Parallel V19 motion workflow [43348988129](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43348988129) passed; this is NOT overall green.
- Corrected indexed array access with explicit undefined guards and optional assertions, preserving Gregorian validation and CSS regression fixtures. No new dependencies, visual elements or media. V73 exact-head CI and Chromium pending; do not merge or publish. PR #19 independently mergeable=false.
- Next: check V73 workflow result, fix any remaining errors, then six-width screenshot and two-service Contact QA. Navigation component remains next visual rotation target.

---
# V72 — Hero Lite / reduced-motion visual safety (draft)

- Branch `design/v72-hero-lite-motion-safety` stacked on V71 PR #65. Existing stage image remains; decorative beams/rings/pointer and transitions are disabled for Lite and reduced-motion. No new sections, packages, external media or homepage CTA.
- Added `stage-hero.motion.test.ts` static regression. Exact-head CI, TypeScript, SSR, Chromium six widths and real Contact workflow not yet confirmed. PR #19 mergeable=false. Main and production unchanged.
- Next: verify CI and six-width screenshot/keyboard checks; next component mobile navigation/Escape.

---

# V71 — Restore V48 homepage route (critical regression fix; draft)

- Branch `design/v71-restore-v48-homepage-route`, based on V70 PR #64. Actual V70 `src/routes/index.tsx` had silently switched to `RegiaHome` and was displaying event selector, backstage and extra homepage CTAs. This violated the approved V48 editorial reset despite many improvements to dormant V48 components.
- Restored V48 route composition: StageHero → ProductionIndex (3 asymmetric chapters, 8 links) → EditorialPortfolio (3 real films) → one Contact finale CTA. Dedicated event and service routes untouched.
- Added `src/routes/editorial-home.route.test.ts` source regression. No new dependency or asset. Test execution, exact-head CI, TypeScript, SSR, six-width Chromium and Contact workflow still unconfirmed. PR #19 mergeable=false; V70 PR #64 mergeable=true but no exact-head PR workflow runs returned. No main merge/deployment.
- Next: execute actual CI, six-width screenshot and Contact tests; inspect deployment triggers, tag/rollback permissions and publication approval before main.

---

# V70 — Editorial photo motion gate (draft)

- Branch `design/v70-editorial-photo-motion-gate` stacked on V69 PR #63. The service photo hover zoom now requires a true hover pointer, no reduced-motion preference and no Lite mode. Static color feedback and keyboard focus outline remain. Homepage structure stays V48-clean: hero, 3 editorial chapters/8 links, 3 real films, one CTA.
- CSS regression tests added; execution, TypeScript, SSR, six-width Chromium and exact-head CI unconfirmed. PR #19 mergeable=false; PR #35 mergeable=true and its exact-head PR workflow was reported successful; V69 PR #63 mergeable=true but CI PR runs not returned. Main and production unchanged.

---

# V69 — Valid Contact calendar dates (draft)

- Branch `design/v69-contact-valid-calendar-date`, stacked on V68 PR #62. Query-prefilled Contact dates now require an actual Gregorian calendar day, not merely YYYY-MM-DD shape. New pure utility and Vitest leap-year/month-length regressions; existing event/service/location allowlists retained.
- V48 homepage hero + 3 editorial chapters/8 service links + 3 real films + single CTA unchanged. No dependencies, external assets or backend claims.
- Exact-head CI, TypeScript, SSR, six-width Chromium and real Contact handoff unverified. No main merge/deploy. Require CI, conflicts, deployment trigger review, backup tag and rollback before integration.

---

# V68 — Deterministic editorial service lookup (draft)

- Branch `design/v68-editorial-service-lookup-map` stacked on V67 PR #61. Replaces repeated Array.find resolution with one native slug→service Map after duplicate source validation. Keeps original service object references, order 3/2/3, eight direct links and clean V48 homepage.
- Adds Vitest identity/order regression. No dependencies, media, new UI, extra CTA or network activity. CI exact-head, TypeScript, SSR, browser six widths and Contact handoff not yet verified. No measured performance gains claimed.
- PR #19 remains unmergeable; no main merge/deploy without exact-head CI, conflict and rollback audits and publication approval if main deploys.

---

# V67 — Source catalogue duplicate guard (draft)

- Branch design/v67-catalogue-duplicate-source-guard stacked on V66 PR #60. Detects duplicate slugs in the original services catalogue before Set-based editorial completeness validation; regression test documents false-positive scenario.
- V48 clean homepage unchanged; no new dependencies, assets, sections or network calls. V66 exact-head PR workflow lookup returned no runs; V67 CI, TypeScript, SSR and browser QA unverified.
- No main merge/deploy until exact-head CI, mergeability, screenshot/Contact audit, backup tag, rollback and deployment-trigger review. No measured SEO or Lighthouse claims.

---

# V66 — Editorial catalogue completeness (draft)

- Branch `design/v66-editorial-catalogue-completeness` based on V65 PR #59. Existing runtime uniqueness check now also rejects omitted catalogue services; Vitest checks full catalogue parity and per-chapter order.
- No extra homepage sections, dependencies, assets, autoplay or external services. Preserve V48 hero / 3 chapters / 8 direct service links / 3 real films / single CTA.
- V65 exact-head PR workflow query returned no runs. V66 exact-head CI, TypeScript, SSR, Chromium and Contact flow unverified. Do not merge main or deploy without all release gates, backup tag, verified rollback and publication approval if main deploys automatically.

---

# V65 — Editorial service uniqueness guard (draft)

- Branch: `design/v65-editorial-service-uniqueness-guard`, based on V64 PR #58. Existing three editorial chapters must contain exactly eight distinct service links. Runtime module initialization rejects duplicates rather than silently repeating a service.
- Added Vitest catalogue integrity test. No new homepage section, asset, animation, dependency or third-party material.
- V64 PR workflow runs: none returned for exact SHA; PR #58 mergeable=true, PR #19 mergeable=false. No full test or production validation claimed. Keep main untouched pending CI, browser QA, deployment trigger/rollback checks.

---

# V64 — Editorial service chapter semantics (draft)

- Branch: `design/v64-editorial-semantic-navigation` stacked on V63 PR #57; homepage remains hero + 3 chapter / 8 service editorial programme + 3 real films + one CTA.
- Existing chapter headings and factual notes now explicitly label and describe each service list using stable, unique `id`, `aria-labelledby`, and `aria-describedby` attributes. No new visible widgets, scripts, libraries or assets.
- Added `production-index.semantic.test.ts` source-level regression; actual screen-reader, browser, TypeScript, SSR, Vitest and six-width CI checks are not yet confirmed.
- Baseline V63 exact-head PR workflow query returned no runs. PR #19 mergeable=false. Do not merge or deploy without full gates, backup tag, verified CI/CD triggers and rollback.

---

# V63 — Concrete editorial service language (draft)

- Branch: `design/v63-editorial-service-clarity`, stacked on V62 PR #56. No main merge/deployment.
- Replaced vague chapter copy with factual DJ/MC, live band, studio, sound/light/fog, hostess/ursitoare/children's animation descriptions. Three chapters, eight real links, three films and single homepage CTA remain intact.
- Added Vitest copy guard; no runtime dependency or asset change. Research and rejected LCP changes documented.
- Release gates pending: exact-head CI TypeScript/SSR/unit/Chromium six widths, screenshots, Contact flow, mergeability, deployment/backup/rollback audit. PR #19 mergeable=false.

---

# V62 — Touch hover parity for editorial service programme (draft)

- Branch: `design/v62-editorial-touch-hover-parity`, stacked on V61 PR #54, not the parallel visual rebuild PR #55.
- CSS-only @media(hover:none) neutralizes persistent photographic zoom and arrow/label displacement after taps, preserving native focus-visible outlines, Lite and reduced-motion. Adds Vitest source regression. No added homepage sections, JavaScript, assets or dependencies.
- Research and rejected alternatives documented in RESEARCH.md; asset and agent state updated. No measured performance claim.
- V61 exact-head workflow query returned no PR runs; V62 TypeScript, SSR, Vitest, six-width Chromium and screenshot audits unverified. PR #19 mergeable=false. Do not merge main/deploy before release gates and backup/rollback review.

---

# V61 — Editorial CTA regression gate reliability (draft)

- Branch: `design/v61-editorial-cta-test-hardening`, stacked on V60 editorial PR #51, not parallel redesign PR #52/#53.
- Repaired a false-negative in CTA hover CSS tests: incorrectly double-escaped regexes could not detect layout-affecting hover rules. New test scans declarations and uses mutation fixtures to prove gap/padding/margin are rejected while transform is allowed.
- No visible UI, dependency or asset change. V48 homepage structure preserved.
- Latest observed PR workflow success on parallel PR #52 head `ab2cdd63ff44be4a41b1c7319d9bf65e6f211aaf` (run 43235217801); this is not validation of the editorial branch. PR #53 head run 43242687196 in progress at check time. PR #19 mergeable=false.
- Release gates: V61 exact-head CI, TypeScript, SSR, Vitest, Chromium six widths, screenshots, Contact flow and main deployment/rollback configuration unverified. Do not merge or deploy.

---

# V60 — Editorial CTA layout-stable hover (draft)

- Branch `design/v60-editorial-cta-layout-stability` stacked on V59 editorial PR #49, not parallel cinematic homepage PR #50.
- Replaced layout-affecting intro link hover gap with icon-only transform (4px), gated by normal-motion and non-Lite; native link focus outline preserved. No new widgets, dependencies or assets.
- Added static Vitest regression; exact-head TypeScript, SSR, Vitest, six-width Chromium, screenshot audit and GitHub Actions not yet verified. No claim of measured CWV gains.
- Research and experiment rollback recorded in RESEARCH.md. PR #19 still mergeable=false. Main untouched; release requires exact-head CI, deployment trigger audit, backup tag and testable rollback.

---

# V59 — Keyboard-only editorial photo focus (draft)

- Branch: `design/v59-editorial-keyboard-only-focus`, stacked on V58 PR #48. Preserve V48 clean homepage and 3-chapter/8-service programme.
- Change: photographic chapter cue now uses `:has(.gs-index__service:focus-visible)` instead of `:focus-within` to avoid applying keyboard-specific visual emphasis after pointer clicks. Native link focus outline remains, and Lite/reduced-motion guards stay intact.
- New static Vitest regression verifies selector and motion gates; TypeScript, SSR, Chromium six widths and exact-head GitHub Actions not yet confirmed.
- Research recorded in RESEARCH.md; no dependencies, external media, extra homepage widgets or production merge.
- Backlog: inspect browser keyboard and pointer parity, verify CI, Contact 2-service flow, main deploy trigger and rollback permissions. PR #19 remains conflicted.

---

# V58 — Editorial hover motion without layout shift (draft)

- Branch: `design/v58-editorial-motion-layout-safety`, stacked on V56 PR #45, not V57 POSTER PR #46 (separate direction requiring owner visual approval).
- Replaced `padding-left` hover animation with a 3px transform of the existing label, gated by `prefers-reduced-motion:no-preference` and non-Lite; static color and native focus remain. Added CSS regression test. No new homepage section, JS, asset or dependency.
- Exact-head TypeScript, SSR, Vitest, Chromium six widths, Save-Data/Lite, reduced motion and screenshot review pending. No main merge or public deployment.
- PR #19 still mergeable=false. Next: inspect CI and visual regression, Contact prefill and browser audits, deployment triggers and rollback permissions.

---

# V56 — Keyboard editorial focus parity (draft)

- Branch `design/v56-editorial-keyboard-focus`, stacked on V55 PR #43, separate from parallel live-stage PR #44. Adds CSS-only chapter photo cue on native keyboard focus, respects prefers-reduced-motion and Lite; no homepage blocks or packages added.
- New static Vitest guard checks focus-within, native link focus and motion gates. Exact-head CI, browser screenshots and performance measurements pending; no claims of Lighthouse score.
- Backlog: validate CI and keyboard focus at six widths; inspect visual screenshots; reconcile parallel branches intentionally; verify main deployment triggers, backup tag and rollback before any integration. PR #19 conflicts unresolved.

---

# V55 — Eight-track editorial running order (draft)

- Branch: `design/v55-editorial-service-numbering`, stacked on V54 PR #42. Homepage retains hero, 3 asymmetric editorial chapters / 8 direct service links, 3 real films and a single CTA. No new homepage widgets.
- Implemented CSS-only sequential 01–08 running-order numbering on the existing eight links, preserving native text/focus and reduced-motion/Lite. No added JavaScript, packages, image downloads or external service.
- Repaired a fragile first-party image-path assertion in V54 integrity test; tests and six-width Chromium screenshots remain **unverified** until exact-head CI completes.
- Created root `RESEARCH.md`, `ASSETS.md` and `AGENT_STATE.md` with dated official sources, license checks, accepted/rejected experiment, provenance and backlog.
- PR #19 still reports mergeable=false; V54 PR #42 mergeable=true at last query but exact-head workflow runs absent. No main merge, backup tag or public deployment.

---

# V54 — Editorial service integrity (draft)

- Branch: `design/v54-editorial-service-integrity`, stacked on V53 PR #41; no main merge or public deployment.
- Homepage editorial programme keeps the three asymmetric chapters, eight authentic service links, original photographs and existing single-CTA structure. Service references resolve once and now fail visibly on an unknown catalogue slug rather than silently dropping links.
- Added Vitest integrity regression for 3 chapters, 8 unique existing service slugs and first-party imagery. No new dependencies or visual effects.
- Baseline V53 CI is not confirmed; V54 TypeScript, SSR, unit, six-width browser and CI must pass on exact head before integration. No Lighthouse score or SEO ranking claimed.
- Backlog: check V53 CI and visual screenshots; measure Lighthouse on staging; verify Contact SSR hydration and keyboard flows; audit authentic search-intent content and main deployment/rollback safety.

---

# V48 — Editorial reset / Awwwards Music & Sound inspired, NO duplicated homepage widgets (draft)

- Branch: `design/crafted-atmospheres-v48-editorial-reset`, stacked on V47 PR #33; earlier drafts remain unchanged.
- Homepage now contains just four substantial moments: real musical hero → bespoke 3-chapter direct service index for all 8 genuine offerings → three real published films → one Contact CTA. Removed repeated QuickBrief / event tabs / service tabs / soundcheck / frequency tab controls / second photo strip / home FAQ / repeated form **from homepage only**. Other dedicated page routes and validated workflows remain available.
- Hero gains an airy, transparent and smaller scene explanation, no bulky duplicate card, plus typographic restraint; music-inspired, image-led editorial programme uses authentic Green Sound first-party pictures and native accessible links.
- V48 regression adapts six-width Chromium checks to prove zero redundant homepage widget/forms and eight real service routes; V47 deep-page Contact, ServiceMix, photos, SEO and 301 migration retained. No WebGL, autoplay, new dependencies, unauthorized external code or claims of guaranteed ranks.
- Full problem inventory, design rationale and release gates: `docs/V48_EDITORIAL_RESET_AUDIT.md`.
- **CI pending**: verify exact V48 head and visual screenshot artifacts before considering release. No `main` merge or public deploy.

---

# V47 — Contact crawler-visible SSR without JavaScript (draft)

- Branch: `design/crafted-atmospheres-v47-contact-ssr-nojs`, stacked on V46 PR #32; development only, no main merge or deployment.
- Verified V46 exact-head GitHub Actions **PASS** for `12d2da178b987febbecceca72f870c343858e993`, run https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43158167443. Strict TypeScript, SSR build, bundle budgets, Vitest, six-width Chromium, Contact hydration, and sitemap audit jobs all passed.
- Added a Chromium **JavaScript-disabled** Contact navigation regression to verify HTTP 200, one server-rendered H1, exactly one canonical and one OG URL, and parity on a campaign-query/fragment URL. This tests metadata as search crawlers receive it before hydration, not just client-rendered DOM.
- Release gate: V47 exact-head CI must pass; inspect browser artifacts before integration. Do not infer production field Core Web Vitals from CI.
- Backlog: service-selection to Contact prefill; invalid-input/error and clipboard denied flows; reduced-motion/Save-Data checks; field Search Console data when authorized. PR #19 still needs conflict resolution separately. Main backup/tag and deployment triggers remain unverified, so do not merge.

---

# V46 — Contact SSR six-width hydration regression (draft)

- Branch: `design/crafted-atmospheres-v46-contact-six-width-hydration`, stacked on V45 PR #31. No main merge/deployment.
- V45 exact-head CI **PASS** on `88e5d4e17f0c532481d068ac282c2d9b8f5ee58a`, GitHub Actions run https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43152410901.
- Expanded the real Chromium Contact direct-link and reload regression from 390/1440 to **360, 390, 430, 768, 1440, 1920px**. All widths check query date/location persistence, absence of React hydration/browser errors, canonical/OG parity, and a single accessible form on initial load and reload.
- No new dependencies, external services, fake submissions or changes to visible UI. Existing CI script invocation remains unchanged.
- Release gate: require exact V46 head GitHub Actions green and inspect actual screenshots before considering merge. Prioritize next: genuine service-selection → Contact prefill and form errors, reduced motion/Save-Data; verify main deploy triggers and backup rollback before any merge. Search Console data not connected/verified.

---

# V45 — Contact direct-link SSR hydration regression (draft)

- Branch: `design/crafted-atmospheres-v45-contact-hydration-gate`, stacked on V44 PR #30; no main merge or deployment.
- V44 exact-head GitHub Actions PASS on `a0ad282c92858f1342e26dc5bcc76f62081b9e06`, run https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43144989023.
- Added `.github/scripts/verify-contact-hydration.cjs` and an explicit CI Chromium step, at 390px and 1440px, covering native direct navigation and reload of a query-prefilled Contact page, accessible form mount, date/location persistence, canonical/OG URL parity and console/React hydration errors. No actual WhatsApp/email submission occurs.
- Existing six-width audit, SSR build, typecheck, Vitest, sitemap and gzip budgets remain mandatory; V45 CI for its final head must pass before integration.
- Backlog: extend to all allowlisted service combinations and real production SSR/field CWV; verify hosting deployment triggers and rollback before any main merge. Search Console query volumes remain unavailable/unverified.

---

# V44 — Full PR quality coverage (draft)

- Branch: `design/crafted-atmospheres-v44-complete-pr-ci`, stacked on V43 PR #29; no merge/deploy.
- Confirmed V43 PR-head CI PASS on commit `78d515b53f0b83ffbb20da6cb40fa3265e501e21`, run https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43138904767.
- Found remaining CI blind spot: V43 `pull_request.paths` excluded changes limited to `public/**` (sitemap/robots/assets), deployment/configuration and other repository files. A PR with only those changes could skip quality gates despite affecting search discovery or release behavior.
- V44 removes the pull-request path filter entirely, retaining branch targeting and all existing strict TypeScript, SSR build, Vitest, gzip budget, six-width Chromium and 20-page browser audits. Every PR targeting allowed development/main branches must trigger these checks regardless of changed paths.
- Release gate: inspect V44 exact-head PR/push workflow run; confirm workflow trigger and all jobs green. CI does not establish staging field CWV or physical-device performance. No main merge before deployment trigger, backup tag and rollback are verified.
- Next: add explicit browser checks for query-prefilled Contact hydration and SSR canonical/OG parity, plus real staging performance measurements. Do not invent server-side contact delivery or SEO metrics.

---

# V43 — CI coverage for future development branches (draft)

- Branch: `design/crafted-atmospheres-v43-ci-coverage`, stacked on V42 PR #28; draft-only, no main merge or deployment.
- Root cause: the existing GitHub Actions workflow listed individual branches only through V38, so newer V39–V42 development branches were excluded from push triggers; PR triggers also excluded V39+ target branches. Missing workflow runs cannot be interpreted as passing CI.
- Replace enumerated branches with `design/crafted-atmospheres-*` for both push and pull_request, preserving main as an allowed PR target. Keep source and architecture checks; include documentation changes and all `.github/scripts/**` as PR triggers.
- Verification gate: inspect the actual V43 push and PR GitHub Actions run for the exact head SHA, then strict TypeScript, SSR build, Vitest, gzip budgets, Chromium six-width regression and 20-route audit. A missing run is a blocker.
- Retest V39–V42 on their actual code if they are considered for integration; V43 passing does not retroactively validate those commit SHAs.
- Backlog: investigate Contact SSR hydration with query-prefill, field errors, adaptive motion and Search Console data (only if connected). Do not invent search volumes, conversions or backend delivery.
- Main safety: verify deployment triggers, previous main SHA, backup tag creation and rollback before any merge; no production changes in this PR.

---

# V42 — Canonical path normalization (draft)

- Branch: `design/crafted-atmospheres-v42-canonical-path-normalization`, stacked on V41 PR #27. Development only; no production deployment.
- Normalize relative and repeated-slash path inputs into a single same-origin canonical pathname. Continue stripping query and fragment before generating canonical/OG/Schema.org URLs.
- Added three Vitest regressions covering relative paths, repeated leading/interior separators and campaign links; preserves existing canonical tests and all V20–V41 features.
- Release gate: exact SHA strict TypeScript, SSR build, Vitest, gzip budgets and six-width Chromium, including Contact hydration and query prefill. Do not claim validation before GitHub Actions confirms it.
- SEO backlog: verify SSR canonical, og:url and structured-data parity for actual Contact prefill and service pages; Search Console performance requires connected data. No search-volume or ranking claims.
- Do not merge to main until CI, branch protections, backup tag and deployment triggers are independently verified.

---

# V41 — Canonical query and fragment isolation (draft)

- Branch: `design/crafted-atmospheres-v41-canonical-query-safety`, stacked on V40 PR #26; **not production**.
- `canonicalUrl()` now discards `?query` and `#fragment` before building canonical, Open Graph and Schema.org route URLs. Query-prefilled Contact links and campaign parameters must never become distinct indexed pages.
- Added four unit regressions for `utm_source`, `#oferta`, root query and date-prefill with fragment. No new dependencies or claims about Google rankings.
- Validation required on exact final SHA: TypeScript, SSR build, Vitest, gzip budgets, six-width Chromium browser audit and Contact hydration. V40 baseline CI status was not confirmed through the available commit workflow-run query; do not declare V41 validated until checks pass.
- SEO next: verify canonical URL against real SSR page responses with query-prefilled Contact and `og:url`; compare Search Console data only when connected. Preserve original content and all earlier interactions.
- `main` and live domain untouched; check deployment triggers, tag backup and rollback before any authorized merge.

---

# V40 — Business contact single source of truth (draft)

- Branch: `design/crafted-atmospheres-v40-business-contact-consistency`, based on V39 PR #25 (CI successful: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43107697432).
- Schema.org LocalBusiness telephone is derived from the same verified `business.phoneHref` used for visible call links, rather than duplicating a literal phone number. Email, name and locality are checked for parity with the source-of-truth catalogue.
- Regression: Vitest guards telephone, email, business name and address locality. No new API, tracking, external service, content claims or dependencies.
- Release gate: strict TypeScript, SSR build, unit tests, gzip budgets and six-width Chromium browser CI must pass for this exact commit; staging/mobile field metrics remain unverified.
- SEO backlog: audit real Google Search Console queries if connected; prioritize commercial DJ / sonorizare / lumini service pages, then authentic local coverage. Do not invent search volumes or rankings.
- Main and production remain unchanged. PR is draft; no automatic deployment authorized.

---

# Green Sound Music — Current development source of truth

Updated: 2026-11-11 (V39 draft)

## Latest
- Current branch: `design/crafted-atmospheres-v39-schema-url-integrity`
- Draft PR: https://github.com/WazzupDoc/green-sound-music-garden/pull/25 (base V38 PR #24)
- PR review base: `design/crafted-atmospheres-v38-audit-service-discovery` (PR #24); retains all V20–V38 improvements, including Frequency Studio, guided briefs, and safe SEO.
- Hosting: **NOT DEPLOYED**. The public `greensoundmusic.com` website and the repository `main` branch are unchanged.
- Preview: [Open V38 in GitHub Codespaces](https://codespaces.new/WazzupDoc/green-sound-music-garden/tree/design/crafted-atmospheres-v39-schema-url-integrity?quickstart=1) then forward port 4175; the workspace preview is private/temporary, not public hosting.

## What V25 implements
1. **The Event Journal** — replaces the generic portfolio photo grid with original six-frame asymmetric editorial layout using existing first-party Green Sound photography. Visitors can inspect full frames through an accessible Radix Dialog with previous/next buttons and keyboard arrow navigation. Every frame leads to a relevant event type; no fake reviews or metrics.
2. **The Film Archive** — selected real published Green Sound videos, artistically directed media-player area, filters drawn from verified video tags, click-to-load YouTube, no autoplay or preemptive tracking iframe. Clear access to contact.
3. **Event Brief** — all five event detail pages now include a native GET handoff after real recommended services. Date/location can be added; recommendations prefill the existing `/contact` quote form and remain editable. It doesn't promise availability or take bookings.
4. **Site quality** — original business founding year/city shown with no made-up metrics; distinct metadata for portfolio; responsive styles (mobile/tablet/desktop); reduced-motion support; fixed the stage video's accessible title.
5. **Regression** — TypeScript strict, SSR/Vite production build, unit tests and six-width Playwright checks. New coverage verifies portfolio lightbox navigation and closing, film category filters, no autoplay, and recommended service prefill via native GET → Contact. Check the actual CI result before treating the branch as validated.

## Sources and design rationale
See `docs/V25_RESEARCH_AND_RELEASE_AUDIT.md`. Core principles: high-end typography and photographic hierarchy, original footage, usable mobile controls, restrained motion and genuine business conversion.

## Preview current development
```bash
git fetch origin
git switch design/crafted-atmospheres-v39-schema-url-integrity
git pull origin design/crafted-atmospheres-v39-schema-url-integrity
npm install --no-package-lock
npm run dev -- --host 0.0.0.0 --port 4175
```
Open forwarded port 4175 root `/`, and `/portofoliu` to review the new gallery and film archive. The repository contains a `.devcontainer/devcontainer.json` configuration that starts the preview automatically in a newly created Codespace; this wasn't verified with a direct Codespaces session from the chat.

## Future continuous development
Always inspect the latest branches, PRs, `docs/CURRENT_DEVELOPMENT_VERSION.md` and CI results first. Work only on new design/development branches and draft PRs. Update this document as source of truth in newer branches. Keep `main` and the live domain untouched without owner approval. Do not imply 100/100 Lighthouse or production-readiness from CI alone.

## Contact reliability and visual quality (V25)
- The contact shell and phone/WhatsApp/email are rendered on the server; the React Hook Form is mounted inside TanStack `ClientOnly` after hydration. The route uses `useHydrated` to keep the first server/client markup deterministic even when arriving with query-string prefill.
- An original compact editorial contact hero with substantial top spacing now clears the floating header on mobile. The title is meaningful for both new contacts and prefilled quotes.
- Browser regression explicitly asserts that the visible contact H1 does not sit under the floating mobile navigation.
- Gallery mobile CSS reserves a full first grid row rather than letting the lead image overlap the second row; browser regression asserts nonoverlap.
- The film poster shows a gradient placeholder if the lazy-loaded image has not yet finished. Final screenshot QA waits for nonzero `naturalWidth`.


## V26 — The Signature Interaction / Light Desk / Event Pass
- **Music notation cursor**: an original, small musical note with equalizer. Decorative follower only; native cursor and precise hit point always remain unchanged. Active only for desktop mouse/fine pointers at 1024px+ and when reduced-motion is not requested. User can toggle the effect off. No new dependencies, per-pointer-move React re-renders, Canvas or trackers.
- **Light Desk**: a native accessible `<details>` control in the hero that lets visitors experiment with three light palettes (mint, gold, ice) and an intensity slider. Stage effects are CSS, user-controlled; no real physical lighting/audio control implied.
- **Event Pass**: validated `QuoteForm` no longer triggers `window.open` asynchronously or misleadingly says a request was sent. Instead it shows a refined event/selected-services preview and clear links to prepare WhatsApp or email *only when the visitor clicks*. Editing restores the existing inputs. Nothing is sent without action by the visitor.
- **Film premiere linking**: the homepage showreel's "Vezi tot portofoliul" links to its exact published film via an allowlisted portfolio query parameter and scroll anchor. The archive selects that clip without automatically playing it.
- **Form integrity**: the embedded homepage/event/portfolio React Hook Form is rendered client-only using a deterministic SSR fallback, as the contact page was fixed in V25.
- New browser assertions for cursor toggle, reduced-motion fallback, stage palette and intensity controls, event-pass WhatsApp/email click links, editable form, and exact film navigation. **Confirm CI before describing V26 as validated.**
- Research, constraints and release notes: `docs/V26_INTERACTION_DESIGN.md`.

Current branch is a **draft review only**, not the production website. Do not merge or deploy without owner approval.


## V27 — The Offstage Room + Frequency / performance-first motion
- A shared **StageFallback** replaces the generic site-wide 404 and recoverable error UI. For unknown routes: real Green Sound concert imagery, explicit "Aici încă nu a început spectacolul", natural CTA to contact, event discovery, homepage and direct call; no fake performance or false success claim. For runtime errors: different explanation and a real retry callback.
- An original **Frequency** interlude extends the premium editorial brand identity on the homepage with a coherent, deterministic 36-bar graphic and contextual link to real portfolio clips. No background audio, stock visuals, generic template animation or JS timeline.
- Optional compositor-friendly native scroll animation only when the browser fully supports `animation-timeline: view()` and `animation-range`, at desktop sizes and with reduced-motion off. Unsupported devices display the complete static design. 404 waveform is also fully static under reduced motion.
- Strict mobile CSS avoids accidental overflow, with custom 404 screenshot QA and semantic route checks at 390 and 1440 px.
- GitHub Actions Chromium setup avoids apt `--with-deps` after external Ubuntu mirror DNS failures in V26; browser cache reduces repeat downloads. CI runs continue with strict TS, build, unit tests and 6-width Playwright checks. Confirm the actual V27 result before claiming verified.
- References, content provenance and full release checklist: `docs/V27_MOTION_RELEASE_AUDIT.md`.

This is a **draft review branch**. Do not merge, deploy or make claims about production Core Web Vitals without owner approval and proper performance measurements.


## V28 — Production Journey and professional interaction polish
- **Real-image Production Journey on /despre-noi:** four interactive editorial chapters (Ideea, Atmosfera, Producția, Momentul), each with first-party Green Sound imagery, a legible story, sequential navigation, links to real portfolio and the contact form. This isn't a fake fixed-price package, scheduling calendar or guarantee of a specific production process.
- **Mobile keyboard navigation:** when users open the actual mobile navigation disclosure the first link receives focus, Escape closes it and restores focus to its menu button, and a click outside dismisses it. Normal Tab navigation remains available (not a faux modal trap). Existing scroll-lock cleanup and normal click navigation are retained.
- **LCP resource deduplication:** SSR React 19 automatically adds exactly one high-priority preload for the first-party hero image because the real `img` has `fetchPriority=high`. A previously explicit route-head preload generated a second identical resource hint; V28 removes that redundant hint and tests that exactly one remains. Other photos stay lazy.
- **No additional runtime dependency**, sound effects, scroll handlers, fake testimonials, prices, guaranteed availability or autoplay. Reduced-motion support and mobile first progressive enhancement.
- Browser regression adds exact focus checks, step switching, next-step wraparound, image-load screenshot capture, mobile overflow and server-rendered LCP preload assertions.
- Research and release gates: `docs/V28_PROFESSIONAL_QA.md`. Verify latest GitHub Actions run before claiming verified.

Preview in Codespaces on forwarded port 4175, visit `/despre-noi` for the new section and `/` for the prioritized real hero. **Do not merge or deploy without owner approval.**


## V28 CI triage — 2026-11-11
- GitHub Actions run 43043445626 **failed** in the browser interaction audit. The TypeScript strict check, production SSR/Vite build, application tests, architecture validation and Chromium installation **passed**. No screenshot artifact was uploaded because the browser test failed before reaching capture.
- Failure at browser assertion line 29: the selector `head link[rel="preload"][as="image"]` incorrectly chose React's `/favicon.png` preload, not the original Green Sound concert photo. This is a test-selection defect, not evidence of an LCP regression.
- Browser regression now scopes the assertion to `href*="/media/greensound/"` and explicitly checks exactly one such resource with `fetchpriority="high"` and `type="image/webp"` (commit `d8b4a66bcb1eb16c9275014fb0a38966a5852b4c`). The previous first-only selector would silently allow duplicate preloads.
- **No green V28 CI run has been confirmed for this correction.** Do not branch V29 from V28 until all six viewport checks pass, the 404/Frequency/reduced-motion/cursor/Light Desk/Event Pass/Contact assertions finish, and both mobile/desktop screenshots are available for review.


## V29 — Service Mix: interactive service discovery and useful conversion
- Replaces static 8-item catalogue on `/servicii` with a premium two-column **Service Mix** experience: real searchable-by-eye service selection, current image/story, two verified catalogue strengths and a direct link to its detail page. No copied assets and no unsupported service/product claims.
- Visitors can select any combination of the actual eight services, remove one via editable chips, or clear everything; native GET `/contact?services=...` prepopulates the existing quote form through the same bounded allowlist already established in V25. An empty selection disables the CTA, preventing an accidental meaningless request.
- The section uses existing `src/data/site.ts` image and service copy as single source of truth. No fabricated packages, fake pricing, claims about real-time availability, auto-sent WhatsApp messages or extra npm runtime dependencies.
- Responsive mobile stacking (no new horizontal overflow), large touch targets, `aria-pressed`, focus-visible and reduced-motion fallbacks. CSS-only composited image entrance at desktop, no scroll hijacking and no autoplay audio.
- Six-width Playwright regression extends to 390px mix buttons and native quote handoff with two real services, selection reset, plus 1440px layout/screenshots. Verify actual branch CI before declaring validated.
- Research notes in `docs/V29_SERVICE_EXPERIENCE_AUDIT.md`, based on W3C WCAG 2.2 and Google INP guidance.

This is **draft only**, no merge and no live deployment without the owner's explicit approval.


## V30 — Frequency Finder: premium navigation without heavy scripts
- **Frequency Finder** adds a distinctive site-wide, accessible quick-navigation dialog for the existing eight service pages, five event pages and six useful destinations. Filters are built directly from verified service/event copy and route slugs in `src/data/site.ts`. Search is local, case/diacritic insensitive and requires no backend, tracking service or search index downloads.
- Trigger appears on desktop/mobile in the floating header; keyboard shortcuts **Ctrl/Cmd+K** and **/** (except when editing text/another modal is open) open the directory. Radix Dialog provides focus trapping, accessible modal semantics, Escape and backdrop dismissal. ArrowDown from input enters results, ArrowUp from the first result returns to input; Enter or tapping a real link navigates. Empty searches show curated real entry points; no-match searches link to Contact instead of fabricating results.
- Search implementation is **React.lazy / Suspense code-split**: the directory is loaded only after a visitor invokes it. It retains native router links, no autofocus during SSR, no third-party analytics, images or API calls.
- Original matte-green editorial interface, large touch targets, restrained CSS-only reveal for desktop and **prefers-reduced-motion** fallback. The header keeps telephone, quote and mobile menu access.
- Browser QA added at 390/1440px: click/keyboard shortcut, focus, result filtering, diacritic search, no-result fallback, arrow navigation, Escape return-focus, real service route and responsiveness at all six existing viewport widths.
- Audit sources and remaining release gates in `docs/V30_FREQUENCY_FINDER_AUDIT.md`.

Draft development only. No merge into `main`, production deployment or real search-volume/ranking claims without owner approval and measurements.


## V31 — Contact integrity and search-intent research (draft)
- Source: V30 / PR #15. Verified V30 GitHub Actions run 43052202500: completed successfully for commit 427fc392703d50e35567ad8c3ef3d212fdd5621e. No new V31 CI result should be presumed green.
- Hardened client-side Zod quote validation against invented service labels, duplicated services, arbitrary guest-count options, and malformed/impossible ISO calendar dates. Blank date remains valid. Service labels derive directly from the real eight-service catalogue, plus the explicit “Nu știu încă” option. Tests added for these boundaries.
- **Architecture boundary:** Contact is an explicit user-mediated WhatsApp/mailto handoff, not an API submission or automatic delivery. This change does not add a backend, rate limiting, server-side validation, a database, or guaranteed delivery. Do not describe the preview as a sent message.
- SEO research snapshot (2026-11-11): public Romanian search results contain commercial-intent phrases around “DJ nuntă Pitești”, “DJ botez”, “sonorizare evenimente”, “lumini evenimente”, “fum greu dansul mirilor”, and “trupă live nuntă”. These are *SERP content observations*, not measured query volumes, Google Trends, Search Console, keyword ranking or demand estimates. Existing service/event routes should be mapped to intent before creating any new city pages.
- Prioritized follow-up: (1) verify CI and 6-width browser screenshots, including Contact prefill and Event Pass; (2) verify whether the current hosting can support secure server-side delivery before proposing a backend; (3) audit service page titles/FAQ/canonical and compare actual Search Console impressions/CTR if access becomes available; (4) validate structured data with Google's Rich Results Test before release.
- Sources: https://developers.google.com/search/docs/appearance/structured-data/local-business ; https://www.dj-maryo.ro/dj-nunta/oras/Pitesti/ ; https://djmadastudio.com/dj-mc-sonorizare-lumini.html . Competitor pages are only evidence of phrases in page content, not proof of search volume or recommendations to copy.
- **Release gate:** draft only, no merge to main, no deployment or live-domain change.


## V32 — Search Discovery and Social Sharing Quality
- **Canonical XML sitemap** at `/sitemap.xml`: twenty actual URLs — 7 editorial/legal pages, all 8 verified services and 5 actual event types. Consistent trailing-slash canonicals, fully qualified `https://greensoundmusic.com/` origins. Excludes fake locations, broken paths, search query variants and unverified `lastmod` timestamps.
- **Crawler discovery** via one `Sitemap: https://greensoundmusic.com/sitemap.xml` directive added to the existing `public/robots.txt`; crawler access remains open.
- **Social previews**: the existing `pageHead()` now emits `og:image`, `og:image:alt`, real pixel width/height, `twitter:image` and alt from an existing authentic Green Sound photograph. Every service and event detail uses its own already-published photographed page image. Other pages use the genuine concert photograph. No fabricated artwork or social proof.
- **Regression**: unit tests compare all sitemap URLs against actual `services` and `events` in `src/data/site.ts`, reject duplicates, invalid prefixes/lastmod, and verify image metadata/canonical consistency. Chromium checks real HTTP `/sitemap.xml` and `/robots.txt` responses, XML well-formedness, route canonicals and social images alongside existing six-width visual QA.
- **No new runtime dependency, no SEO doorway pages, no changes to pricing or backend and no inferred rankings/volumes.** Search Console submission, public web crawl and social share previews cannot be verified until a real owner-approved staging/production deploy.
- Sources and checklist: `docs/V32_SEARCH_DISCOVERY_AUDIT.md`.

Review-only draft PR #17. Never merge into main or deploy `greensoundmusic.com` without explicit owner approval.


## V33B — Adaptive Performance / Copyable Event Pass
- **Local adaptive performance profile** in `src/lib/performance.ts`: detect explicit reduced-motion, Save-Data, 2G/slow-2G and corroborated low memory/CPU where browser APIs exist. Unknown/unsupported values default to normal presentation; never fingerprint, send or store device signals.
- **Actual reduced work**: don't fetch optional Lenis on lightweight desktop connections; stop Lenis immediately when reduced-data/motion preferences change; skip moving spotlight gradient updates in the StageHero; turn off expensive decorative CSS animations and backdrop-blur while keeping first-party images, scene selection, quotes and real navigation accessible. The user does not lose core content or functionality.
- **Quote copy delivery**: explicit third option to copy the already-validated preview message to the device clipboard. Show success only after the browser confirms `writeText`; if unsupported/blocked, offer a readable, keyboard-selectable textarea for manual copy. Never auto-send or store PII to any backend.
- **Build budget guardrail**: `.github/scripts/check-client-budget.py` reads **actual production output** `.output/public/assets` and fails CI when compressed homepage entry, QuoteForm or shared CSS exceed documented caps based on V32’s real build (+headroom). These are asset-size **regression** budgets, not measured LCP/INP/Lighthouse performance scores.
- **Regression**: new deterministic performance-signal unit tests, Chromium Save-Data session, clipboard permitted/denied flows, full six-width responsive and earlier V20–V32 suite. Full release checklist in `docs/V33_ADAPTIVE_RELEASE_AUDIT.md`. Check latest actual GitHub Actions result before calling V33 green.
- **No new runtime dependency, paid analytics, backend, autoplay, invented claims or public deployment.**

Draft PR #19. Keep `main` and `greensoundmusic.com` unchanged until owner approval.


## V34 — The Guided Event Brief / Event-aware quote UX
- Quote form keeps its two-step review-and-manual-send architecture, but adds an original premium editorial header **"Construim oferta pe ritmul tău"**, an accessible live service count and visible correction notice after validation errors.
- Selecting an existing real event type reveals up to four **curated real services** from `events[].recommended` and `services[]` in `src/data/site.ts`, including each service's genuine company-authored explanation. Suggestions never preselect, price, promise availability or create bookings.
- Both individual service chips and one-click recommendations use a shared pure toggle function: **8 real services maximum**; the “Nu știu încă — recomandați-mi” state is **exclusive** and reversible. The Zod schema independently rejects malicious or contradictory mixed selections. A count and responsive status explain the current state.
- Keyboard/tab and touch work via native buttons/checkboxes; disabled states only after real catalogue ceiling. Original restrained green editorial CSS is motion-safe with no added animation loop or npm dependency. No personal information is stored to browser storage or transmitted silently.
- New helper Vitest checks all five genuine event sets, real service mapping, advisory exclusivity, duplicate removal and schema guard. Chromium checks wedding selection, advice toggle and all eight service limit at 390px; corporate suggestion cards at 1440px, six full responsive regressions.
- Complete QA and factual sources in `docs/V34_GUIDED_QUOTE_AUDIT.md`. Confirm CI and inspect screenshots before treating version as validated.

Draft PR #20 only. Do not merge or deploy `greensoundmusic.com` until owner approval.


## V35 — Accessible form validation (draft)
- Fixed a real Contact accessibility gap: invalid optional event dates were rejected by the Zod schema but the date input did not show the error or announce its description to assistive technology. Date errors now display visibly with `role=alert`, `aria-invalid`, and a linked `aria-describedby`.
- The guest-count select now exposes the same accessible validation treatment for any invalid values (defensive consistency).
- No new dependency, API, database, analytics, external service or automatic message sending. No changes to SEO routes, site assets, event recommendations or V34 business logic.
- Baseline V34 PR #20 Actions run 43085032323 passed. V35 CI must pass independently before review; inspect browser behavior, keyboard navigation and six viewport regressions. No production deployment or main merge.


## V36 — Contact validation accessibility regression
- Preserves V35 date and guest errors and adds `aria-invalid` with conditional `aria-describedby` for location, message and required privacy consent. Error messages remain visible and linked when validation fails.
- Extends real Chromium Contact regression at 1440px: submit empty form, assert name and consent error semantics, and verify no false Event Pass is prepared. Existing six viewport checks and earlier V20–V35 features remain mandatory.
- This is a frontend-only WhatsApp/email preparation flow. No backend, server-side delivery, email API, persistence or anti-spam service is implied.
- CI must be verified on the final V36 commit before treating this version as validated; no main merge or live deployment.


## V37 — Green Sound Frequency Studio / More distinctive music motion
- **Reworked the existing waveform interlude in-place** (not yet another generic homepage section). The old static Frequency graphic is now a premium instrument-like dark-green console inside the editorial ivory section: custom patterned signal bars, legible live readouts, restrained lighting and touch-first controls.
- Three real scene links from the event catalogue: `THE OPENING` → `/evenimente/nunti`, `THE DROP` → `/evenimente/concerte-festivaluri`, and `AFTERGLOW` → `/evenimente/petreceri-private`. Each offers original editorial copy, its own repeatable bar profile and a default **visual** tempo. These illustrative profiles do **not** claim to reflect real music BPMs.
- Visitor can switch among scenes, move an accessible native 68–140 **visual tempo** range slider, and pause/unpause. Exactly 12 of 36 small waveform bars animate with CSS transforms only — no requestAnimationFrame ticker, microphone, Web Audio, audio playback or server API. All meaningful links and descriptions remain visible if animation is off.
- Pauses automatically while the section is offscreen or the browser tab hidden via IntersectionObserver/visibilitychange; preserves V33 low-resource Save-Data rules and OS reduced-motion. Unknown APIs fall back to browser-native behavior; no analytics or localStorage.
- Three scene captions and their actual event links are synchronized and screen-reader-friendly; focus-visible controls and ≥44px targets adapt to phone/desktop.
- Automated Chromium 390/1440: scene switching, no audio, real event route, slider keyboard End→140 and CSS cadence, true animation removal on Pause, resume and offscreen pause; V20–V36 six-width regressions. Screenshot proof, asset budgets, strict TypeScript/SSR build and unit tests required for final CI.
- Rationale, limits and release checklist at `docs/V37_FREQUENCY_STUDIO_AUDIT.md`.

Review PR #23 only. Never merge or deploy to `main`/`greensoundmusic.com` without owner approval.


## V38 — Comprehensive release audit, service media quality and contextual discovery
- **Public vs draft reality**: public WordPress `greensoundmusic.com` still uses the old template (`© 2017`) and the old Contact URL `/contact-green/`; these observations are not evidence of a V38 deployment.
- **301 legacy Contact migration**: `src/routes/contact-green.tsx` redirects the verified WordPress URL permanently to the current `/contact/`. The new 20-page sitemap correctly lists canonical URLs, not redirect aliases; CI verifies the real status and Location.
- **Entire route graph audit**: `.github/scripts/audit-public-pages.cjs` visits all twenty canonical URLs in the actual preview, checks genuine HTTP status, unique H1, site-specific title, description, social share images, same canonical, parseable schema.org JSON-LD, internal navigation graph, and first-party image HTTP presence. No Search Console or real public indexing claims.
- **No repeated photos**: `uniqueServiceGallery` removes the hero photo and duplicates from the reused service-gallery slots. Sidebar photos and additional photo journal get unique real images only once.
- **Premium, actually relevant pairings**: `serviceCompanions` replaces generic always-first-three services with three curated genuine matches for each of eight pages. New image-led dark-green relationship cards contain truthful editorial context, authentic first-party photos, focus and reduced-motion-safe interactions, and real route deep-links.
- **QA**: service discovery and media unit tests, 390/1440 screenshot and first-party links/dupe tests; all V20–V37 regressions, TypeScript, SSR build and client asset budgets preserved. Detailed matrix and remaining release risks in `docs/V38_SITEWIDE_AUDIT.md`; check final CI run before treating version as green.
- **No authorization to merge, deploy or promise rank/availability.** The business inbox is still WhatsApp/email initiated by the visitor until an approved backend provider is connected.

Review PR #24 (draft); production remains unchanged.


## V39 — Canonical URL integrity for structured data (draft)
- Root cause: Schema.org `breadcrumbLd` and `serviceLd` appended a slash unconditionally, while `pageHead` correctly normalized existing trailing slashes. When callers supplied canonical paths ending in `/`, structured data produced `//` and disagreed with the canonical link.
- Introduced a shared `canonicalUrl` helper for metadata, service and breadcrumb structured data. Added regression tests for root, slash/no-slash, duplicate slash, and schema/head parity.
- Scope is strictly SEO correctness: no invented local landing pages, search volumes, backend, new dependencies or design regressions intended.
- Validation pending GitHub Actions for this exact V39 head: strict TypeScript, SSR build, Vitest, gzip budgets, Chromium at 360/390/430/768/1440/1920. Do not merge or deploy until verified.
- SEO backlog: (1) confirm real service geography and original copy with owner; (2) inspect Search Console after connected and authorized; (3) test actual live SERP/social previews only after approved deployment. No claims of first-page rankings.
- Release safety: `main` and production unchanged. Before any future `main` integration, verify CI/CD deploy triggers, create/verify rollback tag, and secure explicit production authorization if merge triggers deployment.

## V134 — Portfolio photo Home/End (DRAFT; QA pending)
Branch `fix/v134-photo-dialog-home-end-keyboard` stacked on V133. Photo dialog supports Home/End to reach first/last visible photo, with updated keyboard hint. No new dependencies or media. CI exact-head, TypeScript/SSR/Vitest/gzip and six-width Chromium before/after screenshots not verified. Do not merge or publish. Next: browser QA of photo keyboard and film deep-link.

## V135 — Portfolio modal origin focus (DRAFT, QA pending)
Branch `fix/v135-photo-dialog-origin-focus` based on V134. Photo modal now preserves the opening thumbnail as the focus-return target when navigating between photos; fallback remains gallery heading. Source change committed; TypeScript/SSR/Vitest/gzip, real Chromium before/after at 390/1440 and four other widths, and exact-head CI remain unverified. Main and production unchanged. Next: film archive flow and full browser regression.
