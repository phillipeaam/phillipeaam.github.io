# Project Media Contract

## Static visual

- Project cards and case heroes render the record's selected static media source without waiting for animation.
- The source must exist in the current public asset tree and accurately represent the project.
- The static visual remains displayed until an animation is ready, when a non-autoplay interaction ends, if loading/decode fails, and whenever reduced motion suppresses animation.
- The declared per-record behavior controls when `previewSrc` is requested: near-viewport loading when `autoplayPreview` is true; hover or keyboard focus when it is false or omitted.

## Animated preview activation

- For `autoplayPreview: true`, request the animation when the preview enters the existing 75%-viewport margin.
- For `autoplayPreview: false` or omission, request the animation on hover or keyboard focus of the project link; return to the static image when the interaction ends.
- Request only that media entry's `previewSrc`; keep the static image visible until valid content is ready.
- Reduced-motion preference keeps the static image and suppresses animated preview requests in both modes.
- A failed request/decode returns to the static visual and does not repeatedly retry.
- If no `previewSrc` exists, no animation request is made.

## Descriptions and sizing

- `alt` describes informative static content. `previewAlt` describes animated content when meaning differs.
- Decorative visuals use empty alternative text only when adjacent content conveys the same information.
- Explicit intrinsic dimensions or a documented default reserve space and preserve the current image fit.
- Case-specific descriptions, captions, and fit may vary, but source paths and preview behavior come from the canonical project media.

## Local asset integrity

- Every local media path beginning with `/projects/` or `/images/` resolves to a file beneath `public/` on the current branch.
- Image conversion or renaming updates the canonical record, including any nested `caseStudy` story media that references the asset.
- Representative route review must show no local-media HTTP 404s.
