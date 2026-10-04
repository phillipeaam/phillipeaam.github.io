# Media Preview Contract

## Inputs

- A required project-specific static fallback path and meaningful alternative
  text.
- An optional existing animated GIF path and corresponding description.
- Existing autoplay, intrinsic dimensions, and fit settings.
- The visitor's `prefers-reduced-motion` preference and current pointer/focus
  state where preview triggers already apply.
- Whether an autoplay media area is within the near-viewport loading range.

## Observable behavior

1. The server-rendered page contains the static fallback before client-side
   behavior runs.
2. Reduced-motion visitors see the static fallback; no animated preview is
   revealed while the preference is active.
3. When an existing autoplay, hover, or keyboard-focus trigger requests motion,
   the fallback stays visible until the GIF is successfully loaded and ready.
4. A failed or invalid GIF request leaves the fallback visible and does not
   disable its surrounding project link.
5. If reduced motion becomes active during loading or playback, the fallback is
   shown. A later load completion cannot override the active preference.
6. Only the visible media description is exposed to assistive technology; the
   overlapping inactive layer is not announced as a duplicate image.
7. Existing size, aspect ratio, `cover`/`contain` fit, captions, and preview
   triggers remain consistent with their current media context.
8. An autoplay GIF outside the near-viewport loading range is not requested
   until the area approaches. Hover or keyboard focus can request an interactive
   preview directly when reduced motion is not active.
9. If `IntersectionObserver` is unavailable, the current autoplay and explicit
   preview behavior remains available rather than leaving a permanent fallback.

## Asset contract

For every animated GIF in scope, the static fallback is a WebP generated from
that GIF's first frame. The GIF remains the animated source. All selected
replacement assets and their references must resolve in the built site.
