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
