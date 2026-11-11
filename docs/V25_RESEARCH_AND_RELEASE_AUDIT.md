# V25 — Editorial site research, decisions and release checklist

Date: 2026-11-11. Repository: WazzupDoc/green-sound-music-garden.

## Research — what informed the redesign (not source code or asset copying)

- **Webflow, event and production collections:** https://webflow.com/made-in-webflow/productions and https://webflow.com/made-in-webflow/eventplanning show how media-first production/event portfolios can lead with evidence and coherent typography. Interpretation for Green Sound: create a first-party photo journal and a deliberately operated real film archive. No assets or code were copied.
- **Webflow, music and portfolio categories:** https://webflow.com/made-in-webflow gives a range of category examples. Interpretation: restrained photo-led storytelling rather than cloning a single fashionable page.
- **Community discussion on visual polish:** https://www.reddit.com/r/webdesign/comments/1x2dgbj/redesigned_my_portfolio_website/ (October 2026) debates excessive motion versus hierarchy. Feedback is anecdotal, not conversion data. Response: no page-blocking loader, no auto-scrolling, no background video.
- **Community discussion on local business conversion:** https://www.reddit.com/r/webdesign/comments/1sx6plp/i_stopped_making_beautiful_websites/ (April 2026) emphasizes clear headlines, CTAs, real proof, and location clarity. Qualitative opinions, not validated A/B results.
- **Google LCP guidance:** https://web.dev/articles/optimize-lcp/ (updated March 2025) and https://web.dev/learn/performance/lazy-load-images-and-iframe-elements/ : keep hero primary image prioritized; lazy load secondary gallery images and do not instantiate YouTube until a user explicitly clicks Play.
- **Google INP guidance:** https://web.dev/articles/optimize-inp and https://web.dev/articles/vitals: keep interactions direct, native and low JS overhead; respect reduced motion.

## Content provenance and legal
- All six gallery frames use `images` data from `src/data/site.ts` that points at verified Green Sound first-party WebP files.
- The film selector uses only `videos` already documented in `src/data/site.ts`, no unlicensed footage imported.
- Project titles are **editorial descriptions**, not invented names of clients, venues, contracts or award results.
- Business city, founded year, contact and real available services remain read from `data/site.ts` rather than manually duplicating facts.
- Photographs/video and cookie policy still require the business owner's editorial and privacy approval before publishing. Studio and performance licenses remain subject to their existing origin rights.

## Interaction and semantic rules
- No modal on first load. Photo expansion occurs only on click.
- The modal has descriptive title, alternate text, keyboard direction controls, explicit buttons, Escape-to-close via Radix, focus handling via Dialog.
- Photos below the hero are `loading="lazy"`; originals include width/height attributes to prevent layout shifts.
- Every filter is a real button with `aria-pressed`. Changing selected movie does not trigger video loading.
- Native `GET /contact` event setup ensures user context survives navigation; contact-route allowlist strips unrecognized values, and the user sends messages in their own WhatsApp/email application.
- No quotes, dates available, testimonials, completed projects counts, prices or external endorsements are fabricated.

## Release gate
- [ ] GitHub CI latest V25 branch succeeds: TypeScript, production SSR build, existing tests, browser audit.
- [ ] Screenshot audit at 360, 390, 430, 768, 1440 and 1920 px.
- [ ] Real-device keyboard/modal check and inspect font/image loading.
- [ ] Test all five event types, filter categories and submission handoffs.
- [ ] Manually review `/portofoliu`, `/evenimente/nunti`, `/contact`, nav, media load.
- [ ] Check video source permissions, privacy copy, consent controls, terms and actual business facts with owner.
- [ ] Measure actual Lighthouse / CrUX and LCP/INP/CLS from representative deployed preview before public launch; CI success is not a Core Web Vitals score.
- [ ] Publish only after explicit owner approval. Never merge to `main` automatically.

## Prior known risk
Intermittent React 19 SSR hydration attributes warning on the quote form was observed in an earlier GitHub Actions run. Retain the browser error assertion, investigate if it recurs. Do not suppress console errors simply to get green CI.

## Findings from iteration and actual browser screenshots
- A first visual test found that the mobile 2-column grid's first image had a larger min-height than its CSS grid row, so it visually overlapped the next photo. Allocated a dedicated first row, then added bounding-box regression.
- Initial native GET to `/contact` intermittently emitted React hydration attribute differences from RHF inputs. Resolved by deterministic shell + `ClientOnly` RHF form and hydration-gated search defaults, **not** by suppressing console errors. Official TanStack guidance: https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors and https://tanstack.com/start/latest/docs/framework/react/guide/execution-model.
- Real browser screenshot showed that previously unstyled `director-contact-intro` began behind the fixed navigation; added a dedicated editorial design and viewport geometry assertion.
- Desktop film screenshot captured an image before it loaded; the site retains lazy loading for below-fold media but has a visual fallback and browser QA awaits the poster load. Google guidance: https://web.dev/learn/performance/lazy-load-images-and-iframe-elements.
