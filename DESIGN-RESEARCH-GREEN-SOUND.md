# Green Sound Music — Design & Open-Source Research
Research date: 10 November 2026
Scope: brand redesign for https://greensoundmusic.com, permanent events production company (not a one-day festival).

## Objectives
1. Immediately communicate real-scale light, sound and show expertise through authenticated Green Sound visuals.
2. Turn interest into inquiries with a high-contrast persistent **Cere ofertă** action and clear event/service navigation.
3. Convey premium, creative, professional quality rather than generic neon-on-black cards.
4. Preserve official branding, photography and business facts; do not copy proprietary designs or invented testimonials.
5. Support Romanian SEO / mobile / accessibility / motion reduction.

## Industry benchmark research
| Website | Why it matters | Take, don't copy |
|---|---|---|
| https://www.production.club | Music/event production studio with immersive project focus | Hero project imagery, selected work as first-class content |
| https://www.kudosav.com | Full-service event production service menu and enquiry UX | Separate events, technical disciplines, case studies, CTA |
| https://www.taittowers.com/live | Entertainment production with case-study credibility | Case-story composition and service-capabilities evidence |
| https://www.4wall.com | Lighting, audio, LED technical capabilities | Deep practical expertise while keeping large visuals |
| https://lo2s.com | Night-event aesthetic and visual atmosphere | Authentic event footage, darkness and restrained kinetic type |
| https://www.production.club/ | Gallery of music and live experiences | Motion used to amplify case studies, not replace navigation |

## Free source-code options
| Base | Code & license | Fit | Decision |
|---|---|---|---|
| 8B Sillage | https://github.com/8bsite/creative-agency-website-template — MIT | Permanent production house: eight-item filter gallery, manifesto, studio, service lines, contact, scroll motion | **PRIMARY BASE** |
| 8B ONDO | https://github.com/8bsite/event-website-template — MIT | Stunning festival opening and circular motion, but time-table/ticket structure inappropriate to a permanent business | SECONDARY MOTION REFERENCE |
| 8B ONDA | https://github.com/8bsite/design-studio-website-template — MIT | Editorial typography, moving circular photo and contact flow, less relevant service model | ALTERNATIVE |
| motion-primitives | https://github.com/ibelick/motion-primitives — MIT | Fine-grained React buttons and transitions | MAY INTEGRATE selectively |
| Magic UI | https://github.com/magicuidesign/magicui — MIT | Animated buttons, special details | SELECTIVE ONLY |
| GSAP Vault Free | https://github.com/jaydickinson/free-gsap-effects — MIT | Theatre spotlight, image-clip reveal, accessible full-screen menu, progress display | IDEAL STAGE FX, requires integration QA |
| React Bits | https://github.com/DavidHDev/react-bits — MIT + Commons Clause, see current terms | Beams, light rays and ambient backgrounds | LICENCE REVIEW BEFORE REUSE; avoid excessive GPU |

## Chosen design system
- **Near-black:** #0B100C, deeper than generic charcoal.
- **Green Sound accent:** a vivid but controlled acid lime #B9F34F inspired by the brand's existing green.
- **Light surfaces:** grey-ivory / mild sage for breathing room, never completely monotone dark.
- **Typography:** oversized editorial wordmark `GSMUSIC` in seven animated glyphs (the template's animated mark structure); all semantic heading, menu and business text says **Green Sound Music**.
- **Musical motifs:** notes as brief typographic flourishes only (not emoji spam), soundwave option and dynamic stage beam.
- **Signature visuals:** real Green Sound concert stage, DJ + MC, public, lights and showreel.
- **Top menu:** prominent brand, Experiences, Services, Process, Studio, Gallery, CTA.
- **Stage effects:** three layers — darkened photo, light beams, soft volumetric-style fog. A functional Lights On/Off switch; reduced-motion static fallback.
- **Portfolio:** 8 items / source template's native filtering and staggered image movement. They represent real verified service categories, **not fake client case studies**.
- **Services:** 5 full disciplines, easy to scan.
- **Production journey:** horizontal stage-by-stage story supported by source template's scrolling mechanism.
- **Contact:** telephone 0766 566 275, contact@greensoundmusic.com, WhatsApp, address in Pitești.
- **Showreel:** click-to-load selected official Green Sound YouTube videos, no autoplay until user clicks.

## Prototyping in GitHub
- Source branch: `design/green-sound-sillage-open-source` based on `main` (doesn't modify existing production).
- Standalone preview source: `public/greensound-prototype/index.html`
- Upstream source license: `public/greensound-prototype/LICENSE-8B.txt`
- Credits and risks: `public/greensound-prototype/CREDITS.md`
- Original favicon within repo: `public/favicon.png` (linked, no need to make up a new icon).
- This is a first adapted concept, not a deployment or final production-ready audited release. The original multi-page React implementation remains unchanged.

## Next checks before acceptance
1. Open at 390×844, 768×1024, 1440×900 and 1920×1080.
2. Verify accessible focus, native menu overlay, tab handling, all filter buttons and dialog close.
3. Verify original Green Sound asset URLs. The current preview has fallback YouTube thumbnails because Lovable asset hosting may not work under another domain. Export and self-host originals for final.
4. Confirm the favicon with the old live owner-approved original. Do not substitute the proof-of-concept musical glyph for the official logo.
5. Run network and performance check (font loading, 22 images, layout shift, mobile frame rate).
6. Connect form submission if user wants one, ensure lawful cookie/privacy workflow, audit OG and structured metadata.
7. Port chosen styling/interaction into the existing React app **only after approval** of the prototype visual direction.
