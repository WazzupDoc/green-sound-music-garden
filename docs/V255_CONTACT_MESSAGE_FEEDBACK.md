# V255 — Contact message length feedback (2026-11-19)

Scope: Contact only. The optional message textarea already has a 1500-character native limit and Zod limit (V253/V254). Show the current count directly below the textarea and connect it via aria-describedby. The count uses React Hook Form useWatch, not local duplicate state. No new dependency, media, backend, email sending or homepage changes.

Visual difference expected: a quiet single-line count below the message field, updating while typing. Do not claim visually accepted until matched Chromium 390/1440 screenshots are captured. A source-level Vitest regression is added, but not yet executed. TypeScript, SSR build, Vitest, six-width Chromium, clipboard accept/deny and CI exact-head are pending; do not merge or publish.

Research context: MDN textarea maxlength https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea ; WAI form instructions https://www.w3.org/WAI/tutorials/forms/instructions/ . These are documentation references, not copied code. No new third-party assets or licensed dependencies.

Rollback: revert commits on this draft branch. Main unchanged. Next rotation: Events detail layout and media provenance, with real before/after screenshots.
