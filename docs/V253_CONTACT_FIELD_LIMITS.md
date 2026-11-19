# V253 — Contact email / details length guard (2026-11-19)

Area: Contact form only. The existing Zod schema caps email at 120 and message at 1500 characters, but the native controls lacked corresponding limits. Added `maxLength={120}` to email and `maxLength={1500}` to details, preserving validation, accessible error messages and the existing manual WhatsApp/email handoff. No backend, assets, dependencies, homepage or deployment changes.

Source checked: `src/lib/quote.ts` schema and `src/components/site/QuoteForm.tsx`. Research: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength (native text input/textarea constraint). No external code copied; rejected custom JavaScript truncation and live counters (extra UI noise). Native maxlength counts UTF-16 code units, consistent with JavaScript string length used by Zod.

QA status: **not yet validated**. Requires TypeScript, SSR build, Vitest, Chromium 360/390/430/768/1440/1920, keyboard, actual clipboard granted/denied, same-viewport 390/1440 before/after screenshots, and exact-head GitHub Actions success. This is a functional change with no expected visible static screenshot difference; verify by typing beyond limits and capturing the field state. Do not merge or publish until checks complete.

Rotation matrix: Contact | existing schema/input mismatch | native input caps added | pending browser QA | next: /evenimente detail UX and media provenance. Main untouched. No new media/assets (ASSETS.md unchanged). Rollback: revert this isolated commit on the draft branch.
