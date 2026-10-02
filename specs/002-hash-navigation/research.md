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
- The same initial-top then destination sequence appeared at desktop, tablet,
  and mobile representative widths. Desktop had three recorded clicks; tablet
  and mobile have one captured reproduction each, so the requested three
  pre-patch repeats at every width remain incomplete.
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

## Remaining Validation Limits

- T002 did not reach three pre-patch reproductions at every viewport. Desktop
  reached three; tablet and mobile each have one time-ordered capture.
- The available browser controls did not provide touch input, reduced-motion
  emulation, or a per-tab way to disable JavaScript. Those T008 checks remain
  pending.
- The browser version could not be read through the available browser API.
- T013 human review remains pending; validation is not approval for merge or
  push.

## Decision

The runtime evidence and source both identify native cross-document View
Transitions as the visual top-frame cause. The header return sequence had a
separate delayed `requestAnimationFrame` scroll-restoration path. The minimal
changes above were applied and the tested navigation scenarios pass. Keep the
remaining repetitions, accessibility emulation limits, and human review
explicitly open.
