# Green Sound Music — website

React 19 · TypeScript · TanStack Start · Vite · Nitro. Existing site, no invented API, payment or booking backend. The Contact form validates and prepares a local message; the visitor sends it explicitly via WhatsApp or email.

## 1. Run locally (Windows / macOS / Linux)
Install Git and a current Node.js LTS version. The project CI installs dependencies using Bun; use the existing lockfile rather than regenerating dependencies.
```bash
git clone https://github.com/WazzupDoc/green-sound-music-garden.git
cd green-sound-music-garden
git switch design/v302-reference-iconography
bun install --frozen-lockfile
bun run dev
```
Open the localhost URL printed by Vite. Never put secrets in VITE_* variables (they are public in the client bundle). Leave VITE_SITE_ENV unset for preview builds; previews use noindex. The draft candidate is not the public website.

## 2. Quality checks
```bash
bun run typecheck
bun run test
bun run build
bun run lint
```
Use the existing GitHub Actions quality workflow for the actual Chromium/SSR/sitemap/internal-link/gzip checks. Local lint has not been certified for this candidate. Review every error; do not disable tests. The browser audit uses the app at localhost:4175 (see workflow setup).

## 3. Edit content
- src/data/site.ts: business facts, service and event catalogue, real images and film details.
- src/components/atelier/ConceptHomeV170.tsx + ProductionIndex.tsx: the four homepage sections; home-rebuild-v297.css for its scoped design.
- src/routes/: shared routes and detail routes. ServicePage and ServiceSignature render catalogue details.
- src/lib/seo.ts and public/sitemap.xml: canonical URLs, accurate structured data and actual pages.
- src/routes/confidentialitate.tsx: legal information, to be completed by operator before publication.
- ASSETS.md: provenance. Use authorized original media only; do not add third-party scripts or replace actual event photos with AI-generated images.

## 4. Prepare hosting — no publication yet
Vite config uses @lovable.dev/vite-tanstack-config and Nitro with a Cloudflare default target. Do not treat this SSR project as a static-only website or upload just a dist folder. The actual connected hosting and auto-deployment settings have not been independently confirmed.
If the existing Lovable project is the hosting provider, inspect the Git synchronization branch and preview, confirm deployment configuration in the owner dashboard, and follow https://docs.lovable.dev/features/publish. Lovable's documented manual publishing flow is not evidence that this specific repository has no other automatic deployment integrations. Do not change main before checking. No new hosting plan, cost, DNS or domain changes without approval.
Production canonical domain in source: https://greensoundmusic.com. Production build must explicitly opt in to indexing with VITE_SITE_ENV=production, only for the intended production host. Do not use production indexing for staging. Verify HTTPS, certificate, www/non-www redirect, canonical redirects and real 404; retain legacy links. Verify domain ownership and DNS settings with the owner before changing anything.
Before publishing, fill in legal operator name, CUI, lawful bases, data recipients and retention; review third-party thumbnail and video requests, verify business facts/coverage, all original media rights, and the actual live contact details. If the owner wants automatic submission, it is a separate server-side implementation with explicit approval; do not claim that it exists.

## 5. Release and rollback — execute only after owner authorization
1. Exact candidate head: all required CI green, real screenshots reviewed on six widths, no merge conflicts, owner visual acceptance and legal signoff. Confirm target branch and auto-deploy settings.
2. Record current main SHA and approved candidate SHA. Create a unique backup tag (only after release authorization), then independently verify its remote existence:
```bash
git fetch origin --tags
git rev-parse origin/main
git tag -a backup-main-YYYYMMDD-UNIQUE origin/main -m "Pre-release backup"
git push origin refs/tags/backup-main-YYYYMMDD-UNIQUE
git ls-remote --tags origin refs/tags/backup-main-YYYYMMDD-UNIQUE
```
The example tag must be replaced with a unique value; do not run it as a literal. Do not force push or rewrite history. Merge only the approved PR with the correct target; #340 is currently stacked on a design branch, not main. Validate the entire target integration before any release. If main triggers production, separate explicit publication approval is mandatory.
3. Deploy the validated SSR output using the verified provider, only with approval. Inspect home, services, events, portfolio, About, Contact, privacy, actual 404, sitemap and robots on production, both desktop and phone. Confirm CTA handoff without sending test messages to real recipients, no browser errors, no broken images, no preview noindex on production, and no indexing of preview.
4. Rollback: use provider's verified previous deployment restore feature if available, or create a reviewable revert PR on the release branch. Never reset shared main or force push. Rebuild and test the rollback, re-publish only with approval. Retain the backup tag and release log. Backup and rollback have NOT been executed or tested yet.

## Current status
Draft PR #340. No main modifications or deployment. Visual acceptance, exact-head CI, security/hosting verification, owner data and release approval remain gates. See AGENT_STATE.md and docs/CURRENT_DEVELOPMENT_VERSION.md for evidence and outstanding items.
