# Green Sound Music V29 — Service Mix / design and release audit
Date: 2026-11-11
Branch: `design/crafted-atmospheres-v29-service-mix`
Draft review: https://github.com/WazzupDoc/green-sound-music-garden/pull/14

## Why this change
The V28 /servicii catalogue was a plain, 8-item link list, whereas the homepage and About already had sophisticated user-directed storytelling. V29 upgrades the services page to a genuinely useful, bespoke selection console. Users can learn what each first-party service offers, compare the specific capabilities and create a **bounded, truthful, editable brief** without creating an account, waiting for external software or submitting anything automatically.

## Functional details
- Catalogued data come from `src/data/site.ts` including `services[].slug`, `name`, `short`, `highlights`, `image` and the already-established `formLabel`. No hard-coded duplicated service descriptions.
- A service button toggles selection with `aria-pressed`. A separate, correctly-labelled inspect button changes the photographed service without adding it. A direct link opens the service detail route.
- Visual summary has removable chips, a real count, a clear-all control, and a submit that is **disabled** when no service was chosen.
- A native GET to `/contact` passes only a pipe-joined list of existing bounded form labels. Existing `validateBrief()/parseServices()` on the Contact route deduplicates, allowlists and truncates to eight. The RHF quote form hydrates with checked services. The visitor later reviews the prepared event message and deliberately decides whether to send by WhatsApp or email.
- There is **no backend booking**, availability check, fake rates, claimed guaranteed packages or silent sending.

## Visual style and performance
- Asymmetric editorial composition: matte obsidian catalogue, light green selection marks, first-party photographic scene, and cream-colored production brief.
- Strong typography with restrained compositor-safe image entrance on desktop only. Reduced-motion fully disables the animation. No additional library, unnecessary scroll handler, canvas workload or video.
- Intrinsic image width and height from data, `loading="lazy"` and `decoding="async"` for the below-fold service photograph.
- Minimum 44px accessible touch areas, focus-visible states, count announcement and intelligible `aria-pressed` status.
- Designed for 360/390/430/768/1440/1920 widths. Release gate uses real Chromium screenshots; passing CI does not certify field INP or LCP scores.

## External references used, not copied
- Google's web.dev INP: https://web.dev/articles/inp/ — immediate feedback on interaction is central to perceived responsiveness; no long-running event handlers are added.
- Optimize INP: https://web.dev/articles/optimize-inp/ — avoid layout thrashing and defer nonessential work. Selectors update simple React state and CSS rather than constructing large DOM or canvas effects.
- WCAG 2.2 target size: https://www.w3.org/WAI/WCAG22/#target-size-minimum — target controls should be sufficiently large and spaced; actual selection and inspect buttons are separate controls.
- UI patterns are original Green Sound work, not lifted from a template, Reddit visual or another brand.

## Regression and publication gates
- [ ] Strict TS and SSR Vite production build, existing unit tests.
- [ ] Six-width Playwright screenshots with no extra console errors or horizontal overflow.
- [ ] Eight service cards, two selections, selected preview and two allowlisted Contact form checks from actual GET navigation.
- [ ] Remove selected chip, clear-all and disabled empty CTA, no auto submission.
- [ ] Real mobile touch and keyboard review on physical devices.
- [ ] Real field performance and Lighthouse measurements on separately deployed staging.
- [ ] Verify business wording, services, first-party media rights and privacy before public release.
- [ ] Owner explicitly approves merging and deploying before changing main/greensoundmusic.com.
