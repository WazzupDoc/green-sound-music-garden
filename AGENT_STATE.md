## 2026-11-13 — V75 editorial keyboard focus regression

- Verified V74 exact-head `828ca2ccd8624033b261f93179f8ae8d63dbef56`: workflow 43362462854 FAILED at Vitest (3 assertions in `production-index.accessibility.test.ts`), while strict TypeScript, SSR build and gzip budgets PASSED. Separate motion workflow 43362462868 PASSED; does not imply overall green.
- Updated stale assertions to the current `:has(.gs-index__service:focus-visible)` keyboard focus treatment and grouped Lite/reduced-motion overrides. Retained actual checks against layout-shifting hover padding and motion, without disabling tests. New branch `fix/v75-editorial-focus-ci-regression`; exact-head CI pending.
- Rotation: photo V70, homepage V71, hero V72, CI V73–V75; navigation/mobile Escape NEXT once CI is green. Six-width browser/Contact tests, deployment trigger and rollback remain blocked/unverified. PR #19 mergeable=false, main unchanged.

## 2026-11-13 — V74 Vitest CI blocker

- Verified V73 exact-head: motion workflow #43356575075 SUCCESS; React typecheck/build workflow #43356575133 FAILURE at Vitest: 8 suites cannot evaluate fixture `new URL(..., import.meta.url)` because Vitest's transformed `import.meta.url` is not `file:`. Replaced fixture paths in 8 tests using repository-root paths; preserved all assertions and CI gates. This is not a browser or Lighthouse result.
- Rotation: photo V70, homepage V71, hero V72, CI V73/V74, **navigation/mobile Escape NEXT** after CI validation. V74 draft PR and CI pending. PR #19 mergeable=false; main untouched.

## 2026-11-13 — V73 CI gate repair

- Real V72 head `66969135b31d7808e2847a24bf4e14f98c5fbca6`: typecheck/build workflow 43348988088 **FAILED** in strict TypeScript, with ten errors across date validator and CTA regression; motion workflow 43348988129 passed. These failures supersede prior "CI unconfirmed" note. PR #66 mergeable=true but NOT releasable; PR #19 mergeable=false.
- V73 branch `fix/v73-exact-head-typescript-ci` addresses both exact errors, without disabling checks. Actual V73 workflow not yet verified. Main unchanged. Rotation matrix: photo V70, homepage route V71, hero V72, **CI release gate V73**, next mobile navigation and keyboard Escape. Release gates: CI, SSR, Vitest, browser 360/390/430/768/1440/1920, Contact handoff, deployment trigger/rollback and approval.

## 2026-11-13 — V71 / CRITICAL homepage route regression repaired

- Audited actual `src/routes/index.tsx` on V70 and V48: V70 routed to `RegiaHome`, which rendered hero + event selector/timeline + backstage + three films + closing CTA, contrary to the explicit V48 clean-home requirement. This was a concrete regression hidden by earlier changes to dormant `ProductionIndex` and `editorial-reset.css`.
- V71 restores the exact V48 editorial route: `StageHero`, `ProductionIndex` (3 chapters/8 services), `EditorialPortfolio` (3 real films), one finale Contact CTA. Dedicated event discovery remains on its own routes. Added a static Vitest route composition regression. No new dependency/assets.
- Rotation matrix: homepage composition / hero = V71 restored, **browser visual QA pending**; editorial photos = V70 CSS gate (now actually mounted); buttons/nav/films/Contact/SEO = pending. Prioritize exact-head CI, six-width screenshots, Contact 2-service handoff, and deployment configuration.
- Baseline V70 PR #64 head `6598a345699e1f0abfaeb79e63f6b5845bfd0a1d`, mergeable=true but exact-head PR workflow lookup returned no runs. PR #19 mergeable=false; V48 PR #35 mergeable=true. V71 TypeScript, SSR, Vitest and Chromium not yet run. Main untouched. No score or performance claim.

## 2026-11-13 — V70 / Divide et impera: service photographs

| Area | Last work | Status / next priority |
|---|---|---|
| Editorial service photos | V70 hover motion gate | Draft; verify reduced motion/Lite and six widths in browser |
| Hero / first impression | V48/V50 previous work | Next visual audit: responsive hierarchy, contrast and real asset |
| Buttons / CTAs | V60 previous work | Check one primary CTA and keyboard affordance |
| Navigation / mobile menu | Not audited in this rotation | Keyboard, Escape, touch targets |
| Films / real footage | V49 previous work | Check image/video load, provenance and Lite |
| Service links / typography | V68 previous work | Check routes and mobile legibility |
| Contact / brief | V69 previous work | Check two-service handoff, calendar, clipboard |
| SEO / 404 / sitemap / security | Pending | Verify actual HTTP responses and canonical/JSON-LD |

- Actual code: gated editorial photo hover scale by hover-capable pointer, no reduced motion, and non-Lite mode; retains filter cue and focus outline. Original CSS/Vitest only, no media or dependencies. CI and local tests not run/confirmed. PR #19 mergeable=false; V48 exact-head PR run success; V69 PR #63 mergeable=true but not proven green. No main change.
- Next: hero typography and LCP image audit, then real Chromium QA, TypeScript/SSR tests, deployment config, release rollback and backup-tag permissions. Do not publish without approval if main auto-deploys.

## 2026-11-13 — V69 draft

- Based on V68 PR #62, corrected Contact query prefill acceptance of impossible ISO-shaped dates; pure Gregorian validator plus Vitest regressions. Homepage editorial unchanged. No assets or dependencies.
- V68 exact-head PR workflow query returned zero runs (the connector only lists PR-triggered first-page runs); not evidence of passing or failing CI. No TypeScript/SSR/Chromium tests executed in this environment. V48 remains user-reported last fully validated editorial baseline.
- Backlog: exact-head CI, six-width browser and two-service Contact handoff, invalid/clipboard errors, PR #19 mergeability and main deployment trigger/rollback audit. No main merge or deployment.

## 2026-11-12 — V68 draft

- Stacked on V67 PR #61; native Map resolves eight editorial links by slug after duplicate-source validation, preserving original references and 3/2/3 order. Added identity/order regression; no media, dependencies, homepage sections or external services.
- V67 PR #61 mergeable=true, but exact-head CI and browser QA unverified. PR #19 mergeable=false. V48 remains last user-confirmed fully validated editorial baseline. No measured performance/SEO gains.
- Next: run exact-head CI, TypeScript/SSR/Vitest/Chromium six widths, Contact two-service handoff and audit main deployment triggers. No main merge.

## 2026-11-12 — V67 draft

- Branch design/v67-catalogue-duplicate-source-guard stacked on V66 PR #60. Fixed integrity blind spot: duplicated slugs in source catalogue were hidden by Set before parity validation. Added source guard and regression test. No visible homepage changes or packages.
- V66 exact-head PR workflow query returned zero runs; no claim of passing CI, TypeScript, SSR or browser QA for V67. PR #19 conflict status requires independent mergeability check. Main untouched.
- Next: execute CI exact-head, six-width Chromium, Contact two-service handoff, SSR/sitemap/404 and production deployment/rollback audit. Scores unmeasured.

## 2026-11-12 — V66 draft

Branch `design/v66-editorial-catalogue-completeness` stacked on V65. Added catalogue parity fail-fast guard and unit regression, preserving three chapters and eight direct links. V65 exact-head PR workflow query returned zero runs; V66 CI, TypeScript, SSR and six-width browser audit unverified. No measured Lighthouse or SEO gains. Next: run CI, inspect six widths and Contact two-service handoff; audit deployment triggers. Main unchanged.

## 2026-11-12 — V65

- Branch design/v65-editorial-service-uniqueness-guard stacked on V64. Guard against repeated service slugs across the three editorial chapters; added an eight-unique-service test. No visible UI change or dependency.
- V64 exact-head PR workflow query returned no runs; PR #58 mergeable=true (does not establish CI success). PR #19 mergeable=false. TypeScript, SSR, browser six widths and Contact flow unverified. No main merge/deployment.
- Next: exact-head CI, browser and screen-reader audit, two-service Contact prefill, deployment-trigger review.

## 2026-11-12 — V64

- Branch design/v64-editorial-semantic-navigation based on V63 PR #57. Adds native accessible list labels and descriptions to each of three existing editorial chapters, plus regression test.
- V63 commit 5cbfe8bcc6f98b978f294972685fb3e394c6ecb0: no PR-triggered workflow runs returned by commit query; V64 CI pending. PR #19 still mergeable=false; V63 PR #57 mergeable=true but CI unconfirmed.
- No Lighthouse, LCP, UX, SEO or conversion score claimed. No main merge/deploy.
- Backlog: CI exact-head, screen reader and keyboard QA at 360/390/430/768/1440/1920; 2-service Contact flow; real responsive image variants; deployment/rollback audit.

## 2026-11-12 — V63

- Branch: design/v63-editorial-service-clarity; base V62 PR #56. New concise, service-specific copy in the existing three chapters and regression test; no new widgets or assets.
- Scores: Lighthouse, LCP, SEO ranking and conversion unmeasured. V62 exact-head PR workflow query returned no runs; V63 CI and browser QA pending.
- Blockers: PR #19 mergeable=false; latest editorial stack lacks verified exact-head TypeScript/SSR/browser results; no main deployment/rollback clearance.
- Next: inspect CI exact-head and six-width screenshots; test Contact 2-service prefill and SSR, then audit main deploy triggers.

Updated 2026-11-12, V62 draft: CSS touch-hover neutralization added to existing editorial service programme, with static Vitest guard. V61 exact-head PR workflow query returned no runs; V62 full CI, Chromium six-width and physical touch QA unverified. PR #19 mergeable=false. No main merge/deployment. Next: run TypeScript/SSR/Vitest/Chromium, inspect screenshots and Contact 2-service flow; verify production deployment and rollback gate.

Updated 2026-11-12, V61 draft: found a real false-negative in V60 static CSS regression: regex literals were double-escaped. Replaced with CSS hover declaration checks and mutation fixtures for gap, padding, margin vs transform. New branch stacked on V60 editorial, not the parallel immersive redesign. V60 exact-head CI unconfirmed; PR #52 has a successful PR workflow run but violates the locked V48 homepage composition, so not used as base. PR #19 mergeable=false. No main merge, deployment or measured Lighthouse. Next: exact-head CI, Chromium and Contact tests.

Updated 2026-11-12, V60 draft: removed layout-affecting intro CTA gap hover, replaced with arrow-only transform gated by normal-motion/non-Lite. Added static regression. Baseline V59 CI not confirmed through PR workflow lookup; V60 CI pending. PR #19 mergeable=false; parallel V59 live-show PR #50 not integrated. No main deployment or measured Lighthouse. Next: exact-head CI, six-width Chromium hover/focus, Contact 2-service flow and main deploy/backup audit.

Updated 2026-11-12, V59 draft: refined editorial photographic focus cue to keyboard-visible focus only; pointer clicks no longer trigger the same extra chapter highlight. Added static Vitest guard. V58 exact-head CI not confirmed through connector; V59 CI pending. PR #19 mergeable=false. No measured Lighthouse score, no main deployment. Next: confirm CI, keyboard/pointer Chromium at six widths, Contact prefill, screenshot review, verify deployment/backup gate.

Updated 2026-11-12, V58 draft. Removed layout-affecting hover padding in editorial service links; compositor-only text transform is limited to normal-motion/non-Lite. Added regression test. V57 PR #46 is a separate homepage poster redesign with only its visual QA run confirmed; do not merge it into the V48-clean editorial line without owner review. V56 and V55 exact-head CI unavailable from PR workflow query. PR #19 mergeable=false. No Lighthouse measurements or production merge. Next: exact-head CI, six-width screenshots, keyboard/reduced-motion/Lite behavior, Contact 2-service prefill, main deploy trigger/rollback audit.

Updated 2026-11-12, V56 draft. New keyboard focus-within visual chapter cue on existing editorial service links, CSS-only; guarded by a static Vitest test. V55 CI unverified; V53 live-stage PR #44 is a separate parallel redesign, not merged into this branch. PR #19 mergeable=false. No production merge. Scores remain unmeasured.

# AGENT STATE — Green Sound Music

Updated 2026-11-12, V55 draft. Baseline V54 PR #42 (draft, mergeable at last check, no exact-head CI runs returned); V53 PR #41. PR #19 remains unmergeable due to conflicts.

## Implemented
- V55 continuous editorial 01–08 running order via native CSS counters; no new homepage section or dependency.
- Corrected V54 image-path test to use literal prefix checking.
- Added source/license research, asset provenance, experiment gate and version documentation.

## Unverified
- TypeScript, SSR, Vitest, Chromium six-width, visual screenshots and CI for V55. No Lighthouse or field SEO scores measured.
- Main deployment trigger, backup tag/rollback permissions, and public production status. Main must remain unchanged.

## Next backlog
1. Confirm V55 exact-head CI and fix any failing tests, especially existing test runner imports.
2. Inspect screenshots at 360, 390, 430, 768, 1440, 1920 and ensure numbering reads 01–08 across chapters.
3. Audit Contact prefill (two services), hydration, focus, reduced-motion/Lite, Save-Data and keyboard Finder.
4. Verify true LCP element and image priority in staging before modifying eager/lazy flags.
5. Research actual local DJ/sound/lighting search intents without invented metrics; document only verified service area.
6. Inspect PR #19 conflict and main CI/CD deployment settings; do not merge without backup/tag and separate publication approval where needed.

## 2026-11-13 — V72 / Divide et Impera: hero motion
- Area: hero stage decoration (after V71 route restoration). Added CSS Lite/reduced-motion gate for animated beams, rings, pointer and image transitions; real hero image remains. New source-level Vitest guard. No packages or external media.
- Rotation matrix: hero = V72 pending browser verification; photographs = V70; next = navigation/mobile menu keyboard and Escape, then CTA, films, Contact, SEO.
- V71 PR #65 reported mergeable=true but exact-head PR workflow query returned zero runs, **not** CI success. PR #19 mergeable=false. No TypeScript/SSR/Chromium run confirmed; no main merge or deployment.
