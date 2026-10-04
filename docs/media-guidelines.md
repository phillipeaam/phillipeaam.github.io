# Project Media Guidelines

Use these rules when adding project imagery or replacing an existing project
asset.

## Static assets

- Use WebP for static project images introduced or replaced under this
  convention. This is a scoped media rule; it does not require converting the
  existing image library.
- Keep descriptive, project-specific filenames. Use `*-poster.webp` for a
  project identity image and `*-first-frame.webp` for a GIF fallback. Keep
  screenshots named for the screen or context they depict.
- Preserve the image's intended crop and aspect ratio. Set the media record's
  intrinsic dimensions and `cover` or `contain` fit to match the actual source
  and its presentation context.

## GIF previews and static fallbacks

- Every GIF used as project media MUST have a static WebP fallback made from
  that GIF's opening frame. Do not substitute a portrait, poster, or image from
  another project for the first-frame fallback.
- Extract the first displayed frame with an image tool that preserves GIF frame
  compositing, then encode it as WebP. Name it `<project>-first-frame.webp`.
- Compare the output beside the GIF before wiring it in. Confirm project
  identity, opening content, full canvas, crop, and pixel dimensions. Record
  any deliberate difference in the change review.
- Keep the GIF as the animated source. The static fallback is the initial and
  reduced-motion image and remains visible while the GIF loads or if it fails.
  Reveal the animation only after it has loaded successfully and is ready to
  display. If the visitor enables reduced motion, show the fallback.
- Write alternative text that describes the visible fallback. If the animation
  has distinct content that needs a separate description, ensure only the
  currently visible layer is exposed to assistive technology.

## Updating references

1. Add the static asset and, when applicable, its matching first-frame WebP.
2. Update every project record, case study, navigation element, and shared
   component that consumes a replaced asset.
3. Search the repository for the old path and verify that every active
   reference resolves to the intended replacement.
4. Remove a replaced source only after the reference audit. Leave unrelated or
   unreferenced assets for a separately scoped cleanup.
5. Run the project's checks and review the affected contexts at desktop, tablet,
   and mobile widths. Also review reduced-motion, loading, failure, and
   no-JavaScript behavior for GIF media.
