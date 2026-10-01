# Research: Hash Navigation

**Feature**: [Hash Navigation](spec.md)
**Date**: 2026-10-01
**Branch**: `fix/cross-page-anchor-scroll`

## Investigation Question

The report contains two visible sequences: clicking the Pathless thumbnail from Home opens `/projects/#pathless` but first shows the archive top before moving to Pathless; using the archive header `Back` link then returns to Home at its top before moving to the prior Home position. Establish the cause of each sequence separately before proposing a patch.

## Current Repository Evidence

- `src/styles/global.css` enables smooth scrolling globally and overrides it to `auto` on `.archive-content` pages; existing scroll margins account for the sticky header.
- `src/pages/projects/index.astro` renders the archive groups and record targets, including `professional-game`, `independent-game`, and `pathless`.
- `src/components/Navigation.astro` listens for hash changes to update active navigation. That listener does not call a scroll method.
- `src/components/Navigation.astro` also saves the Home scroll position, sets a session restoration flag when the archive header `Back` link is activated, and on Home reads that flag and calls `window.scrollTo` inside animation frames. This source path corroborates the separate top-then-restore sequence.
- `src/layouts/BaseLayout.astro` uses ordinary page links. `astro.config.mjs` does not configure Astro client routing or View Transitions.
- No change has been made to implementation files during this documentation update.

## Current Runtime Evidence

On 2026-10-01, successive Chrome screenshots after clicking the Pathless card showed the Projects archive top / Professional group first and Pathless later, at `/projects/#pathless`. This reproduces the reported cross-page transition. Earlier testing checked only the settled URL and final target position, which missed the visible intermediate state.

The header `Back` restoration sequence was reported by the user. The source path described above explains how the saved position is applied after Home reappears, but repeated time-ordered screenshots of that return remain part of T002/T007.

The specified Home control is the Pathless project card thumbnail in More Projects, linking to `/projects/#pathless`. The Wallace's Quest image in Selected work links to `/work/wallaces-quest/`; its adjacent `See on all projects` text link targets `/projects/#wallaces-quest`. Keep these controls distinct in validation.

The first-paint cause of the cross-page anchor reposition is not established. Source inspection of smooth-scroll rules, target margins, hash listeners, image sizing, and route configuration does not by itself explain the captured sequence. Test temporal behavior around target readiness and layout before drawing a conclusion. Do not assume this sequence and the Home restoration sequence have the same cause.

## Outstanding Browser Coverage

- Three repeated Pathless thumbnail runs at desktop, tablet, and mobile with first-view/later-view capture.
- Three repeated header `Back` returns from a known Home scroll position at each viewport.
- Text link and direct URL comparison using time-ordered observation.
- Category and project deep links plus reload at each viewport.
- Browser Back/Forward separately from the archive header `Back` link; no-hash top behavior; Home same-page smooth scrolling.
- Keyboard/focus, touch, reduced motion, and core navigation when optional scripts are unavailable.

Previous desktop checks verified final destinations, direct/reload behavior for the group hashes, no-hash top entry, Back/Forward among hash entries, and Home same-page smooth scrolling. Those final-state checks did not test the newly captured intermediate frames.

## Investigation Procedure

1. At each representative viewport, load Home fresh, scroll to a known position, and activate the Pathless thumbnail. Record immediate destination frame, subsequent scroll, URL, final target geometry, and header geometry. Repeat three times.
2. Repeat the same controlled Home setup, open the archive record, and activate the archive header `Back` link. Capture Home immediately and after restoration. Separately test browser Back and Forward.
3. Compare the Pathless thumbnail journey with its direct record URL, then separately observe Wallace's Quest `See on all projects` text link in Selected work; the controls point to different records.
4. If reproduced, correlate timed movement with target existence, layout stability, scroll behavior and offsets, route/hash scripts, and the Home restoration path. Record distinct causes for the two sequences.
5. Only after evidence supports a cause, propose the smallest in-scope implementation change. Preserve Home's same-page smooth scrolling, direct/reload hashes, browser history, no-hash top arrival, and sticky-header clearance.
6. Run responsive, accessibility, `git diff --check`, Astro diagnostics, and production build checks; record incomplete conditions explicitly.

## Decision

**Reproduction confirmed; patch choice deferred.** The cross-page Pathless thumbnail first displayed the archive top and later displayed the requested record. The Home header return script provides direct source evidence for a separate delayed restoration movement. Continue the time-ordered investigation and identify the cross-page cause before selecting any implementation change.
