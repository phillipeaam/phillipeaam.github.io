# Research: Hash Navigation

**Feature**: [Hash Navigation](spec.md)  
**Date**: 2026-09-30  
**Branch**: `fix/cross-page-anchor-scroll`

## Investigation Question

Does clicking a featured project's thumbnail on Home navigate to its project
record in `/projects/` with the record visible immediately, or does the archive
top appear before a later movement to that record? The exact thumbnail path has
not yet been recorded in browser evidence. The existing `See on all projects`
text link passed a prior desktop check, but that is a separate interaction.

## Current Repository Evidence

- `src/styles/global.css:51` sets smooth scrolling globally.
- `src/styles/global.css:52` sets scroll behavior to auto on pages containing
  `.archive-content`, including `/projects/`.
- `src/styles/global.css:20,64,364,368` define the sticky-header anchor offset
  and apply scroll margins to archive groups and project records.
- `src/pages/projects/index.astro:19` renders the archive within
  `.archive-content`; group IDs include `professional-game` and
  `independent-game`.
- `src/components/Navigation.astro:184-211` reads a valid hash to update the
  active archive navigation group. Its `hashchange` handler updates navigation
  state; it does not perform a second scroll.
- `src/layouts/BaseLayout.astro` contains the shared page shell and ordinary
  links, with no view-transition router. `astro.config.mjs` has no client
  router or View Transitions configuration.
- Project media reserves aspect ratio; archive images include dimensions and
  lazy-loading hints. The inspected navigation path contains no client call to
  `scrollIntoView` or `scrollTo` for a hash target.

These findings narrow the possibilities but do not explain the reported
thumbnail behavior. In particular, the Projects archive's `scroll-behavior:
auto` means global smooth scrolling alone is not an established explanation
for its current runtime.

## Prior Runtime Evidence

The prior Chrome review used a desktop-sized viewport at
`http://127.0.0.1:4321/`:

- Direct opening and reloading `/projects/#professional-game` and
  `/projects/#independent-game` displayed the matching group beneath the sticky
  header without a visible top-to-target scroll.
- Back and Forward between the two group hashes restored the expected group.
- Activating Home's `See on all projects` text link navigated to
  `/projects/#wallaces-quest` and displayed the target record directly.
- Activating Home's `See all projects` link navigated to `/projects/` without a
  hash and displayed the archive from the top.
- Home's `Projects` same-page link retained smooth scrolling.
- The review did not separately activate the featured-project thumbnail. The
  reported user journey therefore remains unverified by that review.
- Tablet, mobile, keyboard/focus, reduced-motion, no-hash Back/Forward, and
  optional-script-unavailable behavior remain untested.

## Investigation Procedure

1. At each available representative viewport, load Home in a fresh browser
   context and identify the featured project's thumbnail control.
2. Click the thumbnail itself. Record whether it is interactive, its resulting
   URL and hash, and the visible sequence: initial destination paint, target
   position, and any later movement. Repeat the same flow to establish whether
   it is reproducible; preserve a recording or timed screenshots if the
   transient top view is hard to observe.
3. Repeat with the same card's `See on all projects` text link and by opening
   its resulting `/projects/#<record>` URL directly. Compare these flows to
   isolate whether the symptom is specific to the thumbnail interaction.
4. If the report reproduces, inspect the actual target and hash timing, layout
   stability around the navigation, and route/hash-reactive scripts. Correlate
   the observed sequence with repository behavior; do not infer a root cause
   from CSS or source inspection alone.
5. Record browser/version, viewport dimensions, target project, exact control,
   resulting URL, reproduction count, and observations in
   [quickstart.md](quickstart.md). Repeat at desktop, tablet, and mobile widths
   where available.
6. Only after reproduction and a supported cause are documented, propose the
   smallest in-scope change. If the flow does not reproduce, record conditions
   and retain the no-patch outcome.

## Hypotheses to Check Only if Reproduced

- The clicked thumbnail may use a different destination or navigation path
  than the adjacent text link.
- The target may not be positioned when the browser first processes the hash,
  or later layout changes may move the viewport.
- A route/hash-reactive script or other post-navigation behavior may cause a
  second movement.
- Global smooth scrolling is a candidate only if the archive-specific `auto`
  rule is not active for the observed navigation.

These are investigation leads, not established causes.

## Decision

Do not change implementation until the exact reported thumbnail journey is
tested and a failure is reproduced. If it reproduces, use the evidence above to
identify its cause before proposing a minimal in-scope fix. If it does not,
document the tested conditions and make no code change.
