# Green Sound Music — current development version

Updated: 2026-11-11 (V25, review pending)

## Current source of truth
- **Latest development branch:** `design/crafted-atmospheres-v25-event-journal`
- **Base:** `design/crafted-atmospheres-v24-stage-stories`, draft PR #9.
- **Production:** `main` and greensoundmusic.com unchanged.
- **Verification:** CI/browser checks for V25 not yet confirmed; do not publish.

## V25 — Event-to-quote conversion
The existing event selector now includes a direct event-specific offer CTA. It carries the existing validated `event` search parameter to the contact form, preserving the selected event and reducing navigation friction. Uses existing verified event data, no invented imagery, testimonials, or business claims. Added keyboard-focusable 44px-target CTA and reduced-motion styling.

## Pending QA
- Confirm TypeScript/build and browser CI, including React hydration warnings in Contact.
- Check all event variants on narrow mobile, tablet and desktop and keyboard navigation.
- Verify all event labels are accepted by the existing contact query allowlist.
- Consider a visual portfolio lightbox only after current CTA and contact journey are verified.

## Preview
[Open V25 Codespaces](https://codespaces.new/WazzupDoc/green-sound-music-garden/tree/design/crafted-atmospheres-v25-event-journal?quickstart=1). Use forwarded port 4175; not a production deployment.

---

# Archived V24 development notes

Updated: 2026-11-11 (V24)

## Current source of truth

- **Latest development branch:** `design/crafted-atmospheres-v24-stage-stories`
- **Latest review:** https://github.com/WazzupDoc/green-sound-music-garden/pull/9
- **Base:** `design/crafted-atmospheres-v23-storyboard` (PR #8); V24 includes V23 and all earlier developments.
- **Production:** `main` and https://greensoundmusic.com/ remain unchanged. This development branch is NOT deployed.

Do not keep working from V20, V21, or V22 if the task is to evolve the current design; first inspect the latest review/branch. When a newer reviewed branch is created, update this document in that branch.

### What is actually implemented

V20 brings modular React design and authentic first-party event assets. V21 adds the real showreel, lighting controls and native quick brief. V22 adds an interactive Soundcheck event-services configurator with validated `/contact` prefill. **V23 adds an event-specific storyboard** based on real `events[].moments` data, plus a one-click inclusion of any missing service that appears in an event moment. The responsive Soundcheck review panel avoids position:sticky on short-height screens.

### Preview current code in GitHub Codespaces

```bash
git fetch origin
git switch design/crafted-atmospheres-v24-stage-stories
git pull origin design/crafted-atmospheres-v24-stage-stories
npm install --no-package-lock
npm run dev -- --host 0.0.0.0 --port 4175
```

Open forwarded port 4175 at `/`. Do not use the old static prototype port 4173.

### Verification & promotion gates

V22 already passed CI: https://github.com/WazzupDoc/green-sound-music-garden/actions/runs/43015864667 .

V24 extends six-width browser regression with visible editorial Scene Notes, switchable scene-specific content and event routes; GitHub Actions TypeScript/build/test checks are required before release. A previous V23 CI run showed a possibly intermittent React hydration warning on the contact form; keep investigating any recurrence instead of hiding warnings.

V24 is stacked on V23 for review. This does not mean it has been merged to `main`. Only promote changes to the public website after the owner approves and relevant technical, accessibility, content and hosting checks have been performed.

## Next iteration rule

Start from the latest working development branch, make one coherent improvement, verify it, and create a new draft review. Avoid replacing real business media with stock images, inventing business facts, or merging/publishing without approval.


## One-click visual preview in Codespaces

[Open / resume V24 preview workspace](https://codespaces.new/WazzupDoc/green-sound-music-garden/tree/design/crafted-atmospheres-v24-stage-stories?quickstart=1)

This links to a Codespaces workspace for the **V23 development branch**, not a production deployment. The `.devcontainer/devcontainer.json` auto-installs dependencies and starts the Vite server on forwarded port `4175`. The browser should offer to open the preview automatically. If it does not, use **PORTS → 4175 → Open in Browser**. Allow initial workspace setup to finish. Preview is private and runs only when the Codespace is active; the URL is unique per user workspace. The automated setup has not been exercised end-to-end from this chat.

Production domain `greensoundmusic.com` and `main` stay unchanged.


## V24 — Director's Scene Notes

- The three genuine Green Sound hero scenes now have distinct editorial text, event context, meaningful CTA and scene-specific video when opened intentionally.
- A high-end responsive scene card replaces the formerly decorative rotated label. It is visible on desktop, tablet and mobile rather than hiding helpful content from touch users.
- No extra JavaScript dependency, no stock visuals, no background music, and the main H1 stays stable for SEO.
- The primary hero image is available at initial paint without an entrance opacity animation, following Google's LCP guidance.

### References reviewed
- Google web.dev: https://web.dev/articles/optimize-lcp and https://web.dev/learn/design/ (critical content should not be delayed for decorative effects, layouts adapt to mobile)
- Reddit: https://www.reddit.com/r/web_design/comments/1wcj9yw/overly_animated_sites_show_a_lack_of_design_skill/ (qualitative community feedback, not a conversion study)
- Earlier V21 research: Awwwards music/luxury, original brand photos and event video provenance.

### Preview
Codespaces launches from [V24 branch](https://codespaces.new/WazzupDoc/green-sound-music-garden/tree/design/crafted-atmospheres-v24-stage-stories?quickstart=1) on forwarded port 4175; it is not an always-online production deployment.
