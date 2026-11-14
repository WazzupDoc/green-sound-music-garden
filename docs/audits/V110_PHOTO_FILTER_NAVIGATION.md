# V110 — Photo lightbox category navigation (2026-11-14)

Base: V109 draft, branch `design/v109-film-category-counts`. One zone: `/portofoliu` photo gallery.

## Source defect and change
When the user filtered to Music/Technology/People, opening a thumbnail and pressing Next/Previous or keyboard arrows cycled through all six photos, including hidden categories. V110 derives navigation from visible `frames` when the active photo belongs to that filter. A direct-linked photo outside the current filter falls back to the complete archive. Touch swipes and position announcement share the same navigation set. No new dependencies, media or backend. Homepage unchanged.

## Acceptance pending (do not claim verified)
- Browser screenshots before/after same route and state at 390 and 1440, six-width regression 360/390/430/768/1440/1920.
- Filter Music then open first thumbnail; ArrowRight/Next/swipe must stay in Music and wrap; Escape returns focus to visible thumbnail.
- Deep-linked photo outside filter uses complete gallery; reduced motion/Lite and image decode checks.
- TypeScript, SSR build, Vitest, gzip budgets and GitHub Actions exact-head status.

## References and licensing
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ — keyboard and modal interaction guidance; documentation reference only, no copied code.
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current — position/state semantics; documentation reference only, no copied code.
- No new assets, dependencies or external code. Alternative rejected: resetting filter on lightbox open (loses user selection).

## Rotation
Next: Contact funnel or event detail visual audit, only after current stacked branch QA. No main/deploy changes.
