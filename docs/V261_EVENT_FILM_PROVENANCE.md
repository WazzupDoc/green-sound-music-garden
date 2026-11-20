# V261 — Event film provenance wording (2026-11-20)

## Scope and evidence
One zone: event detail film section in `src/components/site/EventPage.tsx`. Previous heading, “Filmări din arhiva Green Sound”, asserted provenance/ownership without a verified asset-level record. New neutral heading “Filmări disponibile” does not claim that the videos depict Green Sound productions. Existing consent-based YouTube playback and Stop action remain unchanged.

## Research / decisions
- https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html — clear descriptive labels; no borrowed code.
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video — video content and controls reference; no borrowed code.
- https://www.awwwards.com/websites/music/ — visual editorial inspiration only; no copied assets, branding, code or license assumptions.
- https://webflow.com/made-in-webflow/music — layout reference only, no code copied.
Rejected: claiming films are original Green Sound events or extracting TikTok screenshots without owner authorization. No dependency, cost, asset or homepage change.

## QA status / rollback
Source regression added in `event-film-provenance-v261.test.ts`. TypeScript, SSR, Vitest, six-width Chromium, matched 390/1440 before-after screenshots, video consent, network/provenance inspection and exact-head GitHub Actions are NOT VERIFIED in this execution. This is a copy/provenance correction, not a visual redesign. Rollback: revert the V261 commits on the feature branch, not main. Main and production untouched.

## Next
Audit each `event.videos` record against original owner-supplied media and documented permission; replace generic copy with truthful verified captions only after provenance review. Prioritize end-to-end event→Contact prefill browser QA and accumulated V223–V260 draft validation before further release work.
