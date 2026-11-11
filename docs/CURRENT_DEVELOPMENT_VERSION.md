# Green Sound Music — current development version

Updated: 2026-11-11

## Current source of truth

- **Latest development branch:** `design/crafted-atmospheres-v23-storyboard`
- **Latest review:** https://github.com/WazzupDoc/green-sound-music-garden/pull/8
- **Base:** `design/crafted-atmospheres-v22-soundcheck` (PR #7); the V23 branch includes all V22 changes.
- **Production:** `main` and https://greensoundmusic.com/ remain unchanged. This development branch is NOT deployed.

Do not keep working from V20, V21, or V22 if the task is to evolve the current design; first inspect the latest review/branch. When a newer reviewed branch is created, update this document in that branch.

### What is actually implemented

V20 brings modular React design and authentic first-party event assets. V21 adds the real showreel, lighting controls and native quick brief. V22 adds an interactive Soundcheck event-services configurator with validated `/contact` prefill. **V23 adds an event-specific storyboard** based on real `events[].moments` data, plus a one-click inclusion of any missing service that appears in an event moment. The responsive Soundcheck review panel avoids position:sticky on short-height screens.

### Preview current code in GitHub Codespaces

```bash
git fetch origin
git switch design/crafted-atmospheres-v23-storyboard
git pull origin design/crafted-atmospheres-v23-storyboard
npm install --no-package-lock
npm run dev -- --host 0.0.0.0 --port 4175
```

Open forwarded port 4175 at `/`. Do not use the old static prototype port 4173.

### Verification & promotion gates

V22 already passed CI: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43015864667 .

V23 has new CI checks with six-width browser regression and TypeScript/build/test checks. Verify GitHub Actions completes successfully before claiming V23 is validated.

V23 is stacked on V22 for review. This does not mean it has been merged to `main`. Only promote changes to the public website after the owner approves and relevant technical, accessibility, content and hosting checks have been performed.

## Next iteration rule

Start from the latest working development branch, make one coherent improvement, verify it, and create a new draft review. Avoid replacing real business media with stock images, inventing business facts, or merging/publishing without approval.
