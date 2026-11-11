# GREEN SOUND MUSIC — RESEARCH & CREATIVE DIRECTION (10 NOV 2026)
## A serious visual replatforming brief — source-backed, no production changes

**Status:** Research and concept, **not** a visual implementation, not tested or live. This document exists on its own experimental Git branch based on main. Do not merge into production without an approved working preview and accessibility/performance/SEO review.

**Goal:** Green Sound Music, Pitesti, an established music and technical event production team (since 2008). Present professional sound, light, DJ, live music, LED screens, low fog, studio production and events with the impact of premium concert-production sites; keep services comprehensible and booking effortless.

## 1. Original brand and owned source data
- Official website: https://greensoundmusic.com/ (Pitești, since 2008; slogan “Culoarea petrecerii tale!”)
- Services verified on https://greensoundmusic.com/servicii/: DJ & MC; equipment and lighting / LED; recording studio; low-lying fog and smoke balloons; Start Veselia; band; hostess; christening fairies.
- Existing repository for editorial data, images, YouTube ID mapping and contact links: \`src/data/site.ts\` on main. There are authentic images: \`images.scena\`, \`images.dj\`, \`images.concert\`, \`images.hostess\`, \`images.ursitoare\`, \`images.ursitoare2\`, \`images.copii\`, plus actual YouTube material.
- The React project uses Lovable-managed \`*.webp.asset.json\` entries with URLs. Verify deployment of the actual image bytes outside the original hosting environment before migration.
- The original favicon is in \`public/favicon.png\`; verify it against the production brand mark and **preserve its visual identity**, not the replacement arbitrary G glyph from earlier redesigns. Any new SVG must be an approved faithful refinement, not a fabricated trademark.
- The new visual concept cannot depend on demo stock photos or fictitious names/claims. Only use Green Sound-owned images with permission for public marketing.
- Most vivid live-performance media is relatively sparse; launch quality will depend on sourcing at least 8–15 original widescreen, high-resolution photography/video assets. Existing portrait files are adequate for some cards, less ideal for wide background video.

## 2. Direct niche references — design study ONLY (not licensed code)
| Site | Actual sector | What to study | What NOT to copy |
|---|---|---|---|
| https://lo2s.com/ | audiovisual live stage design | full-bleed stage photography, intentional negative space, showreel impact, fine overlays | their video/images, unique effects and source code |
| https://www.takemelive.com/ | live event production | portfolio previews, project-first storytelling, click-to-open interaction | clients/project media, branding |
| https://www.whitevoid.com/ | light art + AV installation | elegant smoke-haze, kinetic light aesthetic, atmosphere | project footage |
| https://momentfactory.com/ | global immersive multimedia studio | explain sound+lighting+video as experiences, scale and case studies | content, creative concept duplication |
| https://www.taittowers.com/live | touring stage production | confidence and actual show cases, technology-led proof | clients, claims |
| https://wearevalcato.com/ | AV, lighting, sound, show production | clear categorization and conversion pathways for technical and creative offers | copy and case studies |
| https://www.irockyourparty.com/ | DJs and AV for weddings and corporate | event-type conversion and reputation proof | ratings/awards not verifiable for Green Sound |
| https://www.opus-av.com/work | event technical production | case-study presentation and gallery filtering | events/clients |
| https://jp-ent.com/ | premium DJs and effects | business model service segmentation and packages | unsupported equipment or effects not in Green Sound |
| https://www.awwwards.com/sites/lo2s | curated award listing | evidence for LO2S visual direction | website copy and code |

Reference gallery/briefs from requester: https://dribbble.com/tags/premium-website ; https://dribbble.com/shots/27077122-Restaurant-Website-Design-The-Nocturne ; https://dribbble.com/shots/21264240-Madroup-Party-Site ; https://www.siteinspire.com/ ; https://www.awwwards.com/websites/luxury/ . Dribbble shots are visual inspiration, not an open-code license.

## 3. Licensed reusable complete website BASES
Source provider 8B has ~106 one-file template layouts with animation, mostly CSS-scroll-driven; site details and license descriptions: https://8b.com/templates/ and individual GitHub LICENSE files. Each can be used as an *experiment*, but do not combine scripts by copying isolated markup out of their carefully orchestrated DOM motion system.

**Best content base — Sillage**: https://8b.com/templates/sillage/ ; https://github.com/8bsite/creative-agency-website-template
- MIT code; exact LICENSE verified in connected GitHub; author 8B; preserve license and relevant credit.
- Animated oversized wordmark, fully bled photographic hero, section manifesto, asymmetric filterable portfolio, pinned featured work, layered gallery, production services, process and contact.
- Advantages: closest to ongoing production/portfolio business, includes meaningful SEO text and project indexing.
- Limits: default fashion-oriented palette, 8 fixed portfolio cards tied to motion, **demo client and team data are fictional**, giant seven-letter wordmark is a fixed animation contract, some Firefox animations fall back to static (GSAP build is available); no real booking backend.
- Retain underlying DOM motion markers if adapting code; see AGENTS.md. Do not copy the entire look unchanged: green stage visuals and brand presentation need a strong custom layer.

**Best spectacular motion reference — ONDO**: https://8b.com/templates/ondo/ ; https://github.com/8bsite/event-website-template
- MIT code, GSAP ScrollTrigger and Lenis, huge titles, stage-like curtains, circular portrait windows, spatial transitions, a fanned multi-card reveal and an expanding-ring contact.
- Not a correct full base for Green Sound (festival ticketing, fake schedules), but legal candidate for **adaptation of individual motion mechanisms**, with accompanying notices.

**Best gallery/service behavior — ONDA**: https://8b.com/templates/onda/ ; https://github.com/8bsite/design-studio-website-template
- MIT code, ScrollTrigger + Lenis; pinned horizontal work gallery, stacking service cards, opening circular photo, kinetic timeline and image collage. Strong motion base.
- Weakness: agency/company process content and demo data require replacement.

**Alternative for motion-first style — INERTIA**: https://8b.com/templates/inertia/
- MIT as indicated by its publisher; dynamic condensed-to-wide project names, picture pills, orange accents to recolor in green.
- Strong reference for interactive service/portfolio rows, not a complete business IA.

**Supplementary motifs only**: https://8b.com/templates/cut-short/ (dramatic title-image reveal, MIT), https://8b.com/templates/gabble/ (audio waveform animation, MIT). Music-school template Overtone is more traditional and not preferred.

## 4. Reusable code / open motion toolbox
| Resource | URL | Verified licensing position / best use |
|---|---|---|
| React Bits | https://reactbits.dev/ and https://github.com/DavidHDev/react-bits | MIT **with Commons Clause**, permits commercial website use; do not redistribute components as a competing UI kit/template. Exact license is LICENSE.md. Candidate Light Rays (https://reactbits.dev/c/backgrounds/light-rays), Side Rays, spotlight, text animation. GPU-heavy shader: desktop-only with fallback. |
| Motion Primitives | https://motion-primitives.com/ and https://github.com/ibelick/motion-primitives | MIT; copy/adapt magnetic button, text morph, scroll reveal, hover interactions |
| Motion | https://motion.dev/ and https://github.com/motiondivision/motion | MIT; use if component-driven React animation suits architecture |
| GSAP | https://gsap.com/ and https://gsap.com/standard-license | Standard no-charge license permits normal commercial websites, not visual animation builder competitors; use ScrollTrigger/SplitText selectively, license is **not MIT** |
| Lenis | https://lenis.dev/ and https://github.com/darkroomengineering/lenis | MIT smooth scroll; test touch, reduced motion, sticky/focus behaviors |
| Codrops | https://tympanus.net/codrops/hub/ | excellent technique research for reveal/clip-path/hovers; license must be checked **per experiment** before reusing code |
| Aceternity UI | https://ui.aceternity.com/ and https://ui.aceternity.com/ai-recommendations | some free React components and premium items; verify specific asset terms, do not assume all blocks are free |
| MDN prefers reduced motion | https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion | disabled or calmer nonessential animation in response to user's OS preference |
| web.dev performance | https://web.dev/articles/css-web-vitals | avoid layout-shifting animation, favor transform/opacity |

**Avoid**: cloning HTML/CSS from a proprietary Awwwards website with no license, hotlinking another agency's footage, claims like "500+ events" without proof, unauthorized client logos, heavy looping 3D on phones, automatic audio.

## 5. Direction: "THE SOUND OF LIGHT" (working concept)
Not a generic DJ website; not fully black/neon; not Sillage wallpaper. Concept is **stage atmosphere meets modern editorial portfolio**: one memorable motion idea per section and a direct CTA at all times.

### Brand/identity
- Logo: preserve original GREEN SOUND MUSIC icon from old site's owner-controlled asset and refine only after side-by-side verification. Wordmark should literally read "GREEN SOUND MUSIC", not abbreviated for a seven-character template effect.
- Musical-note glyphs: a restrained custom SVG note/equalizer motif on micro-interactions and service tabs; not a screen filled with emojis or generic stock disco icons.
- Color tokens (proposal, not a final palette): deep stage \`#08140D\`, pine \`#0B2417\`, original-ish brand green \`#2FB24C\`, electric mint \`#B8F57B\`, porcelain \`#F4F1E9\`. The stage photography supplies blue, violet and warm tungsten accents organically.
- Type: expressive condensed display for hero/major projects + strong editorial sans for navigation + refined serif used rarely for contrast; Romanian glyph support required. Avoid too many typefaces.

### Header & navigation
- 80px desktop sticky nav, blurred *only* when scrolled; logo top left.
- Navigation: Servicii (custom mega menu with descriptive sub-items), Evenimente, Portofoliu, Despre noi, Studio; distinctive pill-shaped **CERE OFERTĂ** button in verdant green with arrow; 44px+ targets.
- On hover: 150–250ms neon-edge sweep, arrow glides; no constant blinking. Interactive menu may show one relevant live photo, lazy-loaded.
- Mobile: 76px header, single easy-tap menu, meaningful sticky CTA, keyboard and screen-reader accessible overlay.

### Home chapters
1. **Stage Overture**: authentic live-stage photo/video full-screen. Headline "SUNETUL SE AUDE. / ATMOSFERA SE SIMTE." and small proof "Green Sound Music / Pitești / din 2008". Two actions "Vezi ce facem" and "Cere ofertă"; single showreel button. Underneath: subtle volumetric light cone and diffuse fog layers; user pointer modestly influences light, not content. A short 5–10 second silent looping video only when a licensed, optimized original is available, otherwise premium still photography with CSS parallax.
2. **Brand bridge**: kinetic waveform trace with actual service labels "DJ & MC", "SONORIZARE", "LUMINI", "ECRANE LED", "TRUPĂ LIVE", "EFECTE". Animation stops on reduced motion.
3. **Experience categories**: two contrasting modes "Sărbători private" vs "Producție de scenă", with image preview driven by hover/focus/click, so Green Sound's two business audiences instantly self-select.
4. **Showcase**: asymmetrical portfolio of *real* event categories and real evidence. A concert cover, an actual DJ/MC wedding, lights/LED, family/kids, studio. Link images to relevant existing pages; do not invent dates/venues. Featured project can expand cinematic photo on scroll.
5. **Service Storyboard**: reusable interactive rows, one visual image changing per service with descriptive 1-line copy. Services stay scannable and keyboard accessible. Every service has a landing page for SEO.
6. **Stage Light Lab**: a 3-preset interactive *visual* demo ("Concert", "Nuntă", "Corporate") that changes a layered photo's light grading, beam direction, and ambient glow—not a claim about exact physical rigs. Show what lighting contributes; can be lightweight CSS/SVG.
7. **Behind the scenes**: technical sound/LED/lighting capabilities and actual team photos if available; avoid false portraits and company scale.
8. **Reel**: YouTube preview is user-activated, no autoplay sound. A fullscreen theater/player after click with close/Escape.
9. **Proof and process**: truthful "din 2008", genuine reviews only if permissions and source are confirmed, short booking process.
10. **Distinctive contact**: dark-to-green transition and oversized email/form header, event type/date/location/services; clicking sends message via existing WhatsApp/email workflow. A real website-submitted form needs backend/email delivery before claiming direct lead submission.

### Smart musical effects, but not a casino
- Musical notes: one or two SVG note motifs orbit/or pulse in a services headline as user scrolls, then disappear (subtle).
- Equalizer bars: react to pointer/focus on the DJ card; no fake live audio-reactivity.
- Haze: two lightweight semi-transparent CSS/SVG layers, never heavy translucent full-screen animated video on mobile.
- Moving-head beam: single shader/canvas on capable desktop as progressive enhancement; static gradient fallback.
- Buttons: magnetic hover on non-touch desktop, snap feedback on click, accessible reduced-motion.
- The scroll story must feel intentional; 8–10 strong chapters, not an endless carousel.

## 6. Visual acceptance criteria (nonnegotiable)
- Clearly different silhouette from existing repo's photo-left/text-right hero and conventional service cards; compare full-page desktop screenshots, not single fold.
- Review at 1440×900, 1280×720, 768px, 390×844, 375×667; verify menus and lead capture.
- Tab/Enter/Escape controls; 44px touch controls, appropriate focus styles, \`prefers-reduced-motion\`, no rapid flash or automatic music.
- Real assets and proper brand mark. Never launch demo names, false logos, placeholder photos or invented reviews.
- Server-rendered headings/content and crawlable individual service landing pages, semantic headings, descriptive image alt text, canonical/OG, JSON-LD only for true verifiable facts; sitemap and local Pitești SEO.
- Image responsive and optimized; poster fallback for video; lazy load below fold; monitor LCP/CLS/INP, no unjustifiable WebGL-heavy mobile experience.
- All new licenses/attributions preserved in NOTICES, with verified rights for image/video.
- Deliver screenshots and click-able deployed staging preview, **not merely a passing TypeScript build**; verify browser console and interactive features.
- Keep official greensoundmusic.com and main intact until explicitly approved.

## 7. Build recommendation and stages
1. Preserve existing React/TanStack routes and structured data. Build an **independent, visibly distinct experiment** on \`design/green-sound-sillage-open-source\`; don't alter earlier experimental branch or the production main.
2. Prototype the layout based on Sillage (MIT), using the exact source files and motion contracts if we adopt its underlying code; selectively port compatible ONDO/ONDA techniques with license notices. Avoid blindly mixing Sillage, ONDO and INERTIA entire scripts.
3. Port stage interaction using independently licensed components (React Bits Light Rays when performance allows, Motion Primitives, GSAP and CSS); keep old favicon and actual images from the owner's data library.
4. Validate end-to-end: run pnpm build/typecheck, screenshot desktop & mobile, reduce-motion, keyboard, links and WhatsApp flow, plus SEO basics.
5. Provide a separate browser preview first. Only after visual approval consider replacing the main website or migrating its official WordPress hosting/content.

**Priority for first prototype:** HERO + HEADER + TWO-AUDIENCE SELECTOR + ONE REAL PROJECT GALLERY + SHOWREEL + CONTACT. Finish those to premium standard before adding ornamental extra sections.
