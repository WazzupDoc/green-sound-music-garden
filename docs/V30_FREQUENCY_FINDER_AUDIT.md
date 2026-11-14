# V30 — Frequency Finder / Interaction Design and QA
Date: 2026-11-11
Development branch: `design/crafted-atmospheres-v30-frequency-finder`
Draft PR: https://github.com/WazzupDoc/green-sound-music-garden/pull/15

## Product rationale
V20–V29 already offers comprehensive editorial pages, Light Desk, Soundcheck,
Service Mix, photo journal and event briefs. The global mobile/desktop header
had no quick way to reach a specific service or an event without exploring
multiple pages. A heavyweight third-party search provider would be unnecessary
for the small verified first-party page directory.

**Frequency Finder** provides a site-wide, recognizable Green Sound control
that opens a dedicated brand-driven navigation experience with a local
search index built directly from `src/data/site.ts`. The current corpus is
8 service routes, 5 event routes and 6 editorial destinations; it is not
presented as crawling user files or all content on the internet.

- Visitors can open search using its real 44px header button, Ctrl/Cmd+K
  (from non-modal contexts) or "/" outside form fields.
- The feature imports lazily on first use, so search logic and Radix modal
  content don't need to be added to the initial critical render path.
- Search is diacritic- and case-insensitive (e.g. "nunta" matches the
  factual "Nuntă" event label). It scores title matches above description.
  The local array contains no fabricated results, user-profiling or telemetry.
- A query-free search offers six real relevant destinations chosen
  editorially, without false "trending" or "most popular" metrics.
- A nonmatching query displays a truthful no-match state with actual /contact
  navigation, never a dead-end or hallucinated service.
- Real TanStack Link routes preserve client navigation; nothing is
  automatically sent to WhatsApp or email.

## Accessibility
- Built on the site's already-installed Radix Dialog, not a custom
  focus trap. Modal semantics, focus containment, Escape and close control
  come from the proven primitive.
- Search input is a native <input type=search>, while results are actual
  links; we deliberately do not label links with incorrect listbox/option
  roles or fake a combobox keyboard interface.
- ArrowDown from the input focuses the first real link; ArrowUp from the
  first result returns to the input. Standard Tab and Enter remain native.
- The trigger is visible on both desktop and narrow screens, has a
  comprehensible Romanian label, `aria-haspopup=dialog` and shortcut hints.
- Escape and closing restores focus to the trigger. An existing dialog
  prevents global shortcut activation, so the gallery/lightbox won't be
  accidentally overlapped.
- No keyboard shortcuts are taken from an editable input, textarea,
  select or contenteditable for "/" to preserve typing behavior.

## Performance and visual constraints
- No new npm dependencies, backend, search API, external fonts or images.
- React.lazy adds an on-demand JavaScript chunk; the initial state is
  closed, avoiding SSR hydration mismatch or preloading modal content.
- CSS opacity/transform only for desktop entrance; no choreographed
  scroll event, video or sound on search, and no animation under
  prefers-reduced-motion.
- No fabricated fast LCP/INP or guaranteed first-position SEO claims.
- Test both 390px / 1440px actual Chromium screenshots and responsive
  header at 360/390/430/768/1440/1920.

## Reference research (ideas, not copied assets)
- W3C WAI-ARIA combobox and listbox semantics:
  https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
  Chose native search + links rather than an incorrectly designated combobox.
- Radix Dialog accessibility and focus behavior:
  https://www.radix-ui.com/primitives/docs/components/dialog
- web.dev INP task and rendering guidance:
  https://web.dev/codelabs/understanding-inp
  The directory has only 19 items and local constant-time filtering,
  so no expensive server-based autocomplete or delayed debounce.

## Release gate
- [ ] Strict TypeScript and SSR/Vite production build.
- [ ] Unit and architecture tests.
- [ ] Chromium at six viewport widths, with no unexpected console errors.
- [ ] Desktop Ctrl+K, mobile trigger, slash shortcut, arrow navigation,
      Escape focus restoration and first-party result navigation.
- [ ] Accent search, no-match fallback, no fake results.
- [ ] Audit image screenshots and actual mobile keyboard behavior.
- [ ] Real Core Web Vitals measurement on independently deployed staging.
- [ ] Do not merge or deploy without owner approval.
