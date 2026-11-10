# GREEN SOUND MUSIC — LOVABLE REDESIGN MASTER BRIEF
**Edition:** Creative Direction 2026 / Premium Live Experience
**Repository:** \`WazzupDoc/green-sound-music-garden\`
**Lovable project:** https://lovable.dev/projects/6f92a315-49af-4e13-a684-28cea7b6cd37
**Live baseline:** https://green-sound-music-garden.lovable.app
**Primary language:** Romanian, correct diacritics.
**Budget:** preserve existing open-source stack, no premium theme purchase or unnecessary subscription.
**Development mode:** existing React / TypeScript / TanStack Start project. Do NOT restart in WordPress, do NOT generate a parallel HTML mockup.

## 1. Creative mission: from generic AI template to art-directed live production brand

Existing site has strong information architecture and initial copy, but visual expression remains recognizably generic: conventional full-bleed photo hero with oversized text + gradient overlays; scrolling marquee; uniform event cards; service rows with small thumbnails; repeated section heading patterns; multiple mechanical entrance animations.

The client REJECTED separate "Stage Notes"/"ATELIER"/"V3" HTML previews; do not reuse those layouts. This redesign should be a fresh art-direction exercise executed in the **actual React app**. Preserve only the valuable content, data and functional structures of the existing Lovable version, not its generic page styling.

**Desired outcome:** original, cohesive, human-art-directed, premium experiential event production website. Emotional effect of a high-end showreel, intuitive usability of a commercial service website. Not an AI-looking template, not a nightclub landing page, not a cheap event poster, not a noisy neon demo.

**Design concept:** "GREEN SOUND — The craft behind the moment." Core story: real live events and a well-coordinated team turn sound, music, stage light and people into one experience.

## 2. Real premium references — study live behavior on desktop and mobile

1. **Plugged Live Shows** — https://pluggedliveshows.com/ 
   Inspiration: art direction, cinematic storytelling, overlapping visual layers that are tied to real projects, visually rich featured case studies, impactful transitions that carry narrative, high-end typography. Do not reproduce their graphic assets, composition pixel-for-pixel, typography lockup or transition code.
2. **Play X / BRIX Templates** — https://playtemplate.webflow.io/
   Inspiration: production-agency positioning, clear information hierarchy, well-crafted project catalogue, high quality dark photographic scenes, useful service pages, visible calls-to-action. This is a paid template. Do NOT scrape/copy its source or export restricted assets.
3. **Creative Spirit / Rezo Zero** — https://www.rezo-zero.com/projects/creative-spirit/
   Inspiration: beautifully balanced editorial typography, lively but restrained visual framing, section-to-section rhythm, premium treatment of events.
4. **Offscreen Films** — https://www.framer.com/marketplace/templates/offscreen-films/
   Inspiration: showreel-led film pages, purposeful use of motion, curated work index and project detail format.
5. **Empire Entertainment** — https://www.empireentertainment.com/
   Inspiration: agency credibility through actual projects and authentic showreel.
6. **Sequenc** — https://www.framer.com/marketplace/templates/sequenc/
   Inspiration: useful film-making UI motifs such as progress markers, gallery navigation, media state; use sparingly, not as decoration.
7. **Analog Events** — https://www.analogevents.com/
   Inspiration: warm authenticity, visible project proof, clarity of services for clients and brands.

Research at least references 1–3 deeply, inspect their MOBILE interactions, then use principles—not copies—to produce one specific, original Green Sound design. Report what you adopt and reject.

## 3. Art direction and signature visual system

- Art-direction palette: cinematic deep ink/blue-black **#0A0F15**, atmospheric near-black **#101820**, editorial soft chalk **#F3F0E9**, warm grey **#B8BCB9**, brand green **#49B768** sparingly, optionally ultra-subtle indigo stage-light **#404A98** within authentic photography/video. Exact contrast must be tested; alternate light editorial chapters to keep visual rhythm.
- Preserve identifiable real Green Sound branding and recognizable logo green, but distinguish from generic bright neon green/pure black "AI site" design. No blanket emerald glow. No gradients everywhere.
- Typography: sophisticated grotesk for navigation/body and a carefully selected high-quality editorial serif for **selected** headline words. Investigate reuse of current Hanken Grotesk / Instrument Serif or local licensed/free fonts. Avoid every heading in all caps 110px, endless oversized display text, random italic flourishes, or faux-luxury letter spacing.
- Grid: precise 12-column desktop with generous margins, editorial asymmetric but controlled compositions. Mobile custom-designed at 360–430 px, not a squeezed desktop image.
- Photography: only actual, authorized Green Sound events. Hero photograph from current site is authentic and can be used in **one art-directed scene**, but must NOT be a generic full-page static background. Compositions may combine short video, close crop, field notes, captions and a second authentic shot; never fake event history with AI-generated performers.
- Visual identity motifs: very subtle stage cue numbers, sound-wave linework or technical stage annotation **only where they aid orientation**. Avoid equalizers, neon particles, RGB lights, music notes and repeated generic glowing icons.
- Different sections must have distinct compositions. Do not use a repetitive six-card grid template or section pattern repeatedly.

## 4. Homepage — target structure and interaction specifics

1. **Header**: real identity, "Evenimente", "Servicii", "Portofoliu", "Despre noi", persistent yet discreet "Cere ofertă". Mobile menu intuitive, fast and accessible with focus management. Appropriate scroll state, no jank.
2. **Signature hero (the most important section)**:
   - Real stage photography/short licensed clip staged as an art-directed media composition (e.g. one large scene + nested moving crop/video window, editorial caption, ambient side panels). Hero must have its own compositional logic, not full-screen static photo with centered headline/gradient.
   - Clear and natural Romanian message: primary proposition is DJ & MC + live bands + sound + lighting for events. Proposed concise direction: **"Atmosfera nu se întâmplă întâmplător."** Subline: **"Muzică live, DJ & MC, sunet și lumini — coordonate pentru evenimentul tău."** Do not inflate claims.
   - Two useful actions: "Descoperă proiectele" and "Cere ofertă". Avoid fake video buttons. Audio off by default; user must choose to play.
   - A meaningful opening motion sequence: concise 0.6–1.1 seconds on load, never a mandatory 3-second loader; mobile first content visible promptly.
3. **Featured proof before marketing**: curated real video and photography from actual events; one clear featured project with category, actual location only when verified, service list, and 'Vezi proiectul'.
4. **Work archive**: interactive gallery with alternate list/gallery modes if worthwhile; desktop hover reveals media, mobile swipe or normal tap; keyboard and touch first. Filters "Nunți / Botezuri / Corporate / Concerte / Studio" only for existing real media. No fabricated cases.
5. **Services as interactive editorial index**: DJ & MC; Trupe live; Sonorizare; Lumini/scenotehnică/ecrane LED; Efecte speciale; Studio; Hostess/ursitoare; Start Veselia. Each is navigable with purpose; reveal a real image or excerpt only when useful. Real links to existing service pages.
6. **What Green Sound actually delivers**: show capability via behind-the-scenes real shot and factual services. A "from empty venue to show" comparison ONLY if authorized real before/after media exists.
7. **Event-type paths**: guest can start with "Organizez o nuntă / botez / eveniment corporate / concert / petrecere" and see relevant services. No multi-step funnel mandatory for basic browsing.
8. **Showreel**: click-to-load actual YouTube film(s) with accurate poster and title; respect consent implications. Use existing \`VideoLite\` when appropriate.
9. **Team and process**: actual people and process, typography and authentic behind-the-scenes photography; no stock employee headshots or invented awards.
10. **FAQ + quote**: minimal friction, WhatsApp/call/email meaningful, clear disclosure when composer opens WhatsApp/email rather than actually sending server-side.
11. **Footer**: actual contact details, legal pages must exist. Clear navigation.

Each main section needs a different layout motif, tuned to real content availability; do not add empty editorial sections.

## 5. Motion guidelines (signature interaction, not gadgetry)

- **Hero**: 1–2 carefully choreographed reveals, optional mask reveal of actual media, no heavy canvas background.
- **Projects**: high-quality card/media transitions with clipping and scale limited to ~1.02–1.05, subtle image edge or color treatment. The transition should communicate continuity of a featured item.
- **Service index**: desktop row hover changes adjacent visual with cross-fade; mobile row tap/expansion; keyboard focus does the same. Avoid unwanted image downloading upfront.
- **Page transitions**: only if routing and reduced-motion tested; no excessive delay.
- **Scroll**: simple IntersectionObserver/CSS for reveals. GSAP/Motion only for meaningful sequences, dynamic import where feasible. Avoid redundant animation dependencies.
- **Precise constraints**: 200–350ms hover, 450–750ms section reveals; ease curves tuned (e.g. cubic-bezier(.22,1,.36,1)), no perpetual pulsing buttons or scroll hijacking. No sound autoplay.
- Respect \`prefers-reduced-motion\`, reduced-data/mobile conditions and keyboard focus. Mobile must feel simpler/faster than desktop.

## 6. What already exists in THIS repo (audit; preserve and repair)

- React 19 / TypeScript / TanStack Start SSR / Tailwind 4 / Radix UI / Lucide React.
- \`src/routes/index.tsx\`: generic current homepage hero with \`images.scena\` full background, \`hero-fade\`/ \`side-fade\`, event grid, service index, video section, process, FAQ and \`QuoteSection\`. Replace art direction, not the useful data.
- \`src/styles.css\`: Tailwind v4 tokens and animations, avoid additive contradictory overrides. Create clean, reusable design tokens.
- \`src/data/site.ts\`: real business contacts, 8 service entries, 5 event categories, team, real-video YouTube IDs and media references. **Source of truth.** Verify media rights and facts before adding case studies or public claims.
- \`src/components/site/VideoLite.tsx\`: click-to-load YouTube poster -> iframe.
- \`src/components/site/QuoteForm.tsx\` and \`src/lib/quote.ts\`: quote validated using Zod, BUT current submit only opens WhatsApp via wa.me or email via mailto. It does NOT submit to a backend. Do not call that a successful sent request. Ensure functional CTA and proper messaging.
- \`src/routes/__root.tsx\`, \`src/components/site/SiteHeader.tsx\`, \`SiteFooter.tsx\`, \`MobileActionBar.tsx\`: reusable shell, audit keyboard/touch and mobile.
- \`src/lib/seo.ts\`: page titles/description, canonical, schema, current \`SITE_URL\` references production domain even on Lovable test preview. Ensure staging is noindex and canonical behavior correctly configured; do not harm actual production SEO.
- **Missing route files noted in latest main**: \`/contact\`, \`/despre-noi\`, \`/confidentialitate\` are linked but not defined in generated route tree. Create functional pages; test every nav link before release.
- Current \`src/assets/*.asset.json\` are Lovable asset metadata with provider-specific URLs, not self-contained WebP binary assets. Export and validate them before independent deployment. Never invent/replace authentic work with AI stock.
- There is a previously rejected design PR and other unrelated concept branches. **Do not use the old Stage Notes or ATELIER prototype as design reference.** Use current main as technical baseline.

## 7. Pages required and credibility rules

Preserve the working pages: /, /servicii, service-specific slugs, /evenimente and /evenimente/:slug, /portofoliu, /studio-inregistrari, /start-veselia, etc.
Build missing /despre-noi, /contact, /confidentialitate and a clear fallback/404.
Original service/event page layouts with actual related work, FAQs and contextual quote CTA. Avoid making every detail page the same hero with different photo and headings.
Do not invent quotes, ratings, review counts, price tables, press mentions, festival history, artist endorsements or event-client relationships. Use verified materials from business source data only, with placeholders explicitly marked for missing authorized content.

## 8. Accessibility, SEO and performance

- Primary business goal: high-intent enquiries, clear value proposition, readable menus, frictionless mobile.
- WCAG 2.2 AA intent: contrast, reduced motion, keyboard, focus visible, proper labels, working escape-to-close.
- Core Web Vitals targets (not promises): LCP <= 2.5s, INP <= 200ms, CLS <= .1 at 75th percentile. Test with Lighthouse/PageSpeed and real browser.
- Split bundles and lazy-load noncritical heavy media, prioritize LCP image, retain poster fallback. Avoid huge video download on mobile.
- Semantic H1/H2, service-specific metadata, correct local business schema only if data is factual, canonical URLs with environment awareness, sitemap/robots reviewed.
- Don't buy extra UI/theme/animation plugins; all necessary frontend can be built in existing repo using CSS + modest open-source libraries.

## 9. Exact implementation plan — don't stop at "here are some ideas"

**Phase A: Design audit & committed art direction**
Inspect the live site + existing code + 3 external reference sites, produce a compact art-direction note with visual principles adopted, mobile and desktop wireframe, token proposals and media plan. Avoid generic moodboards unrelated to stage production.

**Phase B: Build real homepage**
Edit actual repository code (not detached HTML). Create reusable components and styles with coherent motion, update \`index.tsx\`, shared header/footer only as needed. Make the homepage clearly more premium and distinct without losing navigation or content. Confirm whether images appear in local/live preview.

**Phase C: Work/Services/Contact pages**
Enhance portfolio with documented project content and service pages. Implement missing pages and make form CTA behavior explicit/functional. Set up safe delivery only with verified configuration/credentials.

**Phase D: QA and preview**
Run build, tests, lint; fix real failures. Check desktop 1440px, tablet ~768px, mobile 390px AND 360px. Verify no horizontal overflow, menus/links/form/keyboard/reduced-motion/video. Provide a real live preview of modified React build on phone, not a fake static screenshot, and clearly distinguish preview from production.

**Protected deployment:** Work in an isolated feature branch/preview; don't overwrite or publish greensoundmusic.com, don't merge to main without owner approval.

## 10. Acceptance criteria / anti-template checklist

The client has explicitly rejected generic AI-looking work. Before declaring complete:
1. Is the first screen visually distinctive *without* relying on generic hero photo + centered white text + two pills?
2. Can visitors understand services, location/coverage and next action within 5 seconds?
3. Are all motion effects purposeful, with reduced-motion fallback and no loading penalty?
4. Are different sections genuinely differently composed but still consistent in art direction?
5. Are mobile-first layouts designed, not simply stacked desktop cards?
6. Are real photography and real projects central, rather than AI/stocks/fabricated work?
7. Does every CTA open a working route/action and are form statuses truthful?
8. Is the existing codebase respected and can it pass build/tests?
9. Can a reviewer open a working **real code preview** on a phone?
10. Does it feel more like a high-end live-events creative studio than a generic AI event landing page?

**Success is the implemented, tested React design—not prompts, static mockups, or descriptions.**
