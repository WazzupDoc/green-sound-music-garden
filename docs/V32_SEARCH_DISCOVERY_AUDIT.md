# Green Sound Music V32 / Search Discovery and Social Sharing Audit
Date: 2026-11-11
Source branch: `design/crafted-atmospheres-v32-search-discovery`
Review PR: https://github.com/WazzupDoc/green-sound-music-garden/pull/17

## Current verified gap
The actual V31 review tree had neither `public/sitemap.xml` nor a sitemap
route, and `public/robots.txt` did not advertise any sitemap. The shared
`pageHead()` emitted per-page canonical and OG title/description, but not
`og:image` or `twitter:image`. These are code-level observations, not a
claim about whether the legacy WordPress domain has its own sitemap.

## Implemented / real website only
- A static root `public/sitemap.xml` with 20 canonical URLs, checked against
  the actual TypeScript service and event catalogue via a Vitest test.
  Seven primary/editorial/legal pages, 8 services and 5 event pages.
- A single absolute `Sitemap: https://greensoundmusic.com/sitemap.xml`
  directive in `public/robots.txt`. Existing crawler allow rules remain.
- All sitemap paths use the same https origin and trailing-slash convention as
  `pageHead()`. No URL query variants, fabricated locality landing pages,
  duplicate URLs or non-canonical `www` aliases.
- No `lastmod`: the codebase does not yet maintain trustworthy per-page
  material-update dates. Pretending that every URL changed today could
  mislead crawlers and is specifically avoided.
- A shared social image fallback uses Green Sound's actual concert photo,
  with its real width/height and alternate text in Open Graph metadata.
  Service and event detail pages override it using their real first-party
  imagery from `src/data/site.ts`. These produce absolute URLs for social
  crawlers and match the existing title/description/canonical information.
- No npm runtime dependency, fake social proof, AI-generated photos,
  unreviewed external indexer or traffic-tracking integration.

## SEO interpretation / limits
A sitemap helps a crawler discover preferred canonical URLs, but **does not**
guarantee indexing, search rank or impressions. Real performance still
depends on search intent, content, authority, crawling and technical health.
Social preview crawlers may cache earlier results until the updated site is
public and recrawled. The current public `greensoundmusic.com` is unchanged
while this is a draft branch.

## Primary sources, standards and research
- Google Search Central, "Build and submit a sitemap":
  https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
  Use absolute canonical URLs, include only preferred pages, do not claim
  that publishing guarantees crawling, and avoid invented lastmod.
- Google Crawling Infrastructure, robots.txt sitemap directives:
  https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec
  The sitemap directive must use a fully qualified URL.
- Google Search Central, sitemap overview:
  https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
  A small, well-internally-linked site may not require a sitemap, but
  discoverability is usually beneficial and useful for Search Console QA.
- Open Graph protocol:
  https://ogp.me/ — og:image is an absolute preview asset; optional
  image width/height and alt provide descriptive context.
- X/Twitter Card markup:
  https://developer.x.com/en/docs/x-for-websites/cards/overview/markup
  A summary-large-image card benefits from an image field, while actual
  rendering is controlled by the destination platform.
- Google's FAQ rich-result policy has restricted visibility for ordinary
  commercial sites since 2023; this change does **not** claim FAQ rich results:
  https://developers.google.com/search/blog/2023/08/howto-faq-changes

## Verification gates
- [ ] strict TypeScript, Vite/TanStack Start SSR build and Vitest complete.
- [ ] `src/lib/seo.test.ts`: exact 20 real URLs, no duplicates, correct robots,
      OG/Twitter images and page-specific service imagery.
- [ ] Chromium requests actual `/sitemap.xml` 200 and parses well-formed XML;
      `/robots.txt` advertises it, service canonical matches sitemap,
      real OG image and Twitter image match on home and service pages.
- [ ] Preserve all V20–V31 regression checks at six viewport widths.
- [ ] Preview actual favicon/meta and typography, then verify field LCP/INP
      on a deployed staging environment.
- [ ] After approved public launch, use Search Console to request sitemap
      processing and check index coverage, canonical selection and errors.
- [ ] Check link share previews with actual WhatsApp, Facebook, LinkedIn
      and messaging tools after publication; never invent success.
- [ ] Owner reviews business facts, privacy/legal text and media rights.
- [ ] Explicit owner approval before merge and deployment.
