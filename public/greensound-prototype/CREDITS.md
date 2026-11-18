# Green Sound Music — credits, assets, and preview notes

## Template origin and license
This Green Sound Music **prototype** is derived from **Sillage — Creative Agency & Production House**, designed by 8B.
- Original author: [8B](https://8b.com/templates/sillage/)
- Source: https://github.com/8bsite/creative-agency-website-template
- License: MIT; see [LICENSE-8B.txt](./LICENSE-8B.txt). Copyright (c) 2026 8B.
- Original animation structure (section/scene data attributes) is preserved. Original template's demo clients, staff, projects and addresses are removed.
- The upstream design credit remains visibly in the footer, even though MIT doesn't require a visible credit.

## Green Sound brand material
Content and service descriptions from the existing official website https://greensoundmusic.com/.
Photographs refer to the Green Sound media assets already in the owner's existing React repository. Each image has a YouTube thumbnail fallback from the channel/videos already referenced by the owner's code, because the Lovable-hosted asset URLs may not be accessible from a standalone preview elsewhere.

### Known media caveat
The prototype uses the owner project asset URLs under `green-sound-music-garden.lovable.app/__l5e/assets-v1/...`; verify each image actually loads before publishing anywhere. When hosted separately, use licensed, exported original photos instead of relying on temporary asset URLs.
The YouTube video player loads **only after user clicks Showreel**, through youtube-nocookie.com. YouTube and each embedded video's rights remain with their owners and are not granted by MIT.

## Fonts
The upstream template bundles links to Google Fonts (Instrument Sans and Mozilla Headline). Fonts have their own Open Font License terms; not part of the MIT template code license.

## Preview vs production
This standalone HTML file is an experiment, **not** a production replacement for the TanStack Start application and not a live deploy of greensoundmusic.com. Features still requiring verification: responsiveness, image delivery, script console, scroll interactions and accessibility in browsers.
The source favicon `../favicon.png` is the existing file from the owner's repository; verify it visually matches the old live brand favicon before public rollout.

## V18 — Open-source icon set and optional generative stage demo
- Twelve Tabler Icons SVG assets are copied into `assets/icons/` from [tabler/tabler-icons](https://github.com/tabler/tabler-icons), licensed under **MIT**, copyright (c) 2020–2026 Paweł Kuna; preserve `assets/icons/LICENSE-TABLER-MIT.txt`.
- The layered moving-beam / fog / laser effects in `assets/v18.css` are original site-specific styling inspired by theatrical stage design. No GSAP, Three.js, library background videos, or external animation code copied.
- `assets/v18.js` synthesizes an original, low-volume **demo** drum/bass groove in the visitor's browser **only after they press SUNET ON**. It is not a Green Sound Music recording, song or third-party track, and never autoplays. Party Mode alone is visual and silent.
- The licensed SVGs, original CSS and generative demo stay in this prototype on the review branch; no changes on production main.
- Detailed research and source references: `../../docs/GREEN_SOUND_V18_STAGE_AND_ICONS_RESEARCH.md`.
