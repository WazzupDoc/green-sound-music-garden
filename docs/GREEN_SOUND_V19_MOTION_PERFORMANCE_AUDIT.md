# Green Sound Music V19 — premium motion + performance audit
Date: 2026-11-11 · branch: `design/green-sound-sillage-open-source` · draft prototype, production untouched.

## Owner objective
Improve the existing V18 to feel like a premium creative-studio website, with richer but tasteful transitions and fast, smooth performance on mobile and desktop. **Do not restart or overwrite the official site.**

## Best-practice research (primary sources)
1. Google Chrome's animation performance guide: https://web.dev/articles/animations-guide — compositor-friendly `transform` and `opacity` are generally preferable to animating geometry or expensive paint; use `will-change` sparingly.
2. MDN's View Transitions guide: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using — supports same-origin cross-document `@view-transition { navigation: auto; }` with graceful fallback when unavailable. Animating an entire multipage root does **not** require intercepting links with JS.
3. Chrome Modern Web Guidance Motion: https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/motion — prioritize compositor animations, native navigation, scroll-driven progress where available, and explicit reduced-motion alternatives.
4. Microsoft Edge developer rendering diagnostics: https://learn.microsoft.com/en-us/microsoft-edge/devtools/rendering-tools/ — watch for paint storms and excessive GPU layers. This is why we did not install Three.js/GSAP/Lenis to decorate this current 6-page prototype.
5. Shopify's core animation guideline: https://shopify.dev/docs/storefronts/themes/best-practices/performance/use-transform-for-animations — shifting `top/left` and `width/height` every frame risks reflow and layout shifts.

## Implemented incrementally on V18
- **Navigation:** native cross-document View Transitions with a modest 180ms outgoing and 340ms incoming transition, plus a named shared header; normal links still work on older browsers and accessibility settings.
- **First impression:** staggered `SE AUDE / SE VEDE / Se simte` headline reveal, subtle intro of CTA and authentic stage photo, without the expensive full-page blur animation inherited from V17.
- **Discover path:** working anchored “EXPLOREAZĂ EXPERIENȚELE” scroll action, not a decorative dead button.
- **Scroll:** slim native CSS scroll-driven progress cue; unsupported browsers simply omit it, rather than installing a JS scroll loop.
- **Chapters:** limited use of IntersectionObserver to reveal editorial headings and a one-time thin line. Everything remains visible with JavaScript unavailable or `prefers-reduced-motion:reduce`.
- **Pointer details:** 3 curated cards and real-video tiles get ±7px parallax of **only the picture**, with rAF-throttled pointer updates. Principal CTAs get a slight magnetic response; no endless loop or global mouse listener.
- **Offscreen pause:** native IntersectionObserver marks stage/portfolio chapters when out of viewport; existing animated moving-head beams, laser light, haze, spectra and card decorations have `animation-play-state:paused` when not visible.
- **Device adaptation:** data-saver, reduced RAM/CPU indicators or small viewports select a visually lighter stage configuration. Reduced-motion removes one-time chapter and navigation animation and preserves UI behavior.
- **Request reduction:** original 6 cumulative CSS source files and 4 JS source files are bundled into one CSS + one defer-loaded JS shared by all six pages. Source files remain editable and a deterministic check/regenerator is provided: `python3 .github/scripts/build_gs_v19.py --write` / `--check`.
- **Narrow mobile fixes:** explicit minmax(0,1fr) and adaptive typography for curated cards, with the root painting surface clipped to protect against off-canvas beams/pseudo-elements. No text or interactive elements are truncated.
- **Existing features preserved:** all 6 pages; Party Mode; opt-in original in-browser sound (never automatic); mood switching; real Green Sound-linked video modal; local Tabler MIT icons; enquiry flow; unchanged official website.

## Performance caveats (do not promise impossible results)
- One CSS+one JS is fewer HTTP requests than V18, but CSS remains approximately 93k characters uncompressed and JS ~20k; actual transfer depends on server gzip/Brotli, HTTP caching and browser.
- Photos still reference a Lovable-hosted Green Sound project asset URL; actual end-user speed depends on the host and image sizes. For production, export owner-owned photos, generate appropriately-sized WebP/AVIF, set cache headers and use proper srcset/sizes.
- Google fonts are requested over a third-party network. Consider self-hosting appropriately licensed fonts in a production build.
- Video thumbnails remain YouTube-hosted; real video plays only by explicit click. No rights-unsafe download or edited source/watermark removal.
- No universal “60fps on every device” promise is justified. Validate low-powered physical hardware, Web Vitals (LCP/INP/CLS), real network throttling and representative browsers before production approval.

## QA gates
- Static code and source bundle drift check.
- Chromium on desktop 1440px and mobile 390px and 320px, link navigation, video, contact, Party/audio controls, reduced-motion opt out, offscreen animation pause and local asset count.
- Explicit review of visual screenshots as well as browser interaction results. Verify final Actions run before reporting successful completion.

## How to review
In the existing Codespaces project branch:
```bash
git pull origin design/green-sound-sillage-open-source
python3 -m http.server 4173 --directory public --bind 0.0.0.0
```
If port 4173 is already occupied by the correct server, skip the second command.
Open `/greensound-prototype/` on the Codespaces port 4173 forwarded URL; force reload if cache shows old files.
Do not merge to `main` until owner signs off.
