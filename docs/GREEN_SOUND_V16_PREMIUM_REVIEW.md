# GREEN SOUND MUSIC — ART DIRECTION V16 / CREATIVE REVIEW

**Date:** 10 November 2026 · **Branch:** `design/green-sound-sillage-open-source` · **Status:** independent prototype only, production `main` unchanged.

## Inspiration audited (references, not templates to copy)
- **Encore Event Technologies** — https://www.onedesigncompany.com/work/encore : immediate event atmosphere, visitor-first positioning, audiovisual image prioritization.
- **Mirrad Live Show Design** — https://www.awwwards.com/sites/mirrad : restrained white typography against rich real live-show imagery and stage-light as part of identity.
- **Sila Sveta** — https://www.awwwards.com/sites/sila-sveta : identifiable services organized around one clear visual idea.
- **LO2S** — https://lo2s.com/about : event technical production and sculptural light as brand language.
- **WHITEvoid** — https://www.whitevoid.com/ : light/kinetic installation as the product.
- **Webby Awards 2026** — https://winners.webbyawards.com/winners/websites-and-mobile-sites/features-design/best-use-of-animation-or-motion-graphics and https://winners.webbyawards.com/winners/websites-and-mobile-sites/features-design/best-use-of-video-or-moving-image : focus on meaningful, seamless motion and video as key UX, rather than piling on decorative transitions.

## Critique of V15 from actual automated browser captures
1. Desktop first fold: three oversized white/lime lines covered the stage image; paragraph included overlapping/repeated service descriptions. This diluted readability and brand.
2. Mobile first fold: about 200 px of dark space before the first large heading; the tiny fake speaker graphic occupied prime space without demonstrating actual speaker equipment.
3. Stage photo: very dark upper half, with live lights buried too low in the composition.
4. Decorative marquee did not help visitors choose services; it read like a template feature instead of navigation.
5. Indoor/reel area already had actual DJ, light show and low-fog video links, but their hierarchy was not sufficiently editorial.
6. Interior pages still had template-like oversized full-bleed heroes and decorative clipart not coherent with the new homepage.

## Changes made in V16
- Completely reauthored homepage first fold. **Left:** clear, brand-appropriate headline *SE AUDE. SE VEDE. SE SIMTE.*, concise business services, two explicit calls to action, business/location, minimal note accent. **Right:** dedicated production photo stage, professional corner-labels and play cue, animated theatrical beam/haze overlay, functional spectrum and event scene label. No fake speaker overlay on main hero.
- On small screens **photo appears first, headline immediately after it**; no large empty first-scroll band. Voice and music are never played without a deliberate user action.
- Hero photo crop zoom for more immediate stage impact, without replacing it with unrelated stock footage.
- Replaced purely decorative scrolling ticker with **four clickable service routes:** DJ & MC, Sonorizare, Lumini & LED, Efecte speciale.
- Preserved three user-driven live-scene choices **Concert / Petrecere / Producție**, plus lights on/off state and real Green Sound stills.
- Home page keeps asymmetric three-video gallery with original project's known YouTube ids; user clicks to launch privacy-enhanced embedded video:
  - DJ & MC wedding: `37QlXW3NlxU`
  - lightshow: `eGLykw1G0EQ`
  - low fog: `u7EW622vE3Q`
- Service page: contextual playable real media for four relevant services. Events page: contextual playable real media for weddings and production shows. No fake event-specific videos for categories without assets.
- Kept all six separate pages, compact menu, WhatsApp offer flow and existing legitimate media sources. Applied the V16 visual system to all subpage hero sections, removing repeated decorative fake speaker/equalizer.
- Motion cues: per-scene light colors, CSS moving beams, gentle photo drift, animated audio spectrum, interactive light toggling, tasteful card/photo transitions, hover play-state. `prefers-reduced-motion` disables non-essential animation.
- Browser CI verifies six-page navigation, stage presets, lighting toggle, video modal switching, 3 reel cards, 8 services, six events, mobile menu, WhatsApp-prefill and horizontal overflow. Browser screenshots of desktop/mobile home and interior pages.

## What we intentionally did not do
- Did NOT automatically autoplay embedded YouTube clips, download or alter third-party video streams, strip channel attributions, synthesize event case studies, claim fabricated numbers/reviews, or change the owner's production website.
- Did NOT add fake logos/client lists.
- Did NOT make unverified performance/SEO claims; further production QA requires actual hosting infrastructure and original video assets.

## Next high-impact step after visual approval
The photo stills can be replaced by **original rights-cleared video** supplied by the owner (ideal 10–15 s edited silent, loopable MP4/WebM showreel, optimized for web). This would allow the stage window to play genuine footage immediately on capable devices with a still fallback and reduced-motion/data-saver handling, without network-heavy autoplay YouTube embeds. Premium quality also requires a wider, licensed diversity of original photos and a shoot/showreel that includes lights, real PA rigs, DJ, audience, low fog, weddings and festivals.

## Preview
Codespaces branch: `design/green-sound-sillage-open-source`.
When the Python server on port 4173 is running, open `/greensound-prototype/`.
Run `git pull origin design/green-sound-sillage-open-source` and force refresh. This prototype is **not the production TanStack application**.
