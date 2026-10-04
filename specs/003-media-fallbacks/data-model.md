# Data Model: Reliable Animated Media Fallbacks

This feature uses static assets and existing media metadata; it adds no
persistent application data.

## Animated Media

Represents one project visual with an optional animation preview.

| Field | Meaning | Rules |
|---|---|---|
| `src` | Static fallback shown first and when motion is reduced or animation is unavailable | Required when `previewSrc` exists; WebP for the selected replacements; for GIF media, generated from that GIF's first frame |
| `previewSrc` | Existing animated preview | Optional; remains the existing GIF source in this feature |
| `alt` | Accessible description of the static fallback | Describes the actual image and project |
| `previewAlt` | Accessible description of animated content | Optional; describes the same project and remains consistent when animation appears |
| `posterWidth` / `posterHeight` | Intrinsic layout dimensions | Preserve the intended source aspect ratio and avoid layout shift |
| `posterFit` | Existing media crop behavior | Preserve `cover` or `contain` per context |
| `autoplayPreview` | Existing automatic-preview choice | Preserve; animation still respects reduced motion |

## Presentation State

| State | Entry condition | Visible media |
|---|---|---|
| Static fallback | Initial render; reduced motion; no preview request | Project-specific fallback image |
| Animation loading | Preview requested while motion is allowed | Static fallback remains visible |
| Animation ready | GIF loaded successfully and is ready to display; motion remains allowed and preview is requested | GIF preview; its fallback remains available for the next state change |
| Animation unavailable | GIF request or decode fails | Static fallback; project navigation remains usable |

When the reduced-motion preference changes to `reduce`, presentation returns to
the static fallback even if the GIF was previously ready. If the preference
changes while loading, completion does not reveal the animation until motion is
allowed and the applicable preview trigger remains active.

## Asset Reference

An asset reference connects a path to one or more render contexts: home project
thumbnail, project archive record, case-study hero, case-study story media, or
navigation identity. A replacement is complete only when every live consumer
references an existing corresponding asset.

No database migration or serialized runtime state is required.
