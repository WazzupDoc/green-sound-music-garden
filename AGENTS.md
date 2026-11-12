<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## GREEN SOUND MUSIC — NON-GENERIC CREATIVE ENGINEERING RULES

These instructions apply to Codex / Claude Code / AI coding agents working on the
site. Do not delete or modify the protected Lovable block above.

### Identity and factual integrity
- Based in Pitești, Romania, active since 2008. Authenticated service data lives
  in `src/data/site.ts`; original site: https://greensoundmusic.com/.
- Real event photos/videos: use only owned or authorized local assets and already
  verified embed sources. NEVER present generated artwork as documentary event
  photos. New art assets belong in `public/creative/`, with clear separation.
- Don't fabricate client testimonials, years, equipment inventory, numbers,
  venues, technical capabilities, events, staff identities, or certifications.
- The contact form currently prepares WhatsApp/email messages, not server-side
  submissions. Preserve that honesty.

### The anti-AI-slop creative director gate
- The goal is NOT more neon, more loops or more cards. It is a visually distinctive
  event-production experience with photographic proof and memorable composition.
- Do not use repetitive symmetrical 3-card grids, purple gradients, default rounded
  UI pills, cookie-cutter 'big headline + right-side photo' on every route,
  or uniform fade-up reveals in every section.
- Every major page category MUST have independent art direction while sharing
  brand identity: Acasă = live stage/control; Servicii = photographic catalogue;
  Evenimente = cinematic five-scene story; Portofoliu = authentic photo/video;
  Despre = editorial production story; Contact = legible trustworthy invitation.
- Effects derive from actual production language (lights, cues, smoke, music,
  stage rigging). Use motion only when it enriches a narrative or communicates
  a state change.
- Do not copy protected code, imagery, animation data, or an entire visual layout
  from premium sites. Use Awwwards / Webflow / Framer for principles and references.
- For any dramatic change, take *real screenshots* at 390 and 1440 and assess
  composition with the logo hidden. A passing compile/test != excellent design.

### Engineering gate
- Preserve navigation, twenty existing routes, SEO metadata, legal caveats, search
  dialogs, keyboard lightbox, mobile CTA and prefilled quote flows.
- All new interfaces must support keyboard focus, meaningful labels, touch,
  reasonable contrast and `prefers-reduced-motion`.
- Avoid autoplay audio, fake audio-reactive animations and heavy effects on phones.
- Pause continuous effects offscreen; lazy-load below-fold media; video loads on
  user interaction. Prioritize actual LCP photos and avoid huge asset bundles.
- Keep `main` untouched. Work in a draft PR until user explicitly approves merge.
- Required local checks: `bun run typecheck`, `bun run build`,
  `bun run test`, and Playwright browser QA on widths 360/390/430/768/1024/1440.
- Review `docs/creative-audit-v60.md` for the concrete sitewide deficiencies,
  completed work and remaining limitations before editing.
