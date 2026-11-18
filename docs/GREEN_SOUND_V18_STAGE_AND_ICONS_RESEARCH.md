# GREEN SOUND MUSIC — V18 / Open-Source Icons & Interactive Stage Experience
Last reviewed: 2026-11-11 · Branch: `design/green-sound-sillage-open-source`
The owner explicitly asked to **improve the existing V17**, not restart or replace it. Everything below is additive or a small icon substitution to existing pages. Production `main` and `greensoundmusic.com` are unchanged.

## Research and selection (official licences checked)
### Downloaded/vendor icons actually integrated
**Tabler Icons** — https://github.com/tabler/tabler-icons ; MIT licence https://github.com/tabler/tabler-icons/blob/master/LICENSE .
The project vendor-copies a curated set of **12 original SVG source files** from `tabler/tabler-icons/icons/outline/`:
`confetti, microphone, device-speaker, music, sparkles, balloon, bulb, player-play, headphones, activity-heartbeat, waves-electricity, disc`.
They live in `public/greensound-prototype/assets/icons/*.svg`. Their exact original MIT licence and copyright notice live at `assets/icons/LICENSE-TABLER-MIT.txt`.
No downloaded external script or hosted icon-font; the SVG shapes are loaded as local CSS masks from `assets/v18.css`. This gives consistent premium stroke weight, recoloring and simple hover motion. They appear in home navigation and event/service categories.

### Other libraries reviewed, not installed unnecessarily
- **Lucide** — https://github.com/lucide-icons/lucide ; ISC with additional Feather-derived MIT attribution. Excellent outline set but close to our previous generic icons; see https://github.com/lucide-icons/lucide/blob/main/LICENSE .
- **Phosphor** — MIT with distinctive duotone; useful if the owner wants a softer filled-icon direction. A second icon family on this same page would harm visual consistency.
- **React Bits** — https://reactbits.dev/ ; attractive background animations but validate current mixed licence terms, especially Commons Clause restrictions in some distributions; its React components are not needed in the standalone HTML prototype.
- **GSAP Vault** theatrical **Spotlight Background** — https://gsapvault.com/effects/spotlight-background and MIT repo https://github.com/jaydickinson/free-gsap-effects . Visual reference for realistic stage trusses, beams, fog and light pools. **Not copied**: the prototype uses independently written CSS instead of adding GSAP + WebGL dependencies.
- Procedural disco-ball demo https://github.com/lowsweet/disco-ball — would need Three.js/WebGL and is heavier than this stage's needs. Not installed.
- **Motion** and **Lenis** — broadly useful, but unnecessary for the stage controls; current browser primitives and the existing visual system are preferable.
- **Reddit** viewpoints:
  - https://www.reddit.com/r/webdesign/comments/1xf3rlf/scroll_animations_on_most_sites_make_them_feel/ (Oct 2026) criticizes late-arriving fades while scrolling on phones.
  - https://www.reddit.com/r/web_design/comments/1wcj9yw/overly_animated_sites_show_a_lack_of_design_skill/ (Sept 2026) emphasizes restraint and usability on client-service sites.
  - https://www.reddit.com/r/webdev/comments/1mun7lj how to optimize animations on the web.
  **Decision**: concentrate the theatrical motion inside the stage hero, retain readable copy/links and no animation gating on later content. Do not animate every button continuously.
- Web Audio user-gesture policy: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices .

## V18 actual changes
- **Hero stage:** five locally simulated moving-head lighting fixtures mounted on a truss, **five sweeping fan-beam lights**, **six narrow laser lines**, drifting haze, two lens-flare sources, LED strip, notes that float only in Party Mode. Scene-specific colors for Concert / Petrecere / Producție, while preserving the real Green Sound photo and the existing controls.
- **PARTY MODE** — accessible visual-only opt-in button. Lighting motion gets more energetic, notes float and beat pulses subtly influence a scene overlay. No audio on this action.
- **SUNET OFF / SUNET ON** — second distinct, user-initiated opt-in for a **small original generative 112 BPM electronic drum-and-bass loop**, created from basic Web Audio oscillators and seeded noise. It is **not** a Green Sound performance, copied song or video asset. Audio never autoplays. Volume is conservative; sound stops if page hidden, closed or a real video is opened. Clear on/off state; turning Party Mode off also stops audio.
- Existing **LUMINI ON/OFF** remains functional; turning lights off deactivates Party Mode.
- Existing three scene presets, all six pages, authentic event video modals and WhatsApp lead flow unchanged.
- Replaces older home/services/events category symbols with 12 locally copied compatible Tabler icon glyphs. Other pages still retain source markup.
- Implements all animation with original CSS, minimal original vanilla JS and no new runtime dependency.
- `prefers-reduced-motion` gets static stage lights without note motion. On mobile the effect is toned down.

## Limits, publishing & ethics
- The stage is **stylized visual simulation** placed over genuine Green Sound imagery. It does **not** represent footage of equipment Green Sound has actually operated in the captured photograph, nor does the synthesized demo pretend to be their recorded music.
- A genuine autoplay silent media reel needs rights-cleared original MP4/WebM footage supplied by the business. YouTube embeds are played on click only; video contents aren't downloaded or modified.
- Do not claim features are final until automated Chromium desktop/mobile and human screenshot QA.
- CSS layers `site.css`, `v15.css`, `v16.css`, `v17.css`, `v18.css` are cumulative for prototyping; consolidate before production if the user approves the design.
- On `design/green-sound-sillage-open-source` in Codespaces: `git pull origin design/green-sound-sillage-open-source`, serve port 4173, preview `/greensound-prototype/`.
