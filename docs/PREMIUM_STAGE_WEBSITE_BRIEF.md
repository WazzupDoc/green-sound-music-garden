# Green Sound Music — brief, design system and launch gates
Date: 2026-11-27. Proposed working reference, pending owner approval. Do not equate this document with a deployed redesign.

## 1. Strategy
Primary conversion: qualified event inquiry, not purchase or instant reservation. Audience: private event organizers, companies and concert/festival organizers in Pitești/Argeș and confirmed service areas. Use src/data/site.ts as the source for business details, service catalog and media; reconfirm before launch. Domain configured in source: https://greensoundmusic.com. No invented clients, reviews, guarantees, pricing or coverage.

Navigation: Acasă, Servicii (eight existing routes), Evenimente (existing category routes), Portofoliu, Despre noi, Contact. Preserve privacy and legacy contact redirect, 404 and sitemap. Visitor journey: striking real event image → services or event type → proof from distinct real projects → inquiry with selected service context → explicit handoff to phone/WhatsApp/email.

Homepage: compact bespoke header; art-directed full-bleed stage hero and two CTAs; editorial service index; selected event work with unique photographs; concise production process; FAQ only for verified facts; final quote CTA and footer. Avoid repeated service grids, fake meters and unnecessary sections. Service detail: specific offering, relevant original imagery/video, what is included (confirmed), practical requirements, relevant event examples, contact prefill. Events: category choice and tailored recommendations. Portfolio: filterable real media, accessible playback and stop, no fake project metadata. About: factual story and team only when documented. Contact: brief, review, explicit channel handoff.

## 2. Visual direction (proposal)
Premium stage experience, restrained emerald light, black and ivory with warm metallic detail. Tokens: stage #090D0C, forest #152A23, emerald #52D99A, champagne #C5AB78, ivory #F2F0E8. Keep existing Hanken Grotesk and Instrument Serif italic, verify contrast before adopting tokens. Spacing 4/8/16/24/32/48/64/96px; mobile side padding 20px; desktop content max 1320px; fluid heading 42–96px. Buttons minimum 44px target; rectangular, subtle radius, distinct focus. Bespoke SVG service icons with short interaction pulse; use native links. Desktop: asymmetrical editorial composition with restrained stage beams and one clear focal point. Mobile: readable hero, smaller light rig and stacked sections; no horizontal clipping. Animate transform/opacity; no perpetual expensive effects; reduce/stop for reduced motion and Lite. No autoplay audio or flashing. Each photo used at most once in the main content of a page and avoid repeating prominent photos across the site where assets allow. Generated concept art must never masquerade as real event proof.

## 3. Copy reference
Proposed homepage: “Muzica schimbă tot.” / “DJ, muzică live, sunet și lumini pentru evenimente, din Pitești.” CTA “Solicită o ofertă”; secondary “Vezi portofoliul”. Services heading “Ce aducem la evenimentul tău”. Events “Ce eveniment pregătești?”. Portfolio “Din mijlocul evenimentelor”. Contact “Spune-ne ce eveniment pregătești.” Service copy must describe the real offer, not invent equipment, prices or outcomes. FAQs: service area, date availability, pricing, setup and combinations, answered only with confirmed information. Use Romanian, short specific sentences. Preserve original real business tagline where appropriate.

## 4–5. Implementation
Keep React/TypeScript/TanStack Start/Vite and existing shared shell; no rewrite or new framework. Current homepage imports ConceptHomeV170 plus V170/V188/V215 styles. Start with screenshot baseline, then change one coherent art direction branch, not layers of conflicting prototypes. Preserve existing file routes, deep links, native links, active states and fallback. Never modify generated files by hand. Keep each change reversible.

## 6. Working features
Existing contact route validates query parameters and prepares an inquiry for user-initiated external channel handoff. Do not claim a message was sent or a booking confirmed. An actual server submission feature requires explicit choice of service, destination and privacy handling; validate on server, add error/loading states, rate limiting, keep secrets out of client. Preserve consented video playback and keyboard focus. Search must return actual site routes.

## 7. Mobile
Verify 360, 390, 430, 768, 1440, 1920px; keyboard and Escape, 200% zoom, focus visibility, 44px tap targets, reduced motion, Lite, no unwanted scroll/crop, form readability. Capture real browser before/after screenshots. Do not call visual quality approved until reviewed.

## 8. SEO and performance
Existing src/lib/seo.ts has canonical, OG/Twitter, JSON-LD, preview noindex; public includes robots.txt and sitemap.xml. Retain accurate metadata, avoid duplicate headings, verify canonical and sitemap against real routes and domain. Use first-party optimized images with dimensions, eager hero only, lazy below fold. Do not load third-party video before consent. Measure mobile and desktop LCP/INP/CLS where possible; targets LCP <=2.5s, INP <=200ms, CLS <=0.1 (field p75, not claims). Keep existing gzip budgets; compare measurements at identical conditions.

## 9. QA / evidence
Run npm run typecheck, npm run build, npm run test, lint, then Chromium route/contact/menu/playback and six-width visual checks. Verify images decode, links, 404, focus, consent, no secrets, production versus preview indexing. Inspect real screenshots rather than just source assertions. Record exact commit and workflow links. Do not describe pending or historical checks as current passed tests. Stop redesign churn if changes are not materially better.

## 10. Launch
Lovable-connected repository: preserve published history, no force push, no manual managed migrations/secrets. Create candidate branch and draft PR; verify CI and obtain visual approval. Confirm hosting, live domain, HTTPS, environment variables (VITE_SITE_ENV=production only for intended live deployment), external handoff and indexing; use a revert PR for rollback. Owner approval is required before publication. Production status not verified in this review.

## Open decisions
Owner to approve visual direction, actual photo/video rights and additional unique assets, service area, whether existing WhatsApp/email handoff is sufficient or real server form needed, and hosting/publication settings. Current source was inspected; no browser test, current build, live deploy, or code change performed for this planning document.
