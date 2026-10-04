# Performance Guidelines

Use these guidelines when a change adds work to scrolling, animation, image
loading, or other frequently updated interactions. Measure before and after a
change under the same browser, viewport, refresh rate, motion preference, and
input conditions. Record the environment and evidence with the feature.

## Measure the user-visible result

- Use Chrome DevTools Performance recordings and inspect the Frames track for
  dropped and partially presented frames. Record each separately.
- Keep the tab visible and use the same scroll path and input method (wheel,
  touch, or programmatic smooth scroll) for each comparison. Record the observed
  display refresh rate; use its frame interval as context
  (about 16.7 ms at 60 Hz, 8.3 ms at 120 Hz), not as a universal FPS target.
- Do not treat `requestAnimationFrame` callback counts as a substitute for
  presented scroll frames. Modern browsers can scroll on the compositor while
  the main thread is busy, and the reverse can also affect visual updates.
- Change one likely cause at a time. When media is suspected, repeat comparable
  captures with the media enabled and blocked, confirm the Network condition,
  and compare several runs before attributing a result.

## Find the work behind a frame

- In the Performance flame chart, inspect renderer main-thread tasks around the
  affected frames. Separate JavaScript, style recalculation, layout, paint,
  image decode, raster, and compositor work; do not add nested trace event
  durations as if they were independent costs.
- Use the Rendering panel's FPS meter, Paint flashing, and Scrolling
  Performance Issues overlays as diagnostic aids. Use Performance Monitor to
  correlate CPU, heap, DOM/listener count, layouts, and style recalculations.
  An overlay or code smell alone does not prove a user-visible regression.
- A browser trace may include compositor, GPU, and worker threads. Attribute
  long tasks to their thread before calling them main-thread blocking work.
- Preserve traces or concise per-route summaries with the feature. State the
  test limits: browser/version, device, viewport, DPR, refresh rate, power and
  throttling settings, reduced-motion state, tab visibility, and scroll method.

## Keep rendering and media work proportional

- Prefer animating `transform` and `opacity` when they meet the visual need.
  Avoid blanket `will-change`; introduce it only after profiling a specific
  animation, then check the memory and layer cost.
- Keep intrinsic image dimensions and defer offscreen static images with native
  `loading="lazy"` where appropriate. Use responsive image sources when a
  large source is measurably oversized for smaller viewports.
- The case-story narrative already has one mobile-specific `<picture>` source;
  the shared project-preview poster currently serves one source. Check mobile
  transfer sizes before creating smaller poster variants.
- For animated media, keep an accurate static fallback and avoid requesting
  large previews before they are needed. Test visible, offscreen, failure, and
  reduced-motion behavior after changing scheduling.
- Consider `content-visibility: auto` for sizeable offscreen sections only
  after traces show substantial style/layout/paint work. Reserve a suitable
  intrinsic size and review scroll geometry, focus, selection, accessibility,
  and DOM measurements that could force rendering.
- Avoid optimizing small measured costs just because a best-practice article
  names them. Keep the smallest change that improves the repeated user-visible
  result without harming accessibility or media behavior.

## Current portfolio observation (2026-10-03)

The supporting evidence is in
[`specs/003-media-fallbacks/evidence/scroll-diagnostics/`](../specs/003-media-fallbacks/evidence/scroll-diagnostics/)
and the controlled frame-count comparison is in
[`specs/003-media-fallbacks/tasks.md`](../specs/003-media-fallbacks/tasks.md).
On an unthrottled desktop Chrome 154 run at 2005 × 953 CSS pixels and 60 Hz,
none of the six routes produced a renderer-main-thread `RunTask` above 16.7 ms
or 50 ms during the captured scroll. This does not prove smoothness on slower
devices, other browsers, or touch input, and the supplemental trace's internal
`DroppedFrame` events are not interchangeable with the Performance panel's
frame counts.

Network evidence showed avoidable eager work: the Home page requested two
autoplay GIFs before scrolling (18,923,951 encoded body bytes with cache
disabled); `/projects/` requested four (35,989,613 bytes). A shared
`IntersectionObserver` now defers autoplay requests until their media areas
enter a prefetch range 75% of a viewport height tall. On the same cache-disabled
desktop setup, a no-scroll Home load requested one GIF (11,463,502 bytes),
avoiding 7,460,449 bytes (39.4%). `/projects/` requested two GIFs (9,021,504
bytes), avoiding 26,968,109 bytes (74.9%). Full scrolling loaded every intended
preview; reduced-motion loads requested zero autoplay GIFs. The evidence and
limits are recorded in `specs/003-media-fallbacks/tasks.md` and its
`evidence/scroll-diagnostics/` directory.

After the change, three Wallace's Quest scroll traces with the GIF allowed
recorded dropped frames 0/1/2 and partially presented frames 1/2/3. Three
blocked traces recorded 0/0 in both measures. This is a small directional
signal from one route, not proof of a general FPS improvement. Keep frame
counts, image requests/bytes, and decode activity as separate outcomes.

## References

- [Chrome DevTools Performance reference](https://developer.chrome.com/docs/devtools/performance/reference)
- [Chrome DevTools Performance Monitor](https://developer.chrome.com/docs/devtools/performance-monitor)
- [Chrome rendering performance tools](https://developer.chrome.com/docs/devtools/rendering/performance)
- [web.dev: smoothness](https://web.dev/articles/smoothness)
- [web.dev: lazy-load images and iframes](https://web.dev/learn/performance/lazy-load-images-and-iframe-elements)
- [web.dev: content-visibility](https://web.dev/articles/content-visibility)
- [web.dev: high-performance CSS animations](https://web.dev/articles/animations-guide)
