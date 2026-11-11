# Green Sound Music — Current development source of truth

Updated: 2026-11-11 (V28)

## Latest
- Current branch: `design/crafted-atmospheres-v28-production-journey`
- Draft PR: https://github.com/WazzupDoc/green-sound-music-garden/pull/13
- Base version: `design/crafted-atmospheres-v27-motion-and-offstage` (PR #12), retaining all earlier V20–V27 work.
- Hosting: **NOT DEPLOYED**. The public `greensoundmusic.com` website and the repository `main` branch are unchanged.
- Preview: [Open V26 in GitHub Codespaces](https://codespaces.new/WazzupDoc/green-sound-music-garden/tree/design/crafted-atmospheres-v28-production-journey?quickstart=1) then forward port 4175; the workspace preview is private/temporary, not public hosting.

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
git switch design/crafted-atmospheres-v28-production-journey
git pull origin design/crafted-atmospheres-v28-production-journey
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
- **LCP hint:** the single first-party homepage concert image is discoverable in SSR HTML with `rel=preload`, `as=image`, explicit `fetchPriority=high` and the truthful WebP MIME type. The hero actual `img` still sets `fetchPriority=high`; gallery images remain lazy.
- **No additional runtime dependency**, sound effects, scroll handlers, fake testimonials, prices, guaranteed availability or autoplay. Reduced-motion support and mobile first progressive enhancement.
- Browser regression adds exact focus checks, step switching, next-step wraparound, image-load screenshot capture, mobile overflow and server-rendered LCP preload assertions.
- Research and release gates: `docs/V28_PROFESSIONAL_QA.md`. Verify latest GitHub Actions run before claiming verified.

Preview in Codespaces on forwarded port 4175, visit `/despre-noi` for the new section and `/` for the prioritized real hero. **Do not merge or deploy without owner approval.**
