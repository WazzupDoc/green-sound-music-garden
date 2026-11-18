# Green Sound Music — V15 Art Direction and Motion Research (10 November 2026)

## Objective
Improve the owner's multi-page prototype after review, reducing repeated photography across key pages and showing real event performance through videos. This document distinguishes independent web references, actual assets already listed in the user's project, and decisions for the standalone prototype.

## Examined premium references, patterns worth adopting
1. **LO2S** — https://lo2s.com/about : stage design, lighting programming and immersive live-event experience as a clear artistic narrative. Adapt the idea of a **single visual moment** with minimal supporting copy; don't borrow its layout, source or third-party imagery.
2. **WHITEvoid** — https://www.whitevoid.com/ : work-first approach to audiovisual art and kinetic light installations. Adapt light as part of a brand system, with beam/haze animation that explains stage production.
3. **Moment Factory** — https://momentfactory.com/ : featured-project presentation and direct information architecture. Adapt selected visual media plus clear routes to Services, Events and Portfolio.
4. **TAIT** — https://www.taittowers.com/live : staged productions presented through authentic case-study visuals. Adapt the idea of **show, don't merely tell**, without copying any TAIT project visuals.
5. **Kicks case study / Chunky Duck** — https://chunkyduck.com/portfolio/kicks : festival-oriented site experience, subtle useful interactions, smooth scroll, responsiveness and fast visual performance.
6. **Mirrad, Awwwards nominated** — https://www.awwwards.com/sites/mirrad : dramatic stage imagery, restrained typography, light system, succinct promise.

## Audit of V14's homepage
- Hero concert image reappeared as the concert card: repeated media within a short distance.
- Three category cards all used the same layout/image treatment; visual sameness reduced hierarchy.
- There was no real event video on the homepage; videos required the visitor to navigate to Portfolio.
- A very large final CTA block repeated the footer contact CTA.
- The box/speaker stage graphic and animated beams were present, but rhythm/audio-video storytelling did not continue through the rest of the home page.
- The photography inventory contains a limited number of licensed/owner-source media items. Reusing them mechanically across pages makes a premium site feel templated.

## V15 implemented
- Homepage hero remains a lightweight concert poster with original green moving beam/haze/equalizer atmosphere; brighter, tuned readability, now with **VEZI SHOWREEL** button.
- Added **one large + two small real-event video tiles** with authentic source video thumbnails, labels and click-to-play, in a cinematic asymmetric grid. Tiles open an accessible closable modal player only after a deliberate click, no autoplay on initial load.
- The category card for concerts now uses a distinct production-stage shot, not the hero image. The technical-services card was rebuilt as a **unique CSS-generated lighting rig and equalizer graphic**, not another duplicate photo.
- Removed redundant lower homepage CTA block; footer CTA remains, home stays concise.
- Added subtle reel hover radiance, scanning light accents and rhythmic microbars, intentionally controlled by CSS; disabled/flattened for prefers-reduced-motion.
- Services: replaced repeating band-photo with the actual original-project TV-performance video thumbnail and the light-service-photo with the project's real show-of-lights video thumbnail. Studio: replaced its repeated feature image with a distinct original-project music-video still.
- Six-page site and accessible navigation unchanged. All edits remain on preview branch `design/green-sound-sillage-open-source`.

## Green Sound project's own video references
Source of IDs: the existing repo's `src/data/site.ts`, not third-party stock content:
- `37QlXW3NlxU` — Nuntă Ramada Pitești / DJ Green Sound & MC Dana.
- `eGLykw1G0EQ` — show de lumini / DJ, MC & LJ.
- `u7EW622vE3Q` — fum greu cu gheață carbonică.
- `nc_aWk8QPIU` — Green Sound band / TV performance.
- `ghCp3g_nn_8` — Green Sound music video.
- `xN0J8_3GlgY` — Muzica ne leagă / studio project.

These are known references in the user's source, but the production team must reconfirm ongoing availability and explicit usage rights before final deployment. YouTube embeds are not downloadable/exportable MP4 assets.

## Why no automatic background YouTube video
- Google's official parameters documentation: https://developers.google.com/youtube/player_parameters ; player autoplay entails sharing playback data on load. One iframe is instantiated after the visitor explicitly clicks.
- YouTube's privacy-enhanced embed guidance: https://support.google.com/youtube/answer/171780 ; embed via `www.youtube-nocookie.com`.
- No mirroring/ripping/editing of video hosted on YouTube; no watermark removal or cropping out attribution.
- A **professional MP4/WebM background reel** would still be the best creative follow-up, **but only when the owner supplies original high-quality rights-cleared footage**. Then ship optimized 8–16 s silent 1080p/720p loop with poster/fallback, `preload=none/metadata`, `playsinline`, and explicit reduced-data/motion rules. Do not pretend current YouTube videos are self-hosted clips.

## QA / open items
- Browser test checks hero mood & lighting buttons, media tiles and player video switching, all 6 pages, desktop and mobile nav, filters and event type prefilling.
- Verify visually captured desktop/mobile homepage and reel, and check mobile text/image balance after each CSS revision.
- Existing Lovable-hosted photos may be transient external dependencies; export the owner's original local media before production.
- Video thumbnails can have limitations at maxres; switch to HQ on load error, don't invent hero footage.
- Evaluate keyboard trap in modal, dynamic controls and all captions in production accessibility review.
- Do not merge or deploy to official site until the owner approves.
