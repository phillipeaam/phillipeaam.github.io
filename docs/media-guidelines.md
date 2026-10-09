# Project Media Guidelines

Use these rules when adding project imagery or replacing an existing project
asset.

## Static assets

- Use WebP for static project images introduced or replaced under this
  convention. This scoped rule does not require converting the existing image
  library.
- Use descriptive, project-specific filenames. Use `*-poster.webp` for a
  project identity image and `*-first-frame.webp` for an animated preview
  fallback. Name screenshots for the screen or context they show.
- Preserve the intended crop and aspect ratio. Set the media record's intrinsic
  dimensions and `cover` or `contain` fit to match the source and presentation.

## Animated previews and static fallbacks

- Every animated project preview MUST have a static WebP fallback made from its
  opening frame. Do not substitute a portrait, poster, or another project's
  image for this fallback.
- Extract the first displayed frame with an image tool that preserves animation
  frame compositing, then encode it as WebP. Name it
  `<project>-first-frame.webp`. Prefer animated WebP for new looping previews;
  use GIF only when a platform or workflow requires it.
- Compare the fallback beside the animation before wiring it in. Confirm project
  identity, opening content, full canvas, crop, and pixel dimensions. Record
  deliberate differences in the change review.
- Show the static fallback initially, during reduced motion, while animation
  loads, and if it fails. Reveal animation only after it loads successfully and
  is ready.
- Write alternative text for the visible content. If animation adds distinct
  meaning, describe it separately and expose only the currently visible layer
  to assistive technology.

## Updating references

1. Add the static asset and, when needed, its matching first-frame WebP.
2. Update every project record, case study, navigation element, and shared
   component that uses a replaced asset.
3. Search the repository for the old path and verify that each active reference
   resolves to the intended replacement.
4. Remove a replaced source only after the reference audit. Leave unrelated or
   unreferenced assets for a separately scoped cleanup.
5. Run the project's checks and review affected contexts at desktop, tablet,
   and mobile widths. Review reduced-motion, loading, failure, and no-JavaScript
   behavior for animated media.
