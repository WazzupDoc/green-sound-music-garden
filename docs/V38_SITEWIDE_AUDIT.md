# V38 — Full site audit / Release-readiness and service discovery
Updated 2026-11-11
Review branch: `design/crafted-atmospheres-v38-audit-service-discovery`
Draft PR: https://github.com/WazzupDoc/green-sound-music-garden/pull/24
Base: V37 `design/crafted-atmospheres-v37-frequency-studio` (PR #23).

## Method and evidence boundaries

**Two separate sites exist.** The current public site, `https://greensoundmusic.com`,
is still an old WordPress-era experience; the new React/TanStack design lives
in a connected GitHub development branch and Codespaces preview. A GitHub CI
pass does **not** mean the public domain was changed or that Google traffic
and Core Web Vitals were measured.

Public-site content examined on 2026-11-11:
- https://greensoundmusic.com/ : current public homepage uses an older
  static-oriented message and its footer still prints `© 2017`.
- https://greensoundmusic.com/servicii/ : genuine company catalogue of
  eight services, including DJ, sound/light/LED, studio, trupa, hostess,
  ursitoare, smoke effects and Start Veselia.
- https://greensoundmusic.com/contact-green/ : **real old Contact URL**,
  with a mixed-language form including a "Topicc" label and
  "Send message", plus the firm's published contact details.
- A public WordPress URL is not itself proof of the new application's
  release: changes here are **development-only**.

## High-priority findings and corrections

| Issue | Evidence | Severity | V38 correction |
| --- | --- | --- | --- |
| Old Contact link may break after migration | Public `/contact-green/`; React has only `/contact/` | P0 SEO/UX migration | Add a real TanStack Start **HTTP 301** route preserving bookmarked/indexed old contact URL, and assert status/Location through Playwright |
| Main site URLs never tested together | V37 browser suite tested several detailed pages and six widths, but had no exhaustive 20-page sitemap crawl | P1 reliability | New `.github/scripts/audit-public-pages.cjs` visits **all 20** sitemap URLs, checks HTTP 200, unique descriptive H1, site-branded title, canonical, description, OG/Twitter image metadata and parseable JSON-LD |
| Internal links might point to nonexistent pages | Individual browser navigation did not verify the full internal link graph | P1 conversion | Same audit checks actual rendered internal links across all 20 pages against canonical path set; rejects broken routes |
| Repeated service gallery images | `ServicePage` reused the first two gallery images in a sticky sidebar and displayed **all** images again below; hero could repeat in gallery | P1 visual polish | Pure `uniqueServiceGallery` helper removes duplicate URLs and the hero photo, and displays each remaining service photo in **one** appropriate place |
| Generic three-service promotions on every service page | Old `services.filter(...).slice(0,3)` picked the earliest entries regardless of page relevance | P1 design/SEO conversion | Eight explicit catalogue-verified complementary groupings, with truthful microcopy; replace generic cards with original photo-led, motion-safe editorial discovery, 390/1440 screen proof |
| Asset integrity unverified across pages | Earlier QA verified key homepage images but not every photo referenced by every indexable page | P1 content quality | Crawl collects **distinct first-party** image paths and verifies HTTP 200 + image content-type |
| Actual field CWV and search indexing unknown | Cannot access production analytics/Search Console or physically measure the new site in production | Release gate | Keep pending; no fabricated Google ranking, Lighthouse, field LCP/INP/CLS or Core Web Vitals success |
| Form delivery is client-mediated, not a backend inbox | Existing Event Pass opens WhatsApp, mailto or copies text, does not submit server-side | Business sign-off | Remain truthful; real server email delivery requires authorized provider credentials and a privacy/security review |

## Architectural invariants
- Contextual service recommendations are only from `src/data/site.ts` and
  explicitly curated: no fake prices, reviews, availability, bundles or
  purchase mechanics.
- All route/recommended links use real project routes, no dynamic search
  engine dependencies or paid service APIs.
- Service hero images appear once; previously repeated first-two gallery
  assets are de-duplicated by source URL in a pure, unit-tested helper.
- The relationship cards use `loading=lazy`, real source dimensions,
  native first-party links, 48px-ish touch targets, explicit focus styles
  and no looping animation. Reduced motion and Save-Data disable scaling.
- Existing V20–V37 experience, Frequency Studio, responsive header,
  Contact validation, safe JSON-LD, robots, sitemap and 404 remain intact.
- The old Contact redirect route is excluded from canonical sitemap.

## Standard references
- Google Search Central, site moves with URL changes:
  https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
  Redirect old URLs with permanent server redirects and test key pages.
- Google Search Central, SEO links:
  https://developers.google.com/search/docs/crawling-indexing/links-crawlable
  Use real anchor elements with valid destinations.
- Google Search Central, canonical URL guidance:
  https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- TanStack Router redirect API supports `statusCode`:
  https://tanstack.com/router/latest/docs/api/router/RedirectType
- WCAG 2.2 Keyboard/Focus Visible and target size:
  https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html

## Verification and future release gates
- [ ] CI strict TypeScript and Vite SSR build.
- [ ] All existing Vitest plus new explicit eight-service relationship
      sets and duplicate-photo hygiene cases.
- [ ] Playwright 360–1920 browser regressions; Ursitoare contextual
      cards at both 390px and 1440px, correct relevant URLs, no repeated
      hero/sidebar photo paths.
- [ ] **New complete HTTP crawl**: all 20 sitemap URLs serve 200, metadata,
      JSON-LD, H1, canonical and internal anchor graph are sound.
- [ ] Verified legacy `/contact-green/` 301 with Location `/contact/`.
- [ ] All referenced first-party site images return HTTP 200 image media type.
- [ ] Inspect real visual screenshots for overflow/cropping/contrast.
- [ ] Owner reviews existing copy, image/YouTube rights, privacy, cookie
      disclosures and formal business contact details.
- [ ] Approve and test a staging deployment, then measure real LCP,
      CLS and INP with device/network throttling and monitor Search Console.
- [ ] Do **not** merge to main or deploy the official domain before
      explicit owner approval.

**Audit verdict:** the full site is not objectively "perfect" simply because
a test suite passes. This release improves concrete, measurable risk areas
and records remaining unknowns rather than inventing absolute success.
