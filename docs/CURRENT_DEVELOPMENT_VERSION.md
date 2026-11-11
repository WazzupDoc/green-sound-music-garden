# Green Sound Music — Current development source of truth

Updated: 2026-11-11 (V39 draft)

## Latest
- Current branch: `design/crafted-atmospheres-v39-schema-url-integrity`
- Draft PR: V39 pending; base V38 https://github.com/WazzupDoc/green-sound-music-garden/pull/24
- PR review base: `design/crafted-atmospheres-v38-audit-service-discovery` (PR #24); retains all V20–V38 improvements, including Frequency Studio, guided briefs, and safe SEO.
- Hosting: **NOT DEPLOYED**. The public `greensoundmusic.com` website and the repository `main` branch are unchanged.
- Preview: [Open V38 in GitHub Codespaces](https://codespaces.new/WazzupDoc/green-sound-music-garden/tree/design/crafted-atmospheres-v38-audit-service-discovery?quickstart=1) then forward port 4175; the workspace preview is private/temporary, not public hosting.

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
git switch design/crafted-atmospheres-v38-audit-service-discovery
git pull origin design/crafted-atmospheres-v38-audit-service-discovery
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
