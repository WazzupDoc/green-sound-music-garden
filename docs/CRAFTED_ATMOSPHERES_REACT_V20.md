# Crafted Atmospheres — Green Sound Music (React)
**Design development branch:** `design/crafted-atmospheres-react-v20`. **Not deployed** to greensoundmusic.com and not merged into `main`.

## The real application, not the static prototype
The main Green Sound Music app uses **React 19 / TypeScript / Tailwind CSS 4 / TanStack Start / Vite**. TanStack Start already supports SSR and file-based routes; it was preserved rather than replaced with an empty Vite SPA. This refactor replaces its old homepage and expands its navigable sections with premium original editorial design.

- `src/components/atelier/StageHero.tsx` — cinematic original live-stage interface, real photography, three scenes, subtle moving-head and pointer spotlights (reduced-motion aware), real YouTube showreel only after clicking, accessible Radix dialog.
- `EventsSelector.tsx` — five events with contextually relevant original photos and real route links.
- `ServicesAtelier.tsx` — browsable production services and real photos.
- `EditorialPortfolio.tsx` — curated asymmetric photos and direct real video, not a stock mockup.
- `ClientMotion.tsx` — dynamically imported Lenis for desktop pointer devices only; normal native wheel/touch scroll for mobile, data-saver and reduced-motion.
- `src/styles/atelier.css` — palette, brand typography, light rigs, layouts and responsive breakpoints; imported into `src/styles.css` Tailwind v4 entry.
- `src/components/site/SiteHeader.tsx` — responsive premium navigation with keyboard Escape and actual mobile contact choices.
- `src/routes/index.tsx`, `servicii.tsx`, `evenimente.index.tsx`, `portofoliu.tsx`, `contact.tsx`, `despre-noi.tsx`, `confidentialitate.tsx` — distinct pages with on-page flow, own canonical metadata. Detailed event and service routes were retained.
- `src/components/site/QuoteForm.tsx` — the existing validated quote form with optional services, real telephone and sender-initiated WhatsApp/email handoff, never a false backend-submitted confirmation.
- `src/lib/seo.ts` — truthful LocalBusiness (does not assert venue ownership), Pitești, Argeș and Romania service area, canonical per-page metadata, event/service structured information.
- `src/data/site.ts` — verified business facts, photos and published video IDs; no fabricated customer testimonials or client logos.

## Real owner media (important)
The repo had `src/assets/*.webp.asset.json` pointers to a Lovable project image store that **do not resolve in Codespaces**. The authentic **seven Green Sound WebP photos** were downloaded from the original project CDN after byte-size/WebP-header validation into `public/media/greensound`, with provenance in `SOURCES.json`. Their source manifests remain in the repo. `src/data/site.ts` now points to those local files, so photos load in the actual React preview. Do not substitute other companies' festival photos, and preserve original media rights.

Video embeds in `VideoLite` and the showreel use existing real Green Sound YouTube video IDs and load only after a visitor's click; no automatic music/audio.

## Run directly in GitHub Codespaces, without installing a local desktop app
1. Open Codespaces terminal in this repo and update the feature branch:
   ```bash
   git fetch origin
   git switch design/crafted-atmospheres-react-v20
   git pull origin design/crafted-atmospheres-react-v20
   npm install --no-package-lock
   npm run dev -- --host 0.0.0.0 --port 4175
   ```
2. In Codespaces **PORTS**, choose port **4175** and **Open in Browser**. Open the **root path `/`**, not the previous static `/greensound-prototype/`.
3. The old Python server on 4173 may stay running; it serves the previous HTML design, not this React app.
4. For a local production build in Codespaces: `npm run typecheck && npm run build`. Bun is used in CI, but Node/npm works as an alternative.

## Verification
- Github Actions `.github/workflows/verify-crafted-react.yml` installs dependencies, runs strict `tsc --noEmit`, production TanStack/Vite SSR build and existing project tests.
- Headless Chromium tests use width 360,390,430,768,1440,1920; exercise mode/event/service controls, menu, real routes, contact form, reduced motion, horizontal overflow, and confirm photos from `/media/greensound/` load.
- Screenshots are available in the action's `green-sound-crafted-atmospheres-browser-review` artifact.
- No arbitrary “Awwwards winner” or Lighthouse 100/100 statement is warranted. Test **LCP, INP, CLS**, slow-network image delivery, and accessible keyboard/focus interactions on real devices before production.
- Bundle sizes and image licensing should be re-audited when deploying. The old `public/greensound-prototype` remains to compare and can be removed after the new React version is approved.

## Privacy and provenance
All interactive examples use original markup/styles; open source Motion and Lenis are installed as packages, and their own licenses apply. The company photos are the same image assets provided in the existing repo. Other studios' visual designs are conceptual references, not code or photos to copy.

## Approval gate
**This branch and PR #5 are draft-only.** Do not merge into `main` or update production without the owner's explicit approval and review of desktop/mobile screenshots, texts, metadata, media rights and browser behavior.
