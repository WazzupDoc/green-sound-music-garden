# Green Sound Music — Luxury Research & V17 Design Audit
**Date:** 10 November 2026 · **Status:** isolated Codespaces prototype / PR #4 (not production)

## User-supplied references, inspected
- https://www.awwwards.com/websites/luxury/ — category is a useful target for art direction, but direct retrieval timed out during this audit. Do **not** pretend all category members were examined. Representative independently indexed Awwwards examples were reviewed instead.
- https://dribbble.com/tags/premium-website — gallery displays **376** visual concepts at time of lookup (number may change). Some concepts are static mockups, not functioning production sites. Treat them as aesthetic references, never as evidence of UX/performance or as reusable code.

### Relevant individual reference concepts and what can be adapted
1. [LUMEN / Peno Lab](https://dribbble.com/shots/27739388-Editorial-Fashion-Website-Design-Luxury-Fashion-Landing-Page): layered, expressive type and imagery; concise navigation, direct CTAs. Translate its **editorial hierarchy** to a live-event producer, but do not transplant ecommerce visuals.
2. [Luxury Editorial / Roman](https://dribbble.com/shots/27116253-Luxury-Editorial-Web-Concept): dramatic light and large serif headings mixed with minimalist controls. Translate a **single italic editorial accent** into the Green Sound headline while keeping modern concert-production typography.
3. [HENGE (Awwwards)](https://www.awwwards.com/sites/henge-1): dark, textured imagery with a calm, high-contrast hero and understated controls. Adapt the **premium restraint** — not the brand story or imagery.
4. [Aventiora](https://dribbble.com/shots/26815941-Aventiora-Luxury-Travel-Landing-Page-Experience): clean high-end grid, cinematic imagery, breathing room around the narrative. Adapt **art-directed section rhythm**.
5. [Bang & Olufsen](https://www.bang-olufsen.com/): established premium audio brand, an appropriate category-adjacent reference for restrained audio-focused brand identity.
6. [Mirrad](https://www.awwwards.com/sites/mirrad): live-event technical/lightshow niche inspiration already in prior research.
7. Cross-site analysis [Luxury Website Design: 14 Brand Sites Taken Apart](https://dappasol.com/guides/luxury-website-design-examples/) correctly emphasizes that premium character comes from art direction, typography, and responsive media, not indiscriminate animations. This is third-party commentary rather than proof of individual site performance.

## Actual V16 screenshot audit (desktop + 390px mobile)
- The 1440px hero was bold but poster-like: three huge condensed headline lines compete with a heavily boxed stage photo.
- Green was used across almost every section; visual contrast between chapter types was underdeveloped.
- The three offer pathways used a generic 3-across equal card grid rather than a curated, purposeful hierarchy.
- The reel video area had good authentic source imagery but headings/bright pills competed for attention.
- Several page sub-headlines were all heavy condensed uppercase; site lacked a distinctive editorial accent.
- Navigation was functional but visually close to a standard SaaS header.

## What V17 now changes
- Preserve the original Green Sound brand/logo, six real pages and event-first identity.
- Add a **floating, translucent editorial navigation**, retaining all 6 accessible page links and one genuine enquiry CTA.
- Improve desktop/phone hero letter hierarchy: 'SE AUDE.' / 'SE VEDE.' / ***Se simte.*** — final line uses refined serif italic, forest and cream tones instead of full fluorescent green.
- Cinema stage still uses the actual Green Sound project's event photo (with a responsive mobile crop and background lights), showreel button, concert/party/production controls and a real-video modal.
- Add a tiny **pointer-reactive light wash** inside the stage panel for capable desktop pointers; no tracking, canvas or effect when reduced-motion is selected.
- For section rhythm, **warm ivory editorial chapter** follows the dark-stage chapter, with 1 tall featured private-event card and 2 right stacked cards (live and technical). Existing technical card remains a custom animated signal/lighting visual, not repetitive event photography.
- Reel chapter remains dark for visual continuity, using muted champagne accents, smoother video play hovers and quieter typography.
- Inner-page heading accents gain the serif treatment; all 6 pages use same floating bar and responsive details.
- Micro-transitions and controlled photo movement only; no forced smooth page delays, audio playback or heavyweight 3D/GSAP.
- Technical: original V15/V16 CSS still layered under V17 for preview iteration speed; **consolidate these legacy layers before production** to reduce CSS bloat.

## No unlicensed content / no invented proof
- No Dribbble mockup, Awwwards screenshot, HENGE/other company's stage photo or copyrighted template code was copied.
- Green Sound media sources remain the original project's known URLs and embedded published videos. Video plays *only after user interaction* using `www.youtube-nocookie.com`.
- Original concert/production MP4 or WebM files still needed from the owner before a true full-motion background showreel can be produced without relying on YouTube thumbnails.
- This standalone HTML in `public/greensound-prototype` remains experimental and **does not update `main` or greensoundmusic.com**.

## Browser quality gates
- Static: one H1 per page, six navigable pages, V17 CSS linked across all pages, JS syntax.
- Chromium: light modes, photos, video modal, real media buttons, filters, offer form, responsive menu and mobile overflow.
- Captures: desktop/mobile first fold, video reel and the new editorial-services section.
- Verify text wrapping and vertical balance at 1440×900 and 390×844. QA and rights clearance remain necessary before production merge.
