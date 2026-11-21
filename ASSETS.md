### V239 / 2026-11-21
No new assets, photographs, videos, fonts, icons, dependencies or external code. Existing project photographs remain unchanged.

### V238 / 2026-11-19
No assets, fonts, icons, photos, videos or third-party dependencies added; semantic markup only.

### V237 / 2026-11-19
- No assets, fonts, images, video, icons or third-party code added. Homepage copy-only correction.

### V235 / 2026-11-19
No new assets, media, fonts, icons, or dependencies. Existing service arrows are unchanged Lucide components; only their CSS motion eligibility changed.

### V234 / 2026-11-19
No new assets, fonts, images, licenses or external dependencies; existing authorized assets unchanged.

### V233 / 2026-11-19
No new photographs, fonts, SVGs, icons, third-party scripts or dependencies. Existing authorized media untouched.

### V232 / 2026-11-18
No new image, icon, font, video or third-party dependency. Existing Lucide ArrowUpRight reused. No new external media or license obligations.

### V217 / 2026-11-18 — Navigation service glyphs
- `src/components/site/ServiceSigilV217.tsx`: eight original hand-authored SVG service pictograms plus three chapter diagrams, created for Green Sound; first-party, no third-party icon source or external licensing.
- `src/styles/navigation-v217.css`: first-party CSS. Existing Lucide icons reused from project dependency; no new package, fonts, photos, videos, tracking or fabricated event media.

### V215 / 2026-11-18 — Restore existing asset provenance
- V214 generated procedural Score artwork is not used in the new V215 branch, nor is the V214 navy palette. V215 uses the V213 original first-party event image, existing CSS/SVG audio console illustration, Green Sound logo and existing icon set. Minor original CSS-only material styling and search chips; no new assets/photos/audio/fonts/licenses/external packages. The console is an abstract decorative illustration, never an actual real-world Green Sound device.

### 2026-11-18 — V213
- No new assets, fonts, images, icons or dependencies. Only native Node path resolution in a test fixture; asset provenance unchanged.

### V212 / 2026-11-18
- No new images, fonts, media, packages or external assets. Contact feedback uses existing styles and native ARIA semantics.

### V206 / 2026-11-17 — Asset audit
- No new media, fonts, icons, external code or dependencies. Event film players reuse the existing project VideoLite and already-referenced films. No social clips imported.

### V201 decoder QA clarification — 2026-11-17
- An investigation of the WebP verification revealed the direct `Image().decode()` assertion was executed on an `about:blank` page, so the relative `/media/...` URL did **not** resolve to the local Vite site. The original AVIF decoder failure had the same test-origin bug; it is **not evidence that AVIF lacks Chromium support**. Corrected QA now navigates to `http://127.0.0.1:4175/evenimente` before decoding. Selected WebP asset remains preferred for conservative browser compatibility; no claim of AVIF incompatibility.
- Actual screenshot evidence from the V201 partial workflow shows all 13 drawn icons visibly in the page, even though later test assertions failed. Need final exact-head, same-origin decode pass before release.

### V201 final codec correction — 2026-11-17
- The initial optimized 29,919-byte AVIF failed **actual Chromium decoding** despite valid HTTP and local Pillow decoding, so it was removed from the branch. Final integrated asset: **`public/media/gs-category-illustrations-v201.webp`**, original cropped illustration atlas of **13 cells / 1120×320px / 45,888 bytes**, WebP q62, local path with no external CDN. No change to source composition or usage rights.
- Source ImageGen boards and original generated faces are **illustrative**, not Green Sound real photographs or people; no AI event depiction was presented as real client media. User explicitly authorized integration of these generated boards.

## V201 / 2026-11-17 — Generated artwork explicitly approved for use by owner
- **Origin:** two brand-oriented icon concept boards generated in the current ChatGPT conversation on 2026-11-17, by OpenAI ImageGen, generation IDs `48b1aa27-5f50-46e8-9e8c-d9a591d80e05` (events) and `c03b38cf-70ff-4306-8efe-c4110707e8e1` (services). The owner replied **„Acum folosește-le”**, authorizing integration into this website. This is AI-generated conceptual illustration; do **not** describe as a real Green Sound event, personnel, customer, photo, equipment inventory, or trademark logo.
- **Derived original asset:** `public/media/gs-category-illustrations-v201.avif`, 1120×320px, 29,919 bytes, AVIF q48. 13 individually cropped, text-free illustrations (7 columns×2 rows, 160×160px per cell), arranged as: first row `nunti`, `botezuri`, `evenimente-corporate`, `concerte-festivaluri`, `petreceri-private`, `dj-mc`, `trupa`; second row `echipamente-de-sunet-si-lumini`, `masina-fum-greu-cu-gheata-carbonica`, `studio-inregistrari`, `hostess`, `ursitoare-botez`, `start-veselia`. Crops preserve only pictorial portions; generated headings and graphical brand text are excluded.
- **Use:** `CategorySignal.tsx` coordinates the 13 background positions; `category-illustrated-v201.css` supplies route-local style on `/evenimente` and `/servicii`. Native headings/links remain semantic and independently readable. The old `CategorySignal` first-party line SVG stays as a visual fallback for Save-Data browsers, not a new asset.
- **Rights/provenance:** user-requested OpenAI-generated art, not third-party stock or licensed music. No claim of exclusive copyright/trademark rights; no external source media, fonts, screenshots or people added. The illustrated hostess is a fictional stylized person, not a Green Sound employee, and must never be repurposed as a team photo. Material for actual events still requires original authorized photos.
- **Performance:** 29.2 KB single AVIF atlas, local path, no runtime image CDN, external calls, costs, tracker or dependency. Verify real image loading and screenshot artwork in Chromium before shipping; future fallback for browsers without AVIF could use a WebP copy if user evidence demands it.

## V198 / 2026-11-17 — Category Signal asset provenance
New `src/components/site/CategorySignal.tsx` contains 13 original vector drawings authored in code specifically for the site's own catalogue; `src/styles/category-signature-v198.css` contains original CSS. No image generation, third-party icons, animations, photo/audio/video, remote font, tracking, API or paid dependency was introduced. These vectors are decorative UI, **not actual live sound measurements, equipment photos or event documentation**. Existing Green Sound hero/film imagery and logo are unchanged. Webflow/MDN URLs are documentation/research references only — no copying or license inheritance asserted. Original TikTok reference clips remain excluded.

## V197 / 2026-11-17 — No new third-party assets
Event page source reuses existing Green Sound media from `src/data/site.ts`, already in project. No new images, fonts, music, videos, icons, SVGs, logo, external code, dependencies, analytics or costs. Original CSS markup uses existing licensed project font dependencies (no font files redistributed). /nk Studio and Sirnik Studio were consulted for UX inspiration only; neither photography nor templates nor code were integrated. TikTok reference clips remain excluded from publishing.

## V195 / 2026-11-17
No new images, fonts, icons, audio, external scripts or dependencies. Contact preview uses only user-entered values and existing CSS. No third-party license introduced.

## V185 / 2026-11-17
No new assets, fonts, libraries, external code or imagery. Existing Green Sound media unchanged; no licensing changes.

## V173 / 2026-11-16 — Owner-source media, original animation
No new font, media, photo, icon font, music, logo, external JS, package or analytics. Event foreground image is solely event.image from the existing Green Sound source catalogue in src/data/site.ts. The original "gate" transition panels and inline waveform graphic are purely decorative first-party CSS/SVG, not measurements or claimed deployed stage equipment. Existing lucide-react icons reused from the project's dependencies. Webflow reference pages are research only; no source code or image licensed for incorporation.

## V172 / 2026-11-16 — Event Direction Console
Only existing `events[].image` media in `src/data/site.ts`, inherited from the owner Green Sound catalogue; no newly downloaded/imported/generated photos. The waveform path and equalizer bars are original CSS/SVG UI decoration and **not actual event sound measurements**. No new sound/video/font/logo, package, external API or license. External Webflow/Awwwards examples used for research only (no copying).

## V171 / 2026-11-16
No new image, font, audio, video, code package or third-party asset. Contact query validation only.

## V170 / 2026-11-16 — Owner reference vs live site asset provenance
Owner-selected bottom-right design image and subsequent generated high-fidelity concept are **visual reference only**. The site does NOT ship the AI-generated screenshot as a genuine concert photograph, does not display invented 500+ events/15+ years/100% metrics, and does not import other-company photography. Real assets all originate from the prior Green Sound media catalogue (`images.concert` initial stage and CTA, `images.dj`, `images.scena`, `images.fum` from Green Sound's own existing YouTube video, `videos.showLumini.poster`, `videos.neatza.poster`, and three published Green Sound video entries). A live-mixing console, animated stage beams and light/equalizer strip are **new, intentionally decorative CSS/HTML illustrations** rather than claims of photographed installed equipment. No external design source/code/art is copied; no new font file or licensing introduced. Authentic film thumbnails and dialogue preserve original titles; videos are visitor initiated.


## V169 / 2026-11-16
Original source-authored inline SVG waveform and CSS mixing-console faders in ProductionHeroV168.tsx/home-v168-dark-live.css. Provenance: newly authored first-party abstract decorative artwork, no external media/license or attribution requirement. The existing project hero photo is unchanged and retains its existing provenance; schematic is NOT a photograph of actual company equipment.

## 2026-11-16 / V168 provenance
V168 adds **no external image, video, fonts, sound or JS library**. It reuses the existing project `images.concert` (hero initially), `images.dj`, `images.scena` (user-controlled mode), first-party chapter images, existing 3 film posters and VideoLite video references. Their previously documented ownership/permissions are inherited, not asserted anew. The existing brand logo stays in SiteHeader; V168 does not embed TikTok reference clips or show generated media as client work. Original authored files: `src/components/atelier/ProductionHeroV168.tsx` and `src/styles/home-v168-dark-live.css`. Awwwards/Webflow references: study only; no templates/code/visual assets copied.

## 2026-11-16 / V166 asset provenance
No new images, video, fonts, icons or audio assets introduced. Homepage V166 reuses the existing `images.concert`, `images.dj`, `images.scena` (hero scene selector), original `ProductionIndex` service images, and existing `EditorialPortfolio` film sources. Media origin/ownership status is inherited from the repository's existing asset catalogue; no new permission is implied. No Awwwards/Webflow sample media or TikTok references copied. New styling is original CSS only. Verify source URLs, image decode and owner publishing rights before merge.

## V161 / 2026-11-16 — Genuine media only / no new licenses or files
No new assets were downloaded or generated and no new packages added. The first-screen `/portofoliu` photograph is the already catalogued `images.concert` at `/media/greensound/concert-public-lumini.webp`, sourced from the existing Green Sound project. The six atlas images are existing `galleryFrames` project entries `images.concert`, `images.dj`, `images.scena`, `images.ursitoare2`, `images.hostess`, `images.copii`; accessibility alt texts and original URLs retained. Film stills are `video.poster` local project files where provided (the first three original video posters), and previously used YouTube `ytThumb(video,"sd")` for remaining published recordings, **not a claim that external thumbnails are owned as source images**. VideoLite defers third-party iframe until visitor presses Play. All external design references serve as inspiration only; no templates/media/fonts/code/licensed visuals copied. Added code `portfolio-directors-cut-v161.css` is original first-party route-scoped CSS; no font files sent. Source/provenance audit of historical images remains in earlier ASSETS sections.

## V160 — 2026-11-16 — no new external assets
New independent cinematic hero uses only existing project-authorized `images.concert`, `images.dj` and `images.scena` from `src/data/site.ts` (all under `/media/greensound/`). Real films remain the existing `videos.showLumini`, `videos.nuntaRamada`, `videos.neatza` from the catalogue; `VideoLite` requires a click and does not start automatic audio. No TikTok social clips/frames re-used, no AI/stock photos presented as real, and no new fonts/logos/third-party packages, CSS libraries or external downloads. Original project media provenance remains governed by prior ASSETS entries. LO2S, Studio Øraya, Bunker Productions referenced only at a high conceptual level, not licensed code/media. New source files `ProductionHeroV160.tsx` and `home-direction-v160.css` are first-party original code.

## V159 / 2026-11-16 — Original poster typography, no new external assets
No external image, video, music, font, logo, code snippet, or design resource added. Hero still renders native project `images.concert` / `images.dj` / `images.scena` via original `StageHero.tsx`, mode-select switches media, and film buttons point to existing owner-used YouTube video IDs only after visitor click. All new design is independent local CSS `home-cover-v159.css`. The Awwwards/Webflow/Narrow Labs reference designs are **inspiration only** without copying or asserting public reuse licensing. Existing `ASSETS.md` asset provenance applies. No new package or external tracking request.
## V158 / 2026-11-16 — Significant homepage art direction, no additional assets
No downloaded/licensed/stock/AI images, no new third-party font, logo, music, code, video or design template. Existing project catalogue `images.concert` / `images.dj` / `images.scena` and the three previously published authorised film resources remain source media. `KineticShowWall` uses these existing pictures, but the appearance changes to a compact cinematic contact print via first-party CSS. No external code copied; Webflow/Awwwards inspiration cannot be treated as license. Source change 21 kB original CSS, SSR route-scoped rather than new global styles, no package additions. Publication provenance of all existing assets unchanged.

## V157 / 2026-11-16
No new photographs, videos, logos, fonts, external icons, audio or third-party code. Original HTML/CSS production signal path on Contact; existing Lucide ArrowUpRight and first-party typography reused. Webflow/Awwwards references were used only for design research, not copied. No additional licenses/attribution required. Historical authorised assets unchanged.

## V155 / 2026-11-16
No new assets, third-party code, fonts, images or licenses; first-party utility-class change only.

## V154 / 2026-11-16
No new media, fonts, icons or third-party code. Native CSS layout only; existing assets unchanged.

## V141 / 2026-11-15
No new images, icons, fonts, audio, videos or third-party code. Native button + existing project CSS utilities only.

## 2026-11-15 V139: No new assets, media, fonts, icons or third-party code. Existing Lucide icons unchanged.

## V138 — 2026-11-15
No new assets, external code, fonts, media or dependencies. Existing authorized gallery imagery unchanged.

## V133 / 2026-11-15
No new assets, fonts, media or dependencies. Existing video metadata reused; provenance remains unchanged.

## V132 / 2026-11-15
No new images, fonts, audio, icons, libraries or other assets; existing Green Sound media unchanged.


## V131 / 2026-11-15
No new images, videos, fonts, icons, external code, dependencies or licenses; accessibility-only source change.

## V130 / 2026-11-15
No new assets, photos, fonts, icons, audio or third-party code. Existing footer visuals and first-party media unchanged.

## V129 — 2026-11-15
No new external media, font, icon, library or copied design. Existing `images.scena` and `images.dj` retained unchanged. Production-score rail is original CSS geometry; no external license/attribution needed.

## V128 — 2026-11-15
No new media, fonts, SVGs, icon packs or external code. Existing company media unchanged. Native URL fragment and existing Tailwind utility only.

## V127 / 2026-11-15
No new image, video, font, icon, asset, library or third-party code. Existing authorized event images and Lucide icons unchanged. Native CSS/React edits authored for project.

## V126 — 2026-11-15
No new assets, photographs, fonts, music, logos, icons or dependencies. Existing event imagery and existing Lucide ArrowUpRight reused. CTA layout and CSS authored in project; no external code copied.

## V125 — 2026-11-15
No new photos, videos, fonts, icons, packages, or external code. Existing Green Sound images and authorization status unchanged.

## V124 — 2026-11-14
No new images, fonts, videos, icons, dependencies or third-party code. Existing Green Sound video metadata reused; ownership/authorization unchanged.

## V103 — 2026-11-14
No new images, fonts, icons, videos, packages or third-party code. Existing site media unchanged.

## V102
No new assets, fonts, media or third-party dependencies. Existing gallery images unchanged.


## V95 About (2026-11-13)
No new media/fonts/dependencies. Reuses existing project images `images.scena` and `images.dj` from `src/data/site.ts`; existing provenance and owner rights still require release confirmation. No stock/AI/TikTok captures added. New CSS is original project-authored code.

## V94 navigation / 2026-11-13
- No new images, audio, fonts, videos, logos, stock, AI-generated event material, dependencies or external code. Production-cue layout, typography and interaction authored in repository CSS/React; existing brand wordmark, Lucide icons and real links reused. Source references in RESEARCH.md are inspiration only, not licensed assets.

## V93 footer (2026-11-13)
- Original CSS typography and native text only; no imported photos, video, commercial fonts, icon packages or third-party code. Existing logo, links and LightDesk remain as previously documented.

## 2026-11-13 V90 / perspective show wall provenance
- **No new photograph or video**; purely new authored CSS and React geometric rendering. `src/components/atelier/KineticShowWall.tsx` references three **existing locally packaged** media entries from `src/data/site.ts`: `images.scena` (green stage lights), `images.dj` (people/music; an event photo, **not** purported mixer hardware), `images.concert` (concert crowd). Each references an existing `public/media/greensound/*.webp` local file. Existing owner rights/usage conditions remain unchanged.
- The new animation is made entirely from CSS transform/opacity over original photos; artificial visual layers are explicitly graphical, not recordings or actual live sound levels. All labels STAGE / PEOPLE / LIVE are editorial chapter labels, not client names or proven results.
- New image source files downloaded/created for site: **none**. No clip harvested from TikTok/Instagram, no stock, no AI-generated human/show passed as actual. No third-party code/font/icons added.
- CI screenshots, when available, are actual Chromium rendering evidence (screen size and motion state), *not marketing media* or permission to publish photos. V89 before CI artifact https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43425095295/artifacts/14037051076 ; V90 after artifact pending.
- Brand image rights must still be confirmed before public production deployment; do not infer license from repository presence.

---

## 2026-11-13 — V89 imagery and art declaration

- Added to website: **NO new image, font, stock, music, video, or logo**. Homepage uses only existing project media `images.concert`, `images.dj`, `images.scena`, `images.ursitoare` and the three first-party film posters registered in `src/data/site.ts`.
- V89 graphics: original existing SVG signal in StageHero, presented in a more dominant but still decorative hero composition. This waveform is illustrative, **not real-time sound measurement or a captured audio signal**. All authored CSS `src/styles/home-event-v89.css`.
- AI-generated user's reference webpage screenshot is used ONLY as visual direction, not embedded or sliced into fake Green Sound event photos. Previously uploaded TikTok clips are business context, NOT permission to place frames in public site.
- Browser screenshot evidence must refer to exact GitHub CI artifacts with recorded source SHA, route, 1440/390 widths. They are captured actual UI screenshots, NOT marketing assets.
- Prior rights/provenance conditions for existing photos and video posters remain; require owner approval of original media sources for production.

---

## V87 — 2026-11-13 actual first-party published-film posters
- Existing repository files reused as 3 poster thumbnails in EditorialPortfolio: public/media/greensound/film-nunta-ramada.webp, film-show-lumini.webp and film-studio-live.webp. All three were already referenced by real video entries in src/data/site.ts; no new external material, TikTok frame, stock/AI stand-in or third-party license introduced.
- These posters are previews for existing filmed content, NOT a claim that a new client/festival/event was created. Video playback still only on explicit user click; Google/YouTube resources not preloaded by thumbnail selection.
- Browser decoding from local repo paths verified at 6 viewport widths by CI app source commit 05e4dc891ebc9006ea197b2f49d7fe7913c60752, screenshot artifact https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43420893062/artifacts/14033568505, including film contact sheet 1440/390. Screenshots are evidence, not standalone approved marketing artwork.

---

## V86 — 2026-11-13 / asset and screenshot provenance
- No new photograph/video/font/music was added. Hero and editorial services reuse already existing local project assets: images.concert, images.scena, images.dj, images.ursitoare from src/data/site.ts. Owner must still confirm original usage rights where relevant.
- NEW visual: original inline SVG branded sound-signal line in StageHero.tsx, aria-hidden and purely decorative. Not a real waveform reading, AI-generated event image, or a client logo.
- Retired from live homepage rendering: ProductionDeckArt.tsx synthetic mixer, V79 portal geometry, V83 fake signal-ledger stickers, V84 and V85 CSS layers. All remain in repository history for rollback.
- First actual V86 CI browser screenshots artifact: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43418750372/artifacts/14033232086 (source SHA db92e4609b265dfd1fd6058c9d0ebcef36108694), at 6 real Chrome widths, also original waveform full motion and Lite. Final mobile tweak captured in newer run once verified.
- No extracted TikTok/Instagram material, no fabricated screenshots and no unverified external stock assets integrated.

---

## V85 — 2026-11-13 / actual media and abstract technical SVG

- New creative illustration `src/components/atelier/ProductionDeckArt.tsx`: original 10-channel vector console, self-authored, no license obligation or external assets. **Not a real company soundboard photograph, real meter, client or stage event; purely a graphic representation of production technology.** No tracking, audio API, hardware API or embedded commercial marks.
- Reused existing first-party assets in `src/data/site.ts`: `images.concert` (audience photo) and `images.scena` (green-lit stage photo); the latter is a NEW use of an already present local asset, not a new image source or fabricated event. Preserve alt/size/decoding on meaningful main photo, use empty alt/ARIA-hidden for duplicate decorative stage inset.
- Three service chapter photos unchanged: `images.dj`, `images.scena`, `images.ursitoare`; new service shapes and existing photos require no new copyright grants from us, but owner confirms rights before live use.
- No extracted TikTok/Instagram footage, no AI-generated pictures claiming real show/crew, no third-party icon sets, fonts, packages or licensing cost.
- Browser evidence: before V84 [artifact #14030745424](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43412440606/artifacts/14030745424). Updated V85 actual screenshots and source SHA to be linked following final exact-head GitHub Actions confirmation; these are screenshots of the site, not creative assets to market as real event photos.

---

## V83 — actual screenshot provenance (2026-11-13)
- Original project media: all three service photos local from `public/media/greensound/`; verified by Chromium decoding and `naturalWidth > 0` at 360/390/430/768/1440/1920. No new files used for the site or TikTok videos reused.
- CI screenshots [artifact 14029615502](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43409515536/artifacts/14029615502) are actual Chromium captures of V83 source SHA `fd604c60630f9498555145805c07b250666a8d2e`, NOT promotional image assets. Comparisons to V81 require disclosure that V81 screenshots were missing lazy-loaded photos.

---

## 2026-11-13 — V83 original decorative UI assets
- New media files, music, video, fonts, external icons, third-party scripts: **none**.
- New original visual: `src/styles/production-signal-v83.css` and `ProductionIndex.tsx` implement 3 custom channel engravings (CSS/HTML only; not audio-reactive, not actual mixer readings); no rights/credit needed beyond Green Sound's own code.
- Reuses exactly 3 existing local image refs (`images.dj`, `images.scena`, `images.ursitoare` from `src/data/site.ts`), with known repo assets `public/media/greensound/`. Any original licensing / image usage rights remain as documented in prior versions, unverified here.
- Uploaded TikTok material is **context of business activity only** and is not integrated into site, images or screenshots of commercial events.
- Browser screenshot artifacts must show images with `naturalWidth > 0`; prior screenshots may include unloaded lazy assets and are not authoritative before/after evidence. Post exact-head run ID / screenshot artifact only after verified results.

---

### V81 screenshot evidence (browser output, not an external site asset)
- [GitHub Actions artifact #14024876141](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43399390064/artifacts/14024876141): real Chromium screenshots of homepage and V81 menu on 360/390/430/768 plus motion/Lite at 390; generated from branch SHA `98dacdb0686d76e3943afcb49f646b8578cf6eb5`, not AI mockups, not included in public production media. No matching before screenshot of the old modal open, so do not label this as a before/after comparison.

## V81 — 2026-11-13 / Original Stage Index navigation

- New images, video, audio, commercial fonts, external scripts, third-party icons, Unsplash requests: **none**.
- `SiteHeader.tsx` two inline thin-line SVG drawings (stage portal and directional/cross glyphs) are original and self-authored, no external code, image or license obligation.
- Existing Green Sound favicon, fonts and verified site data remain unchanged. Professional design references are **not** included as site assets.
- Screenshots, if captured by GitHub Actions, are evidence of the actual branch, not marketing assets; screenshot links and date to be added only when verified.

---

## V78 — 2026-11-13 / Screen-visible art direction

- New media / fonts / icon sets / scripts from external vendors: **none**.
- Reused image source: `images.concert`, `images.dj`, `images.scena` from `src/data/site.ts`; images are presented as existing Green Sound project media, not new stock or generated assets. Original ownership/source documentation should be checked before live publishing.
- Decorative `gs-stage-v78__aperture` and `gs-stage-v78__light-sweep`: original CSS-only geometry, no attribution/license required and no new fetch. It is not an image of any event.
- Existing user-requested earlier generated images are NOT present in the new hero integration; do not claim integration or reuse without an actual verified repository asset and provenance.
- Styling of existing portfolio, services, Light Desk and other components is now restored to the actual CSS entrypoint; no new asset URLs.

---


## V77 (2026-11-13)
No assets, fonts, videos, imagery, or external libraries added. Native HTML and existing React only.

## V76 — 2026-11-13

No assets, fonts, images, video, or dependencies added. CI screenshots are generated from the existing original-media site and are not presented as newly sourced media.

## V75 — asset provenance

No new photographs, footage, fonts, icons, logos or third-party code. This iteration changes only CSS regression assertions and project documentation. Existing first-party media references unchanged. No external licensing impact.

## 2026-11-13 — V73 CI repair

No new media, fonts, icons or dependencies. Existing first-party Green Sound media unchanged. Only TypeScript guard and tests.

## 2026-11-13 — V71

No new photos, videos, icons, fonts, music, packages, external images or licenses. Restores existing V48 StageHero / ProductionIndex / EditorialPortfolio components with existing first-party media references. Ownership and provenance verification remain a release gate.

## 2026-11-13 — V70

No new photographs, videos, fonts, sounds, icons, third-party code or dependencies. Existing first-party service images remain in place. Only CSS motion policy and original regression test were added; no new attribution or license obligations.

## 2026-11-13 — V69

No new media, fonts, photos, audio, icons, packages or third-party code. Original Gregorian date-validation logic and Vitest regression only. Existing owner-media provenance unchanged; image-alt changes deferred until source-image audit.

## 2026-11-12 — V68

No new assets, code libraries, fonts, photos, audio, icons, videos or license obligations. Native JavaScript Map and original project tests only. Existing Green Sound media provenance unchanged.

## 2026-11-12 — V67

No new image, video, audio, font, icon, package or third-party code. Original TypeScript guard and Vitest regression only. Existing asset provenance and permissions unchanged.

## 2026-11-12 — V66

No new images, icons, fonts, video, audio, packages or third-party code. Existing first-party imagery and Lucide remain unchanged. New TypeScript guard and test are original project code; no new license obligations.

## 2026-11-12 — V65 asset ledger

No new image, video, font, icon, sound, library or external asset was introduced. Existing original assets remain unchanged. Reference W3C WCAG 2.2: https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context (documentation only; no code copied).

## V64 — 2026-11-12

No assets, libraries, fonts, icon packs, sounds or photos added. Uses existing first-party imagery and native HTML semantics only. No new license obligations.

## V63 — 2026-11-12

No new assets, fonts, images, icons, external embeds or dependencies. Existing first-party Green Sound photography remains unchanged. No licensing assumptions added.

Updated V62 2026-11-12: no new media, font, icon, sound, image or dependency. CSS-only touch behavior and Vitest test; existing first-party images and Lucide ISC license unchanged.

Updated V61 2026-11-12: no new assets, dependencies, fonts, sound, images, video or icons; test-only quality hardening. Existing first-party media and Lucide licenses unchanged.

Updated V60 2026-11-12: no new assets, external libraries, font files, video or sound. Existing Lucide arrow remains. CSS-only change; no additional license obligations.

Updated V59 2026-11-12: no new images, video, fonts, icon packages or external assets. Existing Green Sound first-party images and Lucide arrows retained; CSS selector-only accessibility refinement.

Updated V58 2026-11-12: No new assets, fonts, icons, video, images, sounds or packages. Existing first-party media and ISC-licensed Lucide remain unchanged. CSS-only hover improvement has no third-party license obligations.

Updated V56 2026-11-12: No new image, font, sound, icon, library or license introduced. Existing first-party images and existing Lucide navigation arrows unchanged. CSS focus cue is original project styling.

# ASSETS — Green Sound Music

Updated 2026-11-12. No new third-party media added in V55.

| Asset | Origin | Usage | License / verification |
|---|---|---|---|
| `images.dj`, `images.scena`, `images.ursitoare` from `src/data/site.ts` | Existing Green Sound first-party project paths `/media/greensound/` | Editorial chapter images, descriptive alt, intrinsic dimensions | Existing owner content; ownership/permission should be confirmed before public deployment |
| `ArrowUpRight`, `MoveUpRight` | Existing `lucide-react` package | Navigation cues | ISC, https://github.com/lucide-icons/lucide |
| CSS service numbering 01–08 | Original CSS written for Green Sound | Decorative editorial running order | Project-owned code; no third-party dependency |

No stock photos, AI-generated people, external fonts, music or videos were added. Any future non-owner asset must have an item-level license and attribution review first.

## V72 (2026-11-13)
No new images, fonts, video, icons or dependencies. Existing Green Sound hero photography remains unchanged. Decorative light layers are original CSS and are suppressed in Lite/reduced-motion modes.

## V74 (2026-11-13)
No assets, fonts, images, videos, third-party code or dependencies added. Eight fixture-reading tests changed only their local filesystem path resolution.

## V101 portfolio dialog
No new media, fonts, icons or dependencies; uses existing approved portfolio images and Lucide icons.

## V134 — 2026-11-15
No new images, fonts, video, icons, music, packages or third-party code. Existing photo archive retained.

## V135 — 2026-11-15
No assets, dependencies, fonts, icons, music, photography or videos added. Existing authorized gallery reused.


## V188 / 2026-11-17
No new media, icons, fonts or packages. Service photos remain the existing project catalogue assets; their pre-existing provenance is unchanged. New layout CSS is original.


## V189 / 2026-11-17 — navigation
No new images, audio, video, SVG assets, font packages, third-party code or runtime dependencies. The five level bars are original local HTML/CSS decoration, not live audio data. Existing brand logo remains unchanged. Research sources are inspiration/documentation only, not redistributable assets.

## V191 / 2026-11-17 — Portfolio cinema
No new pictures, source footage, font, icon, package, library or licensed asset added. Film posters and videos are already in src/data/site.ts; the existing VideoLite component does not load YouTube until explicit Play. Film perforation, typography layout and indexed tracklist are original CSS and markup, not third-party content. No social/TikTok clips or generated event footage were used.
