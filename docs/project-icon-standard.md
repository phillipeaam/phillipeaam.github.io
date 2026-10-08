# Compact Project Identity Icon Standard

This standard defines the small project identity image beside a title in the All Projects catalog and, when applicable, in the Home Featured grid. Use the same approved asset on both surfaces so a project keeps one visual identity.

## Asset contract

- Store the canonical path in `ProjectRecord.projectsIndexTitleIcon`; do not create a separate Home/Featured icon path when the same identity is used.
- Use a square, optimized WebP derivative at **104 × 104 px** for the **52 × 52 CSS-pixel** display. The 2× source stays crisp on high-density screens while remaining compact. Keep the established 52px slot, border, 10px radius, and 14px title gap unless a separately approved design change updates the catalog contract.
- Name the derivative `<project-slug>-icon.webp` in that project's `public/projects/<folder>/` directory.
- Keep the original poster, cover, or source artwork unchanged. The icon is a derivative for this small identity slot, not a replacement for primary media or a case-study image.
- Optimize for legibility at the actual 52px size. Use a square crop that preserves the recognizable subject, palette, and silhouette. Center the focal subject optically; mathematical centering alone is insufficient. Inspect at rendered size and adjust the crop if the subject appears off-center.
- For company/product artwork, preserve the supplied identity and character design. Limit the derivative to crop, scale, and encoding unless an explicitly approved source/direction authorizes redesign.
- For independent/personal game artwork, a simplified icon may be derived from approved artwork when it improves recognition at 52px. Keep the project's identity and add no unsupported marks or copy.
- Only use sources approved for the relevant project and destination. `catalogIconReuseApproved` is scoped to that record's exact identity icon; it does not establish independent copyright ownership or approve unrelated media.
- If an icon is absent or not approved, omit it without reserving an empty slot. The visible project title remains the accessible identity; a redundant icon is decorative and must not announce the title a second time.

## Adding an icon

1. Confirm the source and permitted use. Record the exact canonical path and approval in the project record; do not infer permission from a file merely existing in the repository.
2. Create a square derivative without overwriting source art. Preserve company/product artwork; simplify personal game art only when the result remains faithful.
3. Export an optimized 104 × 104 WebP named `<project-slug>-icon.webp` and set `projectsIndexTitleIcon` to its public path. Scope `catalogIconReuseApproved` to this icon.
4. Inspect at 52 × 52 CSS px: the subject is optically centered, unclipped, recognizable, and consistent with approved project identity.
5. Verify the rendered catalog entry and, when applicable, Featured at representative desktop/mobile widths. Confirm the same asset is used, it loads, layout remains intact, and a missing/unapproved icon leaves no blank space.
6. If this contract changes, update the project record guide and feature documentation. Record route, viewport, and method before marking a visual check complete.

## Current reference set

The first approved set uses this contract for Wallace Quest, Pathless, Pandora, Diggy, Read With Ello, and Ello 2.0. The Read With Ello crop was optically re-centered after review at 52px. These are examples, not a requirement that every record have an icon.