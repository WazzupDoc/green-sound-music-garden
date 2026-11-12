# V48 — Editorial Reset / No More Repeated Widgets
Date: 2026-11-12
Source branch: `design/crafted-atmospheres-v48-editorial-reset`
Review base: V47 `design/crafted-atmospheres-v47-contact-ssr-nojs` (PR #33).
Site live/branch `main` unchanged.

## Why this design intervention exists
Visitor feedback: "lipsește ceva", "se tot repetă chestii", "standard" after seeing the latest Codespaces preview. Earlier V20–V47 delivered useful technical capabilities but overloaded the homepage with seven independent interfaces and repeated photography.

**Homepage before:** StageHero (3 modes + Light Desk + scene card) → QuickBrief (native form) → EventsSelector (5 tabs) → ServicesAtelier (5 tabs) → EventSoundcheck (5 event tabs + 7 service toggles + storyboard) → Frequency Studio (3 mode tabs + BPM) → EditorialPortfolio (3 film tabs + 3 already-seen photographs) → closing CTA → FAQ → another full quote form. This is several implementations of the same question: “what kind of event do you want?”

## Adopted creative direction
Awwwards Music & Sound is a source of art-direction principles, not templates to copy. Useful reference models include bold typographic identity, authentic sound/video-led proof, asymmetry, editorial rhythm and one memorable interaction rather than repeated card panels.
- https://www.awwwards.com/websites/music-sound/
- https://www.awwwards.com/sites/b-o-see-yourself-in-sound
- https://www.awwwards.com/inspiration/residents-club-transit
- https://www.awwwards.com/inspiration/chiara-luzzana-sound-designer-1
- https://www.awwwards.com/websites/luxury/
Respect third-party licensing: **no source code, photography, logos or animations copied** from award sites. All service data and photography are the actual project's existing first-party assets.

## Rebuilt homepage
One role per screen, a short music-production story:
1. **Hero / brand promise:** original real-stage image, oversized identity and a smaller *frameless* scene note; stage scenes remain useful but no heavy secondary UI card. The original accessible Light Desk stays optional and effects obey reduced-motion/Save-Data.
2. **Original `ProductionIndex`:** "Sunetul. Scena. Oamenii." rendered as an asymmetric, paper-toned three-chapter programme (Music / Stage / People). Direct native links to **all eight** real service pages, with legible context and genuine existing photographs. **No tab switching, carousel, or pre-selection required.**
3. **Real film archive:** one original three-chapter YouTube-on-consent presentation, but delete the redundant secondary still-photo strip so existing imagery is not re-shown.
4. **One call to action:** one clear final link to the existing, validated Contact page. **No duplicate embedded form** and no repeated main-page service/event wizard.

Removed from homepage rendering (not deleted from repository/other versions): QuickBrief, EventsSelector, ServicesAtelier, EventSoundcheck, Frequency Studio, home FAQ and embedded QuoteSection. EventsSelector and ServiceMix remain on their dedicated `/evenimente` and `/servicii` pages; event and service detail pages, real photo/video portfolio, and the Contact form stay as before. FAQ structured data removed from Home because the Home FAQ itself is no longer visible; FAQ snippets are retained where the real FAQ content exists.

The fixed audio/video policy remains unchanged: **no automatically played music**, opt-in real video film and CSS-only stage effects.

## Technical QA / release blockers
- [ ] Strict TypeScript, production Vite/TanStack SSR and 25 existing unit tests.
- [ ] Client gzip budget caps maintained; no new npm packages, WebGL or video embed.
- [ ] Chromium at **360/390/430/768/1440/1920**: exactly three chapters, eight direct service links with no duplicate route destinations, one H1, no homepage form or redundant event-service widgets, no overflow, working navigation to actual company service pages.
- [ ] Retina/mobile screenshot review of 3-chapter layout, film and hero readability.
- [ ] Existing hero scenes, Light Desk, 3 real films, contact form, guidance and generated Event Pass; deep-page ServiceMix, full portfolio, 404, canonical sitemap, legacy Contact 301 all still work.
- [ ] Six-width Save-Data and prefers-reduced-motion remain operable without hiding service links.
- [ ] Human review of real client media rights and project story copy.
- [ ] Real-device LCP/INP/CLS and business owner approval still needed before launch.

This is a new *review branch* explicitly for side-by-side visual comparison with V47. Do not merge into `main`, redeploy public `greensoundmusic.com` or delete earlier draft versions without owner consent.
