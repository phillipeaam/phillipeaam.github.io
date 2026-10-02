# Implementation Plan: Hash Navigation

**Branch**: `fix/cross-page-anchor-scroll` | **Date**: 2026-10-01 | **Spec**: [spec.md](spec.md)

**Input**: User-reproduced Pathless More Projects thumbnail transition and Home
return transition. Investigate the exact click before proposing a minimal fix.

## Summary

The Pathless destination's native hash position was already correct, but the
first visible frame showed the top of the archive. Runtime measurements showed
the URL and `scrollY` at `#pathless` while screenshots still showed the
Professional group, then showed Pathless later without a position change. The
global CSS enabled a native cross-document View Transition, which produced the
intermediate top snapshot. The archive header `Back` path had a separate
two-frame delayed scroll restoration in `Navigation.astro`.

The patch removes the automatic cross-document root transition and applies the
saved Home position synchronously. Home's same-page smooth scrolling, native
links/history, route structure, Header design, section styling, existing IDs,
and sticky-header offsets remain as before.

## Technical Context

**Language/Version**: Astro / TypeScript / CSS; Node.js v24.21.0 was available
by absolute path.
**Primary Dependencies**: Astro 5.18.2 (installed version).
**Storage**: Existing session storage for Header Back scroll restoration.
**Testing**: Real Chrome browser validation; `npm run check`; `npm run build`;
`git diff --check`. No automated test suite was added.
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
  evidence showed it produced the reported intermediate destination frame.
- **IV. Accessibility Is Part of Completion**: Partial; semantic anchors,
  accessible names, keyboard focus and Enter activation were verified. Touch,
  reduced-motion emulation, and disabled-script checks remain pending.
- **V. Progressive Enhancement**: Core destinations remain native links; the
  new navigation behavior does not add client-side routing. Optional-script
  unavailability remains pending validation.
- **VI. Responsive Verification**: Pass for functional browser scenarios at
  1280x900, 768x1024, and 390x844 CSS viewport sizes. Report these as
  representative viewport emulation, not physical device testing.
- **VII. Small, Scoped Changes**: Pass; two small navigation-only edits in
  global styles and the existing Header restoration script.
- **VIII. Validation Before Completion**: `git diff --check`, Astro
  diagnostics, production build, and browser scenarios passed. Limitations are
  recorded in quickstart and tasks.
- **IX. Human Review for Meaningful Changes**: Pending. The source diff must
  receive human review before approval for merge or push.

## Project Structure

Changed implementation files:

```text
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

`src/styles/global.css` contained `@view-transition { navigation: auto; }`
with 180 ms root old/new animations. Before the patch, the first screenshot
after activating Pathless showed Professional at the archive top, while the
URL already equaled `/projects/#pathless`, `scrollY` already positioned the
Pathless record below the sticky header, and later screenshots showed
Pathless at the same scroll position. This was observed at desktop, tablet,
and mobile widths. CSS object-position calculations and image dimensions did
not show a target layout shift, and the navigation hash listener did not scroll.

The separate archive Header `Back` link sets the restoration flag. The Home
script had deferred `window.scrollTo` through two animation frames, allowing a
visible initial Home-top frame. The behavior was corroborated by runtime
screenshots and source.

Exact pre-patch repetition count is incomplete: desktop three captures;
tablet and mobile one each. The first-frame evidence and cause were sufficient
to support a minimal patch; the open count is retained in T002.

## Implementation Decision

Applied the smallest supported changes:

1. Remove the global automatic cross-document View Transition and its root
   animation rules, preventing the archive-top snapshot on cross-page hash
   arrival.
2. Restore the saved Home scroll position synchronously when the existing
   Header Back flag is read, rather than waiting two animation frames.

No route or link behavior was reimplemented. Existing Home smooth scrolling
continues to use the existing CSS rule. Browser checks confirmed hash targets,
history, no-hash top arrival, and Header restoration after the patch.

## Remaining Gates

- Complete T002's remaining tablet and mobile pre-patch repetitions if a
  reversible pre-patch build is available; otherwise record the build
  limitation and existing capture counts, then complete its other comparisons.
- Complete T008 touch, reduced-motion, and optional-script checks when a
  suitable browser control is available.
- Complete T017's no-hash `See all projects` capture at representative desktop,
  tablet, and mobile CSS widths. Use Chrome DevTools Performance recording
  with screenshots enabled; retain one trace per viewport/run under
  `artifacts/screenshots/hash-navigation/`, and record the trace activation
  timestamp plus destination geometry at the first post-navigation sample and
  at 500 ms in `quickstart.md`.
- T013 human review is the final approval gate for this source change.

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
