# Research: Hash Navigation

**Feature**: [Hash Navigation](spec.md)
**Date**: 2026-10-01
**Branch**: `fix/cross-page-anchor-scroll`

## Investigation Question

Explain why a More Projects card opens `/projects/#pathless` with a visible
archive-top frame before Pathless appears, and why the archive header `Back`
link shows Home at the top before restoring the previous Home position. Keep
the two transitions distinct and patch only after runtime and source evidence
agree.

## Root-Cause Evidence

### Cross-page hash arrival

- `src/styles/global.css` enabled browser-managed cross-document View
  Transitions globally with `@view-transition { navigation: auto; }` and gave
  the root old/new snapshots a 180 ms animation.
- Before the patch, the Pathless click changed the URL to
  `/projects/#pathless`; browser measurements already reported `scrollY` at
  the Pathless record and its heading about 16 px below the sticky header,
  while the first screenshot still showed the Professional group at the top.
  Later screenshots showed Pathless with the same `scrollY`. The discrepancy
  is evidence that the visible top frame came from the cross-document
  transition, not from a second scroll to the target.
- The same initial Home/archive-transition frame followed by the Pathless
  destination was captured in three pre-patch runs at each representative
  viewport: desktop 1280x900, tablet 768x1024, and mobile 390x844. The
  screenshot-enabled traces record each click event and frame sequence.
- `html:has(.archive-content)` sets the archive page's computed
  `scroll-behavior` to `auto`; `.archive-record` and `.archive-group` retain
  `scroll-margin-top`. At all tested widths, the target and its header offset
  were already correct. `src/data/projects.ts` supplies dimensions for the
  Pathless and other image media, and browser measurements did not show target
  geometry changing during the visible transition.
- `src/components/Navigation.astro` hash handling only updates the active
  archive navigation item; it does not call a scroll method. `BaseLayout.astro`
  uses regular links, and `astro.config.mjs` does not enable Astro client
  routing or View Transitions. The enabled transition was the native CSS
  cross-document transition in the global stylesheet.

### Header Back restoration

- Before the patch, the archive header `Back` click returned Home with the
  visual frame at the Home top while browser metrics already reflected the
  saved Home position. A later screenshot showed the More Projects area at the
  same `scrollY`.
- `Navigation.astro` sets a `sessionStorage` restoration flag on that link;
  Home reads the saved position and originally delayed `window.scrollTo` over
  two `requestAnimationFrame` callbacks. This is a separate, source-supported
  delayed restoration path.

## Minimal Change Applied

- Removed the global automatic cross-document root transition and its 180 ms
  root animation. This keeps ordinary document/hash navigation from showing a
  transition snapshot of the archive top before the native hash destination.
- Applied the saved Home scroll position synchronously when the Home
  navigation script reads the restoration flag, restoring the previous inline
  scroll behavior immediately afterward. The Header, page sections, route
  structure, anchor IDs, hash handling, and Home's global same-page smooth
  scrolling rules were not changed.

## Post-patch Browser Evidence

Using Chrome with the local Astro dev server on `127.0.0.1:4324`, the Pathless,
Flui, and Tabuada More Projects card links and Wallace's Quest `See on all
projects` text link opened their matching records at desktop (1280x900), tablet
(768x1024), and mobile (390x844) CSS viewport sizes. Screenshots of the first
post-patch destination showed the requested record; each heading remained
about 15-16 px below the sticky header. See [quickstart.md](quickstart.md) for
measured positions and scenario results.

Direct open and reload of `professional-game`, `independent-game`, and
`pathless` passed at each viewport. Header Back restoration, browser
Back/Forward, no-hash top entry/history, Home same-page scrolling, and
keyboard activation were also exercised at representative viewports.

## Residual Reproduction and Correction — 2026-10-03

The user reported that the Pathless media-to-record arrival and archive-header
Back return still flashed the page top after repeated round trips. A live
Chrome CDP screencast reproduced both journeys on the patched source before
this follow-up change. On desktop Home-to-Pathless, frames showed Home at
`scrollY=2431`, then three archive-top frames at `scrollY=0`, then the Pathless
record at `scrollY=3785`. On archive Back, frames showed the archive at
`scrollY=3785`, then two Home-top frames at `scrollY=0`, then the saved Home
position at `scrollY=2431`. The first-frame test for the no-hash
`/projects/` link did not cover either hashed journey.

The evidence refines the original root-cause finding. Removing the global
cross-document View Transition removed its longer snapshot animation, but the
browser's native hash alignment still occurred after initial archive-top
frames. Home's saved-position correction still ran in an Astro module script,
which executed after Home had painted at the top. Settled `scrollY` values
therefore concealed the remaining first-paint defect.

The follow-up moves both corrections into a parser-blocking inline script at
the end of the shared document body, after target markup exists and before
deferred module scripts. It aligns valid archive hashes using the target's
computed `scroll-margin-top`, and restores Home's saved position before the
first visible Home frame. Native anchors, browser history, no-hash top entry,
and the Home same-page smooth-scroll rule remain in place.

Five repeated Pathless media-to-record and header-Back cycles were captured at
desktop (1280x900), tablet (768x1024), and mobile (390x844). Across 134, 88,
and 81 screencast frames respectively, no frame used `scrollY=0`; every cycle
landed at the same per-viewport record and saved Home positions. See
`quickstart.md` for the frame ranges, paths, and destination geometry.

## Remaining Validation Limits

- T002 reached three pre-patch Pathless reproductions at desktop (1280x900),
  tablet (768x1024), and mobile (390x844). The pre-patch Header Back journey
  was captured once per viewport.
- An isolated Chrome Headless 154.0.8037.95 session using Chrome DevTools
  Protocol supplied viewport, touch, reduced-motion, script-execution, and
  Performance trace controls. T008 and T017 passed for the recorded scenarios
  at the tested viewports; details and local artifacts are in `quickstart.md`.
- T013 human review remains pending; validation is not approval for merge or
  push.

## Decision

The original runtime evidence identified the longer native cross-document View
Transition. The follow-up capture identified two remaining first-paint timing
causes: native hash alignment after top frames, and saved Home restoration in a
deferred module. The updated inline alignment removes those frames in the
five-cycle tests. Human review remains the only open gate.
