# V92 — Contact Production Brief: REAL Chromium before/after audit

Date: 2026-11-13 · Route: `/contact` · One site zone: Contact / Guided Event Brief.

## Same-page, same-state real images

| Evidence | BEFORE | AFTER |
| --- | --- | --- |
| App baseline | V91 `e8e3296ed94bd0576c9ab99ca00cbe37fe45c9e1` (UI unchanged on baseline QA branch `design/v92-contact-before-audit`) | V92 corrected app source `9dd53301b523382d7a24e38050a5e46a715b72ec` |
| GitHub Actions | [PASS #43436573840](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43436573840) | [PASS corrected app-source #43439489649](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43439489649) — 88/88 tests in 31 suites |
| Browser artifact | [V91 BEFORE ZIP #14043468507](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43436573840/artifacts/14043468507) | [V92 AFTER corrected ZIP #14045816881](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43439489649/artifacts/14045816881) |

Both archives contain the **same original named files**: `contact-v92-intro-390.png`, `contact-v92-intro-1440.png`, `contact-v92-brief-390.png`, `contact-v92-brief-1440.png`, `contact-v92-viewport-390.png`, `contact-v92-viewport-1440.png`. Chromium set `prefers-reduced-motion: reduce` and viewport width 390/1440 (height 900). Browser script also checks 360, 430, 768 and 1920 for overflow, H1, status and functional quote presence. No synthetic illustration or external screenshot presented as proof.

## Inspected before/after: significant visual difference

- **Opening desktop (1440):** before was a nearly uniform dark background, plain headline and large empty area; after is a deliberately asymmetric light sage editorial field with an unusually large black-and-forest title **PLANUL / TĂU. / RITMUL NOSTRU.** and a dramatic forest-green engineering waveform on the right. A fully readable genuine three-step process forms the footer of the opening.
- **Opening mobile (390):** the technical illustration becomes a compact wide band below clear primary text and a direct anchor to the existing quote form. No horizontal overflow. Distinct from homepage and avoids synthetic people/stock.
- **Contact direct + quote form (1440):** before a dark generic panel, after a light high-contrast editorial production sheet set against a deep emerald contact directory. Existing phone, WhatsApp, real company email and postal locality remain available; no fabricated response-time claim.
- **Mobile form/preview:** original floating fixed action bar repeated the Contact CTA and obscured actual form/preview content. V92 uses route-aware `MobileActionBar` to omit that redundant bar **only** on `/contact`, where direct channels remain prominent. During real browser review the old dark-theme quote preview inherited pale text on pale paper; source CSS was repaired explicitly for heading, strong no-send text, email button, edit link and dark ticket. A follow-up correction improves the attribution line; exact-head CI screenshots required.
- **Proof of real functionality:** separate Playwright test intentionally submits invalid values, sees `aria-invalid`, fills valid name, Romanian mobile number, event type and consent, reaches the message preview, checks automatic focus of `#quote-preview-title`, validates readable email and no-send notice, then edits without losing entered name. It never clicks WhatsApp/email send links. Clipboard granted/refused checks from prior pipeline retained.

## Verification status and honest limits

- Corrected app source `9dd5330` CI PASS: 88/88 Vitest in 31 suites, strict TypeScript, Vite SSR, real Chromium six-width, quote form validation/preview focus/edit, network/SEO and gzip. Real built assets: entry 111.0/190 kB gzip, QuoteForm 31.3/50 kB, shared global CSS 51.2/52 kB. These are not Lighthouse or user-acceptance scores.
- Final attribution fix and computed-color assertions PASS in actual V92 app-source Chrome [#43439489649](https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43439489649). This documentation change advances the branch HEAD; its exact-head CI must still be checked before any integration.
- No changes to homepage, service listings, real event media, customer data policy, external services, hosting or domain. No new client/server API, database, email sending, paid integrations, third-party images or fonts.
- Unmeasured: Lighthouse/field LCP, owner acceptance, VoiceOver/TalkBack physical phones, real user conversions and search rankings. Avoid invented numbers or 100/100 promises.
- V91 PR #89 is the verified base but draft; parallel PR #87 (Spectrum Curtain), #88 (Show Wall), #85 (Event Detail) have separate lineages. PR #19 remains conflicted. Main and public site untouched; release needs deployment review, verified main backup tag and rollback, plus explicit publication approval if auto-deploy.

## Next audit, one area per execution

After V92 screenshots/CI exact HEAD: audit individual `/servicii/$slug` pages for genuinely different production/service storytelling, mobile/keyboard, authentic media loading, Contact conversion and actual SEO content. Do not return to the hero for another indistinguishable cosmetic tweak.
