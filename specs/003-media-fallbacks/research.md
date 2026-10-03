# Research: Reliable Animated Media Fallbacks

## Decision: Keep fallback and animation as separate presentation states

**Rationale**: `src/components/ProjectMediaPreview.astro` currently changes the
`src` on one visible image. Once it is changed to a GIF, the poster no longer
provides pixels while the new request is loading. The `showAnimatedDirectly`
path renders the GIF as the initial source and uses the poster only through a
reduced-motion `<source>`, so it has the same initial-load gap for visitors who
allow motion.

Render the static image first. Request the GIF separately only when the existing
autoplay, pointer, or keyboard-focus behavior requests it and motion is allowed.
Reveal it only after successful readiness; keep the static image on error or
reduced motion. When motion preference changes during loading, the GIF must not
be revealed while reduced motion is active. If scripting is unavailable, the
static image remains rendered and usable.

**Alternatives considered**:

- Assign the GIF URL directly to the visible poster image. Rejected because the
  previous image is replaced before the GIF is ready.
- Rely only on `<picture>` with a reduced-motion source. Rejected because that
  selects a source for the preference but does not preserve the poster while a
  permitted GIF is loading.
- Add a separate image-loading dependency. Rejected because browser image
  elements expose loading, error, dimensions, and decoding behavior needed here.

The browser documentation describes `HTMLImageElement.decode()` as resolving
when image data is decoded and safe to render; the same API can be used as a
readiness aid before revealing a separately loaded image. Its error cases
include failed requests and changed image requests. See [MDN:
`HTMLImageElement.decode()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode).
The `complete` property alone is insufficient as a success signal because MDN
states it is also true when an image request failed; confirm valid dimensions or
successful loading as well. See [MDN:
`HTMLImageElement.complete`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/complete).

## Decision: Cherry-pick the scoped media changes, not the whole historical commit

**Rationale**: The supplied commit changes 21 binary paths (12 new WebP assets
and 9 PNG removals) plus `Navigation.astro`, `SupportingProject.astro`, `cases.ts`,
and `projects.ts`. The current code still points to the old PNG names in those
files, and the historical component assumptions need adaptation to the current
shared preview component.

Assets to reuse from `d10b31a0d5eefbbc5dfd1a58d65c474513af3842`:

- Avatar: `public/images/identity/phillipe-augusto-avatar.webp`.
- Learn With Ello: `ello-learn-poster.webp` and `ello-learn-first-frame.webp`.
- Read With Ello: `read-with-ello-poster.webp`, `read-with-ello-first-frame.webp`,
  `read-with-ello-quest.webp`, `read-with-ello-quest-mobile.webp`, and
  `read-with-ello-mobile-library.webp`.
- Pathless: `pathless-poster.webp` and `pathless-first-frame.webp`.
- Wallace’s Quest: `wallace-quest-poster.webp` and
  `wallace-quest-first-frame.webp`.

The commit removes matching PNG replacements for these assets. It also removes
`read-with-ello-book.png` without providing a replacement. A repository search
found no current source reference; at the user's request, remove that historical
orphan as part of this feature. Existing GIF files are unchanged.

## Decision: Keep current media metadata and shared UI boundaries

**Rationale**: `src/data/projects.ts` already represents media with static `src`,
optional animated `previewSrc`, descriptions, autoplay choice, and display
dimensions/fit. `src/data/cases.ts` has static media fields and case-study GIF
hero records. `ProjectMediaPreview.astro` is consumed by project cards and
records, `CaseHero.astro`, and other shared presentation components. Keep these
boundaries; clarify the static-fallback role of `src` and remove or normalize
the `showAnimatedDirectly` exceptional route only after auditing its call sites.

## Decision: Make media conventions durable in project documentation

**Rationale**: The approved clarification assigns the general fallback and
reduced-motion principle to the constitution, while WebP and first-frame
preparation belong in `docs/media-guidelines.md`. The existing constitution
Principle IV already requires reduced-motion support; the separate constitution
workflow should expand it only enough to cover accurate static fallbacks.

## Repository Evidence

- Project scripts: `npm run check` invokes `astro check`; `npm run build`
  produces the static site build.
- Existing component: `src/components/ProjectMediaPreview.astro` owns preview
  triggers and motion preference handling.
- Existing media metadata: `src/data/projects.ts`, `src/data/cases.ts`.
- Relevant styles: `src/styles/global.css` positions media images absolutely
  and defines cover/contain behavior.
- Source references: current PNG paths appear in `Navigation.astro`,
  `projects.ts`, and `cases.ts`; the implementation must audit all references
  before deleting those files.

## First-frame asset review

The four supplied WebP first frames were opened beside their corresponding GIFs
and visually checked for project identity, opening content, crop, and dimensions
before their use as fallbacks:

| Project | WebP / GIF dimensions | Visual comparison |
|---|---:|---|
| Learn With Ello | 760 × 428 / 760 × 428 | Matching snowy learning activity, mascot, and opening composition; no crop change. |
| Read With Ello | 1280 × 720 / 1280 × 720 | Matching Wisp quest screen and opening composition; no crop change. |
| Pathless | 1280 × 720 / 1280 × 720 | Matching rescue gameplay, radio HUD, and opening composition; no crop change. |
| Wallace’s Quest | 2560 × 1440 / 2560 × 1440 | Matching turn-based combat and opening composition; no crop change. |

All four WebPs preserve their GIF canvas dimensions. Existing media presentation
dimensions and `contain`/`cover` choices remain in the data records.

## Implementation adaptation

The current `SupportingProject.astro` has no Pathless asset path to replace: both
render branches take the primary media from the project record. Updating the
Pathless media and identity references in `src/data/projects.ts` therefore
covers both branches without adding a component-specific path or duplicate
configuration. The historical component change is not copied.

## Scroll performance hypothesis and measurement method

Source inspection found that `src/components/ProjectMediaPreview.astro` sets
`requested` from `data-autoplay-preview` and calls `loadAnimation()` during
initialization. It does not wait for the media area to enter the viewport or
stop requesting an autoplay GIF after that area leaves it. The four in-scope
GIF files total 35,989,613 bytes (about 36.0 MB decimal) across the repository:

| Project | GIF file | Bytes |
|---|---|---:|
| Learn With Ello | `ello-learn-gameplay-preview.gif` | 1,561,055 |
| Read With Ello | `read-with-ello-gameplay-preview.gif` | 7,460,449 |
| Pathless | `pathless-gameplay-preview.gif` | 15,504,607 |
| Wallace’s Quest | `wallace-quest-gameplay-preview.gif` | 11,463,502 |

The file sizes alone establish a plausible workload, not a frame-rate problem.
Follow the route-by-route procedure in [quickstart.md](quickstart.md); use the
Frames track to inspect presented, partially presented, and dropped frames,
and use Request conditions to compare with preview GIF URLs blocked. Chrome
documents these tools in [Rendering performance](https://developer.chrome.com/docs/devtools/rendering/performance),
[Performance panel reference](https://developer.chrome.com/docs/devtools/performance/reference),
[Performance Monitor](https://developer.chrome.com/docs/devtools/performance-monitor),
and [Request conditions](https://developer.chrome.com/docs/devtools/request-conditions).

## Supplemental browser diagnostics (2026-10-03)

The six routes were captured in a separate, maximized Chrome 154 window at
2005 × 953 CSS pixels, DPR 1, observed 60 Hz, normal motion, and no CPU or
network throttling. Each visible route received a programmatic
`window.scrollTo({ behavior: "smooth" })` from top to bottom through CDP.
The per-route trace summaries are in
`evidence/scroll-diagnostics/index.json`; fresh-cache-disabled GIF byte counts
are in `evidence/scroll-diagnostics/network.json`.

In these supplemental traces, no renderer-main-thread `RunTask` exceeded the
16.7 ms 60 Hz frame interval or 50 ms on any route. Home had two renderer main
tasks over 8 ms (maximum 13.9 ms); the other five routes had none. Recorded
style, layout, and paint activity was modest. The trace contains
`DroppedFrame` events on Home (3), `/projects/` (3), and Wallace's Quest (2),
but these are Chromium trace diagnostics, not the DevTools Performance Frames
track totals used for T018/T019, and should not be substituted for them.

Resource Timing with the browser cache disabled confirmed that the current
autoplay behavior requests both Home GIFs before scroll, totaling 18,923,951
encoded body bytes, and requests all four `/projects/` GIFs, totaling
35,989,613 bytes. Animated-image frame decode events appeared in worker-thread
trace data, particularly on Home and `/projects/`. This verifies transfer and
decode work, but the earlier three-run frame comparison remains a small signal
(Home and Projects had no baseline drops; Wallace had one; on Wallace, allowed
runs recorded 0/1/1 drops and blocked runs 0/0/0). The evidence supports
reducing unnecessary eager media work as an experiment, not claiming a proven
FPS improvement or a generally overloaded main thread.

The current code already defers static poster images with native lazy loading,
provides dimensions and asynchronous decoding, and avoids `will-change` and
`content-visibility`. The next scoped experiment to consider is scheduling
autoplay GIF requests only when their media area approaches the viewport. Keep
the static fallback visible until the GIF is decoded, and evaluate network
bytes/requests and presented-frame counts independently. General `content-visibility`
work is not indicated by these traces. See the reusable measurement and
rendering practice in [`docs/performance-guidelines.md`](../../docs/performance-guidelines.md).

Navigation also has a passive scroll listener throttled by
`requestAnimationFrame` that stores scroll state in session storage; this is
not currently implicated. If dropped frames remain with preview GIFs blocked,
record that project media was not established as the cause and keep general
scroll optimization out of this feature.
