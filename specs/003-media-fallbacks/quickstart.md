# Quickstart: Reliable Animated Media Fallbacks

## Prerequisites

- Node dependencies are installed for the repository.
- Run commands from the repository root.
- Use the four animated projects in scope: Learn With Ello, Read With Ello,
  Pathless, and Wallace’s Quest.

## Automated project checks

```powershell
git diff --check
npm run check
npm run build
```

Expected: `git diff --check` reports no whitespace errors, Astro diagnostics and
the production build complete successfully, and all selected static and
animated asset paths are present in the generated site.

## Media behavior review

1. Open the Home project previews, archive media, and case-study heroes at
   desktop, tablet, and mobile widths. Confirm the displayed fallback belongs
   to the matching project and preserves the existing crop and layout.
2. Enable the operating system/browser reduced-motion preference and reload.
   Confirm every in-scope animation remains on its matching static first frame.
3. With motion allowed, use browser developer tools to throttle the network.
   Trigger autoplay/hover/focus previews and confirm the static fallback remains
   visible until GIF content is ready. Confirm an unsuccessful GIF request
   leaves the fallback visible.
4. While a GIF is loading or playing, toggle reduced motion. Confirm the static
   fallback becomes visible and the pending load cannot reveal animation while
   reduced motion is active.
5. Disable JavaScript and reload. Confirm the static first-frame asset remains
   present and any enclosing project link remains usable.
6. Review the image alternatives, intrinsic dimensions, and fit behavior for
   each changed context. Confirm selected WebP assets load and no removed PNG
   replacement remains referenced.

Record only the viewport sizes and browser/device combinations actually
reviewed, consistent with the project constitution.

## Scroll performance assessment

Use Chrome on one device with a stable power mode. Keep the browser version,
viewport size, device pixel ratio, display refresh rate, normal-motion setting,
DevTools state, and scroll input consistent across routes. Do not change CPU or
network throttling between the paired recordings. Record the actual values; do
not substitute the monitor's maximum refresh rate for the rate observed during
the session.

Review every generated page route that contains page content:

1. `/`
2. `/projects/`
3. `/featured/ilhas-do-alfabeto/`
4. `/featured/wallaces-quest/`
5. `/featured/read-with-ello/`
6. `/featured/craque-da-fluencia/`

While recording `/`, scroll through the Experience section at `/#experience`.
The build also emits a redirect document at `/experience/`; it redirects to
that Home section, so assess it during the Home scroll rather than as a separate
content route.

For each route, use Chrome DevTools **Performance** to record one representative
scroll from the top through the page. Inspect the **Frames** track for dropped
or partially presented frames and keep the trace or a screenshot with the route
and environment details. Record the total dropped-frame count and, separately,
the count of partially presented frames for each route. The Rendering panel's
**Frame Rendering Stats** overlay can show live FPS and dropped frames. The Rendering panel's **Scrolling
Performance Issues** option flags certain potentially costly scroll handlers;
it is a diagnostic aid and does not establish the cause of a frame drop by
itself. Performance Monitor can help correlate CPU activity and layout/style
work.

If a route shows dropped frames, repeat the same scroll three times with
previews allowed and three times with preview GIF requests blocked. Start every
attempt from a fresh page load so GIFs from the previous condition cannot keep
playing:

1. In DevTools **More tools > Network request blocking** (or **Request
   conditions**), turn blocking off for the allowed condition. Reload the route
   with DevTools open and confirm the preview GIF requests load in Network.
2. For the blocked condition, add a pattern matching the preview GIFs, such as
   `*gameplay-preview.gif`, and enable it **before** reloading the route. Confirm
   the Network panel shows the preview GIF requests blocked. The static WebP
   fallback should remain visible.
3. Use the same reload, settle time, scroll input, viewport, and settings for
   every recording. Record each scroll in Performance after page load. Keep the
   Network panel and request-blocking state consistent except for the GIF
   block, and note whether the condition behaved as intended.

If no route's baseline shows dropped frames, record the decision to make no
performance change in `specs/003-media-fallbacks/tasks.md`; no GIF-blocked
comparison is needed.

Record the dropped-frame count for each of the six traces in a table, along
with whether GIFs were allowed or blocked and whether Network confirmed that
condition. Compare the three counts in each condition and then make an explicit
decision in `specs/003-media-fallbacks/tasks.md`:

| Condition | Run | Network confirmed? | Dropped frames | Trace/screenshot |
|---|---:|---|---:|---|
| GIFs allowed | 1 | | | |
| GIFs allowed | 2 | | | |
| GIFs allowed | 3 | | | |
| GIFs blocked | 1 | | | |
| GIFs blocked | 2 | | | |
| GIFs blocked | 3 | | | |

- **Implement a media-specific change** if the repeated recordings support
  GIFs as a contributor.
- **Make no performance change** if the counts do not show a repeatable
  difference between conditions.
- **Investigate separately** if results vary too much to support either
  conclusion or point to a cause outside this feature.

Record a short rationale with the counts. Do not add general site performance
work to this feature without evidence that project media is responsible.

If the decision is to implement a change, make the smallest media-specific
change that reduces offscreen GIF work. Repeat the paired recordings and record
the dropped-frame counts again. Check the existing media scenarios above,
including reduced motion, loading fallbacks, and previews when visible. Record
the decision, rationale, traces/screenshots, and before/after counts in
`specs/003-media-fallbacks/tasks.md`.

For future changes that affect scrolling, animation, or media scheduling, also
follow [`docs/performance-guidelines.md`](../../docs/performance-guidelines.md).
Record frame presentation separately from network transfer and image decode;
frame sampling alone must not be used to attribute a cause.

### Validate deferred autoplay requests

1. With normal motion and browser cache disabled, load `/` and `/projects/`
   without scrolling. In Network, confirm that autoplay GIFs whose media areas
   are outside the configured near-viewport range have not been requested.
   Record request counts and encoded body bytes against the baseline in
   `evidence/scroll-diagnostics/network.json`.
2. Scroll each page toward its media areas. Confirm each GIF request starts as
   the area approaches the viewport, the matching WebP remains visible while
   it loads/decodes, and the GIF replaces it only after readiness. Complete a
   full scroll to confirm all intended autoplay previews can still play.
3. Enable reduced motion and reload. Confirm autoplay GIFs are not requested
   and the WebP remains visible. Check the existing hover and keyboard-focus
   preview triggers on interactive cards.
4. Repeat three visible-tab Wallace's Quest scroll recordings with GIFs allowed
   and three with GIF requests blocked. Record dropped/partially presented
   frames. Treat these as frame evidence; no FPS gain is assumed from byte
   savings alone.

References: [Chrome Rendering performance tools](https://developer.chrome.com/docs/devtools/rendering/performance),
[Chrome Performance panel reference](https://developer.chrome.com/docs/devtools/performance/reference),
[Chrome Performance Monitor](https://developer.chrome.com/docs/devtools/performance-monitor),
and [Chrome Request conditions](https://developer.chrome.com/docs/devtools/request-conditions).

## Human review checkpoint

Before treating the visual media or constitution changes as approved for merge
or push, request and record human review of the changed media, responsive
presentation, reduced-motion behavior, and constitution amendment.
