# Implementation Plan: Hash Navigation

**Branch**: `fix/cross-page-anchor-scroll` | **Date**: 2026-10-01 | **Spec**: [spec.md](spec.md)

**Input**: User-reproduced Pathless More Projects thumbnail transition and Home
return transition. Investigate the exact click before proposing a minimal fix.

## Summary

The first correction removed a 180 ms cross-document View Transition and
restored Home's saved scroll synchronously from an Astro module. Repeated
frame-by-frame captures showed that this did not eliminate all top frames: the
browser still aligned project hashes after initial archive-top frames, and the
module restored Home after initial Home-top frames. A second correction aligns
valid hashes and restores Home from a parser-blocking inline script at the end
of the shared document body, after target markup exists and before the first
useful frame.

The patch removes the automatic cross-document root transition, aligns
cross-page hashes while parsing the destination, and restores the saved Home
position before paint. Home's same-page smooth scrolling, native links/history,
route structure, Header design, section styling, existing IDs, and
sticky-header offsets remain as before.

## Technical Context

**Language/Version**: Astro / TypeScript / CSS; Node.js v24.21.0 was available
by absolute path.
**Primary Dependencies**: Astro 5.18.2 (installed version).
**Storage**: Existing session storage for Header Back scroll restoration.
**Testing**: Chrome Headless 154.0.8037.95 through Chrome DevTools Protocol
with screenshot-enabled performance traces and viewport/touch/media emulation;
`npm run check`; `npm run build`; `git diff --check`. No automated test suite
was added.
**Target Platform**: Responsive static portfolio, representative desktop,
tablet, and mobile CSS viewports.
**Constraints**: Preserve native links/history, sticky-header clearance,
no-hash top behavior, Home same-page smooth scrolling, and existing routes.
Avoid unrelated design or content changes.

## Constitution Check

- **I. Evidence-First Portfolio Claims**: Pass; no public claims changed.
- **II. Shared Patterns Before Project-Specific Variants**: Pass; no new
  components or variants added.
- **III. Preserve Approved Visual Systems**: Pass; no page/header/section
  redesign. The navigation transition itself was removed because runtime
  evidence showed it produced an intermediate destination frame. The current
  source change only adjusts navigation timing.
- **IV. Accessibility Is Part of Completion**: Pass; semantic anchors,
  accessible names, keyboard focus, Enter activation, mobile touch targets,
  adjacent-target separation, and reduced-motion behavior were verified.
- **V. Progressive Enhancement**: Pass; core cross-page links worked with
  optional scripts disabled at all three tested viewports; the Home same-page
  Projects link also worked without scripts at desktop width.
- **VI. Responsive Verification**: Pass for functional browser scenarios at
  1280x900, 768x1024, and 390x844 CSS viewport sizes. Report these as
  representative viewport emulation, not physical device testing.
- **VII. Small, Scoped Changes**: Pass; navigation-only changes in global
  styles, the navigation module, and the shared document's early alignment
  script.
- **VIII. Validation Before Completion**: `git diff --check`, Astro
  diagnostics, production build, and browser scenarios passed. Limitations are
  recorded in quickstart and tasks.
- **IX. Human Review for Meaningful Changes**: Pass. The user reviewed and
  accepted the source change on 2026-10-03 before commit.

## Project Structure

Changed implementation files:

```text
src/layouts/BaseLayout.astro
src/components/Navigation.astro
src/styles/global.css
```

Investigation and validation artifacts:

```text
specs/002-hash-navigation/
├── plan.md
├── research.md
├── quickstart.md
└── tasks.md
```

No route, content, data-model, anchor ID, or Header markup changes were made.

## Root Cause and Runtime Evidence

`src/styles/global.css` originally contained `@view-transition { navigation:
auto; }` with 180 ms root old/new animations. Removing it reduced but did not
eliminate the visible archive-top frame. The live screencast after the first
patch showed three archive-top frames at `scrollY=0` before Pathless, then two
Home-top frames at `scrollY=0` before the saved position. The native hash
alignment and saved restoration happened after the respective first frames.
The previous checks measured settled positions and a no-hash archive route,
not these repeated hash journeys.

Pre-patch Pathless capture count is three runs at each tested viewport
(1280x900, 768x1024, and 390x844). Screenshot-enabled traces show the first
Home frame, the cross-document transition through the archive's Professional
group, and the stable Pathless destination. Separate pre-patch Header Back
traces at all three viewports show Home at scrollY 0 before the saved position
is restored. Trace files and screenshots are listed in `quickstart.md`.

## Implementation Decision

Applied the evidence-supported changes:

1. Remove the global automatic cross-document View Transition and its root
   animation rules, removing the longer cross-document snapshot.
2. Align the requested archive hash after target markup is parsed, before the
   first archive-top frame.
3. Restore the saved Home scroll position in a parser-blocking inline script
   before the first Home frame instead of a deferred module.

No route or native link behavior was reimplemented. Existing Home smooth
scrolling continues to use the existing CSS rule. Five repeated Pathless and
Back cycles at all three viewports had no frame at page-top `scrollY=0`; direct
hash targets, header clearance, and no-hash top entry also passed.

## Remaining Gates

- Human review is complete; the user confirmed the behavior is resolved and
  reviewed the source change on 2026-10-03.

## Immediate-Frame Capture Method

For T002 and T017, record the actual CSS viewport dimensions before each run.
Start a Chrome DevTools Performance recording with screenshots enabled from a
fresh Home load, activate the link normally, and stop the recording 500 ms after
the navigation completes. Use the trace timestamp for the activation and inspect
its first post-navigation screenshot. At the first available page evaluation
and again 500 ms later, record the URL, `scrollY`, destination heading top, and
sticky-header bottom. For hash links, fail the run if the earliest
post-navigation screenshot shows the archive top before the requested target;
for the no-hash `See all projects` link, `/projects/` at `scrollY=0` is the
expected first destination. Save traces as
`artifacts/screenshots/hash-navigation/<scenario>-<width>x<height>-<run>.json`;
the measurements and tested conditions belong in `quickstart.md`. Do not label
the first available automation sample as the exact browser input timestamp.

## Complexity Tracking

No Constitution violations or new implementation subsystems were introduced.
