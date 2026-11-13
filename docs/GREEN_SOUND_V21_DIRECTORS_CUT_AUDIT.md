# Green Sound Music V21 — Director’s Cut: research, decisions and audit
**Branch:** `design/crafted-atmospheres-v21-directors-cut`  
**Review:** https://github.com/WazzupDoc/green-sound-music-garden/pull/6  
**Safety:** Draft development. No production publishing, no merge to main, no changes to greensoundmusic.com.

## Research synthesis (11 November 2026)
This iteration is intentionally based on the brand's live production capabilities and original materials, not on a cloned Awwwards template.

| Source | Observation | Design decision |
|---|---|---|
| Awwwards Music & Sound and Luxury galleries: https://www.awwwards.com/websites/music/ and https://www.awwwards.com/websites/luxury/ | Premium motion sites frequently employ editorial typographic contrast, cinema-like presentation and decisive interaction hierarchy. | Preserve distinct obsidian/ivory typographic art direction and a scene-based interaction; add a coherent film console, not an unrelated 3D demo. |
| Awwwards design discussion: https://assets.awwwards.com/awards/gallery/2023/07/HOT-RIGHT-NOW-BOOK-2023.pdf | Copying the same animation or layout trends makes different brands look identical. | Original "Director's Cut" filmography and an event-production-specific enquiry workflow. |
| Reddit, r/webdesign: https://www.reddit.com/r/webdesign/comments/1xf3rlf/scroll_animations_on_most_sites_make_them_feel/ | Users describe slow fade-in scroll sections as delayed content, not quality. | No site-wide scroll reveal hiding text; persistent clear content, only optional decorative stage motion. |
| Reddit, r/webdesign: https://www.reddit.com/r/webdesign/comments/1sx6plp/i_stopped_making_beautiful_websites/ | Local business leads depend on transparent services, location, strong CTA, real visual proof. | Native 3-field lead strip and editable event brief with zero retyping in the final quote form. |
| Chrome: https://developer.chrome.com/docs/css-ui/scroll-driven-animations | CSS scroll timelines can offer compositor-friendly progression with less imperative JS. | CSS progress rail as a progressive enhancement; no browser scroll hijacking. |
| web.dev: https://web.dev/articles/top-cwv / https://web.dev/articles/vitals | Prioritize LCP discovery, interactions and layout stability; evaluate in field. | SSR hero WebP preload, local owner images and video posters, no autoplay or forced audio, responsive tests and deferred external YouTube. |
| greensoundmusic.com: https://greensoundmusic.com/ | Verified real DJ/MC, stage, lights, LED, sound, studio and events since 2008. | Keep company identity, actual service names, Pitești proof and existing video IDs. |

## V21 features delivered

**1. Cinematic stage control.** The three existing authentic event scenes remain. Added new lighting-ring art direction, a real ON/OFF button, pause when the hero is offscreen or the tab is hidden, and respect for browser reduced-motion. All basic transitions are transform/opacity; no huge runtime 3D dependency.

**2. Quick event brief.** A semantic **GET** form asks for event, optional date and location. It works without JS. The Contact route whitelists the event category and validates/limits other values before pre-filling the existing Zod/react-hook-form quote experience. The message is **never sent automatically**: WhatsApp or email opens only when the customer chooses.

**3. Director's Cut reel.** Three curated, real Green Sound public videos (wedding/DJ, stage and music studio) with an editorial film selector and distinct real company photography. The player is loaded only after explicit play. Selecting a chapter does **not** trigger music. Local WebP posters are optimized from official YouTube thumbnails, with provenance and sha256 in `public/media/greensound/FILM-POSTERS.json`.

**4. Native scroll-progress line.** CSS scroll timeline on supporting browsers; no listeners, no layout-affecting scroll updates, and motion-off fallback.

**5. The technical polish.** Preload for the real 67KB first-party hero image; removed perpetual play-button pulse in favor of hover feedback; first-party media URLs; original CSS in `src/styles/directors-cut.css`; no new NPM package.

## Media audit
All three videos already existed in `src/data/site.ts`. No downloaded video files, no re-encoded copyrighted footage, no fake video content and no hidden credits.

| Clip | Poster source | Original pixels | First-party optimized destination |
|---|---|---|---|
| Nunta Ramada Pitești | 37QlXW3NlxU / maxresdefault | 1280×720 | film-nunta-ramada.webp |
| Green Sound show lumini | eGLykw1G0EQ / maxresdefault | 1280×720 | film-show-lumini.webp |
| Studio / TV | nc_aWk8QPIU / sddefault | 640×480 | film-studio-live.webp |

## Validation gates
CI `.github/workflows/verify-crafted-react.yml` runs strict `tsc --noEmit`, production build, original app tests and Chromium at 360, 390, 430, 768, 1440, 1920 px. Browser checks: unique H1, native form, stage selector/light switch, no autoplay, three chapters, first-party WebP loaded, menu, real routes, reduced motion, no root overflow, and 390px event/date/location pre-fill.

CI results are proof of these automated checks only. **Do not claim 100/100 Lighthouse or a measured conversion uplift** without real device and field measurement. LCP/INP/CLS should be measured on the eventual production host; the browser checks run on development preview.

## Preview in GitHub Codespaces
```bash
git fetch origin
git switch design/crafted-atmospheres-v21-directors-cut
git pull origin design/crafted-atmospheres-v21-directors-cut
npm install --no-package-lock
npm run dev -- --host 0.0.0.0 --port 4175
```
Then **PORTS → 4175 → Open in Browser** at `/`. Do not confuse this with the older static `/greensound-prototype/` on port 4173.

## Next priorities that require actual owner decisions or originals
- Select a short, high-quality raw video edit from events (copyright-cleared original footage) if the company supplies it; the current reel intentionally shows existing published footage only.
- Validate final texts, contact channels, and photo permissions before publishing.
- Validate the exact hosting environment, responsive images/AVIF candidates, field CWV and accessibility; don't force all devices to run the same effects.

**The project does not self-improve on its own between conversations.** Each new iteration is a reviewed commit on a separate branch.
