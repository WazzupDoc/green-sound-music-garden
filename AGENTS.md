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


## Green Sound Music — creative quality gates (V60)

For every visual PR, use the public MIT anti-ai-slop purpose/convergence tests as inspiration and record outcomes in docs/DESIGN_AUDIT_V60.md. Do NOT treat a successful TypeScript compile as proof of premium art direction.

- Reject repeated standard hero + 3 identical service cards + footer CTA patterns.
- Design distinct experiences for home, services, events, individual details, portfolio and contact. Keep each page's real function intact.
- Real photographs and film are evidence. Generated art belongs in clearly conceptual atmospheric layers only.
- Never invent commercial facts, equipment models, testimonials or event clients.
- Motion must correspond to stage lighting, physical camera movement, sound or atmosphere; cap continuous work, pause offscreen, honor reduced motion, prohibit auto-play audio.
- Test screenshots at 360, 390 and 1440 px before asking for visual approval. Also run CI for 430, 768 and 1024 px, keyboard focus and no horizontal overflow.
- Do not install a library unless the problem, bundle impact, license and no-dependency alternative are recorded in the research log.
- Do not scrape TikTok or other social platforms; request authorized exports or use official embeds.
- Never merge into main or publish to greensoundmusic.com without the owner's explicit approval.
