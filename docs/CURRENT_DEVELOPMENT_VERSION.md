# Green Sound Music — Current development source of truth

Updated: 2026-11-11

## Latest
- Current branch: `design/crafted-atmospheres-v25-event-journal`
- Draft PR: https://github.com/WazzupDoc/green-sound-music-garden/pull/10
- Base version: `design/crafted-atmospheres-v24-stage-stories` (PR #9)
- Hosting: **NOT DEPLOYED**. The public `greensoundmusic.com` website and the repository `main` branch are unchanged.
- Preview: [Open V25 in GitHub Codespaces](https://codespaces.new/WazzupDoc/green-sound-music-garden/tree/design/crafted-atmospheres-v25-event-journal?quickstart=1) then forward port 4175; the workspace preview is private/temporary, not public hosting.

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
git switch design/crafted-atmospheres-v25-event-journal
git pull origin design/crafted-atmospheres-v25-event-journal
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
