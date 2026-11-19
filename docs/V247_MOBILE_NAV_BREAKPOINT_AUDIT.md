# V247 — Tablet mobile navigation close-control coverage (2026-11-19)

## Scope and defect
V246 styles the sticky native-dialog close control only through 850px, but SiteHeader.tsx closes the mobile dialog at the desktop navigation handoff of **1024px** (`matchMedia('(min-width: 1024px)')`). Thus widths 851–1023px could open a scrolling mobile dialog without the sticky close treatment. This is a source-level breakpoint mismatch, not a browser-confirmed visual regression.

## Implementation
Expand only the V246 mobile close styling to max-width 1023px; retain the existing compact-height rule for short phones. Add a Vitest source assertion to guard the breakpoint. No dependency, new asset, autoplay, homepage change or backend.

## QA required
Run TypeScript, production SSR, Vitest, gzip, Chromium at 360/390/430/768/900/1023/1024/1440/1920; check native dialog scroll and close at 900 and 1023px, Escape, focus return, reduced motion and Lite. Capture real matched before/after browser images at 390/900/1440, with 900px scrolled-menu state. CI exact-head and visual verdict are **unverified** at authoring time. Do not merge or deploy.

## Research and provenance
No external code, media or new packages. The fix follows the actual repository breakpoint; no license change. Reference for native modal behavior: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog . Reject a JS scroll observer as unnecessary complexity; native CSS sticky is sufficient when supported. Reject a visual overhaul in this small regression fix to preserve the one-zone rotation.

## Follow-up
Contact mobile funnel and clipboard denied/permitted behavior; record browser screenshots, check source and CI exact-head before claiming release-ready.
